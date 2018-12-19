<template>
    <div class="container">
      <app-header/>
      <div class="wrapper">
        <BtScroll class="tag-scroll"
                  ref="userList"
                  @scroll="scroll"
                  @refresh="refresh"
                  :probe-type="probeType"
                  :listenScroll="listenScroll"
                  :pullingUp="pullingUp"
                  :beforeScroll="beforeScroll"
                  @beforeScroll="listScroll">
            <ul v-if="appChildList" class="list">
              <li class="item" :key="index" v-for="(item, index) in appChildList">
                <div class="item-title" @click.stop="handleListShow">
                  <span>{{item.DisplayName}}
                      <span class="count">({{item.Children.length}})</span>
                  </span>
                  <span>
                   <svg-icon icon-class="top-d" v-if="listShow"/>
                      <svg-icon v-else icon-class="arrow-bottom" />
                  </span>
                </div>
                <el-collapse-transition>
                <div class="item-box" v-show="listShow">
                  <div class="item-inner"  @click="appDetail" v-if="item.Children.length" :key="index" v-for="(inner, index) in item.Children">
                    <p class="img-box">
                        <!--<img v-lazy="inner.IconUrl" class="img"/>-->
                      <span class="img" :class="[index%2 === 1 ? activeClass : '', index%3 === 1 ? activeClass2 : '', index%4 === 1 ? activeClass3 : '']"></span>
                      <!--<span class="img" :class="[index%2 === 1 ? activeClass : '', index%3 === 1 ? activeClass2 : '', index%4 === 1 ? activeClass3 : '']"></span>-->
                  </p>
                  <span class="text">{{inner.DisplayName}}</span>
                </div>
                </div>
                  </el-collapse-transition>
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
import AppHeader from '../header'
export default {
  name: 'child',
  data() {
    return {
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      img: 'static/images/caidan.svg',
      listShow: true,
      counts: 0,
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
      AppCode: this.appCode
    }
    this.$store.dispatch('getAppChildLst', options)
  },
  methods: {
    appDetail() {
      this.$router.push({
        path: '/appcenter/detail'
      })
    },
    handleListShow() {
      this.listShow = !this.listShow
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
    appCode() {
      return this.$store.getters.appCode
    },
    appChildList() {
      return this.$store.getters.appChildList
    }
  },
  components: {
    AppHeader,
    BtScroll
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../../commom/scss/mixin";
  @import "../../../../commom/scss/varible";
  .container {
    width: 100%;
    height: 100%;
    .tag-scroll {
      padding-top: 20px;
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .list {
        .item {
          .item-title{
            line-height: 40px;
            padding: 0 10px;
            display: flex;
            justify-content: space-between;
            color: $textColor2;
            @include border-bottom-1px($borderBottom);
            .count{
              padding-left: 2px;
            }
          }
          .item-box{
            display: flex;
            flex-wrap: wrap;
            padding: 10px;
          }
          .item-inner {
            width: 25%;
            display: flex;
            flex-direction: column;
            .img-box {
              text-align: center;
              .img{
                width: 3.5rem;
                height: 3.5rem;
                display: inline-block;
                border-radius: 10px;
                background: url(/static/images/menu.svg) $blueColor no-repeat center;
                background-size: 60% 60%;
              }
            }
            .text {
              text-align: center;
              color: $textColor2;
              font-size: 14px;
              line-height: 28px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
</style>
