const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoute = require('./api/routes/product')
const userRoute = require('./api/routes/user')
const fileUpload = require('express-fileupload');



mongoose.connect('mongodb+srv://harshi:1234@atlascluster.wylz7vp.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log('connection failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('connected with database...........');
});


app.use(fileUpload({
    useTempFiles:true
}))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/product',productRoute);
app.use('/user',userRoute);


app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad request'
    })
})


module.exports = app;
