
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../components/TextInput';
import { useForm, useFieldArray } from 'react-hook-form';
import Label from '../../utils/Label';
import { Contact, Save, Store, Upload, UserRound, UserRoundPlus } from 'lucide-react-native';
import theme, { screenWidth } from '../../utils/theme';


interface Item {
  description: string;
  quantity: number;
  unitprice: number;
  tax: number;
  total: number;
}

interface InvoiceForm {
  customername: string;
  phonenumber: string;
  signature : string;
  items: Item[];
}

const Invoice = () => {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'register', 'home'>;
  const navigation = useNavigation<NavigationProps>();


  const { control, handleSubmit, formState: { errors } } = useForm<InvoiceForm>({
    defaultValues: {
      customername: '',
      phonenumber: '',
      signature: '',
      items: [{ description: '', quantity: 0, unitprice: 0, tax: 0, total: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: InvoiceForm) => {
    console.log('Invoice submitted:', data);
    navigation.navigate('home');
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.headerText}>
        Fill in the following form to generate your invoice
      </Text>

      {/* Customer Info */}
      <View style={styles.infoBox}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.infoBoxTitle}>Customer Information</Text>
          <TouchableOpacity style={{ marginTop: 8 }}>
            <Text style={styles.infoBoxTitle}><Store /></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.customerDetails}>
          <View>
            <Label labeText='customer name' labelStyle={styles.labelStyle} />
            <FormInput
              placeholder="Customer name"
              name="customername"
              control={control}
              errors={errors}
              rules={{ required: 'Customer name is required' }}
              inputStyle={styles.inputStyle}
              secureText={false}
              editable={false}
            />
          </View>
          <TouchableOpacity style={styles.contactBtn}>
            <UserRoundPlus size={30} color={'#000'} />
          </TouchableOpacity>
        </View>
        <Label labeText='phone number' labelStyle={styles.labelStyle} />
        <FormInput
          placeholder="Phone number"
          name="phonenumber"
          control={control}
          errors={errors}
          rules={{ required: 'Phone number is required' }}
          inputStyle={{ width: screenWidth - 25, borderWidth: 1, marginTop: 4, height: 41, backgroundColor: theme.COLORS.text, marginHorizontal: 3 }}
          secureText={false}
          editable={false}
        />
      </View>

      {/* Item Details */}
      <View style={styles.itemsContainer}>
        <Text style={styles.infoBoxTitle}>Item details</Text>

        {fields.map((item, index) => (
          <View key={item.id} style={{ marginTop: 10 }}>
            <Label labeText='description/designation:' labelStyle={{ color: '#000' }} />
            <FormInput
              placeholder="ex:  usb keys"
              name={`items.${index}.description`}
              control={control}
              errors={errors}
              rules={{ required: 'Description is required' }}
              inputStyle={styles.itemsLongInput}
              secureText={false}
              editable={false}
            />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Label labeText='quanity:' labelStyle={{ color: '#000' }} />
                <FormInput
                  placeholder="ex: 10"
                  name={`items.${index}.quantity`}
                  control={control}
                  errors={errors}
                  rules={{ required: 'Quantity is required' }}
                  inputStyle={styles.itemsShortInput}
                  secureText={false}
                  editable={false}
                />
              </View>
              <View>
                <Label labeText='unit price(xaf):' labelStyle={{ color: '#000' }} />
                <FormInput
                  placeholder="ex: 1500"
                  name={`items.${index}.unitprice`}
                  control={control}
                  errors={errors}
                  rules={{ required: 'Unit price is required' }}
                  inputStyle={styles.itemsShortInput}
                  secureText={false}
                  editable={false}
                />
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Label labeText='tax:' labelStyle={{ color: '#000' }} />
              <FormInput
                placeholder="ex:0.23"
                name={`items.${index}.tax`}
                control={control}
                errors={errors}
                rules={{ required: 'Tax is required' }}
                inputStyle={styles.itemsLongInput}
                secureText={false}
                editable={false}
              />
            </View>
            <View>
              <Label labeText='total:' labelStyle={{ color: '#000' }} />
              <FormInput
                placeholder="0.0"
                name={`items.${index}.total`}
                control={control}
                errors={errors}
                rules={{ required: 'Total is required' }}
                inputStyle={styles.itemsLongInput}
                secureText={false}
                editable={false}
              />
            </View>


            <View style={styles.addItem}>
              <TouchableOpacity
                onPress={() =>
                  append({ description: '', quantity: 0, unitprice: 0, tax: 0, total: 0 })
                }
                style={styles.addButton}
              >
                <Text style={{ color: theme.COLORS.primary }}>add item</Text>
              </TouchableOpacity>
              {index > 0 && (
                <TouchableOpacity
                  onPress={() => remove(index)}
                  style={styles.removeButton}
                >
                  <Text style={{ color: 'red' }}>remove item</Text>
                </TouchableOpacity>
              )}

            </View>
          </View>
        ))}

        {/* Add another item */}

      </View>
      <View style={{ borderWidth: 1, borderColor: "#fff", height: 100, marginTop: 15, borderRadius: 10 }}>
        <Text style={{ color: theme.COLORS.text, textAlign: 'center' }}> digital signature</Text>
     
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
        <Text style={{ textAlign: 'center', color: theme.COLORS.text, }}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000121ff',
    paddingHorizontal: 10,
  },
  headerText: {
    textAlign: 'center',
    paddingVertical: 8,
    color: '#ccc',
  },
  infoBox: {
    marginTop: 10, backgroundColor: "#fff", width: theme.screenWidth - 20, borderRadius: 15, paddingBottom: 8,
  },
  infoBoxTitle: {
    paddingHorizontal: 10,
    fontWeight: '600',
    marginTop: '5%',
    color: '#070707ff',
  },
  customerDetails: { display: 'flex', flexDirection: 'row', width: screenWidth - 20, gap: 10, marginTop: 20, paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center' },
  itemsContainer: {
    marginTop: 10, backgroundColor: theme.COLORS.text, borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingHorizontal: 5
  },
  itemsLongInput: { borderWidth: 1, marginTop: 4, height: 41, backgroundColor: theme.COLORS.text, width: screenWidth - 30 },
  itemsShortInput: { borderWidth: 1, backgroundColor: theme.COLORS.text, width: screenWidth - 200 },
  addButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderColor: theme.COLORS.primary,
  },
  removeButton: {
    alignSelf: 'flex-end',
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    borderColor: 'red',
  },
  saveButton: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
    paddingVertical: 10,
    backgroundColor: theme.COLORS.primary
  },
  inputStyle: { width: theme.screenWidth - 90, borderWidth: 1, height: 41, backgroundColor: theme.COLORS.text },
  contactBtn: { marginTop: 19, borderRadius: 10, borderWidth: 1, width: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 41 },
  labelStyle: { color: '#000' },
  addItem: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 10, marginBottom: 15, borderColor: theme.COLORS.primary }
});
