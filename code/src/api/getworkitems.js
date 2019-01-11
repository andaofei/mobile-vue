import request from '@/utils/request'
import {GetWorkItems, GetReadItems, GetWorkCount, BatchRead, LoadOrgTreeNodes} from '@/api/options/urls'
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

// 批量阅读
export function setBatchRead(data) {
  return request({
    url: BatchRead,
    method: 'POST',
    data
  })
}

// 我的流程
export function getSelectPerson(data) {
  return request({
    url: LoadOrgTreeNodes,
    method: 'GET',
    params: data
  })
}
