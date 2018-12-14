<template>
    <div class="select-container">
      <!--<header></header>-->
      <SelectHeader></SelectHeader>
      <!--body-->
      <div class="select-box">
        <div class="search">
          <div class="search-header">
            <!--搜索框-->
            <SearchInput></SearchInput>
            <!--组织-->
            <div class="organization" @click="selectDepart">
              <p>
              <span class="svg-box">
                  <svg-icon icon-class="orgnazition"></svg-icon>
              </span>
                <span class="text">组织机构</span>
                </p>
              <span class="svg-box">
                <svg-icon icon-class="right"></svg-icon>
              </span>
            </div>
            <!--部门-->
            <div class="department">
                <span class="vertical-line"></span>
                <p class="text">本部门</p>
            </div>
          </div>
          <!--主体-->
          <div class="search-inner">
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
                    <li :key="item.id" v-for="(item, index) in dataList" @click="handleClickSelect(item, index)">
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
        </div>
      </div>
      <div class="select-btm">
        <p class="btm-left" @click="handleCheckAll">
          <span class="svg-box">
            <svg-icon v-if="listChecked" class="checked-icon" icon-class="checked"/>
             <svg-icon v-else icon-class="check"/>
         </span>
          <span class="allCheck">全选</span>
        </p>
        <p class="btm-right" @click="handleSureClick">确定</p>
      </div>
    </div>
</template>

<script>
import BtScroll from '@/components/BtScroll/index'
import SelectHeader from '@/components/SelectCommom/Header/index'
import SearchInput from '@/components/SelectCommom/InputSearch/index'
export default {
  name: 'SelectPerson',
  data() {
    return {
      dataList: [
        {
          name: '李四',
          position: '产品经理',
          id: 0,
          checked: false
        },
        {
          name: '张三',
          position: '产品经理',
          id: 1,
          checked: false
        },
        {
          name: '王五',
          position: '产品经理',
          id: 2,
          checked: false
        },
        {
          name: '李四',
          position: '产品经理',
          id: 3,
          checked: false
        },
        {
          name: '张三',
          position: '产品经理',
          id: 4,
          checked: false
        },
        {
          name: '王五',
          position: '产品经理',
          id: 5,
          checked: false
        },
        {
          name: '李四',
          position: '产品经理',
          id: 6,
          checked: false
        },
        {
          name: '张三',
          position: '产品经理',
          id: 7,
          checked: false
        },
        {
          name: '王五',
          position: '产品经理',
          id: 8,
          checked: false
        }
      ],
      dataListChecked: [],
      dataListAllChecked: [],
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      selected: -1,
      activeClass: 'activeClass',
      activeClass2: 'activeClass2',
      activeClass3: 'activeClass3'
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

  methods: {
    selectDepart() {
      this.$router.push('/selectDepart')
    },

    // 单击选中
    handleClickSelect(item, index) {
      let check = this.dataList[index].checked
      const status = !check
      this.dataList[index].checked = status
      this.dataListChecked = this.dataList
      // console.log(this.dataListChecked, 'dataListChecked')
      this.$store.commit('SET_CHECKED_PERSONS', this.dataListChecked)
    },

    // 全选
    handleCheckAll() {
      // console.log(this.listChecked, 'listChecked')
      if (!this.listChecked) {
        this.dataList.forEach((item) => {
          item.checked = true
        })
      } else {
        this.dataList.forEach((item) => {
          item.checked = false
        })
        this.$refs.userList.scrollTo(0, 0)
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
      this.dataListChecked = this.dataList
      this.$store.commit('SET_CHECKED_PERSONS', this.dataListChecked)
      // console.log(this.dataListChecked.length, 'dataListChecked')
    },

    // 关闭tag
    handleClose(tag, index) {
      let check = this.dataList[index].checked
      const status = !check
      this.dataList[index].checked = status
      this.dataListChecked = this.dataList
      this.$store.commit('SET_CHECKED_PERSONS', this.dataListChecked)
    },

    // 确定
    handleSureClick() {
      let arr = []
      this.dataListChecked.forEach((item) => {
        if (item.checked) {
          arr.push(item)
        }
      })
      this.dataListAllChecked = arr
      console.log(this.dataListAllChecked, 'this.dataListAllChecked')
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
    listChecked: {
      get() {
        // console.log(this.dataListChecked, 'this.dataListChecked')
        let arr = []
        this.dataListChecked.forEach((item) => {
          if (item.checked) {
            arr.push(item)
          }
        })
        // console.log(arr, 'arr')
        if (arr.length === this.dataList.length) {
          return true
        }
        return false
      },
      set() {
        console.log(this.dataListChecked, 'this.dataListChecked')
      }
    },
    checkedPersonList() {
      return this.$store.getters.checkedPersonList
    }
  },
  watch: {
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
            span{
              color: $textColor2;
              /*font-size: 14px;*/
              padding: 0 5px;
              margin-left: 4px;
              margin-bottom: 5px;
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
  }
</style>
