import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../utils/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../../utils/Button';

const bg = require("../../assets/images/land.png")

type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'login'>;

const LandingScreen = () => {

  const navigation = useNavigation<LandingScreenNavigationProp>();

  return (
    <ImageBackground style={{ flex: 1, alignItems: 'center' }}
      source={bg}>
      <View>
        <View style={styles.message}>
        <Text style={{ textAlign: "center", fontSize: 20, color: "white", marginTop: 70 }}>Welcome to InvoiceGen</Text>
          <Text style={{ color: "#fff", marginTop: 15 }}>“Smart Invoicing for a Digital World.”</Text>
        </View>
      </View>
      <View style={styles.btnContainer}> 
        <Text style={styles.btnContainerMsg}>Automate your billing, connect with clients, and share e-invoices in seconds.</Text>
       <Button title='get started' onPress={() => navigation.navigate("login")} />
      </View>
    </ImageBackground>
  )
}

export default LandingScreen

const styles = StyleSheet.create({
  btn: { backgroundColor: 'blue', width: 200, borderRadius: 5, marginTop: 40 },
  message: {height:'80%' },
  btnContainer:{justifyContent:'center',alignItems:'center'},
  btnContainerMsg : { color: "#fff", marginTop: 15, textAlign: 'center',marginBottom:20 }
})