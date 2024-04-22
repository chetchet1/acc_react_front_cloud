// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';
import { dateParam } from 'types/detailTrial';
// import { ProductsFilter } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['detailTrial'] = {
  detailTB: {
    detailTrialBalanceList: []
  },
  detailDate: {
    periodNoList: []
  },
  choicedate: {
    monthList: []
  },
  tailDate: [],
  dateParam: [],
  error: null,
  isLoading: false,
  isDone: false,
  detailDateSuccess: true
};

const slice = createSlice({
  name: 'detailTrial',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    requestSearchDate(state) {
      state.isLoading = true;
    },
    // FILTER PRODUCTS
    requestSearchDateSuccess(state, action) {
      state.isLoading = false;
      state.detailDate = action.payload.data;
      state.isDone = true;
    },
    requestSearchDateError(state) {
      state.isLoading = false;
      state.error = '에러남';
    },
    // GET PRODUCTS
    getChoiceDate(state, action) {
      state.choicedate = action.payload;
    },
    getTrialDate(state, action) {
      state.detailTB = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;
export const { requestSearchDate, requestSearchDateSuccess, requestSearchDateError } = slice.actions;
// ----------------------------------------------------------------------

export async function getDetailDate() {
  const url = 'http://localhost:9103/settlement/periodNoList';
  const response = await axios.get(url);
  // const response = await axios.get('http://localhost:9103/settlement/periodNoList');
  console.log('리듀서', response.data);
  return response;
}

export function getSelectDate() {
  return async () => {
    try {
      const response = await axios.get('http://localhost:9103/settlement/monthData');
      console.log(response.data.monthList);
      dispatch(slice.actions.getChoiceDate(response.data));
    } catch (error) {
      console.log('에러??', error);
    }
  };
}

export function getTrialDate(params: dateParam) {
  return async () => {
    try {
      console.log(params);
      const response = await axios.get('http://localhost:9103/settlement/detailtrialbalance', { params });
      console.log(response.data.detailTrialBalanceList);
      dispatch(slice.actions.getTrialDate(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
