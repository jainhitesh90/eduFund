import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Signup from "./components/signup.js";
import CreateSurvey from "./components/create-survey.js";
import EditSurvey from "./components/edit-survey.js";
import SurveyList from "./components/survey-list.js";

import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="" target="_blank">
              <img src={logo} width="30" height="30" alt="EduFund" />
            </a>
            <Link to="/" className="navbar-brand">EduFund Survey App</Link>
          </nav>
          <br/>
          <Route path="/" exact component={Signup} />
          <Route path="/dashboard" exact component={SurveyList} />
          <Route path="/edit/:id" component={EditSurvey} />
          <Route path="/create" component={CreateSurvey} />
        </div>
      </Router>
    );
  }
}

export default App;