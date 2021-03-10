<template>
  <div ref="dom" class="charts ui-curve"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from '../../../components/charts/theme.json'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'uiCurve',
  props: {
    vCurveDatas: Array,
    cCurveDatas: Array
  },
  data () {
    return {
      dom: null,
      color: ['#0099FF', '#FF9966']
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
        if (
          typeof _this.vCurveDatas === 'undefined' ||
          _this.vCurveDatas === null ||
          typeof _this.cCurveDatas === 'undefined' ||
          _this.cCurveDatas === null
        ) {
          return
        }
        let times = [
          '00:00',
          '02:00',
          '04:00',
          '06:00',
          '08:00',
          '10:00',
          '12:00',
          '14:00',
          '16:00',
          '18:00',
          '20:00',
          '22:00',
          '24:00'
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
            formatter: function (param) {
              var res = ''
              res +=
                param[0].name +
                "</br><div style='margin-right: 5px;display:inline-block;border-radius:50%;background-color:#07DB8A;width:10px;height:10px'></div>" +
                param[0].seriesName +
                ': ' +
                param[0].value +
                "V</br><div style='margin-right: 5px;display:inline-block;border-radius:50%;background-color:#07DB8A;width:10px;height:10px'></div>" +
                param[1].seriesName +
                ': ' +
                param[1].value +
                'A'
              return res
            }
          },
          grid: {
            left: 15,
            top: 55,
            right: 28,
            bottom: 10,
            containLabel: true
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
            data: ['电压', '电流']
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: times,
              axisLabel: {
                color: '#999999'
              },
              splitLine: {
                show: true,
                color: '#999999'
              },
              axisLine: {
                lineStyle: {
                  color: '#CFCFCF'
                }
              }
            }
          ],
          yAxis: [
            {
              name: '     电压(V)',
              type: 'value',
              splitLine: {
                show: true,
                color: '#999999'
              },
              axisLine: {
                lineStyle: {
                  color: '#CFCFCF'
                }
              },
              nameTextStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: '#999999'
              },
              axisLabel: {
                color: '#999999'
              },
              nameGap: 15
            },
            {
              name: '     电流(A)',
              type: 'value',
              splitLine: {
                show: true,
                color: '#999999'
              },
              axisLine: {
                lineStyle: {
                  color: '#CFCFCF'
                }
              },
              nameTextStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: '#999999'
              },
              axisLabel: {
                color: '#999999'
              },
              nameGap: 15
            }
          ],
          series: [
            {
              name: '电压',
              type: 'line',
              data: _this.vCurveDatas,
              yAxisIndex: 0
            },
            {
              name: '电流',
              type: 'line',
              data: _this.cCurveDatas,
              yAxisIndex: 1
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
    vCurveDatas () {
      this.draw()
    },
    vCurveDatas () {
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
