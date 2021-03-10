<!--换表台区数弹表-->
<template>
  <div class="windowExchangeTableTgDetail">
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
        <!--<Col span="5">
          <FormItem label="台区状态">
          <Select  style="width:200px"   @on-change="selectList"  >
            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </FormItem>
        </Col>-->
        <Col span="4">
          <FormItem>
            <Button type="primary"  @click="query">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Tables border ref="tables" :height="tableHeight - 90" :filename="'换表台区信息'" :columns="columns" :axiosUrl="axiosUrl" :axiosData="axiosData" class="table"/>
    <span class="title" slot="title">换表明细</span>
    <Tables border ref="bottom_meter_change_table" height=150 :columns="bottom_meter_change_table_columns" :axiosUrl="bottomAxiosUrl" :axiosData="bottomAxiosData" class="table"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  props: ['axiosUrl', 'axiosData'],
  name: 'windowExchangeTableTgDetail',
  components: {
    Tables
  },
  data () {
    return {
      tableHeight: 500,
      bottomAxiosUrl: '',
      bottomAxiosData: {},
      searchBarForms: {
        tgName: '',
        tgNo: ''
      },
      // 表1头
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
          title: '台区ID',
          key: 'tgId',
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
          width: 150
        }, {
          title: '台区售电量',
          key: 'tgSpq',
          sortable: true,
          width: 150
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
          title: '换表数量',
          key: 'exchangeTableNums',
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
                style: {
                },
                on: {
                  click: () => {
                    this.queryBottomTable(params.row.tgId, params.row.dataDate, params.row.dateType)
                  }
                }
              }, params.row.exchangeTableNums)
            ])
          }
        }, {
          title: '数据日期',
          key: 'dataDate',
          sortable: true,
          width: 150
        }
      ],
      // 表2头，换表明细表头
      bottom_meter_change_table_columns: [
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
          title: '台区ID',
          key: 'tgId',
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
          title: '用户名称',
          key: 'consName',
          sortable: true,
          width: 150
        }, {
          title: '用户编号',
          key: 'consNo',
          sortable: true,
          width: 150
        }, {
          title: '用户类型',
          key: 'consType',
          sortable: true,
          width: 150
        }, {
          title: '老表条形码',
          key: 'oldTableBarCode',
          sortable: true,
          width: 150
        }, {
          title: '老表资产号',
          key: 'oldTableassetNo',
          sortable: true,
          width: 150
        }, {
          title: '老表止码',
          key: 'oldTableEndCode',
          sortable: true,
          width: 150
        }, {
          title: '新表条形码',
          key: 'newTableBarCode',
          sortable: true,
          width: 150
        }, {
          title: '新表资产号',
          key: 'newTableassetNo',
          sortable: true,
          width: 150
        }, {
          title: '新表起码',
          key: 'newTableStartCode',
          sortable: true,
          width: 150
        }, {
          title: '换表日期',
          key: 'exchangeTableDate',
          sortable: true,
          width: 150
        }
      ]
    }
  },
  methods: {
    // 明细表展示数据
    queryBottomTable (tgId, dataDate, dateType) {
      this.bottomAxiosUrl = '/sea-lineLose/unitControl/exchangeTableDetail'
      this.bottomAxiosData = {
        'statDate': dataDate,
        'dateType': dateType,
        'tgId': tgId
      }
      this.$nextTick(() => {
        this.$refs['bottom_meter_change_table'].queryTableData()
      })
    },
    query () {
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
.windowExchangeTableTgDetail .ivu-table-header th {
  color: #448c86;
}
.ivu-row{
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>
