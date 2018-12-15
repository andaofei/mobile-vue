<template>
    <div class="selectDepartChild">
      <ul>
        <li :key="item.id" v-for="item in dataList" @click="handleClickChild(item)">
          <span>{{item.name}}</span>
          <p>
            <span>{{item.counts}}</span>
            <span class="svg-box">
            <svg-icon icon-class="right"></svg-icon>
            </span>
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
          name: '研发部',
          counts: 12,
          id: 0
        },
        {
          name: '研发部',
          counts: 12,
          id: 1
        },
        {
          name: '研发部',
          counts: 12,
          id: 2
        },
        {
          name: '研发部',
          counts: 12,
          id: 3
        },
        {
          name: '研发部',
          counts: 12,
          id: 4
        },
        {
          name: '研发部',
          counts: 12,
          id: 5
        },
        {
          name: '研发部',
          counts: 12,
          id: 6
        },
        {
          name: '研发部',
          counts: 122,
          id: 7
        },
        {
          name: '研发部',
          counts: 132,
          id: 8
        },
        {
          name: '研发部',
          counts: 132,
          id: 9
        },
        {
          name: '研发部',
          counts: 12,
          id: 10
        },
        {
          name: '研发部',
          counts: 12,
          id: 11
        },
        {
          name: '研发部',
          counts: 122,
          id: 12
        },
        {
          name: '研发部',
          counts: 132,
          id: 13
        },
        {
          name: '研发部',
          counts: 132,
          id: 14
        }
      ]
    }
  },
  created() {
    this.$nextTick(() => {
      console.log(this.$route, 'selectDepartChild')
      this.$store.dispatch('addView', this.$route)
    })
  },
  methods: {
    handleClickChild(item) {
      this.$router.push('/selectDepart/SelectDepartList')
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
  ul{
    li{
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
      line-height: 30px;
      color: $textColor2;
      @include border-bottom-1px($borderBottom);
    }
  }
}
</style>
