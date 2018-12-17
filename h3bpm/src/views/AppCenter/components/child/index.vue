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
          <ul class="list">
            <li class="item">
              <div class="item-title" @click.stop="handleListShow">
                <span>其他
                <span class="count">({{counts}})</span>
                </span>
                <span>
                 <svg-icon icon-class="top-d" v-if="listShow"/>
                 <svg-icon v-else icon-class="arrow-bottom" />
                </span>
              </div>
              <el-collapse-transition>
              <div class="item-box" v-show="listShow">
                <div class="item-inner"  @click="appDetail">
                      <p class="img-box">
                  <img v-lazy="img" class="img"/>
                </p>
                <span class="text">应用1</span>
              </div>
                <div class="item-inner" @click="appDetail">
                  <p class="img-box">
                    <img v-lazy="img" class="img"/>
                  </p>
                  <span class="text">应用1</span>
                </div>
                <div class="item-inner"  @click="appDetail">
                  <p class="img-box">
                    <img v-lazy="img" class="img"/>
                  </p>
                  <span class="text">应用1</span>
                </div>
                <div class="item-inner"  @click="appDetail">
                  <p class="img-box">
                    <img v-lazy="img" class="img"/>
                  </p>
                  <span class="text">应用1</span>
                </div>
                <div class="item-inner" @click="appDetail">
                  <p class="img-box">
                    <img v-lazy="img" class="img"/>
                  </p>
                  <span class="text">应用1</span>
                </div>
              </div>
                </el-collapse-transition>
            </li>
          </ul>
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
      img: 'static/images/Workflow.png',
      listShow: true,
      counts: 0
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.pullingUp = true
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
            }
            img {
              width: 3.5rem;
              height: 3.5rem;
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
  }
</style>
