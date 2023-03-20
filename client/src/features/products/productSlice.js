import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductById = createAsyncThunk("products/fetchProductById", (id) => {
    return (
        fetch(`/products/${id}`)
        .then((r) => r.json())
        .then((data) => data)
    )
})

const productSlice = createSlice({
    name: "product",
    initialState: {
        entities: null,
        loading: false,
        errors: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductById.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
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

export default productSlice.reducer