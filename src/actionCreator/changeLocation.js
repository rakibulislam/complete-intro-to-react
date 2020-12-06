export default function changeLocation(location) {
  return { type: "CHANGE_LOCATION", payload: location }; // action.type, action.payload = { location: 'Seattle, WA'}
}
