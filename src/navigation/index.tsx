import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LandingScreen from '../screens/onboarding'
import Registration from '../screens/authentication/registration'
import HomeScreen from '../screens/home'
import ShopInformationScreen from '../screens/shopInfo'
import loginScreen from '../screens/authentication/login'
import Invoice from '../screens/invoice'
import GiftScreen from '../screens/giftReceipt'

const Stack = createNativeStackNavigator()

const RoutNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='onboard' component={LandingScreen} options={{ headerShown: false }} />
      <Stack.Screen name='register' component={Registration} options={{
        headerShown: true,
        headerTitle: "",
        headerStyle: { backgroundColor: '#01021bff' },
        headerTintColor: '#fff'
      }} />
      <Stack.Screen name='home' component={HomeScreen} options={{
        headerShown: true,
        headerTitle: "",
        headerStyle: { backgroundColor: '#01021bff' },
        headerTintColor: '#fff'
      }} />
      <Stack.Screen name='shop' component={ShopInformationScreen}
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: { backgroundColor: '#01021bff' },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen name='login' component={loginScreen}
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: { backgroundColor: '#01021bff' },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen name='invoice' component={Invoice}
        options={{
          headerShown: true,
          headerTitle: "create invoice",
          headerStyle: { backgroundColor: '#01021bff' },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen name='gift' component={GiftScreen}
        options={{
          headerShown: true,
          headerTitle: "create gift receipt",
          headerStyle: { backgroundColor: '#01021bff' },
          headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  )
}

export default RoutNavigator