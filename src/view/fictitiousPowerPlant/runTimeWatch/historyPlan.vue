<template>
  <div ref="dom" class="charts history-plan"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from '../../../components/charts/theme.json'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'historyPlan',
  props: {
    barData: Array,
    lineData: Array
  },
  data () {
    return {
      dom: null,
      color: ['#0099FF', '#FF9933', 'rgb(32, 223, 150)']
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
        // if (typeof _this.barData === 'undefined' || _this.barData === null) {
        //   return
        // }
        let dates = [
          '10/01',
          '10/02',
          '10/03',
          '10/04',
          '10/05',
          '10/06',
          '10/07',
          '10/08'
        ]
        // let legendData = []
        // let seriesData = []
        // for (var index = 0; index < _this.barData.length; index++) {
        //   legendData.push(_this.barData[index].name)
        //   let obj = {
        //     name: _this.barData[index].name,
        //     type: 'bar',
        //     data: _this.barData[index].value,
        //     stack: 'divisorType',
        //     barWidth: '50%',
        //     barGap: '20%'
        //   }
        //   seriesData.push(obj)
        // }

        let option = {
          title: {
            text: '||| 2019年当月历史计划(kW)',
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
              filterMode: 'filter',
              throttle: '50',
              minValueSpan: 4,
              start: (dates.length >= 4 ? dates.length - 4 : 0) * 10,
              zoomLock: true
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
              let returnStr = ''
              if (typeof params !== 'undefined' && params.length !== 0) {
                for (var index = 0; index < params.length; index++) {
                  let unit =
                    params[index].seriesName === '计划值' ||
                    params[index].seriesName === '实际值'
                      ? 'kW'
                      : '%'
                  returnStr +=
                    '<span style="display: inline-block; background-color:' +
                    params[index].color +
                    ';width:10px;height:10px;margin-right:5px;border-radius:50%;vertical-align:middle;"></span>' +
                    params[index].seriesName +
                    ':   ' +
                    params[index].value +
                    unit +
                    '</br>'
                }
              }
              return returnStr
            }
          },
          legend: {
            top: 25,
            right: 5,
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
            left: 15,
            top: 80,
            right: 15,
            bottom: 0,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: dates,
              splitLine: {
                show: true
              },
              axisLabel: {
                interval: 0,
                formatter: function (params) {
                  var newParamsName = '' // 最终拼接成的字符串
                  var paramsNameNumber = params.length // 实际标签的个数
                  var provideNumber = 5 // 每行能显示的字的个数
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber) // 换行的话，需要显示几行，向上取整
                  /**
                   * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                   */
                  // 条件等同于rowNumber>1
                  if (paramsNameNumber > provideNumber) {
                    /** 循环每一行,p表示行 */
                    for (var p = 0; p < rowNumber; p++) {
                      var tempStr = '' // 表示每一次截取的字符串
                      var start = p * provideNumber // 开始截取的位置
                      var end = start + provideNumber // 结束截取的位置
                      // 此处特殊处理最后一行的索引值
                      if (p === rowNumber - 1) {
                        // 最后一次不换行
                        tempStr = params.substring(start, paramsNameNumber)
                      } else {
                        // 每一次拼接字符串并换行
                        tempStr = params.substring(start, end) + '\n'
                      }
                      newParamsName += tempStr // 最终拼成的字符串
                    }
                  } else {
                    // 将旧标签的值赋给新标签
                    newParamsName = params
                  }
                  // 将最终的字符串返回
                  return newParamsName
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              min: 0,
              name: '      单位: kW',
              splitLine: {
                show: true
              }
            },
            {
              type: 'value',
              scale: true,
              name: '单位: %      ',
              min: 0
            }
          ],
          series: [
            {
              name: '计划值',
              type: 'bar',
              barWidth: 10,
              yAxisIndex: 0,
              data: ['15', '20', '21', '32', '52', '22', '23', '25']
            },
            {
              name: '实际值',
              type: 'bar',
              barWidth: 10,
              yAxisIndex: 0,
              data: ['15', '20', '21', '32', '52', '22', '23', '25']
            },
            {
              name: '完成率',
              type: 'line',
              yAxisIndex: 1,
              data: ['90', '91', '92', '95', '52', '22', '23', '25']
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
    barData () {
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
