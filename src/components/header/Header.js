import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import st from './Header.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authState } from '../../utils/api';
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isActive, setIsActive] = useState(false);
  const userEmail = useSelector(state => state.auth.email);
  const { currentUser } = useAuth();
  // console.log(currentUser);

  // useEffect(() => {
  //   !currentUser && history.push("/login");
  // },[currentUser]);

  function onClickHandler(){
    dispatch({type: "LOGOUT_START"});
  }

  return (
    <>
      <div className={st.container}>
        <div className={st.innerContainer}>
          <div><Link to="/"><img src={process.env.PUBLIC_URL + '/img/logo_white.png'} /></Link></div>
          <div className={isActive ? st.active : ''}>
            <Link to="/hotel"><span>내주변</span></Link>
            <Link to="/reserveInfo"><span>예약내역</span></Link>  
            {!currentUser && <Link to="/login"><span>로그인</span></Link>}  
            {currentUser && <Link to="/login" onClick={onClickHandler}><span>로그아웃</span></Link>}  
          </div>  
        </div>
      </div>
        <FontAwesomeIcon icon={faBars} className={st.hamberger} onClick={
          () => setIsActive(!isActive)
        } />
      <div className={st.height}>" "</div>
    </>
  );
}

export default Header;