<template>
    <div class="select-container">
      <!--<header></header>-->
      <SelectHeader></SelectHeader>
      <!--body-->
      <div class="select-box">
        <div class="search">
          <div class="search-header">
            <!--搜索框-->
            <SearchInput @inputSearch="inputSearch"></SearchInput>
            <!--组织-->
            <div class="organization" @click="selectDepart">
              <p>
              <span class="svg-box">
                  <svg-icon icon-class="orgnazition"></svg-icon>
              </span>
                <span class="text">{{$t('selectPerson.organization')}}</span>
                </p>
              <span class="svg-box">
                <svg-icon icon-class="right"></svg-icon>
              </span>
            </div>
            <!--部门-->
            <div class="department">
                <span class="vertical-line"></span>
                <p class="text">{{$t('selectPerson.department')}}</p>
            </div>
          </div>
          <!--主体-->
          <div class="search-inner">
            <!--回顶部-->
            <ToTop v-show="topTop" @backTop="backTop"></ToTop>
            <div class="selected-person">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in checkedPersonList"
                v-if="tag.checked"
                closable
                :disable-transitions="false"
                @close="handleClose(tag, index)">
                  <span> {{tag.Text}}</span>
                </el-tag>
            </div>
            <div class="tag-wrapper" >
              <BtScroll class="tag-scroll"
                    v-loading="loadShow"
                    ref="userList"
                    @scroll="scroll"
                    @refresh="refresh"
                    :probe-type="probeType"
                    :listenScroll="listenScroll"
                    :pullingUp="pullingUp"
                    :beforeScroll="beforeScroll"
                    @beforeScroll="listScroll"
                    :scrollbar="scrollbarObj"
                    :pullDownRefresh="pullDownRefreshObj"
                    :pullUpLoad="pullUpLoadObj"
                    :startY="parseInt(startY)"
                     @pullingDown="onPullingDown"
                    @pullingUp="onPullingUp">
                <ul class="inner-box" v-if="sponsorList.length > 0">
                  <li :key="item.id" v-for="(item, index) in sponsorList" @click="handleClickSelect(item, index)">
                  <span class="svg-box">
                    <svg-icon icon-class="check" v-if="!item.checked"/>
                    <svg-icon class="checked-icon" v-else icon-class="checked"/>
                  </span>
                <div class="inner-right">
                  <div class="inner-right-box">
                  <span class="img-box">
                   <img v-if="item.ExtendObject ? item.ExtendObject.UserImageUrl.length > 0 : ''" v-lazy="baseUrl + item.ExtendObject.UserImageUrl" alt="" class="icon-text">
                    <img v-else  v-lazy="item.ExtendObject.UserGender===2? woman : man" alt="" class="icon-text">
                  </span>
                  <span class="inner-text">{{item.Text}}</span>
                </div>
                </div>
              </li>
              </ul>
                <div class="inner-box-nodata" v-else>
                  <NoData></NoData>
                </div>
              </BtScroll>
            </div>
          </div>
        </div>
      </div>
      <!--// 全选-->
      <div class="select-btm">
        <p class="btm-left" @click="handleCheckAll">
          <span class="svg-box">
            <svg-icon v-if="allCheckStatus" class="checked-icon" icon-class="checked"/>
             <svg-icon v-else icon-class="check"/>
         </span>
          <span class="allCheck">
            <span>{{$t('home.selectAll')}}</span>
            <span class="count">({{this.checkedPersonList ? this.checkedPersonList.length : 0 }})</span>
          </span>
        </p>
        <p class="btm-right" @click="handleSureClick">{{$t('home.submit')}}</p>
      </div>
    </div>
</template>

