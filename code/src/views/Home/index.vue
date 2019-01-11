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
            :to="{path: '/dashboard/todolist'}">
            <div class="navbar-item">
              <el-badge :value="todoCounts" class="item">
                <span>{{$t('home.TodoList')}}</span>
              </el-badge>
            </div>
          </router-link>
          <router-link
            tag="div"
            class="nav-item"
            :to="{ path: '/dashboard/toberead'}">
            <div class="navbar-item">
              <el-badge :value="toReadCounts" class="item">
                <span>{{$t('home.TobeRead')}}</span>
              </el-badge>
            </div>
          </router-link>
          <router-link
            tag="div"
            class="nav-item"
            :to="{ path: '/dashboard/alldone' }">
            <div class="navbar-item">
                <span>{{$t('home.DoedMatter')}}</span>
            </div>
          </router-link>
          <router-link
            tag="div"
            class="nav-item"
            :to="{ path: '/dashboard/read' }">
            <div class="navbar-item">
                <span>{{$t('home.ReadItem')}}</span>
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
        {
          name: '待办',
          path: '/dashboard/todolist',
          counts: 0,
          id: 0
        },
        {
          name: '待阅',
          path: '/dashboard/toberead',
          counts: 0,
          id: 1
        },
        {
          name: '已办',
          path: '/dashboard/alldone',
          counts: '',
          id: 2
        },
        {
          name: '已阅',
          path: '/dashboard/read',
          counts: '',
          id: 3
        }
      ]
    }
  },
  methods: {
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
        color: $textColor3;
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
