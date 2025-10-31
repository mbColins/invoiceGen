import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ItemsData {
  itemDetails: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
  discount: number;

}

interface InvoiceData {
  customerName: string;
  customerPhoneNumber: string;
  sellerSignature: string;
  customerSignature: string;
  items: ItemsData[];
}


const initialState: { data: InvoiceData } = {
  data: {
    'customerName': '',
    'customerPhoneNumber': '',
    'sellerSignature': '',
    'customerSignature': '',
    items: []
  }
}

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    registerInvoice: (state, action: PayloadAction<Partial<InvoiceData>>) => {
      state.data = { ...state.data, ...action.payload };
    },
    clearInvoice: (state) => {
      state.data.customerName = '';
      state.data.customerPhoneNumber = '';
      state.data.sellerSignature = '';
      state.data.customerSignature = '';
      state.data.items = []; // reset items array
    }
  }
});
export const { registerInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;