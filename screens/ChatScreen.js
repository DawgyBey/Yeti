// screens/ChatScreen.js
// Talks to your Flask server (app.py) over local WiFi.
// This is the piece that plugs directly into what you already tested with curl.

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { AI_SERVER_URL } from '../config';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 'welcome', sender: 'ai', text: 'Ask me anything about the trek — works offline on the trail.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const sendQuestion = async () => {
    const question = input.trim();
    if (!question || loading) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${AI_SERVER_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.answer || "Sorry, I couldn't find an answer to that.",
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 2).toString(), sender: 'ai', text: 'Connection error — check you\'re on the same WiFi as the AI server.' },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
            <Text style={item.sender === 'user' ? styles.userText : styles.aiText}>{item.text}</Text>
          </View>
        )}
      />
      {loading && <ActivityIndicator style={{ marginBottom: 8 }} color="#1b3a2f" />}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="e.g. what if I feel dizzy?"
          onSubmitEditing={sendQuestion}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendQuestion}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f0' },
  bubble: { maxWidth: '80%', borderRadius: 14, padding: 12, marginBottom: 8 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#1b3a2f' },
  aiBubble: { alignSelf: 'flex-start', backgroundColor: '#e8e8e0' },
  userText: { color: '#fff' },
  aiText: { color: '#222' },
  inputRow: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0eb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#1b3a2f',
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendButtonText: { color: '#fff', fontWeight: '600' },
});
