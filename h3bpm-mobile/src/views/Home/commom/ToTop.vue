<template>
  <div class="back-top" @click.prevent="backTop">
       <span class="svg-box">
             <svg-icon icon-class="top"/>
         </span>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    backTop() {
      this.$emit('backTop')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .back-top{
    position: fixed;
    right: 0;
    bottom: 150px;
    z-index: 20;
  .svg-box{
    padding: 0 15px 0 0;
    font-size: 32px;
    color: #2970FF;
  }
  }
</style>
