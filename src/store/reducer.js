import { combineReducers } from 'redux';
import hotels from '../components/accList/AccList.reducer';
import information from '../components/hotel/Hotel.reducer';
import auth from '../components/auth/Auth.reducer';
import hotel from '../components/detail/Detail.reducer';
import reserve from '../components/reserve/Reserve.reducer';
import reserves from '../components/reserveInfo/ReserveInfo.reducer';

export default combineReducers({
  hotels,
  information,
  auth,
  hotel,
  reserve,
  reserves
});
