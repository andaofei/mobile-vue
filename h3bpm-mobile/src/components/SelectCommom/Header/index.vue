<template>
  <div class="select-header">
    <p @click="back" class="back"><svg-icon icon-class="left"/>{{$t('home.back')}}</p>
    <p class="title">{{$t('selectPerson.title')}}</p>
    <p class="sure">&nbsp;&nbsp;&nbsp;&nbsp;</p>
  </div>
</template>

<script>
export default {
  name: 'SelectHeader',
  methods: {
    back() {
      // console.log(this.$route)
      this.$router.go(-1)
      // if (this.$route.name !== 'SelectPerson') {
      //   this.$router.push('/selectPerson')
      // } else {
      //   this.$router.push(this.filterPath || '/dashboard')
      // }
    }
  },
  computed: {
    // 筛选历史
    filterPath() {
      return this.$store.getters.filterPath
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../commom/scss/mixin";
  $mainColor: #2970FF; // 主颜色
  $baseColor: #fff;
  $font-size-medium-x: 16px;
  $borderBottom:rgba(232, 232, 232, 1);
  .select-header {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    background: $baseColor;
    @include border-bottom-1px($borderBottom);
    .title,
    .back,
    .sure {
      line-height: 44px;
      font-size: $font-size-medium-x;
    }
    .back{
      color: $mainColor;
    }
    .sure {
      color: $mainColor;
    }
  }
</style>
