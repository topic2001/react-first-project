import { takeEvery, all, call, put, takeLeading, take } from 'redux-saga/effects';
import { setDatas } from '../../utils/api';

function* setReserveSaga(reserve) {
  try {
    yield call(setDatas, "reserves", reserve);
    yield put({type: "SET_RESERVE_SUCCESS", reserve:reserve});
    alert("예약 완료 되었습니다.");
  } catch (error) {
    yield put({type: "SET_RESERVE_FAILED", error:error.message});
  }
}

function* reserveWatcher() {
  while(true){
    const {reserve} = yield take("SET_RESERVE");
    yield call(setReserveSaga, reserve);
  }
}

export default function* ReserveSaga() {
  yield all([reserveWatcher()]);
}
