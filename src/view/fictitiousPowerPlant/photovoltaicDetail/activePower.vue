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
    curveDatas: Array
  },
  data () {
    return {
      dom: null,
      color: '#0099FF'
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
          typeof _this.curveDatas === 'undefined' ||
          _this.curveDatas === null
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
                param[0].value +
                'kW'
              return res
            }
          },
          grid: {
            left: 15,
            top: 30,
            right: 18,
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
            data: ['交流有功']
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
              name: '     单位:kW',
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
              name: '交流有功',
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
              data: _this.curveDatas
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
    curveDatas () {
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
