<template>
  <div class="electricity-chart" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'
export default {
  name: 'electricityStatisticsCharts',
  props: {
    electricityStatisticsData: Array,
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    removeNull (val) {
      return judgeNull(val, '')
    },
    resize () {
      if (typeof this.dom !== 'undefined' && this.dom !== null) {
        this.dom.resize()
      }
    },
    draw() {
      this.$nextTick(() => {
        if (
          typeof this.electricityStatisticsData === 'undefined' ||
          this.electricityStatisticsData === null
        ) {
          return
        }
        let option = {
          title: {
            text: '用电(kWh)',
            textStyle: {
              fontWeight: 'normal',
              color: '#9ea7b4',
              fontSize: '12'
            },
            top: '3%',
            left: '1%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '5%',
            bottom: '8%',
            top: '15%',
            containLabel: true
          },
          legend: {
            data: ['用电量'],
            align: 'left',
            top: '3%',
            right: '5%'
          },
          xAxis: {
            type: 'category',
            data: ['0901', '0902', '0903', '0904', '0905', '0906', '0907', '0908', '0909', '0910', '0911', '0912', '0913'],
            axisTick: {
              show: false // 隐藏横坐标刻度
            },
            axisLine: {
              lineStyle: {
                color: '#999999'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#999999'
              }
            }
          },
          series: [{
            name: '用电量',
            data: this.electricityStatisticsData,
            type: 'bar',
            barWidth: 30,
            itemStyle: {
              normal: {
                color: '#40f49a'
              }
            }
          }]
        }
        this.dom = echarts.init(this.$refs.dom, 'light')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  watch: {
    electricityStatisticsData() {
      this.draw()
    },
    change () {
      setTimeout(() => {
        this.resize()
      }, 200)
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  },
}
</script>
