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
      "force-side": {
        validation: ["required"],
        trigger: ["fav-jedi", "fav-sith"] // validation of this field, triggers validation on the other two fields
      },
      "fav-jedi": {
        validation: function () {
          var side = this.dataentry.getFieldValue("force-side");
          return side == "light" ? ["required"] : ["none"];
        }
      },
      "fav-sith": {
        validation: function () {
          var side = this.getFieldValue("force-side");
          return side == "dark" ? ["required"] : ["none"];
        }
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
              <label htmlFor="light-side">Light side of the force:</label>
              <input id="light-side" type="radio" value="light" name="force-side" /><br />
              <label htmlFor="dark-side">Dark side of the force:</label>
              <input id="dark-side" type="radio" value="dark" name="force-side" /><br />
      
              <label htmlFor="fav-jedi">Favorite Jedi (required if you choose the Light side):</label>
              <input id="fav-jedi" type="text" name="fav-jedi" /><br />
      
              <label htmlFor="fav-sith">Favorite Sith (required if you choose the Dark side):</label>
              <input id="fav-sith" type="text" name="fav-sith" /><br />
            </div>
            <hr />
            <button className="btn" onClick={() => { this.validate(); }}>Validate</button>
          </DataEntryForm>
        </section>
      </div>);
  }
}

export default Dashboard;
