import request from '@/utils/request'
import {appList, appChildList, ReportPage, ReportDetail} from '@/api/options/urls'
import qs from 'qs'
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

// 表格参数
export function getReportPage(data) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: ReportPage,
    method: 'POST',
    data: qs.stringify(data)
  })
}
// 表格数据
export function getReportDetail(data) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: ReportDetail,
    method: 'POST',
    data: qs.stringify(data)
  })
}
