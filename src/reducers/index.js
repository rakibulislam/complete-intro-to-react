import { combineReducers } from "redux";
import location from "./location";
import theme from "./theme";
import textBackgroundColor from "./textBackgroundColor";

export default combineReducers({
  location: location,
  theme: theme,
  textBackgroundColor: textBackgroundColor
});
