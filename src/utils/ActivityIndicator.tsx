import {StyleSheet, ActivityIndicator,Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import theme from './theme'

const ActivityIndicatorComponent = () => {
  return (
   <SafeAreaProvider>
    <SafeAreaView style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color= {theme.COLORS.primary} />
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

export default ActivityIndicatorComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});