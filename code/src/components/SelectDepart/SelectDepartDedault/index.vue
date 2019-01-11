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
      <div class="wrapper">
        <div class="selected-person">
          <el-tag
            :key="tag.id"
            v-for="(tag, index) in checkedDepartList"
            v-if="tag.checked"
            closable
            :disable-transitions="false"
            @close="handleClose(tag, index)">
            {{tag.Text}}
          </el-tag>
        </div>
        <div>
        <div class="title">{{departTitle}}</div>
        <ul>
        <li :key="index" v-for="(item, index) in departList"  @click="handleClickChild(item)">
           <span>{{item.Text}}</span>
           <p>
             <span>{{item.ExtendObject.ChildrenCount}}</span>
             <span class="svg-box">
               <svg-icon icon-class="right"></svg-icon>
            </span>
           </p>
        </li>
      </ul>
        </div>
      </div>
    </div>
  </BtScroll>
</template>

<script>
import {getUserInfo} from '@/utils/auth'
import getPartMixin from '@/commom/mixins/selectPartList'
import {getSelectPerson} from '@/api/getworkitems'
import {ERR_OK} from '@/api/options/statusCode'
export default {
  name: 'selectDepartDefault',
  mixins: [getPartMixin],
  data() {
    return {
      probeType: 0,
      pullingUp: true,
      beforeScroll: true,
      title: '',
      departTitle: '',
      departList: []
    }
  },
  created() {
    this.initList()
    // let options = {
    //   IsMobile: true,
    //   LoadTree: true,
    //   Recursive: true,
    //   ParentID: getUserInfo().ParentID,
    //   o: 'U'
    // }
    // console.log(options)
    // this.$store.dispatch('getSelectDepartList', options)
  },

  computed: {
    checkedDepartList() {
      return this.$store.getters.checkedDepartList
    }
    // 数据列表
    // departList() {
    //   return this.$store.getters.departList
    // },
    // departTitle() {
    //   return this.$store.getters.departTitle
    // }
  },

  methods: {
    // 获取数据
    initList() {
      let options = {
        IsMobile: true,
        LoadTree: true,
        Recursive: true,
        ParentID: getUserInfo().ParentID,
        o: 'U'
      }
      return new Promise((resolve, reject) => {
        getSelectPerson(options).then(res => {
          console.log(res.data, 'data')
          if (res.code === ERR_OK) {
            const list = res.data[0].children
            this.departTitle = res.data[0].Text
            this.departList = list
          }
          resolve(res)
        }).catch(error => {
          console.error(error)
          reject(error)
        })
      })
    },
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
  .selected-person {
    display: flex;
    flex-wrap: wrap;
    line-height: 40px;
    padding: 4px 10px 0 10px;
    justify-content: flex-start;
    background: $baseColor;
    max-height: 100px;
    overflow: scroll;
    span {
      color: $textColor2;
      /*font-size: 14px;*/
      padding: 0 5px;
      margin-left: 4px;
      margin-bottom: 5px;
    }
  }
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
