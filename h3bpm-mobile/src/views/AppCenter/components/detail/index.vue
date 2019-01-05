<template>
    <div class="detail-container">
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
       <div class="wrapper-header" v-loading="loading">
         <div class="title">{{title}}</div>
         <div class="table-type" v-if="WidgetType === 7">
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
                 :prop="item.ColumnCode"
                 :label="item.DisplayName"
               >
               </el-table-column>
             </el-table>
           </div>
           <div class="pageinations">
             <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page.sync="currentPage"
               :page-size="10"
               :pager-count="5"
               layout="total, prev, pager, next"
               :total="totalCounts">
             </el-pagination>
           </div>
         </div>
         <div class="table-type" v-if="WidgetType === 1">
           <div class="bar-title">
             <span class="item" v-for="(item, index) in barTitle" :key="index" @click="changeBarDate(item, index)" :class="{'isSelect': active === index}">{{item}}</span>
           </div>
           <div   ref="chart" :style="{height:barHeight,width:width}"></div>
         </div>
         <div class="table-type" v-if="WidgetType === 8">
           <div>
             <el-table
               :data="RowTable"
               :span-method="objectSpanMethod"
               border
               style="width: 100%; margin-top: 20px">
               <el-table-column
                 v-for="(item, index) in columnHeader"
                 :key="index"
                 :prop="item.Value"
                 :label="item.Value">
               </el-table-column>
             </el-table>
           </div>
         </div>
       </div>
      </div>
    </div>
</template>

