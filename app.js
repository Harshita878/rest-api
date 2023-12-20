const express = require('express');
const app = express();
const productRoute = require('./api/routes/product.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect('');

mongoose.connection.on('error',err=>{
    console.log('connection failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('connected with database...........');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/product',productRoute)


app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad request'
    })
})


module.exports = app;
