'use strict';

const express = require('express');
const router = express.Router();

const hotels = require('./hotels');
const reviews = require('./reviews');
const reserves = require('./reserves');

//hotels table
router.get('/hotels', hotels.getHotels);
router.get('/hotels/:id', hotels.getHotel);
router.put('/hotels/:id', hotels.updateHotel);

//revies table
router.get('/reviews', reviews.getReviews);
router.get('/reviews/:id', reviews.getReview);
router.post('/reviews', reviews.setReview);
router.put('/reviews/:id', reviews.updateReview);

//reserves table
router.get('/reserves', reserves.getReserves);
router.get('/reserves/:id', reserves.getReserve);
router.put('/reserves/:id', reserves.updateReserve);

module.exports = router;