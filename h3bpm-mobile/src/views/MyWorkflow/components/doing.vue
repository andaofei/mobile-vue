<template>
  <div class="Doing">
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
import getListMixin from '@/commom/mixins/getList'
import getInstanceMixin from '@/commom/mixins/isntanceMixin'
import {getUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'
export default {
  name: 'Doing',

  mixins: [getListMixin, getInstanceMixin],

  data() {
    return {}
  },

  created() {
    this.setInstanceOptions({}) // 清空搜索条件
    let options = {
      status: 2,
      userId: getUserInfo().id
    }
    this.loadingShow = true
    this.$store.dispatch('getInstanceDoing', options)
      .then((res) => {
        this.loadingShow = false
        if (res.code === ERR_OK) {
          this.setCounts(res.data.TotalCount)
        }
      })
      .catch(() => {
        this.loadingShow = false
      })
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
      // let newOptions = Object.assign(options, this.instanceOptions)
      let newOptions = vue.userProfile = Object.assign(options, this.todoOptions)
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
        // let newOptions = Object.assign(options, this.instanceOptions)
        let newOptions = vue.userProfile = Object.assign(options, this.todoOptions)
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
  .Doing{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
  }
</style>
