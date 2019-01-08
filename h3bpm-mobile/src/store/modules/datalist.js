import {getWorkItem, getReadItem, getWorkCount, setBatchRead, getSelectPerson} from '@/api/getworkitems'
// import { searchList } from '@/commom/localdata/index'
import {ERR_OK} from '@/api/options/statusCode'
const dataList = {
  state: {
    todoCounts: 0,
    toReadCounts: 0,
    // 选人列表
    // personList: [],
    departList: [],
    departTitle: '', // 部门名称
    // departChildList: [], // 组织子表发起人
    sponsorList: [], // 发起人---唯一数据列表
    departChildUsList: [], // 个人用户
    departChildOgList: [], // 组织
    checkedPersonList: [],
    checkedDepartList: [], // 组组织机构已选
    itemList: [], // 待办数据列表
    readList: [], // 待阅数据列表
    itemCheckList: [],
    searchUserList: [], // 搜索列表
    visitedViews: [],
    todoOptions: []
  },

  mutations: {

    // 初始待办
    SET_DATA_LIST: (state, payload) => {
      switch (payload.tag) {
        case 'work':
          state.itemList = payload.data
          // state.itemList = { ...payload.data, isChecked: false }
          break
        case 'read':
          payload.data.map((item) => {
            item.isChecked = false
            item.checked = false
          })
          state.readList = payload.data
          // state.readList = { ...payload.data, isChecked: false }
          break
        default:
          state.itemList = []
          state.readList = []
      }
    },

    // 待办筛选配置
    ADD_OPTIONS: (state, payload) => {
      state.todoOptions = payload
    },

    // 上拉数据
    ADD_DATA_LIST: (state, payload) => {
      switch (payload.tag) {
        case 'work':
          let newPage = []
          payload.data.WorkItems.forEach((item) => {
            newPage.push(item)
          })
          state.itemList = state.itemList.concat(newPage)
          break
        case 'read':
          let newRead = []
          payload.data.CirculateItems.forEach((item) => {
            newRead.push(item)
          })
          state.readList = state.readList.concat(newRead)
          break
        case 'batch':
          let newBatch = []
          payload.data.CirculateItems.map((item) => {
            item.isChecked = true
            item.checked = false
            newBatch.push(item)
          })
          state.readList = state.readList.concat(newBatch)
          break
        case 'readCheck':
          let newCheckRead = []
          payload.data.CirculateItems.map((item) => {
            // console.log(item)
            item.isChecked = true
            item.checked = true
            newCheckRead.push(item)
          })
          state.readList = state.readList.concat(newCheckRead)
          state.itemCheckList = state.itemCheckList.concat(newCheckRead)
          break
        default:
          state.itemList = []
          state.readList = []
      }
    },

    // 待阅模块 ------------------------------------------------------------------

    // 改变待阅全选状态
    CHANGE_DATA_LIST_CHECKED: (state, payload) => {
      state.readList = []
      payload.map((item, index) => {
        item.isChecked = true
        state.readList.push(item)
      })
      // state.itemList = payload
    },

    // 取消待阅全选状态
    CHANGE_DATA_LIST_UNCHEKED: (state, payload) => {
      state.readList = []
      payload.map((item, index) => {
        item.isChecked = false
        item.checked = false
        state.readList.push(item)
      })
      state.itemCheckList = []
    },

    // 取消/选中待阅单选状态
    SET_CHECKED_LIST: (state, payload) => {
      const list = state.readList
      let check = list[payload.index].checked
      const status = !check
      list[payload.index].checked = status
      // console.log(payload, '取消/选中待阅单选状态')
      if (payload.item.checked) {
        state.itemCheckList.push(payload.item)
      } else {
        state.itemCheckList.splice(state.itemCheckList.indexOf(payload.item), 1)
      }
      state.readList = []
      state.readList = list
    },

    //  全选待阅
    SET_ALL_CHECKED_TOREAD: (state, payload) => {
      console.log(payload, 'SET_ALL_CHECKED_TOREAD')
      // state.obj = { ...state.obj, newProp: 123 }
      if (!payload.state) {
        state.itemCheckList = []
        state.readList = []
        payload.data.map((item) => {
          item.checked = true
          state.itemCheckList.push(item)
          state.readList.push(item)
        })
        // state.itemCheckList = payload.data  直接塞进去 会 和另一个state联动所以要单个push
      } else {
        state.readList = []
        payload.data.map((item) => {
          item.checked = false
          state.readList.push(item)
        })
        state.itemCheckList = []
      }
      // state.itemList = payload.data
    },

    // 清空已选待阅
    CLEAR_ALL_CHECKED: (state, payload) => {
      state.itemCheckList = payload
    },

    // 待办数
    SET_TODO_COUNTS: (state, payload) => {
      state.todoCounts = payload
    },

    // 待阅数
    SET_TO_READ_COUNTS: (state, payload) => {
      state.toReadCounts = payload
    },

    // 初始待阅数
    INIT_TO_READ_COUNTS: (state, payload) => {
      state.toReadCounts = payload
    },

    // 发起人模块 -----------------------------------------------

    // 添加面包屑路由
    ADD_VISITED_VIEW: (state, view) => {
      console.log(view, 'view')
      state.visitedViews = []
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },

    // 发起人本部门列表
    SET_PERSON_LIST: (state, payload) => {
      payload.map((item) => {
        item.checked = false
      })
      state.sponsorList = payload
      // console.log(state.sponsorList)
      // console.log(state.checkedPersonList, '已选')
      state.sponsorList = Object.assign(state.sponsorList, state.checkedPersonList)
      state.searchUserList = Object.assign(state.sponsorList, state.checkedPersonList) // 搜索列表
      // console.log(newOptions, 'newOptions')
    },

    // 发起人组织列表
    SET_DEPART_LIST: (state, payload) => {
      console.log(payload, '发起人部门列表')
      state.departTitle = payload[0].Text // 组织名称
      state.departList = payload[0].children // 组织列表
      state.sponsorList = [] // 用户为空
      state.searchUserList = payload[0].children
    },

    // 发起人子部门列表
    SET_DEPART_CHILD_LIST: (state, payload) => {
      payload.map((item) => {
        if (item.ExtendObject.UnitType === 'U') {
          item.checked = false
          // arr.push(item)
        }
      })
      state.sponsorList = payload
      // state.sponsorList = Object.assign(state.sponsorList, state.checkedPersonList)
      // state.searchUserList = Object.assign(state.sponsorList, state.checkedPersonList) // 搜索列表
    },

    // 选中/取消 本部门发起人
    SET_CHECKED_PERSONS: (state, payload) => {
      // console.log(payload, 'SET_CHECKED_PERSONS')
      let check = state.sponsorList[payload.index].checked
      const status = !check
      state.sponsorList[payload.index].checked = status
      if (payload.data.checked) {
        state.checkedPersonList.push(payload.data)
      } else {
        // state.checkedPersonList.splice(payload.index, 1)
        state.checkedPersonList.splice(state.checkedPersonList.indexOf(payload.data), 1)
      }
    },
    // 选中/取消 组织列表发起人
    SET_CHECKED_DEPART: (state, payload) => {
      // console.log(payload, 'SET_CHECKED_PERSONS')
      let check = state.sponsorList[payload.index].checked
      const status = !check
      state.sponsorList[payload.index].checked = status
      if (payload.data.checked) {
        state.checkedDepartList.push(payload.data)
      } else {
        state.checkedDepartList.splice(state.checkedDepartList.indexOf(payload.data), 1)
      }
    },

    // 清空已选发起人
    SET_EMPTY_PERSONS: (state, payload) => {
      state.checkedPersonList = payload
    },

    // 批量删除
    SET_BATCH_READ: (state, payload) => {
      // state.readList[] // 清空已选
      state.itemCheckList.forEach((item) => {
        console.log(state.readList[item])
      })
    },

    // 删除本部门已选发起人
    SET_DELETE_PERSONS: (state, payload) => {
      // console.log(payload)
      state.sponsorList.map((item, index) => {
        // console.log(item, index)
        if (item.ObjectID === payload.data.ObjectID) {
          item.checked = false
        }
      })
      state.checkedPersonList.splice(state.checkedPersonList.indexOf(payload.data), 1)
    },

    // 删除组织机构已选发起人
    SET_DELETE_DEPART: (state, payload) => {
      state.sponsorList.map((item, index) => {
        if (item.ObjectID === payload.data.ObjectID) {
          item.checked = false
        }
      })
      // state.checkedDepartList.splice(state.checkedDepartList.indexOf(payload.data), 1)
      state.checkedDepartList.splice(payload.index, 1)
    },

    // 全选 本部门发起人
    SET_ALL_CHECKED_PERSONS: (state, payload) => {
      // console.log(payload, 'payload')
      if (!payload.state) {
        state.checkedPersonList = []
        payload.data.map((item) => {
          item.checked = true
          state.checkedPersonList.push(item)
        })
      } else {
        payload.data.forEach((item) => {
          item.checked = false
        })
        state.checkedPersonList = []
      }
    },

    // 全选 组织发起人
    SET_ALL_CHECKED_DEPART: (state, payload) => {
      if (!payload.state) {
        state.checkedDepartList = []
        payload.data.map((item) => {
          item.checked = true
          state.checkedDepartList.push(item)
        })
      } else {
        payload.data.forEach((item) => {
          item.checked = false
        })
        state.checkedDepartList = []
      }
    },

    // 搜索发起人列表
    SET_SEARCH_LIST: (state, payload) => {
      // console.log(state.checkedPersonList, 'checkedPersonList')
      state.checkedPersonList.forEach((item, index) => {
        console.log(item)
      })
      payload.map((item, index) => {
        console.log(item)
      })
      // state.searchUserList = payload
    },
    // 发起人搜索列表
    SET_SEARCH_PERSON_LIST: (state, payload) => {
      state.sponsorList = payload
    },
    // 组织机构搜索列表
    SET_SEARCH_DEPART_LIST: (state, payload) => {
      console.log(payload)
      state.departList = []
      state.departList = payload
    }
  },

  actions: {
    // 初始待办/已办列表数据 ----------------------
    getItemList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getWorkItem(payload).then(res => {
          // console.log(res, '初始待办/已办')
          if (res.code === ERR_OK) {
            commit('SET_DATA_LIST', {
              data: res.data.WorkItems,
              tag: 'work'
            })
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 上拉待办数据
    pullingUpWorkList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getWorkItem(payload).then(res => {
          console.log(res, '上拉数据')
          if (res.code === ERR_OK) {
            commit('ADD_DATA_LIST', {
              data: res.data,
              tag: 'work'
            })
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 初始待阅/已阅列表数据 -----------------------------
    getReadItem({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getReadItem(payload).then(res => {
          console.log(res, '初始待阅')
          if (res.code === ERR_OK) {
            commit('SET_DATA_LIST', {
              data: res.data.CirculateItems,
              tag: 'read'
            })
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 上拉待阅数据
    pullingUpReadList({ commit }, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        getReadItem(payload.options).then(res => {
          console.log(res, '上拉待阅数据')
          if (res.code === ERR_OK) {
            if (payload.batch && !payload.allChecked) { // 批量
              commit('ADD_DATA_LIST', {
                data: res.data,
                tag: 'batch'
              })
            } else if (payload.batch && payload.allChecked) {
              commit('ADD_DATA_LIST', {
                data: res.data,
                tag: 'readCheck'
              })
            } else {
              commit('ADD_DATA_LIST', {
                data: res.data,
                tag: 'read'
              })
            }
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 批量阅读
    BatchReading({ commit }, payload) {
      console.log(payload)
      // commit('SET_BATCH_READ', payload)
      return new Promise((resolve, reject) => {
        setBatchRead(payload).then(res => {
          if (res.code === ERR_OK) {
            const data = res.data
            commit('SET_BATCH_READ', data)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取搜索列表
    getSearchList({ commit }, payload) {
      commit('SET_SEARCH_LIST', payload)
    },

    // 待办数量/ 待阅数量
    setTagCounts({ commit }, count) {
      return new Promise((resolve, reject) => {
        getWorkCount().then(res => {
          if (res.code === ERR_OK) {
            const data = res.data
            // commit('SET_TODO_COUNTS', data.UnfinishedWorkItemCount)
            commit('INIT_TO_READ_COUNTS', data.UnreadWorkItemCount)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    setTodoCounts({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getWorkItem(payload).then(res => {
          console.log(res, '初始待办数量')
          if (res.code === ERR_OK) {
            // console.log(res)
            commit('SET_TODO_COUNTS', res.data.totalCount)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 添加面包屑路由
    addView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
    },

    // 发起人列表 ------------------------
    getSelectPersonList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getSelectPerson(payload).then(res => {
          if (res.code === ERR_OK) {
            // console.log(res)
            commit('SET_PERSON_LIST', res.data)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 发起人部门列表
    getSelectDepartList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getSelectPerson(payload).then(res => {
          if (res.code === ERR_OK) {
            commit('SET_DEPART_LIST', res.data)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 发起人子部门部门列表
    getSelectDepartChildList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getSelectPerson(payload).then(res => {
          if (res.code === ERR_OK) {
            console.log(res, '发起人子部门部门列表')
            commit('SET_DEPART_CHILD_LIST', res.data)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default dataList
