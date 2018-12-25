<template>
    <div class="container">
      <div class="header">
        <p class="svg-box" @click="back"><svg-icon icon-class="back"/></p>
        <div class="title">报表</div>
        <p @click="handleClickFilter" class="home-header-filter">
          <svg-icon icon-class="filter" />
          <span class="filter-text">{{$t('home.filter')}}</span>
        </p>
      </div>
      <div class="wrapper"></div>
    </div>
</template>

<script>
export default {
  name: 'detail',
  methods: {
    handleClickFilter() {},
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../../commom/scss/mixin";
  @import "../../../../commom/scss/varible";
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: space-between;
      @include border-bottom-1px($borderBottom);
      padding: 0 10px;
      .svg-box{
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .title {
        text-align: center;
        line-height: 44px;
      }
      .home-header-filter {
        color: $mainColor;
        line-height: 44px;
        .filter-text {
          font-size: 1rem;
        }
      }
    }
    .wrapper{
      flex: 1 0 auto;
    }
  }
</style>
