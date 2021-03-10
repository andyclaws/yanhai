<template>
  <div class="fcGcTgDetail">
    <tables ref="tables"
            :height="tableHeight / 3 * 2 - 30"
            editable
            :columns="upTableColumns"
            :filename="'分布式电源台区明细'"
            :axiosUrl="axiosUrl"
            :axiosData="queryData"/>
    <div class="detailDiv"><span>分布式电源电表明细</span></div>
    <tables ref="downTableRef"
            editable
            :height="tableHeight / 3 - 20"
            :columns="downTable.downTableColumns"
            :filename="'分布式电源电表明细'"
            :axiosUrl="downTable.axiosUrlDown"
            :axiosData="axiosDataDown"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
export default {
  name: 'fcGcTgDetail',
  components: {
    Tables,
    axios
  },
  props: ['queryData', 'axiosUrl'],
  data () {
    return {
      axiosDataDown: {
        date: '',
        custManagerName: ''
      },
      upTableData: [],
      downTableData: [],
      downTable: {
        downTableColumns: [
          {
            title: '台区管理单位',
            sortable: true,
            width: 120,
            key: 'orgName'
          },
          {
            title: '台区名称',
            sortable: true,
            width: 120,
            key: 'tgName'
          },
          {
            title: '台区编号',
            sortable: true,
            width: 120,
            key: 'tgNo'
          },
          {
            title: '考核单元名称',
            sortable: true,
            width: 120,
            key: 'chkUintName'
          },
          {
            title: '台区经理',
            sortable: true,
            width: 120,
            key: 'custManagerName'
          },
          {
            title: '用户名称',
            sortable: true,
            width: 120,
            key: 'consName'
          },
          {
            title: '用户编号',
            sortable: true,
            width: 120,
            key: 'consNo'
          },
          {
            title: '用户类型',
            sortable: true,
            width: 120,
            key: 'consType'
          },
          {
            title: '电表条形码',
            sortable: true,
            width: 120,
            key: 'barCode'
          },
          {
            title: '电表资产号',
            sortable: true,
            width: 120,
            key: 'assetNo'
          },
          {
            title: '电表起码',
            sortable: true,
            width: 120,
            key: 'papRS'
          },
          {
            title: '反向电表起码',
            sortable: true,
            width: 120,
            key: 'rapRS'
          },
          {
            title: '电表止码',
            sortable: true,
            width: 120,
            key: 'papRE'
          },
          {
            title: '反向电表止码',
            sortable: true,
            width: 120,
            key: 'rapRE'
          },
          {
            title: '电表倍率',
            sortable: true,
            width: 120,
            key: 'tfactor'
          },
          {
            title: '电表电量',
            sortable: true,
            width: 120,
            key: 'papE'
          }, {
            title: '数据时间',
            sortable: true,
            width: 130,
            key: 'dataDate'
          }
        ],
        axiosUrlDown: ''
      },
      upTableColumns: [
        {
          title: '台区管理单位',
          sortable: true,
          width: 120,
          key: 'orgName'
        },
        {
          title: '台区名称',
          sortable: true,
          width: 120,
          key: 'tgName'
        },
        {
          title: '台区编号',
          sortable: true,
          width: 120,
          key: 'tgNo'
        },
        {
          title: '考核单元名称',
          sortable: true,
          width: 120,
          key: 'chkUintName'
        },
        {
          title: '台区经理',
          sortable: true,
          width: 120,
          key: 'custManagerName'
        },
        {
          title: '台区状态',
          width: 120,
          sortable: true,
          key: 'tgStatus'
        },
        {
          title: '台区覆盖',
          sortable: true,
          width: 120,
          key: 'isCoverTg'
        },
        {
          title: '台区容量',
          width: 120,
          sortable: true,
          key: 'tgCap'
        },
        {
          title: '台区供电量',
          sortable: true,
          width: 120,
          key: 'ppq'
        },
        {
          title: '台区售电量',
          sortable: true,
          width: 120,
          key: 'spq'
        },
        {
          title: '0.4kv线损率',
          sortable: true,
          width: 120,
          key: 'lllr'
        },
        {
          title: '采集成功率',
          width: 120,
          sortable: true,
          key: 'readSuccNum'
        },
        {
          title: '采集覆盖率',
          sortable: true,
          width: 120,
          key: 'metCoverRate'
        },
        {
          title: '分布式电源表数',
          sortable: true,
          width: 130,
          key: 'gcMetNum',
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
                    this.axiosDataDown = {
                      'date': params.row.dataDate,
                      'dateType': params.row.dateType,
                      'tgId': params.row.tgId
                    }
                    this.downTable.axiosUrlDown = '/sea-lineLose/custManagerAssess/queryFcGcMetNumDetail'
                    this.$nextTick(() => {
                      this.$refs.downTableRef.queryTableData()
                    })
                  }
                }
              }, params.row.gcMetNum)
            ])
          }
        }, {
          title: '数据时间',
          sortable: true,
          width: 130,
          key: 'dataDate'
        }
      ],
      tableHeight: 500
    }
  },
  methods: {
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
<style lang="less">

</style>
