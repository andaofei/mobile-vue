import {mapMutations} from 'vuex'
import {getBaseUrl} from '@/utils/auth'
import BtScroll from '@/components/BtScroll/index'
import FilterBox from '@/views/AppCenter/components/FilterBox'
const appCenterMixin = {
  data() {
    return {
      baseUrl: getBaseUrl(),
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      activeClass: 'activeClass',
      activeClass2: 'activeClass2',
      activeClass3: 'activeClass3',
      transitionName: 'slide-fade'
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
    BtScroll,
    FilterBox
  }
}
export default appCenterMixin
