<!--台区在线监测率明细-->
<template>
  <div class="windowOnlineTgRateDetail">
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
          <FormItem label="监测状态">
          <Select  style="width:200px"  v-model="searchBarForms.jcStatus"   >
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
    <Tables border ref="tables" :filename="'台区在线监测信息'" :height="tableHeight - 50" :columns="columns" :axiosUrl="axiosUrl" :axiosData="axiosData" class="table"/>
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
        jcStatus: ''
      },
      list: [
        {
          value: '11',
          label: '成功'
        },
        {
          value: '22',
          label: '失败'
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
        },
        /* {
          title: '在线监测率',
          key: 'tgOnlineMoniterRate',
          width: 150
        }, */
        {
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
      this.axiosData.jcStatus = this.searchBarForms.jcStatus
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
 .windowOnlineTgRateDetail .ivu-table-header th {
  color: #448c86;
}
 .ivu-row{
   height: 40px;
   line-height: 40px;
   margin-bottom: 10px;
 }
</style>
