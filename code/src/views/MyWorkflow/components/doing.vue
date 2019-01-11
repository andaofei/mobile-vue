<template>
  <div class="Doing">
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
import homeCenterMixin from '@/commom/mixins/homeCenterMixin'
import getInstanceMixin from '@/commom/mixins/isntanceMixin'
import {getUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'

export default {
  name: 'Doing',

  mixins: [homeCenterMixin, getInstanceMixin],

  data() {
    return {}
  },

  created() {
    this.setInstanceOptions({}) // 清空搜索条件
    this.initDoingList()
  },

  methods: {
    onPullingDown() {
      // 更新数据
      let options = {
        returnCount: 10,
        loadStart: 0,
        status: 2,
        userId: getUserInfo().id
      }
      let newOptions = vue.userProfile = Object.assign(options, this.instanceOptions)
      console.log(newOptions)
      setTimeout(() => {
        this.$store.dispatch('getInstanceDoing', newOptions)
          .then((res) => {
            if (res.code === ERR_OK) {
              this.setCounts(res.data.TotalCount)
              if (res.data.LoadComplete) {
                this.$refs.scroll.forceUpdate()
              }
            }
          })
      }, 1500)
    },

    onPullingUp() {
      // 上拉更新数据
      setTimeout(() => {
        let options = {
          loadStart: this.instanceList.length || 0,
          status: 2,
          userId: getUserInfo().id
        }
        let newOptions = vue.userProfile = Object.assign(options, this.instanceOptions)
        this.$store.dispatch('pullingUpInstanceList', newOptions)
          .then((res) => {
            if (res.code === ERR_OK) {
              this.setCounts(res.data.TotalCount)
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
