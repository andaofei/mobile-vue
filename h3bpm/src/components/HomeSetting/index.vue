<template>
    <div class="home-settings">
      <sys-setting></sys-setting>
      <!--注销-->
      <div class="log-out" @click="logOut">注销</div>
    </div>
</template>

<script>
import SysSetting from '@/components/SysSetting'
export default {
  name: 'HomeSetting',
  methods: {
    logOut() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
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
