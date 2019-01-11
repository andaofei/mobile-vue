import BtScroll from '@/components/BtScroll/index'
import {mapMutations} from 'vuex'
const filterMixin = {
  data() {
    return {
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      input: '',
      value: new Date(),
      endTime: null,
      startTime: null,
      timeStatus: -1,
      errorMsg: false,
      text: this.$t('filter.tip'),
      cancelText: this.$t('filter.cancel'),
      confirmText: this.$t('filter.submit'),
      placeHolder: this.$t('filter.inner'),
      statusList: [
        {
          name: this.$t('filter.yes'),
          id: 2
        },
        {
          name: this.$t('filter.no'),
          id: 1
        },
        {
          name: this.$t('filter.Unlimited'),
          id: 0
        }
      ],
      active: -1,
      IsPriority: ''
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.pullingUp = true
  },
  methods: {
    ...mapMutations({
      setInstanceOptions: 'SET_FILTER_OPTIONS',
      setCounts: 'SET_INSTANCE_COUNT',
      setToDoCounts: 'SET_TODO_COUNTS',
      setToReadCounts: 'SET_TO_READ_COUNTS',
      addOptions: 'ADD_OPTIONS',
      cleanChecked: 'CLEAN_CHECKED_LIST'
    }),
    handleCancel() {
      this.endTime = null
      this.startTime = null
    },

    handleFocus() {
      setTimeout(() => {
        this.refresh()
      }, 100)
    },
    // 打开时间选择
    openPicker(e) {
      this.timeStatus = e
      this.$refs.picker.open()
    },
    // 加急
    handleClickStatus(item, index) {
      this.active = item
      this.IsPriority = item.id
    },
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
export default filterMixin
