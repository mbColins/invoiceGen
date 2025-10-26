
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../components/TextInput';
import { useForm, useFieldArray } from 'react-hook-form';
import Label from '../../utils/Label';
import { Contact, Upload, UserRound, UserRoundPlus } from 'lucide-react-native';
import theme from '../../utils/theme';

interface Item {
  description: string;
  quantity: string;
  unitprice: string;
  tax: string;
  total: string;
}

interface InvoiceForm {
  customername: string;
  phonenumber: string;
  items: Item[];
}

const Invoice = () => {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'register', 'home'>;
  const navigation = useNavigation<NavigationProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<InvoiceForm>({
    defaultValues: {
      customername: '',
      phonenumber: '',
      items: [{ description: '', quantity: '', unitprice: '', tax: '', total: '' }],
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
        <Text style={styles.infoBoxTitle}>Customer Information</Text>
        <View style={{ display: 'flex', flexDirection: 'row', width: 200, gap: 10, marginTop: 20 }}>
          <View>
            <Label labeText='customer name' />
            <FormInput
              placeholder="Customer name"
              name="customername"
              control={control}
              errors={errors}
              rules={{ required: 'Customer name is required' }}
              inputStyle={styles.inputStyle}
              secureText={false}
            />
          </View>
          <TouchableOpacity style={styles.contactBtn}>
            <UserRoundPlus size={30} color={theme.COLORS.text} />
          </TouchableOpacity>
        </View>
        <Label labeText='phone number' />
        <FormInput
          placeholder="Phone number"
          name="phonenumber"
          control={control}
          errors={errors}
          rules={{ required: 'Phone number is required' }}
          inputStyle={{ borderWidth: 1, marginTop: 4, height: 41 }}
          secureText={false}
        />
      </View>

      {/* Item Details */}
      <View style={styles.itemsContainer}>
        <Text style={styles.infoBoxTitle}>Item details</Text>

        {fields.map((item, index) => (
          <View key={item.id} style={{ marginTop: 10 }}>
            <Label labeText='description/designation' />
            <FormInput
              placeholder="Description"
              name={`items.${index}.description`}
              control={control}
              errors={errors}
              rules={{ required: 'Description is required' }}
              inputStyle={{ borderWidth: 1, marginTop: 4, height: 41 }}
              secureText={false}
            />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Label labeText='quanity' />
                <FormInput
                  placeholder="Quantity"
                  name={`items.${index}.quantity`}
                  control={control}
                  errors={errors}
                  rules={{ required: 'Quantity is required' }}
                  inputStyle={{ borderWidth: 1, height: 41, width: 162 }}
                  secureText={false}
                />
              </View>
              <View>
                <Label labeText='unit price' />
                <FormInput
                  placeholder="Unit price"
                  name={`items.${index}.unitprice`}
                  control={control}
                  errors={errors}
                  rules={{ required: 'Unit price is required' }}
                  inputStyle={{ borderWidth: 1, height: 41, width: 162 }}
                  secureText={false}
                />
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Label labeText='tax' />
              <FormInput
                placeholder="ex:0.23"
                name={`items.${index}.tax`}
                control={control}
                errors={errors}
                rules={{ required: 'Tax is required' }}
                inputStyle={{ borderWidth: 1, height: 41 }}
                secureText={false}
              />
            </View>
            <View>
              <Label labeText='total' />
              <FormInput
                placeholder="total"
                name={`items.${index}.total`}
                control={control}
                errors={errors}
                rules={{ required: 'Total is required' }}
                inputStyle={{ borderWidth: 1, height: 41 }}
                secureText={false}
              />
            </View>


            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 10 }}>
              <TouchableOpacity
                onPress={() =>
                  append({ description: '', quantity: '', unitprice: '', tax: '', total: '' })
                }
                style={styles.addButton}
              >
                <Text style={{ color: '#ccc' }}>Add another item</Text>
              </TouchableOpacity>
              {index > 0 && (
                <TouchableOpacity
                  onPress={() => remove(index)}
                  style={styles.removeButton}
                >
                  <Text style={{ color: 'red' }}>Remove item</Text>
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
        <Text style={{ textAlign: 'center', color: theme.COLORS.primary }}>Save </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000121ff',
    paddingHorizontal: 15,
  },
  headerText: {
    textAlign: 'center',
    paddingVertical: 8,
    color: '#ccc',
  },
  infoBox: {
    marginTop: 10,
  },
  infoBoxTitle: {
    paddingHorizontal: 10,
    fontWeight: '600',
    marginTop: '10%',
    color: '#ccc',
  },
  itemsContainer: {
    marginTop: 10,
  },
  addButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderColor: '#ccc',
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
    borderColor: '#ccc',
    marginVertical: 20,
    paddingVertical: 10,
  },
  inputStyle: { width: 270, borderWidth: 1, height: 42 },
  contactBtn: { marginTop: 25, borderRadius: 10, borderWidth: 1, borderColor: '#fff', width: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 41 }
});
