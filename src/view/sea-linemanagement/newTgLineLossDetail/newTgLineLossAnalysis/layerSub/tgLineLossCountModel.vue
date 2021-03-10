<template>
  <div class="tgLineLossCountModel">
    <card>
      <div class="flex-jcsb-ac layer-title">
        <p>计算模型</p>
        <p>是否存在考核单元标: 是</p>
      </div>
    </card>
    <tables ref="tables" editable :columns="columns" :height="tableHeight - 50" :axiosUrl="axiosUrl" :axiosData="queryData" :filename="'台区线损计算模型明细表格'" />
  </div>
</template>
<script>
import Tables from '_c/tables'
export default {
  name: 'tgLineLossCountModel',
  props: ['queryData', 'axiosUrl'],
  components: {
    Tables
  },
  data () {
    return {
      tableHeight: 500,
      columns: [
        {
          title: '用户编号',
          width: 100,
          key: 'consNo',
          sortable: true
        },
        {
          title: '用户名称',
          width: 100,
          key: 'consName',
          sortable: true
        },
        {
          title: '用户类型',
          key: 'consType',
          width: 140,
          sortable: true
        },
        {
          title: '是都为分布式电源用户（消纳方式）',
          key: 'consumptive',
          width: 150,
          sortable: true
        },
        {
          title: '电表资产号',
          key: 'assetNo',
          width: 200,
          sortable: true
        },
        {
          title: '计量点用途',
          key: 'mpType',
          width: 80,
          sortable: true
        },
        {
          title: '参与电量纬度',
          key: 'elecLatitude',
          width: 80,
          sortable: true
        },
        {
          title: '参与计算方向',
          key: 'calcDirection',
          width: 80,
          sortable: true
        }
      ],
      axiosData: {}
    }
  },
  methods: {
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 300 : 500
    }
  },
  mounted () {
    let that = this
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
  }
}
</script>
<style lang="less">
.tgLineLossCountModel{
  .ivu-card-body{
    padding-top: 0;
    padding-bottom: 0;
    .layer-title{
      height: 40px;
      line-height: 40px;
      p{
        font-weight: 700;
        font-style: normal;
        font-size: 14px;
        color: #009999;
      }
    }
  }
}
</style>
