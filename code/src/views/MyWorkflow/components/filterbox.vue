<template>
  <div class="filter-wrapper">
    <div class="filter-title">
        <span class="svg-box" @click="handleHiddenBox">
          <svg-icon icon-class="close" />
        </span>
      <span class="text">{{$t('home.filter')}}</span>
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
import moment from 'moment'
import filterMixin from '@/commom/mixins/filterMixin'
import {getUserInfo} from '@/utils/auth'
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

    // 搜索
    handleSearch() {
      this.searchActions()
      this.$emit('handleHiddenBox')
      this.$emit('handleSearch')
    },

    searchActions() {
      const routeId = this.$route.meta.id
      let options = {
        isPriority: this.IsPriority,
        endDate: this.endTime,
        keyWord: this.input,
        startDate: this.startTime,
        userId: getUserInfo().id
      }
      console.log(options)
      switch (routeId) {
        case 4: // 进行中
          options.status = 2
          this.setInstanceOptions(options)
          this.$store.dispatch('getInstanceDoing', options)
            .then((res) => {
              if (res.code === 200) {
                this.setCounts(res.data.TotalCount)
              }
            })
          break
        case 5: // 已完成
          options.status = 4
          this.setInstanceOptions(options)
          this.$store.dispatch('getInstanceDoing', options)
            .then((res) => {
            })
          break
        case 6: // 已取消
          options.status = 5
          this.setInstanceOptions(options)
          this.$store.dispatch('getInstanceDoing', options)
            .then((res) => {
            })
          break
      }
    },

    // 重置
    handleReset() {
      this.input = ''
      this.active = -1
      this.endTime = null
      this.startTime = null
      this.IsPriority = ''
      setTimeout(() => {
        this.$emit('handleHiddenBox')
        this.$emit('handleSearch')
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/commom/scss/filterBox/index.scss";
</style>
