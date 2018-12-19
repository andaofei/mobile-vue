import {getInstanceDoing} from '@/api/instance'
import {ERR_OK} from '@/api/options/statusCode'
const instance = {
  state: {
    instanceList: [], // 数据列表
    listCounts: 0, // 数据量
    instanceOptions: {} // 数据量
  },

  mutations: {
    // 设置数量和数目
    SET_INSTANCE_DATA: (state, payload) => {
      state.instanceList = payload.WorkItems
    },

    // 设置数量
    SET_INSTANCE_COUNT: (state, payload) => {
      state.listCounts = payload
    },

    // 设置过滤
    SET_FILTER_OPTIONS: (state, payload) => {
      state.instanceOptions = payload
    },

    // 上拉数据
    ADD_INSTANCE_DATA_LIST: (state, payload) => {
      // console.log(payload, 'payload')
      let newPage = []
      payload.WorkItems.forEach((item) => {
        newPage.push(item)
      })
      state.instanceList = state.instanceList.concat(newPage)
    }
  },

  actions: {
    // 初始进行中数据
    getInstanceDoing({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getInstanceDoing(payload).then(res => {
          if (res.code === ERR_OK) {
            commit('SET_INSTANCE_DATA', res.data)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 上拉数据
    pullingUpInstanceList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getInstanceDoing(payload).then(res => {
          if (res.code === ERR_OK) {
            commit('ADD_INSTANCE_DATA_LIST', res.data)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default instance
