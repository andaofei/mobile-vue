<template>
  <div class="selectDepartChild">
    <ul class="inner-box">
      <li :key="item.id" v-for="(item, index) in personList" @click="handleClickSelect(item, index)">
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
  name: 'selectDepartList',

  data() {
    return {
      selected: -1,
      activeClass: 'activeClass',
      activeClass2: 'activeClass2',
      activeClass3: 'activeClass3'
    }
  },
  created() {
    this.$nextTick(() => {
      console.log(this.$route, 'selectDepartList')
      this.$store.dispatch('addView', this.$route)
    })
  },
  computed: {
    personList() {
      return this.$store.getters.personList
    }
  },

  methods: {
    // 单击选中
    handleClickSelect(item, index) {
      this.$store.commit('SET_CHECKED_PERSONS', {data: item, index: index})
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
