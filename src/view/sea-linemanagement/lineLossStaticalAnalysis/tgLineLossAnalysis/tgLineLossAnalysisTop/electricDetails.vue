<template>
  <div class="electric-details">
    <h v-model="parentInfo"> {{parentInfo}}</h>
    <Card dis-hover :bordered="false">
      <Tables
        ref="tables"
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

  <!--<Input v-model="parentInfo"></Input>-->
</template>

<script>
import Tables from '_c/tables'
export default {
  components: {
    Tables
  },
  name: 'electricDetails',
  props: ['parentInfo'],
  data () {
    return {
      columns: [
        {
          title: '供电单位',
          key: 'rownumberer',
          width: 80
        }, {
          title: '台区名称',
          key: 'ORG_NAME',
          width: 120
        }, {
          title: '台区编号',
          key: 'EVENT_NAME',
          width: 120
        }, {
          title: '台区容量',
          key: 'ALARM_TYPE',
          width: 120
        }, {
          title: '运行状态',
          key: 'FLOW_FLAG_NAME',
          width: 120
        }, {
          title: '考核单元名称',
          key: 'EVENT_LEVEL',
          width: 120
        }, {
          title: '终端地址',
          key: 'TERMINAL_ADDR',
          width: 120
        }, {
          title: '日期',
          key: 'CONS_NAME',
          width: 120
        }, {
          title: '发电量(kWh)',
          key: 'GPQ_REAL',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.modal10 = true
                    this.parentInfo.topTitle = params.row.TERMINAL_ADDR
                  }
                }
              }, params.row.TERMINAL_ADDR)
            ])
          },
          align: 'center'
        }, {
          title: '供电量(kWh)',
          key: 'PPQ_REAL',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.modal10 = true
                    this.parentInfo.topTitle = params.row.TERMINAL_ADDR
                  }
                }
              }, params.row.TERMINAL_ADDR)
            ])
          },
          align: 'center'
        }, {
          title: '售电量(kWh)',
          key: 'SPQ_REAL',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.modal10 = true
                    this.parentInfo.topTitle = params.row.GPQ_REAL
                  }
                }
              }, params.row.GPQ_REAL)
            ])
          },
          align: 'center'
        }, {
          title: '自用电量(kWh)',
          key: 'FIRST_ALARM_DATE',
          width: 150
        }, {
          title: '告警发生次数',
          key: 'ALARM_CNT',
          width: 120
        }, {
          title: '损耗电量(kWh)',
          key: 'RESUME_DATE',
          width: 120
        }, {
          title: '线损率(%)',
          key: 'FIRST_RESUME_DATE',
          width: 150
        }, {
          title: '线损指标上限(%)',
          key: 'RESUME_DAY_CNT',
          width: 120
        }, {
          title: '线损指标下限(%)',
          key: 'lowIdx',
          width: 120
        }, {
          title: '差异值',
          key: 'FACTORY_NAME',
          width: 120
        }, {
          title: '理论线损',
          key: 'ASSET_NO',
          width: 120
        }, {
          title: '负责人',
          key: 'MR_SECT_NO',
          width: 120
        }, {
          title: '组合标志',
          key: 'ALARM_SRC',
          width: 120
        }, {
          title: '标记',
          key: 'P_ORG_NAME',
          width: 120
        }
      ],
      nowData: [],
      tableData: [],
      current: 1,
      total: 5,
      pageSizeOpts: [2, 5, 20, 30, 40, 50],
      pageSize: 2,
      bottomTools: ['page', 'export'],
      consTypeList: [],
      excepTypeList: [],
      orgList: [],
      eventLevelList: [],
      eventStatusList: []
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      this.tableData = []
      for (let i = 0; i < 25; i++) {
        let data = {
          id: i + 1,
          TERMINAL_ADDR: 56565,
          GPQ_REAL: '6626221',
          PPQ_REAL: '6626221'
        }
        this.tableData.push(data)
      }
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
  .electric-details .ivu-form .ivu-select, .electric-details .ivu-form .ivu-date-picker{
    width: 80%;
  }
  .electric-details .ivu-form .ivu-form-item-content>.ivu-input-wrapper{
    width: 80%;
  }
  .electric-details .title{
    width: 100%;
    height: 7%;
    font-size: 160%;
    line-height: 160%;
    vertical-align:center;
    background-color: #f7f7f7;
  }
  .electric-details .ivu-card .ivu-input-wrapper{
    width: 7%;
  }
  .electric-details .ivu-card .ivu-input-wrapper .ivu-input{
    text-align:center;
  }
  .electric-details .ivu-table th, .electric-details .ivu-table td{
    height: 30px;
    text-align: center;
  }
  .electric-details .ivu-card-body{
    position: relative
  }
  .electric-details .ivu-poptip{
    position: absolute;
    bottom: 16px;
    right: 80px;
    z-index: 999;
  }
</style>