<script>
import echarts from 'echarts' // echarts theme
// import { debounce } from '@/utils'
import {getReportPage, getReportDetail, getReportBar} from '@/api/appCenter'
import {ERR_OK} from '@/api/options/statusCode'
require('echarts/theme/macarons')
// import qs from 'qs'
// const animationDuration = 6000
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
      tableData: [],
      code: '',
      ObjectId: '',
      WidgetType: -1,
      active: 0,
      barHeight: '500px',
      width: '100%',
      chart: null,
      barTitle: [], // 柱状标题
      barData: [], // 柱状数据
      nameList: [], // 柱状数据
      loading: false, // loading
      tableData6: [
        {
          '部门': '技术',
          '月份': 12,
          '超时数': 1,
          '任务数': 1,
          '完成数': 1
        }
      ],
      columnHeader: [],
      RowTable: []
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
    this.code = appCode.ReportCode // 应用id
    const options = {
      Command: 'LoadReportPage',
      Code: appCode.ReportCode
    }
    this.$nextTick(() => {
      // 获取配置
      this.getReportOptions(options)
      setTimeout(() => {
      }, 200)
    })
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 参数配置
    getReportOptions(options) {
      let that = this
      return new Promise((resolve, reject) => {
        getReportPage(options).then(res => {
          if (res.code === ERR_OK) {
            const data = res.data
            // console.log(data, 'data')
            // console.log(data.ReportPage.ReportWidgets[0].DisplayName)
            that.title = data.ReportPage.ReportWidgets[0].DisplayName // 标题
            that.WidgetType = data.ReportPage.ReportWidgets[0].WidgetType // 表格类型
            that.ObjectId = data.ReportPage.ReportWidgets[0].ObjectID // id
            // console.log(that.WidgetType, 'type')
            switch (that.WidgetType) {
              case 1:
                const barOptions = {
                  Command: 'LoadChartsData',
                  UnitFilterDataJson: 'null',
                  ObjectId: data.ReportPage.ReportWidgets[0].ObjectID,
                  Code: that.code
                }
                that.getReportBar(barOptions)
                break
              case 7:
                const options = {
                  Command: 'LoadGridData',
                  FilterData: 'null',
                  WidgetID: data.ReportPage.ReportWidgets[0].ObjectID,
                  Code: that.code,
                  start: 0,
                  length: 10
                }
                that.getReportDetail(options)
                break
              case 8:
                const totalOptions = {
                  Command: 'LoadChartsData',
                  UnitFilterDataJson: 'null',
                  ObjectId: data.ReportPage.ReportWidgets[0].ObjectID,
                  Code: that.code
                }
                that.getReportTotal(totalOptions)
                break
            }
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取明细数据
    getReportDetail(options) {
      this.loading = true
      return new Promise((resolve, reject) => {
        getReportDetail(options).then(res => {
          this.loading = false
          if (res.code === ERR_OK) {
            const data = res.data
            this.totalCounts = data.iTotalRecords
            this.tableData = data.aaData
            this.tableColums = data.SourceColumns
          }
          resolve(res)
        }).catch(error => {
          this.loading = false
          reject(error)
        })
      })
    },
    // 更改柱状图日期
    changeBarDate(item, index) {
      this.active = index
      this.initChart(this.barTitle, this.nameList, this.barData[index])
    },
    // 获取柱状数据
    getReportBar(options) {
      this.loading = true
      return new Promise((resolve, reject) => {
        getReportBar(options).then(res => {
          this.loading = false
          if (res.code === ERR_OK) {
            const data = res.data
            const CloumData = data.MyChartsDataResult.Categories // 行
            const Grid = data.MyChartsDataResult.Series // 列
            if (Grid.length > 20) {
              this.barHeight = Grid.length * (20) + `px`
            }
            let arr = []
            let nameList = []
            let dataList = []
            CloumData.map((item) => {
              arr.push(item.value)
            })
            Grid.map((item) => {
              nameList.push(item.Name)
              dataList.push(item.Data)
            })
            // const sourceList = this.trans(dataList)
            this.barData = this.trans(dataList) // 数据
            this.nameList = nameList // y轴
            this.barTitle = arr // 标头
            setTimeout(() => {
              this.initChart(this.barTitle[0], this.nameList, this.barData[0])
            }, 300)
          }
          resolve(res)
        }).catch(error => {
          this.loading = false
          reject(error)
        })
      })
    },
    // 汇总表
    getReportTotal(totalOptions) {
      this.loading = true
      return new Promise((resolve, reject) => {
        getReportBar(totalOptions).then(res => {
          this.loading = false
          if (res.code === ERR_OK) {
            const data = res.data
            console.log(this.trans(data.ValueTable))
            // console.log(data.ColumnTable.ColumnHeaderTableLastLine)
            this.columnHeader = data.ColumnTable.ColumnHeaderTableLastLine
            this.RowTable = data.RowTable
            let arr = []
            this.RowTable.map((item) => {
              item.map((inner) => {
                arr.push(inner)
              })
            })
            console.log(arr)
            let list = arr.filter(item => item.ColumnCode === '月份')
            let list2 = arr.filter(item => item.ColumnCode === '部门')
            console.log(list)
            console.log(list2)
          }
          resolve(res)
        }).catch(error => {
          this.loading = false
          reject(error)
        })
      })
    },
    trans(arr) {
      let result = []
      arr.forEach(item => {
        item.forEach((d, i) => {
          let a = result[i] = result[i] || []
          a.push(d)
        })
      })
      return result
    },
    handleClickFilter() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      const options = {
        Command: 'LoadGridData',
        FilterData: 'null',
        WidgetID: this.ObjectId,
        Code: this.code,
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
        WidgetID: this.ObjectId,
        Code: this.code,
        start: val * 10,
        length: 10
      }
      this.getReportDetail(options)
    },
    initChart(arr, nameList, sourceList) {
      const self = this
      self.chart = echarts.init(self.$refs.chart, 'macarons')
      let option = {
        title: {
          text: '',
          subtext: ''
        },
        // color: ['#2970FF', '#FAAD14', '#52C41B', '#FF3B30'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: nameList,
          axisLabel: {
            formatter: function(value) {
              if (value.length > 5) {
                return value.substring(0, 5) + '...'
              } else {
                return value
              }
            },
            textStyle: {
              color: '#000',
              fontSize: '8px'
            }
          }
        },
        series: [
          {
            name: arr,
            type: 'bar',
            data: sourceList
          }
        ]
      }
      self.chart.setOption(option)
    },
    initChart2(arr, Grid, nameList, sourceList) {
      const self = this
      self.chart = echarts.init(self.$refs.chart, 'macarons')
      let dataMap = {}
      function dataFormatter(obj) {
        let pList = nameList
        let temp
        for (let year = 2002; year <= 204; year++) {
          let max = 0
          let sum = 0
          temp = obj[year]
          for (let i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i])
            sum += temp[i]
            obj[year][i] = {
              name: pList[i],
              value: temp[i]
            }
          }
          obj[year + 'max'] = Math.floor(max / 100) * 100
          obj[year + 'sum'] = sum
        }
        return obj
      }
      dataMap.dataGDP = dataFormatter({
        // max : 60000,
        2004: sourceList[0],
        2003: sourceList[1],
        2002: sourceList[2]
      })
      let option = {
        baseOption: {
          timeline: {
            // y: 0,
            axisType: 'category',
            // realtime: false,
            // loop: false,
            autoPlay: false,
            // currentIndex: 2,
            playInterval: 1000,
            // controlStyle: {
            //     position: 'left'
            // },
            data: arr,
            label: {
              formatter: function(s) {
                return (new Date(s)).getFullYear()
              }
            }
          },
          title: {
            subtext: '数据来自国家统计局'
          },
          tooltip: {
          },
          legend: {
            x: 'right',
            data: ['GDP']
          },
          calculable: true,
          grid: {
            top: 80,
            bottom: 100,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.value.replace('\n', '')
                  }
                }
              }
            }
          },
          xAxis: [
            {
              show: false,
              type: 'category',
              axisLabel: {'interval': 0},
              data: nameList,
              splitLine: {show: false}
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'GDP（亿元）'
            }
          ],
          series: [
            {name: 'GDP', type: 'bar'}
          ]
        },
        options: [
          {
            title: {text: '2002全国宏观经济指标'},
            series: [
              {data: dataMap.dataGDP['2002']}
            ]
          },
          {
            title: {text: '2003全国宏观经济指标'},
            series: [
              {data: dataMap.dataGDP['2003']}
            ]
          },
          {
            title: {text: '2004全国宏观经济指标'},
            series: [
              {data: dataMap.dataGDP['2004']}
            ]
          }
        ]
      }
      self.chart.setOption(option)
    },
    back() {
      this.$router.go(-1)
    }
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../../commom/scss/mixin";
  @import "../../../../commom/scss/varible";
  .detail-container {
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
        .title{
          padding: 10px 10px 0 20px;
        }
        .table-type{
          width: 100%;
        }
        .table-box{
          padding: 10px;
        }
        .bar-title{
          display: flex;
          padding: 10px;
          flex-wrap: wrap;
          .item{
            width: 33%;
            text-align: center;
            line-height: 20px;
          }
          .isSelect{
            color: $mainColor;
          }
        }
        .pageinations{
          text-align: right;
          padding: 0 10px;
        }
      }
    }
  }
</style>
