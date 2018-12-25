import {loginSys, logoutSys, getUserInfo} from '@/api/login'
import {getToken, setToken, getAuto, setAuto, setUserInfo, removeToken, removeUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'

const user = {
  state: {
    roles: [],
    token: getToken(),
    autoLogin: getAuto() || false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },

    SET_ROLES: (state, roles) => {
      state.roles = roles
    },

    SET_AUTO_LOGIN: (state, payload) => {
      state.autoLogin = payload
      setAuto(payload)
    }
  },

  actions: {
    // 用户名登录
    LoginSys({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginSys(username, userInfo.password).then(response => {
          const data = response.data
          // console.log(data)
          if (response.code === ERR_OK) {
            commit('SET_TOKEN', data.pageId)
            setToken(data.pageId)
            setUserInfo({name: data.User.Name, id: data.User.UnitID, userCode: data.User.Code, ParentID: data.User.ParentID})
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          console.log(response)
          const data = response.data
          if (data.subjects && data.subjects.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.subjects)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          // commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 后台 登出
    LogoutSys({commit}) {
      return new Promise((resolve, reject) => {
        logoutSys().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_AUTO_LOGIN', '')
          removeToken()
          removeUserInfo()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_AUTO_LOGIN', '')
        removeUserInfo()
        removeToken()
        resolve()
      })
    }
  }
}

export default user
