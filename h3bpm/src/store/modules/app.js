import Cookies from 'js-cookie'

const app = {
  state: {
    language: Cookies.get('language') || 'zh',
    ipPath: Cookies.get('sysIp') || '127.0.0.1'
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    updateIp: (state, value) => {
      state.ipPath = value
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app