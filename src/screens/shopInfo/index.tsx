import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../components/TextInput';
import { useForm } from 'react-hook-form';
import { Camera, ImagePlus } from 'lucide-react-native';
import theme from '../../utils/theme';
import Label from '../../utils/Label';
import SignatureScreen, { SignatureRef } from '../../components/SignaturePicker';
import { useCreateBusinessMutation } from '../../redux/apis/businessApi';
import ModalComponent from '../../utils/Modal';
import { showToast } from '../../utils/Toast';
import { launchImageLibrary } from 'react-native-image-picker';
import useImagePicker from '../../utils/Hooks';


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

// const pickImage = () => {
//   launchImageLibrary(
//     {
//       mediaType: 'photo', // or 'video'
//       quality: 1,         // 0 to 1
//     },
//     (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//       } else if (response.assets && response.assets.length > 0) {
//         const selectedImage = response.assets[0];
//         console.log('Selected image URI:', selectedImage.uri);
//         // Save the URI to state if you want to display it
//         setImageUri(selectedImage.uri);
//       }
//     },
//   );
// };



const img = require('../../assets/images/gift.png')

export default function ShopInformationScreen() {

    const [visible, setVisible] = useState(false);


    const signatureRef = useRef<SignatureRef>(null);

    type homeNavigation = NativeStackNavigationProp<RootStackParamList, 'invoice'>;
    const navigation = useNavigation<homeNavigation>();


    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<businessDetailsData>();
    const [createBusiness, { data, isSuccess, isLoading, isError, error }] = useCreateBusinessMutation();
    const { imageUri, pickImage, clearImage } = useImagePicker();


    useEffect(() => {
        if (isSuccess && data) {
            reset();
            navigation.navigate('invoice');
            showToast("✅ Business created! You can now create your invoices");
        }

        if (isError) {
            setVisible(false);
            Alert.alert('Business', 'Error submitting business data');
            console.log(error);
        }

        if (imageUri) {
            setValue("logo", imageUri);
        }
    }, [isSuccess, isError, data,imageUri]); // ✅ Add dependencies


    const onSubmit = async (businessDetailsData: businessDetailsData) => {
        setVisible(true);
        console.log(businessDetailsData);

        try {
            const formData = new FormData();

            // append all text fields
            formData.append("companyInitials", businessDetailsData.companyInitials);
            formData.append("companyName", businessDetailsData.companyName);
            formData.append("phoneNumber", businessDetailsData.phoneNumber);
            formData.append("email", businessDetailsData.email);
            formData.append("city", businessDetailsData.city);
            formData.append("signature", businessDetailsData.signature);
            formData.append("location", businessDetailsData.location);
            formData.append("logo", businessDetailsData.logo);
            formData.append("referenceStructure", businessDetailsData.referenceStructure);

            // append logo (if selected)
            if (businessDetailsData.logo) {
                formData.append("file", {
                    uri: businessDetailsData.logo, // example: "file:///data/user/0/.../logo.jpg"
                    type: "image/jpeg", // or derive from file picker
                    name: "logo.jpg",
                } as any);
            }

            await createBusiness(formData).unwrap();
            setVisible(false);
            Alert.alert("Success", "Business details created successfully!");
        } catch (error) {
            setVisible(false);
            Alert.alert("Business Details Error", "An unexpected error occurred.");
            console.log(error);
        }
    };


    return (
        <ScrollView

            contentContainerStyle={styles.container}>

            <View style={styles.subContainer}>
                <TouchableOpacity style={styles.companyLogo}
                    onPress={pickImage}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                        <Text style={styles.logo}> <Camera color={'#fff'} size={30} /></Text>
                        <Text style={{ color: '#000', paddingVertical: 20 }}>Add company logo</Text>
                    </View>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.instLogo} />
                    ) : (
                        <View style={styles.iconContainer}>
                            <ImagePlus size={50} color={'gray'} />
                        </View>
                    )}
                </TouchableOpacity>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20, gap: 10 }}>
                    <View>
                        <Label labeText='company initials:' labelStyle={{ color: "#000" }} />
                        <FormInput
                            placeholder='ex: mb shop'
                            name='companyInitials'
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
                            name='companyName'
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
                        name='phoneNumber'
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
                        name='referenceStructure'
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
                    <View style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: theme.screenWidth - 50 }}>
                        <TouchableOpacity
                            onPress={() => signatureRef.current?.clear()}
                            style={{ width: 100, justifyContent: "flex-end" }}>
                            <Text style={{ color: '#000', textAlign: 'right', marginHorizontal: 15, padding: 5 }}>clear</Text>
                        </TouchableOpacity>
                    </View>
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
            <ModalComponent
                visible={visible && isLoading}
                onClose={() => setVisible(false)}
                message="Authenticating user..."
                showLoader={true}
            />
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
        width: theme.screenWidth - 50, borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: theme.COLORS.primary
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
    companyLogo: {
        display: "flex", flexDirection: 'row', gap: 10, justifyContent: 'space-between', alignItems: "center", paddingHorizontal: 5, width: theme.screenWidth - 30,
        borderRadius: 10, borderWidth: 1, marginTop: 20, height: 70
    },
    logo: { backgroundColor: 'gray', borderRadius: theme.RADIUS.md, textAlign: 'center', paddingVertical: 8, height: 50, width: 50 },
    inputStyle: { width: 160, borderWidth: 1, marginTop: 10, height: 41 },
    locationStyle: { width: 160, borderWidth: 1, height: 41, backgroundColor: '#fff', color: 'gray' },
    phoneStyle: { width: theme.screenWidth - 30, borderWidth: 1, height: 42, backgroundColor: "#fff", color: 'gray' },
    subContainer: { flex: 1, backgroundColor: '#fff', borderRadius: 15, alignItems: 'center', height: theme.screenHeight },
    instLogo: { width: 65, height: 60, alignSelf: 'flex-end', borderRadius: 10, marginVertical: 5 },
    iconContainer: { alignItems: 'flex-end', justifyContent: 'center', flex: 1, },
});
