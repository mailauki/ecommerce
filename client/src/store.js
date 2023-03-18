import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './features/categories/categoriesSlice';
import userReducer from './features/user/userSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer
    }
})