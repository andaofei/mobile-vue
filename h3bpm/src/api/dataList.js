import request from '@/utils/request'
export function getItemList(token) {
  return request({
    url: 'static/data/index.js',
    method: 'get'
  })
}
