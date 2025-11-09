// import { ActivityIndicator, Alert, Image, Modal, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useRoute } from '@react-navigation/native';
// import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../utils/types';
// import Pdf from 'react-native-pdf';
// import theme from '../../utils/theme';
// import { useGetInvoiceQuery, useLazyGenerateInvoiceQuery } from '../../redux/apis/invoiceApi';
// import { Download, Share2, Trash2 } from 'lucide-react-native';
// import RNFS from 'react-native-fs';
// import Share from 'react-native-share';

// type InvoiceDetailsRouteProp = RouteProp<RootStackParamList, 'invoiceDetails'>;

// const InvoiceDetails = () => {

//   const [modalVisible, setModalVisible] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);


//   const route = useRoute<InvoiceDetailsRouteProp>();
//   const { invoiceNumber } = route.params;


//   const { data, isFetching, refetch, isError, isSuccess } = useGetInvoiceQuery(invoiceNumber);
//   const [triggerGenerateInvoice, { data: pdf, isLoading, error }] = useLazyGenerateInvoiceQuery();


//   console.log(invoiceNumber)
//   console.log(pdf)

//   useEffect(() => {
//     if (pdf) {
//       console.log('Invoice generated successfully', pdf);

//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         try {
//           const base64 = (reader.result as string).split(',')[1];
//           const path = `${RNFS.DocumentDirectoryPath}/invoice_${invoiceNumber}.pdf`;
//           await RNFS.writeFile(path, base64, 'base64');
//           setPdfUrl(`file://${path}`);
//           setModalVisible(true);
//         } catch (e) {
//           console.error('Error writing file:', e);
//         }
//       };
//       reader.readAsDataURL(pdf);
//     }
//   }, [pdf]);




//   async function requestStoragePermission() {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'Storage Permission',
//           message: 'App needs access to your storage to save PDF files',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   }

//   const handleDownloadPDF = async () => {
//     const hasPermission = await requestStoragePermission();
//     if (!hasPermission) return;
//     if (!pdfUrl) {
//       Alert.alert('Error', 'No PDF available to download');
//       return;
//     }
//     try {
//       const localPath = `${RNFS.DocumentDirectoryPath}/invoice_${invoiceNumber}.pdf`;

//       const result = await RNFS.downloadFile({
//         fromUrl: pdfUrl,
//         toFile: localPath,
//       }).promise;

//       if (result.statusCode === 200) {
//         Alert.alert('Download complete', `Saved to: ${localPath}`);
//       } else {
//         Alert.alert('Error', 'Download failed');
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error', 'Could not download PDF');
//     }
//   };

//   const handleSharePDF = async () => {
//   if (!pdfUrl) {
//     Alert.alert('Error', 'No PDF available to share');
//     return;
//   }
//   try {
//     const localPath = `${RNFS.DocumentDirectoryPath}/invoice_${invoiceNumber}.pdf`;

//     // Ensure it exists locally before sharing
//     await RNFS.downloadFile({
//       fromUrl: pdfUrl,
//       toFile: localPath,
//     }).promise;

//     await Share.open({
//       title: 'Share Invoice',
//       url: `file://${localPath}`,
//       type: 'application/pdf',
//     });
//   } catch (err) {
//     console.error(err);
//     Alert.alert('Error', 'Could not share PDF');
//   }
// };


//   return (
//     <ScrollView contentContainerStyle={styles.container}>

//       {isFetching && <ActivityIndicator />}

//       <View style={{ width: theme.screenWidth }}>
//         {/* <Text style={{textAlign:'right', marginRight:10}}>
//          <Trash2 color={theme.COLORS.warning}/>
//        </Text> */}
//         {/* <Text style={{textAlign:'right'}}>
//          <Trash2 color={theme.COLORS.warning}/>
//        </Text> */}
//       </View>

//       <View style={styles.customer}>
//         <Text style={{ textAlign: 'right' }}>#INV: {data?.data?.invoiceNumber}</Text>
//         <Text>customer: {data?.data?.customerName}</Text>
//         <Text>phone number: {data?.data?.customerPhoneNumber}</Text>
//       </View>

//       <View style={{ backgroundColor: theme.COLORS.text, width: theme.screenWidth, borderTopRightRadius: 10, borderTopLeftRadius: 10, marginTop: 20 }}>

//         <View style={styles.table}>
//           <Text style={{ color: theme.COLORS.background }}>Itens list:</Text>
//           <View style={styles.rowHeader}>
//             <Text style={styles.cellHeader}>item</Text>
//             <Text style={styles.cellHeader}>qty</Text>
//             <Text style={styles.cellHeader}>u.price</Text>
//             <Text style={styles.cellHeader}>tax</Text>
//             <Text style={styles.cellHeader}>total</Text>
//           </View>

