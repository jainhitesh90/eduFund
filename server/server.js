require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/user-routes.js')
const surveyRouter = require('./routes/survey-routes.js')

const app = express();
const port = parseInt(process.env.PORT)
const uri = process.env.DB_URI

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully!");
})

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/survey', surveyRouter);
app.listen(port, function() {
    console.log("Server is running on Port: " + port);
});