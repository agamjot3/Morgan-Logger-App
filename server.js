const express = require('express');
const morgan = require('morgan');
const {v4:uuidv4} = require("uuid");
const fs = require('fs');
const path = require('path');


const app = express();


const PORT = 9000;

morgan.token('id', function getId(req){
    return req.id;
});

morgan.token('param',function(req,res,param){
    return "Requested";
})

app.use(assignId);

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),{flags:'a'})

// app.use(morgan('short'));                          //Type 1
// app.use(morgan('combined'));                       //Type 2
// app.use(morgan('common'));                         //Type 3
// app.use(morgan('dev'));                             //Type 4
// app.use(morgan('tiny'));                            //Type 5
app.use(morgan(':id :param :method :status :url'));         //Type 6
app.use(morgan(':id :param :method :status :url', {stream : accessLogStream}));         //Type 6


app.get('/',(req,res)=>{
res.status(200);
    res.send("Morgan Logger App");
})

function assignId(req,res,next){
    req.id = uuidv4();
    next();
}
app.listen(PORT, ()=>{
    console.log(`The server is running on port:${PORT}`);
})
