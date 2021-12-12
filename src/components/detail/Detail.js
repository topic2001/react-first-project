import React, { useEffect, useState } from "react";
import st from './Detail.module.css';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DetailReserve from './Detail.reserve'
import DetailInformation from './Detail.information'
import DetailReview from './Detail.review'

function Detail(){
  const [tabs, setTabs] = useState('reserve');
  const data = useSelector(state => state.hotel.hotel);
  const hotel = data ? data : "";
  const { id } = useParams();
  // const hotel = hotels.find( data => data.id === Number(id));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_HOTEL", id: id });
  }, []);

  return(
      <>
        <div className={st.container}>
          <div className={st.innerContainer}>
              <div className={st.upperContent}>
                <div className={st.photoSlide}>
                  <img src={process.env.PUBLIC_URL + `/img/${hotel.photo}`} />
                </div> 
                <div className={st.description}>
                    <div>
                    <span>{hotel.rating}</span>
                    <span>{hotel.name}</span>
                    </div>
                    <span>{(hotel.star*2).toFixed(1)} 추천해요</span>
                    <span>{hotel.address}</span>
                    <ul>
                      {hotel.event && hotel.event.map( (data, i) => <li key={i}>{data}</li>)}
                    </ul>
                </div> 
              </div>
              <div className={st.lowerContent}>
              <div className={st.lowerButton}>
                  <span className={tabs === 'reserve' ? st.active : ""} onClick={() => setTabs('reserve')}>객실안내/예약</span>
                  <span className={tabs === 'information' ? st.active : ""} onClick={() => setTabs('information')}>숙소정보</span>
                  <span className={tabs === 'review' ? st.active : ""} onClick={() => setTabs('review')}>리뷰</span>
              </div>
              <hr />
              <div>
                {tabs === 'reserve' && <DetailReserve room={hotel.room} hotelid={id} />}
                {tabs === 'information' && <DetailInformation information={hotel.information}/>}
                {tabs === 'review' && <DetailReview id={id} />}
              </div>
              </div>
          </div>
        </div>
      </>
  )
}

export default Detail;