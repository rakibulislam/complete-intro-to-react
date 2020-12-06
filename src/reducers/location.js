export default function location(state = "Seattle, WA", action) {
    
    // if (action.type === 'CHANGE_LOCATION') {
    //   return action.payload;
    // }
    // else {
    //   return state;
    // }

  switch (action.type) {
    case "CHANGE_LOCATION":
      return action.payload; // { location: 'New Location}      
    default:
      return state;
  }
}
