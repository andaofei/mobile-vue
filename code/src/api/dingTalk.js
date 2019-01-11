import request from '@/utils/request'
import {DingTalkUrl} from '@/api/options/urls'
// 钉钉登录
export function getDingTalkInfo(data) {
  return request({
    url: DingTalkUrl,
    method: 'GET',
    params: data
  })
}
