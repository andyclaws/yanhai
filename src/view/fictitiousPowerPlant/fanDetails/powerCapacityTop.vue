<template>
  <div class="powerCapacityTop">
    <div class="powerCapacityTop-echart" ref="dom"></div>
    <p>平均风速(m/s)</p>
  </div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'powerCapacityTop',
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
          data: ['FD25-100功率曲线'],
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
          top: '24%',
          left: '1%',
          right: '1%',
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
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLabel: {
              interval: 0
            },
            data: ['0', '2', '4', '6', '8', '10', '12', '14', '16']
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
            name: 'FD25-100功率曲线',
            data: ['', '', 1, 10, 20, 60, 90, 90, 90],
            type: 'line',
            color: 'orange',
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
