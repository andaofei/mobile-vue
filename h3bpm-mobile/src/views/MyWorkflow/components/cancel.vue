<template>
  <div class="Cancel">
    <!--回顶部-->
    <ToTop v-show="topTop" @backTop="backTop"></ToTop>
    <scroll ref="scroll"
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
import getListMixin from '@/commom/mixins/getList'
import {getUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'
export default {
  name: 'Done',
  mixins: [getListMixin, getInstanceMixin],
  data() {
    return {}
  },
  created() {
    this.setInstanceOptions({}) // 清空搜索条件
    let options = {
      status: 5,
      userId: getUserInfo().id
    }
    this.$store.dispatch('getInstanceDoing', options)
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
      let newOptions = vue.userProfile = Object.assign(options, this.todoOptions)
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
        let newOptions = vue.userProfile = Object.assign(options, this.todoOptions)
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
  .Cancel{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
  }
</style>
