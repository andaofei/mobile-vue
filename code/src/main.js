import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {setBaseUrl} from '@/utils/auth'
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
import { Actionsheet, Toast, DatetimePicker } from 'mint-ui'
import LoadingImg from '@/commom/default/loading.svg'
import DefaultImg from '@/commom/default/bpm.jpg'
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

// 设置全局api->生产环境
const evn = process.env.NODE_ENV === 'production'

Vue.prototype.$axios = axios
Vue.prototype.getConfigJson = function() {
  Vue.prototype.$axios.get('serverConfig.json').then((result) => {
    if (result.status === 200) {
      // Vue.prototype.$baseUrl = result.data.baseUrl
      setBaseUrl(result.data.baseUrl)
    } else {
      // Vue.prototype.$baseUrl = process.env.BASE_API
      setBaseUrl(result.data.baseUrl)
    }
  }).catch(() => {
    // Vue.prototype.$baseUrl = process.env.BASE_API
    setBaseUrl(process.env.BASE_API)
  })
}
if (evn) {
  Vue.prototype.getConfigJson()// 调用声明的全局方法
} else {
  console.log(process.env.BASE_API)
  // Vue.prototype.$baseUrl = process.env.BASE_API
  setBaseUrl(process.env.BASE_API)
}
/* eslint-disable no-new */
Vue.use({
  newVue
})
// new Vue({
//   el: '#app',
//   store,
//   i18n,
//   router,
//   render: h => h(App)
// })
