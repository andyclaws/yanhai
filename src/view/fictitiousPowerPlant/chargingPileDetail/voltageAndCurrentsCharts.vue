<template>
  <div class="chart" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'voltageAndCurrentsCharts',
  props: {
    voltageData: Array,
    currentsData: Array
  },
  data () {
    return {
      dom: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      let _this = this
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (params.seriesName === '电压') {
              return params.seriesName + '<br/>' + params.name + '：' + params.value + 'V'
            }
            if (params.seriesName === '电流') {
              return params.seriesName + '<br/>' + params.name + '：' + params.value + 'A'
            }
          }
        },
        grid: {
          top: '22%',
          right: '12%',
          left: '12%',
          bottom: '15%'
        },
        legend: {
          top: '2%',
          icon: 'rectangle',
          left: 'center',
          data: ['电压', '电流']
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '电压(V)',
            nameRotate: 0
          },
          {
            type: 'value',
            name: '电流(A)',
            nameRotate: 0,
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '电压',
            type: 'line',
            smooth: true,
            yAxisIndex: 0,
            data: _this.voltageData
          },
          {
            name: '电流',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: _this.currentsData
          }
        ]
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
