<!--采集覆盖明细-->
<template>
  <div class="windowCollectCoverRateDetail">
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
        <Col span="5" v-if="this.title === 'collectAllNumDetail' ||  this.title === 'collectCoverageNumDetail' || this.title === 'collectCoverageRateDetail'">
          <FormItem label="采集覆盖状态">
          <Select  style="width:200px" v-model="searchBarForms.cjStatus"   >
            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </FormItem>
        </Col>
        <Col span="5" v-if="this.title === 'feeControlAllNumDetail' ||  this.title === 'feeControlSuccessNumDetail' || this.title === 'feeControlSuccessRateDetail'">
          <FormItem label="费控状态">
            <Select  style="width:200px" v-model="searchBarForms.fkStatus"   >
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
    <Tables border ref="tables" :height="tableHeight - 50" :filename="'台区电表信息'" v-if="this.title === 'feeControlAllNumDetail' ||  this.title === 'feeControlSuccessNumDetail' || this.title === 'feeControlSuccessRateDetail'" :columns="columns2" :axiosUrl="axiosUrl" :axiosData="axiosData" class="table"/>
    <Tables border ref="tables" :height="tableHeight - 50" :filename="'台区电表信息'" v-if="this.title === 'collectAllNumDetail' ||  this.title === 'collectCoverageNumDetail' || this.title === 'collectCoverageRateDetail'" :columns="columns" :axiosUrl="axiosUrl" :axiosData="axiosData" class="table"/>

  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  props: ['axiosUrl', 'axiosData', 'title'],
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
        fkStatus: '',
        cjStatus: ''
      },
      list: [
        {
          value: '1',
          label: '未覆盖电表数'
        },
        {
          value: '2',
          label: '总电表数'
        }
      ],
      list2: [
        {
          value: '1',
          label: '费控成功'
        },
        {
          value: '2',
          label: '费控总数'
        }
      ],
      // 表头1
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
        }, {
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
          title: '电表是否覆盖',
          key: 'electricIsCoverage',
          sortable: true,
          width: 150
        }, {
          title: '电表倍率',
          key: 'electricPowerrate',
          sortable: true,
          width: 150
        }, {
          title: '数据日期',
          key: 'dataDate',
          sortable: true,
          width: 150
        }
      ],
      columns2: [
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
        },
        /* {
          title: '台区覆盖',
          key: 'tgCoverage',
          sortable: true,
          width: 150
        }, */
        {
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
        }, {
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
          title: '电表是否覆盖',
          key: 'electricIsCoverage',
          sortable: true,
          width: 150
        }, {
          title: '电表倍率',
          key: 'electricPowerrate',
          sortable: true,
          width: 150
        }, {
          title: '费控工单时间',
          key: 'feeTime',
          sortable: true,
          width: 150
        }, {
          title: '费控结果',
          key: 'feeResult',
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
      this.axiosData.cjStatus = this.searchBarForms.cjStatus
      this.axiosData.fkStatus = this.searchBarForms.fkStatus
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
.windowCollectCoverRateDetail .ivu-table-header th {
  color: #448c86;
}
.ivu-row{
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>
