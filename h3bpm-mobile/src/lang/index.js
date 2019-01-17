import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import Cookies from 'js-cookie'
import store from 'store'
import enLocale from './en'
import zhLocale from './zh'
import Chinese from './scrollLang/chinese'
import English from './scrollLang/english'

Vue.use(VueI18n)

const messages = {
  en_us: {
    ...enLocale,
    ...English
  },
  zh_cn: {
    ...zhLocale,
    ...Chinese
  }
}

const i18n = new VueI18n({
  // set locale
  locale: store.get('H3.Language') || 'zh_cn',
  messages
})

export default i18n
