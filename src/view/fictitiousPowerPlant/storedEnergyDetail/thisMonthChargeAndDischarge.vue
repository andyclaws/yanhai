<template>
  <div class="thisMonthChargeAndDischarge">
    <h3>||| 当月充放电量(kWh)</h3>
    <div class="thisMonthChargeAndDischarge-echart" ref="dom"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'thisMonthChargeAndDischarge',
  data () {
    return {}
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
          data: ['充电', '放电'],
          right: '3%',
          itemGap: 3,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#666666'
          }
        },
        grid: {
          top: '20%',
          left: '4%',
          right: '4%',
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
            axisTick: {
              show: false,
              length: 10
            },

            axisLabel: {
              interval: 0
            },
            data: [
              '0901',
              '0902',
              '0903',
              '0904',
              '0905',
              '0906',
              '0907',
              '0908'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位:(次)',
            axisLine: {
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
        ],
        series: [
          {
            name: '充电',
            type: 'line',
            barWidth: 10,
            data: [20, 50, 50, 80, 50, 60, 70, 80],
            smooth: true
          },
          {
            name: '放电',
            type: 'line',
            // color: "green",
            barWidth: 10,
            data: [10, 30, 30, 50, 30, 40, 50, 60],
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
@import "storedEnergyDetail.less";
</style>
