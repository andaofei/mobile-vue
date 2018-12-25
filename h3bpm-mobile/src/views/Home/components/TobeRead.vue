<template>
  <div class="tobe-read">
    <!--回顶部-->
    <ToTop v-show="topTop" @backTop="backTop"></ToTop>
    <!--批量阅读-->
    <div class="read-all" @click="handleReadAll" v-show="readList.length && readList.length > 1">批量阅读</div>
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
    <div class="select-btm" v-show="BatchStatus">
      <p class="btm-left" @click="handleCheckAll">
          <span class="svg-box">
            <svg-icon v-if="allCheckStatus" class="checked-icon" icon-class="checked"/>
             <svg-icon v-else icon-class="check"/>
         </span>
        <span class="allCheck">全选
        <span class="allCheck-count">
          ({{this.itemCheckList.length}})
        </span>
        </span>
      </p>
      <p class="btm-right" @click="handleSureClick">确定</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import vue from 'vue'
import getListMixin from '@/commom/mixins/getList'
import {mapMutations} from 'vuex'
import {getUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'
import { Toast } from 'mint-ui'
export default {
  name: 'AllDone',
  mixins: [getListMixin],
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
    this._initList()
  },
  methods: {
    ...mapMutations({
      setAlLChecked: 'SET_ALL_CHECKED_TOREAD',
      setToReadCount: 'SET_TO_READ_COUNTS',
      setOptions: 'ADD_OPTIONS',
      clearChecked: 'CLEAR_ALL_CHECKED',
      setListCheck: 'CHANGE_DATA_LIST_CHECKED',
      setListUnCheck: 'CHANGE_DATA_LIST_UNCHEKED',
      setListChecked: 'SET_CHECKED_LIST'
    }),
    _initList() {
      this.setOptions({}) // 清空搜索条件
      this.clearChecked([]) // 清空搜索条件
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
    // 单击
    handleClick(data) {
      console.log('单击')
    },
    // 单击选中
    handleSelect(data) {
      console.log(data)
      this.setListChecked(data)
      // setTimeout(() => {
      //   this.$refs.scroll.scrollTo(0, this.scrollY + 0.5, '200', 'bounce')
      // }, 20)
    },
    // 批量阅读
    handleReadAll() {
      // this.isChecked = !this.isChecked
      // console.log(this.readList)
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
    // 确定
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
          // userCode: getUserInfo().userCode,
          // userId: getUserInfo().id
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
                this._initList()
              }, 1000)
            } else {
              console.log('error')
            }
          })
      }
    },
    onPullingDown() {
      let that = this
      that.BatchStatus = false
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
      // console.log('pulling up and load data')
      // console.log(this.BatchStatus, '是否批量状态')
      // console.log(this.allCheckStatus, '是否全选状态')
      let that = this
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
    },
    //  刷新
    refresh() {
      this.$refs.scroll.refresh()
      // console.log('refresh')
    }
    // scroll(pos) {
    //   this.scrollY = pos.y
    //   // console.log(pos.y)
    // }
  },
  watch: { // 监视双向绑定的数据数组
    readList: {
      handler() { // 数据数组有变化将触发此函数
        // console.log(this.itemCheckList, 'itemCheckList')
        // console.log(this.$store.getters.readList, 'readList')
        if (this.readList.length === this.itemCheckList.length) {
          this.allCheckStatus = true
        } else {
          this.allCheckStatus = false
        }
      },
      deep: true // 深度监视
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
    },
    // 筛选配置
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
