<template>
  <Card class="peakPeel">
    <div slot="title" class="peakPeel-header">
      <p>削峰填谷(kWh)</p>
    </div>
    <div class="peakPeelEchart" ref="dom"></div>
  </Card>
</template>
<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../../util.js'
export default {
  name: 'peakPeel',
  props: {
    peakPeelData: Array
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    removeNull (val) {
      return judgeNull(val, '')
    },
    resize () {
      if (typeof this.dom !== 'undefined' && this.dom !== null) {
        this.dom.resize()
      }
    },
    draw () {
      let _this = this
      this.$nextTick(() => {
        if (
          typeof _this.peakPeelData === 'undefined' ||
          _this.peakPeelData === null
        ) {
          return
        }
        console.log(666, _this.peakPeelData)
        let xAxisData = []
        let seriesData = []
        let xiaofengReallist = []
        let xiaofengTargetList = []
        let xiaofengRate = []

        let tianguTargetList = []
        let tianguRealList = []
        let tianguRate = []

        _this.peakPeelData.forEach((item, index) => {
          if (item.dayTime) {
            xAxisData.push(item.dayTime)
          } else if (item.month) {
            xAxisData.push(item.month)
          } else {
            xAxisData.push(item.year)
          }
          xiaofengTargetList.push(item.planAdd)
          xiaofengReallist.push(item.realAdd)
          xiaofengRate.push((item.realAdd / item.planAdd) * 100)

          tianguTargetList.push(item.planReduce)
          tianguRealList.push(item.realReduce)
          tianguRate.push((item.realReduce / item.planReduce) * 100)
          seriesData = [
            {
              name: '削峰目标值',
              type: 'bar',
              stack: '计划',
              barWidth: '30',
              data: xiaofengTargetList
            },
            {
              name: '削峰实际值',
              type: 'bar',
              stack: '实际',
              barWidth: '30',
              data: xiaofengReallist
            },
            {
              name: '填谷目标值',
              type: 'bar',
              stack: '计划',
              barWidth: '30',
              data: tianguTargetList
            },
            {
              name: '填谷实际值',
              type: 'bar',
              stack: '实际',
              barWidth: '30',
              data: tianguRealList
            },
            {
              name: '削峰完成率',
              type: 'line',
              smooth: true,
              data: xiaofengRate
            },
            {
              name: '填谷完成率',
              type: 'line',
              smooth: true,
              data: tianguRate
            }
          ]
        })
        let option = {
          color: ['#37a2da', '#5beb8e', '#32c5e9', '#98f6ba'],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            itemGap: 5,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              fontSize: 12,
              fontWeight: 400,
              color: '#666666'
            },
            data: [
              '削峰目标值',
              '削峰实际值',
              '填谷目标值',
              '填谷实际值',
              '削峰完成率',
              '填谷完成率'
            ]
          },
          grid: {
            top: '16%',
            left: '4%',
            right: '4%',
            bottom: '4%',
            containLabel: true
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: xAxisData,
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
            },
            {
              type: 'value',
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  type: 'dotted'
                }
              },
              scale: true,
              name: '单位: % ',
              min: 0
            }
          ],
          series: seriesData
        }
        this.dom = echarts.init(this.$refs.dom, 'light')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  watch: {
    peakPeelData () {
      this.draw()
    },
    change () {
      setTimeout(() => {
        this.resize()
      }, 200)
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>

<style lang="less">
@import "../historyPowerGenerationEvent.less";
</style>
