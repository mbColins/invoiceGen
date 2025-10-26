import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ActivityIndicatorComponent from './ActivityIndicator';

interface ModalComponentProps {
  visible: boolean;
  onClose: () => void;
  message?: string;
  showLoader?: boolean;
  buttonText?: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({visible,onClose,message = 'Verifying your data',showLoader = true,
}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent
          visible={visible}
          onRequestClose={onClose}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {showLoader && <ActivityIndicatorComponent />}
              <Text style={styles.modalText}>{message}</Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'80%',
    height:'20%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
