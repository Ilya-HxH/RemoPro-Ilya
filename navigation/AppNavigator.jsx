import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClientTabsNavigator from './ClientTabsNavigator';
import TeamDetailScreen from '../screens/client/TeamDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={ClientTabsNavigator} />
      <Stack.Screen name="TeamDetail" component={TeamDetailScreen} />
    </Stack.Navigator>
  );
}
