import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TextLogo = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:'#fff'}}>InvoiceGen</Text>
    </View>
  )
}

export default TextLogo

const styles = StyleSheet.create({
    container:{position:'absolute',top:'2%', right:'9%'}
})