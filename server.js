const express = require('express');
const app = express();

const dbConnection = require('./config/db');
//const notesModel = require('./models/notes.model')

app.set('view engine','ejs');
app.use(express.static('public'));

const cookieParser = require("cookie-parser");
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const indexroutes = require('./routes/index.routes');
app.use('/notes/',indexroutes);

const userroutes = require('./routes/user.routes');
app.use('/',userroutes);

app.listen(3000);