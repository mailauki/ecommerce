import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
    return (
        fetch("/products")
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
            const products = state.entities
            products.push(action.payload)
        },
        editProduct(state, action) {
            const products = state.entities
            const index = products.findIndex((product) => product.id === action.payload.id)
            products.splice(index, 1)
        }
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
    }
})

export const { addProduct, editProduct } = productsSlice.actions
export default productsSlice.reducer