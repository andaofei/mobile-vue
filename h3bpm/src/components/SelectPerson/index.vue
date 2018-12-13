<template>
    <div class="select-container">
      <div class="select-header">
        <p @click="back"><svg-icon icon-class="back"/></p>

        <p class="title">{{$t('selectPerson.title')}}</p>

        <p class="sure">&nbsp;&nbsp;&nbsp;&nbsp;</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SelectPerson',
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../commom/scss/mixin";
  @import "../../commom/scss/varible";
  .select-container {
    width: 100%;
    height: 100%;
    .select-header {
      padding: 14px 10px;
      display: flex;
      justify-content: space-between;
      background: $baseColor;
      @include border-bottom-1px($borderBottom);
      .title, .sure {
        font-size: $font-size-medium-x;
      }
      .sure {
        color: $mainColor;
      }
    }
  }
</style>
