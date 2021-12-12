import React from 'react';

import st from './Footer.module.css';

function Footer() {
  return (
    <>
      <div className={st.container}>
        <div className={st.innerContainer}>
            <div>
                <span>회사소개</span>
                <span>이용약관</span>
                <span>개인정보처리방침</span>
                <span>사업자 정보확인</span>
                <span>저기어때 마케팅센터</span>
                <span>액티비티 호스트센터</span>
                <span>HOTEL 저기어때</span>
                <span>콘텐츠산업진흥법에의한 표시</span>
            </div>
            <div className={st.information}>
              <span>(주) 저기어때컴퍼니</span>
              <span>주소: 서울특별시 강남구 봉은사로</span>
              <span>대표이사: 홍길동 | 사업자등록번호:111-22-33333</span>
              <span>통신판매번호:0000-서울강남-11111 | 관광사업자 등록번호: 제1000-22호</span>
              <span>전화번호 : 1100-2200</span>
              <span>전자우편주소: help@abc.com</span>
              <span>Copyright ABC COMPANY Corp. All rights reserved.</span>
            </div>
        </div>
      </div>
      
    </>
  );
}

export default Footer;