import { ActivityIndicator, Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import Status from '../../utils/StatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../utils/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../components/CustomStatusBar';
import theme from '../../utils/theme';
import { useGetCurrentUserInvoicesQuery } from '../../redux/apis/invoiceApi';
import formatDateToDDMMYY from '../../utils/utils';

// const purchaseInvoice = ;
// const service = ;

const invoiceTypes: { title: string; image: any, type: string }[] = [
  { title: 'purchase', image: require('../../assets/images/purchase.jpg'), type: 'invoice' },
  { title: 'service receipt', image: require('../../assets/images/service.jpg'), type: 'service' },
  { title: 'gift receipt', image: require('../../assets/images/gift.jpg'), type: 'gift' },
  { title: 'expense report', image: require('../../assets/images/expense.jpg'), type: 'service' },
  { title: 'invoice', image: require('../../assets/images/invoice.jpg'), type: 'service' },
  { title: 'custom receipt', image: require('../../assets/images/receipt.jpg'), type: 'service' },
  { title: 'invoice', image: require('../../assets/images/invoice.jpg'), type: 'service' },
  { title: 'custom receipt', image: require('../../assets/images/receipt.jpg'), type: 'service' },
];

const screenWidth = Dimensions.get('window').width;


const HomeScreen = () => {

  type invoiceNavigation = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<invoiceNavigation>();

  const { data = [], isFetching, refetch, isError, isSuccess } = useGetCurrentUserInvoicesQuery({
    filter: undefined,
    search: undefined,
    page: 0,
    size: 10,
  });

  const handleNavigation = (type: keyof RootStackParamList, params?: RootStackParamList[keyof RootStackParamList]) => {
    navigation.navigate(type as any, params as any);
  };
  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  console.log(data)

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      {/* <View>
  {
    in
  }
</View> */}

      {isFetching && <ActivityIndicator color={theme.COLORS.primary} />}
      <FlatList
        data={invoiceTypes}
        keyExtractor={(_, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={styles.contentContainer}        // ListHeaderComponent={
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => handleNavigation(item.type as keyof RootStackParamList)}>
              <Image source={item.image} style={styles.invoice} />
            </TouchableOpacity>
            <Text style={{ color: '#0b0b0bff', fontSize: 10, marginTop: 10 }}>{item.title}</Text>
          </View>
        )}
        scrollEnabled={false}
      />


      <Text style={{ textAlign: 'left',width:theme.screenWidth,paddingLeft:20,fontWeight: 500,backgroundColor:theme.COLORS.text }}>Recent transactions</Text>
      <FlatList
        data={data?.table ?? []} // <-- use the table array
        keyExtractor={(item) => item?.id} // use unique id if available
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('invoiceDetails', { invoiceNumber: item.invoiceNumber })}
            key={index} style={styles.incoices}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 500 }}>{item.customerName}</Text>
              <Text style={{ fontSize: 8, color: theme.COLORS.success, fontWeight: 800, textAlign: 'center' }}>paid</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }} key={index}>
              <Text style={{ fontSize: 12 }}>puchase: {item.invoiceNumber}</Text>
              <Text style={{ fontSize: 10 }}>{formatDateToDDMMYY(item.createdAt)}</Text>
              <Text style={{ fontSize: 12 }}>XAF:{item.totalAmount}</Text>
            </View>
          </TouchableOpacity>
        )}
        scrollEnabled
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />}
        contentContainerStyle={ styles.footerStyle}
      />
 

  



    </SafeAreaView >
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000121ff', alignItems: 'center' },
  title: { justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  card: {
    backgroundColor: "#d7e3fcff", height: 70, width: 70, alignItems: 'center', borderRadius: 10, marginVertical: 10, marginHorizontal: 10, paddingTop: 25, justifyContent: 'center',
  },
  invoice: { height: 50, width: 50, borderRadius: 10 },
  btn: { position: 'absolute', bottom: 30 },
  statistics: { backgroundColor: theme.COLORS.text, height: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 30, marginBottom: 10 },
  statisticsItem: { justifyContent: 'center', alignItems: 'flex-start' },
  text: { color: theme.COLORS.background, fontSize: 12, textAlign: 'left', fontStyle: 'italic' },
  contentContainer: {backgroundColor: '#fff',  width: screenWidth, alignItems: 'center',  height:350, borderRadius:10},
  footerStyle: {backgroundColor: '#fff', justifyContent: 'flex-start', alignItems: 'flex-start', alignContent: 'flex-start', width: screenWidth },
  incoices: { marginHorizontal: 10, width: screenWidth - 20, borderBottomWidth: 1, borderBottomColor: '#d7d2d2ff', marginVertical: 5, backgroundColor: '#faf6f6ff', padding: 5, borderRadius: 10 }
});
