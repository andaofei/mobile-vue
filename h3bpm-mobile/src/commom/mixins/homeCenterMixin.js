import Vue from 'vue'
import Scroll from '@/components/scroll/scroll.vue'
import NoData from '@/components/NoData/index'
import {getWorkUrl, getSelfWorkflow} from '@/api/loadWorkFlows'
import { ease } from '@/commom/js/ease'
import ToTop from '@/views/Home/commom/ToTop'
import DingtalkEnv from 'dingtalk-javascript-env'
import dingtalk from 'dingtalk-javascript-sdk'
import {mapMutations} from 'vuex'
import {getBaseUrl} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'
import jiaji from '@/commom/images/jiaji.png'
import jiaji2 from '@/commom/images/jiaji2.svg'
import cuiban2 from '@/commom/images/cuiban2.svg'
import cuiban from '@/commom/images/cuiban.png'
import defaultUrl from '@/commom/default/bpm.jpg'
const homeCenterMixin = {
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
      itemIndex: 0,
      baseUrl: getBaseUrl(),
      loadingShow: false,
      jiaji: jiaji,
      jiaji2: jiaji2,
      cuiban: cuiban,
      cuiban2: cuiban2,
      defaultUrl: defaultUrl
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
    // 国际化
    language() {
      return this.$store.getters.language
    },
    // 筛选配置
    todoOptions() {
      return this.$store.getters.todoOptions
    },
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
    getTagCounts() {
      // let options = {
      //   keyWord: '',
      //   finishedWorkItem: false,
      //   sortDirection: 'Desc',
      //   sortKey: 'ReceiveTime',
      //   existsLength: 0,
      //   userId: getUserInfo().id
      // }
      // this.$store.dispatch('setTodoCounts', options) // 待办数
      this.$store.dispatch('setTagCounts') // 待阅数 待办数
    },

    // 点击元素事件
    handleClick(item) {
      const routeId = this.$route.meta.id
      this.loadingShow = true
      if (routeId === 0 || routeId === 1 || routeId === 2 || routeId === 3) {
        this.getWorkUrl(item)
      } else {
        this.getSelfWork(item)
      }
    },

    // 首页
    getWorkUrl(data) {
      const options = data.ObjectID
      return new Promise((resolve, reject) => {
        getWorkUrl(options).then(res => {
          this.loadingShow = false
          if (res.code === ERR_OK) {
            const urls = this.baseUrl + res.data
            if (DingtalkEnv.isDingtalk) {
              dingtalk.ready(function() {
                const dd = dingtalk.apis
                dd.biz.util.openLink({
                  url: urls + `&loginfrom=dingtalk`,
                  onSuccess: function(result) {
                  },
                  onFail: function(err) {
                    console.log(err)
                  }
                })
              })
            } else {
              window.location.href = urls
            }
          }
          resolve(res)
        }).catch(error => {
          this.loadingShow = false
          reject(error)
        })
      })
    },

    // 我的流程
    getSelfWork(data) {
      const options = data.ObjectID
      return new Promise((resolve, reject) => {
        getSelfWorkflow(options).then(res => {
          this.loadingShow = false
          if (res.code === ERR_OK) {
            // const urls = this.baseUrl + res.data
            const urls = this.baseUrl + res.data
            if (DingtalkEnv.isDingtalk) {
              dingtalk.ready(function() {
                const dd = dingtalk.apis
                dd.biz.util.openLink({
                  url: urls + `&loginfrom=dingtalk`,
                  onSuccess: function(result) {
                  },
                  onFail: function(err) {
                    console.log(err)
                  }
                })
              })
            } else {
              window.location.href = urls
            }
          }
          resolve(res)
        }).catch(error => {
          reject(error)
          this.loadingShow = false
        })
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

    //  刷新
    refresh() {
      this.$refs.scroll.refresh()
    },

    backTop() {
      if (this.$refs.scroll) {
        this.$refs.scroll.scrollTo(0, 0, '500', 'bounce')
        return
      }
      this.$refs.userList.scrollTo(0, 0, '500', 'bounce')
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
      setListChecked: 'SET_CHECKED_LIST', // 选中待阅
      setCleanChecked: 'CLEARN_CHECk_List' // 清空
    })
  },
  components: {
    Scroll,
    ToTop,
    NoData
  }
}
export default homeCenterMixin
