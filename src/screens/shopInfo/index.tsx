import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../components/TextInput';
import { useForm } from 'react-hook-form';
import { Camera } from 'lucide-react-native';
import theme from '../../utils/theme';
import Label from '../../utils/Label';
import SignatureScreen, { SignatureRef } from '../../components/SignaturePicker';

interface businessDetailsData {
    logo: string;
    companyInitials: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    city: string;
    signature: string;
    location: string;
    referenceStructure: string;


}


export default function ShopInformationScreen() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const signatureRef = useRef<SignatureRef>(null);

    type homeNavigation = NativeStackNavigationProp<RootStackParamList, 'login'>;
    const { control, handleSubmit, setValue, formState: { errors } } = useForm<businessDetailsData>();

    const navigation = useNavigation<homeNavigation>();

    const onSubmit = () => {
        console.log({ username, email, phoneNumber });
        navigation.navigate('login')
    };

    return (
        <ScrollView

            contentContainerStyle={styles.container}>

            <View style={styles.subContainer}>
                <TouchableOpacity style={styles.companyLogo}>
                    <Text style={styles.logo}> <Camera color={'#fff'} size={30} /></Text>
                    <Text style={{ color: '#000', paddingVertical: 20 }}>Add company logo</Text>
                </TouchableOpacity>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20, gap: 10 }}>
                    <View>
                        <Label labeText='company initials:' labelStyle={{ color: "#000" }} />
                        <FormInput
                            placeholder='ex: mb shop'
                            name='shop'
                            control={control}
                            errors={errors}
                            rules={{ required: ' shop is required' }}
                            inputStyle={styles.locationStyle}
                            editable={true}
                            secureText={false}

                        />
                    </View>
                    <View>
                        <Label labeText='company name:' labelStyle={{ color: "#000" }} />
                        <FormInput
                            placeholder='ex: mb shop center'
                            name='name'
                            control={control}
                            errors={errors}
                            rules={{ required: 'shop name is required' }}
                            inputStyle={styles.locationStyle}
                            editable={true}
                            secureText={false}
                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <Label labeText='phone number:' labelStyle={{ color: "#000" }} />
                    <FormInput
                        placeholder='ex: +237 897'
                        name='phone'
                        control={control}
                        errors={errors}
                        rules={{ required: 'phonenumber is required' }}
                        inputStyle={styles.phoneStyle}
                        keyboardType='number-pad'
                        editable={true}
                        secureText={false}

                    />
                </View>

                <View style={{ marginTop: 5 }}>
                    <Label labeText='email:' labelStyle={{ color: "#000" }} />
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
                        keyboardType='email-address'
                        editable={true}
                        secureText={false}
                    />
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, gap: 10 }}>
                    <View>
                        <Label labeText='city:' labelStyle={{ color: "#000" }} />
                        <FormInput
                            placeholder='ex: douala'
                            name='city'
                            control={control}
                            errors={errors}
                            rules={{ required: 'city is required' }}
                            inputStyle={styles.locationStyle}
                            editable={true}
                            secureText={false}
                        />
                    </View>
                    <View>
                        <Label labeText='location:' labelStyle={{ color: "#000" }} />
                        <FormInput
                            placeholder='ex: pk15'
                            name='location'
                            control={control}
                            errors={errors}
                            rules={{ required: 'location is required' }}
                            inputStyle={styles.locationStyle}
                            editable={true}
                            secureText={false}
                        />
                    </View>

                </View>
                <View style={{ marginTop: 5 }}>
                    <Label labeText='reference structure:' labelStyle={{ color: "#000" }} />
                    <FormInput
                        placeholder='ex: grand mall'
                        name='structure'
                        control={control}
                        errors={errors}
                        rules={{ required: 'reference structure is required' }}
                        inputStyle={styles.phoneStyle}
                        editable={true}
                        secureText={false}
                    />
                </View>

                <View>
                    <Text>add your signature: it will be used on your invoices</Text>
                    <SignatureScreen
                        ref={signatureRef}
                        onSave={(sig) => {
                            console.log('Parent received signature:', sig);
                            setValue('signature', sig); // 👈 store signature in form
                        }}
                        width={300}
                        height={65}
                    />
                    <TouchableOpacity

                        onPress={() => signatureRef.current?.clear()}
                        style={{ width: theme.screenWidth - 50, justifyContent:"flex-end" }}>
                        <Text style={{ color: '#000', textAlign: 'right', marginHorizontal: 15, padding: 5 }}>clear</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.termsContainer}>
                    <Text style={styles.termsText}>
                        By registering, you agree to our{' '}
                        <Text style={styles.link}>Terms & Conditions</Text> and{' '}
                        <Text style={styles.link}>Privacy Policy</Text>.
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>save</Text>
                </TouchableOpacity>


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
        paddingVertical: 10,
        paddingHorizontal: 5,
        width: theme.screenWidth
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
        width: theme.screenWidth - 50, borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center',marginTop:10, backgroundColor: theme.COLORS.primary
    },
    buttonText: {
        color: '#fff',
        fontSize: theme.FONT_SIZE.sm,
        textAlign: 'center',
        fontWeight: '600',
    },
    termsContainer: {
        marginTop: 5,
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
    companyLogo: { display: "flex", flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: "center", paddingHorizontal: 5, width: theme.screenWidth - 30, borderRadius: 10, borderWidth: 1, marginTop: 20 },
    logo: { backgroundColor: 'gray', borderRadius: theme.RADIUS.md, textAlign: 'center', paddingVertical: 8, height: 50, width: 50 },
    inputStyle: { width: 160, borderWidth: 1, marginTop: 10, height: 41 },
    locationStyle: { width: 160, borderWidth: 1, height: 41, backgroundColor: '#fff', color: 'gray' },
    phoneStyle: { width: theme.screenWidth - 30, borderWidth: 1, height: 42, backgroundColor: "#fff", color: 'gray' },
    subContainer: { flex: 1, backgroundColor: '#fff', borderRadius: 15, alignItems: 'center', height: theme.screenHeight }
});
