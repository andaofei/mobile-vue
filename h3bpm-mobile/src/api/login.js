import request from '@/utils/request'
import md5 from 'blueimp-md5'
import {LoginUrl, LoginOutUrl} from '@/api/options/urls'
export function loginSys(username, password) {
  const data = {
    isMobile: '1',
    userCode: username,
    password: md5(password)
  }
  return request({
    // url: '/v2/movie/in_theaters',
    url: LoginUrl,
    method: 'POST',
    data
  })
}

export function logoutSys() {
  return request({
    url: LoginOutUrl,
    method: 'GET'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/v2/movie/in_theaters',
    method: 'GET'
    // params: { token }
  })
}
