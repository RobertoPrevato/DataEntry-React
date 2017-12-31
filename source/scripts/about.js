/**
 * About view.
 */
import React from "react"
import I from "ilocale"

class About extends React.Component {

  componentWillMount() {
    I.setTitle("About"); // a
  }

  render() {
    return (
      <div id="about-region">
        <h1>{I.t("voc.About")}</h1>
        <p>{I.t("voc.AboutText")}</p>
        <p>{I.t("voc.SourceCode")} <a href="https://github.com/RobertoPrevato/DataEntry-React">https://github.com/RobertoPrevato/DataEntry-React</a></p>
        <p>{I.t("voc.AppVersion")}</p>
        <hr />
        <section>
          <h2>{I.t("voc.DesignNote")}</h2>
          <p>{I.t("voc.AboutDesign")}</p>
          <img src="https://raw.githubusercontent.com/RobertoPrevato/DataEntry/master/docs/renders/design-preferences.svg?sanitize=true" alt="Design preferences" width="594" height="322" />
        </section>
        <hr />
        <section>
          <h2>{I.t("voc.UsefulLinks")}</h2>
          <ul>
            <li><a href="https://github.com/RobertoPrevato/DataEntry">DataEntry forms validation library</a></li>
            <li><a href="https://github.com/RobertoPrevato/DataEntry-React">Source code of this demo</a></li>
            <li><a href="https://github.com/RobertoPrevato/I.js">client side localization with I.js</a></li>
          </ul>
        </section>
      </div>);
  }
}

export default About;