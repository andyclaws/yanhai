<!--示值采集成功率弹窗-->
<template>
  <div class="windowIndicationCollectSuccessRateDetail">
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
        <Col span="5">
          <FormItem label="用户编号">
            <Input v-model="searchBarForms.consNo" placeholder="请输入用户编号" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="用户名称">
            <Input v-model="searchBarForms.consName" placeholder="请输入用户名称" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="采集状态">
          <Select  style="width:200px"  v-model="searchBarForms.tgStatus"   >
            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
    <Tables border ref="tables" :filename="'台区电表信息'" :height="tableHeight - 50" :columns="columns" :axiosUrl="axiosUrl" :axiosData="axiosData" class="table"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  props: ['axiosUrl', 'axiosData'],
  components: {
    Tables
  },
  data () {
    return {
      tableHeight: 500,
      searchBarForms: {
        tgName: '',
        tgNo: '',
        consName: '',
        consNo: '',
        tgStatus: '2'
      },
      list: [
        {
          value: '1',
          label: '采集总数'
        },
        {
          value: '2',
          label: '采集失败'
        }
      ],
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
        },
        /* {
          title: '台区经理',
          key: 'customerManager',
          sortable: true,
          width: 150
        }, */
        {
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
          title: '电表条形码',
          key: 'electricBarCode',
          sortable: true,
          width: 150
        }, {
          title: '电表资产号',
          key: 'assetNo',
          sortable: true,
          width: 150
        }, {
          title: '电表倍率',
          key: 'electricPowerrate',
          sortable: true,
          width: 150
        }, {
          title: '正向有功止码',
          key: 'endCodeValueActivePostive',
          sortable: true,
          width: 150
        }, {
          title: '反向有功止码',
          key: 'endCodeValueActiveNegative',
          sortable: true,
          width: 150
        }, {
          title: '正向有功电量',
          key: 'electricValueActivePostive',
          sortable: true,
          width: 150
        }, {
          title: '反向有功电量',
          key: 'electricValueActiveNegative',
          sortable: true,
          width: 150
        }, {
          title: '正向有功起码',
          key: 'startCodeValueActivePostive',
          sortable: true,
          width: 150
        }, {
          title: '反向有功起码',
          key: 'startCodeValueActiveNegative',
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
    query () {
      this.axiosData.tgNo = this.searchBarForms.tgNo
      this.axiosData.tgName = this.searchBarForms.tgName
      this.axiosData.consNo = this.searchBarForms.consNo
      this.axiosData.consName = this.searchBarForms.consName
      this.axiosData.tgStatus = this.searchBarForms.tgStatus
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
.windowIndicationCollectSuccessRateDetail .ivu-table-header th {
  color: #448c86;
}
.ivu-row{
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>