<script>
import homeCenterMixin from '@/commom/mixins/homeCenterMixin'
import {getSelectPerson} from '@/api/getworkitems'
// import BtScroll from '@/components/BtScroll/index'
import BtScroll from '@/components/scroll/new-scroll'
import SelectHeader from '@/components/SelectCommom/Header/index'
import SearchInput from '@/components/SelectCommom/InputSearch/index'
import {getUserInfo, getBaseUrl} from '@/utils/auth'
import {ERR_OK} from '@/api/options/statusCode'
import { mapMutations } from 'vuex'
export default {
  name: 'SelectPerson',
  mixins: [homeCenterMixin],
  data() {
    return {
      baseUrl: getBaseUrl(),
      sponsorList: [], // 发起人列表
      probeType: 0,
      scrollY: 0,
      pullingUp: true,
      beforeScroll: true,
      selected: -1,
      activeClass: 'activeClass',
      activeClass2: 'activeClass2',
      activeClass3: 'activeClass3',
      allCheckStatus: false,
      man: '/static/images/man.svg', // 男头像
      woman: '/static/images/woman.svg'
    }
  },

  created() {
    this.probeType = 3
    this.listenScroll = true
    this.pullingUp = true
    // this.getList()
    this.initList()
  },

  methods: {
    ...mapMutations({
      setAlLChecked: 'SET_ALL_CHECKED_PERSONS', // 全选
      setCheckedPerson: 'SET_CHECKED_PERSONS', // 单选
      setEmptyPerson: 'SET_EMPTY_PERSONS', // 清空
      setDeletePerson: 'SET_DELETE_PERSONS' // 删除已选
    }),
    // 获取数据
    initList() {
      this.loadShow = true
      let options = {
        IsMobile: true,
        ParentID: getUserInfo().ParentID,
        o: 'U'
      }
      return new Promise((resolve, reject) => {
        getSelectPerson(options).then(res => {
          // console.log(res.data)
          this.loadShow = false
          if (res.code === ERR_OK) {
            const list = res.data
            list.map((item) => {
              item.checked = false
            })
            this.sponsorList = Object.assign(list, this.checkedPersonList)
            // this.sponsorList = list
          }
          resolve(res)
        }).catch(error => {
          console.error(error)
          this.loadShow = false
          reject(error)
        })
      })
    },

    getList() {
      let options = {
        IsMobile: true,
        ParentID: getUserInfo().ParentID,
        o: 'U'
      }
      this.loadShow = true
      this.$store.dispatch('getSelectPersonList', options)
        .then(() => {
          this.loadShow = false
        })
        .catch(() => {
          this.loadShow = false
        })
    },

    selectDepart() {
      this.$router.push('/selectDepart')
      // 清空已选
      // this.setEmptyPerson([])
    },

    // 单击选中
    handleClickSelect(item, index) {
      if (item.checked === false) {
        this.$set(item, 'checked', true)
      } else {
        this.$set(item, 'checked', false)
      }
      this.setCheckedPerson({data: item, index: index})
    },

    // 全选
    handleCheckAll() {
      const data = this.sponsorList
      const status = true
      if (this.allCheckStatus) {
        for (const value of data) {
          this.$set(value, 'checked', !status)
        }
      } else {
        for (const value of data) {
          this.$set(value, 'checked', status)
        }
      }
      this.setAlLChecked({data: data, state: this.allCheckStatus})
      setTimeout(() => {
        this.refresh()
      }, 300)
    },

    // 关闭tag
    handleClose(tag, index) {
      this.$set(tag, 'checked', false)
      this.setDeletePerson({data: tag, index: index})
    },

    // 确定
    handleSureClick() {
      console.log(this.checkedPersonList, 'this.checkedPersonList')
      this.$router.go(-1)
    },

    // 本地搜索
    inputSearch(inner) {
      let searchString = inner
      let articlesArray = []
      if (!searchString) {
        this.initList()
        return articlesArray
      }
      articlesArray = this.sponsorList
      articlesArray = articlesArray.filter(function(item) {
        if (item.Text.toLowerCase().indexOf(searchString) !== -1) {
          return item
        }
      })
      console.log(articlesArray, 'articlesArray')
      this.sponsorList = articlesArray
    },

    // 滑动
    // scroll(pos) {
    //   console.log(pos.y)
    // },

    onPullingDown() {
      setTimeout(() => {
        this.$refs.userList.forceUpdate()
      }, 1000)
    },

    onPullingUp() {
      setTimeout(() => {
        this.$refs.userList.forceUpdate()
      }, 1000)
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
    checkedPersonList() {
      return this.$store.getters.checkedPersonList
    }
  },

  watch: {
    sponsorList: {
      handler() {
        if (this.sponsorList.length > 0 && this.sponsorList.length === this.checkedPersonList.length) {
          this.allCheckStatus = true
        } else {
          this.allCheckStatus = false
        }
      },
      deep: true
    }
  },

  components: {
    BtScroll,
    SelectHeader,
    SearchInput
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
  .select-container {
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
          .selected-person{
            display: flex;
            flex-wrap: wrap;
            line-height: 40px;
            padding: 4px 10px 0 10px;
            justify-content: flex-start;
            background: $baseColor;
            max-height: 100px;
            overflow: scroll;
            .el-tag{
              color: $textColor2;
              padding: 0 5px;
              margin-bottom: 8px;
              margin-left: 3px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
                background: $baseColor;
                li {
                  display: flex;
                  padding: 10px;
                  @include border-bottom-1px($borderBottom);
                  justify-content: space-between;
                  .svg-box {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 40px;
                    padding-right: 5px;
                    width: 8%;
                    min-width: 30px;
                    svg {
                      font-size: 26px;
                    }
                    .checked-icon{
                      color: $mainColor;
                    }
                  }
                  .inner-right {
                   width: 92%;
                    .inner-right-box{
                      display: flex;
                      width: 100%;
                    }
                    .img-box{
                      width: 12%;
                      display: flex;
                      justify-content: center;
                      flex-direction: column;
                      text-align: center;
                      min-width: 35px;
                    .icon-text {
                      display: inline-block;
                      text-align: center;
                      width: 35px;
                      height: 35px;
                      font-size: 1rem;
                      line-height: 40px;
                      border-radius: 50%;
                      color: $baseColor;
                    }
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
                      width: 92%;
                      padding-left: 5px;
                      font-size: 1rem;
                      line-height: 40px;
                      color: $textColor2;
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
      }
    }
    .select-btm{
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 0;
      z-index: 9;
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
           font-size: 28px;
          }
          .checked-icon{
            color: $mainColor;
          }
        }
        .allCheck{
          color: $textColor2;
        }
        .count{
          color: $mainColor;
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
  }
</style>
