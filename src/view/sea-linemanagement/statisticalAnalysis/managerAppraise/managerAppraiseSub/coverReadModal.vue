<template>
  <div class="coverReadModal">
    <Form ref="searchBarForms" :model="searchCoverBarForms" :label-width="100">
      <Row>
        <Col span="5">
          <FormItem label="台区编号">
            <Input v-model="searchCoverBarForms.tgNo" placeholder="请输入台区编号" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="台区名称">
            <Input v-model="searchCoverBarForms.tgName" placeholder="请输入台区名称" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="是否覆盖">
            <Select  style="width:200px"  v-model="searchCoverBarForms.isCover" >
              <Option v-for="item in coverList" :value="item.isCover" :key="item.isCover">{{ item.isCoverName }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <Button type="primary"  @click="queryCoverDetail">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <tables ref="tables"
            :height="tableHeight - 50"
            editable
            :columns="columns"
            :filename="'采集覆盖明细'"
            :axiosUrl="axiosUrl"
            :axiosData="queryData"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
export default {
  name: 'coverReadModal',
  components: {
    Tables,
    axios
  },
  props: ['axiosUrl', 'queryData'],
  data () {
    return {
      tableData: [],
      searchCoverBarForms: {
        tgName: '',
        tgNo: '',
        isCover: ''
      },
      coverList: [
        { isCover: '-1', isCoverName: '全部' },
        { isCover: '2', isCoverName: '否' }
      ],
      tgName: '',
      tgNo: '',
      isCover: '',
      isCoverName: '',
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
          sortable: true,
          width: 120,
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
          sortable: true,
          width: 120,
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
          title: '电表是否覆盖',
          sortable: true,
          width: 120,
          key: 'isCover'
        },
        {
          title: '电表倍率',
          sortable: true,
          width: 120,
          key: 'tfactor'
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
    queryCoverDetail () {
      this.queryData.tgNo = this.searchCoverBarForms.tgNo
      this.queryData.tgName = this.searchCoverBarForms.tgName
      this.queryData.isCover = this.searchCoverBarForms.isCover
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
