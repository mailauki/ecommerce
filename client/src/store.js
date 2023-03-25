import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './features/categories/categoriesSlice';
import productsReducer from './features/products/productsSlice';
import productReducer from './features/products/productSlice';
import userReducer from './features/user/userSlice';
import currentUserReducer from './features/user/currentUserSlice';

export default configureStore({
    reducer: {
        currentUser: currentUserReducer,
        user: userReducer,
        categories: categoriesReducer,
        products: productsReducer,
        product: productReducer
    }
})