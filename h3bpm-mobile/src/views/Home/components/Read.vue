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
      <!--列表-->
      <ul class="list-content" v-if="readList && readList.length > 0">
        <li @click="handleClick(item,index)" class="list-item" v-for="(item,index) in readList" :key="index" >
          <!--头像-->
          <div class="item-left">
                  <img v-if="item.OriginatorImageURL" :src="baseUrl+item.OriginatorImageURL" alt="" >
                  <img v-else :src="defaultUrl" alt="" >
          </div>

          <div class="item-right">
            <div class="item-right-box">
              <!--流程名-->
              <div class="right-box-top">{{item.InstanceName}}</div>
              <div class="right-box-btm">
                <!--时间-->
                <p class="time">
                  <span class="time-title">{{$t('home.endTime')}}：</span>
                  <span class="time-inner">{{item.FinishTime}}</span>
                </p>
                <!--流程内容-->
                <p class="time" v-if="item.Summary" :key="index" v-for="(list, index) in item.Summary">
                  <span class="time-title">{{list.DisplayName}}:</span>
                  <span class="time-inner">{{list.Value}}</span>
                </p>
                <!--操作详情-->
                <p class="detail">
                  <svg-icon icon-class="zhang"/>
                  <span class="detail-inner">{{item.ActivityName}}</span>
                </p>
              </div>
            </div>
            <!--加急|催办-->
            <div class="item-right-img">
              <img v-if="item.RemindStatus === 1" :src="language === 'zh' ? jiaji: jiaji2" alt="" >
              <img v-else-if="item.RemindStatus === 2" :src="language === 'zh' ? cuiban: cuiban2" alt="" >
            </div>
          </div>
        </li>
      </ul>

      <div v-else>
        <NoData></NoData>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import homeCenterMixin from '@/commom/mixins/homeCenterMixin'
import {getUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'
export default {
  name: 'Read',
  mixins: [homeCenterMixin],
  created() {
    this.$nextTick(() => {
      this.setOptions({}) // 清空搜索条件
      this.getTagCounts() // 待阅数/ 待办数
      this.initReadList()
    })
  },
  computed: {
    // 数据列表
    readList() {
      return this.$store.getters.readList
    }
  },
  methods: {
    initReadList() {
      this.loadingShow = true
      let options = {
        keyWord: '',
        readWorkItem: true,
        sortDirection: 'Desc',
        sortKey: 'ReceiveTime',
        userId: getUserInfo().id
      }
      this.$store.dispatch('getReadItem', options)
        .then((res) => {
          this.loadingShow = false
        })
        .catch(() => {
          this.loadingShow = false
        })
    },
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
          originators: [],
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
  @import "../commom/scss/index.scss";
</style>
