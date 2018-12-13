import Cookies from 'js-cookie'

const app = {
  state: {
    language: Cookies.get('language') || 'zh',
    ipPath: Cookies.get('sysIp') || '127.0.0.1',
    filterShow: false,
    filterTitle: ''
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    UP_DATE_IP: (state, value) => {
      state.ipPath = value
    },
    // 筛选
    SET_FILTER_SHOW: (state, payload) => {
      // console.log(payload)
      state.filterShow = payload.status
      state.filterTitle = payload.inner.title
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
