<template>
  <div class="header">
    <div  @click="back" class="back">
      <p>
        <span class="svg-box">
        <svg-icon icon-class="back"/>
      </span>
      </p>
    </div>

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
      font-size: 14px;
      line-height: 44px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .title{
      font-size: 16px;
    }
  }
</style>
