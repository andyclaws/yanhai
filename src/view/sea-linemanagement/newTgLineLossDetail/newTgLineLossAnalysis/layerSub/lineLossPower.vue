<template>
  <div class="lineLossPower">
    <Row>
      <Col span="6" class="flex-jcfs-ac">
        <span>时间：</span>
        <RadioGroup v-model="radioGroup" @on-change="radioChange">
          <Radio label="day" type="primary"><span>日</span></Radio>
          <Radio label="month" type="primary"><span>月</span></Radio>
          <Radio label="range" type="primary"><span>时间段</span></Radio>
          <Radio label="currentMonth" type="primary"><span>当月</span></Radio>
        </RadioGroup>
      </Col>
      <Col span="14">
        <DatePicker type="date" :value="chooseDate" @on-change="selectDate" placeholder="请选择日期" style="width: 200px" v-show="flag == 1"></DatePicker>
        <DatePicker type="month" :value="chooseMonth" @on-change="selectMonth" placeholder="请选择月份" style="width: 200px" v-show="flag == 2"></DatePicker>
        <div v-show="flag == 3">
          <DatePicker type="daterange" :value="rangeDate" @on-change="selectTime" placeholder="请选择时间段" style="width: 200px" ></DatePicker>
        </div>
        <Select v-model="model1" style="width:200px"  v-show="flag == 4" @on-change="selectList"  >
          <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="4">
        <Button type="primary" style="width: 80%;" @click="query">查询</Button>
      </Col>
    </Row>
    <card>
      <div class="layer-title">
        <p>监测结果<span v-show="repairFlag">（修复）</span></p>
      </div>
    </card>
    <tables ref="tables" editable :height="tableHeight - 50" :columns="this.flag === 4 ? columnsCur : columns" :axiosUrl="axiosUrl" :axiosData="queryData" :filename="'线损数据明细表格'" />
  </div>
