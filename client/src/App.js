import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login.js";
import Signup from "./pages/sign-up.js";
import Homepage from "./pages/home-page.js";
import ErrorComponent from './components/error-component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/login" exact component={Login} />
            <Route path="/sign-up" exact component={Signup} />
            <Route component={ErrorComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;