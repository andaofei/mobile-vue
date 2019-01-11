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
        <BtScroll
                  class="filter-scroll"
                  ref="userList"
                  @scroll="scroll"
                  @refresh="refresh"
                  @beforeScroll="listScroll"
                  :probe-type="probeType"
                  :listenScroll="listenScroll"
                  :pullingUp="pullingUp"
                  :beforeScroll="beforeScroll">
        <div>
        <div class="process">
          <p class="item-name">{{$t('filter.title')}}</p>
          <p class="item-input">
            <el-input v-model="input" @input="handleFocus" :placeholder="placeHolder" maxlength="20"></el-input>
          </p>
        </div>

        <div class="process-person">
          <span class="process-person-name">{{$t('filter.sponsor')}}</span>
          <p class="process-person-list" @click="handleSelect">
            <span class="list-name"  :key="item.id" v-for="(item, index) in checkedSponsor" v-if="index<2 && item.checked">{{item.Text}}</span>
            <span v-if="checkedSponsor.length>2">{{$t('filter.and')}}{{checkedSponsor.length}}{{$t('filter.people')}}</span>
            <span v-else-if="!checkedSponsor">{{$t('filter.select')}}</span>
            <span class="svg-box">
              <svg-icon icon-class="right" />
          </span>
          </p>
        </div>

        <div class="process-time">
          <p class="item-name">{{$t('filter.time')}}</p>
          <div class="time-picker">
            <div  class="start-time">
              <p @click="openPicker(0)">
                <span v-if="startTime">{{startTime}}</span>
                <span v-else>{{$t('filter.startTime')}}</span>
              </p>
            </div>
            <div class="end-time">
              <p @click="openPicker(1)">
                <span v-if="endTime">{{endTime}}</span>
                <span v-else>{{$t('filter.endTime')}}</span>
              </p>
            </div>
          </div>
          <span class="error-msg" v-show="errorMsg">{{text}}</span>
        </div>

        <div class="process-status">
          <p class="item-name">{{$t('filter.status')}}</p>
          <div class="status-list">
            <p  :key="item.id" v-for="(item, index) in statusList" @click="handleClickStatus(item, index)">
              <span :class="{'activeSelect': active === item}">{{item.name}}</span>
            </p>
          </div>
        </div>
        </div>
        </BtScroll>
      </div>

      <div class="filter-btm">
        <p class="reset" @click="handleReset">{{$t('filter.reset')}}</p>
        <p class="sure" @click="handleSearch">{{$t('filter.submit')}}</p>
      </div>

      <mt-datetime-picker
        ref="picker"
        :cancelText="cancelText"
        :confirmText="confirmText"
        type="date"
        @confirm="handleConfirm"
        @cancel="handleCancel"
        v-model="value">
      </mt-datetime-picker>
    </div>
</template>

<script>
import {getUserInfo} from '@/utils/auth'
import filterMixin from '@/commom/mixins/filterMixin'
import moment from 'moment'
import { ERR_OK } from '@/api/options/statusCode'
export default {
  name: 'FilterBox',
  mixins: [filterMixin],
  data() {
    return {
    }
  },

  methods: {

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

    // 确定时间
    handleConfirm(value) {
      const timeStatus = this.timeStatus
      if (timeStatus === 0) {
        this.startTime = moment(value).format('YYYY-MM-DD')
        // console.log(moment(this.startTime) - moment(this.endTime))
        let times = moment(this.startTime) - moment(this.endTime)
        if (times > 0) {
          this.errorMsg = true
          this.text = this.$t('filter.tip')
        } else {
          this.errorMsg = false
        }
      } else {
        this.endTime = moment(value).format('YYYY-MM-DD')
        // console.log(moment(this.endTime) - moment(this.startTime))
        let times = moment(this.endTime) - moment(this.startTime)
        if (times < 0) {
          this.errorMsg = true
          this.text = this.$t('filter.tip2')
        } else {
          this.errorMsg = false
        }
      }
    },

    // 筛选
    handleSearch() {
      if (this.errorMsg) {
        return false
      }
      this.$emit('handleHiddenBox')
      this.searchActions()
    },

    searchActions() {
      const routeId = this.$route.meta.id
      // console.log(this.checkedSponsor, 'checkedSponsor')
      let arr = []
      const checkedSponsor = this.checkedSponsor
      for (const item of checkedSponsor) {
        arr.push(item.ObjectID)
      }
      let options = {
        isPriority: this.IsPriority,
        Originators: JSON.stringify(arr), // 发起人
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
      this.IsPriority = ''
      this.endTime = null
      this.startTime = null
      this.cleanChecked([])
      setTimeout(() => {
        this.$emit('handleHiddenBox')
        this.searchActions()
      }, 100)
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
    checkedSponsor() {
      const persons = this.$store.getters.checkedPersonList
      const departs = this.$store.getters.checkedDepartList
      return [...persons, ...departs]
    },
    // 筛选历史路径
    filterPath() {
      return this.$store.getters.filterPath
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        // console.log(val.path, 'path')
        // console.log(this.filterPath, 'filterPath')
        if (!this.filterPath) { // 重置筛选条件
          this.handleReset()
        }
      },
      deep: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/commom/scss/filterBox/index.scss";
</style>
