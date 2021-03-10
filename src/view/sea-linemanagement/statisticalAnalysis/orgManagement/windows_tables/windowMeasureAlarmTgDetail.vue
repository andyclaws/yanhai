<!--计量异常台区数 弹表-->
<template>
  <div class="windowMeasureAlarmTgDetail">
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
    <Tables border ref="tables"  :columns="columns" :axiosUrl="axiosUrl" :axiosData="axiosData" class="parentTable"/>
    <h2 class="secondTitle">{{secondTitle}}</h2>
    <card class="my-card">
      <Row>
        <Col span="6">
          <p>1.电能表停走：<span @click="tableDetail('00107')">{{errorData.num00107}}</span></p>
        </Col>
        <Col span="6">
          <p>2.电能表倒走：<span @click="tableDetail('00106')">{{errorData.num00106}}</span></p>
        </Col>
        <Col span="6">
          <p>3.电能表飞走：<span @click="tableDetail('00104')">{{errorData.num00104}}</span></p>
        </Col>
        <Col span="6">
          <p>4.电能表示值不平（费率不平衡）：<span @click="tableDetail('00103')">{{errorData.num00103}}</span></p>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <p>5.反向有功示值大于0（反向电量异常）：<span @click="tableDetail('00105')">{{errorData.num00105}}</span></p>
        </Col>
        <Col span="6">
          <p>6.时钟超差（电能表时钟异常）：<span @click="tableDetail('00108')">{{errorData.num00108}}</span></p>
        </Col>
        <Col span="6">
          <p>7.终端时钟异常：<span @click="tableDetail('00124')">{{errorData.num00124}}</span></p>
        </Col>
        <Col span="4">
          <Button type="primary" @click="tableDetail('')">查询全部</Button>
        </Col>
      </Row>
    </card>
    <Tables border ref="bottom_measure_alarm_table" :filename="'计量异常台区信息'" height=150 :columns="bottom_measure_alarm_table_columns" :axiosUrl="bottomAxiosUrl" :axiosData="bottomAxiosData" class="parentTable"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
export default {
  props: ['axiosUrl', 'axiosData'],
  components: {
    Tables, axios
  },
  name: 'windowMeasureAlarmTgDetail',
  data () {
    return {
      bottomAxiosUrl: '',
      bottomAxiosData: {},
      searchBarForms: {
        tgName: '',
        tgNo: ''
      },
      secondTitle: '计量异常明细',
      secondFormDatas: {
        tgId: '',
        date: '',
        dateType: '',
        exceptType: ''
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
      // 表头
      columns: [
        {
          title: '计量异常数量',
          key: 'meterAnomalyTgNums',
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
              }, params.row.meterAnomalyTgNums)
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
      // 计量异常明细
      bottom_measure_alarm_table_columns: [
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
          title: '异常发生次数',
          key: 'anomalTakenNums',
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
        this.$refs['bottom_measure_alarm_table'].queryTableData()
      })
    },
    // 明细表展示数据
    queryBottomTable (tgId, dataDate, dateType, row) {
      this.secondTitle = '计量异常明细(' + row.tgName + ')'
      this.secondFormDatas.dateType = dateType
      this.secondFormDatas.date = dataDate
      this.secondFormDatas.tgId = tgId
      this.secondFormDatas.exceptType = '1'
      this.bottomAxiosUrl = '/sea-lineLose/unitControl/meterAnomalyDetail'
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
        this.$refs['bottom_measure_alarm_table'].queryTableData()
      })
    },
    query () {
      this.axiosData.tgNo = this.searchBarForms.tgNo
      this.axiosData.tgName = this.searchBarForms.tgName
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.windowMeasureAlarmTgDetail .ivu-table-header th {
  color: #448c86;
}
.ivu-row{
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
}
.my-card{
  margin-bottom: 10px;
  height: 100px;
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