//           {
//             data?.data?.items?.map((itm: { itemDetails: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; quantity: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; unitPrice: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; discount: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; tax: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; total: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
//               <View key={index} style={styles.row}>
//                 <Text style={styles.cell}>{itm.itemDetails}</Text>
//                 <Text style={styles.cell}>{itm.quantity}</Text>
//                 <Text style={styles.cell}>{itm.unitPrice}</Text>
//                 <Text style={styles.cell}>{itm.tax}</Text>
//                 <Text style={styles.cell}>{itm.total}</Text>
//               </View>
//             ))
//           }
//           <Text style={{ paddingHorizontal: 5, fontWeight: 500, marginVertical: 20, textAlign: 'right', color: '#0000' }} >Total: {data?.data?.totalAmount} FCFA</Text>
//         </View>

//       </View>
//       <View style={{ display: 'flex', alignContent: 'center', width: theme.screenWidth, marginHorizontal: 10 }}>
//         <TouchableOpacity
//           onPress={() => {
//             triggerGenerateInvoice(invoiceNumber)
//             setModalVisible(true)
//             console.log("yeeeeeeeeeeeeeeeeeeeeee")
//           }}
//           style={styles.generateBtn}>
//           <Text style={{ textAlign: 'center', padding: 10, color: theme.COLORS.text }} >Generate invoice</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             triggerGenerateInvoice(invoiceNumber)
//             setModalVisible(true)
//             console.log("yeeeeeeeeeeeeeeeeeeeeee")
//           }}
//           style={styles.generateBtn}>
//           <Text style={{ textAlign: 'center', padding: 10, color: theme.COLORS.text }} >Generate invoice</Text>
//         </TouchableOpacity>
//       </View>

//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContainer}>
//           <View>
//             <TouchableOpacity
//               onPress={() => setModalVisible(false)}
//               style={styles.closeBtn}>
//               <Text style={styles.closeBtnText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//           {pdfUrl && (
//             <Pdf
//               source={{ uri: pdfUrl, cache: true }}
//               style={styles.pdf}

//             />
//           )}


//         </View>
//         <View style={styles.optionBtn}>
//           <TouchableOpacity
//             onPress={handleDownloadPDF}
//           >
//             <Text style={styles.closeBtnText}><Download color={theme.COLORS.text} /></Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//           onPress={handleSharePDF}
//           >
//             <Text style={styles.closeBtnText}><Share2 color={theme.COLORS.text} /></Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// export default InvoiceDetails;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#000121ff" },
//   customer: { backgroundColor: '#fff', padding: 8, marginTop: 5, borderRadius: 10 },
//   text: {
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   table: { padding: 1 },
//   rowHeader: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignContent: 'center',
//     flexDirection: 'row',
//     borderColor: '#aaa',
//     // width: theme.screenWidth ,
//     backgroundColor: theme.COLORS.primary,
//   },
//   modalContainer: { flex: 1 },
//   row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
//   cellHeader: { flex: 1, fontWeight: 'bold', padding: 8, color: theme.COLORS.text },
//   cell: { flex: 1, padding: 8, fontSize: 10 },
//   generateBtn: { backgroundColor: theme.COLORS.primary, position: 'absolute', bottom: -150, width: theme.screenWidth - 20 },
//   closeBtn: { padding: 10, backgroundColor: '#007bff' },
//   optionBtn: { padding: 10, backgroundColor: '#007bff', marginBottom: 20, marginHorizontal: 10, display: 'flex', flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-around' },
//   closeBtnText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
//   pdf: { flex: 1, width: theme.screenWidth, height: theme.screenHeight },
// });
// function setPdfUrl(arg0: any) {
//   throw new Error('Function not implemented.');
// }



import {
  ActivityIndicator,
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/types';
import Pdf from 'react-native-pdf';
import theme from '../../utils/theme';
import { useGetInvoiceQuery, useLazyGenerateInvoiceQuery } from '../../redux/apis/invoiceApi';
import { Download, Share2 } from 'lucide-react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

type InvoiceDetailsRouteProp = RouteProp<RootStackParamList, 'invoiceDetails'>;

const InvoiceDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const route = useRoute<InvoiceDetailsRouteProp>();
  const { invoiceNumber } = route.params;

  const { data, isFetching } = useGetInvoiceQuery(invoiceNumber);
  const [triggerGenerateInvoice, { data: pdfBlob, isLoading }] = useLazyGenerateInvoiceQuery();

  // Convert the backend PDF bytes to a local file
 const savePDF = async (blob: any) => {
  try {
    // Convert blob to base64 using FileReader
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Data = (reader.result as string).split(',')[1]; // get only base64 part
        const path = `${RNFS.DocumentDirectoryPath}/invoice_${data?.data?.customerName}.pdf`;
        await RNFS.writeFile(path, base64Data, 'base64');
        setPdfUrl(`file://${path}`);
        setModalVisible(true);
      } catch (e) {
        console.error('Error writing file:', e);
        Alert.alert('Error', 'Failed to save PDF');
      }
    };
    reader.readAsDataURL(blob); // this will convert blob to base64
  } catch (e) {
    console.error('Error saving PDF:', e);
    Alert.alert('Error', 'Failed to process PDF');
  }
};


  useEffect(() => {
    if (pdfBlob) {
      savePDF(pdfBlob as Blob);
    }
  }, [pdfBlob]);

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      const hasPermission =
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED ||
        Platform.Version >= 33; // Android 13+ handles it automatically

      return hasPermission;
    } catch (err) {
      console.error('Permission error:', err);
      Alert.alert('Error', 'Storage permission not granted');
      return false;
    }
  }
  return true;
};

