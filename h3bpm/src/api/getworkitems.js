import request from '@/utils/request'
import {GetWorkItems, GetReadItems, GetWorkCount} from '@/api/urls'
// 待办数据
export function getWorkItem(data) {
  return request({
    url: GetWorkItems,
    method: 'POST',
    data
  })
}
// 待阅数据
export function getReadItem(data) {
  return request({
    url: GetReadItems,
    method: 'POST',
    data
  })
}
// 待阅 已办数量
export function getWorkCount() {
  return request({
    url: GetWorkCount,
    method: 'GET'
  })
}
