import {getAppLst, getAppChildLst} from '@/api/appCenter'
import {ERR_OK} from '@/api/options/statusCode'
const appCenter = {
  state: {
    appList: [], // 数据列表
    appChildList: [] // 数据列表
  },

  mutations: {
    SET_APP_LIST: (state, payload) => {
      state.appList = payload.AllApps
    },
    // 应用中心child
    SET_APP_CHILD_LIST: (state, payload) => {
      state.appChildList = payload
    }
  },

  actions: {
    // 应用中心
    getAppList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getAppLst(payload).then(res => {
          if (res.code === ERR_OK) {
            console.log(res)
            commit('SET_APP_LIST', res.data)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 应用中心child
    getAppChildLst({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getAppChildLst(payload).then(res => {
          if (res.code === ERR_OK) {
            console.log(res)
            commit('SET_APP_CHILD_LIST', res.data)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default appCenter
