<template>
  <div class="setting-com">
    <sys-setting></sys-setting>
  </div>
</template>

<script>
import SysSetting from '@/components/SysSetting'

export default {
  name: 'Setting',
  data() {
    return {
    }
  },
  methods: {
  },
  components: {
    SysSetting
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg2: rgba(240,242,245,0.5);
  .setting-com {
    width: 100%;
    height: 100%;
    background: $bg2;
  }
</style>
