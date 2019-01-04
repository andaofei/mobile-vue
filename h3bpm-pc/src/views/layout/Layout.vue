<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <div class="app-menu">
      <AppHeader/>
    </div>
    <!--<div class="app-box">-->
    <!--<sidebar class="sidebar-container"/>-->
    <!--<div class="main-container">-->
    <!--&lt;!&ndash;<navbar/>&ndash;&gt;-->
    <!--&lt;!&ndash;<tags-view/>&ndash;&gt;-->
    <!--<app-main/>-->
    <!--</div>-->
    <!--</div>-->
    <div class="app-box-body">
      <sidebar class="sidebar-container"/>
      <div class="box-view">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, AppHeader } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    AppHeader
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    display: flex;
    flex-direction: column;
    .app-menu{
      height: 64px;
    }
    .app-box-body{
      flex: 1 0 auto;
      position: relative;
      display: flex;
    }
    .box-view{
      flex: 1 0 auto;
      position: relative;
    }
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
    .app-box{
      flex: 1 1 auto;
      display: flex;
      position: relative;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
