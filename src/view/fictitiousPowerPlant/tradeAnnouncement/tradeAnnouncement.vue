<template>
  <div>
    <div class="tradeAnnouncement-body" v-show="!showChangePage">
      <Card class="tradeAnnouncement">
        <div slot="title" class="tradeAnnouncement-header">
          <img src="./images/u2269.png" />
          <span class="span1">查询条件</span>
        </div>
        <div class="tradeAnnouncement-top">
          <Row class="tradeAnnouncement-top-row1">
            <i-col span="6">
              <div class="searchLine1">
                <span>公告名称</span>
                <i-input
                  placeholder="请输入..."
                  style="width: 150px"
                  v-model="searchList.noticeName"
                  @change="selectNoticeName"
                ></i-input>
              </div>
            </i-col>
            <i-col span="6">
              <div class="searchLine1">
                <span>公告状态</span>
                <i-select
                  style="width:150px"
                  v-model="searchList.pulishState"
                  @change="selectPulishState"
                >
                  <i-option
                    v-for="(item,index) in cityList1"
                    :value="item.value"
                    :key="index"
                  >{{ item.name }}</i-option>
                </i-select>
              </div>
            </i-col>
            <i-col span="12">
              <div class="searchLine1 searchLine2">
                <span>公告发布日期</span>
                <Date-picker
                  type="date"
                  placeholder="选择日期"
                  style="width: 150px"
                  v-model="searchList.pulishStartDate"
                  @on-change="selectPulishStartDate"
                  format="yyyy-MM-dd"
                  :clearable="false"
                ></Date-picker>
                <span>至</span>
                <Date-picker
                  type="date"
                  placeholder="选择日期"
                  style="width: 150px"
                  v-model="searchList.pulishEndDate"
                  @on-change="selectPulishEndDate"
                  format="yyyy-MM-dd"
                  :clearable="false"
                ></Date-picker>
              </div>
            </i-col>
          </Row>
          <Row class="tradeAnnouncement-top-row2">
            <i-col span="12">
              <div class="searchLine1">
                <span>调控类型</span>
                <i-select
                  style="width:150px"
                  v-model="searchList.contrlType"
                  @change="selectContrlType"
                >
                  <i-option
                    v-for="(item,index) in cityList2"
                    :value="item.value"
                    :key="index"
                  >{{ item.name }}</i-option>
                </i-select>
              </div>
            </i-col>
            <i-button @click="topPanelQuery" class="plantPlanEnquiry-list-btn1">
              <span>查询</span>
            </i-button>
          </Row>
        </div>
        <!-- 需求公示情况 -->
        <Card class="announcementForm">
          <div slot="title" class="announcementForm-header">
            <img src="./images/u2269.png" />
            <p>需求公示情况</p>
          </div>
          <div class="form">
            <Tables
              border
              ref="selectedTable"
              :columns="tableList.columns1"
              height="390"
              :loading="selectedResultLoading"
              :axiosUrl="tableList.axiosUrl"
              :axiosData="tableList.data1"
              @on-load-data="onSelectedLoadData"
              @on-load-data-page-info="onSelectedLoadDataPageInfo"
            ></Tables>
          </div>
          <!-- 详情弹窗 -->
          <Modal
            width="750"
            draggable
            title="分段需求详情"
            :value="showDetails"
            footer-hide
            closable
            @on-visible-change="closeModalFirst($event)"
          >
            <div class="showDetails">
              <h2>|||&nbsp;&nbsp;需求信息</h2>
              <div class="showDetails-box1">
                <span>交易编号:</span>
                <span>{{detailList.tradeNo}}</span>
              </div>
              <div class="showDetails-box2">
                <span>有效日期:</span>
                <span>{{detailList.validBeginDate}}~~{{detailList.validEndDate}}</span>
              </div>
              <div class="showDetails-box3">
                <span>发布日期:</span>
                <span>{{detailList.pulishDate}}</span>
              </div>
              <div class="showDetails-form">
                <i-table border :columns="columns2" :data="data2"></i-table>
              </div>
            </div>
          </Modal>
        </Card>
      </Card>
    </div>
    <div v-if="showChangePage">
      <div class="newDeclare">
        <div class="add-declaration-top">
          <div class="transaction-notice-box">
            <div class="add-info-title">||| 交易平台需求公告</div>
            <div class="transaction-notice-content">
              <div class="notice-select">
                <span>交易编号：{{announcementNo}}</span>
              </div>
              <div class="notice-date">
                <span>报价有效日期：{{nowStartDate}}~{{nowEndDate}}</span>
              </div>
              <div class="notice-table">
                <Table
                  :row-class-name="rowClassName"
                  :columns="noticeTable.noticeColumn"
                  :data="noticeTable.noticeData"
                ></Table>
              </div>
            </div>
          </div>
          <div class="quote-reference-box">
            <div class="add-info-title">||| 报价参考</div>
            <div class="input-top">
              <div>
                <span>固定投资均摊：</span>
                <Input v-model="costItem.investmentShare" style="width: 100px"></Input>元
              </div>
              <div>
                <span>运维费用：</span>
                <Input v-model="costItem.operationsCost" style="width: 100px"></Input>元
              </div>
              <div class="button">成本计算</div>
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
              <Table
                :row-class-name="rowClassName"
                :columns="quotationInfoTable.quoteInfoColumn"
                :data="quotationInfoTable.quoteInfoData"
              ></Table>
            </div>
            <div class="quote-btn">
              <div @click="declarationClick">申报</div>
              <div @click="cancelClick">取消</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--申报确认弹窗-->
    <Modal
      width="800"
      draggable
      :zIndex="1001"
      :value="showDeclationFlag"
      footer-hide
      closable
      @on-visible-change="closeTraDecModal($event)"
      :title="transactionDecTitle"
    >
      <div class="confirm-declaration-body">
        <div class="confirm-top">
          <p>
            交易编号：
            <span>{{announcementNo}}</span>
          </p>
          <p>
            调控类型：
            <span>{{controlType}}</span>
          </p>
        </div>
        <div class="confirm-table">
          <Table
            :row-class-name="rowClassName"
            :columns="confirmQuoteDecTable.quoteDecColumn"
            :data="confirmQuoteDecTable.quoteDecData"
          ></Table>
        </div>
        <div class="confirm-btn">
          <div @click="confirmDeclaration">确认</div>
          <div @click="cancelDeclaration">取消</div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Tables from '_c/tables'
