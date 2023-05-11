import { configureStore } from "@reduxjs/toolkit";
import cryptocurrenciesReducer from '../Slices/cryptocurrenciesSlice';
import portfolioReducer from '../Slices/portfolioSlice';


export const rootReducer = {
    cryptocurrencies: cryptocurrenciesReducer,
    portfolio: portfolioReducer,
  };

export const store = configureStore({
    reducer: rootReducer,
})