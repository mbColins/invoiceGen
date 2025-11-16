import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FormInput from '../../components/TextInput'
import { useFieldArray, useForm } from 'react-hook-form';
import theme from '../../utils/theme';
import Label from '../../utils/Label';
import { Download } from 'lucide-react-native';


interface Item {
    description: string;
    hours: number;
    rate: number;
    amount: number;


}

interface ServiceItem {
    name: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    services: Item[];
}

const ReciptScreen = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<ServiceItem>({
        defaultValues: {
            name: '', phone: '', address: '', city: '', country: '',
            services: [{ description: '', hours: 0.0, rate: 0.0, amount: 0.0 }]
        }
    });
    const { fields, append, remove } = useFieldArray({ control, name: 'services' })
    return (
        <View style={styles.container}>
            <Text style={{marginBottom:10}}>Generate the service receipt requested by you customer</Text>
            <ScrollView>
                <Text style={{ marginVertical: 10 }}>Customers information</Text>
                <View style={{ backgroundColor: '#fff', padding: 5, borderRadius: 10 }}>
                    {/* <Label labeText='name: ' labelStyle={{ color: theme.COLORS.background }} /> */}
                    <FormInput
                        placeholder="name:"
                        name="name"
                        control={control}
                        errors={errors}
                        rules={{ required: 'name is required' }}
                        secureText={false}
                        editable={true}
                        inputStyle={styles.inputStyles}
                    />
                    <FormInput
                        placeholder="phone:"
                        name="phone"
                        control={control}
                        errors={errors}
                        rules={{ required: 'user name is required' }}
                        secureText={false}
                        editable={true}
                        inputStyle={styles.inputStyles}
                    />
                    <FormInput
                        placeholder="address:"
                        name="address"
                        control={control}
                        errors={errors}
                        rules={{ required: 'user name is required' }}
                        secureText={false}
                        editable={true}
                        inputStyle={styles.inputStyles}
                    />
                    <FormInput
                        placeholder="city:"
                        name="city"
                        control={control}
                        errors={errors}
                        rules={{ required: 'user name is required' }}
                        secureText={false}
                        editable={true}
                        inputStyle={styles.inputStyles}
                    />

                    <FormInput
                        placeholder="country:"
                        name="country"
                        control={control}
                        errors={errors}
                        rules={{ required: 'country is required' }}
                        secureText={false}
                        editable={true}
                        inputStyle={styles.inputStyles}
                    />
                </View>
                <View>
                    <Text style={{ marginTop: 20 }}>Service info</Text>
                    {fields.map((item, index) => (
                        <View style={{ backgroundColor: '#fff', marginTop: 10, borderRadius: 10 }}>
                            <FormInput
                                placeholder="description:"
                                name={`services.${index}.description`}
                                control={control}
                                errors={errors}
                                rules={{ required: 'country is required' }}
                                secureText={false}
                                editable={true}
                                inputStyle={styles.inputStyles}
                            />
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                                <FormInput
                                    placeholder="hours:"
                                    name={`services.${index}.hours`}
                                    control={control}
                                    errors={errors}
                                    rules={{ required: 'country is required' }}
                                    secureText={false}
                                    editable={true}
                                    inputStyle={{ width: theme.screenWidth / 3 + 50, backgroundColor: '#fff' }}
                                />
                                <FormInput
                                    placeholder="rate:"
                                    name={`services.${index}.rate`}
                                    control={control}
                                    errors={errors}
                                    rules={{ required: 'country is required' }}
                                    secureText={false}
                                    editable={true}
                                    inputStyle={{ width: theme.screenWidth / 2 - 20, backgroundColor: '#fff' }}
                                />
                            </View>
                            <FormInput
                                placeholder="amount:"
                                name={`services.${index}.amount`}
                                control={control}
                                errors={errors}
                                rules={{ required: 'country is required' }}
                                secureText={false}
                                editable={true}
                                inputStyle={styles.inputStyles}
                            />
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 10, gap: 10 }}>
                                <TouchableOpacity
                                    onPress={() => append({ description: '', hours: 0.0, rate: 0.0, amount: 0.0 })}>
                                    <Text style={{ color: theme.COLORS.success }}>add service</Text>
                                </TouchableOpacity>
                                {index > 0 && (
                                    <TouchableOpacity>
                                        <Text style={{ color: theme.COLORS.error }}>remove</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.submitBtn}>
                <Text style={{ color: theme.COLORS.text }}>save</Text>
                <Download color={theme.COLORS.text} />
            </TouchableOpacity>
        </View>
    )
}

export default ReciptScreen

const styles = StyleSheet.create({
    container: { flex: 1, alignContent: 'center',paddingHorizontal: 10 },
    inputStyles: { backgroundColor: '#fff', color: theme.COLORS.background },
    submitBtn: { backgroundColor: theme.COLORS.primary, display: 'flex', flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10, borderRadius: 10, height: 40, alignItems: 'center', marginVertical: 10, gap: 10 }
})