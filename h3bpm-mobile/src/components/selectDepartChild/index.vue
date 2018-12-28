<template>
  <div class="selectDepartChild-box">
    <div class="selectDepartChild-wrapper">
      <BtScroll class="child-scroll"
                ref="userList"
                @scroll="scroll"
                @refresh="refresh"
                :probe-type="probeType"
                :listenScroll="listenScroll"
                :pullingUp="pullingUp"
                :beforeScroll="beforeScroll"
                @beforeScroll="listScroll">
        <div class="selectDepartChild">
          <ul>
            <!--用户-->
            <li v-if="item.ExtendObject.UnitType === 'U'"  :key="index" v-for="(item, index) in sponsorList" @click="handleClickSelect(item, index)" class="userList">
                  <span class="svg-box">
                    <svg-icon icon-class="check" v-if="!item.checked"/>
                    <svg-icon class="checked-icon" v-else icon-class="checked"/>
                  </span>
              <div class="inner-right">
                <!--<span class="icon-text" :class="[index%2 === 1 ? activeClass : '', index%3 === 1 ? activeClass2 : '', index%4 === 1 ? activeClass3 : '']">{{item.name}}</span>-->
                <div class="inner-right-box">
                  <span class="img-box">
                    <img v-if="item.ExtendObject ? item.ExtendObject.UserImageUrl.length > 0 : ''" v-lazy="baseUrl + item.ExtendObject.UserImageUrl" alt="" class="icon-text">
                    <img v-else  v-lazy="item.ExtendObject.UserGender===2? woman : man" alt="" class="icon-text">
                  </span>
                  <span class="inner-text">{{item.Text}}</span>
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
      </BtScroll>
    </div>
    <div class="select-btm">
      <p class="btm-left" @click="handleCheckAll">
      <span class="svg-box">
      <svg-icon v-if="allCheckStatus" class="checked-icon" icon-class="checked"/>
      <svg-icon v-else icon-class="check"/>
      </span>
        <span class="allCheck">全选</span>
      </p>
      <p class="btm-right" @click="handleSureClick">确定</p>
    </div>
  </div>

</template>

<script>
import getPartMixin from '@/commom/mixins/selectPartList'
export default {
  name: 'selectDepartChild',
  mixins: [getPartMixin],
  data() {
    return {
      baseUrl: process.env.BASE_API,
      personList: [
        {
          checked: false,
          Text: '产品经理1',
          ExtendObject: {
            UnitType: 'U',
            UserImageUrl: [],
            UserGender: 1
          }
        },
        {
          checked: false,
          Text: '产品经理2',
          ExtendObject: {
            UnitType: 'O',
            UserImageUrl: [],
            UserGender: 1,
            ChildrenCount: 9
          }
        }
      ],
      man: '/static/images/man.svg', // 男头像
      woman: '/static/images/woman.svg'
    }
  },
  created() {
    const id = this.$route.params.objId
    this.$store.dispatch('addView', this.$route)
    let options = {
      IsMobile: true,
      ParentID: id,
      o: 'U'
    }
    this.$store.dispatch('getSelectDepartChildList', options)
    // console.log(this.$route)
  },
  computed: {
    // 数据列表
    sponsorList() {
      return this.$store.getters.sponsorList
    },
    // 已选列表
    checkedDepartList() {
      return this.$store.getters.checkedDepartList
    }
  },
  methods: {
    // 跳转组织页面
    handleClickChild(item) {
      console.log(item)
      // this.$router.push('/selectDepart/SelectDepartList')
    },
    // 单击选中
    handleClickSelect(item, index) {
      // console.log(item, index)
      this.$store.commit('SET_CHECKED_DEPART', {data: item, index: index})
    },
    // 全选
    handleCheckAll() {
      const data = this.sponsorList
      // console.log(data)
      this.setAlLChecked({data: data, state: this.allCheckStatus})
    },
    // 确定
    handleSureClick() {
      console.log(this.checkedDepartList, 'this.checkedDepartList')
    }
  },
  watch: {
    $route() {
      this.addViewTags()
    },
    sponsorList: {
      handler() { // 数据数组有变化将触发此函数
        // if (this.sponsorList.length === this.checkedDepartList.length && this.checkedDepartList.length !== 0) {
        //   this.allCheckStatus = true
        // } else {
        //   this.allCheckStatus = false
        // }
        let arr = []
        this.sponsorList.forEach((item) => {
          // console.log(item)
          if (item.checked) {
            arr.push(item)
          }
        })
        if (arr.length === this.sponsorList.length) {
          this.allCheckStatus = true
        } else {
          this.allCheckStatus = false
        }
      },
      deep: true // 深度监视
    }
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
