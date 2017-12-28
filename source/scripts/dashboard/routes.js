/**
 * Dashboard routes
 */
import React from "react"
import { IndexRoute, Route } from "react-router"
import Dashboard from "./views/dashboard"

var DashboardRoutes = [
  <IndexRoute component={Dashboard} key="index-route"/>
]

export default DashboardRoutes