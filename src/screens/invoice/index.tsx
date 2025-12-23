
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../components/TextInput';
import { useForm, useFieldArray } from 'react-hook-form';
import Label from '../../utils/Label';
import { Contact, Save, Store, Upload, UserRound, UserRoundPlus } from 'lucide-react-native';
import theme, { screenWidth } from '../../utils/theme';
import SignatureScreen, { SignatureRef } from '../../components/SignaturePicker';
import { useInvoiceMutation } from '../../redux/apis/invoiceApi';
import ModalComponent from '../../utils/Modal';


interface Item {
  itemDetails: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
}

interface InvoiceForm {
  customerName: string;
  customerPhoneNumber: string;
  customerSignature: string;
  items: Item[];
}

const Invoice = () => {

  const [visible, setVisible] = useState(false);

  type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'home', 'shop'>;
  const navigation = useNavigation<NavigationProps>();

  const signatureRef = useRef<SignatureRef>(null);

  const [invoice, { data, isLoading, isError, isSuccess, error }] = useInvoiceMutation();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<InvoiceForm>({
    defaultValues: {
      customerName: '',
      customerPhoneNumber: '',
      customerSignature: '',
      items: [{ itemDetails: '', quantity: 0, unitPrice: 0, tax: 0, total: 0 }],
    },
  });


  useEffect(() => {
    if (isSuccess && data) {
      console.log("Loading data")
      navigation.navigate('home');

    }

    if (isError) {
      setVisible(false)
      Alert.prompt('Invoice Error', "Error");
      console.log(error)
    }
  })


  const { fields, append, remove } = useFieldArray({control,name: 'items',});

  const onSubmit = async (formValues: InvoiceForm) => {
    setVisible(true);

    const formData = new FormData();

    console.log(formData)

    // 👇 Basic customer info
    formData.append("customerName", formValues.customerName);
    formData.append("customerPhoneNumber", formValues.customerPhoneNumber);
    formData.append("customerSignature", formValues.customerSignature);

    console.log(formValues.customerSignature)
    // 👇 Add signature if available (base64 to file)

    // 👇 Add items dynamically (like Postman fields)
    formValues.items.forEach((item, index) => {
      formData.append(`invoiceRequests[${index}].invoice[itemDetails]`, item.itemDetails);
      formData.append(`invoiceRequests[${index}].invoice[quantity]`, item.quantity.toString());
      formData.append(`invoiceRequests[${index}].invoice[unitPrice]`, item.unitPrice.toString());
      formData.append(`invoiceRequests[${index}].invoice[discount]`, item.tax.toString());
    });

    try {
      const response = await invoice(formData).unwrap();
      console.log("✅ Invoice created:", response);

      // optional success message
      Alert.alert("Success", "Invoice created successfully!");
      navigation.navigate("home");

    } catch (err) {
      console.error("❌ Invoice creation failed:", err);
      Alert.alert("Error", "Could not create invoice. Try again.");
    } finally {
      setVisible(false);
    }
  };


  // const onSubmit = async (data: InvoiceForm) => {
  //   setVisible(true)
  //   console.log('Invoice submitted:', data);
  //   try {
  //     const payload = data
  //     await invoice(payload).unwrap();
  //     console.log(data)
  //   } catch (error) {
  //     setVisible(false)
  //     console.error('Error submitting invoice:', error);
  //     Alert.alert('Invoice Error', 'An unexpected error occurred.');
  //   }
  // };

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.headerText}>
        Fill in the following form to generate your invoice
      </Text>

      {/* Customer Info */}
      <View style={styles.infoBox}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.infoBoxTitle}>Customer Information</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('shop')}
            style={{ marginTop: 8 }}>
            <Text style={styles.infoBoxTitle}><Store /></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.customerDetails}>
          <View>
            <Label labeText='customer name' labelStyle={styles.labelStyle} />
            <FormInput
              placeholder="Customer name"
              name="customerName"
              control={control}
              errors={errors}
              rules={{ required: 'Customer name is required' }}
              inputStyle={styles.inputStyle}
              secureText={false}
              editable={true}
            />
          </View>
          <TouchableOpacity style={styles.contactBtn}>
            <UserRoundPlus size={30} color={'#000'} />
          </TouchableOpacity>
        </View>
        <Label labeText='phone number' labelStyle={styles.labelStyle} />
        <FormInput
          placeholder="Phone number"
          name="customerPhoneNumber"
          control={control}
          errors={errors}
          rules={{ required: 'Phone number is required' }}
          inputStyle={{ width: screenWidth - 25, borderWidth: 1, marginTop: 4, height: 41, backgroundColor: theme.COLORS.text, marginHorizontal: 3, color: '#000' }}
          secureText={false}
          editable={true}
          keyboardType='number-pad'
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
              name={`items.${index}.itemDetails`}
              control={control}
              errors={errors}
              rules={{ required: 'Description is required' }}
              inputStyle={styles.itemsLongInput}
              secureText={false}
              editable={true}
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
                  editable={true}
                  keyboardType='number-pad'
                />
              </View>
              <View>
                <Label labeText='unit price(xaf):' labelStyle={{ color: '#000' }} />
                <FormInput
                  placeholder="ex: 1500"
                  name={`items.${index}.unitPrice`}
                  control={control}
                  errors={errors}
                  rules={{ required: 'Unit price is required' }}
                  inputStyle={styles.itemsShortInput}
                  secureText={false}
                  editable={true}
                  keyboardType='number-pad'
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
                editable={true}
                keyboardType='number-pad'
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
                editable={true}
              />
            </View>


            <View style={styles.addItem}>
              <TouchableOpacity
                onPress={() =>
                  append({ itemDetails: '', quantity: 0, unitPrice: 0, tax: 0, total: 0 })
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
      <View style={{ display: 'flex', borderWidth: 1, width: screenWidth - 30, alignItems: 'center', borderColor: "#fff", height: 140, marginTop: 15, borderRadius: 10, justifyContent: 'center' }}>
        <Text style={{ color: theme.COLORS.text, textAlign: 'center' }}> digital signature</Text>
        <SignatureScreen
          ref={signatureRef}
          onSave={(sig) => {
            console.log('Parent received signature:', sig);
            setValue('customerSignature', sig); // 👈 store signature in form
          }}
          width={300}
          height={65}
        />

        <View style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: theme.screenWidth - 50 }}>
          <TouchableOpacity
            onPress={() => signatureRef.current?.clear()}
            style={{ width: 100, justifyContent: "flex-end" }}>
            <Text style={{ color: theme.COLORS.text, textAlign: 'right', marginHorizontal: 15, padding: 5 }}>clear</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* Submit */}
     
      <ModalComponent
        visible={visible && isLoading}
        onClose={() => setVisible(false)}
        message="Saving  invoice......"
        showLoader={true}
      />
    </ScrollView>
     <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
        <Text style={{ textAlign: 'center', color: theme.COLORS.text, }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  itemsLongInput: { borderWidth: 1, marginTop: 4, height: 41, backgroundColor: theme.COLORS.text, width: screenWidth - 30, color: '#000' },
  itemsShortInput: { borderWidth: 1, backgroundColor: theme.COLORS.text, width: screenWidth - 230, color: '#000' },
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
  inputStyle: { width: theme.screenWidth - 90, borderWidth: 1, height: 41, backgroundColor: theme.COLORS.text, color: '#000' },
  contactBtn: { marginTop: 19, borderRadius: 10, borderWidth: 1, width: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 41 },
  labelStyle: { color: '#000' },
  addItem: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 10, marginBottom: 15, borderColor: theme.COLORS.primary }
});
