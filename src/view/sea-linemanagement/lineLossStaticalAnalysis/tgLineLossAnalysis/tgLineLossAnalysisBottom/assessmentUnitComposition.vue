<template>
  <div class="assessment-unit-composition">
    <Card dis-hover :bordered="false">
      <Tables
        ref="tables"
        height=300
        :columns="columns"
        v-model="nowData"
        :current="current"
        :total="total"
        :pageSizeOpts="pageSizeOpts"
        :pageSize="pageSize"
        :bottomTools="bottomTools"
        @on-change="pageChange"
        @on-page-change="pageChange"
      />
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  name: 'assessmentUnitComposition',
  components: {
    Tables
  },
  data () {
    return {
      elecExcepDiagSingle: 0,
      voltCurrExcepDiagSingle: 0,
      excepElecDiagSingle: 0,
      loadExcepDiagSingle: 0,
      clockExcepDiagSingle: 0,
      wiringExcepDiagSingle: 0,
      chargeCtrlExcepDiagSingle: 0,

      columns: [
        {
          title: '序号',
          key: 'rownumberer',
          width: 80
        }, {
          title: '供电单位',
          key: 'ORG_NAME',
          width: 120
        }, {
          title: '事件名称',
          key: 'EVENT_NAME',
          width: 120
        }, {
          title: '异常类型',
          key: 'ALARM_TYPE',
          width: 120
        }, {
          title: '流程状态',
          key: 'FLOW_FLAG_NAME',
          width: 120
        }, {
          title: '事件等级',
          key: 'EVENT_LEVEL',
          width: 120
        }, {
          title: '用户名称',
          key: 'CONS_NAME',
          width: 120
        }, {
          title: '用户编号',
          key: 'CONS_NO',
          width: 120
        }, {
          title: '用户分类',
          key: 'CONS_SORT_NAME',
          width: 120
        }, {
          title: '最近告警时间',
          key: 'ALARM_DATE',
          width: 120
        }, {
          title: '第一次告警时间',
          key: 'FIRST_ALARM_DATE',
          width: 150
        }, {
          title: '告警发生次数',
          key: 'ALARM_CNT',
          width: 120
        }, {
          title: '最近恢复时间',
          key: 'RESUME_DATE',
          width: 120
        }, {
          title: '第一次恢复时间',
          key: 'FIRST_RESUME_DATE',
          width: 150
        }, {
          title: '恢复天数',
          key: 'RESUME_DAY_CNT',
          width: 120
        }, {
          title: '终端地址',
          key: 'TERMINAL_ADDR',
          width: 120
        }, {
          title: '终端厂商',
          key: 'FACTORY_NAME',
          width: 120
        }, {
          title: '表计资产号',
          key: 'ASSET_NO',
          width: 120
        }, {
          title: '抄表段号',
          key: 'MR_SECT_NO',
          width: 120
        }, {
          title: '告警来源',
          key: 'ALARM_SRC',
          width: 120
        }, {
          title: '上级单位',
          key: 'P_ORG_NAME',
          width: 120
        }, {
          title: '所属地区',
          key: 'AREA_ORG_NAME',
          width: 120
        }, {
          title: '用电地址',
          key: 'ELEC_ADDR',
          width: 120
        }, {
          title: '台区名称',
          key: 'TG_NAME',
          width: 120
        }
      ],
      tableData: [{
        rownumberer: 1
      }, {
        rownumberer: 2
      }, {
        rownumberer: 3
      }, {
        rownumberer: 3
      }, {
        rownumberer: 3
      }, {
        rownumberer: 3
      }, {
        rownumberer: 3
      }, {
        rownumberer: 3
      }, {
        rownumberer: 3
      }, {
        rownumberer: 3
      }, {
        rownumberer: 3
      }, {
        rownumberer: 3
      }, {
        rownumberer: 3
      }, {
        rownumberer: 3
      }, {
        rownumberer: 3
      }
      ],
      current: 1,
      total: 5,
      pageSizeOpts: [2, 5, 20, 30, 40, 50],
      pageSize: 2,
      bottomTools: ['page', 'export'],
      consTypeList: [],
      excepTypeList: [],
      orgList: [],
      eventLevelList: [],
      eventStatusList: [],
      form: {
        orgNo: '',
        eventLevel: '',
        eventStatus: '',
        consNo: '',
        terminalAddr: '',
        assetNo: '',
        constype: '',
        queryDate: '',
        isQryByDate: false,
        alarmType: ''
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      this.total = this.tableData.length
      this.nowData = []
      for (let i = 0; i < this.pageSize; i++) {
        this.nowData.push(this.tableData[i])
      }
    },
    pageChange (current, pageSize) {
      this.current = current
      this.pageSize = pageSize
      let _start = (current - 1) * this.pageSize
      let _end = current * this.pageSize
      this.nowData = this.tableData.slice(_start, _end)
    }
  }
}
</script>

<style lang="less">
  .assessment-unit-composition .ivu-form .ivu-select, .assessment-unit-composition .ivu-form .ivu-date-picker{
    width: 80%;
  }
  .assessment-unit-composition .ivu-form .ivu-form-item-content>.ivu-input-wrapper{
    width: 80%;
  }
  .assessment-unit-composition .title{
    width: 100%;
    height: 7%;
    font-size: 160%;
    line-height: 160%;
    vertical-align:center;
    background-color: #f7f7f7;
  }
  .assessment-unit-composition .ivu-card .ivu-input-wrapper{
    width: 7%;
  }
  .assessment-unit-composition .ivu-card .ivu-input-wrapper .ivu-input{
    text-align:center;
  }
  .assessment-unit-composition .ivu-table th, .assessment-unit-composition .ivu-table td{
    height: 30px;
    text-align: center;
  }
  .assessment-unit-composition .ivu-card-body{
    position: relative
  }
  .assessment-unit-composition .ivu-poptip{
    position: absolute;
    bottom: 16px;
    right: 80px;
    z-index: 999;
  }
</style>
