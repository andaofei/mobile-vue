<template>
  <BtScroll class="tag-scroll"
            ref="userList"
            @scroll="scroll"
            @refresh="refresh"
            :probe-type="probeType"
            :listenScroll="listenScroll"
            :pullingUp="pullingUp"
            :beforeScroll="beforeScroll"
            @beforeScroll="listScroll">
    <div class="selectDepartDefault">
      <div :key="index" v-for="(item, index) in departList" v-if="item.ExtendObject.UnitType=== 'O'" class="wrapper">
        <div class="title">{{item.Text}}</div>
      <ul>
        <li :key="index" v-for="(inner, index) in item.children"  @click="handleClickChild(inner)">
           <span>{{inner.Text}}</span>
           <p>
             <span>{{inner.ExtendObject.ChildrenCount}}</span>
             <span class="svg-box">
               <svg-icon icon-class="right"></svg-icon>
            </span>
           </p>
        </li>
      </ul>
      </div>
    </div>
  </BtScroll>
</template>

<script>
import {getUserInfo} from '@/utils/auth'
import getPartMixin from '@/commom/mixins/selectPartList'
export default {
  name: 'selectDepartDefault',
  mixins: [getPartMixin],
  data() {
    return {
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      title: ''
    }
  },
  created() {
    let options = {
      IsMobile: true,
      LoadTree: true,
      Recursive: true,
      ParentID: getUserInfo().ParentID,
      o: 'U'
    }
    this.$store.dispatch('getSelectDepartList', options)
  },
  computed: {
    // 数据列表
    departList() {
      return this.$store.getters.departList
    }
  },
  methods: {
    handleClickChild(item) {
      if (item.ExtendObject.ChildrenCount === 0) {
        return false
      }
      this.$router.push({
        path: '/selectDepart/selectDepartChild',
        name: 'SelectDepartChild',
        params: {
          objId: item.ObjectID,
          title: item.Text
        }
      })
      this.title = item.Text
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../commom/scss/mixin";
  @import "../../../commom/scss/varible";
  .selectDepartDefault{
    position: relative;
    .wrapper{
      width: 100%;
      .title{
        padding: 0 10px;
        font-size: 1rem;
        font-weight: 500;
        line-height: 2rem;
      }
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
  }
</style>
