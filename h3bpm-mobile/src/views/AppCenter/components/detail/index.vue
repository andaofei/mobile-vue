<template>
    <div class="detail-container">
      <div class="header">
        <p class="svg-box" @click="back">
          <svg-icon icon-class="left"/> {{$t('appCenter.back')}}
        </p>
        <div class="title">{{$t('appCenter.report')}}</div>
        <p @click="handleClickFilter" class="home-header-filter">
          <svg-icon icon-class="filter" />
          <span class="filter-text">{{$t('home.filter')}}</span>
        </p>
      </div>
      <ToTop v-show="topTop" @backTop="backTop"></ToTop>
      <div class="detail-wrapper">
          <div class="detail-scroll" id="scroll" ref="scroll">
            <div class="wrapper-header" >
             <!--明细表-->
             <div class="table-type" v-show="ListTitle">
               <div class="title">{{ListTitle}}</div>
               <div class="table-box">
                 <el-table
                   :data="tableData"
                   height="400"
                   border
                   show-summary
                   style="width: 100%">
                   <el-table-column
                     type="index"
                     label="行号"
                     fixed
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

              <!--汇总表-->
             <div class="table-type" v-show="TotalTitle">
               <div class="title">{{TotalTitle}}</div>
               <div>
                 <el-table
                   v-show="false"
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

                 <el-table
                   v-show="false"
                   :data="tableData6"
                   :span-method="objectSpanMethod"
                   border
                   style="width: 100%; margin-top: 20px">
                   <el-table-column
                     prop="id"
                     label="ID">
                   </el-table-column>
                   <el-table-column
                     prop="name"
                     label="姓名">
                   </el-table-column>
                   <el-table-column
                     prop="amount1"
                     label="数值 1（元）">
                   </el-table-column>
                   <el-table-column
                     prop="amount2"
                     label="数值 2（元）">
                   </el-table-column>
                   <el-table-column
                     prop="amount3"
                     label="数值 3（元）">
                   </el-table-column>
                 </el-table>
                 <table border= "1 "   width= "300" >
                   <tr>
                     <td colspan="4"  >ss

                     </td>
                   </tr>
                   <tr>
                     <td   width= "25% "> 4 </td>
                     <td   width= "25% "> 4 </td>
                     <td   width= "25% "> 4 </td>
                     <td   width= "25% "> 4 </td>
                   </tr>
                   <tr>
                     <td   width= "25%" rowspan="2"> 3 </td>
                     <td   width= "25% "> 3 </td>
                     <td   width= "25% "> 3 </td>
                     <td   width= "25% "> 3 </td>
                   </tr>
                   <tr>

                     <td   width= "25% "> 2 </td>
                     <td   width= "25% " rowspan="3"> 2 </td>
                     <td   width= "25% "> 2 </td>
                   </tr>
                   <tr>
                     <td   width= "25% " colspan="2"  > 2 </td>
                     <td   width= "25% "> 2 </td>

                   </tr>
                   <tr>
                     <td   width= "25% ">  </td>
                     <td   width= "25% "> 2 </td>
                     <td   width= "25% "> 2 </td>

                   </tr>
                 </table>
               </div>
             </div>

             <!--折线图-->
             <div class="table-type" v-show="LineTitle">
               <div class="title">{{LineTitle}}</div>
               <div   ref="LineChart" :style="{height:'400px',width:width}"></div>
             </div>

             <!--柱状图-->
             <div class="table-type" v-show="BarTitle">
               <div class="title">{{BarTitle}}</div>
               <p class="type">(类别)</p>
               <div class="bar-title">
                 <span class="item" v-for="(item, index) in barTitle" :key="index" @click="changeBarDate(item, index)" :class="{'isSelect': active === index}">{{item}}</span>
               </div>
               <div   ref="barChart" :style="{height:barHeight,width:width}"></div>
             </div>

             <!--饼图-->
             <div class="table-type" v-show="PieTitle">
               <div class="title">{{PieTitle}}</div>
               <div   ref="PieChart" :style="{height:'400px',width:width}"></div>
             </div>

             <!--雷达图-->
             <div class="table-type" v-show="RadarTitle">
               <div class="title">{{RadarTitle}}</div>
               <div   ref="RadarChart" :style="{height:'500px',width:width}"></div>
             </div>

             <!--漏斗图-->
             <div class="table-type" v-show="FunnelTitle">
               <div class="title">{{FunnelTitle}}</div>
               <div   ref="FunnelChart" :style="{height:'500px',width:width}"></div>
             </div>

             <!--简易看板-->
             <div class="table-type" v-show="SimpleTitle">
               <div class="title">{{SimpleTitle}}</div>
                 <div class="simple-box">
                   <ul>
                     <li v-for="(item, index) in simpData" :key="index" :class="{'noSolid': index === 2 || index === 4, 'noSolid2': simpData.length > 4}">
                       <span class="left">{{item.Value}}</span>
                       <span>{{item.Text}}</span>
                     </li>
                   </ul>
                 </div>
             </div>
         </div>
      </div>
      </div>
      <!--筛选-->
      <transition :name="transitionName">
        <div class="filter-box" v-show="filterShow" >
          <div class="filter-left" @click="handleHiddenBox">
          </div>
          <FilterBox @handleHiddenBox="handleHiddenBox"  @handleSearchBox="handleSearchBox" :filterData="filterData"></FilterBox>
        </div>
      </transition>
    </div>
