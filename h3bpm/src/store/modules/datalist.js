const dataList = {
  state: {
    todoCounts: 0,
    toReadCounts: 0
  },
  mutations: {
    SET_TODO_COUNTS: (state, payload) => {
      state.todoCounts = payload
    },
    SET_TO_READ_COUNTS: (state, payload) => {
      state.toReadCounts = payload
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
