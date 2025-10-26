import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Camera, Download, Eye, EyeClosed, Lock, Mail, Phone, User } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';
import TextLogo from '../../utils/Logo';
import FormInput from '../../components/TextInput';
import { useForm } from 'react-hook-form';
import theme from '../../utils/theme';
import Label from '../../utils/Label';
import { useAuthUserMutation, useRegisterUserMutation } from '../../redux/apis/authenticationPis';
import { showToast } from '../../utils/Toast';
import ModalComponent from '../../utils/Modal';
import { clearRegistration } from '../../redux/slice/registrationSlice';
import { useDispatch } from 'react-redux';



interface FormData {
  username: string;
  password: string;
  email: string
  phoneNumber: string;
}

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassWord, SetShowPassWord] = useState(false);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation<homeNavigation>();
  const dispatch = useDispatch();

  const [registerUser, { data, isError, isSuccess, isLoading, error }] = useRegisterUserMutation();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  type homeNavigation = NativeStackNavigationProp<RootStackParamList, 'shop'>;

  useEffect(() => {
    if (isSuccess && data) {
      navigation.navigate('login');
      dispatch(clearRegistration());
      reset();
      console.log('registration success', data);
      showToast("✅ registration successful!");
    }

    if (isError) {
      setVisible(false);
      showToast("❌ registration failed!");
      Alert.alert('Registration Error', 'And error occured!');
    }
  }, [isSuccess, isError, data, navigation])


  const onSubmit = async (formData: FormData) => {
    setVisible(true)
    try {
      await registerUser(formData).unwrap();
      console.log(formData);
    } catch (error) {
      setVisible(false)
      console.error('Error submitting registration from', error)
      Alert.alert("Registration Error", "An unexpected error occured")
    }

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextLogo />
      <Text style={styles.title}>InvoiceGen</Text>

      <View style={{ marginTop: '5%' }}>
        <Text style={{ marginLeft: 10 }}>
          <User color={theme.COLORS.text} size={20} style={{ marginRight: 10, alignSelf: 'center' }} /><Label labeText='username: ' />
        </Text>
        <FormInput
          placeholder='username'
          name='username'
          control={control}
          errors={errors}
          rules={{ required: 'user name is required' }}
          secureText={false}
        />
        <Text style={styles.label}><Mail color={theme.COLORS.text} size={20} style={{ marginRight: 10, alignSelf: 'center' }} /><Label labeText='email: ' /></Text>
        <FormInput
          placeholder='email'
          name='email'
          control={control}
          errors={errors}
          secureText={false}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format',
            },
          }}
        />

        <Text style={styles.label}><Phone color={theme.COLORS.text} size={20} style={{ marginRight: 10, alignSelf: 'center' }} /><Label labeText='phonenumber: ' /></Text>
        <FormInput
          placeholder='phone number'
          name='phone'
          control={control}
          errors={errors}
          rules={{ required: ' phone number is required' }}
          secureText={false}
        />

        <View>
          <View>
            <Text style={styles.label}><Lock color={theme.COLORS.text} size={20} style={{ marginRight: 10, alignSelf: 'center' }} /><Label labeText='password: ' /></Text>
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
        <Text style={{ color: '#fff' }}>Have and account.?</Text>
        <Text style={{ color: '#007bff' }}> login</Text>
      </TouchableOpacity>
      <ModalComponent
        visible={visible && isLoading}
        onClose={() => setVisible(false)}
        message="Saving you info..."
        showLoader={true}
      />
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
    marginBottom: 10,
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
  label: { marginLeft: 10, marginTop: 10 },
  optionBtn: { paddingTop: 25, position: 'absolute', right: 20 },
  button: {
    backgroundColor: theme.COLORS.primary, borderWidth: 1, width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: '20%'
  },
  loginScreenBtn: { marginTop: '10%', display: 'flex', flexDirection: 'row' },
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
