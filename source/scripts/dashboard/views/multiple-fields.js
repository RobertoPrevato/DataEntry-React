/**
 * MultipleFields view.
 */
import React from "react"
import I from "ilocale"
import demoView from "../../common/views/demoview"
import DataEntryForm from "../../common/views/dataentry"

var k = 0;

function getUniqueId(name) {
  k++;
  if (!name) name = "id";
  return `${name}-${k}`;
}

function removeItem(a, o) {
  var x = -1;
  for (var i = 0, l = a.length; i < l; i++) {
    if (a[i] === o) {
      x = i;
      break;
    }
  }
  a.splice(x, 1);
}

class MultipleFields extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      k: 0,
      obj: {
        emails: [{
          key: getUniqueId("email"),
          address: ""
        }],
        phones: [{
          key: getUniqueId("phone"),
          number: ""
        }]
      },
      message: "<-- click to validate everything!"
    };
  }

  componentWillMount() {
    I.setTitle("MultipleFields");
  }

  schema() {
    // returns the validation schema for the example form
    return {
      "email": {
        validation: ["required", "email"]
      },
      "phone": {
        validation: ["required", "phone"]
      },
      "email-optional": {
        validation: ["email"]
      },
      "phone-optional": {
        validation: ["phone"]
      }
    };
  }

  addNewEmail() {
    const obj = this.state.obj;
    obj.emails.push({
      key: getUniqueId("email"),
      address: ""
    });
    this.setState({obj: obj})
  }

  addNewPhone() {
    const obj = this.state.obj;
    obj.phones.push({
      key: getUniqueId("phone"),
      number: ""
    });
    this.setState({obj: obj})
  }

  removeItem(from, o) {
    const obj = this.state.obj;
    removeItem(obj[from], o)
    this.setState({obj: obj})
  }

  renderEmails() {
    const self = this,
      state = self.state,
      obj = state.obj,
      emails = obj.emails;
    
    var index = -1;

    return emails.map(o => {
      index++;
      return (
      <dd key={o.key}>
        <input type="text" name={index > 0 ? "email-optional" : "email"} value={o.address} onChange={e => self.handleItemValueChange("emails", o, "address", e.target.value)} />
        {index > 0 &&
        <button type="button" className="btn remove" onClick={() => self.removeItem("emails", o)}>Remove</button>
        }
      </dd>)
    })
  }

  renderPhones() {
    const self = this,
      state = self.state,
      obj = state.obj,
      phones = obj.phones;
    
    var index = -1;
    return phones.map(o => {
      index++;
      return (
        <dd key={o.key}>
          <input type="text" name={index > 0 ? "phone-optional" : "phone"} value={o.number} onChange={e => self.handleItemValueChange("phones", o, "number", e.target.value)} />
          {index > 0 &&
          <button type="button" className="btn remove" onClick={() => self.removeItem("phones", o)}>Remove</button>
          }
        </dd>)
    })
  }

  render() {
    const self = this;
    const obj = self.state.obj;
    const message = self.state.message;
    return (
      <div id="dashboard">
        <section>
          <h1>{I.t("voc.MultipleFields")}</h1>
          <DataEntryForm schema={self.schema()} ref={instance => { this.form = instance; }} onFormat={self.handleValueChange.bind(self)}>
            <div id="example-form">
              <fieldset>
                <div className="emails-region">
                  <dl id="emails" data-type="email">
                    <dt>
                      <label>Emails:</label>
                    </dt>
                    {self.renderEmails()}
                  </dl>
                  <button type="button" className="btn add" onClick={this.addNewEmail.bind(this)}>Add</button>
                </div>

                <div className="phones-region">
                  <dl id="phones" data-type="phone">
                    <dt>
                      <label>Phones:</label>
                    </dt>
                    {self.renderPhones()}
                  </dl>
                  <button type="button" className="btn add" onClick={this.addNewPhone.bind(this)}>Add</button>
                </div>
              </fieldset>
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
            <li>In this example, the first email address and first phone number are required</li>
            <li>Additional contacts, added clicking on the "Add" buttons, are optional but they must still contain valid values</li>
            <li>Since validation rules are applied to HTML elements with matching `name` (implementation detail of DomHarvester class), we can handle <em>n</em> fields using only two properties definition</li>
          </ul>
        </section>
      </div>);
  }
}

demoView(MultipleFields)

export default MultipleFields;
