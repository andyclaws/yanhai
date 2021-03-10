<template>
  <div class="chart" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'archiveGenerElectricTimeCharts',
  props: {
    generElectricData: Array
  },
  data () {
    return {
      dom: null,
    }
  },
  mounted () {
    this.$nextTick(() => {
      let option = {
        title: {
          text: '当月发电时段分布(kW)',
          textStyle: {
            fontWeight: 'normal',
            color: '#009999',
            fontSize: '14'
          },
          top: '6%',
          left: '3%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '19%',
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        legend: {
          data: ['发电负荷'],
          align: 'left',
          top: '7%',
          left: '90%'
        },
        dataZoom: [
          {
            show: true,
            start: 0,
            end: 100
          },
          {
            type: 'inside',
            start: 94,
            end: 100
          }
        ],
        xAxis: {
          type: 'category',
          data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
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
          name: '发电负荷',
          data: this.generElectricData,
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            normal: {
              color: '#ffc313'
            }
          }
        }]
      }
      this.dom = echarts.init(this.$refs.dom, 'light')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  methods: {
    resize () {
      if (typeof this.dom !== 'undefined' && this.dom !== null) {
        this.dom.resize()
      }
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
