import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
// import axios from 'axios'
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
  loading: require('../static/default/loading.svg'), // 加载的图片
  error: require('../static/default/bpm.jpg')
})
// Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  router,
  render: h => h(App)
})
