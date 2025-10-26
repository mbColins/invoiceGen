import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Camera, Download } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';
import TextLogo from '../../utils/Logo';
import FormInput from '../../components/TextInput';
import { useForm } from 'react-hook-form';
import theme from '../../utils/theme';



const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  type homeNavigation = NativeStackNavigationProp<RootStackParamList, 'shop'>;
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const navigation = useNavigation<homeNavigation>();


  const onSubmit = () => {
    console.log({ username, email, phoneNumber });
    navigation.navigate('shop')
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextLogo/>
      <Text style={styles.title}>InvoiceGen</Text>

      <View style={{marginTop:'20%'}}>
        <FormInput
        placeholder='username'
        name='username'
        control={control}
        errors={errors}
        rules={{ required: 'user name is required' }}
      />

      <FormInput
        placeholder='email'
        name='email'
        control={control}
        errors={errors}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email format',
          },
        }}
      />

      <FormInput
        placeholder='phone number'
        name='phone'
        control={control}
        errors={errors}
        rules={{ required: ' phonemuber is required' }}
      />

      <FormInput
        placeholder='password'
        name='password'
        control={control}
        errors={errors}
        rules={{ required: ' password is required' }}
      />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By registering, you agree to our{' '}
          <Text style={styles.link}>Terms & Conditions</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </View>
    <TouchableOpacity 
    onPress={() => navigation.navigate("login")}
    style={styles.loginScreenBtn}>
      <Text style={{color:'#fff'}}>Have and account.?</Text>
      <Text style={{color:'#007bff'}}> login</Text>
    </TouchableOpacity>
    </ScrollView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000121ff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
    color: '#ccc',
  },
  input: {
    width: '100%',
    backgroundColor: '#000121ff',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    borderColor: '#ccc', borderWidth: 1, width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: '30%'
  },
  loginScreenBtn :{marginTop:'20%',display:'flex',flexDirection:'row'},
  buttonText: {
    color: '#fff',
    fontSize: theme.FONT_SIZE.md,
    textAlign: 'center',
    fontWeight: '600',
  },
  termsContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
  },
  termsText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
  },
  link: {
    color: '#007bff',
    fontWeight: '500',
  },
});
