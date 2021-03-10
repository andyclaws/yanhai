<!--弹窗含有子明细弹窗-->
<template>
  <div class="windowWithChildWindow">
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
        <Col span="5" v-if="this.title === 'tgAllNumDetail' || this.title === 'operationTgDetail' || this.title === 'dismantleTgDetail' || this.title === 'offStreamTgDetail'">
          <FormItem label="台区状态">
          <Select  style="width:200px" v-model="searchBarForms.tgStatus"   @on-change="selectList"  >
            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </FormItem>
        </Col>
        <Col span="5" v-if="this.title === 'noCalculateTgDetail' ||  this.title === 'highLossTgDetail' || this.title === 'minusLossTgDetail' || this.title === 'normalTgDetail'">
          <FormItem label="台区线损状态">
            <Select  style="width:200px" v-model="searchBarForms.tgStatus"   @on-change="selectList"  >
              <Option v-for="item in list2" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
          <Button type="primary"  @click="query">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Tables border ref="tables" :filename="'台区信息'" :height="tableHeight - 50" :columns="columns" :axiosUrl="axiosUrl" :axiosData="axiosData" class="table"/>
    <Modals v-model="show_sonTables" :zIndex="11000" :width="boxWidth < 1100 ? '950px' : boxWidth * 0.85 + 'px'"
            draggable @on-cancel="show_sonTables = false" title="台区电量下钻明细" footer-hide>
      <sonTables ref="sonTable" :height="tableHeight - 20" :axiosUrl="sonAxiosUrl" :axiosData="sonAxiosData" @cancel="show_sonTables = false"/>
    </Modals>
  </div>
</template>

<script>
import Tables from '_c/tables'
import Modals from '_c/modals'
import sonTables from './son_tables.vue'
export default {
  props: ['axiosUrl', 'axiosData', 'title', 'pTgStatus'],
  components: {
    Modals,
    sonTables,
    Tables
  },
  data () {
    let boxWidth = window.innerWidth
    return {
      tableHeight: 500,
      boxWidth: boxWidth,
      sonAxiosUrl: '',
      sonAxiosData: {},
      list: [
        {
          value: '-1',
          label: '全部'
        },
        {
          value: '1',
          label: '运行'
        },
        {
          value: '2',
          label: '停运'
        },
        {
          value: '3',
          label: '拆除'
        }
      ],
      list2: [
        {
          value: '2',
          label: '负损'
        },
        {
          value: '1',
          label: '高损'
        },
        {
          value: '3',
          label: '不可算'
        },
        {
          value: '4',
          label: '合格'
        }
      ],
      ruleValidate: {
        tgNo: [
          { required: true, message: '台区编号不能为空', trigger: 'blur' }
        ],
        tgName: [
          { required: true, message: '台区名称不能为空', trigger: 'blur' }
        ]
      },
      searchBarForms: {
        tgName: '',
        tgNo: '',
        tgStatus: ''
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
      ],
      // 子页面弹窗默认隐藏
      show_sonTables: false
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
    query () {
      this.axiosData.tgNo = this.searchBarForms.tgNo
      this.axiosData.tgName = this.searchBarForms.tgName
      this.axiosData.tgStatus = this.searchBarForms.tgStatus
      console.log(this.searchBarForms)
      console.log(this.axiosData)
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
    },
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 300 : 500
    },
    selectList (value) {
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
  },
  watch: {
    pTgStatus (val) {
      this.searchBarForms.tgStatus = val
    }
  }
}
</script>

<style lang="less" scoped>
.windowWithChildWindow .ivu-table-header th {
  color: #448c86;
}
.ivu-row{
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>
