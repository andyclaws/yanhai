<template>
  <div ref="dom" class="charts top-fine"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from '../../../components/charts/theme.json'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'topFine',
  props: {
    totalData: Array,
    selectType: String,
    change: Boolean
  },
  data () {
    return {
      dom: null,
      color: ['#07DB8A'],
      selectName: '   单位: 次'
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
        let factoryNames = _this.totalData.map(_ =>
          _this.removeNull(_.unitName)
        )
        let seriesData = []
        if (_this.selectType === '0') {
          _this.selectName = '   单位: 次'
          seriesData = _this.totalData.map(_ =>
            _this.removeNull(_.cnt)
          )
        } else {
          _this.selectName = '   单位: kWh'
          seriesData = _this.totalData.map(_ =>
            _this.removeNull(_.cap)
          )
        }

        let option = {
          grid: {
            left: 10,
            top: 35,
            right: 0,
            bottom: 40,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: factoryNames,
              splitLine: {
                show: true
              },
              axisLabel: {
                interval: 0,
                rotate: 0
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: _this.selectName,
              min: 0,
              splitLine: {
                show: true
              },
              nameTextStyle: {
                color: '#666666',
                fontSize: 12,
                fontWeight: 400
              }
            }
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function (param) {
              var res = ''
              res +=
                param[0].name +
                "</br><div style='margin-right: 5px;display:inline-block;border-radius:50%;background-color:#07DB8A;width:10px;height:10px'></div>" +
                param[0].value
              if (_this.selectType === '0') {
                res += '次'
              } else {
                res += ' kWh'
              }
              return res
            }
          },
          series: [
            {
              type: 'bar',
              data: seriesData,
              barWidth: '20%',
              barGap: '10%'
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
