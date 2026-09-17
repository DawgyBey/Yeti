// screens/SOSScreen.js
// Big red button + GPS capture. Hits a /sos endpoint that your backend
// teammate builds (Twilio SMS trigger). Until that endpoint exists, this
// screen still demos fine — it captures real GPS and shows the send flow.

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { AI_SERVER_URL } from '../config'; // swap for a separate SOS_SERVER_URL if backend runs elsewhere

export default function SOSScreen() {
  const [sending, setSending] = useState(false);
  const [lastSent, setLastSent] = useState(null);

  const triggerSOS = async () => {
    setSending(true);
    try {
      // 1. Get current GPS location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location permission needed', 'SOS requires location access to send your coordinates.');
        setSending(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // 2. Send to backend SOS endpoint (backend teammate implements this route)
      const response = await fetch(`${AI_SERVER_URL}/sos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude, timestamp: new Date().toISOString() }),
      });

      if (response.ok) {
        setLastSent({ latitude, longitude, time: new Date().toLocaleTimeString() });
        Alert.alert('SOS Sent', 'Your location has been sent to your emergency contact.');
      } else {
        throw new Error('Server rejected request');
      }
    } catch (err) {
      Alert.alert('SOS Failed', 'Could not reach the emergency server. Check your connection.');
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency SOS</Text>
      <Text style={styles.subtitle}>Sends your GPS location via SMS to your emergency contact</Text>

      <TouchableOpacity
        style={[styles.sosButton, sending && styles.sosButtonDisabled]}
        onPress={triggerSOS}
        disabled={sending}
      >
        {sending ? <ActivityIndicator color="#fff" size="large" /> : <Text style={styles.sosButtonText}>SOS</Text>}
      </TouchableOpacity>

      {lastSent && (
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>Last sent at {lastSent.time}</Text>
          <Text style={styles.statusText}>
            {lastSent.latitude.toFixed(5)}, {lastSent.longitude.toFixed(5)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f0', alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#222' },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 8, marginBottom: 40 },
  sosButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#c0392b',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  sosButtonDisabled: { backgroundColor: '#999' },
  sosButtonText: { color: '#fff', fontSize: 32, fontWeight: '800', letterSpacing: 2 },
  statusBox: { marginTop: 32, alignItems: 'center' },
  statusText: { color: '#555', fontSize: 13 },
});
