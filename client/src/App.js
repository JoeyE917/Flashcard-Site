import React, { useState, useEffect, useRef, Component } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Landing from "./Components/Landing";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import PrivateRoute from "./Components/private-route/PrivateRoute";
import Dashboard from "./Components/dashboard/Dashboard";

if(localStorage.jwtToken){
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and set user
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  let currTime = Date.now() / 1000;
  if(decoded.exp < currTime){
    store.dispatch(logoutUser());

    window.location.href = "./login";
  }
}

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
