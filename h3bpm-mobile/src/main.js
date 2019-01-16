import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {getBaseUrl} from '@/utils/auth'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import './permission'
import './icons'
import i18n from './lang'
import 'normalize.css/normalize.css'
import '../theme/index.css'
import './commom/mintui/style.scss'
import './commom/scss/index.scss'
import fastclick from 'fastclick'
import { Button, Form, Input, FormItem, Checkbox, Badge, Radio, Tag, Breadcrumb, BreadcrumbItem, Table, TableColumn, Pagination, Loading } from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import { Actionsheet, Toast, DatetimePicker, MessageBox } from 'mint-ui'
import LoadingImg from '@/commom/default/loading.svg'
import DefaultImg from '@/commom/default/bpm.jpg'
import { ERR_OK } from '@/api/options/statusCode'
// import DingtalkEnv from 'dingtalk-javascript-env'
fastclick.attach(document.body)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Toast.name, Toast)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Badge)
Vue.use(Radio)
Vue.use(Tag)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Loading)
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: LoadingImg,
  error: DefaultImg
})

let newVue = new Vue({
  el: '#app',
  store,
  i18n,
  router,
  render: h => h(App)
})
console.log(i18n)
// 设置全局api->生产环境
const evn = process.env.NODE_ENV === 'production'
Vue.prototype.$axios = axios
Vue.prototype.getConfigJson = function() {
  Vue.prototype.$axios.get('serverConfig.json')
    .then((result) => {
      console.log(result, 'result---------')
      axios.defaults.baseURL = result.data.baseUrl
      store.commit('SET_BASE_URL', result.data.baseUrl)
    })
    .catch((res) => {
      console.log(res)
    })
}

if (evn) {
  Vue.prototype.getConfigJson()
} else {
  store.commit('SET_BASE_URL', process.env.BASE_API)
}

Vue.use({
  newVue
})
// 定义拦截器
if (getBaseUrl()) {
  axios.defaults.baseURL = getBaseUrl()
}
axios.defaults.timeout = 60000
axios.defaults.withCredentials = true
axios.defaults.headers.common['lang'] = 'zh_CN'
// request interceptor
axios.interceptors.request.use(
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
axios.interceptors.response.use(
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
export default axios
