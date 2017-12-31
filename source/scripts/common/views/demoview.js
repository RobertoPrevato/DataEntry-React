/**
 * Common methods for the demo views.
 * This is just an example!!
 */

function demoView(Component) {

  const commonMethods = {
    validate() {
      const self = this;
      self.form.validate().then(function (result) {
        console.log(result);
  
        if (!result.valid)
          // do nothing: the dataentry already did everything
          return self.setState({message: "The form contains errors!"});
  
        // everything is valid
        console.info("Everything is valid!", result.values);
        self.setState({message: "Everything is valid!"});
      });
    },

    handleChange(event) {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      this.handleValueChange(name, value);
      return true;
    },

    handleItemValueChange(listName, item, name, value) {
      const state = this.state;
      const obj = state.obj;
      const list = obj[listName];
      if (!list || !(list instanceof Array)) {
        throw `${listName} is not an array inside the state.obj`
      }
      item[name] = value;
      this.setState({k: state.k + 1})
    },
  
    handleValueChange(name, value) {
      const obj = this.state.obj;
      if (name == "year" && value) {
        value = parseInt(value);
      }
      obj[name] = value;
      this.setState({obj: obj});
    }
  };

  for (let x in commonMethods)
    Component.prototype[x] = commonMethods[x];

  return Component;
}

export default demoView