import axios from 'axios'
import { Toast, MessageBox } from 'mint-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 6000 // request timeout
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
          title: '提示',
          message: '登录态失效,即将退出',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
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
      message: '网络错误',
      iconClass: 'icon el-icon-error'
    })
    setTimeout(() => {
      instance.close()
    }, 2000)
    return Promise.reject(error)
  }
)

export default service
