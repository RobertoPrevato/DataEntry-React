import React from "react"
import ReactDOM from "react-dom"
import I from "ilocale";
import DataEntry from "dataentry"
import DataEntryDom from "dataentry/dom"

// ********************************************************************************************* //
// TODO:
//
// Example with DOM classes (and somehow writing back to the model in a way that makes sense)
// Example with Context classes (let React make all DOM manipulation)
//
// ********************************************************************************************* //

class DataEntryForm extends React.Component {

  constructor(props) {
    super(props);

    const schema = props.schema;
    if (!schema) {
      throw "missing validation schema for DataEntry";
    }

    this.dataentry = null;
  }

  componentDidMount() {
    // When the component is added, initialize a dataentry
    this.initializeDataEntry();
  }

  validate() {
    return this.dataentry.validate();
  }

  initializeDataEntry() {
    const node = ReactDOM.findDOMNode(this);

    //var self = this, state = self.state;
    //if (!state)
      //throw new Error("missing component state. cannot define a dataentry without a schema.");
    const props = this.props;
    const schema = props.schema;
    if (!schema)
      throw new Error("missing schema definition inside the model. cannot define a dataentry without a schema.");

    window.view = this;

    // TODO: read values from a context, instead
    // add reference to the dataentry business logic to the model
    this.dataentry = new DataEntry({
      element: node,
      marker: DataEntryDom.DomDecorator,
      harvester: DataEntryDom.DomHarvester,
      binder: DataEntryDom.DomBinder,
      schema: schema
    })
  }

  componentWillUnmount() {
    // dispose of the dataentry
    this.dataentry.dispose();
  }

  render() {
    return (<div>
              {this.props.children}
            </div>)
  }
}

export default DataEntryForm