import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("categories/fetchCategories", () => {
    return (
        fetch("/categories")
        .then((r) => r.json())
        .then((data) => data)
    )
})

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: null,
        loading: false,
        errors: null
    },
    reducers: {
        addCategory(state, action) {
            state.entities.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            if(action.payload.errors) {
                state.entities = null
                state.errors = action.payload.errors
            } else {
                state.entities = action.payload
                state.errors = null
            }
            state.loading = false
        })
    }
})

export const { addCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
