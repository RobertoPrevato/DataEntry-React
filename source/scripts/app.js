import React from "react"
import I from "ilocale"
import BootstrapLink from "./common/views/bootstrap-link"

class App extends React.Component {
  render() {
    var props = this.props, cl = props.location.pathname;
    return (
    <div>
      <ul id="main-menu" className="nav nav-pills nav-stacked">
        <BootstrapLink href="/" currentLocation={cl} text={I.t("menu.Dashboard")} />
        <BootstrapLink href="/conditional-rules" currentLocation={cl} text={I.t("menu.ConditionalRules")} />
        <BootstrapLink href="/formatting-rules" currentLocation={cl} text={I.t("menu.FormattingRules")} />
        <BootstrapLink href="/multiple-fields" currentLocation={cl} text={I.t("menu.MultipleFields")} />
        <BootstrapLink href="/about" currentLocation={cl} text={I.t("menu.About")} />
      </ul>
      <div id="partial-view">
        {this.props.children}
      </div>
    </div>)
  }
}

export default App;