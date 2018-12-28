import request from '@/utils/request'
// import Qs from 'qs'
import {LoadWorkFlows, WorkFlowsDetail, WorkFlowsUrl} from '@/api/options/urls'
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
    url: WorkFlowsUrl,
    method: 'GET',
    params: data
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
