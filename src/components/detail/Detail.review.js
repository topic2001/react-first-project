import React, { useEffect, useState } from "react";
import st from './Detail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function DetaiReview(props){
  const dispatch = useDispatch();
  const data = useSelector(state => state.hotel.reviews);
  // const i = "&#128539;";
  const star = (rating) => { let starrating=""; for(let i = 0; i < rating; i++ ){starrating +='&#9733;'} return  starrating };
  // console.log(typeof(data));
  // console.log(data && data.length);
  const avgRating = data && data.reduce((acc, cur) => acc + cur.rating, 0)/data.length;
  // console.log(avgRating);

  const reviews = data ? data.sort((a,b) => b.id - a.id).map( (review) => 
                <li key={review.id}>
                  <span className={st.emoji} dangerouslySetInnerHTML={{__html: review.emoji}}></span>
                  <div className={st.review}>
                    <span>{review.title}</span>
                    <div>
                      <span dangerouslySetInnerHTML={{__html: star(review.rating)}}></span>
                      <span>{review.rating*2}</span>
                    </div>
                    <span>{review.content}</span>
                    {review.response ? 
                    <div className={st.reply}>
                      <span className={st.emoji}>&#129312;</span>
                      <span>{review.response}</span>
                    </div> : ""}
                  </div>
                </li>
              ) : <div>Lodding...</div>;
  

  useEffect(() => {
    dispatch({ type: "GET_REVIEWS", id: props.id });
  }, []);

  return(
      <>
        <div className={st.reviewContainer}>
          <div>
            <span>추천해요</span>
            <div>
              <span dangerouslySetInnerHTML={{__html: star(avgRating ? avgRating : 0)}}></span>
              <span>{avgRating ? (avgRating*2).toFixed(1) : ""}</span>
            </div>
          </div>
          <hr />
          <ul>
            {reviews}
            {data && data.length === 0 && <div className={st.empty}>등록된 리뷰가 없습니다.</div>}
          </ul>
        </div>
      </>
  )
}

export default DetaiReview;