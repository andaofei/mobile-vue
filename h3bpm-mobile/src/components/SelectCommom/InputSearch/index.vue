<template>
  <div class="search-input">
    <div class="input-box">
      <el-input
        size="small"
        clearable
        :placeholder="placeHolder"
        @input="handleFocus"
        v-model="inputValue">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="searchDataList"></i>
      </el-input>
    </div>
    <!--搜索列表-->
    <div class="search-list" v-show="listShow">
      <div class="search-list-header">
      <div class="close-icon">
         <span class="svg-box">
         </span>
        <span>搜索用户</span>
        <span class="svg-box" @click.stop="handleListShow">
             <svg-icon  icon-class="close"/>
         </span>
      </div>
      <div class="input-box">
        <el-input
          placeholder="请输入内容"
          v-model="searchInner"
          @input="searchList"
          size="small"
          clearable>
        </el-input>
      </div>
      <!--部门-->
      <div class="department">
        <span class="vertical-line"></span>
        <p class="text">人员</p>
      </div>
      </div>
      <div class="input-container">
        <div class="tag-wrapper" >
        <BtScroll class="tag-scroll"
                  ref="userList"
                  @scroll="scroll"
                  @refresh="refresh"
                  :probe-type="probeType"
                  :listenScroll="listenScroll"
                  :pullingUp="pullingUp"
                  :beforeScroll="beforeScroll"
                  @beforeScroll="listScroll">
          <ul class="inner-box">
            <li :key="item.id" v-for="(item, index) in searchUserList" @click.stop="handleClickSelect(item, index)">
                <span class="svg-box">
                  <svg-icon icon-class="check" v-if="!item.checked"/>
                  <svg-icon class="checked-icon" v-else icon-class="checked"/>
                </span>
              <p class="inner-right">
                <span class="icon-text" :class="[index%2 === 1 ? activeClass : '', index%3 === 1 ? activeClass2 : '', index%4 === 1 ? activeClass3 : '']">{{item.name}}</span>
                <span class="inner-text">{{item.position}}{{item.name}}</span>
              </p>
            </li>
          </ul>
        </BtScroll>
        </div>
      </div>
      <div class="input-btm" @click="handleListShow">确定</div>
    </div>
  </div>
</template>

<script>
import BtScroll from '@/components/BtScroll/index'
import {mapMutations} from 'vuex'
export default {
  name: 'SearchInput',
  data() {
    return {
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      selected: -1,
      placeHolder: this.$t('selectPerson.search'),
      activeClass: 'activeClass',
      activeClass2: 'activeClass2',
      activeClass3: 'activeClass3',
      inputValue: '',
      searchInner: '',
      listShow: false
    }
  },

  created() {
    this.probeType = 3
    this.listenScroll = true
    this.pullingUp = true
    // this.inputValue = ''
  },

  methods: {
    ...mapMutations({
      setCheckedPerson: 'SET_CHECKED_PERSONS', // 单击选择
      setSearchPerson: 'SET_SEARCH_PERSON_LIST', // 搜索列表
      setSearchDepart: 'SET_SEARCH_DEPART_LIST' // 搜索列表组织机构
    }),

    handleFocus() {
      let searchString = this.inputValue
      let articlesArray = []
      if (!searchString) {
        return articlesArray
      }
      console.log(this.$route.name, '$route')
      const routeName = this.$route.name
      if (routeName === 'SelectPerson') {
        articlesArray = this.searchUserList
        console.log(this.sponsorList, '发起人列表')
        articlesArray = articlesArray.filter(function(item) {
          if (item.Text.toLowerCase().indexOf(searchString) !== -1) {
            return item
          }
        })
        this.setSearchPerson(articlesArray) // 设置发起人列表
      } else if (routeName === 'SelectDepartDefault') {
        // console.log(this.departList, '组织机构')
        articlesArray = this.searchUserList
        let searchResult = [] // 搜索结果
        // 过滤遍历结果
        searchResult = articlesArray.filter(function(item) {
          if (item.Text.toLowerCase().indexOf(searchString) !== -1) {
            return item
          }
        })
        console.log(searchResult, 'searchResult')
        this.setSearchDepart(searchResult)
      } else if (routeName === 'SelectDepartChild ') {}
    },
    searchDataList() {
      console.log(this.inputValue)
    },
    // 隐藏
    handleListShow() {
      this.listShow = false
    },

    // 选中
    handleClickSelect(item, index) {
      this.setCheckedPerson({data: item, index: index})
    },

    // 搜索列表
    searchList() {
      // console.log(this.searchInner)
      this.$store.dispatch('getSearchList', this.searchInner)
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
    // 选中列表
    checkedPersonList() {
      return this.$store.getters.checkedPersonList
    },
    // 搜索列表
    searchUserList() {
      return this.$store.getters.searchUserList
    },
    // 数据列表
    sponsorList() {
      return this.$store.getters.sponsorList
    },
    // 组织数据列表
    departList() {
      return this.$store.getters.departList
    }
  },

  watch: {
    inputValue(value) {
      if (!value) {
        console.log(this.$route.name, '$route')
        const routeName = this.$route.name
        if (routeName === 'SelectPerson') {
          this.setSearchPerson(this.searchUserList)
        } else if (routeName === 'SelectDepartDefault') {
          this.setSearchDepart(this.searchUserList)
        }
      }
    }
  },

  components: {
    BtScroll
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../commom/scss/mixin";
  @import "../../../commom/scss/varible";
  .search-input{
    padding: 6px 10px;
    .search-list{
      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      background:$baseColor;
      z-index: 50;
      display: flex;
      flex-direction: column;
      .search-list-header {
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
        .close-icon {
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
          line-height: 44px;
          color: $textColor2;
          .svg-box{
            width: 30px;
            text-align: center;
          }
        }
        .input-box {
          padding: 5px 10px;
        }
      }
      .input-container{
        flex: 1 0 auto;
        position: relative;
        .tag-wrapper {
          height: 100%;
          width: 100%;
          position: absolute;
          .tag-scroll {
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
      .input-btm{
        height: 44px;
        text-align: center;
        background: $mainColor;
        color: $baseColor;
        line-height: 44px;
      }
    }
  }

</style>
