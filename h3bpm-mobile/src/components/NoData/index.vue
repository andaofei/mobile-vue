<template>
  <div class="no-data">
    <span>{{$t('home.noData')}}</span>
  </div>
</template>

<script>
export default {
  name: 'NoData'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .no-data {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 40%;
    left: 50%;
  span {
    font-size: 1rem;
    color: rgba(0,0,0,0.65);
  }
  }
</style>
