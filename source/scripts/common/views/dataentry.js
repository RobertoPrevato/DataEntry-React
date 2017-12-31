import React from "react"
import ReactDOM from "react-dom"
import I from "ilocale";
import DataEntry from "dataentry"
import DataEntryDom from "dataentry/dom"


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
    const props = this.props;
    const schema = props.schema;
    if (!schema)
      throw new Error("missing `schema` property, cannot define a dataentry without a schema.");

    const onFormat = props.onFormat;
    if (!onFormat)
      console.warn("missing `onFormat` property, an handler is necessary to propagate formatting to state!");
    else if (typeof onFormat != "function")
      throw new Error("onFormat property must be a function");

    // add reference to the dataentry business logic to the model
    const dataentry = new DataEntry({
      element: node,
      marker: DataEntryDom.DomDecorator,
      harvester: DataEntryDom.DomHarvester,
      binder: DataEntryDom.DomBinder,
      schema: schema
    })

    if (onFormat) {
      // when a value is formatted,
      dataentry.on("format", function (field, name, value) {
        console.log(field, name, value)
        switch (onFormat.length) {
          case 2:
            onFormat(name, value)
          break;
          case 3:
            onFormat(field, name, value)
          break;
          default:
            throw new Error("onFormat function must handle two or three named parameters");
        }
      })
    }

    this.dataentry = dataentry;
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