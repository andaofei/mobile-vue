<template>
  <div class="footer">
    <p>版本号：18.11.1-BETA</p>
    <p>Powered by BPM</p>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../commom/scss/varible";
.footer{
  padding: 0 0 20px 0;
  text-align: center;
  p{
    color: $dark_gray;
    font-size: $font-size-small;
    line-height: 1rem;
    font-family: $base-family;
  }
}
</style>
