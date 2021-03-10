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
      alternatingPowerData: Array
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
        _this.$nextTick(() => {
          if (
            typeof _this.alternatingPowerData === 'undefined' ||
            _this.alternatingPowerData === null
          ) {
            return
          }

          let times = [
            '00:00',
            '04:00',
            '08:00',
            '12:00',
            '16:00',
            '20:00',
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
              formatter: function (params) {
                let res = ''
                if (params.length === 0) {
                  return
                }
                let index = params[0].dataIndex
                res += params[0].axisValue + '</br>'
                res += "<span style='color:rgba(7, 219, 138, 1)'>交流功率: " + _this.alternatingPowerData[index] + "kW</span>"
                return res
              }
            },
            legend: {
              icon: 'rectangle',
              data: ['交流功率'],
              right: '20',
              top: '5',
              bottom: '0'
            },
            grid: {
              left: 15,
              top: 30,
              right: 30,
              bottom: 0,
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: times
              }
            ],
            yAxis: [
              {
                name: '交流功率(kW)',
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
                name: '交流功率',
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
                data: _this.alternatingPowerData
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
      alternatingPowerData () {
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
