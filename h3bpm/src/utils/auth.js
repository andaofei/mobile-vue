import Cookies from 'js-cookie'

const TokenKey = 'H3BPM-Token'
const AutoLogin = 'AutoLogin'
const User = 'user'
const UserId = 'UserId'

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

export function setUserInfo(token) {
  return Cookies.set(User, token)
}

export function setUserId(data) {
  return Cookies.set(UserId, data)
}
