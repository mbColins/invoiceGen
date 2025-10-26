import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../components/TextInput';
import { useForm } from 'react-hook-form';
import { Camera } from 'lucide-react-native';
import theme from '../../utils/theme';
import Label from '../../utils/Label';


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

            <TouchableOpacity style={styles.companyLogo}>
                <Text style={styles.logo}> <Camera color={'#fff'} size={30} /></Text>
                <Text style={{ color: '#fff', paddingVertical: 20 }}>Add company logo</Text>
            </TouchableOpacity>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20, gap: 10 }}>
                <View>
                    <Label labeText='company initials' />
                    <FormInput
                        placeholder='ex: mb shop'
                        name='shop'
                        control={control}
                        errors={errors}
                        rules={{ required: ' shop is required' }}
                        inputStyle={styles.inputStyle}
                    />
                </View>
                <View>
                    <Label labeText='company name' />
                    <FormInput
                        placeholder='ex: mb shop center'
                        name='name'
                        control={control}
                        errors={errors}
                        rules={{ required: 'shop name is required' }}
                        inputStyle={styles.inputStyle}
                    />
                </View>
            </View>

            <View style={{ marginTop: 10 }}>
                <Label labeText='phone number' />
                <FormInput
                    placeholder='ex: +237 897'
                    name='phone'
                    control={control}
                    errors={errors}
                    rules={{ required: 'phonenumber is required' }}
                    inputStyle={styles.phoneStyle}
                />
            </View>

            <View style={{ marginTop: 5 }}>
                <Label labeText='email' />
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
                    inputStyle={styles.phoneStyle}
                />
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20, gap: 10 }}>
                <View>
                    <Label labeText='city' />
                    <FormInput
                        placeholder='ex: douala'
                        name='city'
                        control={control}
                        errors={errors}
                        rules={{ required: 'city is required' }}
                         inputStyle={styles.inputStyle}
                    />
                </View>
                <View>
                    <Label labeText='location' />
                    <FormInput
                        placeholder='ex: pk15'
                        name='location'
                        control={control}
                        errors={errors}
                        rules={{ required: 'location is required' }}
                         inputStyle={styles.inputStyle}
                    />
                </View>

            </View>
             <View style={{ marginTop: 10 }}>
                <Label labeText='reference structure' />
                <FormInput
                    placeholder='ex: grand mall'
                    name='structure'
                    control={control}
                    errors={errors}
                    rules={{ required: 'reference structure is required'}}
                    inputStyle={styles.phoneStyle}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>save</Text>
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
        // justifyContent: 'center',
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
        width: 340,
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
       borderWidth: 1, width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: '10%',backgroundColor:theme.COLORS.success
    },
    buttonText: {
        color: '#fff',
        fontSize: theme.FONT_SIZE.sm,
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
    companyLogo: { display: "flex", flexDirection: 'row', gap: 10, justifyContent: 'flex-start', width: '100%' },
    logo: { backgroundColor: 'gray', borderRadius: theme.RADIUS.md, textAlign: 'center', paddingVertical: 8, height: 50, width: 50 },
    inputStyle: { width: 160, borderWidth: 1, marginTop: 10, height: 41 },
    phoneStyle: { width: 340, borderWidth: 1, height: 42, marginTop: 10 }
});
