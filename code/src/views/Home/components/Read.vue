<template>
  <div class="read">
    <!--回顶部-->
    <ToTop v-show="topTop" @backTop="backTop"></ToTop>
    <scroll ref="scroll"
            v-loading="loadingShow"
            @handleClick="handleClick"
            :data="readList"
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
  name: 'Read',
  mixins: [homeCenterMixin],
  created() {
    this.setOptions({}) // 清空搜索条件
    this.getTagCounts() // 待阅数/ 待办数
    this.initReadList()
  },
  computed: {
    // 数据列表
    readList() {
      return this.$store.getters.readList
    }
  },
  methods: {
    initReadList() {
      this.loadingShow = true
      let options = {
        keyWord: '',
        readWorkItem: true,
        sortDirection: 'Desc',
        sortKey: 'ReceiveTime',
        userId: getUserInfo().id
      }
      this.$store.dispatch('getReadItem', options)
        .then((res) => {
          this.loadingShow = false
        })
        .catch(() => {
          this.loadingShow = false
        })
    },
    onPullingDown() {
      let that = this
      // 下拉更新数据
      setTimeout(() => {
        let options = {
          keyWord: '',
          readWorkItem: true,
          existsLength: this.readList.length || 0,
          sortDirection: 'Desc',
          sortKey: 'ReceiveTime',
          userId: getUserInfo().id
        }
        let newOptions = Object.assign(options, this.todoOptions)
        that.$store.dispatch('getReadItem', newOptions)
          .then((res) => {
            if (res.code === ERR_OK) {
              if (res.data.LoadComplete) {
                this.$refs.scroll.forceUpdate()
              }
            }
          })
      }, 1500)
    },
    onPullingUp() {
      // 更新数据
      let that = this
      setTimeout(() => {
        let options = {
          keyWord: '',
          Originators: [],
          readWorkItem: true,
          loadStart: this.readList.length || 0,
          sortDirection: 'Desc',
          sortKey: 'ReceiveTime',
          userId: getUserInfo().id
        }
        let newOptions = Object.assign(options, this.todoOptions)
        console.log(newOptions, 'newOptions')
        that.$store.dispatch('pullingUpReadList', {options: newOptions, allCheck: false})
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
