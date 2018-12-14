const dataList = {
  state: {
    todoCounts: 0,
    toReadCounts: 0,
    checkedPersonList: []
  },
  mutations: {
    // 待办数
    SET_TODO_COUNTS: (state, payload) => {
      state.todoCounts = payload
    },
    // 待阅数
    SET_TO_READ_COUNTS: (state, payload) => {
      state.toReadCounts = payload
    },
    // 已选发起人
    SET_CHECKED_PERSONS: (state, payload) => {
      console.log(payload)
      let arr = []
      payload.forEach((item) => {
        if (item.checked) arr.push(item)
      })
      state.checkedPersonList = arr
    }
  },
  actions: {
    setTodoCounts({ commit }, count) {
      commit('SET_TODO_COUNTS', count)
    },
    setToReadCounts({ commit }, count) {
      commit('SET_TO_READ_COUNTS', count)
    }
  }
}

export default dataList
