// App.js
// Entry point — bottom tab nav across the 3 core screens.
// Kept deliberately light: no Redux, no complex state, just what's needed to demo.

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ItineraryScreen from './screens/ItineraryScreen';
import ChatScreen from './screens/ChatScreen';
import SOSScreen from './screens/SOSScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#1b3a2f' },
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#1b3a2f',
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Itinerary: 'map-outline',
              Chat: 'chatbubbles-outline',
              SOS: 'warning-outline',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Itinerary" component={ItineraryScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'Ask AI' }} />
        <Tab.Screen name="SOS" component={SOSScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
