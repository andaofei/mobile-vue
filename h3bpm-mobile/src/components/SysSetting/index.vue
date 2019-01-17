<template>
  <div >
    <div class="setting-header">
      <p @click="back" class="svg-box">
        <svg-icon icon-class="left"/>
        <span>{{$t('home.back')}}</span>
      </p>

      <p class="title">{{$t('setting.title')}}</p>

      <!--<p class="sure" @click="sureIp">{{$t('setting.sure')}}</p>-->
      <p class="sure" @click="sureIp"></p>
    </div>
    <div class="setting-container">
    <div class="item">
      <span>{{$t('setting.currentVersion')}}</span>
      <span class="right">{{version}}</span>
    </div>

    <!--<div class="item">-->
      <!--<span>{{$t('setting.domainName')}}</span>-->
      <!--<p class="right">-->
        <!--<input type="text" v-model="ipPath" placeholder="" maxlength="16" autofocus="autofocus">-->
      <!--</p>-->
    <!--</div>-->

    <div class="item" @click="changeLang">
      <span>{{$t('setting.switchLanguage')}}</span>
      <span class="right" v-html="language==='en_us'?'English':'中文'"></span>
    </div>

    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
  </div>
</template>

<script>
import {validateIp} from '@/utils/validate'
import Cookies from 'js-cookie'
import { Toast } from 'mint-ui'
export default {
  name: 'sys',
  data() {
    return {
      version: 'v2.0',
      sheetVisible: false,
      actions: [
        {name: '中文', method: this.selectZh},
        {name: 'English', method: this.selectEh}
      ]
    }
  },
  computed: {
    language() {
      console.log(this.$store.getters.language.toLowerCase())
      return this.$store.getters.language
    },
    ipPath: {
      get() {
        return this.$store.getters.ipPath
      },
      set(value) {
        this.$store.commit('UP_DATE_IP', value)
      }
    }
  },
  methods: {
    changeLang() {
      this.sheetVisible = true
    },
    selectZh() {
      this.setLang('zh_cn')
    },
    selectEh() {
      this.setLang('en_us')
    },
    setLang(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
    },
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
            message: this.$t('setting.IpError'),
            iconClass: 'icon el-icon-info'
          })
          setTimeout(() => {
            instance.close()
          }, 2000)
        } else {
          Cookies.set('sysIp', ip)
          let instance = Toast({
            message: this.$t('setting.success'),
            iconClass: 'icon el-icon-success'
          })
          setTimeout(() => {
            instance.close()
          }, 2000)
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
  .setting-header {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    background: $baseColor;
    line-height: 44px;
    @include border-bottom-1px($borderBottom);
    .svg-box{
      color: $mainColor;
    }
    .title, .sure {
      font-size: $font-size-medium-x;
    }
    .sure {
      color: $mainColor;
      width: 50px;
    }
  }
  .setting-container {
    background: $baseColor;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 12px 10px;
      @include border-bottom-1px($borderBottom);
      font-size: $font-size-medium;
      line-height: 20px;
      .right {
        color: $textColor;
        input {
          text-align: right;
          font-size: $font-size-medium;
          border: 0;
          outline: none;
          line-height: 20px;
          color: $textColor;
        }
      }
    }
  }
</style>
