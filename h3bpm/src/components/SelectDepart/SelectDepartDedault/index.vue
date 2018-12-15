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
  name: 'selectDepartDefault',
  data() {
    return {
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      dataList: [
        {
          name: '事业部',
          counts: 12,
          id: 0
        },
        {
          name: '事业部',
          counts: 12,
          id: 1
        },
        {
          name: '事业部',
          counts: 12,
          id: 2
        },
        {
          name: '事业部',
          counts: 12,
          id: 3
        },
        {
          name: '事业部',
          counts: 12,
          id: 4
        },
        {
          name: '事业部',
          counts: 12,
          id: 5
        },
        {
          name: '事业部',
          counts: 12,
          id: 6
        },
        {
          name: '事业部',
          counts: 122,
          id: 7
        },
        {
          name: '事业部',
          counts: 132,
          id: 8
        },
        {
          name: '事业部',
          counts: 132,
          id: 9
        },
        {
          name: '事业部',
          counts: 12,
          id: 10
        },
        {
          name: '事业部',
          counts: 12,
          id: 11
        },
        {
          name: '事业部',
          counts: 122,
          id: 12
        },
        {
          name: '事业部',
          counts: 132,
          id: 13
        },
        {
          name: '事业部',
          counts: 132,
          id: 14
        }
      ],
      title: ''
    }
  },
  created() {
    this.$nextTick(() => {
      console.log(this.$route, 'default')
      this.$store.dispatch('addView', this.$route)
    })
  },
  methods: {
    handleClickChild(item) {
      this.$router.push('/selectDepart/selectDepartChild')
      this.title = item.name
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../commom/scss/mixin";
  @import "../../../commom/scss/varible";
  .selectDepartChild{
    ul {
      li {
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
