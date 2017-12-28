import React from "react";
import I from "ilocale";


class NotFound extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    I.setTitle("NotFound");
  }

  render() {
    return (<div className="not-found-panel">
              <div className="text-region">
                <h1>{I.t("voc.NotFoundTitle")}</h1>
                <p>{I.t("voc.NotFoundMessage")}<br/><a href="/#">{I.t("voc.ReturnToHome")}</a></p>
              </div>
            </div>)
  }
}

export { NotFound }