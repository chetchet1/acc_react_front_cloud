import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

/*
요청을 위한 액션 타입을 payload로 설정합니다.(예: "sample/GET_POST").
*/

export const startLoading = createAction(START_LOADING, (requestType: any) => requestType);

export const finishLoading = createAction(FINISH_LOADING, (requestType: any) => requestType);

const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: function (state: any, action: any) {
      console.log('action.payload: ', action.payload);
      return {
        ...state,
        [action.payload]: true
      };
    },
    [FINISH_LOADING]: (state: any, action: any) => ({
      ...state,
      [action.payload]: false
    })
  },
  initialState
);

export default loading;
