import request from '@/main'
// import request from '@/utils/request'
import {doingInstance} from '@/api/options/urls'
// 进行中
export function getInstanceDoing(data) {
  return request({
    url: doingInstance,
    method: 'POST',
    data
  })
}
