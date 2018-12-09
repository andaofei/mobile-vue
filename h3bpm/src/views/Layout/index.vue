<template>
    <div class="layout-container">
      <div class="layout-box">
        <router-view/>
      </div>
      <NavBar class="nav-bar"></NavBar>
    </div>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  name: 'Layout',
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
    height: 40px;
    width: 100%;
  }
}
</style>
