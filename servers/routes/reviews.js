'use strict';

const dbData = require('../models');

module.exports = {
  getReviews : async (req, res) => {
    if(!req.query.hotelid){
      const reviews = await dbData.reviewsAll();
      res.send(reviews);
    } else{
      const reviews = await dbData.reviews(req.query.hotelid);
      res.send(reviews);
    }
  },
  getReview : async (req, res) => {

    const review = await dbData.review(req.params.id);
    res.send(review[0]);
  },
  setReview : async (req, res) => {
    try{
      const [id] = await dbData.setReview(req.body);
      console.log(req.body);
      res.sendStatus(200).send(id);
    } catch (e){
      console.log(e.message);
      res.sendStatus(500).send({message: e.message});
    }
  },
  updateReview : async (req, res) => {
    try{
      await dbData.updateReview(req.body, req.params.id);
      res.sendStatus(200);
    } catch (e){
      console.log(e.message);
      res.sendStatus(500).send({message: e.message});

    }
  }
};