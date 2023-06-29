import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    lastSearch:[]
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       
        loginSuccess: (state, action) => {
            state.currentUser = action.payload
        },
       
        logout: (state) => {
            state.currentUser = null
        },
        search: (state, action) => {
          state.currentUser.lastSearch.push(action.payload);
             
        }

    },
})

export const {  loginSuccess, logout, search } = userSlice.actions

export default userSlice.reducer