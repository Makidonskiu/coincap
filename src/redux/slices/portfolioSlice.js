import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

export const fetchPortfolioSliceId = createAsyncThunk(
  'portfolioId/fetchPortfolioSliceId',
  async function (id, { rejectWithValue }) {
    try {
      const response = await axios.get(apiKey+`/${id}`);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  },
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    targetCrypto: null,
    listBriefcase: [],
    copiedListBriefcase: [],
    id: 'bitcoin',
    status: null,
    error: null,
  },
  reducers: {
    currentId: (state, action) => {
      state.id = action.payload;
    },
    listBriefcaseAdd: (state, action) => {
      const { id, quantity } = action.payload;
      const coinIndex = state.listBriefcase.findIndex((coin) => coin.id === id);

      if (coinIndex !== -1) {
        state.listBriefcase[coinIndex].quantity += quantity;
      } else {
        state.listBriefcase.push(action.payload);
      }
    },
    addTargetCrypto: (state, action) => {
      state.targetCrypto = action.payload;
    },
    deleteListBriefcaseTarget: (state, { payload }) => {
      const fixList = state.listBriefcase.filter((item) => item.id !== payload);
      state.listBriefcase = fixList;
    },
    copiedList: (state) => {
      state.copiedListBriefcase = state.listBriefcase;
    },
    onCancelDelete: (state) => {
      state.listBriefcase = state.copiedListBriefcase;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchPortfolioSliceId.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(fetchPortfolioSliceId.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.targetCrypto = action.payload;
      })

      .addCase(fetchPortfolioSliceId.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export const {
  currentId,
  listBriefcaseAdd,
  addTargetCrypto,
  deleteListBriefcaseTarget,
  copiedList,
  onCancelDelete,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
