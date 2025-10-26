import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FormInput from '../../components/TextInput'
import { useFieldArray, useForm } from 'react-hook-form'

interface Item {
  description: string;
  quantity: string;
  store: string;
  address: string;
}

interface GiftForm {
  date: any;
  customername: string;
  sendername: string;
  items: Item[];

}

const GiftScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<GiftForm>({
    defaultValues: {
      date: '',
      customername: '',
      sendername: '',
      items: [{ description: '', quantity: '', store: '', address: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  const onSubmit = (data: GiftForm) => {
    console.log('invoice submited', data)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={{ textAlign: 'center', paddingVertical: 5 }}>Fill in the bellw from to create your receipts</Text>
      <View>
        <FormInput
          placeholder='date'
          name='date'
          control={control}
          errors={errors}
          rules={{ required: 'date is required' }}
        />
        <FormInput
          placeholder='customer name'
          name='customername'
          control={control}
          errors={errors}
          rules={{ required: 'customer name is required' }}
        />
        <FormInput
          placeholder='sender name'
          name='sendernmae'
          control={control}
          errors={errors}
          rules={{ required: 'sender name is required' }}
        />
      </View>
      <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
        <Text>Gift information</Text>
      </View>
      <View>
        {fields.map((item, index) => (
          <View key={item.id}>
            <FormInput
              placeholder='description'
              name={`items.${index}.description`}
              control={control}
              errors={errors}
              rules={{ required: 'description is required' }}
            />
            <FormInput
              placeholder='quantity'
              name={`items.${index}.quantity`}
              control={control}
              errors={errors}
              rules={{ required: 'quantity is required' }}
            />
            <FormInput
              placeholder='store'
              name={`items.${index}.store`}
              control={control}
              errors={errors}
              rules={{ required: 'store is required' }}
            />
            <FormInput
              placeholder='address'
              name={`items.${index}.address`}
              control={control}
              errors={errors}
              rules={{ required: 'address is required' }}
            />

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() =>
                  append({ description: '', quantity: '', store: '', address: '' })}
              >
                <Text style={{color:'#fff'}}>add another gift</Text>

              </TouchableOpacity>
              {index > 0 && (
                <TouchableOpacity
                  onPress={() => remove(index)}
                // style={styles.removeButton}
                >
                  <Text style={{ color: 'red' }}>remove item</Text>
                </TouchableOpacity>
              )}

            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={{ backgroundColor: 'blue', marginVertical: '5%', borderRadius: 10 }}
        onPress={() => handleSubmit(onSubmit)}
      >
        <Text style={{ color: '#fff', textAlign: 'center', padding: 10 }}>save</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default GiftScreen

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10,backgroundColor:'#000121ff' }
})