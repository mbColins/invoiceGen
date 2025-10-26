import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { TextInput, View, Text, StyleSheet, TextStyle } from 'react-native';
import { COLORS, FONT_SIZE } from '../utils/theme';

interface FormInputProps {
    control: Control<any>;
    name: string;
    placeholder: string;
    rules?: object;
    errors: FieldErrors;
    inputStyle?: TextStyle;
    secureText:boolean;
}

const FormInput: React.FC<FormInputProps> = ({ control, name, placeholder, rules, errors, inputStyle, secureText }) => {
    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.input, inputStyle, errors[name] && styles.errorInput]}
                        placeholder={placeholder}
                        placeholderTextColor={COLORS.muted}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={secureText}
                    />
                )}
            />
            {errors[name] && (
                <Text style={styles.errorText}>
                    {(errors[name]?.message as string) || 'This field is required'}
                </Text>
            )}
        </View>
    );
};

export default FormInput;

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
    },
    input: {
        width: 340,
        backgroundColor: '#020221',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        borderRadius: 10,
        padding: 12,
        fontSize: 12,
        color: COLORS.text,

    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginTop: 4,
        fontSize: 13,
    },
});
