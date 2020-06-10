import React from 'react';
import RegisterForm from "./components/RegisterForm.component"
import SignInForm from "./components/SignInForm.component"
import ManagerUI from "./components/ManagerUI.component"
import CustomerUI from "./components/CustomerUI.component"
import ReactDOM from 'react-dom';
import Button from '@material-ui/core'
import { BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
          <Route path="/foodcourt" exact component={SignInForm} />
          <Route path="/user/add" component={RegisterForm} />
          <Route path="/user/manager/:id" component={ManagerUI} />
          <Route path="/user/customer/:id" component={CustomerUI} />
      </div>
    </Router>
  );
}

export default App;
