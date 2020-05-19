const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const surveyRoutes = express.Router();
const PORT = 8080;

let Survey = require('./model/survey');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/surveys', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

surveyRoutes.route('/').get(function(req, res) {
    Survey.find(function(err, surveys) {
        if (err) {
            console.log(err);
        } else {
            res.json(surveys);
        }
    });
});

surveyRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Survey.findById(id, function(err, survey) {
        res.json(survey);
    });
});

surveyRoutes.route('/update/:id').post(function(req, res) {
    Survey.findById(req.params.id, function(err, survey) {
        if (!survey)
            res.status(404).send("data is not found");
        else
            survey.surevy_name = req.body.surevy_name;
                
            survey.save().then(survey => {
                res.json('Survey updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

surveyRoutes.route('/add').post(function(req, res) {
    let survey = new Survey(req.body);
    survey.save()
        .then(survey => {
            res.status(200).json({'survey': 'survey added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new survey failed');
        });
});

app.use('/surveys', surveyRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});