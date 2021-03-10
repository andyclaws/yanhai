<template>
  <div ref="dom" class="charts tg-line-loss-trend"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from '../../../../components/charts/theme.json'
import { off, on } from '@/libs/tools'
import { judgeNull } from './util'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'tgLineLossTrend',
  props: {
    totalData: Array,
    change: Boolean
  },
  data () {
    return {
      dom: null,
      color: ['#25D3D3', '#5093DA', '#FFFFFF']
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
      let data = this.totalData ? this.totalData : ''
      this.$nextTick(() => {
        let date = data.map(_ => _this.removeNull(_.date))
        let lineLossRate = data.map(_ => _this.removeNull(_.lineLossRate))
        let lineLossGovernRate = data.map(_ => _this.removeNull(_.lineLossGovernRate))
        // let governTgCnt = data.map(_ => _this.removeNull(_.governTgCnt))

        let option = {
          legend: {
            bottom: 0,
            itemGap: 5,
            itemWidth: 20,
            data: ['线损率', '线损治理率']
          },
          grid: {
            left: 0,
            top: 31,
            right: 0,
            bottom: 40,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: date,
              axisLabel: {
                interval: 0,
                rotate: 30
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '单位：%'
              // min: -50,
              // max: 150
            }
          ],
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0],
              filterMode: 'filter'
            }
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function (params) {
              let res = ''
              for (let i = 0; i < params.length; i++) {
                res += `<span
                              style="display: inline-block; margin-right: 5px; border-radius: 10px;
                              width: 10px; height: 10px; background-color: ${params[i].color}"></span>
                              ${params[i].seriesName}: ${params[i].value}
                              ${params[i].seriesName.indexOf('率') > -1 ? '%' : ''}<br>`
              }
              return res
            }
          },
          series: [
            {
              name: '线损率',
              type: 'line',
              data: lineLossRate
            },
            {
              name: '线损治理率',
              type: 'line',
              data: lineLossGovernRate
            }
            // {
            //   name: '治理台区数',
            //   type: 'scatter',
            //   symbolSize: 0,
            //   data: governTgCnt
            // }
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
