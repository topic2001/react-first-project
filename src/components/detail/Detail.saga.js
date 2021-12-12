import { takeEvery, all, call, put, takeLeading, take } from 'redux-saga/effects';
import { getDatas } from '../../utils/api';

function* getHotelSaga(id) {
  try {
    const data = yield call(getDatas, "hotels", id);
    // alert(data);
    // console.log(data);
    yield put({type: "GET_HOTEL_SUCCESS", hotel:data});
  } catch (error) {
    yield put({type: "GET_HOTEL_FAILED", error:error.message});
  }
}

function* getReviewsSaga(id) {
  try {
    const data = yield call(getDatas, "reviews", "?hotelid="+id);
    yield put({type: "GET_REVIEWS_SUCCESS", reviews:data});
  } catch (error) {
    yield put({type: "GET_REVIEWS_FAILED", error:error.message});
  }
}

function* getHotelWatcher() {
  while(true){
    const {id} = yield take("GET_HOTEL");
    yield call(getHotelSaga, id);
  }
}

function* getReviewsWatcher() {
  while(true){
    const {id} = yield take("GET_REVIEWS");
    yield call(getReviewsSaga, id);
  }
}

export default function* DetailSaga() {
  yield all([getHotelWatcher(), getReviewsWatcher()]);
}
