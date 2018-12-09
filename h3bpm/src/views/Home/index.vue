<template>
    <div class="home-container">
      <div class="home-title">h3bpm</div>
      <div class="home-navbar">
        <router-link
          :to="{ path: '/dashboard/todolist' }">
          <span>待办</span>
        </router-link>
        <router-link
          :to="{ path: '/dashboard/todolist' }">
          <span>待办</span>
        </router-link>
        <router-link
          :to="{ path: '/dashboard/todolist' }">
          <span>待办</span>
        </router-link>
        <router-link
          :to="{ path: '/dashboard/todolist' }">
          <span>待办</span>
        </router-link>
      </div>
      <div class="home-box">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.home-container{
  position: absolute;
  width: 100%;
  height: 100%;
  .home-box{
    width: 100%;
    height: 400px;
  }
}
</style>
