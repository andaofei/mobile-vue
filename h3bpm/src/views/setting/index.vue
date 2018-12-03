<template>
  <div class="setting-com">
    <div class="setting-header">
      <p @click="back">
        <svg-icon icon-class="back"/>
      </p>

      <p class="title">{{$t('setting.title')}}</p>

      <p class="sure" @click="sureIp">{{$t('setting.sure')}}</p>
    </div>
    <sys-setting></sys-setting>
  </div>
</template>

<script>
import SysSetting from '@/components/SysSetting'
import {validateIp} from '@/utils/validate'
export default {
  name: 'setting',
  data() {
    return {
    }
  },
  methods: {
    back() {
      this.$router.history.go(-1)
    },
    sureIp() {
      console.log(this.$store.getters.ipPath)
      const ip = this.$store.getters.ipPath
      if (!ip) {
        return false
      }
      if (ip) {
        if (!validateIp(ip)) {
          console.log(false)
        } else {
          console.log(true)
        }
      }
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
      padding: 14px 10px;
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
