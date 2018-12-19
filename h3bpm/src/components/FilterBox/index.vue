<template>
    <div class="filter-wrapper">
      <div class="filter-title">
        <span class="svg-box" @click="handleHiddenBox">
          <svg-icon icon-class="close" />
        </span>
        <span class="text">{{$t('home.filter')}}-{{filterTitle}}</span>
        <span>&nbsp;&nbsp;</span>
        </div>

      <div class="filter-container">
        <div class="process">
          <p class="item-name">流程名称</p>
          <p class="item-input">
            <el-input v-model="input" placeholder="请输入内容" maxlength="20"></el-input>
          </p>
        </div>

        <div class="process-person">
          <span class="process-person-name">发起人</span>
          <p class="process-person-list" @click="handleSelect">
            <span class="list-name"  :key="item.id" v-for="(item, index) in checkedPersonList" v-if="index<2 && item.checked">{{item.name}}</span>
            <span v-if="checkedPersonList.length>2">等{{checkedPersonList.length}}人</span>
            <span v-else-if="!checkedPersonList">请选择发起人</span>
            <span class="svg-box">
              <svg-icon icon-class="right" />
          </span>
          </p>
        </div>

        <div class="process-time">
          <p class="item-name">创建时间</p>
          <div class="time-picker">
            <div  class="start-time">
              <p @click="openPicker(0)">
                <span v-if="startTime">{{startTime}}</span>
                <span v-else>开始时间</span>
              </p>
            </div>
            <div class="end-time">
              <p @click="openPicker(1)">
                <span v-if="endTime">{{endTime}}</span>
                <span v-else>结束时间</span>
              </p>
            </div>
          </div>
          <span class="error-msg" v-show="errorMsg">{{text}}</span>
        </div>

        <div class="process-status">
          <p class="item-name">是否加急</p>
          <div class="status-list">
            <p  :key="item.id" v-for="(item, index) in statusList" @click="handleClickStatus(item, index)">
              <span :class="{'activeSelect': active === item}">{{item.name}}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="filter-btm">
        <p class="reset" @click="handleReset">重置</p>
        <p class="sure" @click="handleSearch">确定</p>
      </div>

      <mt-datetime-picker
        ref="picker"
        cancelText="取消"
        confirmText="确定"
        type="date"
        @confirm="handleConfirm"
        v-model="value">
      </mt-datetime-picker>
    </div>
</template>

