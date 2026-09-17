# faq_data.py
# Keyword-matched knowledge base for the offline trek AI assistant.
# Route: Everest Base Camp (EBC) -- swap out for your chosen route.
# Add/edit entries freely; keep "keywords" lowercase, single words work best.

FAQ_DATA = [
    {
        "keywords": ["dizzy", "headache", "nausea", "sick", "vomit", "altitude sickness", "ams"],
        "context": (
            "Acute Mountain Sickness (AMS) symptoms include headache, dizziness, nausea, "
            "and fatigue. Do NOT ascend further if symptoms appear. Rest at current altitude. "
            "If symptoms worsen or breathing becomes difficult, descend immediately to a lower "
            "altitude and seek help from a guide or nearest health post."
        ),
    },
    {
        "keywords": ["namche", "tengboche", "distance", "how far", "next stop"],
        "context": (
            "Namche Bazaar to Tengboche is approximately 5-6 hours of trekking, "
            "with about 800m of elevation gain. Trail includes a steep descent then climb."
        ),
    },
    {
        "keywords": ["lukla", "phakding", "start", "day 1", "first day"],
        "context": (
            "Day 1 of the EBC trek: fly into Lukla (2,860m), trek to Phakding (2,610m). "
            "Roughly 3-4 hours, mostly downhill/flat, a gentle start to acclimatize."
        ),
    },
    {
        "keywords": ["acclimatization", "rest day", "acclimatize"],
        "context": (
            "Acclimatization days are built in at Namche Bazaar (3,440m) and Dingboche (4,410m). "
            "Rule of thumb: climb high, sleep low. Do not skip these rest days even if feeling fine."
        ),
    },
    {
        "keywords": ["teahouse", "accommodation", "stay", "lodge"],
        "context": (
            "Teahouses along the EBC route offer basic twin rooms, shared bathrooms at lower "
            "altitude, and charge extra for charging devices, wifi, and hot showers as altitude increases."
        ),
    },
    {
        "keywords": ["permit", "tims", "sagarmatha", "entry fee"],
        "context": (
            "Two permits are required for EBC: the Sagarmatha National Park entry permit and the "
            "Khumbu Pasang Lhamu Rural Municipality permit. TIMS card is not currently required for "
            "this specific route as of recent regulation changes -- verify locally before travel."
        ),
    },
    {
        "keywords": ["weather", "best time", "season", "when to go"],
        "context": (
            "Best trekking seasons for EBC are pre-monsoon (March-May) and post-monsoon "
            "(late September-November) for clearer skies and stable weather."
        ),
    },
    {
        "keywords": ["water", "drink", "purify", "hydration"],
        "context": (
            "Drink 3-4 liters of water daily to help prevent AMS. Use purification tablets or a "
            "filter; bottled water becomes expensive and less available at higher altitude."
        ),
    },
    {
        "keywords": ["gear", "pack", "equipment", "what to bring"],
        "context": (
            "Essential gear: down jacket, sleeping bag rated to -15C, trekking poles, headlamp, "
            "sunscreen, water purification, and a basic first aid kit including Diamox if prescribed."
        ),
    },
    {
        "keywords": ["emergency", "help", "rescue", "sos"],
        "context": (
            "In an emergency: use the app's SOS button to send your GPS location via SMS to your "
            "emergency contact and local rescue coordination. Helicopter evacuation is available "
            "from most major stops but requires insurance confirmation."
        ),
    },
    {
        "keywords": ["kalapatthar", "base camp", "everest view", "summit"],
        "context": (
            "Kala Patthar (5,545m) offers the best close-up view of Everest and is typically "
            "climbed before sunrise. Everest Base Camp itself (5,364m) does not offer a clear "
            "Everest view due to the surrounding ridgeline."
        ),
    },
    {
        "keywords": ["cost", "budget", "price", "how much"],
        "context": (
            "Budget roughly $30-50 USD per day for teahouse trekking (food, lodging), excluding "
            "permits, flights, and guide/porter fees, which add $25-40 USD per day if hired."
        ),
    },
]


def get_context(user_question: str) -> str:
    """Return matched FAQ context for a user question via simple keyword search."""
    q = user_question.lower()
    matches = []
    for entry in FAQ_DATA:
        if any(keyword in q for keyword in entry["keywords"]):
            matches.append(entry["context"])
    return "\n\n".join(matches)
