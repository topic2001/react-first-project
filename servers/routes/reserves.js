'use strict';

const dbData = require('../models');

module.exports = {
  getReserves : async (req, res) => {

    const reserves = await dbData.reserves(req.query.email);
    res.send(reserves);
  },
  getReserve : async (req, res) => {

    const reserve = await dbData.reserve(req.params.id);
    res.send(reserve[0]);
  },
  updateReserve : async (req, res) => {
    try{
      await dbData.updateReserve(req.body, req.params.id);
      res.sendStatus(200);
    }catch(e){
      console.log(e.message);
      res.sendStatus(500).send({message: e.message});
    }
  }
};