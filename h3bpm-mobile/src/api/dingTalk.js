import request from '@/utils/request'
import {DingTalkUrl, DingTalkValidate} from '@/api/options/urls'
// 钉钉登录
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
