<template>
    <div class="wrapper">
      <div class="sheet-header">
        <p class="back" @click="back"><svg-icon icon-class="left"/>{{$t('home.back')}}</p>
        <p class="title">{{$t('sheet.title')}}</p>
        <p class="sure">&nbsp;&nbsp;&nbsp;&nbsp;</p>
      </div>
      <div v-html="htmlBox" class="wrapper-inner">{{htmlBox}}</div>
      <!--<code>{htmlBox}}</code>-->
    </div>
</template>

<script>
import {getWorkDetail, getWorkUrl} from '@/api/loadWorkFlows'
export default {
  name: 'SheetDetail',
  data() {
    return {
      htmlBox: ''
    }
  },
  created() {
    const data = this.$route.params.data
    this.getData(data)
    this.getWorkUrl(data)
    this.$nextTick().then(() => {
      // $('.a').on('click', function(){
      //   // 接下来看你了
      // })
    })
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getWorkUrl(data) {
      const options = {
        WorkItemID: data.item.ObjectID,
        IsMobile: true
      }
      return new Promise((resolve, reject) => {
        getWorkUrl(options).then(res => {
          console.log(res)
          this.htmlBox = res.data.htmlContent
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
          this.htmlBox = res.data.htmlContent
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  $mainColor: #2970FF; // 主颜色
  $baseColor: #fff;
  $font-size-medium-x: 16px;
  $borderBottom:rgba(232, 232, 232, 1);
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
  }
  #masterContent_divContent{
    /*background: #eee;*/
  }
  .DragContainer{
    color: red;
  }
</style>
