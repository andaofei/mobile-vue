<template>
  <div class="todo-List">
    <!--回顶部-->
    <ToTop v-show="topTop" @backTop="backTop"></ToTop>
    <scroll ref="scroll"
            @handleClick="handleClick"
            :data="itemList"
            :probe-type="probeType"
            :listenScroll="listenScroll"
            :scrollbar="scrollbarObj"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            :startY="parseInt(startY)"
            @scroll="scroll"
            @pullingDown="onPullingDown"
            @pullingUp="onPullingUp">
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import getListMixin from '@/commom/mixins/getList'
import {getUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'
import {getWorkItem} from '@/api/getworkitems'
import {mapMutations} from 'vuex'
export default {
  name: 'TodoList',
  mixins: [getListMixin],
  data() {
    return {}
  },
  created() {
    this.setOptions({}) // 清空搜索条件
    let options = {
      keyWord: '',
      finishedWorkItem: false,
      sortDirection: 'Desc',
      sortKey: 'ReceiveTime',
      userId: getUserInfo().id
    }
    this.$store.dispatch('setTagCounts') // 待阅数
    this.$store.dispatch('getItemList', options)
      .then((res) => {
        if (res.code === ERR_OK) {
          this.setToDoCounts(res.data.TotalCount)
        }
      })
    this.getList(options)
  },
  computed: {
    itemList() {
      return this.$store.getters.itemList
    },
    todoOptions() {
      return this.$store.getters.todoOptions
    }
  },
  methods: {
    ...mapMutations({
      setToDoCounts: 'SET_TODO_COUNTS',
      setOptions: 'ADD_OPTIONS'
    }),
    getList(options) {
      return new Promise((resolve, reject) => {
        getWorkItem(options).then(res => {
          if (res.code === ERR_OK) {
            console.log(res, '初始待办/已办')
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleClick(item) {
      console.log(item)
    },
    onPullingDown() {
      // 下拉更新数据
      // console.log('pulling down and refresh data')
      setTimeout(() => {
        let options = {
          finishedWorkItem: false,
          existsLength: this.itemList.length || 0,
          sortDirection: 'Desc',
          sortKey: 'ReceiveTime',
          userId: getUserInfo().id
        }
        // console.log(options, 'options')
        let newOptions = Object.assign(options, this.todoOptions)
        // console.log(newOptions, 'newOptions')
        this.$store.dispatch('getItemList', newOptions)
          .then((res) => {
            if (res.code === ERR_OK) {
              this.setToDoCounts(res.data.TotalCount)
              if (res.data.LoadComplete) {
                this.$refs.scroll.forceUpdate()
              }
            }
          })
      }, 1500)
    },
    onPullingUp() {
      // 上拉更新数据
      // console.log('pulling up and load data')
      let that = this
      setTimeout(() => {
        let options = {
          finishedWorkItem: false,
          loadStart: this.itemList.length || 0,
          sortDirection: 'Desc',
          sortKey: 'ReceiveTime',
          userId: getUserInfo().id
        }
        // console.log(options, 'options')
        let newOptions = Object.assign(options, this.todoOptions)
        // console.log(newOptions, 'newOptions')
        that.$store.dispatch('pullingUpWorkList', newOptions)
          .then((res) => {
            if (res.code === ERR_OK) {
              this.setToDoCounts(res.data.TotalCount)
              if (res.data.LoadComplete) {
                this.$refs.scroll.forceUpdate()
              }
            }
          })
      }, 1500)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .todo-List{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
  }
</style>
