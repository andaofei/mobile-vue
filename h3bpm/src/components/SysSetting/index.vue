<template>
  <div class="setting-container">
    <div class="item">
      <span>当前版本</span>
      <span class="right">v2.0</span>
    </div>
    <div class="item">
      <span>IP/域名</span>
      <p class="right">
        <input type="text" v-model="ipPath" placeholder="" maxlength="16">
      </p>
    </div>
    <div class="item">
      <span>切换语言</span>
      <span class="right">中文</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sys',
  data () {
    return {
      ipPath: '1212121212121'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
  .setting-container{
    background: $baseColor;
  .item{
    display: flex;
    justify-content: space-between;
    padding: 10px;
  @include border-bottom-1px($borderBottom);
    font-size: $font-size-medium;
    line-height: 20px;
  .right{
    color: $settingColor;
  input{
    text-align: right;
    font-size: $font-size-medium;
    border: 0;
    outline: none;
    line-height: 20px;
    color: $settingColor;
  }
  }
  }
  }
</style>
