import React, { useEffect, useState } from "react";
import st from './Detail.module.css';
import { Link } from 'react-router-dom';

function DetailInformation(props){
  const [tabs, setTabs] = useState('reserve');
  // console.log(props);

  return(
      <>
        <div className={st.informationContainer}>
            <div>
              <span>주변정보</span>
              <ul>
                {props.information.surround.map((data, index) => <li key={index}>{data}</li>)}
              </ul>
              <span>공지사항</span>
              <ul>
                {props.information.notice.map((data, index) => <li key={index}>{data}</li>)}
              </ul>
              <span>기본정보</span>
              <ul>
                <li>체크인 : 15:00 | 체크아웃 : 1200</li>
                <li>22시 이후 체크인 시 호텔 프론트 문의</li>
                <li>전 객실 금연</li>
                <li>주차 가능 (유료 / 1대 15,000원)</li>
              </ul>
              <span>취소 및 환불 규정</span>
              <ul>
                <li>체크인일 기준 3일전 17시까지 : 100% 환불</li>
                <li>체크인일 기준 3일전 17시이후 ~ 당일 및 No-show : 환불 불가</li>
                <li>취소, 환불시 수수료가 발생할 수 있습니다.</li>
              </ul>
            </div>
        </div>
      </>
  )
}

export default DetailInformation;