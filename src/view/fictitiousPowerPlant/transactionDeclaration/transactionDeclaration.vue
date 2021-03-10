<template>
  <div>
    <div v-show="!showChangePage">
      <div class="tdec-header">
        <p><img src="./images/u2269.png" alt=""></p>
        <p><span>查询条件</span></p>
      </div>
      <div class="tdec-search-box">
        <Form ref="formValidate" :model="searchItem" :label-width="120">
          <Row>
            <Col span="6">
              <FormItem label="交易编号:">
                <Input v-model="searchItem.declareCode" placeholder="请输入交易编号" style="width:150px"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="申报开始时间:">
                <DatePicker :clearable = false :value="searchItem.declareCreateDate" @on-change="declareCreateDateChange" format="yyyy-MM-dd" type="date" placeholder="年-月-日" style="width: 150px"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="申报状态:">
                <Select v-model="searchItem.declareStatusValue" style="width:150px" @on-change="selectDeclareStatus">
                  <Option v-for="item in searchItem.declareStatus" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem>
                <div class="primary-btn" @click="topPanelQuery">查询</div>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="6">
              <FormItem label="调控类型:">
                <Select v-model="searchItem.declareTypeValue" style="width:150px" @on-change="selectDeclareType">
                  <Option v-for="item in searchItem.declareType" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="申报结束时间:">
                <DatePicker :clearable = false :value="searchItem.declareEndDate" @on-change="declareEndDateChange" format="yyyy-MM-dd" type="date" placeholder="年-月-日" style="width: 150px"></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div class="tdec-header tdec-table-header">
        <div>
          <p><img src="./images/u2269.png" alt=""></p>
          <p><span>交易管理列表</span></p>
        </div>
        <div>
          <div class="add-declaration" @click="addDeclaration">
            <p><img src="./images/add.png" alt=""></p>
            <p><span>新增申报</span></p>
          </div>
        </div>
      </div>
      <div class="tdec-table-box">
        <Tables
          border
          stripe
          height="500"
          ref="declareTable"
          :columns="declareTable.declareColumns"
          :axiosUrl="declareTable.axiosUrl"
          :axiosData="declareTable.declareAjaxData"
          :loading="loading"
          @on-load-data="onProtectLoadData"
          @on-load-data-page-info="onProtectLoadDataPageInfo"
        ></Tables>
      </div>
    </div>
    <!--新建申报-->
    <div v-if="showChangePage">
      <div class="add-declaration-body">
        <div class="add-declaration-top">
          <div class="transaction-notice-box">
            <div class="add-info-title">||| 交易平台需求公告</div>
            <div class="transaction-notice-content">
              <div class="notice-select">
                <span>交易公告</span>
                <Select v-model="noticeOptionValue" style="width:300px" @on-change="selectNoticeType">
                  <Option v-for="item in noticeOption" :value="item.noticeId" :key="item.noticeId">{{ item.noticeNo }}</Option>
                </Select>
              </div>
              <div class="notice-date">
                报价有效日期：<span>{{validBeginDate}} ~ {{validEndDate}}</span>
              </div>
              <div class="notice-table">
                <Table :row-class-name="rowClassName" :columns="noticeTable.noticeColumn" :data="noticeTable.noticeData"></Table>
              </div>
            </div>
          </div>
          <div class="quote-reference-box">
            <div class="add-info-title">||| 需量负荷</div>
            <div class="input-top">
              <div>
                <span class="label">固定投资均摊：</span>
                <Input v-model="costItem.investmentShare" style="width: 80px"></Input> 元
              </div>
              <div>
                <span class="label">运维费用：</span>
                <Input v-model="costItem.operationsCost" style="width: 80px"></Input> 元
              </div>
              <div class="button">
                成本计算
              </div>
            </div>
            <div class="quote-charts-box">
              <quotation-reference-charts></quotation-reference-charts>
              <div class="xAxis-name">时间</div>
            </div>
          </div>
        </div>
        <div class="add-declaration-bottom">
          <div class="quote-info-box">
            <div class="quote-header">
              <div class="add-info-title quote-title">||| 报价信息</div>
            </div>
            <div class="quote-table">
              <Table :row-class-name="rowClassName" :columns="quotationInfoTable.quoteInfoColumn" :data="quotationInfoTable.quoteInfoData"></Table>
            </div>
            <div class="quote-btn">
              <div @click="declarationClick">申报</div> 
              <div @click="cancelClick">取消</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--交易电价详情弹窗-->
    <Modal
      class="transaction-price-modal"
      width="750"
      draggable
      :zIndex="901"
      :value="showTraPriceDetailFlag"
      class-name="vertical-center-modal"
      footer-hide
      closable
      @on-visible-change="closeModal($event)"
      :title="traPriceDetailModalTitle">
      <div class="m-title">交易编号：<span>{{transactionPriceNo}}</span></div>
      <div class="m-table">
        <Table :row-class-name="rowClassName" :columns="transactionPriceTable.transactionPriceColumn" :data="transactionPriceTable.transactionPriceData"></Table>
      </div>
    </Modal>
    <!--申报确认弹窗-->
    <Modal
      width="700"
      draggable
      :zIndex="1001"
      :value="showDeclationFlag"
      footer-hide
      closable
      @on-visible-change="closeTraDecModal($event)"
      :title="transactionDecTitle">
      <div class="confirm-declaration-body">
        <div class="confirm-top">
          <p>交易编号：<span>{{confirmTradeNo}}</span></p>
          <p>调控类型：<span>{{confirmDeclareTypeName}}</span></p>
        </div>
        <div class="confirm-table">
          <Table :row-class-name="rowClassName" :columns="confirmQuoteDecTable.quoteDecColumn" :data="confirmQuoteDecTable.quoteDecData"></Table>
        </div>
        <div class="confirm-btn">
          <div @click="confirmDeclaration">确认</div>
          <div @click="cancelDeclaration">取消</div>
        </div>
      </div>
    </Modal>
    <!--新增报价弹窗-->
    <Modal
      width="600"
      draggable
      :zIndex="1001"
      :value="showAddQuoteFlag"
      footer-hide
      closable
      @on-visible-change="closeQuoteModal($event)"
      :title="addQuoteTitle">
      <div class="add-quote-form-body">
        <Form :model="quoteItem" :label-width="200">
          <FormItem label="申报负荷(万元)">
            <Input v-model="quoteItem.electricQuantity" size="large" style="width: 200px;"></Input>
          </FormItem>
          <FormItem label="申报电价(万元)">
            <Input v-model="quoteItem.electricPrice" size="large" style="width: 200px;"></Input>
          </FormItem>
          <FormItem label="开始时间">
            <DatePicker type="date" v-model="quoteItem.startDate" size="large" style="width: 200px;"></DatePicker>
          </FormItem>
          <FormItem label="结束时间">
            <DatePicker type="date" v-model="quoteItem.endDate" size="large" style="width: 200px;"></DatePicker>
          </FormItem>
          <FormItem class="quote-button-box">
            <div class="add-quote-btn" @click="confirmAddQuote">添加</div>
            <div class="cancel-quote-btn" @click="cancelAddQuote">取消</div>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import quotationReferenceCharts from './quotationReferenceCharts'
