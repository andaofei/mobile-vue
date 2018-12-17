const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  autoLogin: state => state.user.autoLogin,
  language: state => state.app.language,
  ipPath: state => state.app.ipPath,
  filterShow: state => state.app.filterShow, // 筛选
  filterTitle: state => state.app.filterTitle, // 筛选名称
  filterPath: state => state.app.filterPath, // 筛选路径
  todoCounts: state => state.dataList.todoCounts, // 待办数量
  toReadCounts: state => state.dataList.toReadCounts, // 待阅数量
  checkedPersonList: state => state.dataList.checkedPersonList, // 已选发起人列表
  dataList: state => state.dataList.dataList, // 选人列表
  visitedViews: state => state.dataList.visitedViews, // 路由
  itemList: state => state.dataList.itemList, // 待阅列表
  searchUserList: state => state.dataList.searchUserList, // 搜索列表
  itemCheckList: state => state.dataList.itemCheckList // 待阅已选
}
export default getters
