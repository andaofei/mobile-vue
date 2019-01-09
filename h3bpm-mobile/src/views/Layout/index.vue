<template>
    <div class="layout-container">
      <!--主视图-->
      <div class="layout-box">
        <router-view :key="key"/>
      </div>
      <!--底部-->
      <NavBar class="nav-bar"></NavBar>
      <!--筛选-->
      <transition :name="transitionName">
        <div class="filter-box" v-show="filterShow" >
          <div class="filter-left" @click="handleHiddenBox">
          </div>
          <FilterBox @handleHiddenBox="handleHiddenBox"></FilterBox>
        </div>
      </transition>
    </div>
</template>

<script>
import NavBar from './components/NavBar'
import FilterBox from '@/components/FilterBox'
export default {
  name: 'Layout',
  data() {
    return {
      show: true,
      transitionName: 'slide-fade'
    }
  },

  methods: {
    // 隐藏筛选
    handleHiddenBox() {
      const name = {
        title: ''
      }
      this.$store.commit('SET_FILTER_SHOW', {status: false, inner: name})
    }
  },

  computed: {
    filterShow() {
      return this.$store.getters.filterShow
    },
    cachedViews() {
      return true
    },
    key() {
      return this.$route.fullPath
    }
  },
  components: { NavBar, FilterBox }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.layout-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .layout-box{
    position: relative;
    flex: 1 1 auto;
  }
  .nav-bar{
    height: 50px;
    width: 100%;
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
