<template>
  <div ref="dom" class="charts tg-line-loss-distribution"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from '../../../../components/charts/theme.json'
import { off, on } from '@/libs/tools'
import { judgeNull } from './util'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'tgLineLossDistribution',
  props: {
    totalData: Array,
    change: Boolean
  },
  data () {
    return {
      dom: null,
      color: ['#61BCE9', '#00B2B2', '#277AD2', '#19BE6B', '#FF9900', '#ED3F14', '#E46CBB', '#9A66E4', '#5a5a5a']
    }
  },
  methods: {
    removeNull (val) {
      return judgeNull(val, '')
    },
    resize () {
      this.dom.resize()
    },
    draw () {
      let _this = this
      this.$nextTick(() => {
        let dataName = this.totalData ? this.totalData.map(_ => _this.removeNull(_.name)) : ''
        let dataValue = this.totalData ? this.totalData.map(_ => _this.removeNull(_.value)) : {}
        let option = {
          legend: {
            left: '65%',
            top: '15%',
            orient: 'vertical',
            formatter: function (name) {
              if (dataName) {
                let index = 0
                dataName.forEach(function (value, i) {
                  if (value === name) {
                    index = i
                  }
                })
                return name + ': ' + dataValue[index]
              } else {
                return name + ': ' + ''
              }
            },
            data: dataName
          },
          series: [
            {
              type: 'pie',
              name: '线损率范围',
              avoidLabelOverlap: false,
              label: {
                trigger: 'item',
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  position: 'center',
                  formatter: '{v|{c}}\n{b}',
                  textStyle: {
                    fontWeight: 'bold',
                    fontSize: 20
                  },
                  rich: {
                    v: {
                      color: 'black',
                      fontWeight: 'bolder',
                      fontSize: 35,
                      align: 'center'
                    }
                  }
                }
              },
              emphasis: {
                itemStyle: {
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  shadowBlur: 10
                }
              },
              center: ['35%', '50%'],
              radius: ['35%', '80%'],
              data: this.totalData
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