</template>
<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
import { formatDate, dateToString } from '@/libs/index'
export default {
  name: 'lineLossPower',
  props: ['queryData', 'axiosUrl'],
  components: {
    Tables,
    axios
  },
  data () {
    return {
      tableHeight: 500,
      columns: [
        {
          title: '台区管理单位',
          key: 'orgName',
          width: 150,
          sortable: true
        },
        {
          title: '台区名称',
          width: 150,
          key: 'tgName',
          sortable: true
        },
        {
          title: '台区编号',
          key: 'tgNo',
          width: 120,
          sortable: true
        },
        {
          title: '数据日期',
          key: 'statDate',
          width: 120,
          sortable: true
        },
        {
          title: '台区供电量',
          key: 'ppq',
          width: 120,
          sortable: true
        },
        {
          title: '台区售电量',
          key: 'spq',
          width: 120,
          sortable: true
        },
        {
          title: '台区发电量',
          key: 'gpq',
          width: 120,
          sortable: true
        },
        {
          title: '损耗电量',
          key: 'lossPq',
          width: 120,
          sortable: true
        },
        {
          title: '台区线损率',
          key: 'lllr',
          width: 120,
          sortable: true
        },
        {
          title: '考核单元名称',
          key: 'checkUnitName',
          width: 150,
          sortable: true
        },
        {
          title: '台区经理',
          key: 'accountManagerName',
          width: 120,
          sortable: true
        },
        {
          title: '台区状态',
          key: 'tgStatus',
          width: 120,
          sortable: true
        },
        {
          title: '台区容量',
          key: 'tgCap',
          width: 120,
          sortable: true
        }
      ],
      columnsCur: [
        {
          title: '台区管理单位',
          key: 'orgName',
          width: 150,
          sortable: true
        },
        {
          title: '台区名称',
          width: 150,
          key: 'tgName',
          sortable: true
        },
        {
          title: '台区编号',
          key: 'tgNo',
          width: 120,
          sortable: true
        },
        {
          title: '数据日期',
          key: 'statDate',
          width: 120,
          sortable: true
        },
        {
          title: '计算方式',
          key: 'calcMethod',
          width: 120,
          sortable: true
        },
        {
          title: '台区供电量',
          key: 'ppq',
          width: 120,
          sortable: true
        },
        {
          title: '台区售电量',
          key: 'spq',
          width: 120,
          sortable: true
        },
        {
          title: '损耗电量',
          key: 'lossPq',
          width: 120,
          sortable: true
        },
        {
          title: '台区线损率',
          key: 'lllr',
          width: 120,
          sortable: true
        },
        {
          title: '考核单元名称',
          key: 'checkUnitName',
          width: 150,
          sortable: true
        },
        {
          title: '台区经理',
          key: 'accountManagerName',
          width: 120,
          sortable: true
        },
        {
          title: '台区状态',
          key: 'tgStatus',
          width: 120,
          sortable: true
        },
        {
          title: '台区容量',
          key: 'tgCap',
          width: 120,
          sortable: true
        }
      ],
      list: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '日线损累加'
        },
        {
          value: '2',
          label: '当月底码与月初底码做差'
        }
      ],
      model1: '0',
      radioGroup: 'day',
      flag: 1,
      requestData: {},
      chooseDate: this.queryData.date,
      chooseMonth: '',
      rangeDate: [formatDate(new Date(), -7), formatDate(new Date(), -1)],
      dateType: '',
      repairFlag: false
    }
  },
  methods: {
    radioChange (status) {
      if (status === 'day') {
        this.flag = 1
        this.chooseDate = formatDate(new Date(), -1)
        this.queryData['date'] = this.chooseDate
      } else if (status === 'month') {
        this.flag = 2
        this.chooseMonth = dateToString(new Date(), true)
        this.queryData['date'] = this.chooseMonth
      } else if (status === 'range') {
        this.flag = 3
        this.queryData['startDate'] = this.rangeDate[0]
        this.queryData['endDate'] = this.rangeDate[1]
      } else if (status === 'currentMonth') {
        this.flag = 4
        this.queryData['date'] = dateToString(new Date(), true)
      }
      this.queryData['dateType'] = status
    },
    query () {
      // console.log(this.axiosUrl)
      if (this.flag === 2) {
        this.queryData['date'] = this.chooseMonth
        this.queryData['dateType'] = 'month'
      } else if (this.flag === 4) {
        this.queryData['dataType'] = this.model1
      } else if (this.flag === 3) {
        this.queryData['startDate'] = this.rangeDate[0]
        this.queryData['endDate'] = this.rangeDate[1]
        this.queryData['dateType'] = 'range'
      }
      // console.log(JSON.stringify(this.queryData))
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
    },
    selectDate (value) {
      this.queryData['dateType'] = 'day'
      this.queryData['date'] = value
      this.chooseDate = value
    },
    selectMonth (value) {
      this.queryData['dateType'] = 'month'
      this.queryData['date'] = value
      this.chooseMonth = value
    },
    selectTime (value) {
      this.queryData['dateType'] = 'range'
      this.queryData['startDate'] = value[0]
      this.queryData['endDate'] = value[1]
      this.rangeDate = value
    },
    selectList (value) {
      if (value) {
        this.model1 = value
        this.queryData['dateType'] = 'currentMonth'
        // 当月类型
        this.queryData['dataType'] = value
      } else {
        this.queryData['dataType'] = ''
      }
      // todo 待完善！
      let date = new Date()
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString()
      if (month.length === 1) {
        month = '0' + month
      }
      let dateTime = year + '-' + month
      this.queryData['date'] = dateTime
    },
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 300 : 500
    }
  },
  mounted () {
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
.lineLossPower{
  .ivu-card-body{
    padding-top: 0;
    padding-bottom: 0;
    .layer-title{
      height: 40px;
      line-height: 40px;
      p{
        font-weight: 700;
        font-style: normal;
        font-size: 14px;
        color: #009999;
        span{
          color: #FF0000;
          font-weight: 700;
        }
      }
    }
  }
  .ivu-row{
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
  }
  .table .ivu-poptip{
    bottom: 5px;
  }
}
</style>
