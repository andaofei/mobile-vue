import request from '@/utils/request'
// import qs from 'qs'
import {LoadWorkFlows, WorkFlowsDetail, WorkFlowsUrl, SelfWorkFlows, StartWorkFlows, FavoriteWorkflow} from '@/api/options/urls'
// 获取我的流程
export function getWorkFlowLst(data) {
  return request({
    url: LoadWorkFlows,
    method: 'POST',
    data
  })
}

// url
export function getWorkUrl(data) {
  return request({
    url: WorkFlowsUrl + data,
    method: 'GET'
    // params: data
  })
}

// detail
export function getWorkDetail(data) {
  return request({
    url: WorkFlowsDetail,
    method: 'GET',
    params: data
  })
}

// 我的流程
export function getSelfWorkflow(data) {
  return request({
    url: SelfWorkFlows + data,
    method: 'GET'
  })
}

// 发起流程
export function initSelfWorkflow(data) {
  return request({
    url: StartWorkFlows,
    method: 'GET',
    params: data
    // data: qs.stringify(data)
  })
}
// 设为常用流程
export function setFavoriteWorkflow(data) {
  return request({
    url: FavoriteWorkflow,
    method: 'GET',
    params: data
    // data: qs.stringify(data)
  })
}
