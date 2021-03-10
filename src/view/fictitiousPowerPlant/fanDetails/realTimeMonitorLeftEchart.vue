<template>
  <div class="realTimeMonitorLeftEchart">
    <div class="realTimeMonitorLeftEchart-echart" ref="dom"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'realTimeMonitorLeftEchart',
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
          data: ['实际值', '预测值'],
          right: '10%',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#009999'
          }
        },
        grid: {
          top: '20%',
          left: '1%',
          right: '5%',
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
            data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位:(kWh)',
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
            name: '实际值',
            data: [100, 300, 360, 330, 420, 500, 450, '', ''],
            type: 'line',
            color: '#0099FF',
            smooth: true
          },
          {
            name: '预测值',
            data: [50, 250, 220, 420, 480, 520, 350, 370, 270],
            type: 'line',
            color: '#FF9966',
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
