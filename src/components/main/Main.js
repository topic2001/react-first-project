import React from 'react';
import { Link } from 'react-router-dom';

import st from './Main.module.css';

function Main() {
  return (
    <>
      <div className={st.container}>
        <div className={st.innerContainer}>
          <img src={process.env.PUBLIC_URL + '/img/main_img.png'} />
          <div className={st.type}>
            <div><Link to="/hotel"><img src={process.env.PUBLIC_URL + '/img/hotel.png'}/><span>호텔</span></Link></div>
            <div><Link to="/hotel"><img src={process.env.PUBLIC_URL + '/img/motel.png'}/><span>모텔</span></Link></div>
            <div><Link to="/hotel"><img src={process.env.PUBLIC_URL + '/img/pension.png'}/><span>펜션</span></Link></div>
            <div><Link to="/hotel"><img src={process.env.PUBLIC_URL + '/img/resort.png'}/><span>리조트</span></Link></div>
            <div><Link to="/hotel"><img src={process.env.PUBLIC_URL + '/img/korean_style_house.png'}/><span>한옥</span></Link></div>
            <div><Link to="/hotel"><img src={process.env.PUBLIC_URL + '/img/gesthouse.png'}/><span>게스트하우스</span></Link></div>
            <div><Link to="/hotel"><img src={process.env.PUBLIC_URL + '/img/camping.png'}/><span>캠핑</span></Link></div>
            <div><Link to="/hotel"><img src={process.env.PUBLIC_URL + '/img/location.png'}/><span>내주변</span></Link></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;