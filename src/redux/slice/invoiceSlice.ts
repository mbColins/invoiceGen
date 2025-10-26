import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InvoiceData {
    customerName: string;
    customerPhoneNumber: string;
    itemDetails: string;
    quantity: string;
    unitPrice: string;
    sellerSignature: string;
    customerSignature: string;
}


const initialState: { data: InvoiceData } = {
    data: {
        'customerName': '',
        'customerPhoneNumber': '',
        'itemDetails': '',
        'quantity': '',
        'unitPrice': '',
        'sellerSignature': '',
        'customerSignature': ''
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
      Object.keys(state.data).forEach((key) => {
        state.data[key as keyof InvoiceData] = '';
      });
    }
  }
});
export const { } = invoiceSlice.actions;
export default invoiceSlice.reducer;