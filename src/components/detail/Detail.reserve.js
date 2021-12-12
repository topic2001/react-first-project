import React, { useEffect, useState } from "react";
import st from './Detail.module.css';
import { Link } from 'react-router-dom';
import DatePick from '../datdPicker/DatePick';

function DetailReserve(props){
  // const [tabs, setTabs] = useState('reserve');
  // console.log(props.room);

  return(
      <>
        <div className={st.reserveContainer}>
            <DatePick />
        </div>
        <ul className={st.reserveRoom}>
          {props.room ? props.room.map( (data) =>
            <li key={data.id}>
              <div>
                <img src={process.env.PUBLIC_URL + '/img/'+ data.photo} />
              </div>
              <div>
                <span>{data.name}</span>
                <div>
                  <span>가격</span>
                  <span>{data.price.toLocaleString()}원</span>
                </div>
                <Link to={`/reserve/${props.hotelid}/${data.id}`}><input type="button" value="예약" /></Link>
              </div>
            </li>
          ) : ""} 
        </ul>
      </>
  )
}

export default DetailReserve;