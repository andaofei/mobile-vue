<template>
  <div class="header">
    <p  @click="back" class="back">
      <svg-icon icon-class="left"/>
      {{$t('appCenter.back')}}
    </p>

    <p class="title">{{childName}}</p>

    <p class="sure">&nbsp;</p>
  </div>
</template>
<script>
export default {
  name: 'AppHeader',
  props: {
    childName: String,
    default: ''
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../../commom/scss/mixin";
  @import "../../../../commom/scss/varible";
  .header {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    background: $baseColor;
    @include border-bottom-1px($borderBottom);
    line-height: 44px;
    .back{
      font-size: 16px;
      line-height: 44px;
      color: $mainColor;
    }
    .title{
      font-size: 16px;
    }
    .sure{
      width: 50px;
    }
  }
</style>
