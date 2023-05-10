import { configureStore } from "@reduxjs/toolkit";
import cryptocurrenciesReducer from '../Slices/cryptocurrenciesSlice';
import portfolioReducer from '../Slices/portfolioSlice';

export const store = configureStore({
    reducer: {
        cryptocurrencies:cryptocurrenciesReducer,
        portfolio:portfolioReducer,
    },
})