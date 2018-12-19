<template>
    <div class="InitWorkflow">
      <div class="header">
        <div class="title">发起流程</div>
        <div class="input-box">
          <el-input
            size="small"
            placeholder="搜索"
            clearable
            @input="handleSearch"
            v-model="inputValue">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="behavior">
          <router-link tag="div" class="nav-item" :to="{ path: '/initworkflow/hist' }">常用</router-link>
          <router-link tag="div" class="nav-item right-item" :to="{ path: '/initworkflow/all' }">全部</router-link>
        </div>
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
export default {
  name: 'InitWorkflow',
  data() {
    return {
      inputValue: ''
    }
  },

  methods: {
    handleSearch() {
      // console.log(this.searchList)
      // console.log(this.workFlowLst)
      let articlesArray = this.searchList
      let searchString = this.inputValue

      if (!searchString) {
        return articlesArray
      }

      articlesArray = articlesArray.filter(function(item) {
        if (item.DisplayName.toLowerCase().indexOf(searchString) !== -1) {
          return item
        }
      })
      // this.$store.dispatch('setWorkFlowLst', articlesArray)
      console.log(articlesArray, 'articlesArray')
    }
  },

  computed: {
    searchList() {
      return this.$store.getters.searchList
    },
    workFlowLst() {
      return this.$store.getters.workFlowLst
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
  .InitWorkflow{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header{
      .title{
        text-align: center;
        line-height: 44px;
        @include border-bottom-1px($borderBottom);
      }
    .input-box {
      padding: 10px;
    }
      .behavior{
        display: flex;
        padding: 10px;
        @include border-bottom-1px($borderBottom);
        .nav-item{
          flex: 1;
          text-align: center;
          line-height: 20px;
        }
        .right-item{
          border-left: 1px solid #eee;
        }
      }
    }
    .container{
      flex: 1 0 auto;
      position: relative;
    }
  }
  .router-link-active{
    color: $mainColor;
  }
</style>
