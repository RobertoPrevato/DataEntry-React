/**
 * Dashboard view.
 */
import React from "react"
import I from "ilocale"
import DataEntryForm from "../../common/views/dataentry"

class Dashboard extends React.Component {

  componentWillMount() {
    I.setTitle("Dashboard");
  }

  schema() {
    // returns the validation schema for the example form
    return {
      zero: {
        validation: ["required"],
        format: ["zero-fill"],
        preformat: ["zero-unfill"]
      }
    };
  }

  validate() {
    this.form.validate().then(function (result) {
      console.log(result);

      if (!result.valid)
        // do nothing: the dataentry already did everything
        return;

      // everything is valid: we can use the data
      console.info("Everything is valid!", result.values);
      
      // merge the results in the state of the view;
    });
  }

  render() {
    const self = this;
    return (
      <div id="dashboard">
        <section>
          <h1>{I.t("voc.FormExampleWithDomClasses")}</h1>
          <DataEntryForm schema={self.schema()} ref={instance => { this.form = instance; }}>
            <div id="example-form">
              <legend>Basic example</legend>
              <label htmlFor="zero-field">Zero filled (10)</label>
              <input id="zero-field" type="text" name="zero" maxlength="10" /><br />
      
              <label htmlFor="zero-field-1">Zero filled (5)</label>
              <input id="zero-field-1" type="text" name="zero" maxlength="5" /><br />
            </div>
            <hr />
            <button className="btn" onClick={() => { this.validate(); }}>Validate</button>
          </DataEntryForm>
        </section>
      </div>);
  }
}

export default Dashboard;
