import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Status from '../../utils/StatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../utils/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';

// const purchaseInvoice = ;
// const service = ;

const invoiceTypes: { title: string; image: any, type: string }[] = [
  { title: 'purchase', image: require('../../assets/images/purchase.jpg'), type: 'invoice' },
  { title: 'service receipt', image: require('../../assets/images/service.jpg'), type: 'service' },
  { title: 'gift receipt', image: require('../../assets/images/gift.jpg'), type: 'gift' },
  { title: 'expense report', image: require('../../assets/images/expense.jpg'), type: 'service' },
  { title: 'invoice', image: require('../../assets/images/invoice.jpg'), type: 'service' },
  { title: 'custom receipt', image: require('../../assets/images/receipt.jpg'), type: 'service' },
];

const HomeScreen = () => {

  type invoiceNavigation = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<invoiceNavigation>();



  const handleNavigation = (type: keyof RootStackParamList) => {
    navigation.navigate(type);
  };


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={invoiceTypes}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <>
            <Status />
            <View style={styles.title}>
              <Text style={{ fontSize: 20, color: '#ccc' }}>Choose a receipt type</Text>
              <Text style={{ color: '#ccc' }}>
                Select the type of receipt you want to create
              </Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}
            onPress={() => handleNavigation(item.type as keyof RootStackParamList)}
          >
            <Image source={item.image} style={styles.invoice} />
            <Text style={{ color: '#ccc', marginVertical: 4 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      {/* <View style={styles.btn}><Button title='sujest invoice type' /></View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000121ff', alignItems: 'center' },
  title: { justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  card: {
    borderWidth: 1, backgroundColor: '#5a5959ff', borderColor: '#aca6a6ff', height: 150, width: 130, alignItems: 'center', borderRadius: 10, marginTop: 10, marginHorizontal: 15, paddingTop: 20,
  },
  invoice: { height: 90, width: 90, borderRadius: 10 },
  btn: { position: 'absolute', bottom: 30 }
});
