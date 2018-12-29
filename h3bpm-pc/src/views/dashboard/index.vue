<template>
  <div class="dashboard-container">
    <div class="container-header">
      <p class="title">我的待办</p>
      <div class="search-box">
        <div class="btn-box"><el-button type="primary">发起流程</el-button></div>
        <el-input v-model="searchInner" placeholder="请输入内容" maxlength="12">
          <i slot="suffix" class="el-input__icon el-icon-search"/>
        </el-input>
      </div>
    </div>
    <div class="wrapper">
      <div class="table-box">
        <div ref="tableHeight" class="table-inner">
          <div class="table-body">
            <el-table
              :data="tableData"
              :header-cell-class-name="headerClass"
              :height="tHeight"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="50"/>

              <el-table-column
                prop="date"
                label="标记"
                width="180"/>

              <el-table-column
                prop="name"
                label="流程名称"
                width="180"/>

              <el-table-column
                prop="address"
                label="任务名称"/>

              <el-table-column
                prop="startTine"
                label="接收时间"/>

              <el-table-column
                prop="address"
                label="发起人"/>

              <el-table-column
                prop="address"
                label="发起人所属组织"/>
            </el-table>
          </div>
        </div>
        <div class="page-actions">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            :total="400"
            layout="total, sizes, prev, pager, next, jumper"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { roleMixin } from '@/commom/mixin/tableHeight'

export default {
  name: 'Dashboard',
  components: { },
  mixins: [roleMixin],
  data() {
    return {
      searchInner: '',
      currentPage: 0,
      headerClass: 'headerClass',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        org: '上海市普陀区金沙江路 1518 弄',
        startTine: '上海市普陀区金沙江路 1518 弄',
        endTime: '上海市普陀区金沙江路 1518 弄'
      }
      ]
    }
  },
  computed: {
  },
  created() {
    this.$nextTick(() => {
      this.tHeight = this.$refs.tableHeight.clientHeight - 10
    })
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/mixin";
  .dashboard-container{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    background: $mainBg;
    .container-header{
      display: flex;
      justify-content: space-between;
      padding: 0 10px 10px 10px;
      .title{
        font-weight: 500;
        line-height: 32px;
      }
      .search-box{
        display: flex;
        .btn-box{
          padding-right: 10px;
        }
      }
    }
    .wrapper{
      flex: 1 1 auto;
      background: $bgColor;
      border-radius: 4px;
      box-shadow:0 2px 8px 0 rgba(30,85,255,0.1);
      position: relative;
      .table-box{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .table-inner{
          flex: 1 0 auto;
          padding: 0;
          position: relative;
          .table-body{
            position: absolute;
            width: 100%;
            height: 100%;
            padding: 10px;
          }
        }
        .page-actions{
          padding: 10px 20px;
          height: 56px;
          //@include border-top-1px($borderBottom);
          text-align: right;
          background: $bgColor;
        }
      }
    }
  }
</style>
<style>
  .headerClass{
    background: rgba(244,246,252,1)!important;
  }
</style>
