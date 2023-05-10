import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPortfolioSliceId = createAsyncThunk(
    'portfolioId/fetchPortfolioSliceId',
    async function(id, {rejectWithValue}){
        try {
            const response = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
            return response.data.data
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {
        list: [],
        id: 'bitcoin',
        status: null,
        error: null,
    },
    reducers: {
        currentId(state, action){
            state.id = action.payload
        }
    }, 
    extraReducers:(build) => {
        build
        .addCase(fetchPortfolioSliceId.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
        })

        .addCase(fetchPortfolioSliceId.fulfilled, (state, action) => {
            state.status = 'resolved';
            // state.error = action.payload;
            state.list = action.payload;
        })

        .addCase(fetchPortfolioSliceId.rejected, (state, {payload}) => {
            state.status = 'rejected';
            state.error = payload;
        })
    }
});

export const {currentId} = portfolioSlice.actions;

export default portfolioSlice.reducer;