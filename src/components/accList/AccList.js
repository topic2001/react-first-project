import React, { useEffect } from "react";
import st from './AccList.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function AccList(props) {
  const dispatch = useDispatch();
  const hotels = useSelector(state => state.hotels.hotels);
  const local = useSelector(state => state.information.location);
  const hotelsFilter = hotels && hotels.filter(data => local.includes(data.location) && (props.grade ? props.grade.includes(data.rating) : true));

  useEffect(() => {
      dispatch({ type: "GET_HOTELS" });
  }, []);

  return (
    <>
      <ul className={st.container}>
        {hotelsFilter ? hotelsFilter.map(hotel => (
          <Link to={`/detail/${hotel.id}`} key={hotel.id} >
            <li style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${process.env.PUBLIC_URL + '/img/' + hotel.photo})` }}>
              <span>{hotel.rating}</span>
              <span>{hotel.name}</span>
              <span>{(hotel.star*2).toFixed(1)} 추천해요</span>
              <div>
                <span>{hotel.location} | {hotel.transportation}</span>
                <span>{hotel.price}</span>
              </div>
            </li>
          </Link>
        )): <div className={st.empty}>Loding...</div>}
        {hotelsFilter && hotelsFilter.length === 0 && <div className={st.empty}>예약가능한 방이 없습니다.</div>}
      </ul>
    </>
  )
}

export default AccList;