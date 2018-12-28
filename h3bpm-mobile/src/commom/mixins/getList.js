import Vue from 'vue'
import Scroll from '@/components/scroll/scroll.vue'
import { ease } from '@/commom/js/ease'
import ToTop from '@/views/Home/commom/ToTop'
import {mapMutations} from 'vuex'
const getListMixin = {
  data() {
    return {
      topTop: false,
      probeType: 3,
      listenScroll: true,
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
    this.topTop = false
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
    // 点击元素事件
    handleClick(item) {
      // console.log(item, 'data')
      this.$router.push({
        name: 'SheetDetail',
        params: {
          data: item
        }
      })
    },
    scroll(pos) {
      // console.log(pos.y)
      if (pos.y < -100) {
        this.topTop = true
      } else {
        this.topTop = false
      }
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, '500', 'bounce')
      // this.topTop = false
    },
    scrollTo() {
      this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime, ease[this.scrollToEasing])
    },
    rebuildScroll() {
      Vue.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    },
    ...mapMutations({
      setToDoCounts: 'SET_TODO_COUNTS', // 待办数量
      setAlLChecked: 'SET_ALL_CHECKED_TOREAD', // 选择所有待阅
      setToReadCount: 'SET_TO_READ_COUNTS', // 待阅数量
      setOptions: 'ADD_OPTIONS', // 列表配置
      clearChecked: 'CLEAR_ALL_CHECKED', // 清空所有选择
      setListCheck: 'CHANGE_DATA_LIST_CHECKED', // 设置选中 false属性
      setListUnCheck: 'CHANGE_DATA_LIST_UNCHEKED', // 取消待阅选中
      setListChecked: 'SET_CHECKED_LIST' // 选中待阅
    })
  },
  components: {
    Scroll,
    ToTop
  }
}
export default getListMixin
