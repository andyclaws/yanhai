<template>
  <div>
    <div class="unitResponseModeEcharts1 unitResponseModeEcharts4" ref="dom"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'PlannedValueDistributionInterval',
  props: {
    plannedValueDistributionIntervalData: Array
  },
  data () {
    return {
      dom: '',
      isActiveBtn: true
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
          typeof _this.plannedValueDistributionIntervalData === 'undefined' ||
          _this.plannedValueDistributionIntervalData === null
        ) {
          return
        }
        console.log(666, _this.plannedValueDistributionIntervalData)
        let legendData = []
        let seriesData = []
        _this.plannedValueDistributionIntervalData.forEach((item, index) => {
          seriesData = [
            {
              name: 'DR',
              value: item.planMode01
            },
            {
              name: 'ADR',
              value: item.planMode02
            },
            {
              name: 'DR&ADR',
              value: item.planMode03
            }
          ]
        })
        let option = {
          title: {
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            x: 345,
            y: 'center',
            data: ['DR', 'ADR', 'DR&ADR'],
            orient: 'vertical'
          },

          calculable: true,
          series: [
            {
              name: '半径模式',
              type: 'pie',
              radius: [20, 90],
              center: [200, '50%'],
              roseType: 'radius',
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              },
              data: seriesData
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
    plannedValueDistributionIntervalData () {
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
@import "../loadControlEvent.less";
</style>
