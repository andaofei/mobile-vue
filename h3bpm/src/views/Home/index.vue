<template>
    <div class="home-container">
      <!--header-->
      <HomeHeader></HomeHeader>
      <!--navbar-->
      <div class="home-navbar">
        <router-link
          :to="{ path: '/dashboard/todolist' }">
          <span>待办</span>
        </router-link>
        <router-link
          :to="{ path: '/dashboard/todolist' }">
          <span>待阅</span>
        </router-link>
        <router-link
          :to="{ path: '/dashboard/todolist' }">
          <span>已办</span>
        </router-link>
        <router-link
          :to="{ path: '/dashboard/todolist' }">
          <span>已阅</span>
        </router-link>
      </div>
      <!--view-->
      <div class="home-box">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader'
export default {
  name: 'Home',
  components: {
    HomeHeader
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.home-container{
  position: absolute;
  width: 100%;
  height: 100%;
  .home-navbar{
    width: 100%;
    display: flex;
    a{
      flex:1;
      text-align: center;
    }
  }
  .home-box{
    width: 100%;
    height: 400px;
  }
}
</style>
