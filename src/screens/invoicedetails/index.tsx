import { ActivityIndicator, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';
import Pdf from 'react-native-pdf';
import theme from '../../utils/theme';
import { useGetInvoiceQuery, useLazyGenerateInvoiceQuery } from '../../redux/apis/invoiceApi';

type InvoiceDetailsRouteProp = RouteProp<RootStackParamList, 'invoiceDetails'>;

const InvoiceDetails = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  

  const route = useRoute<InvoiceDetailsRouteProp>();
  const { invoiceNumber } = route.params;

  const { data, isFetching, refetch, isError, isSuccess } = useGetInvoiceQuery(invoiceNumber);

  const [triggerGenerateInvoice, { data: pdf, isLoading, error }] = useLazyGenerateInvoiceQuery();


  console.log(invoiceNumber)
  console.log(data)

  useEffect(() => {
    if (pdf) {
      console.log('Invoice generated successfully', pdf);
      // assuming your API returns a PDF URL
      setPdfUrl(pdf.url || pdf);
      // setModalVisible(true);
    }
  }, [pdf]);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {isFetching && <ActivityIndicator />}

      <View style={styles.customer}>
        <Text style={{ textAlign: 'right' }}>#INV: {data?.data?.invoiceNumber}</Text>
        <Text>customer: {data?.data?.customerName}</Text>
        <Text>phone number: {data?.data?.customerPhoneNumber}</Text>
      </View>

      <View style={styles.table}>
        <Text style={{ color: theme.COLORS.text }}>Itens list:</Text>
        <View style={styles.rowHeader}>
          <Text style={styles.cellHeader}>item</Text>
          <Text style={styles.cellHeader}>qty</Text>
          <Text style={styles.cellHeader}>u.price</Text>
          <Text style={styles.cellHeader}>tax</Text>
          <Text style={styles.cellHeader}>total</Text>
        </View>

        <View style={{}}>
          {
            data?.data?.items?.map((itm: { itemDetails: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; quantity: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; unitPrice: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; discount: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; tax: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; total: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>{itm.itemDetails}</Text>
                <Text style={styles.cell}>{itm.quantity}</Text>
                <Text style={styles.cell}>{itm.unitPrice}</Text>
                <Text style={styles.cell}>{itm.tax}</Text>
                <Text style={styles.cell}>{itm.total}</Text>
              </View>
            ))
          }
          <Text style={{ paddingHorizontal: 5, fontWeight: 500, marginTop: 20, textAlign: 'right', color: theme.COLORS.text }} >Total: {data?.data?.totalAmount} FCFA</Text>
        </View>

      </View>
      <View>
        <TouchableOpacity
          onPress={() => triggerGenerateInvoice(invoiceNumber)}
          style={styles.generateBtn}>
          <Text style={{ textAlign: 'center', padding: 10, color: theme.COLORS.text }} >Generate invoice</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeBtn}
          >
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>

          {pdfUrl && (
            <Pdf
              source={{ uri: pdfUrl, cache: true }}
              style={styles.pdf}
            />
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default InvoiceDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000121ff" },
  customer: { backgroundColor: '#fff', padding: 8, marginHorizontal: 18, marginTop: 5 },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  table: { margin: 16 },
  rowHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#aaa',
    backgroundColor: theme.COLORS.primary,
    marginBottom: 30
  },
  modalContainer: { flex: 1 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
  cellHeader: { flex: 1, fontWeight: 'bold', padding: 8, color: theme.COLORS.text },
  cell: { flex: 1, padding: 8, fontSize: 10 },
  generateBtn: { backgroundColor: theme.COLORS.primary, marginHorizontal: 18 },
  closeBtn: { padding: 10, backgroundColor: '#007bff' },
  closeBtnText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  pdf: { flex: 1, width: theme.screenWidth },
});
function setPdfUrl(arg0: any) {
  throw new Error('Function not implemented.');
}

