<template>
  <Card class="thisYearHistory">
    <p slot="title" class="title">当月历史发电量</p>
    <div ref="dom" class="echarts2"></div>
  </Card>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'

export default {
  name: 'monthSupport',
  props: {
    monthData: Array
  },
  data () {
    return {
      dom: null,
      color: ['#07DB8A', '#FEA348', '#0099FF']
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
          typeof _this.monthData === 'undefined' ||
          _this.monthData === null
        ) {
          return
        }
        // let planNames = _this.monthData.map(_ => _this.removeNull(_.planName))
        // let peakPlans = _this.monthData.map(_ => _this.removeNull(_.peakPlan))
        // let peakReals = _this.monthData.map(_ => _this.removeNull(_.peakReal))
        // let peakComplateRates = _this.monthData.map(_ =>
        //   _this.removeNull(_.peakComplateRate)
        // )
        // let peelPlans = _this.monthData.map(_ => _this.removeNull(_.peelPlan))
        // let peelReals = _this.monthData.map(_ => _this.removeNull(_.peelReal))
        // let peelComplateRates = _this.monthData.map(_ =>
        //   _this.removeNull(_.peelComplateRate)
        // )

        let peakPlans = []
        let peakReals = []
        let peakComplateRates = []
        let planNames = []
        let series = {}
        for (let i = 0; i < _this.monthData.length; i++) {
          planNames.push(_this.monthData[i].planName)
          peakPlans.push(_this.monthData[i].unitPlanValue)
          peakReals.push(_this.monthData[i].unitActualValue)
          peakComplateRates.push(_this.monthData[i].unitFinishRate)
          // console.log(peakPlans,peakReals,peakComplateRates)
        }
        let option = {
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0],
              filterMode: 'filter',
              throttle: '50',
              minValueSpan: 4,
              start: 0,
              end: 60,
              zoomLock: true
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
              res += params[0].axisValue + ' :</br>'
              for (var i = 0; i < params.length; i++) {
                res +=
                  "<span style='color:" +
                  params[i].color +
                  ";'>" +
                  params[i].seriesId +
                  '  :  ' +
                  params[i].value
                if (params[i].seriesType === 'line') {
                  res += '%'
                } else {
                  res += ' kW'
                }
                res += '</span>'
                if (i !== params.length - 1) {
                  res += '</br>'
                }
              }
              return res
            }
          },
          legend: {
            right: '10px',
            itemGap: 5,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              fontSize: 12,
              fontWeight: 400,
              color: '#666666'
            },
            data: ['计划值', '实际值', '完成率']
          },
          grid: {
            top: '30%',
            left: '10%',
            right: '3%',
            bottom: '2%',
            containLabel: true
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: planNames,
              triggerEvent: true,
              splitLine: {
                show: false
              },
              splitArea: {
                show: false
              },
              axisTick: {
                show: false,
                interval: 0,
                inside: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '单位: kW',
              scale: true,
              axisLine: {
                show: true,
                lineStyle: {
                  type: 'dotted'
                }
              },
              splitArea: {
                show: false
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed'
                }
              },
              axisTick: {
                show: false
              },
              nameTextStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: '#999999'
              },
              min: 0
            },
            {
              name: '单位: %',
              type: 'value',
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  type: 'dotted'
                }
              },
              scale: true,
              max: 100,
              min: 0
            }
          ],
          series: [
            {
              id: '计划值',
              name: '计划值',
              type: 'bar',
              barWidth: '10',
              // stack: 'plan',
              yAxisIndex: 0,
              data: peakPlans
            },
            // {
            //   id: '填谷计划值',
            //   name: '计划值',
            //   type: 'bar',
            //   stack: 'plan',
            //   yAxisIndex: 0,
            //   data: peelPlans
            // },
            {
              id: '实际值',
              name: '实际值',
              type: 'bar',
              barWidth: '10',
              // stack: 'real',
              yAxisIndex: 0,
              data: peakReals
            },
            // {
            //   id: '填谷实际值',
            //   name: '实际值',
            //   type: 'bar',
            //   stack: 'real',
            //   yAxisIndex: 0,
            //   data: peelReals
            // },
            {
              id: '完成率',
              type: 'line',
              name: '完成率',
              yAxisIndex: 1,
              data: peakComplateRates
            }
            // {
            //   id: '填谷完成率',
            //   type: 'line',
            //   name: '完成率',
            //   yAxisIndex: 1,
            //   data: peelComplateRates
            // }
          ],
          color: _this.color
        }
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.on('click', function (params) {
          if (params.componentType === 'xAxis') {
            _this.$router.push({
              name: 'historyPowerGenerationEvent',
              query: {
                planName: params.value
              }
            })
          }
        })
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  watch: {
    monthData () {
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

<style lang="less">
@import "machineDetails.less";
</style>
