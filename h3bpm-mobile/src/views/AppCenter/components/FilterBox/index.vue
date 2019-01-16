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
        <div v-show="filterData.length > 0">
          <div  class="process" v-for="(item, index) in filterData" :key="index" >
            <p class="item-name">{{item.DisplayName}}</p>
            <p class="item-input">
            <el-input v-model="item.inputValue" maxlength="20"></el-input>
            </p>
          </div>
        </div>
        <div class="nodata" v-show="!filterData.length">
          <NoData></NoData>
        </div>
      </BtScroll>
    </div>

    <div class="filter-btm">
      <p class="reset" @click="handleReset">{{$t('filter.reset')}}</p>
      <p class="sure" @click="handleSearch">{{$t('filter.submit')}}</p>
    </div>
  </div>
</template>

<script>
import filterMixin from '@/commom/mixins/filterMixin'
import NoData from '@/components/NoData'
export default {
  name: 'FilterBox',
  mixins: [filterMixin],
  props: {
    filterData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  components: {
    NoData
  },
  data() {
    return {
      input: ''
    }
  },
  created() {
    console.log(this.filterData.length)
  },
  methods: {
    // close
    handleHiddenBox() {
      this.$emit('handleHiddenBox')
    },
    // 重置
    handleReset() {
      setTimeout(() => {
        this.$emit('handleSearchBox', null)
      }, 100)
    },
    // 确定
    handleSearch() {
      let arr = {}
      for (let item of this.filterData) {
        arr[item.DisplayName] = item.inputValue
      }
      this.$emit('handleSearchBox', arr)
    }
  },

  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/commom/scss/filterBox/index.scss";
  .nodata{
    width: 100%;
    height: 100%;
  }
</style>
