<template>
  <div class="all-done">
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
// import {mapMutations} from 'vuex'
export default {
  name: 'AllDone',
  mixins: [getListMixin],
  data() {
    return {}
  },
  created() {
    this.setOptions({}) // 清空搜索条件
    let options = {
      keyWord: '',
      finishedWorkItem: true,
      sortDirection: 'Desc',
      sortKey: 'OT_WorkItemFinished.FinishTime',
      userId: getUserInfo().id
    }
    this.$store.dispatch('getItemList', options)
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
  .all-done{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
  }
</style>
