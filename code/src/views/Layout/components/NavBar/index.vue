<template>
<div class="nav-container">
  <router-link
    tag="div"
    class="nav-item"
    :to="{ path: '/dashboard' }">
    <span class="svg-box">
      <svg-icon icon-class="home" />
    </span>
    <p class="text">{{$t('home.name')}}</p>
  </router-link>

  <router-link
    tag="div"
    class="nav-item"
    :to="{ path: '/initworkflow' }">
    <span class="svg-box">
      <svg-icon icon-class="start" />
    </span>
    <p class="text">{{$t('startWork.name')}}</p>
  </router-link>

  <router-link
    tag="div"
    class="nav-item"
    :to="{ path: '/myworkflow' }">
    <span class="svg-box">
      <svg-icon icon-class="process" />
    </span>
    <p class="text">{{$t('myWorkFlow.name')}}</p>
  </router-link>

  <router-link
    tag="div"
    class="nav-item"
    :to="{ path: '/appcenter' }">
    <span class="svg-box">
      <svg-icon icon-class="app" />
    </span>
    <p class="text">{{$t('appCenter.name')}}</p>
  </router-link>
</div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../../commom/scss/mixin";
@import "../../../../commom/scss/varible";
.nav-container{
  width: 100%;
  display: flex;
  @include border-top-1px($borderBottom);
  .nav-item{
    flex: 1;
    text-align: center;
    color: $textColor;
    display: flex;
    flex-direction: column;
    .svg-box{
      color: $textColor;
      flex: 1;
      line-height: 25px;
      font-size: 18px;
    }
    p{
      font-size: $font-size-medium;
      flex: 1;
      line-height: 20px;
    }
  }
  .router-link-active,.router-link-active .svg-box{
    color: $mainColor;
  }
}

</style>
