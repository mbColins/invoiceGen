import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';
import FormInput from '../../components/TextInput';
import { useForm } from 'react-hook-form';
import theme, { COLORS } from '../../utils/theme';
import { Eye, EyeClosed, Lock, PlaneTakeoff, User } from 'lucide-react-native';
import TextLogo from '../../utils/Logo';
import { useAuthUserMutation } from '../../redux/apis/authenticationPis';
import Label from '../../utils/Label';
import ModalComponent from '../../utils/Modal';
import { showToast } from '../../utils/Toast';
import { clearLogin } from '../../redux/slice/loginSlice';
import { useDispatch } from 'react-redux';

interface FormData {
    username: string;
    password: string;
}

const LoginScreen = () => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [showPassWord, SetShowPassWord] = useState(false);

    const navigation = useNavigation<regitrationNavigation>();
    const dispatch = useDispatch();

    const [authUser, { data, isLoading, isError, isSuccess, error }] = useAuthUserMutation();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    type regitrationNavigation = NativeStackNavigationProp<RootStackParamList, 'register', 'home'>;

    useEffect(() => {
        if (isSuccess && data) {

            console.log('Login successful:', data);
            dispatch(clearLogin());
            reset();
            navigation.navigate('home');
            showToast("✅ Login successful!  Welcome back");
        }
        if (isError) {
            setVisible(false);
            Alert.alert('Login Error', 'Invalid credentials or network issue');
        }
    }, [isSuccess, isError, data, navigation]);

    const onSubmit = async (formData: FormData) => {
        setVisible(true); // show modal when submitting
        console.log(formData)
        try {
            await authUser(formData);
            console.log(formData)
        } catch (error) {
            setVisible(false);
            console.error('Error submitting login:', error);
            Alert.alert('Login Error', 'An unexpected error occurred.');
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ alignItems: 'center', marginVertical: '20%' }}>
                <TextLogo />
                <Text style={styles.title}>Hi, welcome back</Text>
                <Text style={styles.subtitle}>login with your credentials</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <View>
                    <Text style={{ marginLeft: 10 }}><User color={theme.COLORS.text} size={20} style={{ marginRight: 10, alignSelf: 'center' }} /><Label labeText='username: ' /></Text>
                    <FormInput
                        placeholder="username"
                        name="username"
                        control={control}
                        errors={errors}
                        rules={{ required: 'user name is required' }}
                        secureText={false}
                    />
                </View>

                <View>
                    <View>
                        <Text style={{ marginLeft: 10 }}><Lock color={theme.COLORS.text} size={20} style={{ marginRight: 10, alignSelf: 'center' }} /><Label labeText='password: ' /></Text>
                        <FormInput
                            placeholder='password'
                            name='password'
                            control={control}
                            errors={errors}
                            rules={{ required: 'password is required' }}
                            secureText={showPassWord}
                        />
                    </View>
                    <TouchableOpacity onPress={() => SetShowPassWord(!showPassWord)} style={styles.optionBtn}>
                        {showPassWord ? <EyeClosed color={theme.COLORS.text} /> : <Eye color={theme.COLORS.text} />}
                    </TouchableOpacity>
                </View>
            </View>

            <Pressable onPress={() => navigation.navigate("register")} style={styles.signUpBtn}>
                <Text style={{ textAlign: 'left', color: '#fff' }}>not yet registered.? sign up</Text>
            </Pressable>
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <ModalComponent
                visible={visible && isLoading}
                onClose={() => setVisible(false)}
                message="Authenticating user..."
                showLoader={true}
            />
        </ScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#020221',
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#ccc',
    },
    input: {
        width: '100%',
        backgroundColor: '#0b0b1aff',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: '#000',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center', // vertically center icon + input
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#020221',
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    optionBtn: { paddingTop: 25, position: 'absolute', right: 20 },
    button: {
        borderWidth: 1, width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.COLORS.primary
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
    subtitle: { color: "#fff", fontSize: theme.FONT_SIZE.xs }
});