import costInfoCharts from './costInfoCharts'
import axios from '@/libs/api.request'
import { accordTypeEvaluation } from '../util'
export default {
  name: 'transactionDeclaration',
  props: {},
  components: {
    Tables,
    quotationReferenceCharts,
    costInfoCharts
  },
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      searchItem: {
        declareCode: '',
        declareCreateDate: '',
        declareEndDate: '',
        declareStatus: [],
        declareStatusValue: '',
        declareType: [],
        declareTypeValue: ''
      },
      declareTable: {
        declareColumns: [
          {
            title: '序号',
            type: 'index',
            key: 'tableNo',
            width: '80',
            align: 'center',
            sortable: true
          },
          {
            title: '交易编号',
            key: 'tradeNo',
            align: 'center',
            width: '120'
          },
          {
            title: '交易名称',
            key: 'tradeName',
            align: 'center',
            width: '120'
          },
          {
            title: '申报时间',
            key: 'declareDate',
            align: 'center',
            width: '170'
          },
          {
            title: '申报人',
            key: 'declareStaffName',
            align: 'center',
            width: '120'
          },
          {
            title: '调控类型',
            key: 'contrlType',
            align: 'center',
            width: '100',
            render: (h, params) => {
              return h('span', accordTypeEvaluation(this.searchItem.declareType, params.row.contrlType, 'name', 'value'))
            }
          },
          {
            title: '申报时间段数',
            key: 'declareSegCnt ',
            align: 'center',
            width: '120',
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
                params.row.declareSegCnt
              )
            }
          },
          {
            title: '申报状态',
            key: 'declareStatus',
            align: 'center',
            width: '100',
            render: (h, params) => {
              return h('span', accordTypeEvaluation(this.searchItem.declareStatus, params.row.declareStatus, 'name', 'value'))
            }
          }
        ],
        // TODO AJAX URL
        axiosUrl: 'tdc/transactionDeclarationList',
        declareAjaxData: {}
      },
      declareAjaxDataObj: {},
      current: 1,
      pageSize: 25,
      total: 0,
      loading: false,
      showTraPriceDetailFlag: false,
      traPriceDetailModalTitle: '( 交易电价详情',
      transactionPriceTable: { // 交易电价
        transactionPriceColumn: [
          {
            title: '分段',
            key: 'segmentNo',
            align: 'center',
            width: '80'
          },
          {
            title: '开始时间',
            key: 'beginDate',
            align: 'center',
            width: '180'
          },
          {
            title: '结束时间',
            key: 'endDate',
            align: 'center',
            width: '180'
          },
          {
            title: '申报负荷(kW)',
            key: 'declareEnergy',
            align: 'center',
            width: '150'
          },
          {
            title: '申报电价(元)',
            key: 'declarePrice',
            align: 'center',
            width: '120'
          }
        ],
        transactionPriceData: []
      },
      transactionPriceNo: '', // 交易电价详情弹窗-交易编号
      costItem: {
        investmentShare: 2000,
        operationsCost: 3000
      },
      noticeOption: [],
      noticeOptionValue: '',
      noticeTable: { // 需求公告
        noticeColumn: [
          {
            title: '分段',
            key: 'segmentNo',
            align: 'center',
            width: '80'
          },
          // {
          //   title: '需求电量(kWh)',
          //   key: 'declaredElectricity',
          //   align: 'center',
          //   width: '150'
          // },
          {
            title: '开始时间',
            key: 'requireEnergyBeginDate',
            align: 'center',
            width: '150'
          },
          {
            title: '结束时间',
            key: 'requireEnergyEndDate',
            align: 'center',
            width: '150'
          }
          // {
          //   title: '指导电价(元)',
          //   key: 'declaredElectricityPrice',
          //   align: 'center',
          //   width: '150'
          // }
        ],
        noticeData: []
      },
      validBeginDate: '',
      validEndDate: '',
      quotationInfoTable: { // 报价信息
        quoteInfoColumn: [
          {
            title: '分段',
            key: 'segmentNo',
            align: 'center',
            width: '80'
          },
          {
            title: '开始时间',
            key: 'requireEnergyBeginDate',
            align: 'center',
            width: '200'
          },
          {
            title: '结束时间',
            key: 'requireEnergyEndDate',
            align: 'center',
            width: '200'
          },
          {
            title: '申报负荷(kW)',
            key: 'declareEnergy',
            align: 'center',
            width: '150',
            className: 'table-info-Energy',
            render: (h, params) => {
              if (params.row.$isEdit) {
                return h('Input', {
                  props: {
                    type: 'text',
                    value: params.row.declareEnergy
                  },
                  on: {
                    'on-blur': event => {
                      params.row.declareEnergy = event.target.value
                      this.quotationInfoTable.quoteInfoData[params.index].declareEnergy = event.target.value
                      if (this.quotationInfoTable.quoteInfoData[params.index].declareEnergy === '') {
                        this.quotationInfoTable.quoteInfoData[params.index].declareEnergy = 0
                      }
                      this.$set(params.row, '$isEdit', false)
                    }
                  }
                })
              } else {
                return h('div', {
                  on: {
                    click: () => {
                      this.$set(params.row, '$isEdit', true)
                    }
                  }
                }, params.row.declareEnergy)
              }
            }
          },
          {
            title: '申报电价(元)',
            key: 'declarePrice',
            align: 'center',
            width: '150',
            className: 'table-info-Energy',
            render: (h, params) => {
              if (params.row.$isEdit) {
                return h('Input', {
                  props: {
                    type: 'text',
                    value: params.row.declarePrice
                  },
                  on: {
                    'on-blur': event => {
                      params.row.declarePrice = event.target.value
                      this.quotationInfoTable.quoteInfoData[params.index].declarePrice = event.target.value
                      if (this.quotationInfoTable.quoteInfoData[params.index].declarePrice === '') {
                        this.quotationInfoTable.quoteInfoData[params.index].declarePrice = 0
                      }
                      this.$set(params.row, '$isEdit', false)
                    }
                  }
                })
              } else {
                return h('div', {
                  on: {
                    click: () => {
                      this.$set(params.row, '$isEdit', true)
                    }
                  }
                }, params.row.declarePrice)
              }
            }
          }
        ],
        quoteInfoData: []
      },
      confirmQuoteDecTable: { // 申报确认
        quoteDecColumn: [
          {
            title: '分段',
            key: 'segmentNo',
            align: 'center',
            width: '70'
          },
          {
            title: '开始时间',
            key: 'requireEnergyBeginDate',
            align: 'center',
            width: '170'
          },
          {
            title: '结束时间',
            key: 'requireEnergyEndDate',
            align: 'center',
            width: '170'
          },
          {
            title: '申报负荷(kW)',
            key: 'declareEnergy',
            align: 'center',
            width: '130'
          },
          {
            title: '申报电价(元)',
            key: 'declarePrice',
            align: 'center',
            width: '120'
          }
        ],
        quoteDecData: []
      },
      confirmTradeNo: '',
      confirmDeclareTypeName: '',
      confirmContrlType: '',
      showDeclationFlag: false,
      transactionDecTitle: '( 请确认交易申报信息',
      showAddQuoteFlag: false,
      addQuoteTitle: '( 新建申报分段',
      quoteItem: {
        electricQuantity: '',
        electricPrice: '',
        startDate: '',
        endDate: ''
      },
      showChangePage: false
    }
  },
  mounted () {
    // 交易管理查询
    this.topPanelQuery()
    // 调控类型下拉查询
    this.declareTypeQuery()
    // 申报状态下拉查询
    this.declareStatusQuery()
    // 交易公告下拉查询
    // this.tradeNoticeQuery()
  },
  watch: {},
  methods: {
    onProtectLoadData () {
      this.loading = false
    },
    onProtectLoadDataPageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent
      this.pageSize = tmpPageSize
      this.total = total
    },
    topPanelQuery () {
      let _this = this
      _this.declareTable.declareAjaxData = _this.cloneSearch()
      this.current = 1
      setTimeout(() => {
        _this.getTableData()
      }, 100)
    },
    cloneSearch () {
      let clone = {}
      let contrlType = this.searchItem.declareTypeValue
      let declareDateEnd = this.searchItem.declareEndDate
      let declareCreateDate = this.searchItem.declareCreateDate
      let declareStatus = this.searchItem.declareStatusValue
      let tradeNo = this.searchItem.declareCode
      clone.contrlType = contrlType
      clone.declareDateEnd = declareDateEnd
      clone.declareCreateDate = declareCreateDate
      clone.declareStatus = declareStatus
      clone.tradeNo = tradeNo
      return clone
    },
    getTableData () {
      this.$refs.declareTable.onPageChange(this.current, this.pageSize)
    },
    // 调控类型下拉查询
    declareTypeQuery () {
      axios.request({
        url: 'ddlc/dropDownListQuery?type=CONTRL_TYPE',
        method: 'get'
      }).then(res => {
        if (res.data.code === 200) {
          this.searchItem.declareType = res.data.data
        }
      })
    },
    // 申报状态下拉查询
    declareStatusQuery () {
      axios.request({
        url: 'ddlc/dropDownListQuery?type=DECLARE_STATUS',
        method: 'get'
      }).then(res => {
        if (res.data.code === 200) {
          this.searchItem.declareStatus = res.data.data
        }
      })
    },
    // 交易公告下拉查询
    tradeNoticeQuery () {
      axios.request({
        url: 'tdc/tradeNoticeList',
        method: 'post'
      }).then(res => {
        if (res.data.code === 200 && res.data.data.length !== 0) {
          this.noticeOption = res.data.data
          this.noticeOptionValue = res.data.data[0].noticeId
          this.tradeNoticeList(res.data.data[0].noticeId)
        }
      })
    },
    // 选择申报状态
    selectDeclareStatus (value) {
      this.searchItem.declareStatusValue = value
    },
    // 选择申报类型
    selectDeclareType (value) {
      this.searchItem.declareTypeValue = value
    },
    // 选择申报开始时间
    declareCreateDateChange (date) {
      this.searchItem.declareCreateDate = date
    },
    // 选择申报结束时间
    declareEndDateChange (date) {
      this.searchItem.declareEndDate = date
    },
    // 新增申报
    addDeclaration () {
      this.showChangePage = true
      // 交易公告下拉查询
      this.tradeNoticeQuery()
    },
    // 选择交易公告
    selectNoticeType (value) {
      this.noticeOptionValue = value
      this.tradeNoticeList(value)
    },
    // 需求公告列表查询
    tradeNoticeList (noticeId) {
      axios.request({
        url: 'tdc/tradingPlatformDemandAnnouncement',
        data: noticeId,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          this.noticeTable.noticeData = res.data.data
          this.quotationInfoTable.quoteInfoData = res.data.data
          this.validBeginDate = res.data.data[0].validBeginDate
          this.validEndDate = res.data.data[0].validEndDate
        }
      })
    },
    // 电价详情
    goToDetail (params) {
      this.showTraPriceDetailFlag = true
      this.transactionPriceNo = params.row.tradeNo
      axios.request({
        url: 'tdc/tradingDeclarePrice',
        data: params.row.declareId,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          this.transactionPriceTable.transactionPriceData = res.data.data
        }
      })
    },
    closeModal (val) {
      if (val === false) {
        this.showTraPriceDetailFlag = false
      }
    },
    rowClassName (row, index) {
      return 'declaration-price-table-info-cell'
    },
    // 点击申报
    declarationClick () {
      if(this.noticeOptionValue === '') {
        return this.$Message.warning('暂无交易可以申报！')
      }
      this.showDeclationFlag = true
      this.confirmQuoteDecTable.quoteDecData = this.quotationInfoTable.quoteInfoData
      // 交易编号
      this.confirmTradeNo = accordTypeEvaluation(this.noticeOption, this.noticeOptionValue, 'tradeNo', 'noticeId')
      // 调控类型
      this.confirmContrlType = accordTypeEvaluation(this.noticeOption, this.noticeOptionValue, 'contrlType', 'noticeId')
      // 调控类型名称
      this.confirmDeclareTypeName = accordTypeEvaluation(this.searchItem.declareType, this.confirmContrlType, 'name', 'value')
    },
    // 点击取消
    cancelClick () {
      this.showChangePage = false
    },
    // 确认申报弹窗关闭
    closeTraDecModal (val) {
      if (val === false) {
        this.showDeclationFlag = false
      }
    },
    // 确认申报
    confirmDeclaration () {
      let params = {
        'contrlType': this.confirmContrlType,
        'tradeNo': this.confirmTradeNo,
        'tradePriceDetailReqs': this.confirmQuoteDecTable.quoteDecData
      }
      axios.request({
        url: 'tdc/newDeclaration',
        data: params,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200 && res.data.data) {
          this.$Message.success('申报成功!')
          this.showDeclationFlag = false
          this.showChangePage = false
          this.getTableData()
        } else {
          this.$Message.error('申报失败')
        }
      })
    },
    // 取消申报
    cancelDeclaration () {
      this.showDeclationFlag = false
    },
    // 新增报价
    addQuote () {
      this.showAddQuoteFlag = true
    },
    // 确认添加报价信息
    confirmAddQuote () {
      this.showAddQuoteFlag = false
    },
    // 取消添加报价信息
    cancelAddQuote () {
      this.showAddQuoteFlag = false
    },
    closeQuoteModal (val) {
      if (val === false) {
        this.showAddQuoteFlag = false
      }
    }
  }
}
</script>

<style lang="less">
 @import "transactionDeclaration.less";
</style>
