<template>
  <div class="header">
    <p class="svg-box" @click="back"><svg-icon icon-class="back"/></p>

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
    padding: 14px 10px;
    display: flex;
    justify-content: space-between;
    background: $baseColor;
    @include border-bottom-1px($borderBottom);
    .svg-box{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
