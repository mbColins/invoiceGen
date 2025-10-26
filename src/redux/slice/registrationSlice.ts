import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: {
        username: '',
        phoneNumber: '',
        email: '',
        password: '',
    }
}


export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            const { username, phoneNumber, email, password } = action.payload;
            state.data.username = username;
            state.data.email = email;
            state.data.password = password;
            state.data.phoneNumber = phoneNumber;
        },

        clearRegistration: (state) => {
            state.data.username = '';
            state.data.password = '';
            state.data.email = '';
            state.data.phoneNumber = '';
        }
    }
})

export const { registerUser, clearRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;