'use strict';

const dbData = require('../models');

module.exports = {
  getHotels : async (req, res) => {
    const data = await dbData.hotels();

    const hotels = await Promise.all(
      data.map(async hotel => {
        const inforData = await dbData.hotelInformation(hotel.id);
        let events = [];
        let surround = [];
        let notice = [];
        inforData.map(data => {
          data.event && events.push(data.event);
          data.surround && surround.push(data.surround);
          data.notice && notice.push(data.notice);
        });
        const room = await dbData.hotelRoom(hotel.id);
  
        return {...hotel, 'event' : events, 
        'information' : {'surround' : surround, 'notice' : notice},
        'room' : room
        };
      })
    );
    res.send(hotels);
  },
  getHotel : async (req, res) => {
    const data = await dbData.hotel(req.params.id);
    const inforData = await dbData.hotelInformation(req.params.id);
    let events = [];
    let surround = [];
    let notice = [];
    inforData.map(data => {
      data.event && events.push(data.event);
      data.surround && surround.push(data.surround);
      data.notice && notice.push(data.notice);
    });
    const room = await dbData.hotelRoom(req.params.id);

    res.send({...data[0], 'event' : events, 
        'information' : {'surround' : surround, 'notice' : notice},
        'room' : room
        });
  },
  updateHotel : async (req, res) => {
    let data = req.body;
    delete data['information'];
    delete data['room'];
    delete data['event'];
    // console.log('data', data);
    try{
      await dbData.updateHotel(data, req.params.id);
      res.sendStatus(200);
    }catch (e){
      console.log(e.message);
      res.sendStatus(500).send({message: e.message});
    }
  }
};