// pages/logi/mrp/redux/mrpSimulatorToolkit.js
const initialState = {
  data: [],
};

const mrpSimulatorReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_MRP_DATA':
          return {
              ...state,
              data: action.payload,
          };
      // 기타 필요한 액션 핸들링
      default:
          return state;
  }
};

export const setMrpData = (data) => ({
  type: 'SET_MRP_DATA',
  payload: data,
});

export default mrpSimulatorReducer;
