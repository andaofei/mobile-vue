import axios from 'axios'
import { Toast, MessageBox } from 'mint-ui'
import { ERR_OK } from '@/api/options/statusCode'
import store from '@/store'
// create an axios instance
import {getBaseUrl, setBaseUrl} from '@/utils/auth'
// Fixed: 第一次加载时无法获取设置的API地址 导致无法请求 需要刷新
const evn = process.env.NODE_ENV === 'production'

if (evn) {
  axios.get('serverConfig.json').then((result) => {
    if (result.status === ERR_OK) {
      setBaseUrl(result.data.baseUrl)
    }
  }).catch(() => {
  })
} else {
  setBaseUrl(process.env.BASE_API)
}

console.log(getBaseUrl(), 'getBaseUrl')
const service = axios.create({
  withCredentials: true,
  baseURL: getBaseUrl(), // api 的 base_url
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // console.log(config, 'interceptor')
    // Do something before request is sent
    // if (store.getters.token) {
    //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    //   config.headers['X-Token'] = getToken()
    // }
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
    if (res.code !== 200) {
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
