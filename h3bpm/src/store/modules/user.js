// import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken()
  },

  mutations: {
  },

  actions: {
    // 用户名登录
  }
}

export default user
