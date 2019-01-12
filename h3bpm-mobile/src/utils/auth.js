import Cookies from 'js-cookie'

const TokenKey = 'H3BPM-Token'
const AutoLogin = 'AutoLogin'
const User = 'userInfo'
const Url = 'baseUrl'
const App = 'appCenter'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAuto() {
  if (Cookies.get(AutoLogin)) {
    return JSON.parse(Cookies.get(AutoLogin))
  }
}

export function setAuto(token) {
  return Cookies.set(AutoLogin, token)
}

export function setUserInfo(data) {
  return Cookies.set(User, data)
}

export function removeUserInfo(data) {
  return Cookies.remove(User)
}

export function getUserInfo(data) {
  return Cookies.getJSON(User)
}

export function setBaseUrl(data) {
  return Cookies.set(Url, data)
}

export function getBaseUrl() {
  return Cookies.getJSON(Url)
}

export function removeBaseUrl() {
  return Cookies.remove(Url)
}

// 设置应用名称
export function setAppName(data) {
  return Cookies.set(App, data)
}

export function getAppName() {
  return Cookies.getJSON(App)
}
