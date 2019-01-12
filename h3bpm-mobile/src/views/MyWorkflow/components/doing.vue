<template>
  <div class="Doing">
    <ToTop v-show="topTop" @backTop="backTop"></ToTop>
    <scroll ref="scroll"
            v-loading="loadingShow"
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
      <!--列表-->
      <ul class="list-content" v-if="instanceList && instanceList.length > 0">
        <li @click="handleClick(item,index)" class="list-item" v-for="(item,index) in instanceList" :key="index" >
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
                  <span v-show="'item.ActivityNames.length？true: false'" class="detail-inner"  v-for="(inner, index) in item.ActivityNames" :key="index">{{inner}}</span>
                  <span v-show="!item.ActivityNames || !item.ActivityNames.length" class="detail-inner">-</span>
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
import vue from 'vue'
import homeCenterMixin from '@/commom/mixins/homeCenterMixin'
import getInstanceMixin from '@/commom/mixins/isntanceMixin'
import {getUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'

export default {
  name: 'Doing',

  mixins: [homeCenterMixin, getInstanceMixin],

  data() {
    return {}
  },

  created() {
    this.setInstanceOptions({}) // 清空搜索条件
    this.initDoingList()
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
      let newOptions = vue.userProfile = Object.assign(options, this.instanceOptions)
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
        let newOptions = vue.userProfile = Object.assign(options, this.instanceOptions)
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
  @import "../commom/scss/index";
</style>
