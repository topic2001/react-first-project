import { takeEvery, all, call, put, takeLeading, take } from 'redux-saga/effects';
import { getDatas } from '../../utils/api';

function* getHotelsSaga() {
  try {
    const data = yield call(getDatas, "hotels");
    yield put({type: "GET_HOTELS_SUCCESS", hotels:data});
  } catch (error) {
    yield put({type: "GET_HOTELS_FAILED", error:error.message});
    alert(error.message);
  }
}

function* getHotelsWatcher() {
  while(true){
    yield take("GET_HOTELS");
    yield call(getHotelsSaga);
  }
}

export default function* postsSaga() {
  yield all([getHotelsWatcher()]);
}
