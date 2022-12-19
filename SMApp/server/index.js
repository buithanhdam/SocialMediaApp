const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const AuthRoute  =require('./routes/AuthRoute');
const UserRoute = require('./routes/UserRoute');
const PostRoute = require('./routes/PostRoute');
const UploadRoute = require('./routes/UploadRoute');


// Routes express
const app = express();
// images to public
app.use(express.static('public'));
app.use('/images',express.static("images"))

//Middleware structure
app.use(bodyParser.json({limit: '30mb', extended : true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended : true}));
app.use(cors());

dotenv.config()

mongoose.connect(
    process.env.MONGO_DB_CONNECT
   ,{useNewUrlParser: true, useUnifiedTopology: true} )
   .then(()=> app.listen(process.env.PORT,()=> console.log(`App listening in port: http://localhost:${process.env.PORT}`)))
   .catch((err)=> console.log(err));

//usage routes

app.use('/auth',AuthRoute);
app.use('/user',UserRoute);
app.use('/post',PostRoute);
app.use('/upload',UploadRoute);
