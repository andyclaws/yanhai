<template>
  <div class="rank-chart" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'chargeRankCharts',
  props: {
    unitCapacityData: Array,
    nodeStatus: Number
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
        title: {
          text: '||| 当月充电次数排名前五(次)',
          textStyle: {
            fontWeight: 'normal',
            color: '#009999',
            fontSize: '15'
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
          top: '25%',
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['充电次数'],
          align: 'left',
          top: '7%',
          right: '3%'
        },
        xAxis: {
          type: 'category',
          data: ['桩一', '桩二', '桩三', '桩四', '桩五'],
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
          name: '充电次数',
          data: [87, 78, 65, 50, 32],
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
