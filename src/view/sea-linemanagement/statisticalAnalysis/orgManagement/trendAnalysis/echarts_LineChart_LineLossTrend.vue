<template>
  <!--线损率趋势折线图-->
  <div class="echarts_LineChart_LineLossTrend">
    <div id="echartContainer">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import axios from '@/libs/api.request'
export default {
  components: {

  },
  props: {
    queryItems: {
      type: Object,
      default () {
        return {}
      }
    },
    refreshDataTrigger: {
      type: Boolean
    }
  },
  data () {
    return {
      lineChartDataList: [],
      xdata: [],
      ydata: [],
      lineChartXdata: [],
      lineChartYdata: []
    }
  },
  methods: {
    drawLineChart () {
      this.lineChartXdata = this.lineChartDataList.map(_ => _.date)
      this.lineChartYdata = this.lineChartDataList.map(_ => _.lineLossRate)
      var linevalue = 20
      var myecharts = echarts.init(document.getElementById('echartContainer'), 'light')
      myecharts.setOption({
        title: {
          text: '线损率趋势 ',
          textStyle: {
            color: '#448c86'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          show: true,
          showContent: true,
          formatter: '日期：{b0}<br>线损率：{c0}%'
        },
        grid: {
          left: '10%', // 距离左边的距离
          right: '5%', // 距离右边的距离
          bottom: '0%', // 距离下边的距离
          top: '30%', // 距离上边的距离
          containLabel: true
        },
        xAxis: [{
          axisLine: {
            interval: '0',
            lineStyle: { color: 'rgb(20, 31, 97)', width: 1 }
          },
          splitLine: {
            show: true
          },
          axisLabel: {
            show: true,
            rotate: 10
          },
          type: 'category',
          boundaryGap: false,
          // data: this.xdata
          data: this.lineChartXdata
        }],
        yAxis: [{
          name: '单位%',
          splitNumber: 4,
          type: 'value'
          // max: 40
        }],
        series: [
          {
            'name': '单位%',
            'type': 'line',
            // 'data': this.ydata,
            'data': this.lineChartYdata,
            'color': 'blue',
            'smooth': 0.3,
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label: {
                  show: true,
                  formatter: '{c}%'
                },
                borderColor: 'red', // 拐点边框颜色
                lineStyle: {
                  color: 'blue', width: 3
                }
              }
            }
          },
          {
            name: '平行于x轴的趋势线',
            type: 'line',
            markLine: {
              symbol: 'none', // 去掉箭头
              silent: true,
              data: [{
                yAxis: 20,
                lineStyle: {// 设置折线色颜色
                  width: 3
                }
              }],
              label: {
                show: false
              }
            }
          }
        ],
        // 颜色划分
        visualMap: {
          show: false,
          pieces: [
            {
              gt: 0,
              lte: linevalue, // 这儿设置基线上下颜色区分 基线下面为绿色
              color: '#448c86'
            }, {
              gt: linevalue, // 这儿设置基线上下颜色区分 基线上面为红色
              color: '#e91642'
            }]
        }
      })
    },
    publicFunction () {
      // ----------折线图-----------------
      axios.request({
        method: 'post',
        data: {
          // todo 现场请确认具体传参要求 下面两行
          'dateType': this.queryItems['modDateType'],
          'startDate': this.$parent.queryDateRange[0],
          'endDate': this.$parent.queryDateRange[1],
          'orgType': this.queryItems['modOrgType'],
          'orgNo': this.queryItems['modOrgNo']
        },
        url: '/sea-lineLose/unitControl/trendAnalysis/lineLoseRate'
      }).then(response => {
        this.lineChartDataList = response.data.data
        this.$nextTick(() => {
          this.drawLineChart()
        })
      })
    }
  },
  watch: {
    // orgManagement中该属性变化时，触发数据加载
    refreshDataTrigger () {
      this.publicFunction()
    }
  }
}
</script>

<style scoped>
#echartContainer {
  width: 700px;
  height: 150px;
}
</style>
