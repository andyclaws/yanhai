<template>
  <div ref="dom" class="charts tg-line-loss-govern"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from '../../../../components/charts/theme.json'
import { off, on } from '@/libs/tools'
import { judgeNull } from './util'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'tgLineLossGovern',
  props: {
    totalData: Array,
    dateType: String,
    change: Boolean
  },
  data () {
    return {
      dom: null,
      color: ['#277AD2', '#00CCCC', '#19BE6B', '#BD99ED', '#EDA1D4']
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
        let orgName = this.totalData.map(_ => _this.removeNull(_.orgName))
        let governCnt = this.totalData.map(_ => _this.removeNull(_.goverTgNum))
        let newAlarmCnt = this.totalData.map(_ => _this.removeNull(_.addExtTgNum))
        let passCnt = this.totalData.map(_ => _this.removeNull(_.normalTgNum))
        let lastMonthLineLossRate = this.totalData.map(_ => _this.removeNull(_.lastMonthLlr))
        let nowLineLossRate = this.totalData.map(_ => _this.removeNull(_.lllr))

        let legendData = null
        if (this.dateType === 'day') {
          legendData = ['日治理台区数', '日新增异常台区数', '当日线损合格数', '上月线损率', '当前线损率']
        } else {
          legendData = ['月治理台区数', '月新增异常台区数', '当月线损合格数', '上月线损率', '当月线损率']
        }

        let option = {
          legend: {
            bottom: 0,
            itemGap: 5,
            itemWidth: 20,
            data: legendData
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
              data: orgName,
              splitLine: {
                show: false
              },
              axisLabel: {
                interval: 0,
                rotate: 30
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '单位：台区',
              min: 0,
              splitLine: {
                show: false
              }
            },
            {
              type: 'value',
              name: '单位：%',
              // min: 0,
              // max: 100,
              splitLine: {
                show: false
              }
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
              name: legendData[0],
              type: 'bar',
              data: governCnt,
              barWidth: '15%',
              barGap: '10%'
            },
            {
              name: legendData[1],
              type: 'bar',
              data: newAlarmCnt,
              barWidth: '15%',
              barGap: '10%'
            },
            {
              name: legendData[2],
              type: 'bar',
              data: passCnt,
              barWidth: '15%',
              barGap: '10%'
            },
            {
              name: legendData[3],
              type: 'line',
              yAxisIndex: 1,
              data: lastMonthLineLossRate
            },
            {
              name: legendData[4],
              type: 'line',
              yAxisIndex: 1,
              data: nowLineLossRate
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
