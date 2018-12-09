const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  language: state => state.app.language,
  ipPath: state => state.app.ipPath
}
export default getters
