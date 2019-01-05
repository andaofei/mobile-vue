import {getWorkFlowLst} from '@/api/loadWorkFlows'
import {ERR_OK} from '@/api/options/statusCode'
const WorkFlow = {
  state: {
    workFlowLst: [], // 数据列表
    searchList: [] // 搜索列表
  },
  mutations: {
    // 初始列表
    SET_WORK_FLOW_LIST: (state, payload) => {
      state.workFlowLst = []
      state.searchList = []
      payload.Workflows.forEach((item) => {
        if (item.DisplayName === 'FrequentFlow') {
        } else {
          state.workFlowLst.push(item)
          item.Workflows.forEach((inner) => {
            state.searchList.push(inner)
          })
        }
      })
    },
    SER_SEARCH_LIST: (state, payload) => {
      state.workFlowLst = payload
    }
  },
  actions: {
    // 获取我的流程
    getWorkFlowLst({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getWorkFlowLst(payload).then(res => {
          if (res.code === ERR_OK) {
            commit('SET_WORK_FLOW_LIST', res.data)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    setWorkFlowLst({ commit }, payload) {
      commit('SER_SEARCH_LIST', payload)
    }
  }
}
export default WorkFlow
