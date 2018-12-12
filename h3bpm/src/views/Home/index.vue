<template>
    <div class="home-container">
      <div class="home-top">
        <!--header-->
        <HomeHeader></HomeHeader>
        <!--nav-bar-->
        <div class="home-navbar">
          <router-link
            tag="div"
            class="nav-item"
            :to="{ path: '/dashboard/todolist', query: {name: 'TodoList', id: 0}}">
            <div class="navbar-item">
              <el-badge :value="todoCounts" class="item">
                <span>待办</span>
              </el-badge>
            </div>
          </router-link>
          <router-link
            tag="div"
            class="nav-item"
            :to="{ path: '/dashboard/toberead', query: {name: 'TobeRead', id: 1}}">
            <div class="navbar-item">
              <el-badge :value="toReadCounts" class="item">
                <span>待阅</span>
              </el-badge>
            </div>
          </router-link>
          <router-link
            tag="div"
            class="nav-item"
            :to="{ path: '/dashboard/alldone', query: {name: 'AllDone', id: 2} }">
            <div class="navbar-item">
                <span>已办</span>
            </div>
          </router-link>
          <router-link
            tag="div"
            class="nav-item"
            :to="{ path: '/dashboard/read', query: {name: 'Read', id: 3} }">
            <div class="navbar-item">
                <span>已阅</span>
            </div>
          </router-link>
        </div>
      </div>
      <!--view-box-->
      <div class="home-box">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader'
export default {
  name: 'Home',
  data() {
    return {
      routeLists: [
      ]
    }
  },
  computed: {
    todoCounts: {
      get() {
        return this.$store.getters.todoCounts
      }
    },
    toReadCounts: {
      get() {
        return this.$store.getters.toReadCounts
      }
    }
  },
  components: {
    HomeHeader
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
.home-container{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .home-top {
    .home-navbar {
      width: 100%;
      display: flex;
      @include border-bottom-1px($borderBottom);
      a:nth-child(2) {
        & .navbar-item {
          border-left: 0.5px solid $borderBottom;
        }
      }
      .nav-item:nth-child(3) {
        & .navbar-item {
          border-left: 0.5px solid $borderBottom;
          border-right: 0.5px solid $borderBottom;
        }
      }
      .nav-item{
        flex: 1;
        text-align: center;
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
      .router-link-active{
        color: $mainColor;
        border-bottom: 2px solid $mainColor;
      }
    }
  }
  .home-box {
    width: 100%;
    flex: 1 0 auto;
    background: $bg;
    position: relative;
  }
}
</style>
