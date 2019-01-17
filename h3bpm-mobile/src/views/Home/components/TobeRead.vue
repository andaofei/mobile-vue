<template>
  <div class="tobe-read">
    <ToTop v-show="topTop" @backTop="backTop"></ToTop>
    <!--批量阅读-->
    <div class="read-all" @click="handleReadAll" v-show="readList.length && readList.length > 1">{{$t('home.Batch')}}</div>
    <scroll ref="scroll"
            v-loading="loadingShow"
            :data="readList"
            :isChecked="isChecked"
            :checked="checked"
            :checkStatus="checkStatus"
            :readChecked="readChecked"
            :probe-type="probeType"
            :listenScroll="listenScroll"
            :scrollbar="scrollbarObj"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            :startY="parseInt(startY)"
            @refresh="refresh"
            @scroll="scroll"
            @pullingDown="onPullingDown"
            @pullingUp="onPullingUp">
      <!--列表-->
      <ul class="list-content" v-if="readList && readList.length > 0">
        <li @click="handleClick(item,index)" class="list-item" v-for="(item,index) in readList" :key="index" >
          <!--头像-->
          <div class="item-left">
                <span class="svg-box" @click.stop="handleSelect(item, index)" v-if="item.isChecked" >
                    <svg-icon class="checked-icon" icon-class="checked" v-if="item.checked"/>
                    <svg-icon icon-class="check" v-else/>
                </span>
            <span v-else>
                  <img v-if="item.OriginatorImageURL" :src="baseUrl+item.OriginatorImageURL" alt="" >
                  <img v-else :src="defaultUrl" alt="" >
                </span>
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
    <!--全选-->
    <div class="select-btm" v-show="BatchStatus">
      <p class="btm-left" @click="handleCheckAll">
          <span class="svg-box">
            <svg-icon v-if="allCheckStatus" class="checked-icon" icon-class="checked"/>
             <svg-icon v-else icon-class="check"/>
         </span>
        <span class="allCheck">{{$t('home.selectAll')}}
        <span class="allCheck-count">
          ({{this.itemCheckList.length}})
        </span>
        </span>
      </p>
      <p class="btm-right" @click="handleSureClick">{{$t('home.submit')}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import vue from 'vue'
import homeCenterMixin from '@/commom/mixins/homeCenterMixin'
import {getUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'
import { Toast } from 'mint-ui'
export default {
  name: 'AllDone',
  mixins: [homeCenterMixin],
  data() {
    return {
      ReadAll: false,
      BatchStatus: false,
      items: [],
      checkStatus: false,
      readChecked: false,
      allCheckStatus: false,
      isChecked: false,
      checked: false,
      scrollY: 0
    }
  },
  created() {
    this.$nextTick(() => {
      this.initToReadList()
    })
  },
  methods: {
    initToReadList() {
      this.loadingShow = true
      this.setOptions({}) // 清空搜索条件
      this.clearChecked([]) // 清空搜索条件
      this.getTagCounts() // 待阅数/ 待办数
      let options = {
        readWorkItem: false,
        keyWord: '',
        sortDirection: 'Desc',
        sortKey: 'ReceiveTime',
        userCode: getUserInfo().userCode,
        userId: getUserInfo().id
      }
      this.$store.dispatch('getReadItem', options)
        .then((res) => {
          this.loadingShow = false
          if (res.code === ERR_OK) {
            this.setToReadCount(res.data.TotalCount)
          }
        })
        .catch(() => {
          this.loadingShow = false
        })
    },

    // 单击选中
    handleSelect(item, index) {
      console.log(item, index)
      this.setListChecked({item: item, index: index})
    },

    // 批量阅读
    handleReadAll() {
      if (!this.BatchStatus) {
        this.setListCheck(this.readList)
      } else {
        this.setListUnCheck(this.readList)
      }
      this.BatchStatus = !this.BatchStatus
    },

    // 全选
    handleCheckAll() {
      const data = this.readList
      this.setAlLChecked({data: data, state: this.allCheckStatus})
    },

    // 确定全选
    handleSureClick() {
      console.log(this.itemCheckList, 'itemCheckList')
      if (this.itemCheckList.length) {
        let arr = []
        this.itemCheckList.forEach((item) => {
          arr.push(item.ObjectID)
        })
        let options = {
          circulateItemIds: arr,
          readAll: false
        }
        this.$store.dispatch('BatchReading', options)
          .then((res) => {
            if (res.code === ERR_OK) {
              let instance = Toast({
                message: this.$t('home.success'),
                iconClass: 'icon el-icon-success'
              })
              setTimeout(() => {
                instance.close()
                this.initToReadList()
                this.BatchStatus = false
                this.$refs.scroll.scrollTo(0, 0, '500', 'bounce')
              }, 1000)
            } else {
              let instance = Toast({
                message: this.$t('home.fail'),
                iconClass: 'icon el-icon-error'
              })
              setTimeout(() => {
                instance.close()
                this.initToReadList()
                this.BatchStatus = false
              }, 1000)
            }
          })
          .catch(() => {
          })
      }
    },

    onPullingDown() {
      let that = this
      that.BatchStatus = false
      this.setCleanChecked()
      // 下拉更新数据
      setTimeout(() => {
        let options = {
          readWorkItem: false,
          keyWord: '',
          existsLength: this.readList.length || 0,
          sortDirection: 'Desc',
          sortKey: 'ReceiveTime',
          userCode: getUserInfo().userCode,
          userId: getUserInfo().id
        }
        // console.log(options, 'options')
        let newOptions = Object.assign(options, this.todoOptions)
        // console.log(newOptions, 'newOptions')
        that.$store.dispatch('getReadItem', newOptions)
          .then((res) => {
            if (res.code === ERR_OK) {
              this.setToReadCount(res.data.TotalCount)
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
          IsPriority: '',
          originators: [],
          endDate: '',
          readWorkItem: false,
          keyWord: '',
          loadStart: this.readList.length || 0,
          sortDirection: 'Desc',
          sortKey: 'ReceiveTime',
          startDate: '',
          userId: getUserInfo().id
        }
        // let newOptions = Object.assign(options, this.todoOptions)
        let newOptions = vue.userProfile = Object.assign(options, that.todoOptions)
        console.log(newOptions, 'newOptions')
        that.$store.dispatch('pullingUpReadList', {options: newOptions, batch: that.BatchStatus, allChecked: that.allCheckStatus})
          .then((res) => {
            if (res.code === ERR_OK) {
              that.setToReadCount(res.data.TotalCount)
              if (res.data.LoadComplete && that.BatchStatus) { // 批量阅读下
                let instance = Toast({
                  message: this.$t('workList.loadAll'),
                  iconClass: 'icon el-icon-success'
                })
                setTimeout(() => {
                  instance.close()
                }, 2000)
                that.$refs.scroll.forceUpdate()
              } else {
                that.$refs.scroll.forceUpdate()
              }
            }
          })
      }, 1500)
    }
  },
  watch: {
    readList: {
      handler() {
        if (this.readList.length === this.itemCheckList.length) {
          this.allCheckStatus = true
        } else {
          this.allCheckStatus = false
        }
      },
      deep: true
    }
  },

  computed: {
    // 数据列表
    readList: {
      get() {
        return this.$store.getters.readList
      },
      set(value) {
        console.log(value, 'set-value')
      }
    },
    // 已选列表
    itemCheckList() {
      return this.$store.getters.itemCheckList
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../commom/scss/mixin";
  @import "../../../commom/scss/varible";
  .tobe-read{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
    .read-all{
     position: absolute;
      right: 0;
      top:60px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12);
      border: 1px solid $mainBgColor;
      z-index: 20;
      padding: 5px 15px 5px 10px;
      background: $baseColor;
      font-size: 14px;
      border-bottom-left-radius: 14px;
      border-top-left-radius: 14px;
      color: $mainColor;
    }
    .select-btm{
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 44px;
      z-index: 9;
      background: $baseColor;
      display: flex;
      @include border-top-1px($borderBottom);
      .btm-left{
        padding-left: 10px;
        width: 60%;
        line-height: 44px;
        display: flex;
        .svg-box{
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 5px;
          padding-right: 8px;
          svg{
            width: 32px;
            height: 32px;
          }
          .checked-icon{
            color: $mainColor;
            cursor: pointer;
          }
        }
        .allCheck{
          color: $textColor2;
        }
        .allCheck-count{
          color: $mainColor;
        }
      }
      .btm-right{
        width: 40%;
        line-height: 44px;
        text-align: center;
        background: $mainColor;
        color: $baseColor;
      }
    }
  }
</style>
