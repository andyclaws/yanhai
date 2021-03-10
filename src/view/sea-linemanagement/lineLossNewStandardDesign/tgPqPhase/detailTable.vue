<template>
  <div class="detailTable">
    <Tables border
            height=405
            ref="detailTable"
            :columns="detailTableColumns"
            :axiosUrl="axiosUrl"
            :axiosData="axiosData"
            class="table"/>
  </div>
</template>
<script>
import Tables from '_c/tables'
export default {
  name: 'detailTable',
  components: {
    Tables
  },
  props: ['axiosData'],
  data () {
    return {
      // 分析表表头
      detailTableColumns: [
        {
          title: '供电单位',
          key: 'orgNo',
          align: 'center',
          width: 150
        }, {
          title: '台区编号',
          key: 'tgId',
          align: 'center',
          width: 150
        }, {
          title: '台区名称',
          key: 'tgName',
          align: 'center',
          width: 150
        }, {
          title: '责任人工号',
          key: 'respEmpNo',
          align: 'center',
          width: 150
        }, {
          title: '责任人名称',
          key: 'respEmpName',
          align: 'center',
          width: 150
        }, {
          title: '时间',
          key: 'statDate',
          align: 'center',
          width: 150
        }, {
          title: '考核单元标识',
          key: 'chkunitId',
          align: 'center',
          width: 150
        }, {
          title: '考核单元名称',
          key: 'chkunitName',
          align: 'center',
          width: 150
        }, {
          title: '组合标识',
          key: 'linkFlag',
          align: 'center',
          width: 150
        }, {
          title: '考核单元启停状态',
          key: 'statusCode',
          align: 'center',
          width: 150
        }, {
          title: 'A相供电量',
          key: 'appq',
          align: 'center',
          width: 150
        }, {
          title: 'B相供电量',
          key: 'bppq',
          align: 'center',
          width: 150
        }, {
          title: 'C相供电量',
          key: 'cppq',
          align: 'center',
          width: 150
        }, {
          title: 'A相售电量',
          key: 'aspq',
          align: 'center',
          width: 150
        }, {
          title: 'B相售电量',
          key: 'bspq',
          align: 'center',
          width: 150
        }, {
          title: 'C相售电量',
          key: 'cspq',
          align: 'center',
          width: 150
        }, {
          title: 'A相发电量',
          key: 'agpq',
          align: 'center',
          width: 150
        }, {
          title: 'B相发电量',
          key: 'bgpq',
          align: 'center',
          width: 150
        }, {
          title: 'C相发电量',
          key: 'cgpq',
          align: 'center',
          width: 150
        }, {
          title: 'A相办公用电',
          key: 'aofficeSpq',
          align: 'center',
          width: 150
        }, {
          title: 'B相办公用电',
          key: 'bofficeSqp',
          align: 'center',
          width: 150
        }, {
          title: 'C相办公用电',
          key: 'cofficeSpq',
          align: 'center',
          width: 150
        }, {
          title: 'A相自用电',
          key: 'astaffSpq',
          align: 'center',
          width: 150
        }, {
          title: 'B相自用电',
          key: 'bstaffSpq',
          align: 'center',
          width: 150
        }, {
          title: 'C相自用电',
          key: 'cstaffSpq',
          align: 'center',
          width: 150
        }, {
          title: 'A相线损',
          key: 'aloseRate',
          align: 'center',
          width: 150
        }, {
          title: 'B相线损',
          key: 'bloseRate',
          align: 'center',
          width: 150
        }, {
          title: 'C相线损',
          key: 'clostRate',
          align: 'center',
          width: 150
        }, {
          title: 'A相采集成功率',
          key: 'acollRate',
          align: 'center',
          width: 150
        }, {
          title: 'B相采集成功率',
          key: 'bcollRate',
          align: 'center',
          width: 150
        }, {
          title: 'C相采集成功率',
          key: 'ccollRate',
          align: 'center',
          width: 150
        }
      ],
      axiosUrl: '/sea-lineLose/tgPhaseLineLoss/queryDetailTable'
    }
  }
}
</script>

<style lang="less">
  .detailTable{
    .ivu-poptip-content{
      height: 300px;
      overflow-y: scroll;
    }
  }
</style>
