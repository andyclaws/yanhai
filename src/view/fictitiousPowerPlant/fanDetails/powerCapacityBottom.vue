<template>
  <div class="powerCapacityBottom">
    <div class="powerCapacityBottom-echart" ref="dom"></div>
    <p>平均风速(m/s)</p>
  </div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'powerCapacityBottom',
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
        grid: {
          top: '24%',
          left: '7%',
          right: '1%',
          bottom: '6%',
          containLabel: true
        },
        legend: {
          data: ['年发电量曲线'],
          right: '10%',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#009999'
          }
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
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              show: false,
              length: 10
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLine: {
              show: true,
              lineStyle: { color: '#949494' }
            },
            axisLabel: {
              interval: 0
            },
            data: ['4', '4.5', '5', '5.5', '6', '6.5', '7']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位:(万kWh)',
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
            name: '年发电量曲线',
            data: [12, 18, 20, 25, 28, 32, 35],
            type: 'line',
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
