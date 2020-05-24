import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login.js";
import Signup from "./pages/sign-up.js";
import CreateSurvey from "./pages/create-survey.js";
import CoOrdinatorSurveys from "./pages/co-ordinator-survey-list.js";
import RespondantsSurveys from "./pages/respondant-survey-list.js";
import NavBarComponent from "./components/nav-bar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <NavBarComponent onLogout={this.logout} />
          <br />
          <Route path="/login" exact component={Login} />
          <Route path="/sign-up" exact component={Signup} />
          <Route path="/co-ordinator/home" exact component={CoOrdinatorSurveys} />
          <Route path="/co-ordinator/create-survey" component={CreateSurvey} />
          <Route path="/respondant/home" exact component={RespondantsSurveys} />
        </div>
      </Router>
    );
  }
}

export default App;