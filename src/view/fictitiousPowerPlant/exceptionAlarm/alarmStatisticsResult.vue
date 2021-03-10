<template>
  <div ref="dom" class="charts alarm-statistics-result"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from '../../../components/charts/theme.json'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'alarmStatisticsResult',
  props: {
    totalData: Array
  },
  data () {
    return {
      dom: null,
      color: ['#0099FF', '#FFCC33', '#FF9933']
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
          typeof _this.totalData === 'undefined' ||
          _this.totalData === null
        ) {
          return
        }
        console.log(_this.totalData)
        let legendData = []
        let seriesData = []
        for (var index = 0; index < _this.totalData.length; index++) {
          legendData.push(_this.totalData[index].alarmType)
          let series = {
            name: _this.totalData[index].alarmType,
            value: _this.totalData[index].expCnt
          }
          seriesData.push(series)
        }
        let option = {
          title: {
            text: '告警类型统计',
            y: 'top',
            textStyle: {
              fontSize: 18,
              fontWeight: 400,
              color: '#009999'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}' + '个  ' + '({d}%)'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 85,
            itemWidth: 15,
            itemHeight: 15,
            y: 'center',
            bottom: 20,
            itemGap: 30,
            textStyle: {
              fontSize: 15,
              color: '#038C99'
            },
            data: legendData
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['30%', '50%'],
              data: seriesData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              label: {
                normal: {
                  position: 'inner',
                  formatter: '{d}' + '%'
                }
              },
              color: [
                'rgba(153, 153, 255, 0.8)',
                'rgba(51, 204, 204, 0.8)',
                '#FFD700',
                '#C9C9C9',
                '#E066FF',
                '#C0FF3E'
              ],
              borderColor: 'white',
              borderWidth: 1
            }
          ]
        }
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  watch: {
    totalData () {
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
