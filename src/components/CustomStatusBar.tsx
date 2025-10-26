import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import theme from '../utils/theme'
import { AlignLeft } from 'lucide-react-native'

const CustomStatusBar = () => {
  return (
    <View style={styles.container}> 
    <TouchableOpacity>
        <AlignLeft/>
    </TouchableOpacity>

    <Image source={require('../assets/images/last.jpg')}  
    style={{height:50,width:50, borderRadius:50}}
    />
    </View>
  )
}

export default CustomStatusBar

const styles = StyleSheet.create({
    container:{backgroundColor:theme.COLORS.text, height:10}
})