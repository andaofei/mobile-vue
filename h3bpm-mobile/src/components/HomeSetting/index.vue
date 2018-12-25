<template>
    <div class="home-settings">
      <sys-setting></sys-setting>
      <div class="item">
        <span>{{$t('setting.userName')}}</span>
        <span class="right">{{userName}}</span>
      </div>
      <!--注销-->
      <div class="log-out" @click="logOut">{{$t('logout.title')}}</div>
    </div>
</template>

<script>
import SysSetting from '@/components/SysSetting'
import { MessageBox } from 'mint-ui'
import {getUserInfo} from '@/utils/auth'
export default {
  name: 'HomeSetting',
  data() {
    return {
      tip: '%{logout} title',
      userName: getUserInfo().name || '无'
    }
  },
  methods: {
    logOut() {
      MessageBox.confirm('', {
        title: this.$t('logout.tip'),
        message: this.$t('logout.config'),
        confirmButtonText: this.$t('logout.determine'),
        cancelButtonText: this.$t('logout.cancel'),
        showCancelButton: true
      })
        .then(action => {
          // 后台注销
          this.$store.dispatch('LogoutSys')
            .then(() => {
              location.reload()
            })
            .catch((error) => {
              console.log(error)
              // 前端登出
              this.$store.dispatch('FedLogOut').then(() => {
                location.reload()
              })
            })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  components: {
    SysSetting
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
  .home-settings{
    width: 100%;
    height: 100%;
    background: $bg2;
  }
  .log-out{
    margin-top: 20px;
    line-height: 44px;
    text-align: center;
    color: $mainColor;
    font-size: 1rem;
    background:$baseColor;
    cursor: pointer;
  }
  .item {
    display: flex;
    background:$baseColor;
    justify-content: space-between;
    padding: 12px 10px;
    @include border-bottom-1px($borderBottom);
    font-size: $font-size-medium;
    line-height: 20px;
    .right {
      color: $textColor;
      input {
        text-align: right;
        font-size: $font-size-medium;
        border: 0;
        outline: none;
        line-height: 20px;
        color: $textColor;
      }
    }
  }
</style>
