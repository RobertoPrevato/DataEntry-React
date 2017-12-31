import DataEntry from "dataentry"

const Validator = DataEntry.Validator;

var getError = Validator.getError;

// add email validation rule:
Validator.Rules.email = {
  fn: function (field, value, forced) {
    if (!value) return true;
    var limit = 40;
    var rx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value.match(rx) || value.length > limit) {
      return getError("invalidEmail", arguments);
    }
    return true;
  }
};

Validator.Rules.phone = {
  fn: function (field, value) {
    if (!value) return true;
    if (!/^\s*\+?[0-9\s]+$/.test(value))
      return getError("invalidPhone", arguments);
    return true;
  }
};