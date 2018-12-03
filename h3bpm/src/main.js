// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './permission'
// import Mint from 'mint-ui'
import { Button, Form, Input, FormItem, Checkbox } from 'element-ui'
import i18n from './lang'
import './icons'
import 'normalize.css/normalize.css'
import './commom/element/element-variables.scss'
import 'mint-ui/lib/style.css'
import './commom/scss/index.scss'
// import fastclick from 'fastclick'
// Vue.use(Mint)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
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
