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
                :probe-type="probeType"
                :listenScroll="listenScroll"
                :pullingUp="pullingUp"
                :beforeScroll="beforeScroll"
                @beforeScroll="listScroll">
        <ul class="list" v-if="appList">
          <li class="item" :key="index" v-for="(item, index) in appList">
            <div class="item-inner" @click="appChild(item)" >
              <p class="img-box">
                <!--<img v-lazy="baseUrl + item.IconUrl" class="img" v-if="item.IconUrl"/>-->
                <!--<img v-lazy="index%2 === 1 ? activeClass : img" class="img" />-->
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
import BtScroll from '@/components/BtScroll/index'
export default {
  name: 'AppCenter',
  data() {
    return {
      baseUrl: process.env.BASE_API,
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      img: 'static/images/menu.svg',
      activeClass: 'activeClass',
      activeClass2: 'activeClass2',
      activeClass3: 'activeClass3'
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.pullingUp = true
    let options = {
      appCode: '',
      t: Math.random()
    }
    this.$store.dispatch('getAppList', options)
  },
  methods: {
    appChild(item) {
      this.$router.push({
        // path: '/appcenter/child',
        name: 'AppChild',
        params: {
          name: item.DisplayName,
          code: item.AppCode
        }
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
    appList() {
      return this.$store.getters.appList
    }
  },
  components: {
    BtScroll
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
                  background: url(/static/images/yingyong.svg) $blueColor no-repeat center;
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
