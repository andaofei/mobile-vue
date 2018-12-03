const getters = {
  token: state => state.user.token,
  language: state => state.app.language,
  ipPath: state => state.app.ipPath
}
export default getters
