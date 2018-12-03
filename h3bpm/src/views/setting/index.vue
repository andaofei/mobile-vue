<template>
  <div class="setting-com">
    <div class="setting-header">
      <p @click="back">
        <svg-icon icon-class="back"/>
      </p>
      <p class="title">系统设置</p>
      <p class="sure">确定</p>
    </div>
    <sys-setting></sys-setting>
  </div>
</template>

<script>
import SysSetting from '@/components/SysSetting'
export default {
  name: 'setting',
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.$router.history.go(-1)
    }
  },
  components: {
    'sys-setting': SysSetting
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";

  .setting-com {
    width: 100%;
    height: 100%;
    background: $bg2;
    .setting-header {
      padding: 12px;
      display: flex;
      justify-content: space-between;
      background: $baseColor;
      @include border-bottom-1px($borderBottom);
      .title, .sure {
        font-size: $font-size-medium;
      }
      .sure {
        color: $mainColor;
      }
    }
  }
</style>
