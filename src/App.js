import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import HomePage from "./pages/home-page.js";
import CreateSurvey from "./pages/create-survey.js";
import SurveyList from "./pages/survey-list.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="" target="_blank">
              <img src={logo} width="30" height="30" alt="EduFund" />
            </a>
            <Link to="/" className="navbar-brand">EduFund Survey App!!!!!!</Link>
          </nav>
          <br/>
          <Route path="/login" exact component={Login} />
          <Route path="/sign-up" exact component={Signup} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/my-surveys" exact component={SurveyList} />
          <Route path="/create-survey" component={CreateSurvey} />
        </div>
      </Router>
    );
  }
}

export default App;