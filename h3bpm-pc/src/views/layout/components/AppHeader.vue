<template>
  <div class="app-header">
    <div :class="{'activeOpen': sidebar.opened}" class="logo">logo</div>
    <div class="app-menu">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
      <div class="app-inner">
        <div class="app-inner-box">
          <div class="menu-list">
            <ul>
              <li>
                <router-link to="/dashboard">流程中心</router-link>
              </li>
              <li>
                <router-link to="/myprocess">报表中心</router-link>
              </li>
            </ul>
          </div>
          <span class="new-solid">
            <span>&nbsp;</span>
          </span>
          <div class="logout-box">
            <el-dropdown class="avatar-container right-menu-item" trigger="click">
              <div class="avatar-wrapper">
                <span class="user-avatar"><img :src="avatar+'?imageView2/1/w/80/h/80'" ></span>
                <span class="user-name">张三</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/">
                  <el-dropdown-item>
                    {{ $t('navbar.dashboard') }}
                  </el-dropdown-item>
                </router-link>
                <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
                  <el-dropdown-item>
                    {{ $t('navbar.github') }}
                  </el-dropdown-item>
                </a>
                <el-dropdown-item divided>
                  <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
export default {
  name: 'Index',
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-header{
  display: flex;
  height: 100%;
  line-height: 64px;
  box-shadow:0 2px 8px 0 rgba(30,85,255,0.1);
  .activeOpen{
    width: 180px!important;
  }
  .logo{
    width: 36px;
  }
  .app-menu{
    flex: 1 0 auto;
    display: flex;
    .app-inner{
      position: relative;
      display: flex;
      flex: 1 0 auto;
      height: 100%;
      .app-inner-box{
        flex: 1 0 auto;
        display: flex;
        justify-content: flex-end;
        .menu-list{
          padding-right: 20px;
          ul{
            display: flex;
            li{
              padding: 0 10px;
              height: 64px;
              /*border-bottom: 2px solid #2970FF;*/
            }
          }
          .router-link-active{
            border-bottom: 2px solid #2970FF;
            color: #2970FF;
          }
        }
        .new-solid{
          display: flex;
          flex-direction: column;
          justify-content: center;
          span{
            border-left:1px solid rgba(234,237,243,1);
            line-height: 30px
          }
        }
        .avatar-container {
          height: 64px;
          padding:0 20px;
          .avatar-wrapper {
            height: 100%;
            display: flex;
            .user-avatar {
              cursor: pointer;
              display: flex;
              flex-direction: column;
              justify-content: center;
              img{
                width: 32px;
                height: 32px;
                border-radius: 50%;
              }
            }
            .user-name{
              padding: 0 10px;
            }
            .el-icon-caret-bottom {
              cursor: pointer;
              position: absolute;
              right: -20px;
              top: 25px;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
