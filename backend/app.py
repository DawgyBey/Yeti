# app.py
# Local Flask server exposing the offline trek AI over your laptop's WiFi.
# This is BOTH your dev testbed AND your fallback demo path if on-device
# mobile inference isn't ready in time.
#
# Run: python app.py
# Test: curl -X POST http://localhost:5000/ask -H "Content-Type: application/json" \
#           -d '{"question": "what should I do if I feel dizzy?"}'
#
# On demo day, connect your phone to the same WiFi as this laptop and point
# the app's API calls at http://<laptop-local-ip>:5000/ask

from pathlib import Path

from flask import Flask, request, jsonify
from llama_cpp import Llama
from faq_data import get_context

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "gemma-2-2b-it-Q4_K_M.gguf"

# --- Load the model once at startup ---
# Download a quantized GGUF model first, e.g.:
#   huggingface-cli download bartowski/gemma-2-2b-it-GGUF gemma-2-2b-it-Q4_K_M.gguf \
#       --local-dir ./models
llm = Llama(
    model_path=str(MODEL_PATH),
    n_ctx=2048,       # context window
    n_threads=4,      # tune to your CPU
    verbose=False,
)

SYSTEM_PROMPT = (
    "You are a helpful offline trekking assistant for the Everest Base Camp trail. "
    "Answer briefly and practically in 2-3 sentences. If the context below doesn't "
    "cover the question, say you don't have that information rather than guessing "
    "on anything safety-related."
)


def build_prompt(question: str, context: str) -> str:
    if context:
        return (
            f"{SYSTEM_PROMPT}\n\n"
            f"Context:\n{context}\n\n"
            f"Question: {question}\n"
            f"Answer:"
        )
    return f"{SYSTEM_PROMPT}\n\nQuestion: {question}\nAnswer:"


@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json(force=True)
    question = data.get("question", "").strip()
    if not question:
        return jsonify({"error": "missing 'question'"}), 400

    context = get_context(question)
    prompt = build_prompt(question, context)

    output = llm(
        prompt,
        max_tokens=200,
        temperature=0.3,
        stop=["Question:", "\n\n"],
    )
    answer = output["choices"][0]["text"].strip()

    return jsonify({
        "question": question,
        "matched_context": context,
        "answer": answer,
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    # host="0.0.0.0" makes this reachable from your phone over local WiFi
    app.run(host="0.0.0.0", port=5000)
