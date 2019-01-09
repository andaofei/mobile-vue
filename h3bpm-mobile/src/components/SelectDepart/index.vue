<template>
    <div class="search-department">
      <SelectHeader></SelectHeader>
      <div class="select-box">
        <div class="search">
          <div class="search-header">
          <SearchInput @inputSearch="inputSearch"></SearchInput>
          </div>
          <div class="search-inner">
            <!--<div class="search-inner-header">-->
              <!--&lt;!&ndash;//面包屑&ndash;&gt;-->
              <!--<div class="breadcrumb">-->
                <!--<BreadCrumb></BreadCrumb>-->
              <!--</div>-->
            <!--</div>-->
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
                <div class="selectDepartDefault">
                  <div class="wrapper">
                    <div class="selected-person">
                      <el-tag
                        :key="tag.id"
                        v-for="(tag, index) in checkedDepartList"
                        v-if="tag.checked"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag, index)">
                        {{tag.Text}}
                      </el-tag>
                    </div>
                    <div>
                      <div class="title">{{departTitle}}</div>
                      <ul>
                        <li :key="index" v-for="(item, index) in departList"  @click="handleClickChild(item)">
                          <span>{{item.Text}}</span>
                          <p>
                            <span>{{item.ExtendObject.ChildrenCount}}</span>
                            <span class="svg-box">
               <svg-icon icon-class="right"></svg-icon>
            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </BtScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import SelectHeader from '@/components/SelectCommom/Header/index'
import SearchInput from '@/components/SelectCommom/InputSearch/index'
import BreadCrumb from '@/components/SelectCommom/BreadCrumb/index'
import {getUserInfo} from '@/utils/auth'
import getPartMixin from '@/commom/mixins/selectPartList'
import {getSelectPerson} from '@/api/getworkitems'
import {ERR_OK} from '@/api/options/statusCode'
import { mapMutations } from 'vuex'
export default {
  name: 'SelectDepart',
  mixins: [getPartMixin],
  data() {
    return {
      title: '',
      allCheckStatus: false,
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      departTitle: '',
      departList: []
    }
  },
  created() {
    this.initList()
  },
  methods: {
    ...mapMutations({
      setDeletePart: 'SET_DELETE_DEPART' // 单选
    }),
    initList() {
      let options = {
        IsMobile: true,
        LoadTree: true,
        Recursive: true,
        ParentID: getUserInfo().ParentID,
        o: 'U'
      }
      return new Promise((resolve, reject) => {
        getSelectPerson(options).then(res => {
          console.log(res.data, 'data')
          if (res.code === ERR_OK) {
            const list = res.data[0].children
            this.departTitle = res.data[0].Text
            this.departList = list
          }
          resolve(res)
        }).catch(error => {
          console.error(error)
          reject(error)
        })
      })
    },
    // 关闭tag
    handleClose(tag, index) {
      console.log(tag, index)
      this.setDeletePart({data: tag, index: index})
      // this.$store.commit('SET_DELETE_DEPART', {data: tag, index: index})
    },
    handleClickChild(item) {
      console.log(item)
      if (item.ExtendObject.ChildrenCount === 0) {
        return false
      }
      this.$router.push({
        path: '/selectDepart/selectDepartChild',
        name: 'SelectDepartChild',
        params: {
          objId: item.ObjectID,
          title: item.Text
        }
      })
      this.title = item.Text
    },
    addViewTags() {
      console.log(this.$route, 'addViewTags')
      // const { name } = this.$route
      // if (name) {
      //   this.$store.dispatch('addView', this.$route)
      // }
      // return false
    },
    // 本地搜索
    inputSearch(inner) {
      let searchString = inner
      let articlesArray = []
      if (!searchString) {
        this.initList()
        return articlesArray
      }
      articlesArray = this.departList
      articlesArray = articlesArray.filter(function(item) {
        if (item.Text.toLowerCase().indexOf(searchString) !== -1) {
          return item
        }
      })
      console.log(articlesArray, 'articlesArray')
      this.departList = articlesArray
    }
  },
  computed: {
    // 已选列表
    checkedDepartList() {
      return this.$store.getters.checkedDepartList
    }
  },
  components: {
    SelectHeader,
    SearchInput,
    BreadCrumb
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
.search-department{
  background: $baseColor;
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
            max-height: 100px;
            overflow: scroll;
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
        .select-btm{
          position: fixed;
          width: 100%;
          left: 0;
          bottom: 0;
          z-index: 10;
          background: $baseColor;
          display: flex;
          @include border-top-1px($borderBottom);
          .btm-left{
            padding-left: 10px;
            width: 60%;
            line-height: 44px;
            display: flex;
            .svg-box{
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding-right: 5px;
              svg{
                width: 24px;
                height: 24px;
              }
              .checked-icon{
                color: $mainColor;
              }
            }
            .allCheck{
              color: $textColor2;
            }
          }
          .btm-right{
            width: 40%;
            line-height: 44px;
            text-align: center;
            background: $mainColor;
            color: $baseColor;
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
  .selectDepartDefault{
    position: relative;
    .wrapper{
      width: 100%;
      .selected-person {
        display: flex;
        flex-wrap: wrap;
        line-height: 40px;
        padding: 4px 10px 0 10px;
        justify-content: flex-start;
        background: $baseColor;
        max-height: 100px;
        overflow: scroll;
        span {
          color: $textColor2;
          /*font-size: 14px;*/
          padding: 0 5px;
          margin-left: 4px;
          margin-bottom: 5px;
        }
      }
      .title{
        padding: 0 10px;
        font-size: 1rem;
        font-weight: 500;
        line-height: 2rem;
      }
      ul {
        li {
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
}
</style>
