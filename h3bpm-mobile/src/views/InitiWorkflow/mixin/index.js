import BtScroll from '@/components/BtScroll/index'
import {initSelfWorkflow} from '@/api/loadWorkFlows'
import { ERR_OK } from '@/api/options/statusCode'
import {isDingtalk} from '@/utils/dingoptions'
import dingtalk from 'dingtalk-javascript-sdk'
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
    handleClickSelect(item, index) {
      console.log(item, index)
      this.initSelfWork(item)
    },
    // 发起流程
    initSelfWork(data) {
      const options = {
        WorkflowCode: data.WorkflowCode,
        PageAction: 'Close'
      }
      return new Promise((resolve, reject) => {
        initSelfWorkflow(options).then(res => {
          if (res.code === ERR_OK) {
            // const urls = this.baseUrl + res.data
            // const urls = `http://` + this.baseUrl + res.data
            const urls = `http://192.168.7.48:8080` + res.data
            // this.src = urls
            if (isDingtalk) {
              dingtalk.ready(function() {
                const dd = dingtalk.apis
                dd.biz.util.openLink({
                  url: urls + `&loginfrom=dingtalk`,
                  onSuccess: function(result) {
                  },
                  onFail: function(err) {
                    console.log(err)
                  }
                })
              })
            } else {
              window.location.href = urls
            }
          }
          resolve(res)
        }).catch(error => {
          reject(error)
          this.loadingShow = false
        })
      })
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
