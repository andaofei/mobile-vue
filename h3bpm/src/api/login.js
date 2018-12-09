import request from '@/utils/request'

export function loginSys(username, password) {
  // const data = {
  //   username,
  //   password
  // }
  return request({
    url: '/v2/movie/in_theaters',
    method: 'get'
  })
}

export function logoutSys() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/v2/movie/in_theaters',
    method: 'get'
    // params: { token }
  })
}
