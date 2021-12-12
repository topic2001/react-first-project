import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import st from './Reserve.module.css';
import { useAuth } from "../../contexts/AuthContext";
// import { dateFormat } from '../../utils/api';

function Reserve() {
  const [payOption, setPayOption] = useState('카카오페이');
  const [checkItems, setCheckItems] = useState([]);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const inputCheck = name === "" ? true : tel ==="";
  // console.log(name);
  const { hotelid, roomid } = useParams();
  const history = useHistory();
  const hotel = useSelector(state => state.hotel.hotel);
  const date = useSelector(state => state.information.date);
  const dispatch = useDispatch();
  const room = hotel && hotel.name ? hotel.room.filter( rm => rm.id === Number(roomid)): [{}];
  const { currentUser } = useAuth();



  useEffect(() => {
    if(!hotel){
      alert("날짜와 방 타입을 다시 선택해 주세요.");
      history.push("/detail/"+ hotelid);
    };
  }, []);
  
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    }
  }, []);

  const checkin = date[0].format('yyyy-MM-dd(KS)');
  const checkout = date[1].format('yyyy-MM-dd(KS)');
  const dateDiff = Math.ceil((date[1].getTime() - date[0].getTime())/(1000*3600*24));
  // const today = new Date();
  // console.log(today);
  // console.log(today.format('yyyy-MM-dd(KS) HH:mm:ss'));

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [1, 2, 3, 4];
      setCheckItems(idArray);
    }
    else {
      setCheckItems([]);
    }
  };

  const payHandle = () =>{
    const { IMP } = window;
    IMP.init('imp44215639');

    IMP.request_pay({
      // pg: 'html5_inicis',
      // pay_method: 'card',
      pg: payOption,
      // pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount : room[0].price*dateDiff,
      name: '결제 테스트',
      buyer_tel: tel,

    }, rsp => {
      if(rsp.success){
        const reserve ={
          email : currentUser ? currentUser.email: null,
          name : name,
          tel : tel,
          hotelName : hotel.name,
          hotelid: hotel.id,
          roomType : `${room[0].name} / ${dateDiff}박`,
          checkin : checkin,
          checkout : checkout,
          totalPrice: room[0].price*dateDiff,
          reserveState : "reserved",
          reviewid : null,
          reservedate : new Date().format('yyyy-MM-dd(KS) HH:mm')
        }
        dispatch({ type: "SET_RESERVE", reserve: reserve });
        history.push("/");
        // alert("결제 성공");
      } else {
        alert("결제 실패");
      }

    });

  };

  return (
    <>
      <div className={st.container}>
        <div className={st.innerContainer}>
          <div>
            <div className={st.reserveInfo}>
              <span>예약자 정보</span>
              <span>예약자 이름</span>
              <input type="text" onChange={(e) => setName(e.target.value)} placeholder="체크인시 필요한 정보 입니다.(필수)" />
              <span>휴대폰 번호</span>
              <span>개인 정보 보호를 위해 안심번호로 숙소에 전송됩니다.</span>
              <input type="text" onChange={(e) => setTel(e.target.value)}  placeholder="체크인시 필요한 정보 입니다.(필수)" />
            </div>
            {!currentUser && <Link to="/login"><div className={st.loginBox}>로그인 후 예약하시면<br/>할인 쿠폰과 추가 혜택을 받을수 있어요<br/>로그인<span>&#129170;</span></div></Link>}
            <div className={st.pay}>
              <span>결제수단 선택</span>
              <select value={payOption} onChange={(e) => setPayOption(e.target.value)}>
                <option value="kakaopay">카카오페이</option>
                <option value="html5_inicis">카드</option>
              </select>
              <div className={st.checkBox}>
                <div>
                  <input type="checkBox" onChange={(e) => handleAllCheck(e.target.checked)} checked={
                    checkItems.length === 4
                      ? true
                    : false
                  } />
                  <span>전체 동의</span>
                </div>
                <div>
                  <div>
                    <input type="checkBox" onChange={(e) => handleSingleCheck(e.target.checked, 1)} checked={checkItems.includes(1) ? true : false} />
                    <span>숙소이용규칙 및 취소/환불규정 동의</span><span>(필수)</span>
                  </div>
                  <div>
                    <input type="checkBox" onChange={(e) => handleSingleCheck(e.target.checked, 2)} checked={checkItems.includes(2) ? true : false} />
                    <span>개인정보 수집 및 이용 동의</span><span>(필수)</span>
                  </div>
                  <div>
                    <input type="checkBox" onChange={(e) => handleSingleCheck(e.target.checked, 3)} checked={checkItems.includes(3) ? true : false} />
                    <span>개인정보 제 3자 제공 동의</span><span>(필수)</span>
                  </div>
                  <div>
                    <input type="checkBox" onChange={(e) => handleSingleCheck(e.target.checked, 4)} checked={checkItems.includes(4) ? true : false} />
                    <span>만 14세 이상 확인</span><span>(필수)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={st.inforSummary}>
            <div>
              <span>숙소이름</span>
              <span>{hotel && hotel.name}</span>
              <span>객실타입/기간</span>
              <span>{room[0].name} / {dateDiff}박</span>
              <span>체크인</span>
              <span>{checkin} 15:00</span>
              <span>체크아웃</span>
              <span>{checkout} 12:00</span>
            </div>
            <hr />
            <div>
              <span>총 결제 금액 (VAT포함)</span>
              <span>{(room[0].price*dateDiff).toLocaleString()}원</span>
            </div>
            <input type="button" value="결제하기" onClick={payHandle} disabled={
                    (checkItems.length === 4 ? inputCheck : true) 
                  } />
          </div>
        </div>
      </div>
    </>
  );
}

export default Reserve;