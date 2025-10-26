import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';
import MenuScreen from '../screens/menu';
import { Home } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown:false,
                tabBarStyle: {
                    backgroundColor: '#fff'
                }
            }}
        >
            <Tab.Screen name='home' component={HomeScreen} options={{
                headerShown: false,
                headerTitle: "",
                headerStyle: { backgroundColor: '#01021bff' },
                headerTintColor: '#fff',
               tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
            }}

            />
            <Tab.Screen name='menu' component={MenuScreen} />
            <Tab.Screen name='profile' component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default BottomNavigation

