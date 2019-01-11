import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import enLocale from './en'
import zhLocale from './zh'
import Chinese from './scrollLang/chinese'
import English from './scrollLang/english'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...English
  },
  zh: {
    ...zhLocale,
    ...Chinese
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh
  locale: Cookies.get('language') || 'zh',
  messages
})

export default i18n
