<!--分布式电源台区数-->
<template>
  <div class="windowDistributedGenerationTg">
    <Form ref="searchBarForms" :model="searchBarForms" :label-width="100">
      <Row>
        <Col span="5">
          <FormItem label="台区编号">
            <Input v-model="searchBarForms.tgNo" placeholder="请输入台区编号" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="台区名称">
            <Input v-model="searchBarForms.tgName" placeholder="请输入台区名称" clearable></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <Button type="primary"  @click="querys">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Tables border ref="tables" :filename="'分布式电源台区信息'" :columns="columns" :axiosUrl="axiosUrl" :axiosData="axiosData" class="table"/>
    <Modals v-model="show_sonTables" :zIndex="11000" draggable @on-cancel="show_sonTables = false" title="台区电量下钻明细" width='1300px' footer-hide>
      <sonTables ref="sonTable" :height="tableHeight - 50" :axiosUrl="sonAxiosUrl" :axiosData="sonAxiosData" @cancel="show_sonTables = false"/>
    </Modals>
  </div>
</template>

<script>
import Modals from '_c/modals'
import sonTables from './son_tables.vue'
import Tables from '_c/tables'
export default {
  props: ['axiosUrl', 'axiosData'],
  components: {
    Modals,
    sonTables,
    Tables
  },
  data () {
    return {
      tableHeight: 500,
      show_sonTables: false,
      sonAxiosUrl: '',
      sonAxiosData: {},
      searchBarForms: {
        tgName: '',
        tgNo: ''
      },
      // 表头
      columns: [
        {
          title: '台区管理单位',
          key: 'orgName',
          sortable: true,
          width: 150
        }, {
          title: '台区名称',
          key: 'tgName',
          sortable: true,
          width: 150
        }, {
          title: '台区编号',
          key: 'tgNo',
          sortable: true,
          width: 150
        }, {
          title: '考核单元名称',
          key: 'checkUnitName',
          sortable: true,
          width: 150
        }, {
          title: '台区经理',
          key: 'customerManager',
          sortable: true,
          width: 150
        }, {
          title: '分布式电源用户数',
          key: 'distributedPowerConsNums',
          sortable: true,
          width: 150
        }, {
          title: '台区状态',
          key: 'tgStatus',
          sortable: true,
          width: 150
        }, {
          title: '台区覆盖',
          key: 'tgCoverage',
          sortable: true,
          width: 150
        }, {
          title: '台区容量',
          key: 'tgCapacity',
          sortable: true,
          width: 150
        }, {
          title: '台区供电量',
          key: 'tgPpq',
          sortable: true,
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  href: '#',
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showChildWindow('ppqDetail', params.row.tgId, params.row.dataDate, params.row.dateType)
                  }
                }
              }, params.row.tgPpq)
            ])
          }
        }, {
          title: '台区售电量',
          key: 'tgSpq',
          width: 150,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  href: '#',
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showChildWindow('spqDetail', params.row.tgId, params.row.dataDate, params.row.dateType)
                  }
                }
              }, params.row.tgSpq)
            ])
          }
        }, {
          title: '0.4kv线损率',
          key: 'tgLinelossRate',
          sortable: true,
          width: 150
        }, {
          title: '采集成功率',
          key: 'collectSuccessRate',
          sortable: true,
          width: 150
        }, {
          title: '采集覆盖率',
          key: 'collectCoverageRate',
          sortable: true,
          width: 150
        }, {
          title: '数据日期',
          key: 'dataDate',
          sortable: true,
          width: 150
        }
      ]
    }
  },
  methods: {
    showChildWindow (apiType, tgId, dataDate, dateType) {
      this.sonAxiosUrl = '/sea-lineLose/unitControl/' + apiType
      this.sonAxiosData = {
        'statDate': dataDate,
        'dateType': dateType,
        'tgId': tgId
      }
      this.$nextTick(() => {
        this.$refs['sonTable'].$refs.tables.queryTableData()
      })
      this.show_sonTables = true
    },
    querys () {
      this.axiosData.tgNo = this.searchBarForms.tgNo
      this.axiosData.tgName = this.searchBarForms.tgName
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
    },
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 300 : 500
    }
  },
  mounted () {
    this.searchBarForms.tgStatus = this.pTgStatus
    this.changeHeight()
    let that = this
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
  }
}

</script>

<style lang="less" scoped>
.windowDistributedGenerationTg .ivu-table-header th {
  color: #448c86;
}
.ivu-row{
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>
