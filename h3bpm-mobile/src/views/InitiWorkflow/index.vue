<template>
    <div class="InitWorkflow">
      <div class="header">
        <div class="title">{{$t('startWork.name')}}</div>
        <div class="input-box">
          <el-input
            size="small"
            :placeholder="text"
            clearable
            @input="handleSearch"
            v-model="inputValue">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="behavior">
          <router-link tag="div" class="nav-item" :to="{ path: '/initworkflow/hist' }">{{$t('startWork.favorite')}}</router-link>
          <router-link tag="div" class="nav-item right-item" :to="{ path: '/initworkflow/all' }">{{$t('startWork.all')}}</router-link>
        </div>
      </div>
      <div class="container">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </div>
</template>

<script>
import InitWorkflowMixin from './mixin'
export default {
  name: 'InitWorkflow',
  mixins: [InitWorkflowMixin],
  data() {
    return {
      inputValue: '',
      text: this.$t('startWork.search')
    }
  },

  computed: {
    searchList() {
      return this.$store.getters.searchList
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
