<template>
  <div class="search-input">
    <el-input
      size="small"
      placeholder="搜索用户"
      v-model="inputValue">
      <i slot="suffix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      inputValue: ''
    }
  }
}
</script>

<style scoped>
  .search-input{
    padding: 6px 10px;
  }
</style>
