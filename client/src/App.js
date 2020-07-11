import React, { useState, useEffect, useRef, Component } from 'react';
import './App.css';
import axios from 'axios';
//import { button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Landing from "./Components/Landing";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";

function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Route exact path ="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Router>
      </Provider>
    </>
  );
}

export default App;
