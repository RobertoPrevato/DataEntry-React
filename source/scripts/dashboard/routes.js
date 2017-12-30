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
  <IndexRoute component={FormattingRules} key="formatting-rules"/>,
  <IndexRoute component={ConditionalRules} key="conditional-rules"/>,
  <IndexRoute component={MultipleFields} key="multiple-fields"/>
]

export default DashboardRoutes