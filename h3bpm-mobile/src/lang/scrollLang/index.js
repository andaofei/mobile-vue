import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Chinese from './chinese'
import English from './english'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en_us',
  fallbackLocale: 'zh_cn',
  messages: {
    zh_cn: Chinese,
    en_us: English
  }
})
