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
import Vue from 'vue'
import Scroll from '@/components/scroll/scroll.vue'
import { ease } from '@/commom/js/ease'
export default {
  name: 'TOdoList',
  data() {
    return {
      scrollbar: false, // 滚动条
      scrollbarFade: true,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: this.$i18n.t('scrollComponent.defaultLoadTxtMore'),
      pullUpLoadNoMoreTxt: this.$i18n.t('scrollComponent.defaultLoadTxtNoMore'),
      startY: 0,
      scrollToX: 0,
      scrollToY: -200,
      scrollToTime: 700,
      scrollToEasing: 'bounce',
      scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
      items: [],
      itemIndex: 0
    }
  },
  created() {
    for (let i = 0; i < 18; i++) {
      this.items.push(this.$i18n.t('normalScrollListPage.previousTxt') + ++this.itemIndex + this.$i18n.t('normalScrollListPage.followingTxt'))
    }
  },
  watch: {
    scrollbarObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    pullDownRefreshObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    pullUpLoadObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    startY() {
      this.rebuildScroll()
    }
  },
  computed: {
    scrollbarObj: function() {
      return this.scrollbar ? {fade: this.scrollbarFade} : false
    },
    pullDownRefreshObj: function() {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop)
      } : false
    },
    pullUpLoadObj: function() {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
      } : false
    }
  },
  methods: {
    handleClick(item) {
      console.log(item)
    },
    scrollTo() {
      this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime, ease[this.scrollToEasing])
    },
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.items.unshift(this.$i18n.t('normalScrollListPage.newDataTxt') + +new Date())
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
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1500)
    },
    rebuildScroll() {
      Vue.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    }
  },
  components: {
    Scroll
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
