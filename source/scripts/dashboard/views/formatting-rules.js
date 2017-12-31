/**
 * Dashboard view.
 */
import React from "react"
import I from "ilocale"
import demoView from "../../common/views/demoview"
import DataEntryForm from "../../common/views/dataentry"

class FormattingRules extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      obj: {
        a: "",
        b: ""
      },
      message: "<-- click to validate everything!"
    };
  }

  componentWillMount() {
    I.setTitle("FormattingRules");
  }

  schema() {
    // returns the validation schema for the example form
    return {
      a: {
        validation: ["required"],
        format: ["zero-fill"],
        preformat: ["zero-unfill"]
      },
      b: {
        validation: ["required"],
        format: ["zero-fill"],
        preformat: ["zero-unfill"]
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
          <h1>{I.t("voc.FormattingRules")}</h1>
          <DataEntryForm schema={self.schema()} ref={instance => { this.form = instance; }} onFormat={handleValueChange}>
            <div id="example-form">
              <label htmlFor="zero-field">Zero filled (10)</label>
              <input id="zero-field" type="text" name="a" maxLength="10" value={obj.a} onChange={changeHandler} /><br />
      
              <label htmlFor="zero-field-1">Zero filled (5)</label>
              <input id="zero-field-1" type="text" name="b" maxLength="5" value={obj.b}  onChange={changeHandler} /><br />
            </div>
            <hr />
            <button className="btn" onClick={() => { this.validate(); }}>Validate</button> <em className="btn-note">{message}</em>
          </DataEntryForm>
        </section>
        <section>
          <h3>Preview of the value object, in state (handled by React):</h3>
          <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(obj, 0, 2) }}></pre>
        </section>
        <section>
          <h2>Please note:</h2>
          <ul>
            <li>How formatting on blur works</li>
            <li>How formatting on focus works</li>
          </ul>
        </section>
      </div>);
  }
}

demoView(FormattingRules)

export default FormattingRules;
