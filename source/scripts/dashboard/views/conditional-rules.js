/**
 * Dashboard view.
 */
import React from "react"
import I from "ilocale"
import DataEntryForm from "../../common/views/dataentry"
import demoView from "../../common/views/demoview"

class ConditionalRules extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      obj: {
        side: "",
        "fav-jedi": "",
        "fav-sith": ""
      },
      message: "<-- click to validate everything!"
    };
  }

  componentWillMount() {
    I.setTitle("ConditionalRules");
  }

  schema() {
    // returns the validation schema for the example form
    return {
      "side": {
        validation: ["required"],
        trigger: ["fav-jedi", "fav-sith"] // validation of this field, triggers validation on the other two fields
      },
      "fav-jedi": {
        validation: function () {
          var side = this.getFieldValue("side");
          return side == "light" ? ["required"] : ["none"];
        }
      },
      "fav-sith": {
        validation: function () {
          var side = this.getFieldValue("side");
          return side == "dark" ? ["required"] : ["none"];
        }
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
          <h1>{I.t("voc.ConditionalRules")}</h1>
          <DataEntryForm schema={self.schema()} ref={instance => { this.form = instance; }} onFormat={handleValueChange}>
            <div id="example-form" className="conditional-rules">
              <label htmlFor="light-side">Light side of the force:</label>
              <input id="light-side" type="radio" value="light" name="side" checked={obj.side == 'light'} onChange={changeHandler} /><br />
              <label htmlFor="dark-side">Dark side of the force:</label>
              <input id="dark-side" type="radio" value="dark" name="side" checked={obj.side == 'dark'} onChange={changeHandler} /><br />
      
              <label htmlFor="fav-jedi">Favorite Jedi (required if you choose the Light side):</label>
              <input id="fav-jedi" type="text" name="fav-jedi" value={obj['fav-jedi']} onChange={changeHandler} /><br />
      
              <label htmlFor="fav-sith">Favorite Sith (required if you choose the Dark side):</label>
              <input id="fav-sith" type="text" name="fav-sith" value={obj['fav-sith']} onChange={changeHandler} /><br />
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
            <li>A first selection is required...</li>
            <li>Depending on the selection, a certain input field is required;</li>
            <li>Changing selection triggers the validation of dependent properties</li>
          </ul>
        </section>
      </div>);
  }
}

demoView(ConditionalRules)

export default ConditionalRules;
