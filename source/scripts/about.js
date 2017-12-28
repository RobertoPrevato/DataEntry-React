/**
 * About view.
 */
import React from "react"
import I from "ilocale"

class About extends React.Component {
  render() {
    return (
      <div id="about-region">
        <h1>{I.t("voc.About")}</h1>
        <p>{I.t("voc.AboutText")}</p>
        <p>{I.t("voc.SourceCode")} <a href="https://github.com/RobertoPrevato/DataEntry-React">https://github.com/RobertoPrevato/DataEntry-React</a></p>
        <p>{I.t("voc.AppVersion")}</p>
      </div>);
  }
}

export default About;