<template>
    <div class="layout-container">
      <!--主视图-->
      <div class="layout-box">
        <router-view/>
      </div>
      <!--底部-->
      <NavBar class="nav-bar"></NavBar>
      <transition :name="transitionName">
        <div class="filter-box" v-show="filterShow" @click="handleHiddenBox">筛选</div>
      </transition>
    </div>
</template>

<script>
import NavBar from './components/NavBar'

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
      this.$store.commit('SET_FILTER_SHOW', false)
    }
  },
  computed: {
    filterShow() {
      return this.$store.getters.filterShow
    }
  },
  components: { NavBar }
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
    height: 44px;
    width: 100%;
  }
  .filter-box{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    background: rgba(0,0,0,.4);
    z-index: 999;
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
