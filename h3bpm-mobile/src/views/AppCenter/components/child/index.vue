<template>
    <div class="container">
      <app-header :childName="childName"/>
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
            <ul v-if="appChildList.length > 0" class="list">
              <!--存在子长度-->
              <li class="item" :key="index" v-for="(item, index) in appChildList">
                <div class="item-title" v-if="item.Children.length > 0" @click.stop="toggle(item, index)">
                  <span>{{item.DisplayName}}
                      <span class="count">({{item.Children.length}})</span>
                  </span>
                  <span>
                   <svg-icon icon-class="top-d" v-if="item.show"/>
                      <svg-icon v-else icon-class="arrow-bottom" />
                  </span>
                </div>
                <el-collapse-transition>
                <div class="item-box" v-show="item.show">
                  <div class="item-inner"  @click="appDetail(item)" v-if="item.Children.length" :key="index" v-for="(inner, index) in item.Children">
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
              <!--不存在子元素-->
              <li class="item">
                <div class="item-title"  @click.stop="toggleChildShow()">
                  <span>其他<span class="count">({{noChild.length}})</span>
                  </span>
                  <span>
                   <svg-icon icon-class="top-d" v-if="childShow"/>
                      <svg-icon v-else icon-class="arrow-bottom" />
                  </span>
                </div>
                <el-collapse-transition>
                  <div class="item-box" v-show="childShow">
                    <div class="item-inner" @click="appDetail(inner)" :key="index" v-for="(inner, index) in noChild">
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
import {getAppChildLst} from '@/api/appCenter'
import {ERR_OK} from '@/api/options/statusCode'
import {getAppName} from '@/utils/auth'
// import qs from 'qs'
export default {
  name: 'AppChild',
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
      activeClass3: 'activeClass3',
      childName: '',
      appChildList: [],
      noChild: [],
      childShow: true
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.pullingUp = true
    console.log(getAppName())
    const code = getAppName().code
    this.childName = getAppName().name
    let options = {
      AppCode: code
    }
    this.getList(options)
  },
  methods: {
    getList(options) {
      return new Promise((resolve, reject) => {
        getAppChildLst(options).then(res => {
          if (res.code === ERR_OK) {
            const data = res.data
            data.map((item) => {
              this.formatUrl(item)
              if (item.Children.length > 0) {
                item.Children.map((inner) => {
                  this.formatUrl(item)
                })
              }
            })
            this.appChildList = data
            this.noChild = data.filter(item => item.Children.length === 0)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 为每一组数据增加type（1为默认配置，2为发起流程链接，3为外部链接，4为打开表单）； data.Code作为发起流程链接提取workflowCode
    formatUrl(data) {
      let regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/
      let reg = new RegExp('WorkflowCode=([^&]*)(&|$)')
      if (data.Url && regex.test(data.Url)) {
        data.Type = 3
      } else if (data.Url && data.Url.toLowerCase().indexOf('portal'.toLowerCase()) !== -1) {
        let WorkflowCode = ''
        let r = data.Url.match(reg)
        if (r != null) WorkflowCode = unescape(r[1])
        data.Type = 2
        data.Code = WorkflowCode
      } else {
        data.Type = 1
        if (data.Url) {
          if (data.Url.indexOf('app.EditBizObject') > -1) {
            data.Type = 4
            data.Url = this.ConvertBizObjectUrl(data.Url)
          }
        } else {
          return data
        }
      }
    },
    // 表单地址
    ConvertBizObjectUrl(Url) {
      let url = ''
      url = Url.slice(0, Url.length - 1).replace('app.EditBizObject(', '')
      return url
    },
    appDetail(item) {
      console.log(item.Type)
      switch (item.Type) {
        case 1: // url 转换
          if (!item.Url) {
            return
          }
          let rt = /(.+)?(?:\(|（)(.+)(?=\)|）)/.exec(item.Url)
          let childPath = rt[1].replace(/\./g, '/')
          let regex = /[^\(\)]+(?=\))/g
          let data = item.Url.match(regex)[0]
          this.$router.push({
            path: `/` + childPath
          })
          this.$store.commit('SET_REPORT_OPTIONS', data)
          break
        case 2: // 发起流程
          console.log(item)
          break
        case 3: // 打开连接
          window.location.href = item.Url + '?t=' + Math.random()
          break
        case 4: // 打开表单
          // http://localhost:8085/Portal/MvcDefaultSheet.jsp?
          let obj = eval('(' + item.Url + ')') //  ToFix: eval语句是有害的
          const Url = this.$baseUrl + `Portal/MvcDefaultSheet.jsp?SheetCode=` + obj.SheetCode + '&Mode=' + obj.Mode + '&SchemaCode=' + obj.SchemaCode + '&IsMobile=true&onlyData=true&go=-2&T=' + new Date().getTime()
          console.log(Url)
          window.location.href = Url
          break
      }
    },
    appOther(inner) {
      console.log(inner.Type)
    },
    toggle(item) {
      this.$set(item, 'show', this.show = !this.show)
    },
    toggleChildShow() {
      this.childShow = !this.childShow
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
              /*white-space: nowrap;*/
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
    .open{
      display: none!important;
    }
  }
</style>
