<template>
  <div class="elecExceptionModal">
    <Form ref="searchBarForms" :model="searchElecExceBarForms" :label-width="100">
      <Row>
        <Col span="5">
          <FormItem label="台区编号">
            <Input v-model="searchElecExceBarForms.tgNo" placeholder="请输入台区编号" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="台区名称">
            <Input v-model="searchElecExceBarForms.tgName" placeholder="请输入台区名称" clearable></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <Button type="primary"  @click="queryElecExceModal">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <tables ref="tables"
            height="250"
            editable
            :columns="upTableColumns"
            :axiosUrl="axiosUrl"
            :filename="'用电异常台区明细'"
            :axiosData="queryData"/>
    <div class="detailDiv"><span>{{secondTitle}}</span></div>
    <card class="my-card">
      <Row>
        <Col span="8">
          <p>1.电压越上限（过电压）：<a @click="tableDetail('00110')">{{errorData.num00110}}</a></p>
        </Col>
        <Col span="8">
          <p>2.电压越下限（低电压）：<a @click="tableDetail('00111')">{{errorData.num00111}}</a></p>
        </Col>
        <Col span="8">
          <p>3.电压缺相（失压）：<a @click="tableDetail('00100')">{{errorData.num00100}}</a></p>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <p>4.电流失流：<a @click="tableDetail('00102')">{{errorData.num00102}}</a></p>
        </Col>
      </Row>
    </card>
    <tables ref="downTableRef"
            editable
            height="130"
            :columns="downTable.downTableColumns"
            :filename="'用电异常明细'"
            :axiosUrl="downTable.axiosUrlDown"
            :axiosData="axiosDataDown"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
export default {
  name: 'elecExceptionModal',
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
      searchElecExceBarForms: {
        tgName: '',
        tgNo: ''
      },
      errorData: {
        num00110: 0,
        num00111: 0,
        num00100: 0,
        num00102: 0
      },
      secondTitle: '用电异常明细',
      upTableColumns: [
        {
          title: '台区管理单位',
          width: 120,
          sortable: true,
          key: 'orgName'
        }, {
          title: '台区名称',
          width: 120,
          sortable: true,
          key: 'tgName'
        }, {
          title: '台区编号',
          width: 120,
          sortable: true,
          key: 'tgNo'
        }, {
          title: '用电异常数量',
          sortable: true,
          width: 130,
          key: 'electricAnomalyTgNums',
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
                      'dateType': params.row.dateType,
                      'tgId': params.row.tgId
                    }
                    this.secondTitle = '用电异常明细(' + params.row.tgName + ')'
                    this.downTable.axiosUrlDown = '/sea-lineLose/custManagerAssess/electricAnomalyDetail'
                    this.$nextTick(() => {
                      this.$refs.downTableRef.queryTableData()
                    })
                    this.tgExDetailCount()
                  }
                }
              }, params.row.electricAnomalyTgNums)
            ])
          }
        }, {
          title: '考核单元名称',
          sortable: true,
          width: 120,
          key: 'chkUintName'
        }, {
          title: '台区经理',
          sortable: true,
          width: 120,
          key: 'custManagerName'
        }, {
          title: '台区状态',
          sortable: true,
          width: 120,
          key: 'tgStatus'
        }, {
          title: '台区覆盖',
          sortable: true,
          width: 120,
          key: 'isCoverTg'
        }, {
          title: '台区容量',
          sortable: true,
          width: 120,
          key: 'tgCap'
        }, {
          title: '台区供电量',
          sortable: true,
          width: 120,
          key: 'ppq'
        }, {
          title: '台区售电量',
          sortable: true,
          width: 120,
          key: 'spq'
        }, {
          title: '0.4kv线损率',
          sortable: true,
          width: 120,
          key: 'lllr'
        }, {
          title: '采集成功率',
          sortable: true,
          width: 120,
          key: 'readSuccNum'
        }, {
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
            width: 120,
            sortable: true,
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
      }
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
    queryElecExceModal () {
      this.queryData.tgNo = this.searchElecExceBarForms.tgNo
      this.queryData.tgName = this.searchElecExceBarForms.tgName
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
    }
  }
}
</script>
<style lang="less">
</style>
