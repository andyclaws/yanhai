<!--疑似窃电台区数 弹表-->
<template>
  <div class="windowStealElectricTgDetail">
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
      <p>1.零线与火线电流超差：<span @click="tableDetail('0011E')">{{errorData.num0011E}}</span></p>
    </card>
    <Tables border ref="bottom_steal_electric_table" :filename="'窃电台区信息'" height=150 :columns="bottom_steal_electric_table_columns" :axiosUrl="bottomAxiosUrl" :axiosData="bottomAxiosData" @on-row-click="rowClick" class="table"/>
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
  name: 'windowStealElectricTgDetail',
  data () {
    return {
      bottomAxiosUrl: '',
      bottomAxiosData: {},
      searchBarForms: {
        tgName: '',
        tgNo: ''
      },
      secondTitle: '疑似窃电明细',
      secondFormDatas: {
        tgId: '',
        date: '',
        dateType: '',
        exceptType: ''
      },
      errorData: {
        num0011E: 0
      },
      // 表头
      columns: [
        {
          title: '疑似窃电电表数',
          key: 'qSeTgNums',
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
              }, params.row.qseTgNums)
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
      bottom_steal_electric_table_columns: [
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
          title: '窃电诊断方式',
          key: 'stealElectricDiagnosisMode',
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
        this.$refs['bottom_steal_electric_table'].queryTableData()
      })
    },
    onRowClick (row, index) {
      this.$emit('on-row-click', row, index)
      console.log(row, index)
    },
    rowClick (data) {
      console.log(data)
      /* if (!this.selectMore) {
        this.$emit('on-select', data)
      } */
    },
    // 明细表展示数据
    queryBottomTable (tgId, dataDate, dateType, row) {
      this.secondTitle = '疑似窃电明细(' + row.tgName + ')'
      this.secondFormDatas.dateType = dateType
      this.secondFormDatas.date = dataDate
      this.secondFormDatas.tgId = tgId
      this.secondFormDatas.exceptType = '5'
      this.bottomAxiosUrl = '/sea-lineLose/unitControl/questionablyStealElectricDetail'
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
        this.$refs['bottom_steal_electric_table'].queryTableData()
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
.windowStealElectricTgDetail .ivu-table-header th {
  color: #448c86;
}
.ivu-row{
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
}
.my-card{
  margin-bottom: 10px;
  height: 50px;
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
