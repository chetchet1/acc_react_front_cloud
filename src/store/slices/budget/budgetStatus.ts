// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../../index';

// types
import { DefaultRootStateProps } from 'types';
import { dateParam } from 'types/detailTrial';
import { dataType } from 'types/budgetStatus';
// import { ProductsFilter } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['budgetStatus'] = {
  budgetDT: {
    periodNoList: []
  },
  budgetWP: [],

  budgetDP: {
    deptCode: [],
    deptName: []
  },
  currentBudget: [],
  comparisonBudget: [],
  isLoading: false,
  isDone: false,
  error: null
};

const slice = createSlice({
  name: 'budgetStatus',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // get DATA
    getSearchDate(state, action) {
      console.log();
      console.log(action.payload);
      state.budgetDT = action.payload;
    },
    // GET WorkPlace
    getDeptListInit(state, action) {
      state.budgetWP = action.payload;
    },
    // GET DetailDept
    getDetailDeptListInit(state, action) {
      state.budgetDP = action.payload;
    },
    // GET CurrentBudget
    getCurrentBudgetInit(state, action) {
      state.currentBudget = action.payload;
      comparisonBudget:[]
    },

    //Get CurrentBudget SAGA
    getCurrentBudgetInitSuccess(state, action) {
      state.isLoading = false;
      state.currentBudget = action.payload;
      state.isDone = true;
    }

  }
});

// Reducer
export default slice.reducer;
// export const { getCurrentBudgetInitSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getPeriodList() {
  return async () => {
    try {
      const response = await axios.get('http://localhost:9103/settlement/periodNoList');
      console.log(response.data.periodNoList);
      dispatch(slice.actions.getSearchDate(response.data.periodNoList));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function getDeptList() {
  return async () => {
    try {
      const response = await axios.get('http://localhost:9103/operate/deptlist');
      console.log(response.data);
      dispatch(slice.actions.getDeptListInit(response.data))
    }
    catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function getDetailDeptList(params: any) {
  return async () => {
    try {
      const response = await axios.get('http://localhost:9103/operate/detaildeptlist', { params });
      console.log(response.data)
      dispatch(slice.actions.getDetailDeptListInit(response.data.detailDeptList))
    }
    catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export async function getCurrentBudget(params: dataType) {
  const url = 'http://localhost:9103/budget/currentbudget';
  const response = await axios.post(url,{params});
  console.log(response.data)
  return response;

    // try {
    //   const response = await axios.get('http://localhost:9103/budget/currentbudget', { params });
    //   console.log(response);
    //   dispatch(slice.actions.getCurrentBudgetInit(response.data))
    // }
    // catch (error) {
    //   dispatch(slice.actions.hasError(error))
    // }
  
}

