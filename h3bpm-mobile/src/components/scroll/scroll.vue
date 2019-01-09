<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot>

          <!--列表-->
          <ul class="list-content" v-if="data && data.length > 0">
            <li @click="clickItem(item,index)" class="list-item" v-for="(item,index) in data" :key="index" >
              <div class="item-left">
                <span class="svg-box" @click.stop="handleSelect(item, index, $event)" v-if="item.isChecked" >
                    <svg-icon class="checked-icon" icon-class="checked" v-if="item.checked"/>
                    <svg-icon icon-class="check" v-else/>
                </span>
                <img v-lazy="baseUrl + item.OriginatorImageURL" alt="" v-else>
              </div>

              <div class="item-right">
                <div class="item-right-box">
                  <div class="right-box-top">{{item.InstanceName}}</div>
                  <div class="right-box-btm">

                    <p class="time" v-if="routeId === 0 || routeId === 1 || routeId === 4">
                      <span class="time-title">接收时间：</span>
                      <span class="time-inner">{{item.ReceiveTime}}</span>
                    </p>
                    <p class="time" v-else>
                      <span class="time-title">处理时间：</span>
                      <span class="time-inner">{{item.FinishTime}}</span>
                    </p>

                    <p class="time" v-if="item.Summary" :key="index" v-for="(list, index) in item.Summary">
                      <span class="time-title">{{list.DisplayName}}:</span>
                      <span class="time-inner">{{list.Value}}</span>
                    </p>

                    <p class="detail" v-if="routeId === 0 || routeId === 1 || routeId === 3">
                      <svg-icon icon-class="zhang"/>
                      <span class="detail-inner">{{item.ActivityName}}</span>
                    </p>
                    <p class="detail" v-else-if="routeId === 4 || routeId === 5 || routeId === 6">
                      <svg-icon icon-class="zhang"/>
                      <span v-show="'item.ActivityNames.length？true: false'" class="detail-inner"  v-for="(inner, index) in item.ActivityNames" :key="index">{{inner}}</span>
                      <span v-show="!item.ActivityNames || !item.ActivityNames.length" class="detail-inner">-</span>
                    </p>
                    <!--已办才有-->
                    <p class="detail" v-else>
                      <svg-icon icon-class="zhang"/>
                      <span class="detail-inner">{{item.ActivityName}}</span>
                      <span class="detail-inner" :class="item.ApprovelStatus === '1'? 'orange' : 'red'">({{item.ApprovelStatueName}})</span>
                    </p>
                  </div>
                </div>

                <div class="item-right-img">
                    <img v-lazy="language === 'zh' ? jiaji: jiaji2" alt="" v-if="item.RemindStatus === 1">
                    <img v-lazy="language === 'zh' ? cuiban: cuiban2" alt="" v-else-if="item.RemindStatus === 2">
                </div>
              </div>
            </li>
          </ul>

          <div v-else>
            <NoData></NoData>
          </div>
        </slot>
      </div>

      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>

    <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown"
          :bubbleY="bubbleY">
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
          <div v-else class="after-trigger-text"><span>{{refreshTxt}}</span></div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Loading from '../loading/loading.vue'
