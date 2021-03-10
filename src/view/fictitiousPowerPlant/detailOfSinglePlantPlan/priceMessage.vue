<template>
  <div class="priceMessage">
    <h3>|||&nbsp;价格信息</h3>
    <div class="form">
      <i-table border :columns="columns1" :data="data1" height="220"></i-table>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'priceMessage',
  data () {
    return {
      columns1: [
        {
          title: '交易时间段',
          key: 'electricityGradient',
          width: '170',
          align: 'center'
        },
        {
          title: '单价(元)',
          key: 'unitPrice',
          width: '90',
          align: 'center'
        },
        {
          title: '总价(元)',
          key: 'totalPrice',
          width: '90',
          align: 'center'
        },
        {
          title: '虚拟发电量(kW)',
          key: 'electricityThan',
          width: '150',
          align: 'center'
        }
      ],
      data1: [
        {
          electricityGradient: '00:00:00~04:00:00',
          unitPrice: 2,
          totalPrice: 12,
          electricityThan: 200
        },
        {
          electricityGradient: '04:00:00~08:00:00',
          unitPrice: 2,
          totalPrice: 12,
          electricityThan: 200
        },
        {
          electricityGradient: '08:00:00~12:00:00',
          unitPrice: 2,
          totalPrice: 12,
          electricityThan: 200
        },
        {
          electricityGradient: '12:00:00~14:00:00',
          unitPrice: 2,
          totalPrice: 12,
          electricityThan: 200
        }
      ]
    }
  }
}
</script>
<style lang="less">
@import "detailOfSinglePlantPlan.less";
</style>
