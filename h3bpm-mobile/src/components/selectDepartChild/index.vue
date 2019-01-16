<template>
  <div class="selectDepartChild-box">
    <SelectHeader></SelectHeader>
    <div class="search">
      <div class="search-header">
        <SearchInput @inputSearch="inputSearch"></SearchInput>
      </div>
    </div>
    <div class="selected-person">
      <el-tag
        :key="tag.id"
        v-for="(tag, index) in checkedDepartList"
        v-if="tag.checked"
        closable
        :disable-transitions="false"
        @close="handleClose(tag, index)">
        {{tag.text}}
      </el-tag>
    </div>
    <div class="selectDepartChild-wrapper">
      <BtScroll class="child-scroll"
                v-loading="loadShow"
                ref="userList"
                @scroll="scroll"
                @refresh="refresh"
                :probe-type="probeType"
                :listenScroll="listenScroll"
                :pullingUp="pullingUp"
                :beforeScroll="beforeScroll"
                @beforeScroll="listScroll">
        <div class="selectDepartChild" v-if="sponsorList.length > 0">
          <ul>
            <!--用户-->
            <li v-if="item.extendObject.UnitType === 'U'"  :key="index" v-for="(item, index) in sponsorList" @click="handleClickSelect(item, index)" class="userList">
                  <span class="svg-box">
                    <svg-icon icon-class="check" v-if="!item.checked"/>
                    <svg-icon class="checked-icon" v-else icon-class="checked"/>
                  </span>
              <div class="inner-right">
                <!--<span class="icon-text" :class="[index%2 === 1 ? activeClass : '', index%3 === 1 ? activeClass2 : '', index%4 === 1 ? activeClass3 : '']">{{item.name}}</span>-->
                <div class="inner-right-box">
                  <span class="img-box">
                    <img v-if="item.extendObject" :src="baseUrl + item.extendObject.UserImageUrl" alt="" class="icon-text">
                    <img v-else  :src="item.extendObject.UserGender===2? woman : man" alt="" class="icon-text">
                    <!--<img v-if="item.extendObject" v-lazy="item.extendObject.UserGender === 2 ? woman : man" alt="" class="icon-text">-->
                  </span>
                  <span class="inner-text">{{item.text}}</span>
                </div>
              </div>
            </li>
            <!--组织-->
            <li v-else @click="handleClickChild(item)" class="orgList">
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
        <div class="inner-box-nodata" v-else>
          <NoData></NoData>
        </div>
      </BtScroll>
    </div>
    <div class="select-btm">
      <p class="btm-left" @click="handleCheckAll">
      <span class="svg-box">
      <svg-icon v-if="allCheckStatus" class="checked-icon" icon-class="checked"/>
      <svg-icon v-else icon-class="check"/>
      </span>
        <span class="allCheck">{{$t('home.selectAll')}}</span>
      </p>
      <p class="btm-right" @click="handleSureClick">{{$t('home.submit')}}</p>
    </div>
  </div>

</template>

