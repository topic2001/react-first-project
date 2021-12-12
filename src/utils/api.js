import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/database';
import { firebaseConfig } from './firebase';

export const app = firebase.initializeApp(firebaseConfig)
export const auth = app.auth()

// var database = firebase.database();

export const registerUser = ({ email, password }) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => Promise.reject(error));
};

export const loginUser = ({ email, password }) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => Promise.reject(error));
};

export const logoutUser = () => {
  return firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
    })
    .catch((error) => Promise.reject(error));
};

export const authState = () => {
  // let aaa = "초기값";
  firebase
    .auth()
    .onAuthStateChanged((user) => {
      if(user){
        var aaa = user;

        // console.log(aaa);
        // return user;
      }else{
        // alert("로그인 유저 없음.");
      }
    });
  // return aaa;
};

export const currentUserInfo = () =>{
  return auth.currentUser;
}

export const emailUpdate = (email) =>{
  const user = currentUserInfo();
  return user.updateEmail(email).then((user) =>user)
  .catch((error) => Promise.reject(error));
};

export const passwordUpdate = (newPassowrd) =>{
  const user = currentUserInfo();
  return user.updatePassword(newPassowrd).then(() => {

  }).catch((error) =>  Promise.reject(error));
}

export const userDelete = () => {
  const user = currentUserInfo();
  return user.delete().then(() => {
  }).catch((error) => Promise.reject(error));
}

export const getDatas = (type, id = "") => {
  return fetch(`http://localhost:3001/api/${type}/${id}`)
  // return fetch(`http://localhost:3001/api/hotels/`)
  // return fetch(`http://localhost:3001/api/hotels`)
  .then(res => {
      return res.json();
  })
  .then(data => {
      // console.log(data);
      // alert("ddd");
      
      return (data);
  })
  .catch((error) => Promise.reject(error));
};

export const setDatas = (type, data) => {
  fetch(`http://localhost:3001/api/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      data
    ),
  })
  .then(res => {
    if (res.ok) {
    }
  })
  .catch((error) => Promise.reject(error));
};

export const updateData = (type, data) => {
  fetch(`http://localhost:3001/api/${type}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      data
    ),
  })
  .then(res => {
    if (res.ok) {
    }
  })
  .catch((error) => Promise.reject(error));
};



Date.prototype.format = function (f) {

  if (!this.valueOf()) return " ";
  var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
  var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
      switch ($1) {
          case "yyyy": return d.getFullYear(); // 년 (4자리)
          case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
          case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
          case "dd": return d.getDate().zf(2); // 일 (2자리)
          case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
          case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
          case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
          case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
          case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
          // case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
          case "mm": return d.getMinutes().zf(2); // 분 (2자리)
          case "ss": return d.getSeconds().zf(2); // 초 (2자리)
          case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
          default: return $1;
      }
  });
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };