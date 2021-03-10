<template>
  <!--统计表-->
  <div class="statTable">
    <Tables border
           id="statTables"
           height=200
           ref="statTables"
           :columns="columns"
           class="table"  :axiosUrl="axiosUrl" :axiosData="axiosData"/>
  </div>
</template>

<script>
import axios from '@/libs/api.request'
import Tables from '_c/tables'
export default {
  name: 'statTable',
  components: {
    axios,
    Tables
  },
  props: ['axiosData'],
  data () {
    return {
      // 统计表表头
      columns: [
        {
          title: '供电单位',
          key: 'orgName',
          align: 'center',
          width: 150
        }, {
          title: '台区数',
          key: 'tgNum',
          align: 'center',
          width: 150
        }, {
          title: '相位',
          key: 'phaseTypeCode',
          align: 'center',
          width: 150,
          render: (h, param) => {
            return h('span', this.changePhaseTypeCode(param.row.phaseTypeCode))
          }
        }, {
          title: '不可算台区数',
          key: 'uncalcTgNum',
          align: 'center',
          width: 150
        }, {
          title: ' x≤-1%',
          key: 'l_LLR_1',
          align: 'center',
          width: 150
        }, {
          title: '-1%<x≤0%',
          key: 'l_LLR_2',
          align: 'center',
          width: 150
        }, {
          title: '0%<x≤4%',
          key: 'l_LLR_3',
          align: 'center',
          width: 150
        }, {
          title: '4%<x≤7%',
          key: 'l_LLR_4',
          align: 'center',
          width: 150
        }, {
          title: '7%<x≤10%',
          key: 'l_LLR_5',
          align: 'center',
          width: 150
        }, {
          title: '10%<x≤15%',
          key: 'l_LLR_6',
          align: 'center',
          width: 150
        }, {
          title: 'x≥15%',
          key: 'l_LLR_7',
          align: 'center',
          width: 150
        }, {
          title: '日期',
          key: 'statDate',
          align: 'center',
          width: 150
        },
        {
          title: '责任人',
          key: 'respEmpNo',
          align: 'center',
          width: 150
        }
      ],
      axiosUrl: '/sea-lineLose/tgPhaseLineLoss/queryStatTable'
    }
  },
  methods: {
    changePhaseTypeCode (phaseTypeCode) {
      switch (phaseTypeCode) {
        case '1': return 'A相'
        case '2': return 'B相'
        case '3': return 'C相'
      }
    }
  }
}
</script>

<style lang="less">
  .cdiv{
    padding: 5px 10px;
    background: rgb(0, 0, 0, 0.4);
    color: white;
    font-weight: bold;
    border: 1px solid #CCCCCC;
    box-sizing: border-box;
    font-size: 0.75rem;
    border-radius: 5px;
    position: absolute;
    z-index: 999999999;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  /*.ivu-poptip-content{*/
  /*width: 180px !important;*/
  /*}*/
  th .ivu-table-cell {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
