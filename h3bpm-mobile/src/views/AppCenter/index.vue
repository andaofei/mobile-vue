<template>
  <div class="app-center">
    <div class="header">
      <div class="title">{{$t('appCenter.name')}}</div>
    </div>
    <div class="container">
      <BtScroll class="tag-scroll"
                ref="userList"
                @scroll="scroll"
                @refresh="refresh"
                @beforeScroll="listScroll"
                :probe-type="probeType"
                :listenScroll="listenScroll"
                :pullingUp="pullingUp"
                :beforeScroll="beforeScroll">
        <ul class="list" v-if="appList && appList.length > 0">
          <li class="item" :key="index" v-for="(item, index) in appList">
            <div class="item-inner" @click="appChild(item)" >
              <p class="img-box">
                <span class="img" :class="[index%2 === 1 ? activeClass : '', index%3 === 1 ? activeClass2 : '', index%4 === 1 ? activeClass3 : '']"></span>
              </p>
              <span class="text">{{item.DisplayName}}</span>
            </div>
          </li>
        </ul>
        <div v-else class="noApp">
          <p class="svg-box" ><svg-icon icon-class="empty-box"/></p>
          <p class="text">{{$t('appCenter.noData')}}</p>
        </div>
      </BtScroll>
    </div>
  </div>
</template>

<script>
import appCenterMixin from '@/commom/mixins/appCenterMixin'
import {setAppName} from '@/utils/auth'
export default {
  name: 'AppCenter',
  mixins: [appCenterMixin],
  data() {
    return {
    }
  },
  created() {
    let options = {
      appCode: '',
      t: Math.random()
    }
    this.$store.dispatch('getAppList', options)
  },
  methods: {
    appChild(item) {
      this.$router.push({
        path: '/appcenter/child'
      })
      setAppName({name: item.DisplayName, code: item.AppCode})
    }
  },
  computed: {
    appList() {
      return this.$store.getters.appList
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";

  .app-center {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      text-align: center;
      @include border-bottom-1px($borderBottom);
      padding: 0 10px;
      .title {
        text-align: center;
        line-height: 44px;
      }
    }
    .container {
      flex: 1 0 auto;
      position: relative;
      .tag-scroll {
        padding-top: 20px;
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .list{
          display: flex;
          flex-wrap: wrap;
          .item{
            width: 25%;
            padding: 10px;
            .item-inner{
              display: flex;
              flex-direction: column;
              .img-box{
                text-align: center;
                .img{
                  width: 3.5rem;
                  height: 3.5rem;
                  display: inline-block;
                  border-radius: 10px;
                  background: url(./imgs/yingyong.svg) $blueColor no-repeat center;
                  background-size: 60% 60%;
                }
              }
              .text{
                text-align: center;
                color: $textColor2;
                font-size: 14px;
                line-height: 28px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .activeClass{
                background-color: $mainColor!important;
              }
              .activeClass1{
                background-color: $warningColor!important;
              }
              .activeClass2{
                background-color: $redColor!important;
              }
            }
          }
        }
      }
    }
    .noApp{
      width:100%;
      height: 100px;
      text-align: center;
      padding-top: 30px;
      .svg-box{
       font-size: 3rem;
      }
      .text{
        font-size: 14px;
        line-height: 24px;
        color: $textColor2;
      }
    }
  }
</style>
