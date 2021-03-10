<template>
  <div class="chart" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'
export default {
  name: 'archiveManageUnitTypeCharts',
  props: {
    unitTypeData: Array
  },
  data () {
    return {
      dom: null,
    }
  },
  mounted () {
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
    draw() {
      this.$nextTick(() => {
        let _this = this
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            left: '60%',
            top: '20%',
            data: ['DR', 'ADR', 'DR+ADR'],
            textStyle: {
              color: '#009999',
              lineHeight: 28
            },
            formatter: function (name) {
              var total = 0
              var value
              for (var i = 0; i < _this.unitTypeData.length; i++) {
                total += _this.unitTypeData[i].value
                if (_this.unitTypeData[i].name === name) {
                  value = _this.unitTypeData[i].value
                }
              }
              var percent = (value / total * 100).toFixed(2)
              return name + '    ' + percent + '%' + '  ' + value
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              center: ['30%', '45%'],
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: _this.unitTypeData,
              color: [
                '#07db8a',
                '#07b7db',
                '#ff9933'
              ]
            }
          ]
        }
        this.dom = echarts.init(this.$refs.dom, 'light')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  watch: {
    unitTypeData () {
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
