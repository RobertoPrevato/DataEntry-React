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
        validation: [{ name: "required", message: "Please select your favorite food" }]
      },
      "force-side": {
        validation: [{ name: "required", message: "Please select a side of the force" }]
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
              <label htmlFor="username-field">Username</label>
              <input id="username-field" type="text" name="name" /><br />
              <label htmlFor="year-field">Year (between 1900 and 2015)</label>
              <input id="year-field" type="text" name="year" />
              <br />
              <label htmlFor="example-field">A field that is not required, but accepts only letters</label>
              <input id="example-field" type="text" name="only-letters" /><br />
              <label htmlFor="favored-food-select">Favored food:</label>
              <select id="favored-food-select" name="favored-food">
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
              <label htmlFor="light-side-radio">Light side of the force:</label>
              <input id="light-side-radio" type="radio" value="light" name="force-side" /><br />
              <label htmlFor="dark-side-radio">Dark side of the force:</label>
              <input id="dark-side-radio" type="radio" value="dark" name="force-side" /><br />
              <label htmlFor="policy-read-check" className="inline">A checkbox that must be checked (policy acceptance)</label>
              <input id="policy-read-check" type="checkbox" name="policy-read" /><br />
            </div>
            <hr />
            <button className="validation-trigger" onClick={() => { this.validate(); }}>Validate</button>
          </DataEntryForm>
        </section>
        <section>
          <h2>Please note:</h2>
          <ul>
            <li>Formatting is applied only to valid values</li>
            <li>How the year field is automatically formatted to remove leading zeros ("001900" -> "1900") - <em>implicit formatting by rule 'integer'</em></li>
            <li>How the username field is automatically formatted to clean spaces ("   Hello   World! " -> "Hello World!") <em>explicit formatting with rule 'cleanSpaces'</em></li>
            <li>How the year field prevents user from inserting letters typing <em>implicit constraint by rule 'integer'</em></li>
            <li>How error messages can be specified for each field rule in the schema object</li>
            <li>When clicking "Validate" button, the first invalid field is automatically focused</li>
            <li>How validation is automatically fired on blur, so its state change accordingly to its new value</li>
            <li>Open the browser console to see the object returned by DataEntry.validate function.</li>
          </ul>
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
