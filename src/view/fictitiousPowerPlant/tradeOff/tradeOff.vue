<template>
  <Card class="tradeOff">
    <div slot="title" class="tradeOff-header">
      <img src="./images/u2269.png" />
      <span class="span1">查询条件</span>
    </div>
    <div class="tradeOff-top">
      <Row class="tradeOff-top-row1">
        <i-col span="6">
          <div class="searchLine1">
            <span>交易编号</span>
            <i-input
              placeholder="请输入..."
              style="width: 150px"
              v-model="searchList.tradeNo"
              @change="tradeNoVal"
            ></i-input>
          </div>
        </i-col>
        <i-col span="6">
          <div class="searchLine1">
            <span>出清状态</span>
            <i-select
              style="width:150px"
              v-model="searchList.declareStatus"
              @change="tradeOffStatusVal"
            >
              <i-option
                v-for="(item,index) in tradeOffStatusList"
                :value="item.value"
                :key="index"
              >{{ item.name }}</i-option>
            </i-select>
          </div>
        </i-col>
        <i-col span="12">
          <div class="searchLine1 searchLine2">
            <span>交易日期</span>
            <Date-picker
              type="date"
              placeholder="选择日期"
              style="width: 150px"
              v-model="searchList.clearStartDate"
              @on-change="beginTimeVal"
              format="yyyy-MM-dd"
            ></Date-picker>
            <span>至</span>
            <Date-picker
              type="date"
              placeholder="选择日期"
              style="width: 150px"
              v-model="searchList.clearEndDate"
              @change="endTimeVal"
              format="yyyy-MM-dd"
            ></Date-picker>
          </div>
        </i-col>
      </Row>
      <Row class="tradeOff-top-row2">
        <i-col span="12">
          <div class="searchLine1">
            <span>调控类型</span>
            <i-select
              style="width:150px"
              v-model="searchList.contrlType"
              @change="regulationTypeVal"
            >
              <i-option
                v-for="(item,index) in list"
                :value="item.value"
                :key="index"
              >{{ item.name }}</i-option>
            </i-select>
          </div>
        </i-col>
        <i-button class="tradeOff-top-row1-btn">
          <span @click="topPanelQuery">查询</span>
        </i-button>
      </Row>
    </div>
    <!-- 需求公示情况 -->
    <!-- <TradeOffForm /> -->
    <Card class="tradeOffForm">
      <div slot="title" class="tradeOffForm-header">
        <img src="./images/u2269.png" />
        <p>交易出清情况</p>
      </div>
      <div class="form">
        <Tables
          border
          ref="selectedTable"
          :row-class-name="rowClassName"
          :columns="tableList.formColumns"
          :loading="selectedResultLoading"
          :axiosUrl="tableList.axiosUrl"
          :axiosData="tableList.formData"
          @on-load-data="onSelectedLoadData"
          @on-load-data-page-info="onSelectedLoadDataPageInfo"
          height="390"
        ></Tables>
      </div>
      <Modal
        width="900"
        draggable
        title="分段需求详情"
        :value="showDetails"
        footer-hide
        closable
        @on-visible-change="closeModal($event)"
      >
        <div class="tradeOffFormShowDetails">
          <Row>
            <i-col span="12">
              <span>交易编号：</span>
              <span>{{tradeNumber1}}</span>
            </i-col>
            <i-col span="12">
              <span>出清状态：</span>
              <span>{{tradeNumber2}}</span>
            </i-col>
          </Row>
          <div class="tradeOffFormShowDetails-form">
            <i-table border :columns="columns2" :data="data2"></i-table>
          </div>
          <div class="tradeOffFormShowDetails-btn" v-show="showBtn">
            <div class="button1" @click="TradeOffConfirm">接受</div>
            <div class="button2" @click="TradeOffCancle">放弃</div>
          </div>
        </div>
      </Modal>
    </Card>
  </Card>
