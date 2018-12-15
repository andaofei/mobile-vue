<template>
  <div class="tobe-read">
    <!--回顶部-->
    <ToTop v-show="topTop" @backTop="backTop"></ToTop>
    <!--批量阅读-->
    <div class="read-all" @click="readAll" v-show="ReadAll">批量阅读</div>
    <scroll ref="scroll"
            @handleClick="handleClick"
            @handleSelect="handleSelect"
            :data="itemList"
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
            <svg-icon v-if="isAllChecked" class="checked-icon" icon-class="checked"/>
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
export default {
  name: 'AllDone',
  mixins: [getListMixin],
  data() {
    return {
      ReadAll: false,
      allCheckedStatus: false,
      items: [],
      checkStatus: false,
      readChecked: false
    }
  },
  created() {
    // this.$store.dispatch('getItemList')
    if (this.itemList.length > 1) {
      this.ReadAll = true
    }
    for (let i = 0; i < 8; i++) {
      this.items.push(this.$i18n.t('normalScrollListPage.previousTxt') + ++this.itemIndex + this.$i18n.t('normalScrollListPage.followingTxt'))
    }
    const counts = this.items.length
    this.$store.dispatch('setToReadCounts', counts)
  },
  methods: {
    // 单击
    handleClick(data) {
      console.log('单击')
    },
    // 单击选中
    handleSelect(data) {
      this.$store.commit('SET_CHECKED_LIST', data)
    },
    // 批量阅读
    readAll() {
      // this.checkStatus = !this.checkStatus
      if (!this.allCheckedStatus) {
        this.$store.commit('CHANGE_DATA_LIST_CHECKED', this.itemList)
      } else {
        this.$store.commit('CHANGE_DATA_LIST_UNCHEKED', this.itemList)
      }
      this.allCheckedStatus = !this.allCheckedStatus
    },
    // 全选
    handleCheckAll() {
      const data = this.itemList
      this.setAlLChecked({data: data, state: this.isAllChecked})
    },
    // 确定
    handleSureClick() {
      console.log(this.itemCheckList)
    },
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.items.unshift(this.$i18n.t('normalScrollListPage.newDataTxt') + +new Date())
          const counts = this.items.length
          this.$store.dispatch('setToReadCounts', counts)
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 2000)
    },
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          let newPage = []
          for (let i = 0; i < 10; i++) {
            newPage.push(this.$i18n.t('normalScrollListPage.previousTxt') + ++this.itemIndex + this.$i18n.t('normalScrollListPage.followingTxt'))
          }
          this.items = this.items.concat(newPage)
          const counts = this.items.length
          this.$store.dispatch('setToReadCounts', counts)
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1500)
    },
    //  刷新
    refresh() {
      this.$refs.scroll.refresh()
      console.log('refresh')
    },
    ...mapMutations({
      setAlLChecked: 'SET_ALL_CHECKED_TOREAD'
    })
  },
  watch: {
    itemList(newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  },
  computed: {
    // 数据列表
    itemList() {
      return this.$store.getters.itemList
    },
    itemCheckList() {
      return this.$store.getters.itemCheckList
    },
    // 全选状态
    isAllChecked: {
      get() {
        const checkedData = this.$store.getters.itemCheckList
        const list = this.$store.getters.itemList
        if (checkedData.length === list.length) {
          return true
        }
        return false
      },
      set() {
        console.log(this.checkedPersonList, 'this.checkedPersonList')
      }
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
