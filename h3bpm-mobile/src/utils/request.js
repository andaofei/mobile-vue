import axios from 'axios'
import { Toast, MessageBox } from 'mint-ui'
import { ERR_OK } from '@/api/options/statusCode'
import store from '../store/index'
// create an axios instance
// toFix: 第一次加载时无法获取设置的API地址 导致无法请求 需要刷新
console.log(store, 'store')
const service = axios.create({
  withCredentials: true,
  baseURL: '', // api 的 base_url
  timeout: 8000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },

  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  response => {
    const res = response.data
    if (res.code !== ERR_OK) {
      let instance = Toast({
        message: res.errorMsg,
        iconClass: 'icon el-icon-error'
      })
      setTimeout(() => {
        instance.close()
      }, 2000)
      if (res.code === 401) {
        MessageBox.confirm('', {
          title: 'Note',
          message: 'Login status is invalid, will exit',
          confirmButtonText: 'YES',
          cancelButtonText: 'NO',
          showCancelButton: false,
          closeOnClickModal: false
        })
          .then(action => {
            store.dispatch('LogoutSys').then(() => {
              location.reload()
            })
          })
          .catch(() => {
          })
        return
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log(error) // for debug
    let instance = Toast({
      message: 'Network Error',
      iconClass: 'icon el-icon-error'
    })
    setTimeout(() => {
      instance.close()
    }, 2000)
    return Promise.reject(error)
  }
)
export default service
