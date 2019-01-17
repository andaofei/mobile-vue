import Cookies from 'js-cookie'
import store from 'store'

const app = {
  state: {
    language: store.get('H3.Language') || 'zh_cn',
    ipPath: Cookies.get('sysIp') || '127.0.0.1',
    filterShow: false,
    filterTitle: '',
    filterPath: ''
  },

  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
      // store.set('H3.Language', language)
      window.localStorage.setItem('H3.Language', language)
    },
    UP_DATE_IP: (state, value) => {
      state.ipPath = value
    },
    // 筛选
    SET_FILTER_SHOW: (state, payload) => {
      console.log(payload, '筛选路径')
      state.filterShow = payload.status
      state.filterTitle = payload.inner.title
      state.filterPath = payload.path
    }
  },

  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
