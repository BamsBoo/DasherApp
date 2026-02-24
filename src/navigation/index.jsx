import {
    createStackNavigator,

} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ActiveDeliveryScreen from '../screens/ActiveDeliveryScreen'
import AvailableOrdersScreen from '../screens/AvailableOrdersScreen'
import OrderDetailsScreen from '../screens/OrderDetailsScreen'

const Stack = createStackNavigator()
function ApplicationNavigator() {


    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="AvailableOrdersScreen"
                        component={AvailableOrdersScreen}
                    />
                        <Stack.Screen
                        name="OrderDetailsScreen"
                        component={OrderDetailsScreen}
                    />
                        <Stack.Screen
                        name="ActiveDeliveryScreen"
                        component={ActiveDeliveryScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )

}

export default ApplicationNavigator