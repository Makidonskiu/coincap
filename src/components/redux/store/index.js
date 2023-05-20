import { configureStore, combineReducers } from '@reduxjs/toolkit';
//Redux-persist
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//Slice
import cryptocurrenciesReducer from '../slices/cryptocurrenciesSlice';
import portfolioReducer from '../slices/portfolioSlice';

export const rootReducer = combineReducers({
  cryptocurrencies: cryptocurrenciesReducer,
  portfolio: portfolioReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
