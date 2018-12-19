const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  autoLogin: state => state.user.autoLogin,
  language: state => state.app.language,
  ipPath: state => state.app.ipPath,
  filterShow: state => state.app.filterShow, // 筛选
  filterTitle: state => state.app.filterTitle, // 筛选名称
  filterPath: state => state.app.filterPath, // 筛选路径
  todoOptions: state => state.dataList.todoOptions, // 待办筛选
  todoCounts: state => state.dataList.todoCounts, // 待办数量
  toReadCounts: state => state.dataList.toReadCounts, // 待阅数量
  checkedPersonList: state => state.dataList.checkedPersonList, // 已选发起人列表
  dataList: state => state.dataList.dataList, // 选人列表
  visitedViews: state => state.dataList.visitedViews, // 路由
  itemList: state => state.dataList.itemList, // 待办列表
  readList: state => state.dataList.readList, // 待阅列表
  searchUserList: state => state.dataList.searchUserList, // 搜索列表
  itemCheckList: state => state.dataList.itemCheckList, // 待阅已选
  instanceList: state => state.instance.instanceList, // 我的流程
  listCounts: state => state.instance.listCounts, // 数量
  instanceOptions: state => state.instance.instanceOptions, // 过滤条件
  appList: state => state.appCenter.appList, // 应用中心
  appTitle: state => state.appCenter.appTitle, // 应用中心child
  appCode: state => state.appCenter.appCode, // 应用中心child
  workFlowLst: state => state.WorkFlow.workFlowLst // 我的流程
}
export default getters
