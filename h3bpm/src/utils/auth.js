import Cookies from 'js-cookie'

const TokenKey = 'H3BPM-Token'
const AutoLogin = 'AutoLogin'
const User = 'userInfo'

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