import quotationReferenceCharts from './quotationReferenceCharts'
import costInfoCharts from './costInfoCharts'
import axios from '@/libs/api.request'
import { accordTypeEvaluation } from '../util.js'
import { getFormatDate, formatDate } from '@/libs/index'

export default {
  name: 'tradeAnnouncement',
  components: {
    Tables,
    quotationReferenceCharts,
    costInfoCharts,
    axios
  },
  data () {
    return {
      selectedResultLoading: false,
      detailList: {
        tradeNo: '',
        validBeginDate: '',
        pulishDate: '',
        validEndDate: ''
      },
      searchList: {
        pulishEndDate: '',
        pulishStartDate: '',
        contrlType: '',
        currPage: 1,
        pulishState: '',
        pageSize: 10,
        noticeName: ''
      },
      showChangePage: false,
      showDetails: false,
      tableList: {
        columns1: [
          {
            title: '序号',
            type: 'index',
            key: 'serialNumber',
            align: 'center',
            width: '75'
          },
          {
            title: '交易名称',
            key: 'noticeName',
            align: 'center',
            width: '240'
          },
          {
            title: '交易编号',
            key: 'tradeNo',
            align: 'center',
            width: '175'
          },
          {
            title: '发布时间',
            key: 'pulishDate',
            align: 'center',
            width: '210'
          },
          {
            title: '申报开始时间',
            key: 'validBeginDate',
            align: 'center',
            width: '210'
          },
          {
            title: '申报结束时间',
            key: 'validEndDate',
            align: 'center',
            width: '210'
          },
          {
            title: '需求详情',
            key: 'demandDetails',
            align: 'center',
            width: '105',
            render: (h, params) => {
              return h(
                'a',
                {
                  props: {
                    href: '#',
                    type: 'primary'
                  },
                  // style: {
                  //   color: "#ec1c24"
                  // },
                  on: {
                    click: () => {
                      this.goToDetailFirst(params)
                    }
                  }
                },
                '详情'
              )
            }
          },
          {
            title: '调控类型',
            key: 'contrlType',
            align: 'center',
            width: '105',
            render: (h, params) => {
              return h(
                'span',
                accordTypeEvaluation(
                  this.cityList2,
                  params.row.contrlType,
                  'name',
                  'value'
                )
              )
            }
          },
          {
            title: '状态',
            key: 'pulishState',
            align: 'center',
            width: '100',
            render: (h, params) => {
              if (params.row.pulishState === '01') {
                return h(
                  'a',
                  {
                    on: {
                      click: () => {
                        this.goToDeclare(params)
                      }
                    }
                  },
                  accordTypeEvaluation(
                    this.cityList1,
                    params.row.pulishState,
                    'name',
                    'value'
                  )
                )
              } else {
                return h(
                  'span',
                  accordTypeEvaluation(
                    this.cityList1,
                    params.row.pulishState,
                    'name',
                    'value'
                  )
                )
              }
            }
          }
        ],
        data1: {},
        axiosUrl: 'tpc/tradingPublicity'
      },
      columns2: [
        {
          title: '分段数',
          key: 'segmentNo',
          width: '90',
          align: 'center'
        },
        {
          title: '需求负荷（kW）',
          key: 'requireEnergy',
          width: '150',
          align: 'center'
        },
        {
          title: '开始时间',
          key: 'requireEnergyBeginDate',
          width: '150',
          align: 'center'
        },
        {
          title: '结束时间',
          key: 'requireEnergyEndDate',
          width: '150',
          align: 'center'
        }
      ],
      data2: [],
      cityList1: [],
      cityList2: [],
      noticeId: '',
      current: 1,
      pageSize: 25,
      total: 0,
      loading: false,
      showTraPriceDetailFlag: false,
      traPriceDetailModalTitle: '( 交易电价详情',
      costItem: {
        laborCost: '',
        investmentShare: '',
        operationsCost: '',
        operatingExpenses: ''
      },
      noticeOptionValue: '',
      noticeTable: {
        // 需求公告
        noticeColumn: [
          {
            title: '分段',
            key: 'segmentNo',
            align: 'center',
            width: '80'
          },
          // {
          //   title: "需求电量(kWh)",
          //   key: "declaredElectricity",
          //   align: "center",
          //   width: "150"
          // },
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
          }
          // {
          //   title: "指导电价(元)",
          //   key: "declaredElectricityPrice",
          //   align: "center",
          //   width: "150"
          // }
        ],
        noticeData: []
      },
      quotationInfoTable: {
        // 报价信息
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
            title: '申报电量(kWh)',
            key: 'declareEnergy',
            align: 'center',
            className: 'demo-table-info-column',
            width: '150',
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
                      this.quotationInfoTable.quoteInfoData[
                        params.index
                      ].declareEnergy = event.target.value
                      this.$set(params.row, '$isEdit', false)
                    }
                  }
                })
              } else {
                return h(
                  'div',
                  {
                    on: {
                      click: () => {
                        this.$set(params.row, '$isEdit', true)
                      }
                    }
                  },
                  params.row.declareEnergy
                )
              }
            }
          },
          {
            title: '申报电价(元)',
            key: 'declarePrice',
            align: 'center',
            className: 'demo-table-info-column',
            width: '150',
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
                      this.quotationInfoTable.quoteInfoData[
                        params.index
                      ].declarePrice = event.target.value
                      this.$set(params.row, '$isEdit', false)
                    }
                  }
                })
              } else {
                return h(
                  'div',
                  {
                    on: {
                      click: () => {
                        this.$set(params.row, '$isEdit', true)
                      }
                    }
                  },
                  params.row.declarePrice
                )
              }
            }
          }
        ],
        quoteInfoData: []
      },
      confirmQuoteDecTable: {
        // 申报确认
        quoteDecColumn: [
          {
            title: '分段',
            key: 'segmentNo',
            align: 'center',
            width: '70'
          },
          {
            title: '申报电量(kWh)',
            key: 'declareEnergy',
            align: 'center',
            width: '160'
          },
          {
            title: '开始时间',
            key: 'requireEnergyBeginDate',
            align: 'center',
            width: '190'
          },
          {
            title: '结束时间',
            key: 'requireEnergyEndDate',
            align: 'center',
            width: '190'
          },
          {
            title: '申报电价(元)',
            key: 'declarePrice',
            align: 'center',
            width: '140'
          }
        ],
        quoteDecData: []
      },
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
      announcementNo: '', // 交易公告
      nowStartDate: '', // 报价有效日期
      nowEndDate: '', // 报价有效日期
      declareDataList: {}, // 点击申报按钮数据
      controlType: '',
      controlNumberType: ''
    }
  },
  mounted () {
    let _this = this
    _this.getPulishStateData()
    _this.getContrlTypeData()
    let from = _this.$route.query.from
    let params = _this.$route.params
    if (from === 'tradeModal') {
      _this.searchList.noticeName =
        params.noticeName === null ? '' : params.noticeName
      // _this.searchList.pulishState = params.pulishState === null ? "" : params.pulishState;
      // _this.searchList.pulishStartDate = params.pulishStartDate === null ? "" : params.pulishStartDate;
      // _this.searchList.pulishEndDate = params.pulishStartDate === null ? "" : formatDate(params.pulishDate, 1);
      _this.searchList.contrlType =
        params.contrlType === null ? '' : params.contrlType
    }
    _this.$nextTick(() => {
      _this.topPanelQuery()
    })
  },
  methods: {
    selectNoticeName (val) {
      this.searchList.noticeName = val
    },
    selectPulishState (val) {
      this.searchList.pulishState = val
    },
    selectPulishStartDate (val) {
      console.log(val)
      this.searchList.pulishStartDate = val
    },
    selectPulishEndDate (val) {
      this.searchList.pulishEndDate = val
    },
    selectContrlType (val) {
      this.searchList.contrlType = val
    },

    onSelectedLoadData () {
      this.selectedResultLoading = false
    },
    onSelectedLoadDataPageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent
      this.pageSize = tmpPageSize
      this.total = total
    },
    // 搜索按钮
    topPanelQuery () {
      let _this = this
      _this.tableList.data1 = _this.cloneSearch()
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
      let noticeName = this.searchList.noticeName
      let pulishState = this.searchList.pulishState
      let pulishStartDate = this.searchList.pulishStartDate
      let pulishEndDate = this.searchList.pulishEndDate
      let contrlType = this.searchList.contrlType
      clone.noticeName = noticeName
      clone.pulishState = pulishState
      clone.pulishStartDate = pulishStartDate
      clone.pulishEndDate = pulishEndDate
      clone.contrlType = contrlType
      return clone
    },

    // 公告下拉框
    getPulishStateData () {
      var _this = this
      axios
        .request({
          method: 'get',
          url: 'ddlc/dropDownListQuery?type=PULISH_STATE'
        })
        .then(res => {
          // console.log(res);
          if (res.status === 200 && res.data.code !== null) {
            _this.cityList1 = res.data.data
          }
        })
    },
    // 调控状态下拉框
    getContrlTypeData () {
      var _this = this
      axios
        .request({
          method: 'get',
          url: 'ddlc/dropDownListQuery?type=CONTRL_TYPE'
        })
        .then(res => {
          // console.log(res);
          if (res.status === 200 && res.data.code !== null) {
            _this.cityList2 = res.data.data
          }
        })
    },
    // 点击详情
    goToDetailFirst (data) {
      this.showDetails = true
      var _this = this
      let noticeId = { noticeId: data.row.noticeId }
      axios
        .request({
          method: 'post',
          data: noticeId,
          url: 'tpc/demandDetails'
        })
        .then(res => {
          console.log(res)
          if (res.status === 200 && res.data.code !== null) {
            _this.data2 = res.data.data.publicDetailsResps
            _this.detailList.tradeNo = res.data.data.tradeNo
            _this.detailList.pulishDate = res.data.data.pulishDate
            _this.detailList.validBeginDate = res.data.data.validBeginDate
            _this.detailList.validEndDate = res.data.data.validEndDate
          }
        })
        .catch(err => {
          console.log('err:' + err)
        })
    },
    // 点击状态
    goToDeclare (data) {
      var _this = this
      _this.announcementNo = data.row.tradeNo
      _this.showChangePage = true
      let noticeId = data.row.noticeId
      let controlType = data.row.contrlType
      axios
        .request({
          method: 'post',
          data: noticeId,
          url: 'tdc/tradingPlatformDemandAnnouncement'
        })
        .then(res => {
          console.log(res)
          if (res.status === 200 && res.data.code !== null) {
            _this.nowStartDate = res.data.data[0].validBeginDate
            _this.nowEndDate = res.data.data[0].validEndDate
            _this.noticeTable.noticeData = res.data.data
            _this.controlNumberType = controlType
            _this.quotationInfoTable.quoteInfoData = res.data.data
            if (controlType === '01') {
              _this.controlType = '削峰'
            } else {
              _this.controlType = '填谷'
            }
            _this.declareDataList = res.data.data
          }
        })
        .catch(err => {
          console.log('err:' + err)
        })
    },
    closeModalFirst (val) {
      if (val === false) {
        this.showDetails = false
      }
    },
    rowClassNameFirst (row, index) {
      if (index === 0) {
        return 'demo-table-info-row'
      }
    },
    rowClassName (row, index) {
      return 'declaration-price-table-info-cell'
    },
    // 点击申报
    declarationClick () {
      var _this = this
      _this.showDeclationFlag = true
      _this.confirmQuoteDecTable.quoteDecData = _this.declareDataList
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
      var _this = this
      _this.showDeclationFlag = false
      console.log(_this.declareDataList)
      let data = {
        contrlType: _this.controlNumberType,
        tradeNo: _this.announcementNo,
        tradePriceDetailReqs: [
          {
            beginDate: _this.nowStartDate,
            endDate: _this.nowEndDate,
            declareEnergy: _this.declareDataList[0].declareEnergy,
            declarePrice: _this.declareDataList[0].declarePrice,
            requireEnergyBeginDate:
              _this.declareDataList[0].requireEnergyBeginDate,
            requireEnergyEndDate: _this.declareDataList[0].requireEnergyEndDate,
            segmentNo: _this.declareDataList[0].segmentNo
          }
        ]
      }
      axios
        .request({
          method: 'post',
          data: data,
          url: 'tdc/newDeclaration'
        })
        .then(res => {
          console.log(res)
          if (res.status === 200 && res.data.code !== null) {
            // _this.tradeOffStatusList = res.data.data;
          }
        })
      _this.topPanelQuery()
      _this.showChangePage = false
      _this.$Message.success('申报成功', {
        top: 50
      })
    },
    // 取消申报
    cancelDeclaration () {
      var _this = this
      _this.showDeclationFlag = false
    }
  },
  watch: {
    $route (newRoute) {
      const { name, query, params, meta } = newRoute
      if (query.from === 'tradeModal') {
        let _this = this
        _this.searchList.noticeName =
          params.noticeName === null ? '' : params.noticeName
        // _this.searchList.pulishState = params.pulishState === null ? "" : params.pulishState;
        // _this.searchList.pulishStartDate = params.pulishStartDate === null ? "" : params.pulishStartDate;
        // _this.searchList.pulishEndDate = params.pulishStartDate === null ? "" : formatDate(params.pulishDate, 1);
        _this.searchList.contrlType =
          params.contrlType === null ? '' : params.contrlType
        _this.$nextTick(() => {
          _this.topPanelQuery()
        })
      }
    }
  }
}
</script>
<style lang="less">
@import "./tradeAnnouncement.less";
</style>
