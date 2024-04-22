// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';
import { journalParam, slipParam, slipSearchParam } from 'types/slip';
// import { ProductsFilter } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['slip'] = {
  jounalList: [],
  slipList: [],
  jounalDetail: [],
  isDone: false,
  isLoading: false,
  slipDateSuccess: true,
  error: null
};

const slice = createSlice({
  name: 'slip',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    requestSlipDate(state, action) {
      state.isLoading = true;
      state.jounalDetail = [];
      state.jounalList = [];
    },
    requestSlipDataSuccess(state, action) {
      state.isLoading = false;
      state.slipList = action.payload.data;
      state.isDone = true;
    },
    requestSlipDateError(state) {
      state.isLoading = false;
      state.error = '에러남';
    },
    getJounalData(state, action) {
      state.jounalList = action.payload;
      state.jounalDetail = [];
    },
    getJounalDetialData(state, action) {
      state.jounalDetail = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;
export const { requestSlipDate, requestSlipDataSuccess, requestSlipDateError } = slice.actions;
// ----------------------------------------------------------------------

export async function getSlipDate(params: slipSearchParam) {
  const url = 'http://localhost:9103/posting/rangedsliplist';
  const response = await axios.get(url, {
    params: params
  });
  console.log(response.data);
  return response;
}

export function selectJournalStart(params: slipParam) {
  return async () => {
    try {
      console.log(params);
      const response = await axios.get('http://localhost:9103/posting/singlejournallist', { params });
      console.log(response.data);
      dispatch(slice.actions.getJounalData(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function selectJournalDetail(params: journalParam) {
  return async () => {
    try {
      console.log(params);
      const response = await axios.get('http://localhost:9103/posting/journaldetaillist', { params });
      console.log(response.data);
      dispatch(slice.actions.getJounalDetialData(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
