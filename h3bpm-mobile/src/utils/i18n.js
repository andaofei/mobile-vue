export function generateTitle(title) {
  const hasKey = this.$t('filter.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('filter.' + title)

    return translatedTitle
  }
  return title
}
