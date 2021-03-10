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
    }
  },
  mounted () {
    var myecharts = echarts.init(document.getElementById('echartContainer'), 'light')
    myecharts.setOption({
      title: {
        text: '线损监测率'
      },
      legend: {
        data: ['南京供电公司', '安徽供电公司', '淮北供电公司']
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
        data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '南京供电公司',
          type: 'line',
          stack: '线损',
          data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: '安徽供电公司',
          type: 'line',
          stack: '线损',
          data: []
        },
        {
          name: '淮北供电公司',
          type: 'line',
          stack: '线损',
          data: []
        }
        // {
        //   name: '0<=线损率<4',
        //   type: 'line',
        //   stack: '线损',
        //   data: [13333, 12555, 5000, 4444, 8888, 10000, 13333]
        // },
        // {
        //   name: '4<=线损率<7',
        //   type: 'line',
        //   stack: '线损',
        //   data: [4444, 5555, 2000, 6666, 4444, 3567, 7000]
        // },
        // {
        //   name: '7<=线损率<10',
        //   type: 'line',
        //   stack: '线损',
        //   data: [23, 32, 332, 142, 32, 32, 231]
        // },
        // {
        //   name: '10<=线损率<15',
        //   type: 'line',
        //   stack: '线损',
        //   data: []
        // },
        // {
        //   name: '15<=线损率',
        //   type: 'line',
        //   stack: '线损',
        //   data: []
        // }
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
