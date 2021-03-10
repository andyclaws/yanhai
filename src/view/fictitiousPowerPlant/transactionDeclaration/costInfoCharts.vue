<template>
  <div class="costInfo-chart" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'costInfoCharts',
  props: {},
  data () {
    return {
      dom: null
    }
  },
  components: {},
  mounted () {
    this.$nextTick(() => {
      let EstimatedPriceLineStyle = {
        color: '#f5b270'
      }
      let option = {
        color: ['#f5b270'],
        title: {
          text: '虚拟发电成本',
          textStyle: {
            fontSize: 13
          },
          top: '2%'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          icon: 'rectangle',
          right: '30%',
          top: '5%',
          data: ['发电成本']
        },
        grid: {
          top: '25%',
          left: '3%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00']
          // name: '容量(kWh)'
        },
        yAxis: {
          type: 'value',
          name: '价格(元)'
        },
        series: [
          {
            name: '发电成本',
            type: 'line',
            symbol: 'none',
            step: 'end',
            data: [13, 9, 9, 6, 6, 9, 9, 14, 14],
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
