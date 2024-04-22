import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from './loding';

export default function createRequestSaga(type: any, request: any) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action: any) {
    // console.log('createRequestSaga: action');
    // console.log(action);
    // console.log(request);
    // console.log('로딩 시작');
    yield put(startLoading(type)); //로딩 시작 -- 이부분은 제외해도 됨
    try {
      const response = yield call(request, action); //call이 호출하는 부분 / action이 request의 매개부분
      //api.뭐시기가 실행되면서 뒷단의 값들을 갖고 옴
      // console.log('response');
      // console.log(response);

      // console.log('SUCCESS');
      // console.log(SUCCESS);
      if (response)
        yield put({
          type: SUCCESS,
          payload: response.data
        });

      //console.log('완료');
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true
      });
      //console.log('실패');
      //console.log(e);
    }
    yield put(finishLoading(type));
  };
}
