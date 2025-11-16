import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ArrowLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'

const ProfileStatusBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} >
        <ArrowLeft color={'#fff'}/>
      </Pressable>
      <Text style={{textAlign:'center', color:'#fff', width:'90%'}}>Settings</Text>
    </View>
  )
}

export default ProfileStatusBar

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#01021bff',
        display:'flex',
        flexDirection:'row',
        paddingHorizontal:10, 
        paddingVertical:10,
        height:40
    }
})