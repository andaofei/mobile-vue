<template>
  <div class="Cancel">
    <!--回顶部-->
    <ToTop v-show="topTop" @backTop="backTop"></ToTop>
    <scroll ref="scroll"
            v-loading="loadingShow"
            @handleClick="handleClick"
            :data="instanceList"
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
import vue from 'vue'
import getInstanceMixin from '@/commom/mixins/isntanceMixin'
import homeCenterMixin from '@/commom/mixins/homeCenterMixin'
import {getUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'
export default {
  name: 'Done',
  mixins: [homeCenterMixin, getInstanceMixin],
  data() {
    return {}
  },
  created() {
    this.setInstanceOptions({}) // 清空搜索条件
    this.initCancelList()
    this.getDoingCounts()
  },
  methods: {
    onPullingDown() {
      // 更新数据
      let options = {
        returnCount: 10,
        loadStart: 0,
        status: 5,
        userId: getUserInfo().id
      }
      // let newOptions = Object.assign(options, this.instanceOptions)
      let newOptions = vue.userProfile = Object.assign(options, this.instanceOptions)
      setTimeout(() => {
        this.$store.dispatch('getInstanceDoing', newOptions)
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
      // 上拉更新数据
      setTimeout(() => {
        let options = {
          loadStart: this.instanceList.length || 0,
          status: 5,
          userId: getUserInfo().id
        }
        // let newOptions = Object.assign(options, this.instanceOptions)
        let newOptions = vue.userProfile = Object.assign(options, this.instanceOptions)
        this.$store.dispatch('pullingUpInstanceList', newOptions)
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
@import "../commom/scss/index";
</style>
