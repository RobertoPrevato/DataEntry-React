/**
 * Dashboard routes
 */
import React from "react"
import { IndexRoute, Route } from "react-router"
import Dashboard from "./views/dashboard"
import ConditionalRules from "./views/conditional-rules"
import FormattingRules from "./views/formatting-rules"
import MultipleFields from "./views/multiple-fields"

var DashboardRoutes = [
  <IndexRoute component={Dashboard} key="index-route"/>,
  <Route path="/formatting-rules" component={FormattingRules} key="formatting-rules"/>,
  <Route path="/conditional-rules" component={ConditionalRules} key="conditional-rules"/>,
  <Route path="/multiple-fields" component={MultipleFields} key="multiple-fields"/>
]

export default DashboardRoutes