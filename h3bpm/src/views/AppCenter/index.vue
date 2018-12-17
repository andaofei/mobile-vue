<template>
  <div class="app-center">
    <div class="header">
      <div class="title">应用中心</div>
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
        <ul class="list">
          <li class="item">
            <div class="item-inner" @click="appChild" >
              <p class="img-box">
                <img v-lazy="img" class="img"/>
              </p>
              <span class="text">应用1</span>
            </div>
          </li>
        </ul>
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
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      img: 'static/images/Workflow.png'
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.pullingUp = true
  },
  methods: {
    appChild() {
      this.$router.push({
        path: '/appcenter/child'
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
              }
              img{
               width: 3.5rem;
               height: 3.5rem;
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
            }
          }
        }
      }
    }
  }
</style>
