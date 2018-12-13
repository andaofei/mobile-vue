<template>
  <div class="todo-List">
    <scroll ref="scroll"
            class="test"
            @handleClick="handleClick"
            :data="items"
            :scrollbar="scrollbarObj"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            :startY="parseInt(startY)"
            @pullingDown="onPullingDown"
            @pullingUp="onPullingUp">
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import getListMixin from '@/commom/mixins/getList'
export default {
  name: 'TodoList',
  mixins: [getListMixin],
  data() {
    return {}
  },
  created() {
    // console.log(this.$route)
    for (let i = 0; i < 10; i++) {
      this.items.push(this.$i18n.t('normalScrollListPage.previousTxt') + ++this.itemIndex + this.$i18n.t('normalScrollListPage.followingTxt'))
    }
    // console.log(this.items.length)
    const counts = this.items.length
    this.$store.dispatch('setTodoCounts', counts)
  },
  methods: {
    handleClick(item) {
      console.log(item)
    },
    onPullingDown() {
      // 模拟更新数据
      console.log('pulling down and refresh data')
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.items.unshift(this.$i18n.t('normalScrollListPage.newDataTxt') + +new Date())
          console.log(this.items.length)
          const counts = this.items.length
          this.$store.dispatch('setTodoCounts', counts)
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 2000)
    },
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          let newPage = []
          for (let i = 0; i < 10; i++) {
            newPage.push(this.$i18n.t('normalScrollListPage.previousTxt') + ++this.itemIndex + this.$i18n.t('normalScrollListPage.followingTxt'))
          }
          this.items = this.items.concat(newPage)
          console.log(this.items.length)
          const counts = this.items.length
          this.$store.dispatch('setTodoCounts', counts)
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
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
