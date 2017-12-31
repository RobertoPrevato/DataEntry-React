/**
 * Dashboard view.
 */
import React from "react"
import I from "ilocale"
import demoView from "../../common/views/demoview"
import DataEntryForm from "../../common/views/dataentry"

class Dashboard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      obj: {
        username: "Hello",
        year: 1000,
        'only-letters': 'aa8',
        'favored-food': '',
        'force-side': '',
        'policy-read': false
      },
      message: "<-- click to validate everything!"
    };
  }

  componentWillMount() {
    I.setTitle("Dashboard");
  }

  schema() {
    // returns the validation schema for the example form
    return {
      username: {
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

  render() {
    const self = this;
    const changeHandler = self.handleChange.bind(self);
    const handleValueChange = self.handleValueChange.bind(self);
    const obj = self.state.obj;
    const message = self.state.message;
    return (
      <div id="dashboard">
        <section>
          <h1>{I.t("voc.FormExample")}</h1>
          <DataEntryForm schema={self.schema()} ref={instance => { this.form = instance; }} onFormat={handleValueChange}>
            <div id="example-form" className="dashboard">
              <label htmlFor="username-field">Username</label>
              <input id="username-field" type="text" name="username" value={obj.username} onChange={changeHandler} /><br />
              <label htmlFor="year-field">Year (between 1900 and 2015)</label>
              <input id="year-field" type="text" name="year" value={obj.year} onChange={changeHandler} />
              <br />
              <label htmlFor="example-field">A field that is not required, but accepts only letters</label>
              <input id="example-field" type="text" name="only-letters" value={obj['only-letters']} onChange={changeHandler} /><br />
              <label htmlFor="favored-food-select">Favored food:</label>
              <select id="favored-food-select" name="favored-food" value={obj['favored-food']} onChange={changeHandler}>
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
              <input id="light-side-radio" type="radio" value="light" name="force-side" checked={obj['force-side'] == 'light'} onChange={changeHandler} /><br />
              <label htmlFor="dark-side-radio">Dark side of the force:</label>
              <input id="dark-side-radio" type="radio" value="dark" name="force-side" checked={obj['force-side'] == 'dark'} onChange={changeHandler} /><br />
              <label htmlFor="policy-read-check" className="inline">A checkbox that must be checked (policy acceptance)</label>
              <input id="policy-read-check" type="checkbox" name="policy-read" checked={obj['policy-read']} onChange={changeHandler} /><br />
            </div>
            <hr />
            <button className="btn" onClick={() => { this.validate(); }}>Validate</button> <em className="btn-note">{message}</em>
          </DataEntryForm>
        </section>
        <hr />
        <section>
          <h3>Preview of the value object, in state (handled by React):</h3>
          <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(obj, 0, 2) }}></pre>
        </section>
        <section>
          <h2>Please note:</h2>
          <ul>
            <li>React is taking care of binding HTML elements' values to the object in memory (state) - it is used normally</li>
            <li>DataEntry is taking care of validating the values by <em>schema</em> and by elements <em>name</em> property</li>
            <li>Formatting is applied only to valid values: try to input <strong>"&nbsp;&nbsp;&nbsp;Hello&nbsp;&nbsp;&nbsp;&nbsp;World&nbsp;&nbsp;&nbsp;"</strong> in the username field</li>
            <li>After formatting (done by DataEntry), the state of the parent view is updated using an event handler</li>
            <li>How validation is automatically fired on blur, so the state of blurred input element change accordingly to its new value</li>
            <li>How the year field is automatically formatted to remove leading zeros ("001900" -> "1900") - <em>implicit formatting by rule 'integer'</em></li>
            <li>How the username field is automatically formatted to clean spaces ("   Hello   World! " -> "Hello World!") - <em>explicit formatting with rule 'cleanSpaces'</em></li>
            <li>How the year field prevents user from inserting letters typing - <em>implicit constraint by rule 'integer'</em></li>
            <li>How error messages can be specified for each field rule in the schema object</li>
            <li>When clicking "Validate" button, the first invalid field is automatically focused</li>
            <li>Open the browser console to see the object returned by DataEntry.validate function.</li>
            <li>See the demo source code: the instance of dataentry is disposed inside `componentWillUnmount` React view function. Event handlers are removed here.</li>
          </ul>
        </section>
      </div>);
  }
}

demoView(Dashboard)

export default Dashboard;
