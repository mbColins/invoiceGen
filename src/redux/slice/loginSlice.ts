import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {
        'username': '',
        'password': ''
    }
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        authenticateUser: (state, action) => {
            const { username, password } = action.payload;
            state.data.username = username;
            state.data.password = password;
        },

        clearLogin: (state) => {
            state.data.username = '';
            state.data.password = '';
        }
    }
})

export const {authenticateUser,clearLogin} = loginSlice.actions;
export default loginSlice.reducer;