import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import theme from '../../utils/theme'
import useImagePicker from '../../utils/Hooks';
import { ChevronRight, Edit, Edit2, ImagePlus, Languages, LogOut, ShoppingBag, Trash, UserCircle } from 'lucide-react-native';
import FormInput from '../../components/TextInput';
import { useForm } from 'react-hook-form';
import { useGetUserQuery, useUpdateUserMutation } from '../../redux/apis/userApi';
import { useGetBusinessDetailQuery } from '../../redux/apis/businessApi';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';

const img = require('../../assets/images/gift.jpg')

const ProfileScreen = () => {

  type regitrationNavigation = NativeStackNavigationProp<RootStackParamList, 'login'>;
  const navigation = useNavigation<regitrationNavigation>();

  const { imageUri, pickImage, clearImage } = useImagePicker();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
 

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const { data: user, isLoading, isError } = useGetUserQuery();
  const { data: business } = useGetBusinessDetailQuery();
  const [registerUser, { data, isSuccess }] = useUpdateUserMutation();



  console.log(business?.data)


  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity style={styles.profileBtn}
          onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.profileImg} />
          ) : (
            <View style={{ height: 100, width: 100, backgroundColor: '#fff', borderRadius: 50, alignItems: 'center' }}>
              <ImagePlus size={60} color={'gray'} style={{ marginTop: 20 }} />
            </View>
          )}
        </TouchableOpacity>
        <Text style={{ color: theme.COLORS.text, marginTop: 5, marginBottom: 5 }}>{user?.data?.email}</Text>
        <TouchableOpacity style={styles.clearImageBtn} onPress={clearImage}>
          <Trash color={theme.COLORS.text} />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionsText}>Personal data:</Text>
          <TouchableOpacity>
            <Edit color={theme.COLORS.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.personalDetails}>
          <FormInput
            placeholder={user?.data?.username}
            name='username'
            control={control}
            errors={errors}
            rules={{ required: 'user name is required' }}
            secureText={false}
            editable={false}
            inputStyle={styles.inputStyle}
          />
          <FormInput
            placeholder={user?.data?.email}
            name='username'
            control={control}
            errors={errors}
            rules={{ required: 'user name is required' }}
            secureText={false}
            editable={false}
            inputStyle={styles.inputStyle}
          />
          <FormInput
            placeholder={user?.data?.phoneNumber}
            name='username'
            control={control}
            errors={errors}
            rules={{ required: 'user name is required' }}
            secureText={false}
            editable={false}
            inputStyle={styles.inputStyle}
          />
        </View>
      </View>

      <View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionsText}>Business data:</Text>
            <TouchableOpacity>
              <Edit color={theme.COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.personalDetails}>
          <View style={{ display: 'flex', flexDirection: 'row', width: 200 }}>
            <View style={{ borderRightWidth: 0.3, borderBottomWidth: 0.3, height: 90, borderRadius: 10 }}>
              <Image
                source={{ uri: business?.data?.logo }}
                style={{ height: 85, width: 90 }}
                resizeMode="contain"
              />
            </View>
            <FormInput
              placeholder={business?.data?.companyInitials}
              name='companyInitials'
              control={control}
              errors={errors}
              rules={{ required: 'user name is required' }}
              secureText={false}
              editable={false}
              inputStyle={{ width: theme.screenWidth - 120, backgroundColor: theme.COLORS.text, marginTop: 50 }}
            />
          </View>
          <FormInput
            placeholder={business?.data?.companyName}
            name='companyName'
            control={control}
            errors={errors}
            rules={{ required: 'user name is required' }}
            secureText={false}
            editable={false}
            inputStyle={styles.inputStyle}
          />
          <FormInput
            placeholder={business?.data?.email}
            name='email'
            control={control}
            errors={errors}
            rules={{ required: 'user name is required' }}
            secureText={false}
            editable={false}
            inputStyle={styles.inputStyle}
          />
          <FormInput
            placeholder={business?.data?.phoneNumber}
            name='phoneNumber'
            control={control}
            errors={errors}
            rules={{ required: 'user name is required' }}
            secureText={false}
            editable={false}
            inputStyle={styles.inputStyle}
          />
        </View>
      </View>
      <View>
        <Text style={styles.sectionsText}>Settings</Text>
        <View style={[styles.personalDetails,{ marginBottom: 20 }]}>
          <Pressable style={styles.settingBtn}>
            <Text style={{ marginHorizontal: 10 }}>language</Text>
            <Languages size={20} style={{ marginTop: 10 }} />
          </Pressable>
          <Pressable style={styles.settingBtn}>
            <Text style={{ marginHorizontal: 10 }}>theme</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </Pressable>
          <Pressable style={styles.settingBtn}>
            <Text style={{ marginHorizontal: 10 }}>helper center</Text>
            <ChevronRight />
          </Pressable>
          <Pressable style={styles.settingBtn}>
            <Text style={{ marginHorizontal: 10 }}>terms and conditions</Text>
            <ChevronRight />
          </Pressable>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn}
      onPress={() => navigation.navigate('login')}
      >
        <Text style={{textAlign:'center', color:theme.COLORS.text}}>Logout</Text>
        <LogOut color={theme.COLORS.text}/>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.COLORS.screensBg },
  profileImageContainer: { width: theme.screenWidth, alignItems: 'center', marginTop: 30, borderBottomWidth: 0.3, borderColor: theme.COLORS.text, margin: 10 },
  profileBtn: {},
  profileImg: { height: 100, width: 100, borderRadius: 50 },
  clearImageBtn: { position: 'absolute', right: 25 },
  personalDetails: { backgroundColor: "#fff", width: theme.screenWidth - 10, padding: 5, borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 10 },
  inputStyle: { backgroundColor: '#fff', height: 40 },
  sectionTitle: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight:20 },
  settingBtn: { borderBottomWidth: 0.3, paddingVertical: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, borderColor: 'gray' },
  sectionsText: { color: theme.COLORS.text, textAlign: 'left', marginHorizontal: 10, marginTop: 10, marginBottom: 3 },
  logoutBtn: {backgroundColor:theme.COLORS.primary, display:'flex', flexDirection:'row',justifyContent:'center',padding:10, borderRadius:10, marginVertical:10, gap:10}
})