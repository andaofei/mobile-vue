<template>
  <div class="workflow">
    <div class="header">
      <span>&nbsp;&nbsp;</span>
      <div class="title">{{$t('myWorkFlow.name')}}</div>
      <p @click="handleClickFilter" class="home-header-filter">
        <svg-icon icon-class="filter" />
        <span class="filter-text">{{$t('home.filter')}}</span>
      </p>
    </div>
    <div class="container">
      <div class="container-box">
        <div class="container-nav">
          <router-link  tag="div" class="nav-item" :to="{ path: '/myworkflow/doing'}">
            <div class="navbar-item">
              <el-badge :value="listCounts" class="item">
                <span>{{$t('myWorkFlow.ongoing')}}</span>
              </el-badge>
            </div>
          </router-link>
          <router-link tag="div" class="nav-item" :to="{ path: '/myworkflow/done'}">
            <div class="navbar-item">
              <span>{{$t('myWorkFlow.completed')}}</span>
            </div>
          </router-link>
          <router-link tag="div" class="nav-item" :to="{ path: '/myworkflow/cancel'}">
            <div class="navbar-item">
              <span>{{$t('myWorkFlow.cancelled')}}</span>
            </div>
          </router-link>
        </div>
        <div class="container-list">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!--筛选-->
    <transition :name="transitionName">
      <div class="filter-box" v-show="filterShow" >
        <div class="filter-left" @click="handleHiddenBox">
        </div>
        <FilterBox @handleHiddenBox="handleHiddenBox" @handleSearch="handleSearch"></FilterBox>
      </div>
    </transition>
  </div>
</template>

<script>
import FilterBox from './components/FilterBox'
export default {
  name: 'MyWorkflow',
  data() {
    return {
      filterShow: false,
      transitionName: 'slide-fade'
    }
  },
  methods: {
    handleClickFilter() {
      this.filterShow = !this.filterShow
    },
    handleHiddenBox() {
      this.filterShow = false
    },
    handleSearch() {
      console.log('search')
    }
  },
  computed: {
    listCounts() {
      return this.$store.getters.listCounts
    }
  },
  components: { FilterBox }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
  .workflow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: space-between;
      @include border-bottom-1px($borderBottom);
      padding: 0 10px;
      .title {
        text-align: center;
        line-height: 44px;
      }
      .home-header-filter{
        color: $textColor3;
        line-height: 44px;
        .filter-text{
          font-size: 1rem;
        }
      }
    }
    .container{
      flex: 1 0 auto;
      position: relative;
      .container-box{
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        display: flex;
        flex-direction: column;
        .container-nav{
          display: flex;
          @include border-bottom-1px($borderBottom);
          .nav-item{
            display: flex;
            text-align: center;
            flex: 1;
            font-size: 14px;
            padding: 11px 0;
            color: $textColor;
            .item {
              span {
                font-size: 14px;
                padding: 0 7px;
              }
            }
          }
          .navbar-item{
            display: block;
            width: 100%;
          }
          .nav-item:nth-child(2) {
            & .navbar-item {
              border-left: 0.5px solid $borderBottom;
            }
          }
          .nav-item:nth-child(3) {
            & .navbar-item {
              border-left: 0.5px solid $borderBottom;
            }
          }
          .router-link-active{
            color: $textColor3;
            border-bottom: 2px solid $mainColor;
          }
        }
        .container-list{
          flex: 1 0 auto;
          position: relative;
        }
      }
    }
    .filter-box{
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top:0;
      background: rgba(0,0,0,.4);
      z-index: 99;
      display: flex;
      .filter-left{
        flex:0 0 55px;
      }
    }
  }
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(300px);
    opacity: 0;
  }
</style>
