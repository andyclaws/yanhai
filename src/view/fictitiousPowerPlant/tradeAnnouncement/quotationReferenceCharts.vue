<template>
  <div class="quote-chart" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'quotationReference',
  props: {},
  data () {
    return {}
  },
  components: {},
  mounted () {
    this.$nextTick(() => {
      let guidancePriceLineStyle = {
        color: '#07b7db'
      }
      let EstimatedPriceLineStyle = {
        color: '#f5b270'
      }
      let option = {
        color: ['#f5b270'],
        title: {
          text: '价格曲线',
          textStyle: {
            fontSize: 14
          },
          left: '2%'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          icon: 'rectangle',
          right: '30%',
          top: '5%',
          data: ['交易时段预估价']
        },
        grid: {
          top: '25%',
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
        },
        yAxis: {
          type: 'value',
          name: '价格(元)'
        },
        series: [
          {
            name: '交易时段预估价',
            type: 'line',
            symbol: 'none',
            step: 'end',
            data: [8, 8, 10, 10, 12, 12, 12],
            lineStyle: EstimatedPriceLineStyle
          }
        ]
      }
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  methods: {
    resize () {
      if (typeof this.dom !== 'undefined' && this.dom !== null) {
        this.dom.resize()
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
