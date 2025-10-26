import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RoutNavigator from './src/navigation'
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <RoutNavigator />
    </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})