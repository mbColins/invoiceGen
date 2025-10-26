import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PlaneTakeoff } from 'lucide-react-native'
import theme from './theme'

const TextLogo = () => {
  return (
    <View style={styles.container}>
    <PlaneTakeoff color={theme.COLORS.text} size={30}/>
    </View>
  )
}

export default TextLogo

const styles = StyleSheet.create({
    container:{}
})