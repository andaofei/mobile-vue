import request from '@/utils/request'
import {appList, appChildList} from '@/api/options/urls'
// 应用中心
export function getAppLst(data) {
  return request({
    url: appList,
    method: 'POST',
    data
  })
}
export function getAppChildLst(data) {
  return request({
    url: appChildList,
    method: 'GET',
    params: data
  })
}
