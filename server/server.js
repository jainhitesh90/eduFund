const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 8080;

const userRouter = require('./routes/user-routes.js')
const surveyRouter = require('./routes/survey-routes.js')

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/survey', surveyRouter);

mongoose.connect('mongodb://127.0.0.1:27017/surveys', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});