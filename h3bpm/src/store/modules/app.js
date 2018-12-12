import Cookies from 'js-cookie'

const app = {
  state: {
    language: Cookies.get('language') || 'zh',
    ipPath: Cookies.get('sysIp') || '127.0.0.1',
    filterShow: false
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    UP_DATE_IP: (state, value) => {
      state.ipPath = value
    },
    SET_FILTER_SHOW: (state, payload) => {
      state.filterShow = payload
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
