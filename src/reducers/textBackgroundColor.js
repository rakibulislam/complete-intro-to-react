export default function textBackgroundColor(state = "red", action) {
    switch (action.type) {
      case "CHANGE_TEXT_BACKGROUND_COLOR":
        return action.payload;
      default:
        return state;
    }
  }