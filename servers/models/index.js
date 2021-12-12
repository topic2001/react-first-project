'use strict';

const knexConfig = require('./knex-configs');
const knex = require('knex')(knexConfig);

exports.hotels = function () {
  return knex('hotels')
};

exports.hotel = function (hotelid) {
  return knex('hotels')
  .where('id', hotelid)
};

exports.hotelInformation = function (hotelid) {
  return knex('hotelInformation')
  .select('event', 'surround', 'notice')
  .where('hotelId', hotelid);
};

exports.updateHotel = function (data, id) {
  return knex('hotels')
  .where('id', id)
  .update(data);
};

exports.hotelRoom = function (hotelid) {
  return knex('hotelRoom')
  .select('id', 'name', 'price', 'photo')
  .where('hotelId', hotelid);
};

exports.reviews = function (hotelid) {
  return knex('reviews')
  .select('*')
  .where('hotelId', hotelid);
};

exports.reviewsAll = function (hotelid) {
  return knex('reviews')
  .select('*');
};

exports.review = function (id) {
  return knex('reviews')
  .select('*')
  .where('id', id);
};

exports.setReview = function (data) {
  return knex('reviews')
  .insert(data)
};

exports.updateReview = function (data, id) {
  return knex('reviews')
  .where('id', id)
  .update(data);
};

exports.reserves = function (email) {
  return knex('reserves')
  .select('*')
  .where('email', email);
};

exports.reserve = function (id) {
  return knex('reserves')
  .select('*')
  .where('id', id);
};

exports.updateReserve = function (data, id) {
  return knex('reserves')
  .where('id', id)
  .update(data);
};