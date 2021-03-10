<template>
  <div class="chart" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'unitPlanFactorCharts',
  props: {
    unitPlanFactorData: Array
  },
  data () {
    return {
      dom: null,
    }
  },
  mounted () {
    this.$nextTick(() => {
      let _this = this
      let option = {
        color: ['#00ccff', '#ffc313', '#ff0000'],
        title: {
          text: '单位：kW',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '12'
          },
          top: '7%',
          left: '4%'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          icon: 'rectangle',
          data: ['实际负荷', '预测负荷', '响应区间'],
          top: '7%',
          right: '4%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00']
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '实际负荷',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210, 280, 300]
          },
          {
            name: '预测负荷',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310, 380, 450]
          },
          {
            name: '响应区间',
            type: 'bar',
            stack: '总量',
            data: [,,,, 1120],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#f15151'
                }, {
                  offset: 1,
                  color: '#e8cdcd'
                }])
              }
            }
          }
        ]
      }
      this.dom = echarts.init(this.$refs.dom)
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
