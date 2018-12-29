/**
 * Created by 23535 on 2018/6/20.
 */
export const roleMixin = {
  data() {
    return {
      tHeight: 400,
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth
    }
  },

  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.documentElement.clientHeight
        window.screenWidth = document.documentElement.clientWidth
        that.screenHeight = window.screenHeight
        that.screenWidth = window.screenWidth
      })()
    }
  },

  watch: {
    screenHeight(val) {
      const that = this
      that.screenHeight = val
      that.tHeight = that.screenHeight - 230
    },
    screenWidth(val) {
      const that = this
      that.screenWidth = val
    }
  }
}
