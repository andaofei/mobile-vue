<template>
<div class="nav-container">
  <router-link
    :to="{ path: '/dashboard' }">
    <span>首页中心</span>
  </router-link>
  <router-link
    :to="{ path: '/process' }">
    <span>发起流程</span>
  </router-link>
  <router-link
    :to="{ path: '/dashboard' }">
    <span>我的流程</span>
  </router-link>
  <router-link
    :to="{ path: '/dashboard' }">
    <span>应用中心</span>
  </router-link>
</div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.nav-container{
  width: 100%;
  display: flex;
  a{
    flex: 1;
    text-align: center;
  }
}
</style>
