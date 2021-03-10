<template>
  <div class="measureExceptionModal">
    <Form ref="searchBarForms" :model="searchMeasureExceBarForms" :label-width="100">
      <Row>
        <Col span="5">
          <FormItem label="台区编号">
            <Input v-model="searchMeasureExceBarForms.tgNo" placeholder="请输入台区编号" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="台区名称">
            <Input v-model="searchMeasureExceBarForms.tgName" placeholder="请输入台区名称" clearable></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <Button type="primary"  @click="queryMeasureExceModal">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <tables ref="tables"
            :height="tableHeight / 3 * 2 - 30"
            editable
            :columns="upTableColumns"
            :filename="'计量异常台区明细'"
            :axiosUrl="axiosUrl"
            :axiosData="queryData"/>
    <div class="detailDiv"><span>{{secondTitle}}</span></div>
    <card class="my-card">
      <Row>
        <Col span="6">
          <p>1.电能表停走：<a @click="tableDetail('00107')">{{errorData.num00107}}</a></p>
        </Col>
        <Col span="6">
          <p>2.电能表倒走：<a @click="tableDetail('00106')">{{errorData.num00106}}</a></p>
        </Col>
        <Col span="6">
          <p>3.电能表飞走：<a @click="tableDetail('00104')">{{errorData.num00104}}</a></p>
        </Col>
        <Col span="6">
          <p>4.电能表示值不平（费率不平衡）：<a @click="tableDetail('00103')">{{errorData.num00103}}</a></p>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <p>5.反向有功示值大于0（反向电量异常）：<a @click="tableDetail('00105')">{{errorData.num00105}}</a></p>
        </Col>
        <Col span="8">
          <p>6.时钟超差（电能表时钟异常）：<a @click="tableDetail('00108')">{{errorData.num00108}}</a></p>
        </Col>
        <Col span="8">
          <p>7.终端时钟异常：<a @click="tableDetail('00124')">{{errorData.num00124}}</a></p>
        </Col>
      </Row>
    </card>
    <tables ref="downTableRef"
            editable
            :height="tableHeight / 3 - 20"
            :columns="downTable.downTableColumns"
            :filename="'计量异常明细'"
            :axiosUrl="downTable.axiosUrlDown"
            :axiosData="axiosDataDown"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
export default {
  name: 'measureExceptionModal',
  components: {
    Tables,
    axios
  },
  props: ['axiosUrl', 'queryData'],
  data () {
    return {
      axiosDataDown: {
        date: '',
        custManagerName: ''
      },
      searchMeasureExceBarForms: {
        tgName: '',
        tgNo: ''
      },
      errorData: {
        num00107: 0,
        num00106: 0,
        num00104: 0,
        num00103: 0,
        num00105: 0,
        num00108: 0,
        num00124: 0
      },
      secondTitle: '计量异常明细',
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
          title: '计量异常数量',
          sortable: true,
          width: 130,
          key: 'meterAnomalyTgNums',
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
                      'tgId': params.row.tgId,
                      'dateType': params.row.dateType
                    }
                    this.secondTitle = '计量异常明细(' + params.row.tgName + ')'
                    this.downTable.axiosUrlDown = '/sea-lineLose/custManagerAssess/meterAnomalyDetail'
                    this.$nextTick(() => {
                      this.$refs.downTableRef.queryTableData()
                    })
                    this.tgExDetailCount()
                  }
                }
              }, params.row.meterAnomalyTgNums)
            ])
          }

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
        }

      ],
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
            key: 'checkUnitName'
          },
          {
            title: '台区经理',
            sortable: true,
            width: 120,
            key: 'customerManager'
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
            key: 'electricBarCode'
          },
          {
            title: '电表资产号',
            sortable: true,
            width: 120,
            key: 'assetNo'
          },
          {
            title: '异常类型',
            sortable: true,
            width: 120,
            key: 'anomalType'
          },
          {
            title: '异常发生次数',
            sortable: true,
            width: 120,
            key: 'anomalTakenNums'
          },
          {
            title: '电表倍率',
            sortable: true,
            width: 120,
            key: 'electricPowerrate'
          },
          {
            title: '正向有功起码',
            sortable: true,
            width: 120,
            key: 'startCodeValueActivePostive'
          },
          {
            title: '正向有功止码',
            sortable: true,
            width: 120,
            key: 'endCodeValueActivePostive'
          },
          {
            title: '正向有功电量',
            sortable: true,
            width: 120,
            key: 'electricValueActivePostive'
          },
          {
            title: '反向有功起码',
            sortable: true,
            width: 120,
            key: 'startCodeValueActiveNegative'
          },
          {
            title: '反向有功止码',
            sortable: true,
            width: 120,
            key: 'endCodeValueActiveNegative'
          },
          {
            title: '反向有功电量',
            sortable: true,
            width: 120,
            key: 'electricValueActiveNegative'
          }
        ],
        axiosUrlDown: ''
      },
      tableHeight: 500
    }
  },
  methods: {
    tableDetail (alarmCode) {
      if (this.axiosDataDown.tgId === null || this.axiosDataDown.tgId === undefined) {
        this.$Message.success('请先选择一条台区明细记录!')
        return
      }
      this.axiosDataDown.alarmCode = alarmCode
      this.$nextTick(() => {
        this.$refs.downTableRef.queryTableData()
      })
    },
    tgExDetailCount () {
      if (Object.keys(this.axiosDataDown).length < 1) {
        return
      }
      axios.request({
        method: 'post',
        data: this.axiosDataDown,
        url: '/sea-lineLose/custManagerAssess/tgExDetailCount'
      }).then(res => {
        if (res.status === 200 && res.data.data) {
          for (let k in this.errorData) {
            this.errorData[k] = 0
          }
          for (let i in res.data.data) {
            this.errorData[i] = res.data.data[i]
          }
        } else {
          this.$Message.success('查询失败!')
        }
      })
    },
    queryMeasureExceModal () {
      this.queryData.tgNo = this.searchMeasureExceBarForms.tgNo
      this.queryData.tgName = this.searchMeasureExceBarForms.tgName
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
