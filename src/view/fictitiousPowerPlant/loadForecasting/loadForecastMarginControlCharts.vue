<template>
  <div class="mc-chart" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
// import tdTheme from "../../../components/charts/theme.json";
import { judgeNull } from '../util.js'

// echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: 'loadForecastMarginControlCharts',
  props: {
    upMarginData: Array,
    downMarginData: Array,
  },
  data () {
    return {
      dom: null
    }
  },
  mounted () {},
  methods: {
    removeNull (val) {
      return judgeNull(val, '')
    },
    resize () {
      if (typeof this.dom !== 'undefined' && this.dom !== null) {
        this.dom.resize()
      }
    },
    draw() {
      this.$nextTick(() => {
        let _this = this
        let upAreaStyle = {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 1, color: '#86ecc5' }
            ])
          }
        }
        let downAreaStyle = {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 1, color: '#ffd0a0' }
            ])
          }
        }
        let upLineStyle = {
          color: '#86ecc5'
        }
        let dOwnLineStyle = {
          color: '#ffd0a0'
        }
        let upData = _this.upMarginData.map(_ => _this.removeNull(_.pointValue))
        upData.unshift(upData[0])
        let downData = _this.downMarginData.map(_ => _this.removeNull(_.pointValue * -1))
        downData.unshift(downData[0])
        let option = {
          color: ['#86ecc5', '#FF9933'],
          tooltip: {
            trigger: 'axis',
            padding: 15
          },
          legend: {
            icon: 'rectangle',
            top: '10',
            right: '0',
            data: ['上调裕度', '下调裕度'],
            textStyle: {
              color: '#A2A2A2'
            }
          },
          grid: {
            left: 20,
            top: 40,
            right: 15,
            bottom: 0,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            axisLabel: {
              interval: 0,
              rotate: 0,
              textStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: '#A2A2A2'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#A2A2A2'
              }
            }
          },
          yAxis: {
            name: ' 单位: kW',
            type: 'value',
            nameGap: 15,
            splitLine: {
              show: true
            },
            itemStyle: {
              color: '#A2A2A2'
            },
            axisLabel: {
              interval: 0,
              rotate: 0,
              textStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: '#A2A2A2'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#A2A2A2'
              }
            },
            nameTextStyle: {
              fontSize: 12,
              fontWeight: 400,
              color: '#A2A2A2'
            }
          },
          series: [
            {
              name: '上调裕度',
              type: 'line',
              symbol: 'none',
              step: 'true',
              data: upData,
              areaStyle: upAreaStyle,
              lineStyle: upLineStyle
            },
            {
              name: '下调裕度',
              type: 'line',
              symbol: 'none',
              step: 'true',
              data: downData,
              areaStyle: downAreaStyle,
              lineStyle: dOwnLineStyle
            }
          ]
        }
        this.dom = echarts.init(this.$refs.dom)
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  watch: {
    upMarginData () {
      this.draw()
    },
    downMarginData () {
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
