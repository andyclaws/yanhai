<template>
  <div ref="dom" class="charts tg-line-loss-pass-rate"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from '../../../../components/charts/theme.json'
import { off, on } from '@/libs/tools'
import { judgeNull } from './util'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'tgLineLossPassRate',
  props: ['totalData', 'dateType', 'change'],
  data () {
    return {
      dom: null,
      color: ['#2D8CF0', '#E4E4E4', '#00CCCC', '#E4E4E4', '#BE9CED', '#FDBC5B', '#EC9FD2', '#ED3F14']
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
        let yesPass = this.totalData.map(_ => _this.removeNull(_.yesPass))
        let yesUnpass = this.totalData.map(_ => _this.removeNull(_.yesUnpass))
        let toPass = this.totalData.map(_ => _this.removeNull(_.toPass))
        let toUnpass = this.totalData.map(_ => _this.removeNull(_.toUnpass))
        let succRate = this.totalData.map(_ => _this.removeNull(_.readSuccRate))
        let coverRate = this.totalData.map(_ => _this.removeNull(_.coverMetRate))
        let isMonitor = this.totalData.map(_ => _this.removeNull(_.isMonitorTgRate))
        let lineLossRate = this.totalData.map(_ => _this.removeNull(_.lLlrScore))
        let scatterLineLossRate = []
        for (let i = 0; i < orgName.length; i++) {
          let couple = [orgName[i], lineLossRate[i]]
          scatterLineLossRate.push(couple)
        }

        let legendData = null
        if (this.dateType === 'day') {
          legendData = ['上月合格台区数', '上月不合格台区数', '当天合格台区数', '当天不合格台区数', '采集成功率', '采集覆盖率', '在线监测率', '线损率']
        } else {
          legendData = ['上月合格台区数', '上月不合格台区数', '当月合格台区数', '当月不合格台区数', '采集成功率', '采集覆盖率', '在线监测率', '线损率']
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
              // max: 40000,
              // interval: 5000,
              splitLine: {
                show: false
              }
            },
            {
              type: 'value',
              name: '单位：%',
              // min: 0,
              // max: 100,
              // interval: 12.5,
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
              let res = params[0].name + '<br>'
              for (let i = 0; i < params.length; i++) {
                res += `<span
                           style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 10px; height:10px;
                           background-color: ${params[i].color}"></span>
                           ${params[i].seriesName} : ${params[i].value.length > 1 ? params[i].value[1] : params[i].value}
                           ${params[i].seriesName.indexOf('率') > -1 ? '%' : ''}<br>`
              }
              return res
            }
          },
          series: [
            {
              name: legendData[0],
              type: 'bar',
              stack: '昨日',
              data: yesPass,
              barWidth: '20%',
              barGap: '20%'
            },
            {
              name: legendData[1],
              type: 'bar',
              stack: '昨日',
              data: yesUnpass,
              barWidth: '20%',
              barGap: '20%',
              legendHoverLink: false,
              emphasis: {
                itemStyle: {
                  color: '#E4E4E4'
                }
              }
            },
            {
              name: legendData[2],
              type: 'bar',
              stack: '今日',
              data: toPass,
              barWidth: '20%',
              barGap: '20%'
            },
            {
              name: legendData[3],
              type: 'bar',
              stack: '今日',
              data: toUnpass,
              barWidth: '20%',
              barGap: '20%',
              legendHoverLink: false,
              emphasis: {
                itemStyle: {
                  color: '#E4E4E4'
                }
              }
            },
            {
              name: legendData[4],
              type: 'line',
              yAxisIndex: 1,
              data: succRate
            },
            {
              name: legendData[5],
              type: 'line',
              yAxisIndex: 1,
              data: coverRate
            },
            {
              name: legendData[6],
              type: 'line',
              yAxisIndex: 1,
              data: isMonitor
            },
            {
              name: legendData[7],
              type: 'scatter',
              yAxisIndex: 1,
              symbolSize: 7,
              label: {
                show: true,
                position: 'top',
                formatter: function (params) {
                  return params.value[1] + '%'
                },
                color: '#000',
                fontWeight: 'bold',
                backgroundColor: '#fff'
              },
              data: scatterLineLossRate
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
