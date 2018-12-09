<template>
  <div class="setting-container">
    <div class="item">
      <span>{{$t('setting.currentVersion')}}</span>
      <span class="right">{{version}}</span>
    </div>

    <div class="item">
      <span>{{$t('setting.domainName')}}</span>
      <p class="right">
        <input type="text" v-model="ipPath" placeholder="" maxlength="16" @click="changeIp" autofocus="autofocus">
      </p>
    </div>

    <div class="item" @click="changeLang">
      <span>{{$t('setting.switchLanguage')}}</span>
      <span class="right" v-html="language==='en'?'English':'中文'"></span>
    </div>

    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
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
      return this.$store.getters.language
    },
    ipPath: {
      get() {
        return this.$store.getters.ipPath
      },
      set(value) {
        this.$store.commit('updateIp', value)
      }
    }
  },
  methods: {
    changeLang() {
      this.sheetVisible = true
    },
    selectZh() {
      this.setLang('zh')
    },
    selectEh() {
      this.setLang('en')
    },
    setLang(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
    },
    changeIp() {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";

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
        color: $settingColor;
        input {
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
