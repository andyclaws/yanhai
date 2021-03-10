<template>
  <div class="terminalCntModal">
    <Form ref="searchBarForms" :model="searchTerminalBarForms" :label-width="100">
      <Row>
        <Col span="5">
          <FormItem label="终端地址">
            <Input v-model="searchTerminalBarForms.terminalAddr" placeholder="请输入终端地址" clearable></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <Button type="primary"  @click="queryTermianlDetail">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <tables ref="tables"
            :height="tableHeight - 50"
            editable
            :columns="columns"
            :filename="'终端明细'"
            :axiosUrl="axiosUrl"
            :axiosData="queryData"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
import axios from 'axios'
export default {
  name: 'terminalCntModal',
  components: {
    Tables,
    axios
  },
  props: ['queryData', 'axiosUrl'],
  data () {
    return {
      tableData: [],
      searchTerminalBarForms: {
        terminalAddr: ''
      },
      terminalAddr: '',
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
          width: 120,
          sortable: true,
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
          title: '终端地址',
          sortable: true,
          width: 120,
          key: 'tmnlAddr'
        },
        {
          title: '终端厂家',
          sortable: true,
          width: 120,
          key: 'tmnlFactoryName'
        },
        {
          title: '终端规约',
          sortable: true,
          width: 120,
          key: 'tmnlProtocolName'
        },
        {
          title: '终端类型',
          sortable: true,
          width: 120,
          key: 'tmnlType'
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
    queryTermianlDetail () {
      this.queryData.terminalAddr = this.searchTerminalBarForms.terminalAddr
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
