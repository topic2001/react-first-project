import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import st from './Signup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from "../../contexts/AuthContext";

export default function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const userEmail = useSelector(state => state.auth.email);
  // const errorMessage = useSelector(state => state.auth.error);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    currentUser && alert("회원가입 완료 되었습니다.");
    currentUser && history.push("/");
    return () => {
    };
  }, [currentUser]);


  function handleSubmit(e){
    e.preventDefault();
    if(e.target.password.value !== e.target.passwordConfirm.value){
      alert("비밀번호가 일치하지 않습니다.")
    }else{
      dispatch({
        type: "AUTH_START",
        payload: {email: e.target.email.value,
                  password: e.target.password.value,
                  isRegister: true},
      });
    }
  }

  return (
    <>
      <div className={st.container}>
        <div className={st.innerContainer}>
          <div>
            <span>회원가입</span>
            <form onSubmit={handleSubmit} className={st.signup}>
              <span>이메일 주소</span>
              <input type="email" name="email" required></input>
              <span>비밀번호</span>
              <input type="password" name="password" required></input>
              <span>비밀번호 확인</span>
              <input type="password" name="passwordConfirm" required></input>
              <input type="submit" value="회원가입"></input>
            </form>
          </div>
          <div>
            아이디가 있으신가요? <Link to="/login">로그인</Link>
          </div>
        </div>
      </div>
    </>
  )
}
