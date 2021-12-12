import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import st from './Signup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useAuth();
  // const errorMessage = useSelector(state => state.auth.error);
  // const userEmail = useSelector(state => state.auth.email);
  
  useEffect(() => {
    currentUser && history.push("/");
  }, [currentUser]);


  function handleSubmit(e){
    e.preventDefault();
    dispatch({
      type: "AUTH_START",
      payload: {email: e.target.email.value,
        password: e.target.password.value,
        isRegister: false},
      });
      
    }

  return (
    <>
      <div className={st.container}>
        <div className={st.innerContainer}>
          <div>
            <span>로그인</span>
            <form onSubmit={handleSubmit} className={st.login}>
              <span>이메일 주소</span>
              <input type="email" name="email" required></input>
              <span>비밀번호</span>
              <input type="password" name="password" required></input>
              <input type="submit" value="로그인"></input>
            </form>
          </div>
          <div>
            아이디가 없으신가요? <Link to="/signup">회원가입</Link>
          </div>
        </div>
      </div>
    </>
  )
}
