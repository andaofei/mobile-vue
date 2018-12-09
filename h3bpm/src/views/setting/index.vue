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
import Cookies from 'js-cookie'
import { Toast } from 'mint-ui'
export default {
  name: 'Setting',
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
          let instance = Toast({
            message: 'IP格式有误',
            iconClass: 'icon el-icon-info'
          })
          setTimeout(() => {
            instance.close()
          }, 2000)
        } else {
          Cookies.set('sysIp', ip)
          let instance = Toast({
            message: '设置成功',
            iconClass: 'icon el-icon-success'
          })
          setTimeout(() => {
            instance.close()
          }, 2000)
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
        font-size: $font-size-medium-x;
      }
      .sure {
        color: $mainColor;
      }
    }
  }
</style>
