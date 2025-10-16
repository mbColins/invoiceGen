import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';
import Button from '../../utils/Button';
import FormInput from '../../components/TextInput';
import { useForm } from 'react-hook-form';

interface FormData {
    email: string;
    password: string;
}

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    type regitrationNavigation = NativeStackNavigationProp<RootStackParamList, 'register', 'home'>;

    const navigation = useNavigation<regitrationNavigation>();

    const onSubmit = (data: FormData) => {
        console.log({ username, email, phoneNumber });
        navigation.navigate('home')
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* <TextLogo/> */}
            <Text style={styles.title}>Login</Text>

            <FormInput
                placeholder='username'
                name='username'
                control={control}
                errors={errors}
                rules={{ required: 'user name is required' }}
            />

            <FormInput
                placeholder='password'
                name='password'
                control={control}
                errors={errors}
                rules={{ required: 'password name is required' }}
            />

            <Pressable onPress={() => navigation.navigate("register")} style={styles.signUpBtn}>
                <Text style={{ textAlign: 'left', color: '#fff' }}>not yet registered.? sign up</Text>
            </Pressable>
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                    By registering, you agree to our{' '}
                    <Text style={styles.link}>Terms & Conditions</Text> and{' '}
                    <Text style={styles.link}>Privacy Policy</Text>.
                </Text>
            </View>
        </ScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#000121ff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 30,
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
        borderColor: '#ccc', borderWidth: 1, width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center'
    },
    signUpBtn: { marginTop: '20%', marginBottom: '5%', alignItems: 'flex-start', width: '100%' },
    buttonText: {
        color: '#fff',
        fontSize: 18,
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