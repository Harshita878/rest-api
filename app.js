const express = require('express');
const app = express();
const studentRoute = require('./api/routes/student');
const facultyRoute = require('./api/routes/faculty.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect('mongodb+srv://harshi:1234@atlascluster.wylz7vp.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log('connection failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('connected with database...........');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/student',studentRoute)
app.use('/faculty',facultyRoute)


app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad request'
    })
})


module.exports = app;