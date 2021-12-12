import React, { useEffect, useState } from 'react'
import st from './ReserveInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';

export default function ReservationInfo(props) {
  const dispatch = useDispatch();
  const [emoji, setEmoji] = useState('&#128539;');
  const [review, setReview] = useState(null);
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
  const [date, setDate] = useState(null);
  const [hotelid, setHotelid] = useState(null);
  const [rating, setRating] = useState(5);
  const [currTitle, setCurrTitle] = useState(null);
  const [currContent, setCurrContent] = useState(null);
  const [currReviewid, setCurrReviewid] = useState(null);
  const [currRegDate, setCurrRegDate] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const data = useSelector(state => state.reserves.reserves);
  const currReview = useSelector(state => state.reserves.review);


  
  useEffect(() => {
    dispatch({ type: "GET_RESERVES", email: props.email });
  }, []);
  
  useEffect(() => {
    if(currReview){
      setCurrContent(currReview.content);
      setCurrTitle(currReview.title);
      setEmoji(currReview.emoji);
      setRating(currReview.rating);
      setCurrReviewid(currReview.id);
      setCurrRegDate(currReview.regDate);
    } 
  }, [currReview]);

  const reserved = data && data.filter(data => data.reserveState === "reserved");
  const canceled = data && data.filter(data => data.reserveState === "canceled");
  const done = data && data.filter(data => data.reserveState === "done");
  
  const cancelButton = (reserve) => {
    if(window.confirm("예약 취소 하시겠습니까?")){
      dispatch({ type: "UPDATE_RESERVE", reserve: reserve });
      
    }
    
  }
  
  function onClick(e, reviewid){
  
    setReview(e.target.dataset.id);
    setName(e.target.dataset.name);
    setRoom(e.target.dataset.room);
    setDate(e.target.dataset.date);
    setHotelid(e.target.dataset.hotelid);
    if(reviewid){
      dispatch({ type: "GET_REVIEW", reviewid :reviewid });
      setIsUpdate(true);
        // currReview && setCurrTitle(currReview.title);
        // currReview && console.log(currReview.title);
    }else{
      setIsUpdate(false);
      setRating(5);
      setEmoji("&#128539;");
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    // console.log("submit");
    const reviewData={
      title: e.target.title.value,
      content : e.target.content.value,
      emoji: emoji,
      rating: rating,
      reserveid: review,
      hotelid : Number(hotelid),
      regDate: new Date()
    }
    if(isUpdate){
      const updateData = {...reviewData, updateDate: new Date(), id: currReviewid, regDate: currRegDate }
      // console.log(updateData);
      dispatch({ type: "UPDATE_REVIEW", review: updateData });
    }else{
      dispatch({ type: "SET_REVIEW", review: reviewData });
    }
    setReview(null)
  }

  return (
    <>
      <div className={st.infoContainer}>
        <div>
          <span>예약 내역</span>
          <div className={st.infoBox}>
            {reserved ? reserved.map(reserve => (
              <div className={st.info} key={reserve.id}>
                <span>{reserve.hotelName}</span>
                <span>{reserve.roomType}</span>
                <div>{reserve.checkin} ~ {reserve.checkout}</div>
                <div>
                  <div>
                    <span>예약자 이름</span>
                    <span>휴대폰 번호</span>
                    <span>예약 금액</span>
                    <span>예약 날짜</span>
                  </div>
                  <div>
                    <span>{reserve.name}</span>
                    <span>{reserve.tel}</span>
                    <span>{reserve.totalPrice.toLocaleString()}원</span>
                    <span>{reserve.reservedate}</span>
                  </div>
                </div>
                <div className={st.button} onClick={() => cancelButton(reserve)}>취소요청</div>
              </div>
            )): <div className={st.empty}>Loding...</div>}
            {reserved && reserved.length ===0 && <div className={st.empty}>예약 내역이 없습니다.</div>}
          </div>
        </div>
        <hr />
        <div>
          <span>이용완료 내역</span>
          <div className={st.infoBox}>
            {done ? done.map(done => (
              <div className={st.info} key={done.id}>
                <span>{done.hotelName}</span>
                <span>{done.roomType}</span>
                <div>{done.checkin} ~ {done.checkout}</div>
                <div>
                  <div>
                    <span>예약자 이름</span>
                    <span>휴대폰 번호</span>
                    <span>예약 금액</span>
                    <span>예약 날짜</span>
                  </div>
                  <div>
                    <span>{done.name}</span>
                    <span>{done.tel}</span>
                    <span>{done.totalPrice.toLocaleString()}원</span>
                    <span>{done.reservedate}</span>
                  </div>
                </div>
                <div className={done.reviewid ? st.button1 : st.button} onClick={(e) => onClick(e, done.reviewid)} data-id={done.id} data-hotelid={done.hotelid} data-name={done.hotelName} data-room={done.roomType} data-date={`${done.checkin} ~ ${done.checkout}`}>{done.reviewid ? "리뷰수정" : "리뷰작성"}</div>
              </div>
            )): <div className={st.empty}>Loding...</div>}
            {done && done.length ===0 && <div className={st.empty}>이용 내역이 없습니다.</div>}
            {review &&
              <div className={st.modal} onClick={() => setReview(null)}>
                
                <form className={st.review} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} >
                  <span>{name}<span className={st.close} onClick={() => setReview(null)}>&times;</span></span>
                  <div><span>{room}</span><span> {date}</span></div>
                  <span>리뷰제목</span>
                  <div className={st.title}>
                    <input required name="title" defaultValue={isUpdate ? currTitle : ""}></input>
                    <div>
                      <span onMouseOver={() => setRating(1)}>&#9733;</span>
                      {rating > 1 ? <span onMouseOver={() => setRating(2)}>&#9733;</span> : <span onMouseOver={() => setRating(2)}>&#9734;</span> }
                      {rating > 2 ? <span onMouseOver={() => setRating(3)}>&#9733;</span> : <span onMouseOver={() => setRating(3)}>&#9734;</span> }
                      {rating > 3 ? <span onMouseOver={() => setRating(4)}>&#9733;</span> : <span onMouseOver={() => setRating(4)}>&#9734;</span> }
                      {rating > 4 ? <span onMouseOver={() => setRating(5)}>&#9733;</span> : <span onMouseOver={() => setRating(5)}>&#9734;</span> }
                    </div>
                  </div>
                  <span>리뷰내용</span>
                  <textarea required name="content" defaultValue={isUpdate ? currContent : ""}></textarea>
                  <span>이모티콘</span>
                  <div className={st.emoji}>
                    <span className={emoji === "&#128539;" ? st.select : "" } onMouseOver={() => setEmoji("&#128539;")}>&#128539;</span>
                    <span className={emoji === "&#128515;" ? st.select : "" } onMouseOver={() => setEmoji("&#128515;")}>&#128515;</span>
                    <span className={emoji === "&#128525;" ? st.select : "" } onMouseOver={() => setEmoji("&#128525;")}>&#128525;</span>
                    <span className={emoji === "&#128517;" ? st.select : "" } onMouseOver={() => setEmoji("&#128517;")}>&#128517;</span>
                    <span className={emoji === "&#128545;" ? st.select : "" } onMouseOver={() => setEmoji("&#128545;")}>&#128545;</span>
                  </div>
                  <input type="submit" value="작성완료" />
                </form>
              </div>
            }
          </div>
        </div>
        <hr />
        <div>
          <span>취소 내역</span>
          <div className={st.infoBox}>
            {canceled ? canceled.map(canceled => (
              <div className={st.info} key={canceled.id}>
                <span>{canceled.hotelName}</span>
                <span>{canceled.roomType}</span>
                <div>{canceled.checkin} ~ {canceled.checkout}</div>
                <div>
                  <div>
                    <span>예약자 이름</span>
                    <span>휴대폰 번호</span>
                    <span>예약 금액</span>
                    <span>예약 날짜</span>
                  </div>
                  <div>
                    <span>{canceled.name}</span>
                    <span>{canceled.tel}</span>
                    <span>{canceled.totalPrice.toLocaleString()}원</span>
                    <span>{canceled.reservedate}</span>
                  </div>
                </div>
                <div className={st.canceled}>취소완료_{canceled.canceleDate}</div>
              </div>
            )): <div className={st.empty}>Loding...</div>}
            {canceled && canceled.length ===0 && <div className={st.empty}>취소 내역이 없습니다.</div>}
          </div>
        </div>
      </div>
    </>
  )
}
