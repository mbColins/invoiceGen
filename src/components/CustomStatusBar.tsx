import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import theme from '../utils/theme'
import { AlignLeft, ArrowLeft, BellDot, UserCircle } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { useGetUserQuery } from '../redux/apis/userApi'

const CustomStatusBar = () => {

    const { data: user} = useGetUserQuery();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{display:'flex', flexDirection: 'column' }}>
        <Text style={styles.uname}>Hi {user?.data?.username}</Text>
        <Text style={styles.email}>{user?.data?.email}</Text>
      </TouchableOpacity>

      <BellDot size={25} color={theme.COLORS.background}  style={styles.notif}/>
    </View>
  )
}

export default CustomStatusBar

const styles = StyleSheet.create({
  container: { height: 55, backgroundColor: theme.COLORS.text, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 4, borderBottomRightRadius:10, borderBottomLeftRadius:10, marginBottom:20 },
  uname:{ paddingVertical: 2, fontSize: theme.FONT_SIZE.md, fontWeight: 500 },
  email:{ fontSize: 10 },
  notif:{margin:10 }
})