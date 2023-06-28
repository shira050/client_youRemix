import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories: []
}

export const categoriesSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        loadCategories: (state,action) => {
            state.categories = action.payload
        },
    

    },
})

export const { loadCategories } = categoriesSlice.actions

export default categoriesSlice.reducer