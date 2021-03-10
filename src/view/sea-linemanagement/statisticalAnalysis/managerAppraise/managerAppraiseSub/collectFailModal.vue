<template>
  <div class="collectFailModal">
    <Form ref="searchBarForms" :model="searchCollectFBarForms" :label-width="100">
      <Row>
        <Col span="5">
          <FormItem label="台区编号">
            <Input v-model="searchCollectFBarForms.tgNo" placeholder="请输入台区编号" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="台区名称">
            <Input v-model="searchCollectFBarForms.tgName" placeholder="请输入台区名称" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5" >
          <FormItem label="用户编号" >
            <Input v-model="searchCollectFBarForms.consNo" placeholder="请输入用户名称" clearable></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <Button type="primary"  @click="queryCollectFModal">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <tables ref="tables"
            :height="tableHeight - 50"
            editable
            :columns="columns"
            :filename="'电量计算失败明细'"
            :axiosUrl="axiosUrl"
            :axiosData="queryData"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
export default {
  name: 'collectFailModal',
  components: {
    Tables,
    axios
  },
  props: ['axiosUrl', 'queryData'],
  data () {
    return {
      tableData: [],
      searchCollectFBarForms: {
        tgName: '',
        tgNo: '',
        consNo: ''
      },
      columns: [
        {
          title: '台区管理单位',
          width: 120,
          sortable: true,
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
          title: '电表起码（正向）',
          sortable: true,
          width: 120,
          key: 'papRS'
        },
        {
          title: '电表止码（正向）',
          sortable: true,
          width: 120,
          key: 'papRE'
        },
        {
          title: '电表电量（正向）',
          sortable: true,
          width: 120,
          key: 'papE'
        },
        {
          title: '电表起码（反向）',
          sortable: true,
          width: 120,
          key: 'rapRS'
        },

        {
          title: '电表止码（反向）',
          sortable: true,
          width: 120,
          key: 'rapRE'
        },
        {
          title: '电表电量（反向）',
          sortable: true,
          width: 120,
          key: 'rapE'
        },
        {
          title: '电表倍率',
          sortable: true,
          width: 120,
          key: 'tfactor'
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
    queryCollectFModal () {
      this.queryData.tgNo = this.searchCollectFBarForms.tgNo
      this.queryData.tgName = this.searchCollectFBarForms.tgName
      this.queryData.consNo = this.searchCollectFBarForms.consNo
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
