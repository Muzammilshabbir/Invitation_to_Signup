import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('_user')) || '',
    token: localStorage.getItem('_token') || ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        insertUserData: (state, action) => {

            console.log(`action`, action)
            state.token = action.payload.token
            localStorage.setItem('_token', action.payload.token)
            state.user = action.payload.user
        }
    },
})

export const { insertUserData } = userSlice.actions

export default userSlice.reducer