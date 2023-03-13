import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("users/fetchUser", () => {
    return (
        fetch("/me")
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
    reducers: {},
    extraReducers: {
        [fetchUser.pending](state) {
            state.loading = true
        },
        [fetchUser.rejected](state, action) {
            state.loading = false
        },
        [fetchUser.fulfilled](state, action) {
            // state.entities = action.payload
            if(action.payload.errors) {
                state.errors = action.payload.errors
            } else {
                state.entities = action.payload
            }
            state.loading = false
        }
    }
})

export default userSlice.reducer
