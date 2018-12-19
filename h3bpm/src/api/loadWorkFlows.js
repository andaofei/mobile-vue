import request from '@/utils/request'
import {LoadWorkFlows} from '@/api/options/urls'
export function getWorkFlowLst(data) {
  return request({
    url: LoadWorkFlows,
    method: 'POST',
    data
  })
}
