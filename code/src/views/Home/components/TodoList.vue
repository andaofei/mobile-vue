<template>
  <div class="todo-List">
    <ToTop v-show="topTop" @backTop="backTop"></ToTop>
    <scroll ref="scroll"
            v-loading="loadingShow"
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
import homeCenterMixin from '@/commom/mixins/homeCenterMixin'
import {getUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'
export default {
  name: 'TodoList',
  mixins: [homeCenterMixin],
  created() {
    this.setOptions({}) // 清空搜索条件
    this.getTagCounts() // 待阅数/ 待办数
    this.initToDoList()
  },
  computed: {
    itemList() {
      return this.$store.getters.itemList
    }
  },
  methods: {
    initToDoList() {
      let options = {
        keyWord: '',
        finishedWorkItem: false,
        sortDirection: 'Desc',
        sortKey: 'ReceiveTime',
        userId: getUserInfo().id
      }
      this.loadingShow = true
      this.$store.dispatch('getItemList', options)
        .then((res) => {
          this.loadingShow = false
        })
        .catch((error) => {
          this.loadingShow = false
          console.error(error)
        })
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
  @import "../commom/scss/index.scss";
</style>
