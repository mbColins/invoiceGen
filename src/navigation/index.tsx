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
import BottomNavigation from './BottomNavigation'
import theme from '../utils/theme'
import InvoiceDetails from '../screens/invoicedetails'


const Stack = createNativeStackNavigator()

const RoutNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='onboard' component={LandingScreen} options={{ headerShown: false }} />
      <Stack.Screen name='register' component={Registration} options={{
        headerShown: true,
        headerTitle: "Register",
        headerStyle: { backgroundColor: '#01021bff' },
        headerTintColor: '#fff',
        headerTitleAlign:'center',
         headerTitleStyle: {
            fontSize: theme.FONT_SIZE.md,         // 👈 change this to whatever you want
            fontWeight: 'bold',   // optional
          },
      }} />
      <Stack.Screen name='home' component={BottomNavigation} options={{
        headerShown: false,
        headerTitle: "",
        headerStyle: { backgroundColor: '#01021bff' },
        headerTintColor: '#fff'
      }} />
      <Stack.Screen name='shop' component={ShopInformationScreen}
        options={{
          headerShown: true,
          headerTitle: "Business details",
          headerStyle: { backgroundColor: '#01021bff' },
          headerTintColor: '#fff',
           headerTitleAlign:'center',
           headerTitleStyle: {
            fontSize: theme.FONT_SIZE.md,         // 👈 change this to whatever you want
            fontWeight: 'bold',   // optional
          },
        }}
      />
      <Stack.Screen name='login' component={loginScreen}
        options={{
          headerShown: true,
          headerTitle: "Log in",
          headerStyle: { backgroundColor: '#01021bff' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: theme.FONT_SIZE.md,         // 👈 change this to whatever you want
            fontWeight: 'bold',   // optional
          },
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
      <Stack.Screen name='invoiceDetails' component={InvoiceDetails}
        options={{
          headerShown: true,
          headerTitle: "invoice details",
          headerStyle: { backgroundColor: '#01021bff' },
          headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  )
}

export default RoutNavigator