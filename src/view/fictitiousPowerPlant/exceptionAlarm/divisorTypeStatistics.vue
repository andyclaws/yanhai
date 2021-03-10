<template>
  <div ref="dom" class="charts divisor-type-statistics"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from '../../../components/charts/theme.json'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'divisorTypeStatistics',
  props: {
    divisorTypeData: Array
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
          typeof _this.divisorTypeData === 'undefined' ||
          _this.divisorTypeData === null
        ) {
          return
        }
        var map = new Map()
        let legendData = []
        let seriesData = []
        for (var index = 0; index < _this.divisorTypeData.length; index++) {
          map.set(
            _this.divisorTypeData[index].factorClassificationName,
            _this.divisorTypeData[index].factorClassificationNums
          )
          legendData.push(
            _this.divisorTypeData[index].factorClassificationName
          )
          let series = {
            name: _this.divisorTypeData[index].factorClassificationName,
            value: _this.divisorTypeData[index].factorClassificationNums
          }
          seriesData.push(series)
        }

        let option = {
          title: {
            text: '因子分类统计',
            y: 'top',
            textStyle: {
              fontSize: 18,
              fontWeight: 400,
              color: '#009999'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}个 ({d}%)'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 120,
            top: '30%',
            bottom: 0,
            itemGap: 20,
            textStyle: {
              fontSize: 14,
              fontWeight: 400,
              color: '#038C99',
              padding: [2, 0, 0, 5]
            },
            itemWidth: 15,
            itemHeight: 15,
            data: legendData,
            padding: [10, 50, 10, 30]
            // backgroundColor: 'rgba(174, 174, 174, 0.4)',
            // formatter: function (param) {
            //   return param + '   --   ' + map.get(param)
            // }
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['30%', '50%'],
              data: seriesData,
              itemStyle: {
                borderColor: 'white',
                borderWidth: 1,
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
                '#6890D3',
                '#7464C5',
                '#C378C1',
                '#E1425C',
                '#E066FF',
                '#C0FF3E'
              ]
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
    divisorTypeData () {
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
