<template>
    <div class="search-department">
      <SelectHeader></SelectHeader>
      <div class="select-box">
        <div class="search">
          <div class="search-header">
          <SearchInput></SearchInput>
          </div>
          <div class="search-inner">
            <div class="search-inner-header">
              <div class="breadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="{ path: '/selectDepart' }">H3BPM</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{path: '/selectDepart/selectDepartChild'}">{{title}}</el-breadcrumb-item>
                  <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
                </el-breadcrumb>
              </div>
              <div class="selected-person">
                <el-tag
                  :key="tag.id"
                  v-for="(tag, index) in checkedPersonList"
                  v-if="tag.checked"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag, index)">
                  {{tag.name}}
                </el-tag>
              </div>
            </div>
            <div class="search-inner-body">
              <BtScroll class="tag-scroll"
                        ref="userList"
                        @scroll="scroll"
                        @refresh="refresh"
                        :probe-type="probeType"
                        :listenScroll="listenScroll"
                        :pullingUp="pullingUp"
                        :beforeScroll="beforeScroll"
                        @beforeScroll="listScroll">
                    <div class="depart-list">
                      <!--<ul>-->
                        <!--<li :key="item.id" v-for="item in dataList" @click="handleClickChild(item)">-->
                          <!--<span>{{item.name}}</span>-->
                          <!--<p>-->
                            <!--<span>{{item.counts}}</span>-->
                            <!--<span class="svg-box">-->
                                  <!--<svg-icon icon-class="right"></svg-icon>-->
                            <!--</span>-->
                          <!--</p>-->
                        <!--</li>-->
                      <!--</ul>-->
                      <router-view></router-view>
                    </div>
              </BtScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import BtScroll from '@/components/BtScroll/index'
import SelectHeader from '@/components/SelectCommom/Header/index'
import SearchInput from '@/components/SelectCommom/InputSearch/index'
export default {
  name: 'DepartM',
  data() {
    return {
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      dataList: [
        {
          name: '事业部',
          counts: 12,
          id: 0
        },
        {
          name: '事业部',
          counts: 12,
          id: 1
        },
        {
          name: '事业部',
          counts: 12,
          id: 2
        },
        {
          name: '事业部',
          counts: 12,
          id: 3
        },
        {
          name: '事业部',
          counts: 12,
          id: 4
        },
        {
          name: '事业部',
          counts: 12,
          id: 5
        },
        {
          name: '事业部',
          counts: 12,
          id: 6
        },
        {
          name: '事业部',
          counts: 122,
          id: 7
        },
        {
          name: '事业部',
          counts: 132,
          id: 8
        },
        {
          name: '事业部',
          counts: 132,
          id: 9
        },
        {
          name: '事业部',
          counts: 12,
          id: 10
        },
        {
          name: '事业部',
          counts: 12,
          id: 11
        },
        {
          name: '事业部',
          counts: 122,
          id: 12
        },
        {
          name: '事业部',
          counts: 132,
          id: 13
        },
        {
          name: '事业部',
          counts: 132,
          id: 14
        }
      ],
      title: ''
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.pullingUp = true
    this.$nextTick(() => {
      console.log(this.checkedPersonList)
    })
  },
  computed: {
    checkedPersonList() {
      return this.$store.getters.checkedPersonList
    }
  },
  methods: {
    // handleClickChild(item) {
    //   this.$router.push('/selectDepart/selectDepartChild')
    //   this.title = item.name
    // },
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
    SelectHeader,
    SearchInput,
    BtScroll
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
.search-department{
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .select-box{
    flex: 1 0 auto;
    position: relative;
    .search{
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .search-header{
        padding: 10px 0;
        .organization{
          display: flex;
          justify-content: space-between;
          line-height: 44px;
          padding: 0 10px;
          .text{
            font-size: 1rem;
            padding-left: 5px;
            color: $textColor2;
          }
          .svg-box{
            color: $mainColor;
          }
        }
        .department{
          display: flex;
          position: relative;
          line-height: 40px;
          background: $mainBgColor;
          padding: 0 10px;
          @include border-top-1px($borderBottom);
          .vertical-line{
            width: 2px;
            height: 14px;
            left: 10px;
            top: 14px;
            background: $mainColor;
            position: absolute;
          }
          .text{
            padding-left: 6px;
            font-size: 14px;
            color: $textColor2;
          }
        }
      }
      .search-inner{
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        .search-inner-header {
          flex: 0 0 30px;
          .breadcrumb {
            padding: 0 10px;
            .el-breadcrumb {
              line-height: 30px;
            }
          }
          .selected-person {
            display: flex;
            flex-wrap: wrap;
            line-height: 40px;
            padding: 4px 10px 0 10px;
            justify-content: flex-start;
            background: $baseColor;
            span {
              color: $textColor2;
              /*font-size: 14px;*/
              padding: 0 5px;
              margin-left: 4px;
              margin-bottom: 5px;
            }
          }
        }
        .search-inner-body{
          flex: 1 0 auto;
          position: relative;
          .tag-scroll{
            position: absolute;
            left: 0;
            top:0;
            height: 100%;
            width: 100%;
            overflow: hidden;
          .depart-list{
            width: 100%;
            height: auto;
            li{
              display: flex;
              justify-content: space-between;
              padding: 5px 10px;
              line-height: 30px;
              color: $textColor2;
              @include border-bottom-1px($borderBottom);
            }
          }
          }
        }
        .tag-wrapper {
          position: relative;
          flex: 1 0 auto;
          .tag-scroll {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            .inner-box {
              li {
                display: flex;
                padding: 10px;
                @include border-bottom-1px($borderBottom);
                .svg-box {
                  line-height: 40px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  padding-right: 5px;
                  svg {
                    width: 24px;
                    height: 24px;
                  }
                  .checked-icon{
                    color: $mainColor;
                  }
                }
                .inner-right {
                  display: flex;
                  .icon-text {
                    display: inline-block;
                    text-align: center;
                    width: 40px;
                    height: 40px;
                    font-size: 1rem;
                    line-height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: $baseColor;
                    background: $errorColor;
                  }
                  .activeClass{
                    background: $mainColor!important;
                  }
                  .activeClass1{
                    background: $warningColor!important;
                  }
                  .activeClass2{
                    background: $blueColor!important;
                  }
                  .inner-text {
                    padding-left: 5px;
                    font-size: 1rem;
                    line-height: 40px;
                    color: $textColor2;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
