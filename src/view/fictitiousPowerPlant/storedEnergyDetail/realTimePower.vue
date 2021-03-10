<template>
  <div class="realTimePower">
    <h3>||| 充放电时段分布</h3>
    <div class="realTimePower-echart" ref="dom"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'realTimePower',
  data () {
    return {}
  },
  props: ['parentMsg'],
  methods: {},
  created () {},
  watch: {},
  mounted () {
    this.$nextTick(() => {
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['功率'],
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
          top: '25%',
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
            data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00' ]
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位:(kW)',
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
            name: '功率',
            type: 'line',
            step: 'start',
            color: 'orange',
            data: [80, -80, 80, -50, 80, -50, 80, -80, 80, -50, 80, -50, 80, -50]
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
    // myClick(){
    //   this.$emit('func')
    // }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>

<style lang="less">
@import "storedEnergyDetail.less";
</style>
