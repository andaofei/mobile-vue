<template>
<div class="nav-container">
  <router-link
    :to="{ path: '/dashboard' }">
    <span class="svg-container">
      <svg-icon icon-class="home" />
    </span>
    <p class="text">首页中心</p>
  </router-link>

  <router-link
    :to="{ path: '/process' }">
    <span class="svg-container">
      <svg-icon icon-class="start" />
    </span>
    <p class="text">发起流程</p>
  </router-link>

  <router-link
    :to="{ path: '/dashboard' }">
    <span class="svg-container">
      <svg-icon icon-class="process" />
    </span>
    <p class="text">我的流程</p>
  </router-link>

  <router-link
    :to="{ path: '/dashboard' }">
    <span class="svg-container">
      <svg-icon icon-class="app" />
    </span>
    <p class="text">应用中心</p>
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
    color: #888;
    display: flex;
    flex-direction: column;
    .svg-container{
      color: #888;
      display: inline-block;
    }
    p{
      font-size: 14px;
    }
  }
  .router-link-active,.router-link-active .svg-container{
    color: #51BC01;
  }
}

</style>
