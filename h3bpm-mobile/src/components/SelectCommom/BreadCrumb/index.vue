<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <!--<el-breadcrumb-item :to="{ path: '/selectDepart' }">H3BPM</el-breadcrumb-item>-->
    <el-breadcrumb-item  v-for="(item) in visitedViews" :key="item.fullPath" :to="{ path: item.fullPath }">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data() {
    return {
      levelList: ''
    }
  },
  create() {
    // console.log(this.$route)
  },
  computed: {
    visitedViews() {
      return this.$store.getters.visitedViews
    }
  }
}
</script>

<style scoped>

</style>
