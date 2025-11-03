import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {
        username: '',
        phoneNumber: '',
        email: '',
        password: '',
    }
}

const userSlice = createSlice({
    name: 'userSliec',
    initialState,
    reducers:{

    }

})

export const {} = userSlice.actions;
export default userSlice.reducer;