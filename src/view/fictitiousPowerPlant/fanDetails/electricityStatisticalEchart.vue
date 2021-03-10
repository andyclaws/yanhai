<template>
  <div class="electricityStatisticalEchart">
    <div class="electricityStatisticalEchart-echart" ref="dom"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'electricityStatisticalEchart',
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
          data: [''],
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
          top: '14%',
          left: '1%',
          right: '2%',
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
            name: '',
            data: [1.7, 1.4, 2.7, 2.1, 2.5, 3, 2.5, 2.8, 2.2],
            type: 'line',
            areaStyle: {
              normal: {
                color: {
                  type: 'linear', // 设置线性渐变
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#0099FF' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#E4F3FC' // 100% 处的颜色
                    }
                  ],

                  globalCoord: false // 缺省为 false
                }
              }
            },
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
