import { Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';
import MenuScreen from '../screens/menu';
import { ArrowLeft, Home, Menu, User2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
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
            <Tab.Screen name='menu' component={MenuScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Menu color={color} size={size} />,
                }}
            />

            <Tab.Screen name='profile' component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <User2 color={color} size={size} />,
                    headerShown: false,
                    headerTitle: "Settings",
                    headerTitleAlign: 'center',
                    // headerLeft: () => (
                    //     <TouchO
                    //         onPress={() => navigation.goBack()}>
                    //         <ArrowLeft />
                    //     </TouchO>)
                }} />
        </Tab.Navigator>
    )
}

export default BottomNavigation

