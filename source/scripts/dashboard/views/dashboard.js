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
      name: {
        validation: ["required"],
        format: ["cleanSpaces"]
      },
      year: {
        validation: ["required", { name: "integer", params: [{ min: 1900, max: 2015 }] }]
      },
      "only-letters": {
        validation: ["letters"]
      },
      "policy-read": {
        validation: ["mustCheck"]
      },
      "favored-food": {
        validation: ["required"]
      },
      "force-side": {
        validation: ["required"]
      }
    };
  }

  validate() {
    this.form.validate().then(function (result) {
      console.log(result);
    });
  }

  render() {
    const self = this;
    return (
      <div id="dashboard">
        <section>
          <h2>{I.t("voc.FormExample")}</h2>
          <DataEntryForm schema={self.schema()} ref={instance => { this.form = instance; }}>
            <div id="example-form">
              <label>Username</label>
              <input type="text" name="name" /><br />
              <label>Year (between 1900 and 2015)</label>
              <input type="text" name="year" />
              <br />
              <label>A field that is not required, but accepts only letters</label>
              <input type="text" name="only-letters" /><br />
              <label>Favored food:</label>
              <select name="favored-food">
                <option></option>
                <optgroup label="Salty">
                  <option value="pizza">Pizza</option>
                  <option value="noodles">Noodles</option>
                  <option value="asado">Asado</option>
                  <option value="sushi">Sushi</option>
                </optgroup>
                <optgroup label="Sweets">
                  <option value="cheese-cake">Cheese cake</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="marmalade">Marmalade</option>
                </optgroup>
              </select><br />
              <label>Light side of the force:</label>
              <input type="radio" value="light" name="force-side" /><br />
              <label>Dark side of the force:</label>
              <input type="radio" value="dark" name="force-side" /><br />
              <label className="inline">A checkbox that must be checked (policy acceptance)</label>
              <input type="checkbox" name="policy-read" /><br />
            </div>
            <hr />
            <button className="validation-trigger" onClick={() => { this.validate(); }}>Validate</button>
          </DataEntryForm>
        </section>
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

export default Dashboard;
