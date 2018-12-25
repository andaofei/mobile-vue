import {mapMutations} from 'vuex'
const getInstanceMixin = {
  methods: {
    ...mapMutations({
      setCounts: 'SET_INSTANCE_COUNT',
      setInstanceOptions: 'SET_FILTER_OPTIONS'
    })
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
