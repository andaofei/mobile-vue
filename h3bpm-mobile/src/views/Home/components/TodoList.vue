<template>
  <div class="todo-List">
    <ToTop v-show="topTop" @backTop="backTop"></ToTop>
    <scroll ref="scroll"
            v-loading="loadingShow"
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
                  <span class="time-title">{{$t('home.startTime')}}：</span>
                  <span class="time-inner">{{item.ReceiveTime || item.RecieveTime}}</span>
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
              <img v-if="item.RemindStatus === 1" :src="language === 'zh_cn' ? jiaji: jiaji2" alt="" >
              <img v-else-if="item.RemindStatus === 2" :src="language === 'zh_cn' ? cuiban: cuiban2" alt="" >
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
  name: 'TodoList',
  mixins: [homeCenterMixin],
  created() {
    this.setOptions({}) // 清空搜索条件
    this.getTagCounts() // 待阅数/ 待办数
    this.$nextTick(() => {
      this.initToDoList()
    })
  },
  computed: {
    itemList() {
      return this.$store.getters.itemList
    }
  },
  methods: {
    initToDoList() {
      let options = {
        keyWord: '',
        finishedWorkItem: false,
        sortDirection: 'Desc',
        sortKey: 'ReceiveTime',
        userId: getUserInfo().id
      }
      this.loadingShow = true
      this.$store.dispatch('getItemList', options)
        .then((res) => {
          this.loadingShow = false
        })
        .catch((error) => {
          this.loadingShow = false
          console.error(error)
        })
    },

    onPullingDown() {
      // 下拉更新数据
      // console.log('pulling down and refresh data')
      setTimeout(() => {
        let options = {
          finishedWorkItem: false,
          existsLength: this.itemList.length || 0,
          sortDirection: 'Desc',
          sortKey: 'ReceiveTime',
          userId: getUserInfo().id
        }
        // console.log(options, 'options')
        let newOptions = Object.assign(options, this.todoOptions)
        // console.log(newOptions, 'newOptions')
        this.$store.dispatch('getItemList', newOptions)
          .then((res) => {
            if (res.code === ERR_OK) {
              this.setToDoCounts(res.data.TotalCount)
              if (res.data.LoadComplete) {
                this.$refs.scroll.forceUpdate()
              }
            }
          })
      }, 1500)
    },

    onPullingUp() {
      // 上拉更新数据
      // console.log('pulling up and load data')
      let that = this
      setTimeout(() => {
        let options = {
          finishedWorkItem: false,
          loadStart: this.itemList.length || 0,
          sortDirection: 'Desc',
          sortKey: 'ReceiveTime',
          userId: getUserInfo().id
        }
        // console.log(options, 'options')
        let newOptions = Object.assign(options, this.todoOptions)
        // console.log(newOptions, 'newOptions')
        that.$store.dispatch('pullingUpWorkList', newOptions)
          .then((res) => {
            if (res.code === ERR_OK) {
              this.setToDoCounts(res.data.TotalCount)
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
