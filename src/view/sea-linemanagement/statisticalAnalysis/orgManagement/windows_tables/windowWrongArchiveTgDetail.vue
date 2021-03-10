<!--档案异常弹表-->
<template>
  <div class="windowWrongArchiveTgDetail">
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
    <Tables border ref="tables" :columns="columns" :axiosUrl="axiosUrl" :axiosData="axiosData" class="table"/>
    <h2 class="secondTitle">{{secondTitle}}</h2>
    <card class="my-card">
      <Row>
        <Col span="8">
          <p>1.台区无考核计量点：<span @click="tableDetail('00150')">{{errorData.num00150}}</span></p>
        </Col>
        <Col span="8">
          <p>2.台区有多个考核计量点：<span @click="tableDetail('00151')">{{errorData.num00151}}</span></p>
        </Col>
        <Col span="8">
          <p>3.计量点异常：<span @click="tableDetail('00152')">{{errorData.num00152}}</span></p>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <p>4.倍率异常：<span @click="tableDetail('00153')">{{errorData.num00153}}</span></p>
        </Col>
        <Col span="8">
          <Button type="primary" @click="tableDetail('')">查询全部</Button>
        </Col>
      </Row>
    </card>
    <Tables border ref="bottom_wrong_archive_table" :filename="'档案异常台区信息'" height=150 :columns="bottom_wrong_archive_table_columns" :axiosUrl="bottomAxiosUrl" :axiosData="bottomAxiosData" class="table"/>
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
  name: 'windowWrongArchiveTgDetail',
  data () {
    return {
      bottomAxiosUrl: '',
      bottomAxiosData: {},
      searchBarForms: {
        tgName: '',
        tgNo: ''
      },
      secondFormDatas: {
        tgId: '',
        date: '',
        dateType: '',
        exceptType: ''
      },
      errorData: {
        num00150: 0,
        num00151: 0,
        num00152: 0,
        num00153: 0
      },
      secondTitle: '档案异常明细',
      // 表头
      columns: [
        {
          title: '档案异常数量',
          key: 'recordAnomalyTgNums',
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
              }, params.row.recordAnomalyTgNums)
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
      // 档案异常明细
      bottom_wrong_archive_table_columns: [
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
    // 明细表展示数据
    queryBottomTable (tgId, dataDate, dateType, row) {
      this.secondTitle = '档案异常明细(' + row.tgName + ')'
      this.secondFormDatas.dateType = dateType
      this.secondFormDatas.date = dataDate
      this.secondFormDatas.tgId = tgId
      this.secondFormDatas.exceptType = '4'
      this.bottomAxiosUrl = '/sea-lineLose/unitControl/recordAnomalyDetail'
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
  }
}
</script>

<style lang="less" scoped>
.windowWrongArchiveTgDetail .ivu-table-header th {
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
