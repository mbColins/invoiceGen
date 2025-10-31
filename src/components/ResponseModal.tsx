import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import theme, { screenWidth } from '../utils/theme';
import { Check, X } from 'lucide-react-native';

interface ResponseModalProps {
    visible: boolean;
    onClose: () => void;
    message?: string;
    title?: string;
    showLoader?: boolean;
    success?: boolean; // green for success, red for error
}

const ResponseModal: React.FC<ResponseModalProps> = ({
    visible,
    onClose,
    message = '',
    title = '',
    showLoader = false,
    success = true,
}) => {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {showLoader ? (
                        <ActivityIndicator size="large" color={theme.COLORS.primary} />
                    ) : (
                        <>
                            <Text style={[styles.title, { color: success ? 'green' : 'red' }]}>
                                {title || (success ? <Check color={theme.COLORS.success} /> : <X color={theme.COLORS.error} />)}
                            </Text>
                            <Text style={styles.message}>{message}</Text>
                            <TouchableOpacity onPress={onClose} style={styles.button}>
                                <Text style={styles.buttonText}>OK</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default ResponseModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(24, 6, 6, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: screenWidth - 60,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    message: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        width: '50%',
        backgroundColor: theme.COLORS.primary,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
