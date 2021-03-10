<template>
  <div class="month-support" ref="dom"></div>
</template>
<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'

export default {
  name: 'monthSupport',
  props: {
    monthData: Array
  },
  data () {
    return {
      dom: null,
      color: ['#07DB8A', '#FEA348', '#0099FF']
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
          typeof _this.monthData === 'undefined' ||
          _this.monthData === null
        ) {
          return
        }
        let planNames = _this.monthData.map(_ => _this.removeNull(_.planName))
        let planValues = _this.monthData.map(_ =>
          _this.removeNull(_.planValue)
        )
        let actualValues = _this.monthData.map(_ =>
          _this.removeNull(_.actualValue)
        )
        let finishRates = _this.monthData.map(_ =>
          _this.removeNull(_.finishRate)
        )
        // let peelPlans = _this.monthData.map(_ => _this.removeNull(_.peelPlan))
        // let peelReals = _this.monthData.map(_ => _this.removeNull(_.peelReal))
        // let peelComplateRates = _this.monthData.map(_ =>
        //   _this.removeNull(_.peelComplateRate)
        // )
        let option = {
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0],
              filterMode: 'filter',
              throttle: '50',
              minValueSpan: 4,
              start: 0,
              end: 100,
              zoomLock: false
            }
          ],
          tooltip: {
            trigger: 'axis',
            padding: 15,
            formatter: function (params) {
              let res = ''
              if (params.length === 0) {
                return
              }
              res += params[0].axisValue + ' :</br>'
              for (var i = 0; i < params.length; i++) {
                res +=
                  "<span style='color:" +
                  params[i].color +
                  ";'>" +
                  params[i].seriesId +
                  '  :  ' +
                  params[i].value
                if (params[i].seriesType === 'line') {
                  res += '%'
                } else {
                  res += ' kW'
                }
                res += '</span>'
                if (i !== params.length - 1) {
                  res += '</br>'
                }
              }
              return res
            }
          },
          legend: {
            right: '10px',
            itemGap: 5,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              fontSize: 12,
              fontWeight: 400,
              color: '#666666'
            },
            data: ['计划值', '实际值', '完成率']
          },
          grid: {
            top: '26%',
            left: '5%',
            right: '3%',
            bottom: '2%',
            containLabel: true
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: planNames,
              triggerEvent: true,
              splitLine: {
                show: false
              },
              splitArea: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 0,
                rotate: 0,
                formatter: function (value) {
                  var str = ''
                  var num = 5 // 每行显示字数
                  var valLength = value.length // 该项x轴字数
                  var rowNum = Math.ceil(valLength / num) // 行数

                  if (rowNum > 1) {
                    for (var i = 0; i < rowNum; i++) {
                      var temp = ''
                      var start = i * num
                      var end = start + num

                      temp = value.substring(start, end) + '\n'
                      str += temp
                      if (i === 1) {
                        str = str.substring(0, end - 2)
                        str += '...'
                        break
                      }
                    }
                    return str
                  } else {
                    return value
                  }
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '   单位: kW',
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
              },
              nameTextStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: '#999999'
              },
              min: 0
            },
            {
              name: '单位: %',
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
              max: 100,
              min: 0
            }
          ],
          series: [
            {
              id: '计划值',
              name: '计划值',
              type: 'bar',
              // stack: 'plan',
              yAxisIndex: 0,
              data: planValues
            },
            // {
            //   id: '填谷计划值',
            //   name: '计划值',
            //   type: 'bar',
            //   stack: 'plan',
            //   yAxisIndex: 0,
            //   data: peelPlans
            // },
            {
              id: '实际值',
              name: '实际值',
              type: 'bar',
              // stack: 'real',
              yAxisIndex: 0,
              data: actualValues
            },
            // {
            //   id: '填谷实际值',
            //   name: '实际值',
            //   type: 'bar',
            //   stack: 'real',
            //   yAxisIndex: 0,
            //   data: peelReals
            // },
            {
              id: '完成率',
              type: 'line',
              name: '完成率',
              yAxisIndex: 1,
              data: finishRates
            }
            // {
            //   id: '填谷完成率',
            //   type: 'line',
            //   name: '完成率',
            //   yAxisIndex: 1,
            //   data: peelComplateRates
            // }
          ],
          color: _this.color
        }
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.on('click', function (params) {
          if (params.componentType === 'xAxis') {
            _this.$router.push({
              name: 'historyPowerGenerationEvent',
              query: {
                planName: params.value
              }
            })
          }
        })
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  watch: {
    monthData () {
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
