<template>
  <div class="selectDepartChild">
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
  </div>
</template>

<script>
export default {
  name: 'selectDepartChild',
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
      selected: -1,
      activeClass: 'activeClass',
      activeClass2: 'activeClass2',
      activeClass3: 'activeClass3'
    }
  },
  methods: {
    // 单击选中
    handleClickSelect(item, index) {
      let check = this.dataList[index].checked
      const status = !check
      this.dataList[index].checked = status
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
  .selectDepartChild{
    width: 100%;
    background: #fff;
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
</style>
