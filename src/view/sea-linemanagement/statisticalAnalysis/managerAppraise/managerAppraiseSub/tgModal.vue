<template>
  <div class="tgModal">
    <Form ref="searchBarForms" :model="searchTgModalBarForms" :label-width="100">
      <Row>
        <Col span="5">
          <FormItem label="台区编号">
            <Input v-model="searchTgModalBarForms.tgNo" placeholder="请输入台区编号" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="台区名称">
            <Input v-model="searchTgModalBarForms.tgName" placeholder="请输入台区名称" clearable></Input>
          </FormItem>
        </Col>
        <Col v-if="this.title === 'queryStopTgDetailAll'" span="5" v-show="true">
          <FormItem label="台区状态" >
          <Select  style="width:200px"  v-model="searchTgModalBarForms.tgStatus" >
            <Option v-for="item in tgStatusList" :value="item.tgStatus" :key="item.tgStatus">{{ item.tgStatusName }}</Option>
          </Select>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <Button type="primary"  @click="queryTgModal">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <tables ref="tables"
            :height="tableHeight - 50"
            editable
            :columns="columns"
            :filename="'台区明细'"
            :axiosUrl="axiosUrl"
            :axiosData="queryData"/>
    <Modal
      v-model="ppqDetail"
      title="台区电量下钻明细"
      draggable
      :zIndex="11000"
      :width="boxWidth < 1100 ? '950px' : boxWidth * 0.85 + 'px'"
      footer-hide>
        <ppqDetail ref="queryPpqDetail" :axiosData="childData" :axiosUrl="childUrl" :ppqTgStatus="ppqTgStatus" :tgNo="tgNo"></ppqDetail>
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
  props: ['axiosUrl', 'queryData', 'title'],
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      childData: {
        date: '',
        custManagerName: ''
      }, // 传递到子组件的查询参数
      searchTgModalBarForms: {
        tgName: '',
        tgNo: '',
        tgStatus: ''
      },
      childUrl: '',
      upTableData: [],
      ppqDetail: false,
      spqDetail: false,
      ppqDetailData: [],
      spqDetailData: [],
      ppqTotalCount: 0,
      spqTotalCount: 0,
      ppqTgStatus: '',
      spqTgStatus: '',
      tgNo: '',
      tgStatusList: [
        { tgStatus: '-1', tgStatusName: '全部' },
        { tgStatus: '01', tgStatusName: '运行' },
        { tgStatus: '02', tgStatusName: '停运' },
        { tgStatus: '03', tgStatusName: '拆除' }
      ],
      columns: [
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
          sortable: true,
          width: 120,
          key: 'ppq',
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
                    this.showChildWindow('queryPpqDetail', params.row.dataDate, params.row.tgId, params.row.dateType)
                  }
                }
              }, params.row.ppq)
            ])
          }
        },
        {
          title: '台区售电量',
          sortable: true,
          width: 120,
          key: 'spq',
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
          sortable: true,
          width: 120,
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
    queryTgModal () {
      this.queryData.tgNo = this.searchTgModalBarForms.tgNo
      this.queryData.tgName = this.searchTgModalBarForms.tgName
      this.queryData.tgStatus = this.searchTgModalBarForms.tgStatus
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
