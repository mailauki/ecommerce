import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("users/fetchUser", (id) => {
    return (
        fetch(`/users/${id}`)
        .then((r) => r.json())
        .then((data) => data)
    )
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        entities: null,
        loading: false,
        errors: null
    },
    reducers: {
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

export default userSlice.reducer
