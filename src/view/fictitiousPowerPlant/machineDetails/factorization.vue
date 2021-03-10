<template>
  <Card class="factorization">
    <p slot="title" class="title">因子分解</p>
    <div ref="dom" class="echarts3"></div>
  </Card>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'

export default {
  name: 'factorization',
  props: {
    pieData: Array
  },
  data () {
    return {
      dom: null,
      color: ['#FFC313', '#F46042']
    }
  },
  mounted () {
    console.log(this.pieData)
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
      console.log(this.pieData)
      let _this = this
      // let names = _this.pieData.map(_ => _this.removeNull(_.name))
      this.$nextTick(() => {
        // TODO
        let legendData = []
        let seriesData = []
        for (let i = 0; i < _this.pieData.length; i++) {
          legendData.push(_this.pieData[i].subdeviceType)
          let series = {
            name: _this.pieData[i].subdeviceType,
            value: _this.pieData[i].subdeviceCnt
          }
          seriesData.push(series)
        }
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}个 ({d}%)'
          },
          legend: {
            orient: 'vertical',
            textStyle: {
              fontSize: 12
            },
            itemHeight: 13,
            itemWidth: 13,
            x: '60%',
            y: 'center',
            data: legendData
            // data: ["空调", "饮水机"]
          },
          grid: {
            top: '0%',
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['30%', '50%'],
              data: seriesData,
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                }
                // emphasis: {
                //   show: true,
                //   textStyle: {
                //     fontSize: '30',
                //     fontWeight: 'bold'
                //   }
                // }
              },
              labelLine: {
                normal: {
                  show: true
                }
              }
              // data: _this.pieData
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
    pieData () {
      this.draw()
    },
    change () {
      setTimeout(() => {
        this.resize()
      }, 200)
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {})
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>

<style lang="less">
@import "machineDetails.less";
</style>
