import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface businessDetailsData {
    logo: string;
    companyInitials: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    city: string;
    signature: string;
    location: string;
    referenceStructure: string;
}

const initialState: { data: businessDetailsData } = {
    data: {
        'logo': '',
        'companyInitials': '',
        'companyName': '',
        'phoneNumber': '',
        'email': '',
        'city': '',
        'signature': '',
        'location': '',
        'referenceStructure': '',
    }
}

const businessSlie = createSlice({
    name: 'business',
    initialState,
    reducers: {
        createBusiness: (state, action: PayloadAction<Partial<businessDetailsData>>) => {
            state.data = { ...state.data, ...action.payload };
        }

    }
})

export const {} = businessSlie.actions;
export default businessSlie.reducer;