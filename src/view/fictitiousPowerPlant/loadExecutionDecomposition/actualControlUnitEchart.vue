<template>
  <div class="echart-box">
    <div class="actualControlUnit-echart" ref="dom"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'
import { getLastMonthMaxDay } from '@/libs/index'
export default {
  name: 'actualControlUnit',
  props: {
    actualControlData: Array
  },
  data () {
    return {
      dom: null,
      seriesData: [],
      yAxisData_plant: [],
      start_: '2018-08-02 00:00:00',
      end_: '2018-08-02 24:00:00'
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
          typeof _this.actualControlData === 'undefined' ||
          _this.actualControlData === null
        ) {
          return
        }
        console.log(666, _this.actualControlData)

        let start_ = getLastMonthMaxDay() + ' ' + '00:00:00',
          end_ = getLastMonthMaxDay() + ' ' + '24:00:00'
        // console.log(start_, end_); // 自定义时间

        let seriesData = []
        let yAxisData_plant = [] // 工厂名
        let start = ''
        let end = ''
        _this.actualControlData.forEach((item, index) => {
          yAxisData_plant.push(item.unitName)
          let startDate = getLastMonthMaxDay() + ' ' + item.beginTime
          let endDate = getLastMonthMaxDay() + ' ' + item.endTimeF
          start = startDate
          end = endDate
          console.log(start)
          let beginTime = new Date(startDate).getTime()
          let endTimeF = new Date(endDate).getTime()
          if (item.finishRate * 1 === 100) {
            seriesData.push({
              name: item.finishRate,
              value: [index, beginTime, endTimeF],
              itemStyle: {
                normal: {
                  color: '#07DB8A'
                }
              }
            })
          } else if (item.finishRate * 1 > 0 && item.finishRate * 1 < 100) {
            seriesData.push({
              name: item.finishRate,
              value: [index, beginTime, endTimeF],
              itemStyle: {
                normal: {
                  color: '#0099FF'
                }
              }
            })
          } else {
            seriesData.push({
              name: item.finishRate,
              value: [index, beginTime, endTimeF],
              itemStyle: {
                normal: {
                  color: '#FF9933'
                }
              }
            })
          }
        })
        let option = {
          tooltip: {
            axisPointer: {
              type: 'cross',
              label: {
                textStyle: {
                  fontSize: 14,
                  fontWeight: 400
                }
              }
            }
          },
          grid: {
            top: '20%',
            left: '2%',
            right: '12%',
            bottom: '4%',
            containLabel: true
          },
          xAxis: {
            type: 'time',
            min: new Date(start).getTime(),
            max: new Date(end).getTime(),
            splitNumber: 15,
            axisLine: {
              show: true,
              lineStyle: { color: '#949494' }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              interval: 2,
              lineStyle: { color: '#949494', type: 'dashed' }
            }
          },
          yAxis: {
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: { color: '#949494' }
            },
            axisLabel: {
              show: true,
              textStyle: { color: '#949494' },
              fontSize: 14
            },
            inverse: true,
            data: yAxisData_plant
          },
          series: [
            {
              type: 'custom',
              renderItem: function (params, api) {
                var categoryIndex = api.value(0)
                var start = api.coord([api.value(1), categoryIndex])
                var end = api.coord([api.value(2), categoryIndex])
                var height = api.size([0, 1])[1] * 0.6
                var rectShape = echarts.graphic.clipRectByRect(
                  {
                    x: start[0],
                    y: start[1] - 5,
                    width: end[0] - start[0],
                    height: 15
                  },
                  {
                    x: params.coordSys.x,
                    y: params.coordSys.y,
                    width: params.coordSys.width,
                    height: params.coordSys.height
                  }
                )

                return (
                  rectShape && {
                    type: 'rect',
                    shape: rectShape,
                    style: api.style()
                  }
                )
              },
              encode: {
                x: [1, 2],
                y: 0
              },
              data: seriesData
            }
          ]
        }
        this.dom = echarts.init(this.$refs.dom, 'light')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  watch: {
    actualControlData () {
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
<style lang="less" scoped>
@import "loadExecutionDecomposition.less";
</style>
