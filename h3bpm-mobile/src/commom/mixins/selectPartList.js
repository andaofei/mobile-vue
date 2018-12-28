import { mapMutations } from 'vuex'
import BtScroll from '@/components/BtScroll/index'
const getPartMixin = {
  data() {
    return {
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      title: '',
      allCheckStatus: false
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.pullingUp = true
  },
  methods: {
    ...mapMutations({
      setAlLChecked: 'SET_ALL_CHECKED_DEPART'
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
  computed: {
  },
  components: {
    BtScroll
  }
}
export default getPartMixin
