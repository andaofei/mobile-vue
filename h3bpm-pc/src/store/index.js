import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
// import createLogger from 'vuex/dist/logger'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
// import process from 'process'
// const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: debug ? [createLogger()] : [],
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  getters
})

export default store
