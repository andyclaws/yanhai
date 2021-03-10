<template>
  <div class="monthCharge">
    <h3>||| 当月充放电量(kWh)</h3>
    <div class="monthCharge-echart" ref="dom"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'monthCharge',
  data () {
    return {}
  },
  methods: {},
  created () {},
  watch: {},
  mounted () {
    this.$nextTick(() => {
      let option = {
        color: ['#37a2da', '#5beb8e', '#32c5e9', '#98f6ba'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          itemGap: 5,
          itemWidth: 10,
          itemHeight: 10,
          right: '3%',
          textStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#666666'
          },
          data: [
            '充电量',
            '放电量'
          ]
        },
        grid: {
          top: '25%',
          left: '4%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        calculable: true,
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
        xAxis: [
          {
            type: 'category',
            data: ['0901', '0902', '0903', '0904', '0905', '0906', '0907', '0908', '0909', '0910', '0911', '0912', '0913', '0914'],
            splitLine: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位: （kW） ',
            scale: true,
            axisLine: {
              show: true,
              lineStyle: {
                type: 'dotted'
              }
            },
            splitArea: {
              show: false
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
          // {
          //   type: 'value',
          //   axisTick: {
          //     show: false
          //   },
          //   axisLine: {
          //     show: true,
          //     lineStyle: {
          //       type: 'dotted'
          //     }
          //   },
          //   scale: true,
          //   name: '单位: % ',
          //   min: 0
          // }
        ],
        series: [
          {
            name: '充电量',
            type: 'bar',
            stack: '实际',
            barWidth: '15',
            data: [80, 50, 50, 80, 50, 85, 50, 85, 50, 80, 50, 85, 50, 85]
          },
          {
            type: 'bar',
            name: '放电量',
            stack: '实际',
            barWidth: '15',
            color: 'orange',
            data: [-70, -40, -70, -80, -40, -70, -50, -50, -70, -80, -40, -70, -50, -50]
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

<style lang="less">
@import "storedEnergyDetail.less";
</style>
