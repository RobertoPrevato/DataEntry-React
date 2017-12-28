import DataEntry from "dataentry"
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