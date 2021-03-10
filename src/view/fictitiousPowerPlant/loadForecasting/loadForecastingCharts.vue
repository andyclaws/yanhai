<template>
  <div class="chart" ref="dom"></div>
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
    loadForecastingData: Array
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
    removeEndNull (arr) {
      let noEndNullArr = []
      let isEnd = true
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== '' || !isEnd) {
          noEndNullArr.push(arr[i])
          isEnd = false
        }
      }
      return noEndNullArr.reverse()
    },
    draw () {
      let _this = this
      this.$nextTick(() => {
        let divines = _this.loadForecastingData.map(_ => _this.removeNull(_.pointValue))

        let times = [
          '00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45', '05:00', 
          '05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', 
          '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', 
          '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', 
          '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45'
        ]

        let option = {
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0],
              filterMode: 'filter'
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
              let index = params[0].dataIndex
              res += params[0].axisValue + '</br>'
              res +=
                "<span style='color:rgba(7, 219, 138, 1)" +
                "'>预测负荷: " +
                divines[index] +
                'kW</span>'

              return res
            }
          },
          legend: {
            icon: 'rectangle',
            data: ['预测负荷曲线'],
            right: '0',
            top: '10',
            bottom: '0'
          },
          grid: {
            left: 20,
            top: 40,
            right: 15,
            bottom: 0,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: times,
              axisLabel:{
                interval: 15
              }
            }
          ],
          yAxis: [
            {
              name: '  单位: kW',
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
              nameGap: 15
            }
          ],
          series: [
            {
              name: '预测负荷曲线',
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
              data: divines
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
    loadForecastingData () {
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
