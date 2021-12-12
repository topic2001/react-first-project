import { takeEvery, all, call, put, takeLeading, take } from 'redux-saga/effects';
import { getDatas, updateData, setDatas } from '../../utils/api';

function* getReservesSaga(email) {
  try {
    const data = yield call(getDatas, "reserves", "?email="+email);
    yield put({type: "GET_RESERVES_SUCCESS", reserves:data});
  } catch (error) {
    yield put({type: "GET_RESERVES_FAILED", error:error.message});
    alert(error.message);
  }
}

function* updateReservesSaga(reserve) {
  try {
    const data = {...reserve, reserveState : "canceled", canceleDate : new Date().format('yyyy-MM-dd(KS) HH:mm') }
    yield call(updateData, "reserves", data);
    yield put({type: "UPDATE_RESERVE_SUCCESS"});
    alert("예약취소가 완료 되었습니다.");
  } catch (error) {
    yield put({type: "UPDATE_RESERVE_FAILED", error:error.message});
    alert(error.message);
  }
}

function* setReviewSaga(review) {
  try {
    console.log(review.reserveid);
    console.log(review.hotelid);
    const reviews = yield call(getDatas, "reviews");
    const nextid = reviews.length +1; 
    const data = {...review, id : nextid};
    const reserve = yield call(getDatas, "reserves", review.reserveid);
    yield call(setDatas, "reviews", data);
    const hotel = yield call(getDatas, "hotels", review.hotelid);
    const hotelReviews = yield call(getDatas, "reviews", "?hotelid="+review.hotelid);
    const avgRating = hotelReviews.reduce((acc, cur) => acc + cur.rating, 0)/hotelReviews.length;
    const hotelData = {...hotel, star: avgRating}
    const reserveData = {...reserve, reviewid: nextid};
    yield call(updateData, "reserves", reserveData);
    yield call(updateData, "hotels", hotelData);
    yield put({type: "SET_REVIEW_SUCCESS"});
    alert("리뷰 등록이 완료 되었습니다.")
  } catch (error) {
    yield put({type: "SET_REVIEW_FAILED", error:error.message});
    alert(error.message);
  }
}

function* reserveInfoWatcher() {
  while(true){
    const { email } = yield take("GET_RESERVES");
    yield call(getReservesSaga, email);
  }
}

function* reserveUpdateWatcher() {
  while(true){
    const { reserve } = yield take("UPDATE_RESERVE");
    yield call(updateReservesSaga, reserve);
  }
}

function* setReviewWatcher() {
  while(true){
    const { review } = yield take("SET_REVIEW");
    yield call(setReviewSaga, review);
  }
}

function* getReviewWatcher() {
  while(true){
    const { reviewid } = yield take("GET_REVIEW");

    try {
      const review = yield call(getDatas, "reviews", reviewid);
      yield put({type: "GET_REVIEW_SUCCESS", review: review});
    } catch (error) {
      yield put({type: "GET_REVIEW_FAILED", error:error.message});
    }
  }
}

function* updateReviewWatcher() {
  while(true){
    const { review } = yield take("UPDATE_REVIEW");
    try {
      // console.log(review.id)
      yield call(updateData, "reviews", review);
      const hotelReviews = yield call(getDatas, "reviews", "?hotelid="+review.hotelid);
      const avgRating = hotelReviews.reduce((acc, cur) => acc + cur.rating, 0)/hotelReviews.length;
      const hotel = yield call(getDatas, "hotels", review.hotelid);
      const hotelData = {...hotel, star: avgRating}
      yield call(updateData, "hotels", hotelData);
      yield put({type: "UPDATE_REVIEW_SUCCESS", review: review});
      alert("리뷰 수정이 완료 되었습니다.");
    } catch (error) {
      yield put({type: "UPDATE_REVIEW_FAILED", error:error.message});
      console.log(error);
      alert(error.message);
    }
  }
}



export default function* ReserveInfoSaga() {
  yield all([reserveInfoWatcher(), reserveUpdateWatcher(), setReviewWatcher(), getReviewWatcher(), updateReviewWatcher()]);
}
