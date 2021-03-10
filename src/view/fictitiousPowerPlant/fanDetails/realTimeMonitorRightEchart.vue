<template>
  <div class="realTimeMonitorRightEchart">
    <!-- <p>当前风速：4.2m/s</p> -->
    <div class="title-top">
         <span>当前风速：</span>
         <span>4.2m/s</span>
    </div>
    <div class="realTimeMonitorRightEchart-echart" ref="dom"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'realTimeMonitorRightEchart',
  data () {
    return {
      dom: null
    }
  },
  created () {},
  watch: {},
  mounted () {
    this.$nextTick(() => {
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['实际风速', '短期预测', '超短期预测'],
          right: '1%',
          itemGap: 2,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#009999'
          }
        },
        grid: {
          top: '19%',
          left: '6%',
          right: '6%',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              textStyle: {
                fontSize: 12,
                fontWeight: 400
              }
            }
          }
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: true
            },
            magicType: {
              show: false,
              type: ['line', 'bar']
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              show: false,
              length: 10
            },
            axisLine: {
              show: true,
              lineStyle: { color: '#949494' }
            },
            axisLabel: {
              interval: 0
            },
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'm/s',
            axisLine: {
              show: true,
              lineStyle: { color: '#949494' }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '实际风速',
            data: [3, 4.5, 5.5, 4.8, 5.2, '', ''],
            type: 'line',
            color: '#0099FF',
            smooth: true
          },
          {
            name: '短期预测',
            data: [4, 4.5, 5, 5.2, 4.8, 5.1, 4.8],
            type: 'line',
            color: '#FF9966',
            smooth: true
          },
          {
            name: '超短期预测',
            data: [2, 3, 3.8, 4, 3.4, 3.9, 3],
            type: 'line',
            color: '#FFC313',
            smooth: true
          }
        ],
        title: {
          x: 'right'
        }
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

<style lang="less">
@import "fanDetails.less";
</style>
