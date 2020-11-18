const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

require('dotenv/config');

app.use(express.static("public"));
app.use(express.static(__dirname));
app.set("views", __dirname + "/views"); 
//app.use(helmet());
app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

const search = require('./src/index');
app.use('/search',search);

const PORT = process.env.PORT || 8000;

app.listen(PORT,(e)=>{
    if(e){
        console.log(`Error in listening to the port: ${e}`);
    }else{
        console.log(`Application listening on http://localhost:${PORT}/`);
    }
});