const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  language: state => state.app.language,
  ipPath: state => state.app.ipPath,
  filterShow: state => state.app.filterShow, // 筛选
  filterTitle: state => state.app.filterTitle, // 筛选名称
  todoCounts: state => state.dataList.todoCounts,
  toReadCounts: state => state.dataList.toReadCounts
}
export default getters
