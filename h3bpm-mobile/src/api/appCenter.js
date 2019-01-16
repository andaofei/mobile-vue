// import request from '@/utils/request'
import request from '@/main'
import {appList, appChildList, ReportPage, ReportDetail, ReportBar, ReportSimple} from '@/api/options/urls'
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

// 明细数据
export function getReportDetail(data) {
  return request({
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    url: ReportDetail,
    method: 'POST',
    // data: qs.stringify(data)
    data: data
  })
}

// 柱状图数据
export function getReportBar(data) {
  return request({
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    url: ReportBar,
    method: 'POST',
    data: data
  })
}
// 简易看板
export function getReportSimple(data) {
  return request({
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    url: ReportSimple,
    method: 'POST',
    data: data
  })
}
