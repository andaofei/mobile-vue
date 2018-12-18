<template>
  <div class="tobe-read">
    <!--回顶部-->
    <ToTop v-show="topTop" @backTop="backTop"></ToTop>
    <!--批量阅读-->
    <div class="read-all" @click="readAll" v-show="readList.length && readList.length > 1">批量阅读</div>
    <scroll ref="scroll"
            @handleClick="handleClick"
            @handleSelect="handleSelect"
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
   </scroll>
    <!--全选-->
    <div class="select-btm" v-show="allCheckedStatus">
      <p class="btm-left" @click="handleCheckAll">
          <span class="svg-box">
            <svg-icon v-if="allCheckStatus" class="checked-icon" icon-class="checked"/>
             <svg-icon v-else icon-class="check"/>
         </span>
        <span class="allCheck">全选</span>
      </p>
      <p class="btm-right" @click="handleSureClick">确定</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import getListMixin from '@/commom/mixins/getList'
import {mapMutations} from 'vuex'
import {getUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/statusCode'
export default {
  name: 'AllDone',
  mixins: [getListMixin],
  data() {
    return {
      ReadAll: false,
      allCheckedStatus: false,
      items: [],
      checkStatus: false,
      readChecked: false,
      allCheckStatus: false,
      isChecked: false,
      checked: false
    }
  },
  created() {
    this.setOptions({}) // 清空搜索条件
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
        if (res.code === ERR_OK) {
          this.setToReadCount(res.data.TotalCount)
        }
      })
  },
  methods: {
    ...mapMutations({
      setAlLChecked: 'SET_ALL_CHECKED_TOREAD',
      setToReadCount: 'SET_TO_READ_COUNTS',
      setOptions: 'ADD_OPTIONS'
    }),
    // 单击
    handleClick(data) {
      console.log('单击')
    },
    // 单击选中
    handleSelect(data) {
      // console.log(data)
      // this.checked = data.item
      this.$store.commit('SET_CHECKED_LIST', data)
    },
    // 批量阅读
    readAll() {
      // this.isChecked = !this.isChecked
      if (!this.allCheckedStatus) {
        this.$store.commit('CHANGE_DATA_LIST_CHECKED', this.readList)
      } else {
        this.$store.commit('CHANGE_DATA_LIST_UNCHEKED', this.readList)
      }
      this.allCheckedStatus = !this.allCheckedStatus
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, -1, '500', 'bounce')
        this.refresh()
      }, 20)
    },
    // 全选
    handleCheckAll() {
      const data = this.readList
      this.setAlLChecked({data: data, state: this.allCheckStatus})
    },
    // 确定
    handleSureClick() {
      console.log(this.itemCheckList, this.itemCheckList.length)
    },
    onPullingDown() {
      let that = this
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
      console.log('pulling up and load data')
      setTimeout(() => {
        let options = {
          IsPriority: '',
          Originators: [],
          endDate: '',
          readWorkItem: false,
          keyWord: '',
          loadStart: this.readList.length || 0,
          sortDirection: 'Desc',
          sortKey: 'ReceiveTime',
          startDate: '',
          userId: getUserInfo().id
        }
        let newOptions = Object.assign(options, this.todoOptions)
        this.$store.dispatch('pullingUpReadList', newOptions)
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
    //  刷新
    refresh() {
      this.$refs.scroll.refresh()
      console.log('refresh')
    }
  },
  watch: { // 监视双向绑定的数据数组
    itemCheckList: {
      handler() { // 数据数组有变化将触发此函数
        if (this.readList.length === this.itemCheckList.length) {
          this.allCheckStatus = true
        } else {
          this.allCheckStatus = false
        }
      },
      deep: true // 深度监视
    },
    readList: {
      handler() { // 数据数组有变化将触发此函数
        console.log('change')
      },
      deep: true // 深度监视
    }
  },
  computed: {
    // 数据列表
    readList() {
      return this.$store.getters.readList
    },
    itemCheckList() {
      return this.$store.getters.itemCheckList
    },
    todoOptions() {
      return this.$store.getters.todoOptions
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
      border: 1px solid #F2F2F2;
      z-index: 20;
      padding: 5px 15px 5px 10px;
      background: #fff;
      font-size: 14px;
      border-bottom-left-radius: 14px;
      border-top-left-radius: 14px;
      color: #51BC01;
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
          padding-right: 5px;
          svg{
            width: 24px;
            height: 24px;
          }
          .checked-icon{
            color: $mainColor;
          }
        }
        .allCheck{
          color: $textColor2;
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
