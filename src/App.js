import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import Login from "./pages/login.js";
import Signup from "./pages/sign-up.js";
// import HomePage from "./pages/home-page.js";
import CreateSurvey from "./pages/create-survey.js";
import CoOrdinatorSurveys from "./pages/co-ordinator-survey-list.js";
import RespondantsSurveys from "./pages/respondant-survey-list.js";

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
          {/* <Route path="/home" exact component={HomePage} /> */}
          <Route path="/co-ordinator/home" exact component={CoOrdinatorSurveys} />
          <Route path="/co-ordinator/create-survey" component={CreateSurvey} />
          <Route path="/respondant/home" exact component={RespondantsSurveys} />
          
        </div>
      </Router>
    );
  }
}

export default App;