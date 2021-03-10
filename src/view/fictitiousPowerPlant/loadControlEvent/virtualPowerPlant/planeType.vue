<template>
  <div class="unitResponseModeEcharts1 unitResponseModeEcharts3" ref="dom"></div>
</template>
<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'planeType',
  props: {
    planeTypeData: Array
  },
  data () {
    return {
      dom: ''
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
          typeof _this.planeTypeData === 'undefined' ||
          _this.planeTypeData === null
        ) {
          return
        }
        console.log(666, _this.planeTypeData)
        let seriesData = []
        _this.planeTypeData.forEach((item, index) => {
          seriesData = [
            {
              name: '削峰',
              value: item.eventCount
            },
            {
              name: '填谷',
              value: item.eventCount
            }
          ]
          // console.log(seriesData);
        })
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 330,
            data: ['削峰', '填谷'],
            y: 'center'
          },
          toolbox: {
            show: false,
            feature: {
              mark: {
                show: true
              },
              dataView: {
                show: true,
                readOnly: true
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                },
                emphasis: {
                  label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                }
              },
              data: seriesData,
              center: ['30%', '50%']
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
    planeTypeData () {
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