import Bubble from '../bubble/bubble.vue'
import NoData from '@/components/NoData/index'
import {getBaseUrl} from '@/utils/auth'
import {getRect} from '../../commom/js/dom'
const COMPONENT_NAME = 'scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default {
  name: COMPONENT_NAME,
  props: {
    isChecked: {
      type: Boolean,
      default: false
    },
    checkStatus: {
      type: Boolean,
      default: false
    },
    readChecked: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    listenScrollEnd: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    scrollbar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: false
    },
    bounce: {
      default: true
    },
    zoom: {
      default: false
    }
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      pullDownStyle: '',
      bubbleY: 0,
      baseUrl: getBaseUrl(),
      jiaji: 'static/images/jiaji.png',
      jiaji2: 'static/images/jiaji2.svg',
      cuiban: 'static/images/cuiban.png',
      cuiban2: 'static/images/cuiban2.svg',
      routeId: -1
    }
  },
  computed: {
    // 国际化
    language() {
      return this.$store.getters.language
    },
    pullUpTxt() {
      const moreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) || this.$i18n.t('scrollComponent.defaultLoadTxtMore')

      const noMoreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore) || this.$i18n.t('scrollComponent.defaultLoadTxtNoMore')

      return this.pullUpDirty ? moreTxt : noMoreTxt
    },
    refreshTxt() {
      return (this.pullDownRefresh && this.pullDownRefresh.txt) || this.$i18n.t('scrollComponent.defaultRefreshTxt')
    }
  },
  created() {
    this.pullDownInitTop = -50
    // console.log(this.$route.meta.id, 'route')
    this.routeId = this.$route.meta.id
  },
  mounted() {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  destroyed() {
    this.$refs.scroll && this.$refs.scroll.destroy()
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
      }

      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel,
        bounce: this.bounce,
        zoom: this.zoom
      }

      this.scroll = new BScroll(this.$refs.wrapper, options)

      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }

      if (this.listenScrollEnd) {
        this.scroll.on('scrollEnd', (pos) => {
          this.$emit('scroll-end', pos)
        })
      }

      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart')
        })

        this.scroll.on('scrollStart', () => {
          this.$emit('scroll-start')
        })
      }

      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }

      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    clickItem(item, index) {
      // console.log(item, index)
      this.$emit('handleClick', {item, index})
    },
    // 选中
    handleSelect(item, index, e) {
      // console.log(item, index, e)
      this.$emit('handleSelect', {item, index, e})
    },
    destroy() {
      this.scroll.destroy()
    },
    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false
        this._reboundPullDown().then(() => {
          this._afterPullDown()
        })
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false
        this.scroll.finishPullUp()
        this.pullUpDirty = dirty
        this.refresh()
      } else {
        this.refresh()
      }
    },
    _initPullDownRefresh() {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        this.$emit('pullingDown')
      })

      this.scroll.on('scroll', (pos) => {
        if (!this.pullDownRefresh) {
          return
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
        } else {
          this.bubbleY = 0
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
        }
      })
    },
    _initPullUpLoad() {
      this.scroll.on('pullingUp', () => {
        this.isPullUpLoad = true
        this.$emit('pullingUp')
      })
    },
    _reboundPullDown() {
      const {stopTime = 600} = this.pullDownRefresh
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.isRebounding = false
        this.refresh()
      }, this.scroll.options.bounceTime)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.forceUpdate(true)
      }, this.refreshDelay)
    }
  },
  components: {
    Loading,
    Bubble,
    NoData
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
  .list-wrapper {
    position: relative;
    height: 100%;
    overflow: hidden;
    background: $baseColor;
    .scroll-content {
      position: relative;
      z-index: 1;
      .list-content {
        position: relative;
        z-index: 10;
        background: $baseColor;
        /*列表*/
        .list-item {
          font-size: 1rem;
          padding: 10px;
          @include border-bottom-1px($borderBottom);
          display: flex;
          .item-left {
            flex: 0 0 15%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
            .svg-box{
              font-size: 32px;
              padding-left: 5px;
              cursor: pointer;
              .checked-icon{
                color: $mainColor;
              }
            }
          }
          .item-right {
            width: 85%;
            display: flex;
            justify-content: space-between;
            .item-right-box {
              width: 85%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .item-right-img{
              flex:0 0 15%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: center;
              img{
                width:100%;
                height: 40px;
              }
            }
            .right-box-top {
              color: $textColor;
              font-size: 1rem;
              line-height: 1.5rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .right-box-btm {
              .time {
                font-size: 14px;
                line-height: 1.3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .time-title {
              color: $textColor;
            }
            .time-inner {
              color: $textColor2;
            }
            .detail {
              color: $mainColor;
              line-height: 1.2rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .detail-inner {
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .no-data-box {
        width: 100%;
        height: 100%;
      }
    }
  }
  .pulldown-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    display: flex ;
    justify-content: center ;
    align-items: center;
    transition: all;
  }
  .after-trigger {
    margin-top: 10px ;
    .after-trigger-text {
      span {
        font-size: 14px;
        color: $textColor2;
      }
    }
  }
  .pullup-wrapper {
    width: 100%;
    display: flex ;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }
  .before-trigger {
    span{
      font-size: 14px; color: $textColor2;
    }
  }
  .orange{
    color: $successColor!important;
  }
  .red{
    color: $errorColor!important;
  }
</style>
