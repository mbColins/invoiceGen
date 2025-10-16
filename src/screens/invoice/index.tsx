// import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import React, { useState } from 'react'
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../utils/types';
// import { useNavigation } from '@react-navigation/native';
// import Button from '../../utils/Button';
// import FormInput from '../../components/TextInput';
// import { useForm,useFieldArray } from 'react-hook-form';

// interface Item {
//   description: string;
//   quantity: string;
//   unitprice: string;
//   tax: string;
//   total: string;
// }

// interface InvoiceForm {
//   items: Item[];
// }

// const Invoice = () => {

//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');

//     type regitrationNavigation = NativeStackNavigationProp<RootStackParamList, 'register', 'home'>;
//       const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

//     const navigation = useNavigation<regitrationNavigation>();
//     const onSubmit = () => {
//         console.log({ username, email, phoneNumber });
//         navigation.navigate('home')
//     };

//     return (
//         <ScrollView style={styles.container}>
//             <Text style={{ textAlign: 'center', paddingVertical: 4, color:'#ccc' }}>Fill in the following form to generate your invoice</Text>
//             <View style={styles.infoBox}>
//                  <Text style={styles.infoBoxTitle}>customer infomation</Text>
//                 <FormInput
//                 placeholder='customer name:'
//                 name='customername'
//                 control={control}
//                 errors={errors}
//                 rules={{ required: 'customer name is required' }}
//             />
//                 <FormInput
//                 placeholder='phone number name:'
//                 name='phonenumber'
//                 control={control}
//                 errors={errors}
//                 rules={{ required: 'phone number is required' }}
//             />
//             </View>
//            <View>
//              <Text style={styles.infoBoxTitle}>Item details</Text>
//              <View style={{marginTop:'5%'}}> 
//                <FormInput
//                 placeholder='description:'
//                 name='description'
//                 control={control}
//                 errors={errors}
//                 rules={{ required: 'description is required' }}
//             />
//              <FormInput
//                 placeholder='quantity:'
//                 name='quantity'
//                 control={control}
//                 errors={errors}
//                 rules={{ required: 'quantity is required' }}
//             />
//                  <FormInput
//                 placeholder='unit price:'
//                 name='unitprice'
//                 control={control}
//                 errors={errors}
//                 rules={{ required: 'unit orice is required' }}
//             />
               
//                 <FormInput
//                 placeholder='tax:'
//                 name='tax'
//                 control={control}
//                 errors={errors}
//                 rules={{ required: 'tax is required' }}
//             />
//                 <FormInput
//                 placeholder='total:'
//                 name='total'
//                 control={control}
//                 errors={errors}
//                 rules={{ required: 'total is required' }}
//             />
//                <View style={{alignItems:'flex-end'}}>
//                 <TouchableOpacity  style={{padding:5, borderWidth:1, borderRadius:10, marginTop:10}}>
//                    <Text style={{color:'#ccc'}}>add another item</Text>
//                 </TouchableOpacity>
//                </View>
//             </View>
//            </View>
//          <TouchableOpacity style={{width:'100%', borderWidth:1,borderRadius:10,borderColor:'#ccc'}}>
//             <Text style={{textAlign:'center',color:'#ccc'}}>save</Text>
//          </TouchableOpacity>
//         </ScrollView>
//     )
// }

// export default Invoice

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         backgroundColor: '#000121ff',
//         paddingHorizontal:15,
        
//     },
//     title: {
//         fontSize: 22,
//         fontWeight: '600',
//         marginBottom: 30,
//         color: '#ccc',
//     },
//     input: {
//         width: '100%',
//         // backgroundColor: '#000121ff',
//         borderColor: '#ccc',
//         borderBottomWidth: 1,
//         borderRadius: 10,
//         padding: 12,
//         // marginBottom: 5,
//         fontSize: 16,
//         color: '#ccc',
//     },
//     infoBox :{marginTop:10},
//     infoBoxTitle:{paddingHorizontal:10,fontWeight:500, marginTop:'10%',color:'#ccc'},
//     button: {
//         borderColor: '#ccc', borderWidth: 1, width: '100%', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center'
//     },
//     signUpBtn: { marginTop: '20%', marginBottom: '5%', alignItems: 'flex-start', width: '100%' },
//     buttonText: {
//         color: '#fff',
//         fontSize: 18,
//         textAlign: 'center',
//         fontWeight: '600',
//     },
//     termsContainer: {
//         marginTop: 25,
//         paddingHorizontal: 10,
//     },
//     termsText: {
//         textAlign: 'center',
//         color: '#555',
//         fontSize: 14,
//     },
//     link: {
//         color: '#007bff',
//         fontWeight: '500',
//     },
// });
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../components/TextInput';
import { useForm, useFieldArray } from 'react-hook-form';

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
        <FormInput
          placeholder="Customer name"
          name="customername"
          control={control}
          errors={errors}
          rules={{ required: 'Customer name is required' }}
        />
        <FormInput
          placeholder="Phone number"
          name="phonenumber"
          control={control}
          errors={errors}
          rules={{ required: 'Phone number is required' }}
        />
      </View>

      {/* Item Details */}
      <View style={styles.itemsContainer}>
        <Text style={styles.infoBoxTitle}>Item details</Text>

        {fields.map((item, index) => (
          <View key={item.id} style={{ marginTop: 10 }}>
            <FormInput
              placeholder="Description"
              name={`items.${index}.description`}
              control={control}
              errors={errors}
              rules={{ required: 'Description is required' }}
            />
            <FormInput
              placeholder="Quantity"
              name={`items.${index}.quantity`}
              control={control}
              errors={errors}
              rules={{ required: 'Quantity is required' }}
            />
            <FormInput
              placeholder="Unit price"
              name={`items.${index}.unitprice`}
              control={control}
              errors={errors}
              rules={{ required: 'Unit price is required' }}
            />
            <FormInput
              placeholder="Tax"
              name={`items.${index}.tax`}
              control={control}
              errors={errors}
              rules={{ required: 'Tax is required' }}
            />
            <FormInput
              placeholder="Total"
              name={`items.${index}.total`}
              control={control}
              errors={errors}
              rules={{ required: 'Total is required' }}
            />

            {index > 0 && (
              <TouchableOpacity
                onPress={() => remove(index)}
                style={styles.removeButton}
              >
                <Text style={{ color: 'red' }}>Remove item</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Add another item */}
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={() =>
              append({ description: '', quantity: '', unitprice: '', tax: '', total: '' })
            }
            style={styles.addButton}
          >
            <Text style={{ color: '#ccc' }}>Add another item</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
        <Text style={{ textAlign: 'center', color: '#ccc' }}>Save</Text>
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
});
