import { View, Text, StyleSheet, TextStyle } from 'react-native'
import React from 'react'
import theme from './theme'

type LabelProps ={
    labeText : string
    labelStyle?:TextStyle
}

const Label: React.FC<LabelProps> = ({labeText,labelStyle}) => {
  return (
    <View style={[styles.container,labelStyle]}>
      <Text style={styles.textStyle}>{labeText}</Text>
    </View>
  )
}

export default Label
const styles = StyleSheet.create({
    container: {paddingHorizontal:10, marginBottom:4},
    textStyle:{fontSize:theme.FONT_SIZE.sm, color:theme.COLORS.text},
})