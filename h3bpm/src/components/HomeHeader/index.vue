<template>
  <div class="home-header">
    <p @click="handleClickSetting" class="home-header-setting">
      <svg-icon icon-class="setting" />
      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </p>
    <p class="home-header-logo">
      <img src="../../../static/images/logoTab.svg" alt="" >
    </p>
    <p @click="handleClickFilter" class="home-header-filter">
      <svg-icon icon-class="filter" />
      <span class="filter-text">筛选</span>
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
    handleClickFilter() {}
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
  padding: 12px;
  @include border-bottom-1px($borderBottom);
  .home-header-setting{
    line-height: 20px;
  }
  .home-header-filter{
    color: $mainColor;
    line-height: 20px;
    .filter-text{
      font-size: 1rem;
    }
  }
  .home-header-logo{
    width: 90px;
    height: 20px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
