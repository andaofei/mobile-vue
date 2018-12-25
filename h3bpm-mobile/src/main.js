// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './permission'
import { Button, Form, Input, FormItem, Checkbox, Badge, Radio, Tag, Breadcrumb, BreadcrumbItem } from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import i18n from './lang'
import './icons'
import 'normalize.css/normalize.css'
// import './commom/element/element-variables.scss'
import '../theme/index.css'
import './commom/mintui/style.scss'
// import 'mint-ui/lib/style.css'
import './commom/scss/index.scss'
import fastclick from 'fastclick'
import { Actionsheet, Toast, DatetimePicker } from 'mint-ui'
fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('../static/default/loading.svg'), // 加载的图片
  error: require('../static/default/bpm.jpg')
})
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
Vue.config.productionTip = false
// fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  router,
  render: h => h(App)
})
