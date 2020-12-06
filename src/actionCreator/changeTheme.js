export default function changeTheme(theme) {
  return { type: "CHANGE_THEME", payload: theme }; // action.type == 'CHANGE_THEME', return action.payload
}
