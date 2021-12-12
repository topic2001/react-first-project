import React, { useState, useEffect } from 'react'
import st from './ReserveInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';

export default function IdInfo(props) {

  const dispatch = useDispatch();
  
  function handleSubmit(e, type){
    e.preventDefault();
    if(type === "mail"){
      dispatch({type : "USER_UPDATE_START",payload : { value : e.target.email.value, updateType : "email" }});
    }
    if(type === "password"){
      if(e.target.password.value !== e.target.passwordConfirm.value){
        alert("비밀번호가 일치하지 않습니다.")
      }else{
        dispatch({type : "USER_UPDATE_START",payload : { value : e.target.password.value, updateType : "password" }});
      }
    }
    if(type === "userDel"){
      const conf = window.confirm(`탈퇴 하시겠습니까?`);
      if(conf){
        dispatch({type : "USER_UPDATE_START",payload : { updateType : "userDel" }});
      }
    }
  }
  return (
    <>
      <div className={st.idInfoContainer}>
        <span>내 정보 수정</span>
        <form onSubmit={(e) => handleSubmit(e, "mail")}>
          <span>이메일 주소</span>
          <input type="email" name="email" placeholder={`현재 사용중인 이메일: ${props.email}`} required></input>
          <input type="submit" value="이메일 주소 수정"></input>
        </form>
        <form onSubmit={(e) => handleSubmit(e, "password")}>
          <span>비밀번호</span>
          <input type="password" name="password" required></input>
          <span>비밀번호 확인</span>
          <input type="password" name="passwordConfirm" required></input>
          <input type="submit" value="비밀번호 변경"></input>
        </form>

        <div>저기어때를 이용하고 싶지 않으신가요? <span onClick={(e) => handleSubmit(e, "userDel")}>회원탈퇴</span></div>
      </div>
    </>
  )
}