</template>
<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
import { accordTypeEvaluation } from '../util.js'
export default {
  name: 'tradeOff',
  components: {
    Tables,
    axios
  },
  data () {
    return {
      list: [],
      tradeOffStatusList: [],
      searchList: {
        clearEndDate: '',
        clearStartDate: '',
        contrlType: '',
        currPage: 1,
        declareStatus: '',
        pageSize: 10,
        tradeNo: ''
      },
      tradeNo: '',
      showDetails: false,
      tableList: {
        formColumns: [
          {
            title: '序号',
            type: 'index',
            key: 'serialNumber',
            align: 'center',
            width: '66'
          },
          {
            title: '交易编号',
            key: 'tradeNo',
            align: 'center',
            width: '156'
          },
          {
            title: '申报状态',
            key: 'declareStatus',
            align: 'center',
            width: '126',
            render: (h, params) => {
              return h(
                'span',
                accordTypeEvaluation(
                  this.tradeOffStatusList,
                  params.row.declareStatus,
                  'name',
                  'value'
                )
              )
            }
          },
          {
            title: '交易申请时间',
            key: 'clearDate',
            align: 'center',
            width: '186'
          },
          {
            title: '调控类型',
            key: 'contrlType',
            align: 'center',
            width: '120',
            render: (h, params) => {
              return h(
                'span',
                accordTypeEvaluation(
                  this.list,
                  params.row.contrlType,
                  'name',
                  'value'
                )
              )
            }
          },
          {
            title: '出清段数',
            key: 'clareSegCnt',
            align: 'center',
            width: '125'
          },
          {
            title: '出清详情',
            key: 'clearingDetails',
            align: 'center',
            width: '125',
            render: (h, params) => {
              return h(
                'a',
                {
                  props: {
                    href: '#',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.goToDetail(params)
                    }
                  }
                },
                '详情'
              )
            }
          }
        ],
        formData: {},
        axiosUrl: 'tcc/tradingClearanceList'
      },
      columns2: [
        {
          title: '分段数',
          key: 'declareStatus',
          width: '90',
          align: 'center'
        },
        {
          title: '出清电量（kWh）',
          key: 'clareEnergy',
          width: '160',
          align: 'center'
        },
        {
          title: '开始时间',
          key: 'beginDate',
          width: '170',
          align: 'center'
        },
        {
          title: '结束时间',
          key: 'endDate',
          width: '170',
          align: 'center'
        },
        {
          title: '出清电价（元）',
          key: 'clarePrice',
          width: '150',
          align: 'center'
        }
      ],
      data2: [],
      tradeNumber1: '',
      tradeNumber2: '',
      current: 1,
      pageSize: 25,
      total: 0,
      selectedResultLoading: false,
      showBtn: true
    }
  },
  mounted () {
    this.topPanelQuery() // 搜索按钮
    this.getTradeOffStatus() // 交易状态下拉框
    this.getRegulationType() // 调控状态下拉框
  },
  methods: {
    // 点击详情
    goToDetail (data) {
      this.showDetails = true
      var _this = this
      let tradeNo = data.row.tradeNo
      let declareStatus = data.row.declareStatus
      // console.log(tradeNo);
      axios
        .request({
          method: 'post',
          data: tradeNo,
          url: 'tcc/clearancePriceDetails'
        })
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            _this.tradeNumber1 = tradeNo
            if (declareStatus === '01') {
              _this.tradeNumber2 = '待审核'
              _this.showBtn = true
            } else if (declareStatus === '02') {
              _this.tradeNumber2 = '已接受'
              _this.showBtn = false
            } else {
              _this.tradeNumber2 = '未达成'
              _this.showBtn = false
            }
            _this.data2 = res.data.data
            _this.tradeNo = tradeNo
          }
        })
        .catch(err => {
          console.log('err:' + err)
        })
    },
    closeModal (val) {
      if (val === false) {
        this.showDetails = false
      }
    },
    rowClassName (row, index) {
      if (index === 0) {
        return 'demo-table-info-row'
      }
    },
    TradeOffConfirm () {
      this.showDetails = false
      var _this = this
      // console.log(_this.tradeNo);
      let data = {
        declareStatus: '02',
        tradeNo: _this.tradeNo
      }
      axios
        .request({
          method: 'post',
          data: data,
          url: 'tmc/transactionClearanceExamine'
        })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            // _this.tradeOffStatusList = res.data.data;
          }
        })
      _this.topPanelQuery()
    },
    TradeOffCancle () {
      this.showDetails = false
      var _this = this
      // console.log(_this.tradeNo);
      let data = {
        declareStatus: '03',
        tradeNo: _this.tradeNo
      }
      axios
        .request({
          method: 'post',
          data: data,
          url: 'tmc/transactionClearanceExamine'
        })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            // _this.tradeOffStatusList = res.data.data;
          }
        })
      _this.topPanelQuery()
    },
    tradeNoVal (val) {
      this.searchList.tradeNo = val
    },
    tradeOffStatusVal (val) {
      this.searchList.declareStatus === '-全部-' ? '' : val
    },
    beginTimeVal (val) {
      this.searchList.clearStartDate = val
    },
    endTimeVal (val) {
      this.searchList.clearEndDate = val
    },
    regulationTypeVal (val) {
      this.searchList.contrlType
    },

    onSelectedLoadData () {
      this.selectedResultLoading = false
    },
    onSelectedLoadDataPageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent
      this.pageSize = tmpPageSize
      this.total = total
    },
    topPanelQuery () {
      let _this = this
      _this.tableList.formData = _this.cloneSearch()
      _this.current = 1
      setTimeout(() => {
        _this.getTableData()
      }, 100)
    },
    getTableData () {
      this.$refs.selectedTable.onPageChange(this.current, this.pageSize)
    },
    cloneSearch () {
      let clone = {}
      let tradeNo = this.searchList.tradeNo
      let declareStatus = this.searchList.declareStatus
      let clearStartDate = this.searchList.clearStartDate
      let clearEndDate = this.searchList.clearEndDate
      let contrlType = this.searchList.contrlType

      clone.tradeNo = tradeNo
      clone.declareStatus = declareStatus
      clone.clearStartDate = clearStartDate
      clone.clearEndDate = clearEndDate
      clone.contrlType = contrlType
      return clone
    },

    // 出清状态下拉框
    getTradeOffStatus () {
      var _this = this
      axios
        .request({
          method: 'get',
          url: 'ddlc/dropDownListQuery?type=CLARE_STATUS'
        })
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            _this.tradeOffStatusList = res.data.data
            // _this.tradeOffStatusList.push({
            //   value: 'all',
            //   name: '-全部-'
            // })
          }
        })
    },
    // 调控类型下拉框
    getRegulationType () {
      var _this = this
      axios
        .request({
          method: 'get',
          url: 'ddlc/dropDownListQuery?type=CONTRL_TYPE'
        })
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            _this.list = res.data.data
          }
        })
    }
  }
}
</script>
<style lang="less">
@import "./tradeOff.less";
</style>
