import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import AccListReducer from '../accList/AccList.reducer';

function DatePick(){
  // let today = new Date();
  // let tomorrow = new Date(today.setDate(today.getDate() + 1));
  const dispatch = useDispatch();
  const date = useSelector(state => state.information.date);

  // alert(date);

  // const [dateRange, setDateRange] = useState([new Date(), tomorrow]);
  // const [startDate, endDate] = date;

  // alert(startDate + endDate);
  // dispatch({ type: "SET_DATE",
  //             date: dateRange,
  //           });

  return(
    <>
      <DatePicker
      selectsRange={true}
      startDate={date[0]}
      endDate={date[1]}
      minDate={new Date()}
      dateFormat="yyyy/MM/dd"
      calendarClassName="rasta-stripes"
      // className="red-border"
      onChange={(update) => {
      // setDateRange(update);
      dispatch({ type: "SET_DATE",
        date: update,
      });
      }}
      />
    </>
  )
}

export default DatePick;