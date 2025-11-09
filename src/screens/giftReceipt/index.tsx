import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FormInput from '../../components/TextInput'
import { useFieldArray, useForm } from 'react-hook-form'
import theme from '../../utils/theme';

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
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ textAlign: 'center', paddingVertical: 5, color: theme.COLORS.text, marginTop: 40 }}>Fill in the bellw from to create your receipts</Text>
        <View style={{ backgroundColor: theme.COLORS.text, borderRadius: 10 }}>
          <FormInput
            placeholder='date:'
            name='date'
            control={control}
            errors={errors}
            rules={{ required: 'date is required' }}
            secureText={false}
            editable={true}
            inputStyle={styles.input}
          />
          <FormInput
            placeholder='customer name:'
            name='customername'
            control={control}
            errors={errors}
            rules={{ required: 'customer name is required' }}
            inputStyle={styles.input}
            secureText={false}
            editable={true}
          />
          <FormInput
            placeholder='sender name:'
            name='sendernmae'
            control={control}
            errors={errors}
            rules={{ required: 'sender name is required' }}
            inputStyle={styles.input}
            secureText={false}
            editable={true}
          />
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
          <Text style={{ color: theme.COLORS.text, marginBottom: 4 }}>Gift information</Text>
        </View>
        <View style={{ backgroundColor: theme.COLORS.text, borderRadius: 10, paddingBottom: 10 }}>
          {fields.map((item, index) => (
            <View key={item.id}>
              <FormInput
                placeholder='description:'
                name={`items.${index}.description`}
                control={control}
                errors={errors}
                rules={{ required: 'description is required' }}
                secureText={false}
                editable={true}
                inputStyle={styles.input}
              />
              <FormInput
                placeholder='quantity:'
                name={`items.${index}.quantity`}
                control={control}
                errors={errors}
                rules={{ required: 'quantity is required' }}
                inputStyle={styles.input}
                secureText={false}
                editable={true}
              />
              <FormInput
                placeholder='store:'
                name={`items.${index}.store`}
                control={control}
                errors={errors}
                rules={{ required: 'store is required' }}
                inputStyle={styles.input}
                secureText={false}
                editable={true}
              />
              <FormInput
                placeholder='address'
                name={`items.${index}.address`}
                control={control}
                errors={errors}
                rules={{ required: 'address is required' }}
                inputStyle={styles.input}
                secureText={false}
                editable={true}

              />

              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 10 }}>
                <TouchableOpacity
                  style={{ marginHorizontal: 10 }}
                  onPress={() =>
                    append({ description: '', quantity: '', store: '', address: '' })}
                >
                  <Text style={{ color: theme.COLORS.success, }}>add gift</Text>

                </TouchableOpacity>
                {index > 0 && (
                  <TouchableOpacity
                    onPress={() => remove(index)}
                  // style={styles.removeButton}
                  >
                    <Text style={{ color: 'red' }}>remove</Text>
                  </TouchableOpacity>
                )}

              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{ backgroundColor: theme.COLORS.primary, marginVertical: '5%', borderRadius: 10 }}
        onPress={() => handleSubmit(onSubmit)}
      >
        <Text style={{ color: '#fff', textAlign: 'center', padding: 10 }}>save</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GiftScreen

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, backgroundColor: '#000121ff', flex:1 },
  input: { backgroundColor: '#fff', color: theme.COLORS.background }
})