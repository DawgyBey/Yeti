// screens/ItineraryScreen.js
// Hardcoded EBC route — matches faq_data.py context on the AI server.
// Deliberately static: no backend needed, no editing UI. Judges see a
// clean day-by-day plan; that's the whole job of this screen.

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ITINERARY = [
  { day: 1, title: 'Lukla → Phakding', altitude: '2,610m', detail: '3-4 hrs, gentle start to acclimatize' },
  { day: 2, title: 'Phakding → Namche Bazaar', altitude: '3,440m', detail: '5-6 hrs, steep climb into the Sherpa capital' },
  { day: 3, title: 'Namche Bazaar', altitude: '3,440m', detail: 'Acclimatization day — short hikes only' },
  { day: 4, title: 'Namche → Tengboche', altitude: '3,860m', detail: '5-6 hrs, descent then climb, monastery views' },
  { day: 5, title: 'Tengboche → Dingboche', altitude: '4,410m', detail: '5-6 hrs, landscape opens up above the treeline' },
  { day: 6, title: 'Dingboche', altitude: '4,410m', detail: 'Acclimatization day — hike to Nangkartshang viewpoint' },
  { day: 7, title: 'Dingboche → Lobuche', altitude: '4,940m', detail: '5-6 hrs, passing the Khumbu memorials' },
  { day: 8, title: 'Lobuche → Gorak Shep → EBC', altitude: '5,364m', detail: 'Long day, reach Everest Base Camp itself' },
  { day: 9, title: 'Gorak Shep → Kala Patthar → Pheriche', altitude: '5,545m', detail: 'Pre-dawn summit for the best Everest view' },
  { day: 10, title: 'Pheriche → Namche Bazaar', altitude: '3,440m', detail: 'Long descent day' },
  { day: 11, title: 'Namche → Lukla', altitude: '2,860m', detail: 'Final trekking day, flight out next morning' },
];

export default function ItineraryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={ITINERARY}
        keyExtractor={(item) => item.day.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeText}>Day {item.day}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.altitude}>{item.altitude}</Text>
              <Text style={styles.detail}>{item.detail}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f0' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  dayBadge: {
    backgroundColor: '#1b3a2f',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 12,
    alignSelf: 'flex-start',
  },
  dayBadgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  title: { fontSize: 16, fontWeight: '600', color: '#222' },
  altitude: { fontSize: 13, color: '#888', marginTop: 2 },
  detail: { fontSize: 13, color: '#555', marginTop: 4 },
});
