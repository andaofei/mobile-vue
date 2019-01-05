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
import getListMixin from '@/commom/mixins/getList'
import {getUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'
export default {
  name: 'Read',
  mixins: [getListMixin],
  data() {
    return {}
  },
  created() {
    this.setOptions({}) // 清空搜索条件
    let options = {
      keyWord: '',
      readWorkItem: true,
      sortDirection: 'Desc',
      sortKey: 'ReceiveTime',
      userId: getUserInfo().id
    }
    this.loadingShow = true
    this.$store.dispatch('getReadItem', options)
      .then((res) => {
        this.loadingShow = false
        if (res.code === ERR_OK) {
        }
      })
  },
  computed: {
    // 数据列表
    readList() {
      return this.$store.getters.readList
    },
    todoOptions() {
      return this.$store.getters.todoOptions
    }
  },
  methods: {
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
        console.log(newOptions, 'newOptions')
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
  .read{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
  }
</style>
