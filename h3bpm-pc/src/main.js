import Vue from 'vue'

import Cookies from 'js-cookie'
import VueLazyload from 'vue-lazyload'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import '../theme/index.css'
// import './commom/element-color/element-variables.scss' // self element-ui
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters

Vue.use(VueLazyload, {
  loading: require('../static/default/loading.svg'), // 加载的图片
  error: require('../static/default/bpm.jpg')
})

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
