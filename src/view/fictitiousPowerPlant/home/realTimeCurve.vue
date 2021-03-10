<template>
  <div ref="dom" class="charts real-time-curve"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from '../../../components/charts/theme.json'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'realTimeCurve',
  props: {
    upList: Array,
    downList: Array,
    aplantPForecasts: Array,
    aplantPRealtimes: Array
  },
  data () {
    return {
      dom: null,
      color: ['#0099FF', '#FF9933']
    }
  },
  methods: {
    removeNull (val, initStr = '') {
      return judgeNull(val, initStr)
    },
    resize () {
      if (typeof this.dom !== 'undefined' && this.dom !== null) {
        this.dom.resize()
      }
    },
    removeEndNull (arr) {
      let noEndNullArr = []
      let isEnd = true
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== '' || !isEnd) {
          noEndNullArr.push(arr[i])
          isEnd = false
        }
      }
      return noEndNullArr.reverse()
    },
    draw () {
      // let _this = this
      this.$nextTick(() => {
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            top: 0,
            right: 10,
            itemGap: 10,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              fontSize: 12,
              fontWeight: 400,
              color: '#666666'
            },
            data: ['光伏', '风电', '储能']
          },
          grid: {
            left: 0,
            top: 20,
            right: 15,
            bottom: 0,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              xaxisLabel: {
                interval: 15
              },
              data: ['7月1日', '7月2日', '7月3日']
            }
          ],
          yAxis: [
            {
              name: '单位: MW',
              type: 'value',
              min: 0,
              splitLine: {
                show: true
              },
              nameTextStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: '#999999'
              },
              nameGap: 5
            }
          ],
          series: [
            {
              name: '光伏',
              type: 'bar',
              barMaxWidth: 30,
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [320, 302, 301]
            },
            {
              name: '风电',
              type: 'bar',
              barMaxWidth: 30,
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [120, 132, 101]
            },
            {
              name: '储能',
              type: 'bar',
              barMaxWidth: 30,
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [220, 182, 191]
            }
          ]
        }
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    },
    getNotEmptyVal (val, modal = '') {
      if (val === undefined || val === null) {
        val = modal
      }
      return val
    }
  },
  watch: {
    upList () {
      this.draw()
    },
    downList () {
      this.draw()
    },
    aplantPForecasts () {
      this.draw()
    },
    aplantPRealtimes () {
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