<script>
import SelectHeader from '@/components/SelectCommom/Header/index'
import SearchInput from '@/components/SelectCommom/InputSearch/index'
import getPartMixin from '@/commom/mixins/selectPartList'
import {getSelectPerson} from '@/api/getworkitems'
import {ERR_OK} from '@/api/options/statusCode'
import {getBaseUrl} from '@/utils/auth'
import { mapMutations } from 'vuex'
export default {
  name: 'selectDepartChild',
  mixins: [getPartMixin],
  data() {
    return {
      baseUrl: getBaseUrl(),
      sponsorList: [
      ],
      man: '/static/images/man.svg', // 男头像
      woman: '/static/images/woman.svg'
    }
  },
  created() {
    this.initList()
    // this.$store.dispatch('getSelectDepartChildList', options)
  },
  computed: {
    // 数据列表
    // sponsorList() {
    //   return this.$store.getters.sponsorList
    // },
    // 筛选历史路径
    filterPath() {
      return this.$store.getters.filterPath
    },
    // 已选列表
    checkedDepartList() {
      return this.$store.getters.checkedDepartList
    }
  },
  methods: {
    ...mapMutations({
      setItemChecked: 'SET_CHECKED_DEPART', // 单选
      setDeletePart: 'SET_DELETE_DEPART' // 删除tag
    }),
    // 初始数据
    initList() {
      this.loadShow = true
      const id = this.$route.params.objId
      // this.$store.dispatch('addView', this.$route)
      let options = {
        IsMobile: true,
        ParentID: id,
        o: 'U'
      }
      return new Promise((resolve, reject) => {
        getSelectPerson(options).then(res => {
          if (res.code === ERR_OK) {
            const list = res.data
            let newList = []

            const arr = this.checkedDepartList
            let newArr = []

            for (const i of list) {
              newList.push(i.objectID)
            }
            for (const j of arr) {
              newArr.push(j.objectID)
            }

            let a = new Set(newList)
            let b = new Set(newArr)
            let intersect = new Set([...a].filter(x => b.has(x)))

            console.log(intersect, 'intersect')

            list.map((item) => {
              item.checked = false
              for (const inner of intersect) {
                if (inner === item.objectID) {
                  item.checked = true
                }
              }
            })

            this.sponsorList = list
            this.loadShow = false
          }
          resolve(res)
        }).catch(error => {
          this.loadShow = false
          reject(error)
        })
      })
    },
    // 跳转组织页面
    handleClickChild(item) {
      console.log(item)
      // this.$router.push('/selectDepart/SelectDepartList')
    },
    // 单击选中
    handleClickSelect(item, index) {
      if (item.checked === false) {
        this.$set(item, 'checked', true)
      } else {
        this.$set(item, 'checked', false)
      }
      console.log(item, index)
      this.setItemChecked({data: item, index: index})
    },
    // 全选
    handleCheckAll() {
      const data = this.sponsorList
      console.log(data)
      const status = true
      const checkedStatus = this.allCheckStatus
      if (checkedStatus) {
        for (const value of data) {
          this.$set(value, 'checked', !status)
        }
      } else {
        for (const value of data) {
          this.$set(value, 'checked', status)
        }
      }
      this.setAlLChecked({data: data, state: this.allCheckStatus})
    },

    // 关闭tag
    handleClose(tag, index) {
      this.$set(tag, 'checked', false)
      this.setDeletePart({data: tag, index: index})
    },

    // 确定
    handleSureClick() {
      this.$router.push(this.filterPath)
      console.log(this.checkedDepartList, 'this.checkedDepartList')
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
        if (item.text.toLowerCase().indexOf(searchString) !== -1) {
          return item
        }
      })
      console.log(articlesArray, 'articlesArray')
      this.sponsorList = articlesArray
    }
  },
  watch: {
    $route() {
      this.addViewTags()
    },
    sponsorList: {
      handler() {
        let arr = []
        this.sponsorList.forEach((item) => {
          if (item.checked) {
            arr.push(item)
          }
        })
        if (arr.length === this.sponsorList.length && this.sponsorList.length > 0) {
          this.allCheckStatus = true
        } else {
          this.allCheckStatus = false
        }
      },
      deep: true
    }
  },
  components: {
    SelectHeader,
    SearchInput
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
  .selectDepartChild-box{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .search{
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
  .inner-box-nodata{
    position: absolute;
    width: 100%;
    height: 100%;
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
  .selectDepartChild-wrapper{
    width: 100%;
    flex: 1 0 auto;
    position: relative;
    .child-scroll {
      position: absolute;
      height: 100%;
      width: 100%;
      overflow: hidden;
      ul {
        .userList {
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
            .checked-icon {
              color: $mainColor;
            }
          }
          .inner-right {
            width: 92%;
            .inner-right-box {
              display: flex;
              width: 100%;
            }
            .img-box {
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
            .activeClass {
              background: $mainColor !important;
            }
            .activeClass1 {
              background: $warningColor !important;
            }
            .activeClass2 {
              background: $blueColor !important;
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
        .orgList {
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
    height: 44px;
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
</style>
