import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("users/fetchUser", (id) => {
    if(id) {
        return (
            fetch(`/users/${id}`)
            .then((r) => r.json())
            .then((data) => data)
        )
    } else {
        return (
            fetch("/me")
            .then((r) => r.json())
            .then((data) => data)
        )
    }
})

const userSlice = createSlice({
    name: "user",
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
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

export const { auth, logout } = userSlice.actions
export default userSlice.reducer
