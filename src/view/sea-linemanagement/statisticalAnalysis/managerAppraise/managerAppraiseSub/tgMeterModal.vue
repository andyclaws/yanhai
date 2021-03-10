<template>
  <div class="tgMeterModal">
    <Form ref="searchBarForms" :model="searchTgMeterBarForms" :label-width="100">
      <Row>
        <Col span="5">
          <FormItem label="台区编号">
            <Input v-model="searchTgMeterBarForms.tgNo" placeholder="请输入台区编号" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="台区名称">
            <Input v-model="searchTgMeterBarForms.tgName" placeholder="请输入台区名称" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5" >
          <FormItem label="用户编号" >
            <Input v-model="searchTgMeterBarForms.consNo" placeholder="请输入用户名称" clearable></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <Button type="primary"  @click="queryTgMeterModal">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <tables ref="tables"
            :height="tableHeight - 50"
            editable
            :columns="columns"
            :filename="'管辖台区电表明细'"
            :axiosUrl="axiosUrl"
            :axiosData="queryData"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
import axios from 'axios'
export default {
  name: 'tgMeterModal',
  components: {
    Tables,
    axios
  },
  props: ['queryData', 'axiosUrl'],
  data () {
    return {
      tableData: [],
      searchTgMeterBarForms: {
        tgName: '',
        tgNo: '',
        consNo: ''
      },
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
          title: '电表倍率',
          width: 120,
          sortable: true,
          key: 'tfactory'
        },
        {
          title: '正向有功起码',
          sortable: true,
          width: 120,
          key: 'papRS'
        },
        {
          title: '正向有功止码',
          sortable: true,
          width: 120,
          key: 'papRE'
        },
        {
          title: '正向有功电量',
          sortable: true,
          width: 120,
          key: 'rapS'
        },
        {
          title: '反向有功起码',
          sortable: true,
          width: 120,
          key: 'rapRS'
        },
        {
          title: '反向有功止码',
          sortable: true,
          width: 120,
          key: 'rapRE'
        },
        {
          title: '反向有功电量',
          sortable: true,
          width: 120,
          key: 'rapE'
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
    queryTgMeterModal () {
      this.queryData.tgNo = this.searchTgMeterBarForms.tgNo
      this.queryData.tgName = this.searchTgMeterBarForms.tgName
      this.queryData.consNo = this.searchTgMeterBarForms.consNo
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
