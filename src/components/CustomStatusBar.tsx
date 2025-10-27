import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import theme from '../utils/theme'
import { AlignLeft, ArrowLeft, BellDot, UserCircle } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'

const CustomStatusBar = () => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flexDirection: 'row', gap: 10 }}>
        <UserCircle size={35} color={theme.COLORS.primary} />
        <Text style={{ textAlign: 'center', paddingVertical: 10, fontSize: theme.FONT_SIZE.md, fontWeight: 500 }}>Joe</Text>
      </TouchableOpacity>

      <BellDot size={30} color={theme.COLORS.primary} />
    </View>
  )
}

export default CustomStatusBar

const styles = StyleSheet.create({
  container: { height: 45, backgroundColor: theme.COLORS.text, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 4 }
})