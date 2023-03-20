import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './features/categories/categoriesSlice';
import productsReducer from './features/products/productsSlice';
import productReducer from './features/products/productSlice';
import userReducer from './features/user/userSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        products: productsReducer,
        product: productReducer
    }
})