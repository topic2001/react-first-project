import React, { useState, useEffect } from 'react';
import DatePick from '../datdPicker/DatePick';
import AccList from '../accList/AccList';
import st from './Hotel.module.css';
import { useDispatch, useSelector } from 'react-redux';

function Hotel() {
  const dispatch = useDispatch();
  const [city, setCity] = useState('서울');
  const [district, setDistrict] = useState('강남/역삼/삼성/신사/청담');
  const [grade, setGrade] = useState(null);
  const [tab, setTab] = useState('seoul');
  const [num, setNum] = useState(2);
  const [plus, setPlus] = useState(false);
  const [minus, setMinus] = useState(false);

  function location(aa, e){
    setCity(aa);
    setDistrict(e.target.innerText);
    const str = e.target.innerText;
    const arr = str.split("/");
    dispatch({ type: "SET_LOCATION",
               location: arr
            });
    setTab('');
  }

  useEffect(() => {
    if( num < 2){
      setMinus(true);
    }else if( num >= 9){
      setPlus(true);
    }else{
      setMinus(false);
      setPlus(false);
    }
  }, [num]);

  const numChange = (bb) =>{
    setNum(num + bb);
  }
  
  function resetAll(){
    setNum(2);
    setMinus(false);
    setPlus(false);
    setGrade(null);
  }

  function handleSubmit(e){
    e.preventDefault();
    if(e.target.star5.checked || e.target.star4.checked || e.target.star3.checked){
      let arr = [];
      if(e.target.star5.checked) {arr.push("5성급")};
      if(e.target.star4.checked) {arr.push("4성급")};
      if(e.target.star3.checked) {arr.push("3성급")};
      setGrade(arr);
    }else{
      setGrade(null);
    }
  }
  
  return (
    <>
      <div className={st.container}>
        <div className={st.header}>
          <div className={st.innerHeader}>
            <p>호텔</p>
            <div className={st.dropdown}>
              <span>{city} | {district}</span>
              <div className={st.dropdownContent}>
                <div className={st.tab}>
                  <span onMouseOver={() => setTab('seoul')}>서울</span>
                  <span onMouseOver={() => setTab('pusan')}>부산</span>
                  <span onMouseOver={() => setTab('jeju')}>제주</span>
                </div>
                <div id="tabcontent" className={st.tabcontent}>
                  {tab === 'seoul' && <>
                                        <span onClick={(e) => location('서울',e)}>강남/역삼/삼성/신사/청담</span>
                                        <span onClick={(e) => location('서울',e)}>서초/교대</span>
                                        <span onClick={(e) => location('서울',e)}>잠실/송파/왕십리/강동</span>
                                      </>}
                  {tab === 'pusan' && <>
                                        <span onClick={(e) => location('부산',e)}>해운대</span>
                                        <span onClick={(e) => location('부산',e)}>광안리/기장</span>
                                        <span onClick={(e) => location('부산',e)}>부산역/남포/자갈치/영도</span>
                                      </>}
                  {tab === 'jeju' && <>
                                        <span onClick={(e) => location('제주',e)}>제주공항/애월/함덕</span>
                                        <span onClick={(e) => location('제주',e)}>서귀포시/중문/표선/성산</span>
                                      </>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={st.innerContainer}>
          <div>
            <form onSubmit={handleSubmit}>
              <div className={st.datePick}>
                <div>날짜</div>
                <DatePick />
              </div>
              <hr />
              <div>
                <div>상세조건</div>
                <div className={st.btns}>
                  <input type="reset" value="초기화" onClick={resetAll}/>
                  <input type="submit" value="적용" />
                </div>
              </div>
              <div>
                <div>호텔유형</div>
                <div>
                  <input type="checkBox" name="star5" />
                  <label htmlFor="star5">5성급</label>
                </div>
                <div>
                  <input type="checkBox" name="star4" />
                  <label htmlFor="star4">4성급</label>
                </div>
                <div>
                  <input type="checkBox" name="star3" />
                  <label htmlFor="star3">3성급</label>
                </div>
              </div>
              <div className={st.number}>
                <span>인원</span>
                <input type="button" disabled={minus} onClick={()=>numChange(-1)} value="-" />
                <span>{num}</span>
                <input type="button" disabled={plus} onClick={()=>numChange(1)} value="+" />
              </div>
              <div>
                <div>베드타입</div>
                <div className={st.bed}>
                  <div>
                    <input type="checkBox" name="bed" />
                    <label htmlFor="star">싱글</label>
                  </div>
                  <div>
                    <input type="checkBox" name="bed" />
                    <label htmlFor="star">더블</label>
                  </div>
                  <div>
                    <input type="checkBox" name="bed" />
                    <label htmlFor="star">트윈</label>
                  </div>
                  <div>
                    <input type="checkBox" name="bed" />
                    <label htmlFor="star">온돌</label>
                  </div>
                </div>
              </div>
              <div>
                <div>공용시설</div>
                <div className={st.facility}>
                  <span>
                    <input type="checkBox" name="star" />
                    <label htmlFor="star">피트니스</label>
                  </span>
                  <span>
                    <input type="checkBox" name="star" />
                    <label htmlFor="star">수영장</label>
                  </span>
                </div>
                <div className={st.facility}>
                  <span>
                    <input type="checkBox" name="star" />
                    <label htmlFor="star">사우나</label>
                  </span>
                  <span>
                    <input type="checkBox" name="star" />
                    <label htmlFor="star">골프장</label>
                  </span>
                </div>
                <div className={st.facility}>
                  <span>
                    <input type="checkBox" name="star" />
                    <label htmlFor="star">라운지</label>
                  </span>
                  <span>
                    <input type="checkBox" name="star" />
                    <label htmlFor="star">공용스파</label>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div>
            <AccList grade={grade} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hotel;