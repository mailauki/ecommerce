import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
    return (
        fetch("/products")
        .then((r) => r.json())
        .then((data) => data)
    )
})

export const fetchProductById = createAsyncThunk("products/fetchProductById", (id) => {
    return (
        fetch(`/products/${id}`)
        .then((r) => r.json())
        .then((data) => data)
    )
})

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        loading: false,
        errors: null
    },
    reducers: {
        addProduct(state, action) {
            state.entities.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            if(action.payload.errors) {
                state.entities = null
                state.errors = action.payload.errors
            } else {
                state.entities = action.payload
                state.errors = null
            }
            state.loading = false
        })
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

export const { addProduct } = productsSlice.actions
export default productsSlice.reducer