import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import user from './modules/user'
import app from './modules/app'
import dataList from './modules/datalist'
import getters from './getters'
import process from 'process'
const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)
const store = new Vuex.Store({
  plugins: debug ? [createLogger()] : [],
  modules: {
    user,
    app,
    dataList
  },
  getters
})

export default store
