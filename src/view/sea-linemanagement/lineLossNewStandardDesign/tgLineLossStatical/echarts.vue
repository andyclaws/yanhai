<template>
  <div class="demo-split">
    <div id="echartContainer">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      // xdata: ['合肥供电公司', '合肥供电公司', '合肥供电公司', '合肥供电公司',
      //   '合肥供电公司', '合肥供电公司', '合肥供电公司', '合肥供电公司'],
      // rapdata: [50000, 50000, 60000, 50000, 100000, 50000, 50000, 80000],
      // rrpata: [60000, 50000, 50000, 50000, 30000, 50000, 50000, 50000]
    }
  },
  mounted () {
    var myecharts = echarts.init(document.getElementById('echartContainer'), 'light')
    myecharts.setOption({
      title: {
        text: '分段统计'
      },
      legend: {
        data: ['线损不可算', '线损率<-1', '-1<=线损率<0', '0<=线损率<4', '4<=线损率<7', '7<=线损率<10', '10<=线损率<15', '15<=线损率']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          // saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['合肥供电公司', '南京供电公司', '六合供电公司', '杭州供电公司', '上海供电公司', '惠安供电公司', '缓缓供电公司']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '线损率不可算',
          type: 'line',
          stack: '线损',
          data: []
        },
        {
          name: '线损率<-1',
          type: 'line',
          stack: '线损',
          data: [200, 111, 321, 542, 333, 444, 666]
        },
        {
          name: '-1<=线损率<0',
          type: 'line',
          stack: '线损',
          data: [233, 123, 666, 555, 123, 330, 755]
        },
        {
          name: '0<=线损率<4',
          type: 'line',
          stack: '线损',
          data: [13333, 12555, 5000, 4444, 8888, 10000, 13333]
        },
        {
          name: '4<=线损率<7',
          type: 'line',
          stack: '线损',
          data: [4444, 5555, 2000, 6666, 4444, 3567, 7000]
        },
        {
          name: '7<=线损率<10',
          type: 'line',
          stack: '线损',
          data: [23, 32, 332, 142, 32, 32, 231]
        },
        {
          name: '10<=线损率<15',
          type: 'line',
          stack: '线损',
          data: []
        },
        {
          name: '15<=线损率',
          type: 'line',
          stack: '线损',
          data: []
        }
      ]
    })
  }
}
</script>
<style scoped>
  .demo-split {
    width: 100%;
    height: 300px;
  }
  #echartContainer {
    width: 90%;
    height: 300px;
  }
</style>