const handleDownloadPDF = async () => {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) return;

  if (!pdfUrl) {
    Alert.alert('Error', 'No PDF available to download');
    return;
  }

  try {
    const sourcePath = pdfUrl.replace('file://', '');
    const destPath = `${RNFS.DownloadDirectoryPath}/invoice_${data?.data?.customerName}.pdf`;

    const exists = await RNFS.exists(sourcePath);
    console.log('Source path:', sourcePath);
    console.log('File exists:', exists);

    if (!exists) {
      Alert.alert('Error', 'PDF file not found on device');
      return;
    }

    await RNFS.copyFile(sourcePath, destPath);

    console.log('File saved to:', destPath);
    Alert.alert('✅ Download Complete', `Saved to:\n${destPath}`);
  } catch (err) {
    console.error('Download error:', err);
    Alert.alert('Error', 'Could not download PDF');
  }
};


const handleSharePDF = async () => {
  if (!pdfUrl) {
    Alert.alert('Error', 'No PDF available to share');
    return;
  }

  try {
    console.log('PDF URL:', pdfUrl);

    // Copy file to cache so other apps can access it
    const fileName = pdfUrl.split('/').pop() || `invoice_${data?.data?.customerName}.pdf`;
    const tempPath = `${RNFS.CachesDirectoryPath}/${fileName}`;

    // Remove `file://` before copying
    await RNFS.copyFile(pdfUrl.replace('file://', ''), tempPath);

    const sharePath = `file://${tempPath}`;

    await Share.open({
      title: 'Share Invoice',
      url: sharePath,
      type: 'application/pdf',
    });
  } catch (err) {
    console.error('Share error:', err);
    Alert.alert('Error', 'Could not share PDF');
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isFetching && <ActivityIndicator />}

      <View style={styles.customer}>
        <Text style={{ textAlign: 'right' }}>#INV: {data?.data?.invoiceNumber}</Text>
        <Text>customer: {data?.data?.customerName}</Text>
        <Text>phone number: {data?.data?.customerPhoneNumber}</Text>
      </View>

      <View style={{ backgroundColor: theme.COLORS.text, width: theme.screenWidth, borderTopRightRadius: 10, borderTopLeftRadius: 10, marginTop: 20 }}>
        <View style={styles.table}>
          <Text style={{ color: theme.COLORS.background }}>Items list:</Text>
          <View style={styles.rowHeader}>
            <Text style={styles.cellHeader}>item</Text>
            <Text style={styles.cellHeader}>qty</Text>
            <Text style={styles.cellHeader}>u.price</Text>
            <Text style={styles.cellHeader}>tax</Text>
            <Text style={styles.cellHeader}>total</Text>
          </View>

          {data?.data?.items?.map((itm: any, index: number) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{itm.itemDetails}</Text>
              <Text style={styles.cell}>{itm.quantity}</Text>
              <Text style={styles.cell}>{itm.unitPrice}</Text>
              <Text style={styles.cell}>{itm.tax}</Text>
              <Text style={styles.cell}>{itm.total}</Text>
            </View>
          ))}
          <Text style={{ paddingHorizontal: 5, fontWeight: '500', marginVertical: 20, textAlign: 'right', color: '#0000' }}>
            Total: {data?.data?.totalAmount} FCFA
          </Text>
        </View>
      </View>

      <View style={{ display: 'flex', alignContent: 'center', width: theme.screenWidth, marginHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => triggerGenerateInvoice(invoiceNumber)}
          style={styles.generateBtn}>
          <Text style={{ textAlign: 'center', padding: 10, color: theme.COLORS.text }}>Generate invoice</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>

          {pdfUrl && <Pdf source={{ uri: pdfUrl, cache: true }} style={styles.pdf} />}
        </View>

        <View style={styles.optionBtn}>
          <TouchableOpacity onPress={handleDownloadPDF}>
            <Text style={styles.closeBtnText}><Download color={theme.COLORS.text} /></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSharePDF}>
            <Text style={styles.closeBtnText}><Share2 color={theme.COLORS.text} /></Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default InvoiceDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000121ff" },
  customer: { backgroundColor: '#fff', padding: 8, marginTop: 5, borderRadius: 10 },
  table: { padding: 1 },
  rowHeader: { flexDirection: 'row', backgroundColor: theme.COLORS.primary },
  modalContainer: { flex: 1 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
  cellHeader: { flex: 1, fontWeight: 'bold', padding: 8, color: theme.COLORS.text },
  cell: { flex: 1, padding: 8, fontSize: 10 },
  generateBtn: { backgroundColor: theme.COLORS.primary, position: 'absolute', bottom: -150, width: theme.screenWidth - 20 },
  closeBtn: { padding: 10, backgroundColor: '#007bff' },
  optionBtn: { padding: 10, backgroundColor: '#007bff', marginBottom: 20, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-around' },
  closeBtnText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  pdf: { flex: 1, width: theme.screenWidth, height: theme.screenHeight },
});
