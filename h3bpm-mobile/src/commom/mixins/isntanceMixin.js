import {mapMutations} from 'vuex'
import {getUserInfo} from '@/utils/auth'
import { ERR_OK } from '@/api/options/statusCode'
const getInstanceMixin = {
  methods: {
    ...mapMutations({
      setCounts: 'SET_INSTANCE_COUNT',
      setInstanceOptions: 'SET_FILTER_OPTIONS'
    }),

    // 进行中数量
    getDoingCounts() {
      let options = {
        status: 2,
        userId: getUserInfo().id
      }
      this.$store.dispatch('getDoingCounts', options)
        .then((res) => {
          if (res.code === ERR_OK) {
            this.setCounts(res.data.TotalCount)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    initDoingList() {
      let options = {
        status: 2,
        userId: getUserInfo().id
      }
      this.loadingShow = true
      this.$store.dispatch('getInstanceDoing', options)
        .then((res) => {
          this.loadingShow = false
          if (res.code === ERR_OK) {
            this.setCounts(res.data.TotalCount)
          }
        })
        .catch(() => {
          this.loadingShow = false
        })
    },

    initCancelList() {
      let options = {
        status: 5,
        userId: getUserInfo().id
      }
      this.loadingShow = true
      this.$store.dispatch('getInstanceDoing', options)
        .then((res) => {
          this.loadingShow = false
        })
        .catch(() => {
          this.loadingShow = false
        })
    },

    initDoneList() {
      let options = {
        status: 4,
        userId: getUserInfo().id
      }
      this.loadingShow = true
      this.$store.dispatch('getInstanceDoing', options)
        .then((res) => {
          this.loadingShow = false
        })
        .catch(() => {
          this.loadingShow = false
        })
    }
  },
  computed: {
    instanceList() {
      return this.$store.getters.instanceList
    },
    instanceOptions() {
      return this.$store.getters.instanceOptions
    }
  }
}
export default getInstanceMixin
