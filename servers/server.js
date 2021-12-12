'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const port = 3001;

require('./models/knex-configs.js');
app.use(express.json());
app.use(express.urlencoded( {extended : true } )); 
app.use(cors());


app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(22, err)
})

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
}); 