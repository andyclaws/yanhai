<!--配变异常台区-->
<template>
  <div class="windowTranAlarmTgDetail">
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
        <!--<Col span="5">
          <FormItem label="台区状态">
          <Select  style="width:200px"   @on-change="selectList"  >
            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </FormItem>
        </Col>-->
        <Col span="4">
          <FormItem>
            <Button type="primary"  @click="query">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Tables border ref="tables" :height="tableHeight - 250" :columns="columns" :axiosUrl="axiosUrl" :axiosData="axiosData" class="table"/>
    <!--<span class="title" slot="title">配变异常明细</span>-->
    <h2 class="secondTitle" >{{secondTitle}}</h2>
    <card class="my-card">
      <Row>
        <Col span="6">
          <p>1.过载：<span @click="tableDetail('00115')">{{errorData.num00115}}</span></p>
        </Col>
        <Col span="6">
          <p>2.A相过载：<span @click="tableDetail('00130')">{{errorData.num00130}}</span></p>
        </Col>
        <Col span="6">
          <p>3.B相过载：<span @click="tableDetail('00131')">{{errorData.num00131}}</span></p>
        </Col>
        <Col span="6">
          <p>4.C相过载：<span @click="tableDetail('00132')">{{errorData.num00132}}</span></p>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <p>5.单相过载(过流)：<span @click="tableDetail('00113')">{{errorData.num00113}}</span></p>
        </Col>
        <Col span="6">
          <p>6.A相轻载：<span @click="tableDetail('00136')">{{errorData.num00136}}</span></p>
        </Col>
        <Col span="6">
          <p>7.B相轻载：<span @click="tableDetail('00137')">{{errorData.num00137}}</span></p>
        </Col>
        <Col span="6">
          <p>8.C相轻载：<span @click="tableDetail('00138')">{{errorData.num00138}}</span></p>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <p>9.电压三相不平衡：<span @click="tableDetail('00118')">{{errorData.num00118}}</span></p>
        </Col>
        <Col span="6">
          <p>10.电流三相不平衡：<span @click="tableDetail('00112')">{{errorData.num00112}}</span></p>
        </Col>
        <Col span="6">
          <Button type="primary" @click="tableDetail('')">查询全部</Button>
        </Col>
      </Row>
    </card>
    <Tables border ref="bottom_tran_alarm_table" :filename="'配变异常台区信息'" height=150 :columns="bottom_tran_alarm_table_columns" :axiosUrl="bottomAxiosUrl" :axiosData="bottomAxiosData" class="table"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
export default {
  props: ['axiosUrl', 'axiosData', 'width'],
  components: {
    Tables, axios
  },
  name: 'windowTranAlarmTgDetail',
  data () {
    return {
      tableHeight: 500,
      bottomAxiosUrl: '',
      bottomAxiosData: {},
      secondFormDatas: {
        tgId: '',
        date: '',
        dateType: '',
        exceptType: ''
      },
      searchBarForms: {
        tgName: '',
        tgNo: ''
      },
      errorData: {
        num00115: 0,
        num00130: 0,
        num00131: 0,
        num00132: 0,
        num00113: 0,
        num00136: 0,
        num00137: 0,
        num00138: 0,
        num00118: 0,
        num00112: 0
      },
      secondTitle: '配变异常明细',
      // 表头
      columns: [
        {
          title: '配变异常数',
          key: 'dTaTgNums',
          sortable: true,
          width: 150,
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
                    this.queryBottomTable(params.row.tgId, params.row.dataDate, params.row.dateType, params.row)
                  }
                }
              }, params.row.dtaTgNums)
            ])
          }
        },
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
        }, {
          title: '台区经理',
          key: 'customerManager',
          sortable: true,
          width: 150
        }, {
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
          title: '数据日期',
          key: 'dataDate',
          sortable: true,
          width: 150
        }
      ],
      // 疑似窃电异常明细
      bottom_tran_alarm_table_columns: [
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
          title: '考核单元名称',
          key: 'checkUnitName',
          sortable: true,
          width: 150
        }, {
          title: '台区经理',
          key: 'customerManager',
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
          title: '异常类型',
          key: 'anomalType',
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
    tableDetail (num) {
      this.bottomAxiosData.alarmType = num
      this.$nextTick(() => {
        this.$refs['bottom_tran_alarm_table'].queryTableData()
      })
    },
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 300 : 500
      console.log(this.tableHeight)
    },
    // 明细表展示数据
    queryBottomTable (tgId, dataDate, dateType, row) {
      this.secondTitle = '配变异常明细(' + row.tgName + ')'
      this.secondFormDatas.dateType = dateType
      this.secondFormDatas.date = dataDate
      this.secondFormDatas.tgId = tgId
      this.secondFormDatas.exceptType = '3'
      this.bottomAxiosUrl = '/sea-lineLose/unitControl/distributionTransformAnomalyDetail'
      this.bottomAxiosData = {
        'statDate': dataDate,
        'dateType': dateType,
        'tgId': tgId
      }
      axios.request({
        method: 'post',
        data: this.secondFormDatas,
        url: '/sea-lineLose/unitControl/tgExDetailCount'
      }).then(res => {
        if (res.status === 200 && res.data.data) {
          for (let k in this.errorData) {
            this.errorData[k] = 0
          }
          for (let i in res.data.data) {
            console.log(res.data.data[i])
            this.errorData[i] = res.data.data[i]
          }
        } else {
          this.$Message.success('查询失败!')
        }
      })
      this.$nextTick(() => {
        this.$refs['bottom_tran_alarm_table'].queryTableData()
      })
    },
    query () {
      this.axiosData.tgNo = this.searchBarForms.tgNo
      this.axiosData.tgName = this.searchBarForms.tgName
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
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
.windowTranAlarmTgDetail .ivu-table-header th {
  color: #448c86;
}
.ivu-row{
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
}

.my-card{
  margin-bottom: 10px;
  height: 150px;
  line-height: 30px;
  padding: 0 40px;
  .ivu-card-body{
    display: block;
    justify-content: space-between;
  }
  p{
    font-size: 16px;
    color: #666666;
    span{
      text-decoration:underline;
      color:#FF0000;
      cursor: pointer;
    }
  }
}
  .secondTitle{
    height: 30px;
    font-size: 16px;
    margin-top: 10px;
  }
</style>
