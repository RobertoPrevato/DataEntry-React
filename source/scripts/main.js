
import React from "react"
import { render } from "react-dom"
import { Router, Route, hashHistory } from "react-router"

// setup localization
import I from "ilocale"
import en from "./locale/en"

I.add(en);

// extend I with useful function to set page title
I.setTitle = function (key) {
  document.title = "DataEntry with React demo - " + I.t("titles." + key);
}

// setup dataentry
import { setupDataEntry } from "./common/validation/setup-dataentry"
setupDataEntry();

import App from "./app"
import DashboardRoutes from "./dashboard/routes"
import { NotFound } from "./common/views/notfound"
import About from "./about"

var rootElement = document.getElementById("root");
if (!rootElement) {
  // for tests
  rootElement = document.createElement("div");
  rootElement.setAttribute("id", "root");
  document.body.appendChild(rootElement);
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* add the routes here */}
      {DashboardRoutes}
      <Route path="/about" component={About} key="about-route"/>
      <Route path='*' component={NotFound}  key="not-found"/>
    </Route>
  </Router>
), rootElement)