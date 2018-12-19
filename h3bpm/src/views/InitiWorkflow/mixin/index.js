import BtScroll from '@/components/BtScroll/index'
const InitWorkflowMixin = {
  data() {
    return {
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      listenScroll: true,
      activeClass: 'activeClass',
      activeClass2: 'activeClass2',
      activeClass3: 'activeClass3'
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.pullingUp = true
    this.$store.dispatch('getWorkFlowLst')
  },
  methods: {
    handleClickSelect() {},
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
    workFlowLst() {
      return this.$store.getters.workFlowLst
    }
  },
  components: {
    BtScroll
  }
}
export default InitWorkflowMixin
