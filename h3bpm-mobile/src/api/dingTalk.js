import request from '@/main'
import {DingTalkUrl, DingTalkValidate} from '@/api/options/urls'
// import request from '@/utils/request'
// 钉钉签名
export function getDingTalkInfo(data) {
  return request({
    url: DingTalkUrl,
    method: 'GET',
    params: {url: data}
  })
}
//  权限验证
export function getDingTalkValidate(data) {
  return request({
    url: DingTalkValidate,
    method: 'GET',
    params: data
  })
}
