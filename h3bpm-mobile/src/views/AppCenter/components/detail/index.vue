<template>
    <div class="container">
      <div class="header">
        <p class="svg-box" @click="back">
          <svg-icon icon-class="left"/>返回
        </p>
        <div class="title">报表</div>
        <p @click="handleClickFilter" class="home-header-filter">
          <svg-icon icon-class="filter" />
          <span class="filter-text">{{$t('home.filter')}}</span>
        </p>
      </div>
      <div class="wrapper">
       <div class="wrapper-header">
         <div class="title">{{title}}</div>
         <div class="table-box">
           <el-table
             :data="tableData"
             max-height="400"
             border
             show-summary
             style="width: 100%">
             <el-table-column
               type="index"
               width="50">
             </el-table-column>
             <el-table-column
               v-for="(item, index) in tableColums"
               :key="index"
               :prop="item.DisplayName"
               :label="item.DisplayName"
             >
             </el-table-column>
           </el-table>
         </div>
         <div class="block">
           <el-pagination
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :current-page.sync="currentPage"
             :page-size="10"
             :page-sizes="[10, 20, 30, 40]"
             layout="total, prev, pager, next"
             :total="totalCounts">
           </el-pagination>
         </div>
       </div>
      </div>
    </div>
</template>

<script>
import {getReportPage, getReportDetail} from '@/api/appCenter'
import {ERR_OK} from '@/api/options/statusCode'
// import qs from 'qs'
export default {
  name: 'detail',
  components: {
  },
  data() {
    return {
      title: '',
      tableColums: [],
      totalCounts: 0,
      currentPage: 4,
      tableData: []
    }
  },
  created() {
    // console.log(this.$route.params.data.url)
    // const url = this.$route.params
    // console.log(this.$store.getters.reportOptions)
    const datas = this.$store.getters.reportOptions
    let reg = /([^\s\:\{\[\,]+)\s*\:/g
    let str2 = datas.replace(reg, '"$1"\:')
    const appCode = JSON.parse(str2)
    console.log(appCode)
    const options = {
      Command: 'LoadReportPage',
      Code: appCode.ReportCode
    }
    this.getReportOptions(options)
  },
  methods: {
    // 参数配置
    getReportOptions(options) {
      return new Promise((resolve, reject) => {
        getReportPage(options).then(res => {
          if (res.code === ERR_OK) {
            const data = res.data
            // console.log(data.ReportPage.ReportWidgets[0].DisplayName)
            this.title = data.ReportPage.ReportWidgets[0].DisplayName
            const options = {
              Command: 'LoadGridData',
              FilterData: 'null',
              // WidgetID: data.ReportPage.ReportWidgets[0].ObjectID,
              WidgetID: 'd12eee9c-73f4-4a23-9bf9-ba10194cdf9c',
              Code: 'SystemReport_10001',
              start: 0,
              length: 10
            }
            this.getReportDetail(options)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取数据
    getReportDetail(options) {
      return new Promise((resolve, reject) => {
        getReportDetail(options).then(res => {
          if (res.code === ERR_OK) {
            const data = res.data
            console.log(data.SourceColumns)
            console.log(data.aaData)
            this.totalCounts = data.iTotalRecords
            this.tableData = data.aaData
            this.tableColums = data.SourceColumns
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleClickFilter() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      const options = {
        Command: 'LoadGridData',
        FilterData: 'null',
        // WidgetID: data.ReportPage.ReportWidgets[0].ObjectID,
        WidgetID: 'd12eee9c-73f4-4a23-9bf9-ba10194cdf9c',
        Code: 'SystemReport_10001',
        start: val * 10,
        length: 10
      }
      this.getReportDetail(options)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      const options = {
        Command: 'LoadGridData',
        FilterData: 'null',
        // WidgetID: data.ReportPage.ReportWidgets[0].ObjectID,
        WidgetID: 'd12eee9c-73f4-4a23-9bf9-ba10194cdf9c',
        Code: 'SystemReport_10001',
        start: val * 10,
        length: 10
      }
      this.getReportDetail(options)
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../../commom/scss/mixin";
  @import "../../../../commom/scss/varible";
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: space-between;
      @include border-bottom-1px($borderBottom);
      padding: 0 10px;
      .svg-box{
        color: $mainColor;
        line-height: 44px;
      }
      .title {
        text-align: center;
        line-height: 44px;
      }
      .home-header-filter {
        color: $mainColor;
        line-height: 44px;
        .filter-text {
          font-size: 1rem;
        }
      }
    }
    .wrapper{
      flex: 1 0 auto;
      position: relative;
      .wrapper-header{
        position: absolute;
        width: 100%;
        height: 100%;
        .title,.table-box{
          padding: 10px;
        }
      }
    }
  }
</style>
