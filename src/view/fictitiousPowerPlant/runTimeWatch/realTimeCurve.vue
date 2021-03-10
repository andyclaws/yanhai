<template>
  <div ref="dom" class="charts real-time-curve"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from '../../../components/charts/theme.json'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'realTimeCurve',
  props: {
    actualValues: Array,
    predictedValues: Array
  },
  data () {
    return {
      dom: null,
      color: ['#0099FF', '#FF9933']
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
          typeof _this.actualValues === 'undefined' ||
          _this.actualValues === null ||
          typeof _this.predictedValues === 'undefined' ||
          _this.predictedValues === null
        ) {
          return
        }
        let times = [
          '00:00',
          '00:15',
          '00:30',
          '00:45',
          '01:00',
          '01:15',
          '01:30',
          '01:45',
          '02:00',
          '02:15',
          '02:30',
          '02:45',
          '03:00',
          '03:15',
          '03:30',
          '03:45',
          '04:00',
          '04:15',
          '04:30',
          '04:45',
          '05:00',
          '05:15',
          '05:30',
          '05:45',
          '06:00',
          '06:15',
          '06:30',
          '06:45',
          '07:00',
          '07:15',
          '07:30',
          '07:45',
          '08:00',
          '08:15',
          '08:30',
          '08:45',
          '09:00',
          '09:15',
          '09:30',
          '09:45',
          '10:00',
          '10:15',
          '10:30',
          '10:45',
          '11:00',
          '11:15',
          '11:30',
          '11:45',
          '12:00',
          '12:15',
          '12:30',
          '12:45',
          '13:00',
          '13:15',
          '13:30',
          '13:45',
          '14:00',
          '14:15',
          '14:30',
          '14:45',
          '15:00',
          '15:15',
          '15:30',
          '15:45',
          '16:00',
          '16:15',
          '16:30',
          '16:45',
          '17:00',
          '17:15',
          '17:30',
          '17:45',
          '18:00',
          '18:15',
          '18:30',
          '18:45',
          '19:00',
          '19:15',
          '19:30',
          '19:45',
          '20:00',
          '20:15',
          '20:30',
          '20:45',
          '21:00',
          '21:15',
          '21:30',
          '21:45',
          '22:00',
          '22:15',
          '22:30',
          '22:45',
          '23:00',
          '23:15',
          '23:30',
          '23:45'
        ]
        let actualValues = _this.actualValues
        let predictedValues = _this.predictedValues

        let option = {
          title: {
            text: '||| 负荷实时曲线',
            y: 'top',
            top: -1,
            left: -3,
            textStyle: {
              fontSize: 13,
              fontWeight: 700,
              color: '#599999'
            }
          },
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0],
              filterMode: 'filter'
            }
          ],
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
            },
            formatter: function (params) {
              let res = ''
              if (params.length === 0) {
                return
              }
              let index = params[0].dataIndex
              res += params[0].axisValue + '</br>'
              if (
                actualValues[index] === null ||
                actualValues[index] === '' ||
                actualValues[index] === undefined
              ) {
                if (_this.removeNull(predictedValues[index]) === '') {
                  return
                }
                res +=
                  "<span style='color:rgba(7, 219, 138, 1)" +
                  "'>预测值: " +
                  predictedValues[index] +
                  'kW</span>'
              } else {
                if (_this.removeNull(predictedValues[index]) !== '') {
                  res +=
                    "<span style='color:rgba(7, 219, 138, 1)" +
                    "'>预测值: " +
                    predictedValues[index] +
                    'kW</span>'
                }
                if (_this.removeNull(actualValues[index]) !== '') {
                  if (_this.removeNull(predictedValues[index]) !== '') {
                    res += '</br>'
                  }
                  res +=
                    "<span style='color:#FFC313" +
                    "'>实际值: " +
                    _this.removeNull(actualValues[index], '0') +
                    'kW</span>'
                }
              }
              return res
            }
          },
          legend: {
            top: 0,
            right: 10,
            itemGap: 10,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              fontSize: 12,
              fontWeight: 400,
              color: '#666666'
            },
            data: ['预测值', '实际值']
          },
          grid: {
            left: 15,
            top: 45,
            right: 15,
            bottom: 0,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                interval: 15
              },
              data: times
            }
          ],
          yAxis: [
            {
              name: '     单位: kW',
              type: 'value',
              min: 0,
              splitLine: {
                show: true
              },
              nameTextStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: '#999999'
              },
              nameGap: 10
            }
          ],
          series: [
            {
              name: '预测值',
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
              data: predictedValues
            },
            {
              name: '实际值',
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
                        color: '#FF9933' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#FBF4EF' // 100% 处的颜色
                      }
                    ],

                    globalCoord: false // 缺省为 false
                  }
                }
              },
              data: actualValues
            }
          ],
          color: _this.color
        }
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  watch: {
    actualValues () {
      this.draw()
    },
    predictedValues () {
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
