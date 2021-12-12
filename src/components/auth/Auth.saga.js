import { all, call, put, take, delay, fork, spawn, cancel, race, takeLatest, takeEvery } from 'redux-saga/effects';
import { registerUser, loginUser, logoutUser, emailUpdate, currentUserInfo, passwordUpdate, userDelete } from '../../utils/api';
import AccListReducer from '../accList/AccList.reducer';


function* authenticate({email, password, isRegister}){
  try{
    let data;
    if (isRegister){
      data = yield call(registerUser, {email, password});
    }else{
      data = yield call(loginUser, {email, password});
    }
    yield put({type: "AUTH_SUCCESS", payload: data.user});
    console.log(data.user);
    return data.user.uid;
  }catch (error){
    alert(error.message);
    yield put({type: "AUTH_FAIL", payload: error.message});
  }
}


function* logout(){
  try{
    yield call(logoutUser);
    yield put({type: "LOGOUT_SUCCESS"});
  }catch(error){
    yield put({type: "LOGOUT_FAIL", payload: error.message});
  }
}


function* authFlow(){
  while (true){
    const {payload} = yield take("AUTH_START");
    const uid = yield call(authenticate, payload);
    if(uid){
    }
  }
}

function* logoutFlow(){
  while (true){
    yield take("LOGOUT_START");
    // alert("로그아웃");
    yield call(logout);
  }
}

function* authUpdate(payload){
  try{
    if(payload.updateType === "email"){
      console.log("여기");
      console.log(payload);
      yield call(emailUpdate, payload.value);
      const user = yield call(currentUserInfo);
      console.log(user.email);
      console.log(user);
      alert(user.email + "로 변경 완료 되었습니다.")
      yield put({type: "EMAIL_UPDATE_SUCCESS", paylod: {user: user, email: user.email}});
    }else if(payload.updateType === "password"){
      yield call(passwordUpdate, payload.value);
      alert("비밀번호 변경이 완료 되었습니다.");
      yield put({type: "PASS_UPDATE_SUCCESS"});
    }else if(payload.updateType === "userDel"){
      yield call(userDelete);
      alert("탈퇴 완료 되었습니다.");
      yield put({type: "USERDEL_SUCCESS"});
    }else{
      alert("잘못된 신호입니다.");
    }
  }catch(error){
    yield put({type: "UPDATE_FAIL", payload: error.message});
    alert(error.message);
  }
}

function* authUpdateWatcher(){
  while (true){
    const {payload} = yield take("USER_UPDATE_START");
    yield call(authUpdate, payload)
  }
}

export default function* () {
  yield all([authFlow(), authUpdateWatcher(), logoutFlow()]);
}
