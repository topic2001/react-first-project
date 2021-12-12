import { all } from 'redux-saga/effects';
import hotelsSaga from '../components/accList/AccList.saga';
import authSaga from '../components/auth/Auth.saga';
import detailSaga from '../components/detail/Detail.saga';
import reservSaga from '../components/reserve/Reserve.saga';
import ReserveInfoSaga from '../components/reserveInfo/ReserveInfo.saga';

export default function* () {
  yield all([hotelsSaga(), authSaga(), detailSaga(), reservSaga(), ReserveInfoSaga()]);
}
