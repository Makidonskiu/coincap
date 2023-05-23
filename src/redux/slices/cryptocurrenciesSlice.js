import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

export const fetchCurrencies = createAsyncThunk(
    'currencies/fetchCurrencies',
    async function(_, {rejectWithValue}){
        try {
            const response = await axios.get(apiKey);
            return response.data.data
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

const cryptocurrenciesSlice = createSlice({
    name: 'cryptocurrencies',
    initialState: {
        list: [],
        status: null,
        error: null,
    },
    reducers: {}, 
    extraReducers: (builder)=> {
        builder
        .addCase(fetchCurrencies.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
        })

        .addCase(fetchCurrencies.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.list = action.payload;
            state.error = action.payload;
        })

        .addCase(fetchCurrencies.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
    }
});


export default cryptocurrenciesSlice.reducer;