</template>

<script>
import appCenterMixin from '@/commom/mixins/appCenterMixin'
import echarts from 'echarts' // echarts theme
import {getReportPage, getReportDetail, getReportBar, getReportSimple} from '@/api/appCenter'
import {ERR_OK} from '@/api/options/statusCode'
import ToTop from '@/views/Home/commom/ToTop'
require('echarts/theme/macarons')
export default {
  name: 'detail',
  mixins: [appCenterMixin],
  components: {
    ToTop
  },
  data() {
    return {
      filterShow: false,
      ListTitle: '',
      BarTitle: '',
      TotalTitle: '',
      PieTitle: '',
      RadarTitle: '',
      LineTitle: '',
      SimpleTitle: '',
      FunnelTitle: '', // 漏斗图
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
      barChart: null,
      lineChart: null,
      pieChart: null,
      radarChart: null,
      funnelChart: null,
      barTitle: [], // 柱状标题
      barData: [], // 柱状数据
      nameList: [], // 柱状数据
      loading: false, // loading
      columnHeader: [],
      RowTable: [],
      SimpleTable: [],
      valueTable: [],
      topTop: false,
      scrollTop: '',
      scrollBox: '',
      simpData: [],
      filterData: {},
      filterDetail: null,
      tableData6: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
    }
  },
  created() {
    const datas = this.$store.getters.reportOptions
    let reg = /([^\s\:\{\[\,]+)\s*\:/g
    let str2 = datas.replace(reg, '"$1"\:')
    const appCode = JSON.parse(str2)
    this.code = appCode.ReportCode // 应用id
    const options = {
      Command: 'LoadReportPage',
      Code: this.code
    }
    this.$nextTick(() => {
      // 获取配置
      this.getReportOptions(options, this.filterDetail)
      setTimeout(() => {
      }, 200)
    })
  },
  mounted() {
    this.$nextTick(function() {
      this.scrollBox = this.$refs.scroll
      // 修改事件监听
      this.scrollBox.addEventListener('scroll', this.handleScroll)
    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 监听滚动
    handleScroll() {
      let scrollTop = this.scrollBox.scrollTop
      if (scrollTop > 200) {
        this.topTop = true
      } else {
        this.topTop = false
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        // console.log(rowIndex)
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
    // 回顶部
    backTop() {
      this.scrollBox.scrollTop = 0
    },
    handleHiddenBox() {
      this.filterShow = false
    },
    // 筛选
    handleSearchBox(item) {
      console.log(item)
      this.simpData = []
      this.filterShow = false
      const options = {
        Command: 'LoadReportPage',
        Code: this.code
      }
      this.filterDetail = item
      this.getReportOptions(options, JSON.stringify(this.filterDetail))
    },
    handleClickFilter() {
      this.filterShow = true
    },
    // 下拉
    scroll(pos) {
      if (pos.y < -100) {
        this.topTop = true
      } else {
        this.topTop = false
      }
    },

    // 获取dataPage
    getReportOptions(options, filter) {
      return new Promise((resolve, reject) => {
        getReportPage(options).then(res => {
          if (res.code === ERR_OK) {
            const data = res.data
            const filterList = res.data.ReportPage.Filters
            filterList.map((item) => {
              item.inputValue = ''
            })
            this.filterData = filterList
            for (const item of data.ReportPage.ReportWidgets) {
              this.loadData(item, filter)
            }
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 加载表格数据
    loadData(item, filter) {
      switch (item.WidgetType) {
        case 0: // 0 折线图
          this.LineTitle = item.DisplayName
          const lineOptions = {
            Command: 'LoadChartsData',
            UnitFilterDataJson: null,
            FilterData: filter,
            ObjectId: item.ObjectID,
            Code: this.code
          }
          this.getReportLine(lineOptions)
          break
        case 1: //  1 柱状图
          this.BarTitle = item.DisplayName
          const barOptions = {
            Command: 'LoadChartsData',
            UnitFilterDataJson: 'null',
            FilterData: filter,
            ObjectId: item.ObjectID,
            Code: this.code
          }
          this.getReportBar(barOptions)
          break
        case 2: //  2 饼图
          this.PieTitle = item.DisplayName
          const PieOptions = {
            Command: 'LoadChartsData',
            UnitFilterDataJson: null,
            FilterData: filter,
            ObjectId: item.ObjectID,
            Code: this.code
          }
          this.getReportPie(PieOptions)
          break
        case 4: //  4 雷达图
          this.RadarTitle = item.DisplayName
          const RadarOptions = {
            command: 'LoadChartsData',
            unitFilterDataJson: null,
            filterData: filter,
            objectId: item.ObjectID,
            code: this.code
          }
          this.getRadarRadar(RadarOptions)
          break
        case 6: // 6 漏斗图
          this.FunnelTitle = item.DisplayName
          const FunnelOptions = {
            Command: 'LoadChartsData',
            UnitFilterDataJson: null,
            FilterData: filter,
            ObjectId: item.ObjectID,
            Code: this.code
          }
          this.getReportFunnel(FunnelOptions)
          break
        case 7: //  7 明细表
          this.ListTitle = item.DisplayName
          this.ObjectId = item.ObjectID
          const options = {
            Command: 'LoadGridData',
            FilterData: filter,
            WidgetID: item.ObjectID,
            Code: this.code,
            start: 0,
            length: 10
          }
          this.getReportDetail(options)
          break
        case 8: //  8 汇总表
          this.TotalTitle = item.DisplayName
          const totalOptions = {
            Command: 'LoadChartsData',
            UnitFilterDataJson: null,
            FilterData: filter,
            ObjectId: item.ObjectID,
            Code: this.code
          }
          this.getReportTotal(totalOptions)
          break
        case 9: //  9 简易看板
          this.SimpleTitle = item.DisplayName
          let that = this
          for (const j of item.ReportWidgetSimpleBoard) {
            if (j.ReportSourceId) { // 只获取sourceId
              const SimpleOptions = {
                command: 'LoadSimpleBoard',
                unitFilterDataJson: null,
                filterData: filter,
                widgetObjectId: j.ParentObjectID,
                reportPageObjectId: this.code,
                reportWidgetSimpleBoardObjectId: j.ObjectID,
                widgetSimpleBoard: item
              }
              // this.getReportSimple(SimpleOptions)
              that.getReportSimpleData(SimpleOptions)
            }
          }
          break
      }
    },

    // 明细表
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
      this.barChart.clear() // 清除画布
      this.barChart.off('click') // 清除点击事件
      this.initChart(this.barTitle[index], this.nameList, this.barData[index])
    },

    // 柱状图
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
    initChart(arr, nameList, sourceList) {
      const self = this
      self.barChart = echarts.init(self.$refs.barChart, 'macarons')
      let option = {
        title: {
          text: '',
          subtext: ''
        },
        color: ['#7AAFFF', '#FAAD14', '#52C41B', '#FF3B30'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
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
      self.barChart.setOption(option, true)
      self.barChart.on('click', function(params) {
        console.log(params.value)
        console.log(params.name)
      })
    },

    // 折线图
    getReportLine(options) {
      return new Promise((resolve, reject) => {
        getReportBar(options).then(res => {
          this.loading = false
          if (res.code === ERR_OK) {
            const data = res.data
            const lineY = data.MyChartsDataResult.Categories
            let arr = []
            for (const i of lineY) {
              arr.push(i.value)
            }
            const lineData = data.MyChartsDataResult.Series
            lineData.map((item) => {
              item.type = 'line'
              item.data = item.Data
              item.name = item.Name
            })
            setTimeout(() => {
              this.initLine(lineData, arr)
            }, 300)
          }
          resolve(res)
        }).catch(error => {
          this.loading = false
          reject(error)
        })
      })
    },
    initLine(lineData, arr) {
      const self = this
      self.lineChart = echarts.init(self.$refs.LineChart, 'macarons')
      let option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // orient: 'center',
          // // data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          data: arr,
          type: 'scroll'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: arr
        },
        yAxis: {
          type: 'value'
        },
        series: lineData
      }
      self.lineChart.setOption(option)
      self.lineChart.on('click', function(params) {
        console.log(params.value)
        console.log(params.name)
      })
    },

    // 饼图
    getReportPie(options) {
      return new Promise((resolve, reject) => {
        getReportBar(options).then(res => {
          this.loading = false
          if (res.code === ERR_OK) {
            const data = res.data
            // console.log(data, 'Piedata')
            const pieData = data.MyChartsDataResult.Series
            let legend = []
            pieData.map((item) => {
              item.value = item.Data[0]
              item.name = item.Name
              legend.push(item.name)
            })
            this.initPie(pieData, legend)
          }
          resolve(res)
        }).catch(error => {
          this.loading = false
          reject(error)
        })
      })
    },
    initPie(pieData, legend) {
      const self = this
      self.pieChart = echarts.init(self.$refs.PieChart, 'macarons')
      let option = {
        title: {
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          data: legend,
          type: 'scroll'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: pieData,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b}({d}%)'
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                formatter: '{d}%'
              }
            }
          }
        ]
      }
      self.pieChart.setOption(option)
      self.pieChart.on('click', function(params) {
        console.log(params.value)
        console.log(params.name)
      })
    },

    // 雷达图
    getRadarRadar(options) {
      return new Promise((resolve, reject) => {
        getReportBar(options).then(res => {
          this.loading = false
          if (res.code === ERR_OK) {
            const data = res.data
            // console.log(data, 'Radar')
            const Categories = data.MyChartsDataResult.Categories
            let CategoriesList = []
            let CategoriesName = []
            for (const i of Categories) {
              CategoriesList.push(i.value)
            }
            const SeriesData = data.MyChartsDataResult.Series
            SeriesData.map((item) => {
              let max = item.Data.reduce(function(a, b) {
                return b > a ? b : a
              })
              item.name = item.Name
              item.value = item.Data
              CategoriesName.push({name: item.Name, max: max + 1}) // max
            })
            this.initRadar(CategoriesList, SeriesData, CategoriesName)
          }
          resolve(res)
        }).catch(error => {
          this.loading = false
          reject(error)
        })
      })
    },
    initRadar(CategoriesList, SeriesData, CategoriesName) {
      const self = this
      self.radarChart = echarts.init(self.$refs.RadarChart, 'macarons')
      let option = {
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: CategoriesList,
          type: 'scroll'
          // data: ['预算分配', '实际开销']
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: CategoriesName
        },
        series: [{
          name: '',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: SeriesData
        }]
      }
      self.radarChart.setOption(option)
      self.radarChart.on('click', function(params) {
        console.log(params.value)
        console.log(params.name)
      })
    },

    // 漏斗图
    getReportFunnel(options) {
      return new Promise((resolve, reject) => {
        getReportBar(options).then(res => {
          this.loading = false
          if (res.code === ERR_OK) {
            const data = res.data
            const FunnelData = data.MyChartsDataResult.Series
            let legend = []
            FunnelData.map((item) => {
              item.value = item.Data[0]
              item.name = item.Name
              legend.push(item.name)
            })
            setTimeout(() => {
              this.initFunnel(FunnelData, legend)
            }, 300)
          }
          resolve(res)
        }).catch(error => {
          this.loading = false
          reject(error)
        })
      })
    },
    initFunnel(FunnelData, legend) {
      // console.log(FunnelData, legend)
      const self = this
      self.funnelChart = echarts.init(self.$refs.FunnelChart, 'macarons')
      let option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'item'
          // formatter: '{a} <br/>{b} : {c}%'
        },
        legend: {
          data: legend,
          type: 'scroll'
        },
        calculable: true,
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 60,
            // x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 3,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              normal: {
                show: true,
                position: 'inside'
              },
              emphasis: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            labelLine: {
              normal: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b}({d}%)'
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                formatter: '{d}%'
              }
              // normal: {
              //   borderColor: '#fff',
              //   borderWidth: 1
              // }
            },
            data: FunnelData
          }
        ]
      }
      self.funnelChart.setOption(option)
      self.funnelChart.on('click', function(params) {
        console.log(params.value)
        console.log(params.name)
      })
    },

    // 简易看板
    getReportSimpleData(options) {
      return new Promise((resolve, reject) => {
        return getReportSimple(options).then((res) => {
          if (res.code === ERR_OK) {
            this.simpData.push(res.data)
          }
        }).catch(error => {
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
            this.columnHeader = data.ColumnTable.ColumnHeaderTableLastLine
            this.RowTable = data.RowTable
            this.valueTable = data.ValueTable
            let arr = []
            this.RowTable.map((item) => {
              item.map((inner) => {
                arr.push(inner)
              })
            })
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

    // 分页
    handleSizeChange(val) {
      console.log(val)
      const options = {
        Command: 'LoadGridData',
        FilterData: null,
        WidgetID: this.ObjectId,
        Code: this.code,
        start: (val - 1) * 10,
        length: 10
      }
      this.getReportDetail(options)
    },

    handleCurrentChange(val) {
      const options = {
        Command: 'LoadGridData',
        FilterData: null,
        WidgetID: this.ObjectId,
        Code: this.code,
        start: (val - 1) * 10,
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
@import "../scss/detail";
</style>
