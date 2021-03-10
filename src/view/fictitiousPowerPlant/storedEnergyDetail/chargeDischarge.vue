<template>
  <div class="chargeDischarge">
    <h3>||| 充放电时段分布</h3>
    <div class="storedEnergyDetail-left-bottom-echart" ref="dom"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'chargeDischarge',
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
          data: ['充电量', '放电量'],
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
            data: ['尖', '峰', '平', '台']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位:(kWh)',
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
            name: '充电量',
            type: 'bar',
            barWidth: 10,
            data: [80, 50, 50, 80, 50, 50]
          },
          {
            name: '放电量',
            type: 'bar',
            // color: "green",
            barWidth: 10,
            data: [50, 30, 30, 50, 30, 30]
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
