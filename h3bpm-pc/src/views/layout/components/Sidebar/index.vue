<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="bgColor"
      :text-color="textColor"
      :active-text-color="activeText"
      mode="vertical">
      <sidebar-item v-for="route in menuList" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      bgColor: '#002638',
      textColor: 'rgba(255, 255, 255, 0.7)',
      activeText: '#2970FF',
      menuList: [
        {
          name: '我的待办'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
