<template>
    <div class="wrapper">
      <div class="sheet-header">
        <p class="back" @click="back"><svg-icon icon-class="left"/>{{$t('home.back')}}</p>
        <p class="title">{{$t('sheet.title')}}</p>
        <p class="sure">&nbsp;&nbsp;&nbsp;&nbsp;</p>
      </div>
      <!--<div v-html="htmlBox" class="wrapper-inner">-->
        <!--{{htmlBox}}-->
      <!--</div>-->
      <div class="wrapper-inner">
        <div class="iframe-box">
          <!--<iframe :src="src" frameborder="0" style="width: 100%;height: 100%"></iframe>-->
          <iframe id="iframe" style="height: 100%;width: 100%" :src="src" frameborder="0" scrolling="no" @load="test"></iframe>
        </div>
      </div>
    </div>
</template>

<script>
import {getWorkDetail, getWorkUrl} from '@/api/loadWorkFlows'
// import {isDingtalk} from '@/utils/dingoptions'
// import dingtalk from 'dingtalk-javascript-sdk'
// import iFrameResize from 'iframe-resizer'
export default {
  name: 'SheetDetail',
  data() {
    return {
      baseUrl: process.env.BASE_API,
      htmlBox: '',
      src: ''
    }
  },
  created() {
    const data = this.$route.params.data
    this.getWorkUrl(data)
    // this.getData(data)
    this.$nextTick().then(() => {
    })
  },
  methods: {
    test() {
      // iFrameResize({log: true}, '#iframe')
    },
    back() {
      this.$router.go(-1)
    },
    getWorkUrl(data) {
      // const options = {
      //   WorkItemID: data.item.ObjectID
      // }
      const options = data.item.ObjectID
      return new Promise((resolve, reject) => {
        getWorkUrl(options).then(res => {
          console.log(res)
          // const urls = this.baseUrl + res.data
          // this.src = `http://192.168.9.144:8080/ + res.data
          const urls = `http://192.168.9.144:8080` + res.data
          // this.src = urls
          window.location.href = urls
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getData(data) {
      const options = {
        WorkItemID: data.item.ObjectID,
        Mode: 'Work',
        Command: '',
        localLan: 'zh_cn',
        // EditInstanceData: false,
        SheetCode: 'SPortalNoticeManager',
        SchemaCode: '',
        WorkflowCode: ''
        // WorkflowVersion: ''
      }
      return new Promise((resolve, reject) => {
        getWorkDetail(options).then(res => {
          console.log(res)
          // this.htmlBox = res.data.htmlContent
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  $mainColor: #2970FF; // 主颜色
  $baseColor: #fff;
  $font-size-medium-x: 16px;
  $borderBottom:rgba(232, 232, 232, 1);
  .wrapper{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .sheet-header {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    background: $baseColor;
    @include border-bottom-1px($borderBottom);
    .title,
    .back,
    .sure {
      line-height: 44px;
      font-size: $font-size-medium-x;
    }
    .back{
      color: $mainColor;
    }
    .sure {
      color: $mainColor;
    }
  }
  .wrapper-inner{
    width: 100%;
    flex: 1 0 auto;
    position: relative;
    .iframe-box{
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  #masterContent_divContent{
    /*background: #eee;*/
  }
  .DragContainer{
    color: red;
  }
</style>