<script>
import {getUserInfo} from '@/utils/auth'
import {mapMutations} from 'vuex'
import moment from 'moment'
import { ERR_OK } from '@/api/options/statusCode'
export default {
  name: 'FilterBox',
  data() {
    return {
      input: '',
      value: new Date(),
      endTime: null,
      startTime: null,
      timeStatus: -1,
      errorMsg: false,
      text: '开始时间不能小于结束时间',
      statusList: [
        {
          name: '是',
          id: 2
        },
        {
          name: '否',
          id: 0
        },
        {
          name: '不限',
          id: -1
        }
      ],
      active: -1,
      IsPriority: ''
    }
  },
  methods: {
    ...mapMutations({
      setToDoCounts: 'SET_TODO_COUNTS',
      setToReadCounts: 'SET_TO_READ_COUNTS',
      addOptions: 'ADD_OPTIONS'
    }),
    // close
    handleHiddenBox() {
      this.$emit('handleHiddenBox')
    },

    // 发起人
    handleSelect() {
      this.$router.push({
        path: '/selectPerson'
      })
    },

    // 打开时间选择
    openPicker(e) {
      this.timeStatus = e
      this.$refs.picker.open()
    },

    // 确定时间
    handleConfirm(value) {
      const timeStatus = this.timeStatus
      if (timeStatus === 0) {
        this.startTime = moment(value).format('YYYY-MM-DD')
        // console.log(moment(this.startTime) - moment(this.endTime))
        let times = moment(this.startTime) - moment(this.endTime)
        if (times > 0) {
          this.errorMsg = true
          this.text = '开始时间不能大于结束时间'
        } else {
          this.errorMsg = false
        }
      } else {
        this.endTime = moment(value).format('YYYY-MM-DD')
        // console.log(moment(this.endTime) - moment(this.startTime))
        let times = moment(this.endTime) - moment(this.startTime)
        if (times < 0) {
          this.errorMsg = true
          this.text = '结束时间不能小于开始时间'
        } else {
          this.errorMsg = false
        }
      }
    },

    // 加急
    handleClickStatus(item, index) {
      this.active = item
      this.IsPriority = item.id
    },

    // 搜索
    handleSearch() {
      this.$emit('handleHiddenBox')
      // console.log(this.$route.meta.id, 'filter')
      const routeId = this.$route.meta.id
      let options = {
        IsPriority: this.IsPriority,
        Originators: '', // 发起人
        endDate: this.endTime,
        keyWord: this.input,
        startDate: this.startTime,
        userId: getUserInfo().id
      }
      switch (routeId) {
        case 0: // 待办
          options.finishedWorkItem = false
          options.sortDirection = 'Desc'
          options.sortKey = 'ReceiveTime'
          this.addOptions(options)
          this.$store.dispatch('getItemList', options)
            .then((res) => {
              if (res.code === ERR_OK) {
                this.setToDoCounts(res.data.TotalCount)
              }
            })
          break
        case 1: // 待阅
          options.readWorkItem = false
          options.sortDirection = 'Desc'
          options.sortKey = 'ReceiveTime'
          this.addOptions(options)
          this.$store.dispatch('getReadItem', options)
            .then((res) => {
              this.setToReadCounts(res.data.TotalCount)
            })
          break
        case 2: // 已办
          options.finishedWorkItem = true
          options.sortDirection = 'Desc'
          options.sortKey = 'ReceiveTime'
          this.addOptions(options)
          this.$store.dispatch('getItemList', options)
          break
        case 3: // 已阅
          options.readWorkItem = true
          options.sortDirection = 'Desc'
          options.sortKey = 'ReceiveTime'
          this.addOptions(options)
          this.$store.dispatch('getReadItem', options)
          break
        default:
          return false
      }
    },
    // 重置
    handleReset() {
      this.input = ''
      this.active = -1
      this.endTime = null
      this.startTime = null
    }
  },
  computed: {
    filterTitle() {
      if (this.$store.getters.filterTitle) {
        return this.$t(`filter.` + this.$store.getters.filterTitle)
      } else {
        return ''
      }
    },
    checkedPersonList() {
      return this.$store.getters.checkedPersonList
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
.filter-wrapper{
  height: 100%;
  flex: 1 0 auto;
  background:$baseColor;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .filter-title, .filter-btm{
    display: flex;
    justify-content: space-between;
  }
  .filter-title{
    padding: 12px;
    @include border-bottom-1px($borderBottom);
    font-size: 1rem;
    line-height: 20px;
    .svg-box{
      color: $mainColor;
    }
    .text{
      color: $textColor2;
    }
  }
  .filter-btm{
    @include border-top-1px($borderBottom);
    height: 44px;
    p {
      text-align: center;
      line-height: 44px;
    }
    .reset{
      color: $textColor2;
      width: 60%;
    }
    .sure{
      width: 40%;
      background: $mainColor;
      color: $baseColor;
    }
  }
  .filter-container{
    flex: 1 0 auto;
    .item-name{
      line-height: 40px;
      color: $textColor2;
      font-size: 14px;
    }
    .process{
      padding: 0 10px;
    }
    .process-person{
      display: flex;
      padding: 0 10px;
      line-height: 40px;
      font-size: 14px;
      color: $textColor2;
      .process-person-name{
        flex: 0 0 46px;
      }
      .process-person-list{
        overflow: hidden;
        color: $textColor2;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
        flex: 1 0 auto;
        display: flex;
        justify-content: flex-end;
        .list-name{
          padding: 0 3px;
        }
      }
    }
    .process-time,.process-status{
      padding: 0 10px;
      .time-picker{
        display: flex;
        justify-content: space-between;
        .start-time,.end-time{
          flex: 1;
          text-align: center;
          padding: 5px;
          p{
            border: 1px solid $solidColor;
            color: $textColor2;
            font-size: 14px;
            line-height: 32px;
            border-radius: 4px;
          }
        }
      }
      .error-msg{
        font-size: 12px;
        color: $errorColor;
        line-height: 18px;
        padding: 0 10px;
      }
      .status-list{
        display: flex;
        justify-content: space-between;
        p{
          flex: 1;
          text-align: center;
          font-size: 14px;
          color: $textColor2;
          padding: 5px;
          span{
            display: block;
            border: 1px solid $solidColor;
            border-radius: 4px;
            padding:8px 5px;
          }
        }
      }
    }
  }
  .activeSelect{
    background: $mainBgColor;
    color: $mainColor;
    border: 1px solid $mainBgColor!important;
  }
}
</style>
