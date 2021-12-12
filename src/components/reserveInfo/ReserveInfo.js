import React, { useState, useEffect } from 'react'
import st from './ReserveInfo.module.css';
import IdInfo from './ReserveInfo.idInfo';
import ReservationInfo from './ReserveInfo.Info';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

export default function ReserveInfo() {
  const [tabs, setTabs] = useState('reserve');
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    !currentUser && alert("로그인 후 이용 가능합니다.");
    !currentUser && history.push("/login");
  }, [currentUser]);

  // console.log(currentUser.email);

  return (
    <>
      <div className={st.container}>
        <div className={st.innerContainer}>
          <div>
            <span className={tabs === 'reserve' ? st.active : ""} onClick={() => setTabs('reserve')}>예약 내역</span>
            <span className={tabs === 'id' ? st.active : ""} onClick={() => setTabs('id')}>내 정보 관리</span>
          </div>
          <div>
            {currentUser && tabs === 'reserve' && <ReservationInfo email={currentUser.email} />}
            {currentUser && tabs === 'id' && <IdInfo email={currentUser.email} />}
          </div>
        </div>
      </div>
    </>
  )
}
