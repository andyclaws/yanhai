<template>
  <div class="tableRight"
       style="width:100%;height:100%;">
    <RadioGroup type="button"
                v-model="showRightTableApiTail"
                size="large">
      <Radio label="lineLossTrendAnalysis">线损趋势</Radio>
      <Radio label="continueAnalysis">持续分析</Radio>
      <Radio label="addupAnalysis">累计分析</Radio>
    </RadioGroup>
    <div>
      <Tables border
              ref="tables"
              :bottomTools="bottomTools"
              :columns="publicColumns"
              :axiosUrl="axiosUrl"
              :axiosData="axiosData"
              class="table" />
      <Modals v-model="show_sonTable" @on-cancel="show_sonTable = false" title="台区明细" width='65' footer-hide>
        <sonTables ref="sonTable" :axiosUrl="sonAxiosUrl" :axiosData="sonAxiosData" @cancel="show_sonTable = false"/>
      </Modals>
    </div>
  </div>
</template>

<script>
import Tables from '_c/tables'
import sonTables from './son_tables'
import Modals from '_c/modals'
export default {
  name: 'tableRight',
  props: ['axiosUrl', 'axiosData', 'refreshDataTrigger'],
  components: {
    Tables, sonTables, Modals
  },
  data () {
    return {
      bottomTools: ['export'],
      showRightTableApiTail: '',
      lineLossQueryType: '高损',
      queryDay: '3',
      sonAxiosUrl: '',
      sonAxiosData: {},
      show_sonTable: false,
      publicColumns: [
        {
          title: '',
          key: '',
          width: 0
        }
      ],
      trendColumns: [
        {
          title: '日期',
          key: 'date',
          width: 95
        }, {
          title: '供电量 (kWh)',
          key: 'ppq',
          width: 75
        }, {
          title: '售电量 (kWh)',
          key: 'spq',
          width: 75
        }, {
          title: '线损率(%)',
          key: 'lllr',
          width: 70
        }
      ],
      continuouslyAnalysisColumns: [
        {
          title: '单位',
          key: 'orgName',
          width: 50
        }, {
          title: '持续天数',
          key: 'continueDay',
          width: 75
        }, {
          title: '高损',
          key: 'highLoss',
          width: 60
        }, {
          title: '台区数',
          key: 'tgNum',
          width: 60,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  href: '#',
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.queryBottomTable(params, 'continueAnalysisTg')
                  }
                }
              }, params.row.tgNum)
            ])
          }
        }, {
          title: '时间区间',
          key: 'dateRegion',
          width: 75
        }
      ],
      continuouslyAnalysisColumnsMonth: [
        {
          title: '单位',
          key: 'orgName',
          width: 50
        }, {
          title: '持续月数',
          key: 'continueDay',
          width: 75
        }, {
          title: '高损',
          key: 'highLoss',
          width: 60
        }, {
          title: '台区数',
          key: 'tgNum',
          width: 60,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  href: '#',
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.queryBottomTable(params, 'continueAnalysisTg')
                  }
                }
              }, params.row.tgNum)
            ])
          }
        }, {
          title: '时间区间',
          key: 'dateRegion',
          width: 75
        }
      ],
      cumulativeAnalysisColumns: [
        {
          title: '单位',
          key: 'orgName',
          width: 50
        }, {
          title: '累计天数',
          key: 'days',
          width: 75
        }, {
          title: '高损',
          key: 'highLoss',
          width: 60
        }, {
          title: '台区数',
          key: 'tgNum',
          width: 60,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  href: '#',
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.queryBottomTable(params, 'addUpAnalysisTg')
                  }
                }
              }, params.row.tgNum)
            ])
          }
        }, {
          title: '时间区间',
          key: 'dateRegion',
          width: 75
        }
      ],
      cumulativeAnalysisColumnsMonth: [
        {
          title: '单位',
          key: 'orgName',
          width: 50
        }, {
          title: '累计月数',
          key: 'days',
          width: 75
        }, {
          title: '高损',
          key: 'highLoss',
          width: 60
        }, {
          title: '台区数',
          key: 'tgNum',
          width: 60,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  href: '#',
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.queryBottomTable(params, 'addUpAnalysisTg')
                  }
                }
              }, params.row.tgNum)
            ])
          }
        }, {
          title: '时间区间',
          key: 'dateRegion',
          width: 75
        }
      ]
    }
  },
  methods: {
    // 持续和累计按钮和表格联动切换
    changeTableApiTail (showRightTableApiTail) {
      this.showRightTableApiTail = showRightTableApiTail
    },
    queryBottomTable (params, name) {
      this.show_sonTable = true
      this.sonAxiosUrl = '/sea-lineLose/custManagerAssess/trendAnalysis/' + name
      this.sonAxiosData = {}
      if (name.indexOf('continue') !== -1) {
        this.sonAxiosData = {
          'orgNo': params.row.orgNo,
          'custManager': params.row.custManager,
          'endDate': params.row.endDate,
          'startDate': params.row.startDate,
          'dateType': params.row.dateType,
          'anomalyLinelossAnalysisType': params.row.anomalyLinelossAnalysisType,
          'continueDay': params.row.continueDay,
          'startIndex': params.row.startIndex,
          'index': params.row.index,
          'ones': params.row.ones
        }
      } else {
        this.sonAxiosData = {
          'orgNo': params.row.orgNo,
          'custManager': params.row.custManager,
          'endDate': params.row.endDate,
          'startDate': params.row.startDate,
          'dateType': params.row.dateType,
          'anomalyLinelossAnalysisType': params.row.anomalyLinelossAnalysisType,
          'startIndex': params.row.startIndex,
          'index': params.row.index,
          'days': params.row.addUpDay
        }
      }
      this.$nextTick(() => {
        this.$refs['sonTable'].$refs.tables.queryTableData()
      })
    },
    // 高损负损等联动表头
    // TODO
    changeLineLossQueryType (lineLossQueryType) {
      if (lineLossQueryType === 1) {
        this.lineLossQueryType = '高损'
      }
      if (lineLossQueryType === 2) {
        this.lineLossQueryType = '负损'
      }
      if (lineLossQueryType === 3) {
        this.lineLossQueryType = '异常'
      }
      if (lineLossQueryType === 4) {
        this.lineLossQueryType = '合格'
      }
      if (lineLossQueryType === 5) {
        this.lineLossQueryType = '不可算'
      }
      this.continuouslyAnalysisColumns[2].title = this.lineLossQueryType
      this.cumulativeAnalysisColumns[2].title = this.lineLossQueryType
      this.$parent.rightTableQueryFunction(this.showRightTableApiTail)
    },

    changeLineLossDay (queryDay) {
      this.queryDay = queryDay
      this.$parent.rightTableQueryFunction(this.showRightTableApiTail)
    }
  },
  watch: {
    showRightTableApiTail () {
      if (this.showRightTableApiTail === 'lineLossTrendAnalysis') {
        this.publicColumns = this.trendColumns
      } else if (this.showRightTableApiTail === 'continueAnalysis') {
        this.publicColumns = this.axiosData.dateType === 'month'
          ? this.continuouslyAnalysisColumnsMonth : this.continuouslyAnalysisColumns
      } else if (this.showRightTableApiTail === 'addupAnalysis') {
        this.publicColumns = this.axiosData.dateType === 'month'
          ? this.cumulativeAnalysisColumnsMonth : this.cumulativeAnalysisColumns
      }
      this.$emit('show-right-table-api', this.showRightTableApiTail)
    },
    refreshDataTrigger () {
      this.showRightTableApiTail = 'lineLossTrendAnalysis'
    }
  }
}
</script>

<style lang="less">
.tableRight .ivu-table-header th {
  text-align: center;
  font-family: "Arial Negreta", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  color: #009999;
}
.tableRight td {
  text-align: center;
}
.tableRight .table2 tr td:nth-last-child(2),
.tableRight .table3 tr td:nth-last-child(2) {
  text-decoration: underline;
  color: #009999;
}

.tableRight .ivu-radio-wrapper-checked {
  background: inherit;
  background-color: rgba(252, 252, 252, 1);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 153, 153, 1);
  border-radius: 4px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.tableRight .ivu-poptip{
  display: none;
}
</style>
