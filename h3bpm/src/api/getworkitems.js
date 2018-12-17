import request from '@/utils/request'
import {GetWorkItems} from '@/api/urls'
export function getWorkItem(token) {
  const data = {
    finishedWorkItem: false,
    keyWord: '',
    sortDirection: 'Desc',
    sortKey: 'ReceiveTime',
    userId: '18f923a7-5a5e-426d-94ae-a55ad1a4b239'
  }
  return request({
    url: GetWorkItems,
    method: 'post',
    params: data
  })
}
