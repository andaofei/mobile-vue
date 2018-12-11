<template>
    <div class="home-settings">
      <sys-setting></sys-setting>
      <!--注销-->
      <div class="log-out" @click="logOut">{{$t('logout.title')}}</div>
    </div>
</template>

<script>
import SysSetting from '@/components/SysSetting'
import { MessageBox } from 'mint-ui'
export default {
  name: 'HomeSetting',
  data() {
    return {
      tip: '%{logout} title'
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
          this.$store.dispatch('FedLogOut').then(() => {
            location.reload()
          })
        })
        .catch(() => {
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
    background:$baseColor ;
    cursor: pointer;
  }
</style>
