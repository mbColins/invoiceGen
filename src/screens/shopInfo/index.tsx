import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../components/TextInput';
import { useForm } from 'react-hook-form';

export default function ShopInformationScreen() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    type homeNavigation = NativeStackNavigationProp<RootStackParamList, 'login'>;
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const navigation = useNavigation<homeNavigation>();

    const onSubmit = () => {
        console.log({ username, email, phoneNumber });
        navigation.navigate('login')
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* <TextLogo/> */}
            <Text style={styles.title}>Enter your shop information</Text>

            <FormInput
                placeholder='shop initials'
                name='shop'
                control={control}
                errors={errors}
                rules={{ required: ' shop is required' }}
            />
            <FormInput
                placeholder='name'
                name='name'
                control={control}
                errors={errors}
                rules={{ required: 'shop name is required' }}
            />
            <FormInput
                placeholder='phonenumber'
                name='phone'
                control={control}
                errors={errors}
                rules={{ required: 'phonenumber is required' }}
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
                placeholder='location'
                name='location'
                control={control}
                errors={errors}
                rules={{ required: 'location is required' }}
            />


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
        marginVertical: 10
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
        color: '#ccc',
    },
    button: {
        borderColor: '#ccc', borderWidth: 1, width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: '30%'
    },
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
