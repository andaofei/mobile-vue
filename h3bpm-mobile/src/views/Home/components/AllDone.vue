<template>
  <div class="all-done">
    <ToTop v-show="topTop" @backTop="backTop"></ToTop>
    <scroll ref="scroll"
            v-loading="loadingShow"
            @handleClick="handleClick"
            :data="itemList"
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
      <ul class="list-content" v-if="itemList && itemList.length > 0">
        <li @click="handleClick(item,index)" class="list-item" v-for="(item,index) in itemList" :key="index" >
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
                  <span class="time-title">处理时间：</span>
                  <span class="time-inner">{{item.FinishTime}}</span>
                </p>
                  <!--流程内容-->
                <p class="time" v-if="item.Summary" :key="index" v-for="(list, index) in item.Summary">
                  <span class="time-title">{{list.DisplayName}}:</span>
                  <span class="time-inner">{{list.Value}}</span>
                </p>
                  <!--操作详情-->
                <p class="detail" >
                  <svg-icon icon-class="zhang"/>
                  <span class="detail-inner">{{item.ActivityName}}</span>
                  <span class="detail-inner" :class="item.ApprovelStatus === '1'? 'orange' : 'red'">({{item.ApprovelStatueName}})</span>
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
  name: 'AllDone',
  mixins: [homeCenterMixin],
  created() {
    this.setOptions({}) // 清空搜索条件
    this.getTagCounts() // 待阅数/ 待办数
    this.initDoneList()
  },
  computed: {
    itemList() {
      return this.$store.getters.itemList
    }
  },
  methods: {
    initDoneList() {
      this.loadingShow = true
      let options = {
        keyWord: '',
        finishedWorkItem: true,
        sortDirection: 'Desc',
        sortKey: 'OT_WorkItemFinished.FinishTime',
        userId: getUserInfo().id
      }
      this.$store.dispatch('getItemList', options)
        .then((res) => {
          this.loadingShow = false
        })
        .catch(() => {
          this.loadingShow = false
        })
    },
    onPullingDown() {
      // 下拉更新数据
      setTimeout(() => {
        let options = {
          finishedWorkItem: true,
          existsLength: this.itemList.length || 0,
          sortDirection: 'Desc',
          sortKey: 'ReceiveTime',
          userId: getUserInfo().id
        }
        let newOptions = Object.assign(options, this.todoOptions)
        this.$store.dispatch('getItemList', newOptions)
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
      // 更新数据
      console.log('pulling up and load data')
      let that = this
      setTimeout(() => {
        let options = {
          IsPriority: [],
          keyWord: '',
          finishedWorkItem: true,
          loadStart: this.itemList.length || 0,
          sortDirection: 'Desc',
          sortKey: 'ReceiveTime',
          userId: getUserInfo().id
        }
        let newOptions = Object.assign(options, this.todoOptions)
        that.$store.dispatch('pullingUpWorkList', newOptions)
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
