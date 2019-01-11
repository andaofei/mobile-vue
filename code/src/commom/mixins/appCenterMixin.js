import {mapMutations} from 'vuex'
import {getBaseUrl} from '@/utils/auth'
import BtScroll from '@/components/BtScroll/index'
const appCenterMixin = {
  data() {
    return {
      baseUrl: getBaseUrl(),
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      activeClass: 'activeClass',
      activeClass2: 'activeClass2',
      activeClass3: 'activeClass3'
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.pullingUp = true
  },
  methods: {
    ...mapMutations({
    }),
    // 下拉
    scroll(pos) {
      // console.log(pos.y)
    },

    //  刷新
    refresh() {
      this.$refs.userList.refresh()
    },

    //  下拉监听
    listScroll() {
      this.$emit('listScroll')
    }
  },
  components: {
    BtScroll
  }
}
export default appCenterMixin
