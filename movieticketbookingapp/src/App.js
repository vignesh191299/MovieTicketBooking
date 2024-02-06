import React from "react";
import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import MovieTicketBookingComponent from "./Component/MovieTicketBooking";
import LoginScreen from "./Component/login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/movies" component={MovieTicketBookingComponent} />
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
