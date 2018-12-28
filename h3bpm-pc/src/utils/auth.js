import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const AutoLogin = 'IsAutoLogin'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setAuto(token) {
  return Cookies.set(AutoLogin, token)
}

export function getAuto() {
  if (Cookies.get(AutoLogin)) {
    return JSON.parse(Cookies.get(AutoLogin))
  }
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
