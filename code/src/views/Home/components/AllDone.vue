<template>
  <div class="all-done">
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
  name: 'AllDone',
  mixins: [homeCenterMixin],
  created() {
    this.setOptions({}) // 清空搜索条件
    this.getTagCounts() // 待阅数/ 待办数
    this.initDoneList()
  },
  computed: {
    itemList() {
      return this.$store.getters.itemList
    }
  },
  methods: {
    initDoneList() {
      this.loadingShow = true
      let options = {
        keyWord: '',
        finishedWorkItem: true,
        sortDirection: 'Desc',
        sortKey: 'OT_WorkItemFinished.FinishTime',
        userId: getUserInfo().id
      }
      this.$store.dispatch('getItemList', options)
        .then((res) => {
          this.loadingShow = false
        })
        .catch(() => {
          this.loadingShow = false
        })
    },
    onPullingDown() {
      // 下拉更新数据
      setTimeout(() => {
        let options = {
          finishedWorkItem: true,
          existsLength: this.itemList.length || 0,
          sortDirection: 'Desc',
          sortKey: 'ReceiveTime',
          userId: getUserInfo().id
        }
        let newOptions = Object.assign(options, this.todoOptions)
        this.$store.dispatch('getItemList', newOptions)
          .then((res) => {
            if (res.code === ERR_OK) {
              if (res.data.LoadComplete) {
                this.$refs.scroll.forceUpdate()
              }
            }
          })
      }, 2000)
    },
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      let that = this
      setTimeout(() => {
        let options = {
          IsPriority: [],
          keyWord: '',
          finishedWorkItem: true,
          loadStart: this.itemList.length || 0,
          sortDirection: 'Desc',
          sortKey: 'ReceiveTime',
          userId: getUserInfo().id
        }
        let newOptions = Object.assign(options, this.todoOptions)
        that.$store.dispatch('pullingUpWorkList', newOptions)
          .then((res) => {
            if (res.code === ERR_OK) {
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
