import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bulma/css/bulma.css";
import Login from "./views/authentication/Login.jsx";
import AdminHome from "./views/admin_home/AdminHome";
import StaffHome from "./views/staff_home/StaffHome";
import FeeStatementView from "./views/staff_home/fee_management/fee_statement/FeeStatementView";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Login} />
            <Route path="/admin_home" exact component={AdminHome} />
            <Route path="/staff_home" exact component={StaffHome} />
            <Route path="/fee_statement" exact component={FeeStatementView} />
        </div>
      </Router>
    );
  }
}

export default App;
