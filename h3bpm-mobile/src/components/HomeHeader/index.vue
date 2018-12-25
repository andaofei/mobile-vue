<template>
  <div class="home-header">
    <p @click="handleClickSetting" class="home-header-setting">
      <span class="svg-box"><svg-icon icon-class="setting" /></span>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </p>
    <p class="home-header-logo">
      <img src="../../../static/images/logoTab.svg" alt="" >
    </p>
    <p @click="handleClickFilter" class="home-header-filter">
      <svg-icon icon-class="filter" />
      <span class="filter-text">{{$t('home.filter')}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  methods: {
    handleClickSetting() {
      this.$router.push('/homeSetting')
    },
    // 点击筛选
    handleClickFilter() {
      const name = this.$route.meta
      const path = this.$route.path
      this.$store.commit('SET_FILTER_SHOW', {status: true, inner: name, path: path})
      console.log(this.$route)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
.home-header{
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  @include border-bottom-1px($borderBottom);
  .home-header-setting {
    line-height: 44px;
    .svg-box {
      color: $textColor2;
    }
  }
  .home-header-filter{
    color: $textColor2;
    line-height: 44px;
    .filter-text{
      font-size: 1rem;
    }
  }
  .home-header-logo{
    width: 100px;
    height: 18px;
    line-height: 44px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
