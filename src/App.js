import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bulma/css/bulma.css";
import Login from "./views/authentication/Login.jsx";
import AdminHome from "./views/admin_home/AdminHome";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Login} />
            <Route path="/admin_home" exact component={AdminHome} />
        </div>
      </Router>
    );
  }
}

export default App;
