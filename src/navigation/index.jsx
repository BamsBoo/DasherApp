import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import ActiveDeliveryScreen from '../screens/ActiveDeliveryScreen';
import AvailableOrdersScreen from '../screens/AvailableOrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const Stack = createNativeStackNavigator();

function ApplicationNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="AvailableOrders"
          component={AvailableOrdersScreen}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetailsScreen}
        />
        <Stack.Screen
          name="ActiveDelivery"
          component={ActiveDeliveryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;