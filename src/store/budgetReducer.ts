// types
import { MenuProps } from 'types/menu';
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from './index';
import axios from 'utils/axios';

// initial state
const initialState:any = {
  error: '',
    periodNoList:[],
    testList:[],
    deptList:[],
    detailDeptList:[],
    parentBudget:[],
    comparisonBudget:[],
};

// ==============================|| SLICE - MENU ||============================== //

const budget = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.selectedItem = action.payload;
    }

    
  }
});

export default budget.reducer;

//export const { activeItem, openDrawer, activeID } = budget.actions;

export function budgetReducer() {
  return async () => {
    
  };
}
