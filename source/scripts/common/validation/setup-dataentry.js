import DataEntry from "dataentry"
import ContactRules from "./rules/contacts"
import I from "ilocale"


function setupDataEntry() {
  DataEntry.configure({
    localizer: {
      t(key, options) {
        return I.t("errors." + key, options instanceof Array ? options[0] : options);
      },
      lookup(key) {
        return I.lookup("errors." + key);
      }
    }
  })
}

export { setupDataEntry }