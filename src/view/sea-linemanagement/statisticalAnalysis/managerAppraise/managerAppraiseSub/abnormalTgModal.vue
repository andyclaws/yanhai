<template>
  <div class="abnormalTgModal">
    <Form ref="searchBarForms" :model="searchAbnormalBarForms" :label-width="100">
      <Row>
        <Col span="5">
          <FormItem label="台区编号">
            <Input v-model="searchAbnormalBarForms.tgNo" placeholder="请输入台区编号" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="台区名称">
            <Input v-model="searchAbnormalBarForms.tgName" placeholder="请输入台区名称" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5" >
          <FormItem label="台区状态" >
            <Select  style="width:200px"  v-model="searchAbnormalBarForms.tgStatus" >
              <Option v-for="item in tgStatusList" :value="item.tgStatus" :key="item.tgStatus">{{ item.tgStatusName }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <Button type="primary"  @click="queryAbnormalModal">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <tables ref="tables"
            :height="tableHeight - 50"
            editable
            :columns="columns"
            :axiosUrl="axiosUrl"
            :filename="'台区治理明细'"
            :axiosData="queryData"/>
    <Modal
      v-model="ppqDetail"
      draggable
      :zIndex="11000"
      title="台区电量下钻明细"
      :width="boxWidth < 1100 ? '950px' : boxWidth * 0.85 + 'px'"
      footer-hide>
        <ppqDetail ref="queryPpqDetail" :axiosData="childData" :axiosUrl="childUrl"  :tgNo="tgNo"></ppqDetail>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import ppqDetail from './ppqDetail.vue'
import spqDetail from './spqDetail.vue'
import axios from '@/libs/api.request'
export default {
  name: 'tgModal',
  components: {
    Tables,
    ppqDetail,
    spqDetail,
    axios
  },
  props: ['axiosUrl', 'queryData'],
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      childData: {
        date: '',
        custManagerName: ''
      }, // 传递到子组件的查询参数
      childUrl: '',
      tableData: [],
      ppqDetail: false,
      spqDetail: false,
      ppqDetailData: [],
      spqDetailData: [],
      ppqTotalCount: 0,
      spqTotalCount: 0,
      tgNo: '',
      searchAbnormalBarForms: {
        tgName: '',
        tgNo: '',
        tgStatus: ''
      },
      tgStatusList: [
        { tgStatus: '-1', tgStatusName: '全部' },
        { tgStatus: '01', tgStatusName: '运行' },
        { tgStatus: '02', tgStatusName: '停运' },
        { tgStatus: '03', tgStatusName: '拆除' }
      ],
      columns: [
        {
          title: '台区管理单位',
          width: 120,
          sortable: true,
          key: 'orgName'
        },
        {
          title: '台区名称',
          width: 120,
          sortable: true,
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
          width: 120,
          sortable: true,
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
          width: 120,
          sortable: true,
          key: 'isCoverTg'
        },
        {
          title: '台区容量',
          sortable: true,
          width: 120,
          key: 'tgCap'
        },
        {
          title: '台区供电量',
          width: 120,
          sortable: true,
          key: 'ppq',
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
                    this.showChildWindow('queryPpqDetail', params.row.dataDate, params.row.tgId, params.row.dateType)
                  }
                }
              }, params.row.ppq)
            ])
          }
        },
        {
          title: '台区售电量',
          width: 120,
          key: 'spq',
          sortable: true,
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
                    this.showChildWindow('querySpqDetail', params.row.dataDate, params.row.tgId, params.row.dateType)
                  }
                }
              }, params.row.spq)
            ])
          }
        },
        {
          title: '0.4kv线损率',
          width: 120,
          sortable: true,
          key: 'lllr'
        },
        {
          title: '采集成功率',
          sortable: true,
          width: 120,
          key: 'readSuccNum'
        },
        {
          title: '采集覆盖率',
          sortable: true,
          width: 120,
          key: 'metCoverRate'
        },
        {
          title: '是否已治理',
          sortable: true,
          width: 120,
          key: 'isElimination'
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
  watch: {
  },
  methods: {
    showChildWindow (apiType, rowDate, tgId, dateType) {
      this.childData = {
        'date': rowDate,
        'dateType': dateType,
        'tgId': tgId
      }
      this.childUrl = '/sea-lineLose/custManagerAssess/' + apiType
      this.$nextTick(() => {
        this.$refs['queryPpqDetail'].$refs.tables.queryTableData()
      })
      this.ppqDetail = true
    },
    queryAbnormalModal () {
      this.queryData.tgNo = this.searchAbnormalBarForms.tgNo
      this.queryData.tgName = this.searchAbnormalBarForms.tgName
      this.queryData.tgStatus = this.searchAbnormalBarForms.tgStatus
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
<style lang="less">

</style>
