<!--异常线损分析 柱状图-->
<template>
  <div class="barChart">

    <fieldset class="fieldset">
      <div class="echartsBox" ref="domBar">
      </div>
    </fieldset>

  </div>
</template>

<script>
import echarts from 'echarts'
import axios from '@/libs/api.request'

export default {
  components: {
    axios
  },
  props: {
    queryItems: {
      type: Object,
      default () {
        return {}
      }
    },
    refreshDataTrigger: {
      type: Boolean
    }
  },
  data () {
    return {
      // 可计算率数组
      canCountRate: [],
      // 后台查询的数据组
      barMessageData: [
        {
          'orgNo': '34401',
          'orgName': 'dddccc',
          'phaseTypeCode': '2',
          'statDate': '20190626',
          'tgNum': 300,
          'uncalcTgNum': 100
        },
        {
          'orgNo': '34402',
          'orgName': 'dddccc222',
          'phaseTypeCode': '1',
          'statDate': '20190627',
          'tgNum': 400,
          'uncalcTgNum': 100
        }
      ]
    }
  },
  methods: {
    // 得到柱状图数据
    getBarData () {
      axios.request({
        url: '/sea-lineLose/tgPhaseLineLoss/statBar',
        method: 'post',
        data: this.queryItems
      }).then(response => {
        console.log('BarData', response.data)
        this.barMessageData = []
        this.barMessageData = response.data.data.list
        this.$nextTick(() => {
          this.dawBar()
        })
      })
      // this.barMessageData = []
      // this.barMessageData = [
      //   {
      //     'orgNo': '34401',
      //     'orgName': 'dddccc',
      //     'phaseTypeCode': '2',
      //     'statDate': '20190626',
      //     'tgNum': 500,
      //     'uncalcTgNum': 100
      //   },
      //   {
      //     'orgNo': '34402',
      //     'orgName': 'dddccc222',
      //     'phaseTypeCode': '1',
      //     'statDate': '20190627',
      //     'tgNum': 600,
      //     'uncalcTgNum': 100
      //   }
      // ]
      // this.$nextTick(() => {
      //   this.dawBar()
      // })
    },
    // 柱状图绘制
    dawBar () {
      this.$nextTick(() => {
        this.canCountRate = []
        for (let i = 0; i < this.barMessageData.length; i++) {
          this.canCountRate.push(
            {
              'canCount': (this.barMessageData[i].tgNum - this.barMessageData[i].uncalcTgNum) / this.barMessageData[i].tgNum * 100
            }
          )
        }
        console.log('canCountRate', this.canCountRate)
        let option = {
          legend: {
          },
          tooltip: {},
          grid: {
            left: '10%', // 距离左边的距离
            right: '-8%', // 距离右边的距离
            bottom: '-5%', // 距离下边的距离
            top: '22%', // 距离上边的距离
            containLabel: true
          },
          xAxis: {
            type: 'category',
            triggerEvent: true,
            data: this.barMessageData.map(_ => _.statDate),
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              interval: 0,
              rotate: 10 // 角度顺时针计算的
            }
          },
          yAxis: {
            type: 'value',
            name: '%',
            min: 0
          },
          series: [
            {
              'type': 'bar',
              'yAxisIndex': '0', // 使用第一个y轴
              'name': '可计算率',
              'data': this.canCountRate.map(_ => _.canCount)
            }
          ],
          'barWidth': 20, // 柱形的宽度
          'barCategoryGap': '20%', // 柱形的间距
          'color': ['#daeb2c', '#4597F1']
        }
        let domBar = echarts.init(this.$refs.domBar)
        domBar.setOption(option)
      })
    }
  },
  watch: {
    // 父组件中该属性变化时，触发数据加载
    refreshDataTrigger () {
      this.getBarData()
    }
  },
  mounted () {
    // this.publicFunction()
    // this.dawBar()
  }
}
</script>

<style scoped>
  .echartsBox {
    width: 80%;
    height: 80%;
  }

  .fieldset {
    margin-top: -5%;
    width: 80%;
    height: 92%;
  }
</style>
