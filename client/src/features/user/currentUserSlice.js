import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", () => {
    return (
        fetch("/me")
        .then((r) => r.json())
        .then((data) => data)
    )
})

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: {
        entities: null,
        loading: false,
        errors: null
    },
    reducers: {
        auth(state, action) {
            state.entities = action.payload
            state.loading = false
            state.errors = null
        },
        logout(state, action) {
            state.entities = null
            state.loading = false
            state.errors = null
        },
        increaseQuantity(state, action) {
            const user = state.entities
            const cart = user.carts.find((cart) => cart.id === action.payload)
            cart.quantity = cart.quantity + 1

            user.cart_total = user.cart_total + 1

            user.cart_price_total = parseFloat((user.cart_price_total + cart.product.price).toFixed(2))
        },
        decreaseQuantity(state, action) {
            const user = state.entities
            const cart = user.carts.find((cart) => cart.id === action.payload)
            cart.quantity = cart.quantity - 1

            user.cart_total = user.cart_total - 1

            user.cart_price_total = parseFloat((user.cart_price_total - cart.product.price).toFixed(2))
        },
        addCart(state, action) {
            const user = state.entities
            user.carts.push(action.payload)

            user.cart_total = user.cart_total + 1
        },
        removeCart(state, action) {
            const user = state.entities
            const cart = user.carts.find((cart) => cart.id === action.payload)

            user.cart_total = user.cart_total - cart.quantity

            const index = user.carts.findIndex((cart) => cart.id === action.payload)
            user.carts.splice(index, 1)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
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

export const { auth, logout, increaseQuantity, decreaseQuantity, addCart, removeCart } = currentUserSlice.actions
export default currentUserSlice.reducer
