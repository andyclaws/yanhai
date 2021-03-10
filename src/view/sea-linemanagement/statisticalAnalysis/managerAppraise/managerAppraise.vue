<template>
  <div class="managerAnalysis">
    <!--搜索面板-->
    <div class="searchBar" :style="{height: searchBarFlag ? '100px' : '0', overflow: 'hidden'}">
      <Form ref="searchBarForm" :model="searchBarForm" :rules="ruleValidate" :label-width="100">
        <Row>
          <Col span="8">
            <FormItem label="供电单位" prop="orgNo">
              <Poptip trigger="click"
                      placement="bottom"
                      v-model="showOrgFlag">
                <Input search
                       enter-button
                       v-model="searchBarForm.orgName"
                       :placeholder="$t('please_input_org')"
                       style="width: 100%"/>
                <div slot="content" style="max-height: 300px; overflow-y: auto">
                  <orgs
                    :show-refresh-text="false"
                    @on-select="selectOrg"/>
                </div>
              </Poptip>
            </FormItem>
          </Col>
          <!--<Col span="6">-->
          <!--<FormItem label="台区名称" prop="tgName">-->
          <!--<Input v-model="searchBarForm.tgName" placeholder="&#45;&#45;请输入&#45;&#45;" clearable/>-->
          <!--</FormItem>-->
          <!--</Col>-->
          <Col span="9">
            <FormItem label="台区经理" prop="manager">
              <Input v-model="searchBarForm.custManagerName" placeholder="--请输入--" clearable/>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem>
              <Button type="primary" @click="topPanelQuery('searchBarForm')">查询</Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem prop="dateType"
                      label="时间纬度">
              <RadioGroup v-model="searchBarForm.dateType" @on-change="changeDayOrMonth">
                <Radio label="day" aria-checked="true"><span>日</span></Radio>
                <Radio label="month"><span>月</span></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="选择日期" prop="date">
              <DatePicker type="date"
                          :value="searchBarForm.date"
                          v-if="searchBarForm.dateType === 'day'"
                          @on-change="searchBarForm.date=$event"
                          :clearable=false
                          :options="selectDateDayOptions"
                          placeholder="默认前一日"
                          style="width: 150px"></DatePicker>
              <DatePicker type="month"
                          :value="searchBarForm.date"
                          v-if="searchBarForm.dateType === 'month'"
                          @on-change="searchBarForm.date=$event"
                          :clearable=false
                          placeholder="默认当前月"
                          style="width: 150px"></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
          </Col>
          <!--<Col span="6">-->
          <!--</Col>-->
        </Row>
      </Form>
    </div>
    <div style="position:relative">
      <!--表单切换显示-->
      <div v-for="(item,index) in list" :key="index" v-show="changeFlag">
        <div style="clear: both;" v-if="index % 2 === 0"></div>
        <card-item
          :item="item"
          :index="index"
        />
      </div>
      <!--表格切换显示-->
      <div v-show="!changeFlag">
        <Col span="24">
          <Tables
            ref="tables"
            border
            :columns="columns"
            :axiosUrl="initialUrl"
            :filename="'台区经理表格'"
            :axiosData="initialQueryItem"
            stripe
            :height="tableHeight"
            @on-load-data="onLoadCustManagerData"
            :row-class-name="rowClassName"
            :current="resTgListData.currPage"
            @on-load-data-page-info="getTablePageInfo"/>
        </Col>
      </div>
      <div v-if="changeFlag" style="clear: both; margin-left: 20px">
        <Page @on-change="changePage" @on-page-size-change="changePageSize"
              :current.sync="resTgListData.currPage"
              :total="parseInt(resTgListData.totalCount)"
              :page-size="resTgListData.pageSize"
              :page-size-opts="resTgListData.pageSizeOpts"
              size="small" prev-text="上一页" next-text="下一页"
              show-total   show-elevator />
      </div>

      <!--右侧悬浮菜单-->
      <div class="buttonBox">
        <div class="buttonBoxDiv" @click="searchBarFlag=!searchBarFlag">
          <img class="buttonBoxImgSearch" src="../../images/u48796.png" alt="搜索"/>
        </div>
        <div class="buttonBoxDiv buttonBoxDivChange" @click="changeFlag=!changeFlag">
          <p v-if="changeFlag">表格切换</p>
          <p v-if="!changeFlag">表单切换</p>
        </div>

        <div class="buttonBoxDiv buttonBoxDivFilter"
             @click="showReport('accountManagerAnalysisReport')">
          <img class="buttonBoxImg" src="../../images/target_analysis.png" alt="指标分析"/>
          <Row>指标分析</Row>
        </div>
        <div class="buttonBoxDiv buttonBoxDivFilter"
             @click="showReport('accountManagerResultReport')">
          <img class="buttonBoxImg" src="../../images/run_effect.png"  alt="治理成效"/>
          <Row>治理成效</Row>
        </div>
        <!--<div class="buttonBoxDiv buttonBoxDivFilter">
          <router-link to="tgManagerRelate" tag="div">
          <img class="buttonBoxImg" src="../../images/run_effect.png"  alt="治理成效"/>
          <Row>台区经理管辖台区维护</Row>
          </router-link>
        </div>-->

        <div class="menu-bottom">
          <div class="buttonBoxDiv buttonBoxImgMenuBackground" @click="linkBoxFlag=!linkBoxFlag">
            <img class="buttonBoxImgMenu" src="../../images/u48802.png" alt="菜单"/>
          </div>
          <div class="linkBox" v-show="linkBoxFlag">
            <router-link to="syntheticalAnalysis" class="comprehensive" tag="div">
              <div>
                <img src="../../images/u48815.png"/>
              </div>
              综合分析
            </router-link>
            <router-link to="orgManagement" class="org_Management" tag="div">
              <div>
                <img src="../../images/u48824.png"/>
              </div>
              单位管控
            </router-link>
            <router-link to="managerAppraise" class="manager_Appraise  selected" tag="div">
              <div>
                <img src="../../images/u41495.png"/>
              </div>
              台区经理评价
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <sea-modal ref="seaModal"
               :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.8 + 'px'"
               :title="title"
               :titleStyle="'1'"
               :subTitle="subTitle"
               :dateType="dateType"
               :dateRange="seaModalDateRange"
               :tabs="tabs"
               @change-tab="changeTab"
               @sea-model-query="seaModelQuery">
      <div slot="trendAnalysis" >
          <trendAnalysis ref="trendA"
                         :refreshDataTrigger="refreshDataTrigger"
                         :queryItems="initialQueryItem"
                         :queryDateRange="trendQueryDateRange"
                         @change-lineLoss-queryType="changeLineLossQueryType"
                         @change-lineLoss-day="changeLineLossDay"></trendAnalysis>
      </div>
      <div slot="analysisReport">
         <analysisReport
           ref="analysisReport"
           :cust-manager-no="reportForm.reportCustManagerNo"
           :query-date="reportForm.date"
           :query-date-type="reportForm.dateType"
           @analysis-date-change="analysisDateChange"
           @analysis-query="analysisQuery"/>
      </div>
    </sea-modal>
    <Modal
      v-model="layerShow"
      :styles="{background: 'black'}"
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9 + 'px'"
      :value="true"
      draggable
      footer-hide
      :title="modalTitle">
      <component
        :ref="componentRef"
        :is="componentName"
        :title="sonTitle"
        :axiosUrl="axiosUrl"
        :queryData="queryData"/>
    </Modal>
    <Modal
      v-model="accountManagerAnalysisReport"
      title="台区经理指标分析报告"
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9 + 'px'"
      footer-hide
      draggable>
      <!--指标分析  -->
      <targetAnalysisModal
          ref="targetAnalysisModal"
          :report="report"
          :org-no="reportForm.orgNo"
          :org-type="reportForm.orgType"
          :date="reportForm.date"
          :date-type="reportForm.dateType"/>
    </Modal>
     <Modal
       v-model="accountManagerResultReport"
       title="台区经理治理成效报告"
       :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9 + 'px'"
       footer-hide
       draggable>
       <!--治理成效 -->
       <runEffectModal
         ref="runEffectModal"
         :report="report"
         :org-no="reportForm.orgNo"
         :org-type="reportForm.orgType"
         :date="reportForm.date"
         :date-type="reportForm.dateType"/>
    </Modal>
  </div>

</template>

<script>
import { modalsData } from './modalsData'
import Tables from '_c/tables'
import { formatDate } from '@/libs/index'
import axios from '@/libs/api.request'
export default {
  name: 'managerAppraise',
  components: {
    CardItem: () => import('./card-item'),
    fcGcTgDetail: () => import('./managerAppraiseSub/fcGcTgDetail.vue'),
    abnormalTgModal: () => import('./managerAppraiseSub/abnormalTgModal.vue'),
    tgMeterModal: () => import('./managerAppraiseSub/tgMeterModal.vue'),
    terminalCntModal: () => import('./managerAppraiseSub/terminalCntModal.vue'),
    tgModal: () => import('./managerAppraiseSub/tgModal.vue'),
    monitorModal: () => import('./managerAppraiseSub/monitorModal.vue'),
    coverReadModal: () => import('./managerAppraiseSub/coverReadModal.vue'),
    costControlModal: () => import('./managerAppraiseSub/costControlModal.vue'),
    collectFailModal: () => import('./managerAppraiseSub/collectFailModal.vue'),
    measureExceptionModal: () => import('./managerAppraiseSub/measureExceptionModal.vue'),
    elecExceptionModal: () => import('./managerAppraiseSub/elecExceptionModal.vue'),
    fileExceptionModal: () => import('./managerAppraiseSub/fileExceptionModal.vue'),
    suspectedPowerModal: () => import('./managerAppraiseSub/suspectedPowerModal.vue'),
    disTranExceptionModal: () => import('./managerAppraiseSub/disTranExceptionModal.vue'),
    trendAnalysis: () => import('./managerAppraiseSub/trendAnalysis.vue'),
    analysisReport: () => import('./managerAppraiseSub/analysisReport.vue'),
    SeaModal: () => import('_c/sea-modal'),
    targetAnalysisModal: () => import('./managerAppraiseSub/targetAnalysisModal.vue'),
    runEffectModal: () => import('./managerAppraiseSub/runEffectModal.vue'),
    Orgs: () => import('_c/common-select-box/components/org'),
    Tables
  },
  props: {
    // 首次进入页面时初始化请求url地址
    initialUrl: {
      type: String,
      default () {
        return '/sea-lineLose/custManagerAssess/queryCustManagerInfo'
      }
    },
    // 初始化请求页面默认查询条件
    initialQueryItem: {
      type: Object,
      default () {
        return {
          'orgName': this.$store.state.auth.orgName,
          'orgNo': this.$store.state.auth.orgNo,
          'orgType': this.$store.state.auth.orgType,
          'date': formatDate(undefined, -1), // 首次进入页面时初始化默认时间
          'dateType': 'day', // 初始化页面默认查询日维度
          'custManagerName': ''
        }
      }
    }
  },
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      modalTitle: '',
      componentName: '',
      componentRef: '',
      lineLossQueryType: '0', // 柱状图高损
      lineLossDay: 7, // 柱状图天数
      analysisDate: '', // 分析结果组件传回来的日期
      analysisHtml: '', // 分析结果的html
      threadModelItem: {},
      refreshDataTrigger: false, // 用于触发趋势分析弹窗中数据初始化加载与刷新
      columns: [
        {
          title: '台区经理',
          key: 'custManagerName',
          sortable: true,
          width: 150
        }, {
          title: '台区经理联系方式',
          key: 'custManagerMobileNo',
          sortable: true,
          width: 150
        }, {
          title: '下辖分布式电源台区数',
          sortable: true,
          key: 'fcGcTgNum',
          width: 150
        }, {
          title: '合格台区总数',
          key: 'linelossNormalTgNum',
          sortable: true,
          width: 150
        }, {
          title: '停运台区数',
          key: 'stopTgNum',
          sortable: true,
          width: 150
        }, {
          title: '拆除台区数',
          sortable: true,
          key: 'removeTgNum',
          width: 150
        }, {
          title: '运行台区数',
          sortable: true,
          key: 'runTgNum',
          width: 150
        }, {
          title: '终端数',
          sortable: true,
          key: 'tmnlNum',
          width: 150
        }, {
          title: '管辖台区主表数',
          sortable: true,
          key: 'mainMetNum',
          width: 150
        }, {
          title: '户表数',
          key: 'consMetNum',
          sortable: true,
          width: 150
        }, {
          title: '分布式电源用户数',
          sortable: true,
          key: 'fcGcConsNum',
          width: 150
        }, {
          title: '线损治理率',
          key: 'lineLossRemoveLackRate',
          sortable: true,
          width: 150
        }, {
          title: '本月线损计划治理台区数',
          sortable: true,
          key: 'planRemoveLackTgNum',
          width: 150
        }, {
          title: '本月线损实际治理台区数',
          sortable: true,
          key: 'realRemoveLackTgNum',
          width: 150
        }, {
          title: '新增异常台区数',
          sortable: true,
          key: 'newExecptTgNum',
          width: 150
        }, {
          title: '管辖台区线损合格率',
          sortable: true,
          key: 'mtgLLSuccRate',
          width: 150
        }, {
          title: '总发电量',
          sortable: true,
          key: 'gpq',
          width: 150
        }, {
          title: '总供电量',
          sortable: true,
          key: 'ppq',
          width: 150
        }, {
          title: '总售电量',
          sortable: true,
          key: 'spq',
          width: 150
        }, {
          title: '总线损电量',
          sortable: true,
          key: 'lossPq',
          width: 150
        }, {
          title: '总线损率',
          sortable: true,
          key: 'lllr',
          width: 150
        }, {
          title: '管辖台区可在线监测率',
          sortable: true,
          key: 'isMonitorTgRate',
          width: 150
        }, {
          title: '管辖台区可在线监测率（分子）',
          sortable: true,
          key: 'isMonitorTgFailNum',
          width: 150
        }, {
          title: '管辖台区可在线监测率（分母）',
          sortable: true,
          key: 'isMonitorTgAllNum',
          width: 150
        }, {
          title: '采集覆盖率',
          sortable: true,
          key: 'metCoverRate',
          width: 150
        }, {
          title: '采集覆盖率（分子）',
          key: 'metCoverFailNum',
          sortable: true,
          width: 150
        }, {
          title: '采集覆盖率（分母）',
          sortable: true,
          key: 'metCoverAllNum',
          width: 150
        }, {
          title: '管辖台区示值成功率',
          key: 'ivSuccRate',
          sortable: true,
          width: 150
        }, {
          title: '费控成功率',
          sortable: true,
          key: 'costCtrSuccRate',
          width: 150
        }, {
          title: '费控成功率（分子）',
          sortable: true,
          key: 'costCtrSuccFailNum',
          width: 150
        }, {
          title: '费控成功率（分母）',
          sortable: true,
          key: 'costCtrSuccAllNum',
          width: 150
        }, {
          title: '负损台区总数',
          sortable: true,
          key: 'linelossLowTgNum',
          width: 150
        }, {
          title: '高损台区总数',
          sortable: true,
          key: 'linelossHighTgNum',
          width: 150
        }, {
          title: '不可算台区总数',
          sortable: true,
          key: 'linelossNocalcTgNum',
          width: 150
        }, {
          title: '电量计算失败',
          sortable: true,
          key: 'meterValueCalFailNum',
          width: 150
        }, {
          title: '疑似窃电台区数',
          sortable: true,
          key: 'elecStealNum',
          width: 150
        }, {
          title: '配变异常数',
          sortable: true,
          key: 'transforExecptNum',
          width: 150
        }, {
          title: '小电量台区数',
          sortable: true,
          key: 'amallPqTgNum',
          width: 150
        }, {
          title: '档案异常涉及台区数',
          sortable: true,
          key: 'archExecptTgNum',
          width: 150
        }, {
          title: '计量异常涉及台区数',
          sortable: true,
          key: 'calcExecptTgNum',
          width: 150
        }, {
          title: '用电异常涉及台区数',
          sortable: true,
          key: 'elecExecptTgNum',
          width: 150
        }, {
          title: '数据时间',
          sortable: true,
          key: 'date',
          width: 150
        }
      ],
      selectDateDayOptions: {
        shortcuts: [
          {
            text: '今天',
            value () {
              return formatDate(undefined, undefined)
            }
          }, {
            text: '昨日',
            value () {
              return formatDate(undefined, -1)
            }
          }, {
            text: '上周',
            value () {
              return formatDate(undefined, -7)
            }
          }
        ]
      },
      queryData: {}, // 传递到子组件的查询参数
      axiosUrl: '',
      // axiosUrlBottom: '',
      orgList: [
        { orgNo: '63101', orgName: '青海省电力公司' }
      ],
      date: '',
      dateType: 'dateRange',
      tgId: '',
      searchDate: '', // 顶部搜索的日期
      showOrgFlag: false,
      searchBarForm: {
        orgName: this.initialQueryItem['orgName'],
        orgNo: this.initialQueryItem['orgNo'],
        orgType: this.initialQueryItem['orgType'],
        date: this.initialQueryItem['date'],
        dateType: this.initialQueryItem['dateType'],
        custManagerName: this.initialQueryItem['custManagerName']
      },
      totalCount: 0,
      method: '',
      tgStatus: '',
      sonTitle: '',
      linelossType: '',
      tgNums: '',
      runTgNum: '',
      mtgLLSuccRate: '',
      lllrDiff: '',
      lllrSequ: '',
      report: {},
      barData: [],
      analysisResult: [],
      dataCount: 0, // 总条数
      pageCurrent: 1, // 当前页
      pageSize: 25, // 每页显示多少条
      resTgListData: {
        pageSizeOpts: [25, 50, 100, 200, 500],
        currPage: 1,
        pageSize: 25,
        totalCount: 0,
        totalPage: 0
      },
      ruleValidate: {
        orgNo: [
          { required: true, message: '供电单位不能为空', trigger: 'blur' }
        ],
        dateType: [
          { required: true, message: '请选择查询维度', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '查询日期不能为空', trigger: 'blur' }
        ]
      },
      // 趋势分析的时间范围参数
      trendQueryDateRange: [ formatDate(this.initialQueryItem['date'], -7),
        this.initialQueryItem['date'], this.initialQueryItem['dateType']],
      seaModalDateRange: [],
      searchBarFlag: true,
      changeFlag: true,
      linkBoxFlag: false,
      index: 0,
      title: '',
      subTitle: '',
      score: '',
      custManagerHead: '',
      dateHead: '',
      dateTypeHead: '',
      custManagerItem: {},
      scoreShow: '',
      tabs: [
        { title: '趋势分析', name: 'trendAnalysis', pic: 'errorAnalysisPic', activePic: 'errorAnalysisActivePic', active: true },
        { title: '分析报告', name: 'analysisReport', pic: 'lineLoseAnalysisPic', activePic: 'lineLoseAnalysisActivePic' }
      ],
      layerShow: false,
      accountManagerResultReport: false,
      accountManagerAnalysisReport: false,
      imgP: false,
      imgT: false,
      list: [],
      reportForm: {
        // report form
        orgNo: this.initialQueryItem['orgNo'],
        orgType: this.initialQueryItem['orgType'],
        date: this.initialQueryItem['date'],
        dateType: this.initialQueryItem['dateType'],
        reportCustManagerNo: ''
      },
      tableHeight: 600
    }
  },
  methods: {
    // seamodel里分析报告日期选择框数值改变
    // todo miss
    analysisDateChange (value, selectDate) {
      this.analysisDate = value
      this.selectDate = selectDate
    },
    rowClassName (row) {
      if (row.LR > 30) {
        return 'alarm-row'
      } else if (row.LR > 20) {
        return 'high-row'
      }
      return ''
    },
    // 柱状图天数
    changeLineLossDay (lineLossDay) {
      this.lineLossDay = lineLossDay
    },
    // 柱状图高损负损
    changeLineLossQueryType (lineLossQueryType) {
      this.lineLossQueryType = lineLossQueryType
    },
    // 重写Seamodel的分析报告查询方法
    // todo miss
    analysisQuery (subTitle, title) {
      this.subTitle = subTitle
      this.title = title
      axios.request({
        method: 'post',
        data: {
          startTime: this.analysisDate,
          endTime: this.analysisDate,
          custManager: this.initialQueryItem.custManagerHead,
          date: this.analysisDate,
          dateType: this.selectDate
        },
        url: '/sea-lineLose/custManagerAssess/queryAnalysisResult'
      }).then(res => {
        this.analysisResult = res.data.data.list[0]
      })
    },
    // 重写seamodel的查询方法
    seaModelQuery (dateRangeString, seaModelItem) {
      // if(this.initialQueryItem['dateType'] == 'day'){
      if (dateRangeString[0].length > 7 && dateRangeString[1].length > 7) {
        if (dateRangeString[0].substr(0, 7) === dateRangeString[1].substr(0, 7)) {
          this.trendQueryDateRange = dateRangeString
          this.refreshDataTrigger = !this.refreshDataTrigger
        } else {
          this.$Message.error('选择日期需要在同一个月')
        }
      } else {
        if (dateRangeString[0].substr(0, 4) === dateRangeString[1].substr(0, 4)) {
          this.trendQueryDateRange = dateRangeString
          this.refreshDataTrigger = !this.refreshDataTrigger
        } else {
          this.$Message.error('选择日期需要在同一年')
        }
      }
    },
    getTrendAnalysisSubtitle (subTitle, title) {
      this.subTitle = subTitle
      this.title = title
    },
    changeDayOrMonth (value) {
      if (value === 'day') {
        let ppqs = document.getElementsByClassName('custManagerTotalPpq')
        let gpqs = document.getElementsByClassName('custManagerTotalSpq')
        let spqs = document.getElementsByClassName('custManagerTotalGpq')
        for (let i = 0; i < ppqs.length; i++) {
          let ppq = ppqs[i]
          let gpq = gpqs[i]
          let spq = spqs[i]
          ppq.textContent = '日总供电量'
          gpq.textContent = '日总发电量'
          spq.textContent = '日总售电量'
        }
        this.searchBarForm.date = this.searchBarForm.date + '-01'
      } else if (value === 'month') {
        let ppqs = document.getElementsByClassName('custManagerTotalPpq')
        let gpqs = document.getElementsByClassName('custManagerTotalSpq')
        let spqs = document.getElementsByClassName('custManagerTotalGpq')
        for (let i = 0; i < ppqs.length; i++) {
          let ppq = ppqs[i]
          let gpq = gpqs[i]
          let spq = spqs[i]
          ppq.textContent = '月总供电量'
          gpq.textContent = '月总发电量'
          spq.textContent = '月总售电量'
        }
        this.searchBarForm.date = this.searchBarForm.date.substring(0, 7)
      }
    },
    setNullCard () {
      // 为了页面不空白，展示空卡片
      let arr = []
      for (let i = 0; i < 1; i++) {
        arr.push({
          'custManagerMobileNo': '',
          'custManagerName': '',
          'custManager': '',
          'custManagerRank': '',
          'accountManagerName': '',
          'custManagerRankAll': '',
          'custManagerScore': '',
          'fcGcTgNum': '',
          'stopTgNum': '',
          'linelossNormalTgNum': '',
          'removeTgNum': '',
          'runTgNum': '',
          'tmnlNum': '',
          'mainMetNum': '',
          'consMetNum': '',
          'fcGcConsNum': '',
          'lineLossRemoveLackRate': '',
          'planRemoveLackTgNum': '',
          'realRemoveLackTgNum': '',
          'newExecptTgNum': '',
          'mTgLLSuccRate': '',
          'ppq': '',
          'spq': '',
          'lossPq': '',
          'lLlr': '',
          'isMonitorTgRate': '',
          'isMonitorTgFailNum': '',
          'isMonitorTgAllNum': '',
          'metCoverRate': '',
          'metCoverFailNum': '',
          'metCoverAllNum': '',
          'ivSuccRate': '',
          'costCtrSuccRate': '',
          'costCtrSuccFailNum': '',
          'costCtrSuccAllNum': '',
          'linelossLowTgNum': '',
          'linelossHighTgNum': '',
          'linelossNocalcTgNum': '',
          'meterValueCalFailNum': '',
          'elecStealNum': '',
          'transforExecptNum': '',
          'amallPqTgNum': '',
          'calcExecptTgNum': '',
          'elecExecptTgNum': '',
          'date': ''
        })
      }
      this.list = arr
      this.$Message.info('客户经理信息表格无数据!')
    },
    // 初始化页面function
    initOrgManagementPageQuery: function () {
      this.seaModalDateRange = [formatDate(this.searchBarForm.date, -7), formatDate(this.searchBarForm.date, 0)]
      this.$refs.tables.queryTableData()
      setTimeout(() => {
        this.searchBarFlag = false
      }, 1200)

      // report baseDate
      this.reportForm.orgNo = this.searchBarForm.orgNo
      this.reportForm.orgType = this.searchBarForm.orgType
      this.reportForm.date = this.searchBarForm.date
      this.reportForm.dateType = this.searchBarForm.dateType
    },
    onLoadCustManagerData (insideTableData) {
      if (insideTableData) {
        if (insideTableData.length > 0) {
          this.queryCustManagerDetail(insideTableData)
          // this.list = insideTableData
        } else {
          this.setNullCard()
        }
      }
    },
    queryCustManagerDetail (insideTableData) {
      this.list = insideTableData
      let custInfo = ''
      insideTableData.forEach(obj => {
        custInfo += `${obj.custManager},`
      })
      let data = {
        orgNo: this.initialQueryItem['orgNo'],
        orgType: this.initialQueryItem['orgType'],
        date: this.initialQueryItem['date'],
        custManagers: custInfo,
        dateType: this.initialQueryItem['dateType']
      }
      axios.request({
        method: 'post',
        url: '/sea-lineLose/custManagerAssess/accountManagerAssessSynthInfo',
        data: data
      }).then(res => {
        if (res.status === 200 && res.data.data) {
          // 返回天数（int）
          if (res.data.data) {
            let resMap = res.data.data
            if (Object.keys(resMap).length > 0) {
              for (let i = 0; i < this.list.length; i++) {
                for (let k in resMap) {
                  if (this.list[i].custManager === k) {
                    this.list[i] = resMap[k]
                    // 重新渲染
                    this.list.push()
                    // this.resTgListData = this.list
                  }
                }
              }
            } else {
              if (this.exStatus !== '' && this.exStatus !== '-1') {
                this.setNullCard()
              }
            }
          }
        }
      })
    },
    // 面板最上面的查询方法
    topPanelQuery: function (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.initialQueryItem['orgNo'] = this.searchBarForm.orgNo
          this.initialQueryItem['orgType'] = this.searchBarForm.orgType
          this.initialQueryItem['date'] = this.searchBarForm.date
          this.initialQueryItem['custManagerName'] = this.searchBarForm.custManagerName
          this.initialQueryItem['dateType'] = this.searchBarForm.dateType
          this.initOrgManagementPageQuery()
        } else {
          this.$Message.error('请补充查询条件')
        }
      })
    },
    // 重写seamodel的切换页面方法
    changeTab (clickedTab, clickedTabName) {
      this.title = '<div style="color: #fff; font-size: 18px">台区经理：' + this.custManagerItem.custManagerName + '</div>'
      if (clickedTabName === 'analysisReport') {
        this.scoreShow = ' '
        this.dateType = ''
        this.subTitle = "<div style='color: #fff; font-size: 13px'>台区总数：" + this.tgNums + ' | 停运台区数：' + this.custManagerItem.stopTgNum +
          ' | 合格台区数：' + this.custManagerItem.linelossNormalTgNum + ' | 高损台区数：' + this.custManagerItem.linelossHighTgNum + '(' + this.custManagerItem.linelossLowTgNum + ')  负损台区数：' + this.custManagerItem.linelossLowTgNum +
          ' | 线损降幅：' + this.custManagerItem.lllrDiff + '%</div>'
      } else if (clickedTabName === 'trendAnalysis') {
        let yestString = this.custManagerItem.dateType === 'month' ? '较上月' : '较昨日'
        yestString += this.custManagerItem.lllrDiff > 0 ? '下降' : '上升'
        let toYesterdayDecline =
          this.custManagerItem.lllrDiff > 0
            ? this.custManagerItem.lllrDiff : -(this.custManagerItem.lllrDiff)
        let linkRatioDecline = this.custManagerItem.lllrSequ > 0
          ? this.custManagerItem.lllrSequ : -(this.custManagerItem.lllrSequ)
        let raioString = '环比'
        raioString += this.custManagerItem.lllrSequ > 0 ? '下降' : '上升'
        this.scoreShow = ''
        this.dateType = this.custManagerItem.dateType === 'month' ? 'month' : 'dateRange'
        this.subTitle = "<div style='color: #fff; font-size: 13px'>" +
          '台区总数：' + this.tgNums + ' | 在运台区数：' + this.custManagerItem.runTgNum +
          ' | 线损合格率：' + this.custManagerItem.mtgLLSuccRate +
          '% | 线损率：' + this.custManagerItem.lllr + '% | ' + yestString +
          toYesterdayDecline + '% | ' + raioString + linkRatioDecline + '%</div>'
      }
    },
    showTableLayer (tableName, item) {
      console.log(tableName)
      this.sonTitle = tableName
      this.modalTitle = modalsData[tableName].title
      this.componentName = modalsData[tableName].componentName
      this.componentRef = tableName
      this.layerShow = true
      this.queryData = {
        date: this.initialQueryItem['date'],
        dateType: this.initialQueryItem['dateType'],
        custManager: item.custManager
      }

      this.axiosUrl = '/sea-lineLose/custManagerAssess/' + tableName

      setTimeout(() => {
        this.$refs[tableName].$refs.tables.queryTableData()
      }, 500)
    },
    showTgDetail (tableName, type, item) {
      this.layerShow = true
      this.axiosUrl = '/sea-lineLose/custManagerAssess/queryStopTgDetail'
      this.sonTitle = tableName
      this.modalTitle = modalsData[tableName].title
      this.componentName = modalsData[tableName].componentName
      this.componentRef = tableName
      this.queryData = {
        date: this.initialQueryItem['date'],
        dateType: this.initialQueryItem['dateType'],
        custManager: item.custManager,
        tgStatus: type
      }
      setTimeout(() => {
        this.$refs[tableName].$refs.tables.queryTableData()
      }, 500)
    },
    showLineLossTypeNumDetail (tableName, type, item) {
      this.layerShow = true
      this.axiosUrl = '/sea-lineLose/custManagerAssess/queryLineLossTypeNumDetail'
      this.linelossType = type
      this.sonTitle = tableName
      this.modalTitle = modalsData[tableName].title
      this.componentName = modalsData[tableName].componentName
      this.componentRef = tableName
      this.queryData = {
        date: this.initialQueryItem['date'],
        dateType: this.initialQueryItem['dateType'],
        custManager: item.custManager,
        linelossType: type
      }
      setTimeout(() => {
        this.$refs[tableName].$refs.tables.queryTableData()
      }, 500)
    },
    showLineLossTrend (tableName, index, item) {
      // 触发弹窗初始化数据
      let yestString = ''
      if (item.dateType === 'month') {
        this.dateType = 'month'
        yestString = '较上月'
        let endMonth = (item.date.substring(5, 7) - 2 + '').length === 1
          ? '0' + (item.date.substring(5, 7) - 2) : (item.date.substring(5, 7) - 2)
        this.$refs['seaModal'].dateRangeTmp = [item.date, item.date.substring(0, 4) + '-' + endMonth]
        this.$refs['seaModal'].monthDateE = item.date
        this.$refs['seaModal'].monthDateS = item.date.substring(0, 4) + '-' + endMonth
        this.trendQueryDateRange = [item.date, item.date.substring(0, 4) + '-' + endMonth]
      } else {
        yestString = '较昨日'
        this.dateType = 'dateRange'
        this.$refs['seaModal'].dateRangeTmp = [formatDate(this.searchBarForm.date, -7), formatDate(this.searchBarForm.date, 0)]
        this.trendQueryDateRange = this.seaModalDateRange
      }
      /* this.$refs['seaModal'].dateRangeTmp = [formatDate(this.searchBarForm.date, -7), formatDate(this.searchBarForm.date, 0)]
      this.trendQueryDateRange = this.seaModalDateRange */
      this.refreshDataTrigger = !this.refreshDataTrigger
      this.index = index
      this.custManagerHead = this.list[index].custManager
      this.dateHead = this.list[index].date
      this.dateTypeHead = this.list[index].dateType
      this.threadModelItem = this.list[index]
      this.initialQueryItem.custManagerHead = this.list[index].custManager
      this.initialQueryItem.dateHead = this.list[index].date
      this.initialQueryItem.dateTypeHead = this.list[index].dateType
      let tgNums = this.list[index].stopTgNum + this.list[index].removeTgNum + this.list[index].runTgNum
      this.title = '<div style="color: #fff; font-size: 20px">台区经理：' + this.list[index].custManagerName + '</div>'
      yestString += this.list[index].lllrDiff > 0 ? '下降' : '上升'
      let toYesterdayDecline = this.list[index].lllrDiff > 0 ? this.list[index].lllrDiff : -(this.list[index].lllrDiff)
      let linkRatioDecline = this.list[index].lllrSequ > 0 ? this.list[index].lllrSequ : -(this.list[index].lllrSequ)
      let raioString = '环比'
      raioString += this.list[index].lllrSequ > 0 ? '下降' : '上升'
      this.subTitle = "<div style='color: #fff; font-size: 12px'>台区总数：" + tgNums + ' | 在运台区数：' + this.list[index].runTgNum +
                      ' | 线损合格率：' + this.list[index].mtgLLSuccRate + '% | 0.4kv线损率：' + this.list[index].lllr +
        '% | ' + yestString + toYesterdayDecline +
        '% | ' + raioString + linkRatioDecline + '%</div>'
      this.score = this.list[index].custManagerScore == null ? 0 : this.list[index].custManagerScore.toString()
      this.$refs.seaModal.showModal()
      this.reportForm.reportCustManagerNo = item.custManager
      this.custManagerItem = item
      // todo miss
      this.$nextTick(() => {
        this.$refs.analysisReport.queryReport()
      })
    },
    showReport (tableName) {
      this[tableName] = true
    },
    changePage (current) {
      this.resTgListData.currPage = current
      this.queryTableByPage()
    },
    changePageSize (pageSize) {
      this.resTgListData.pageSize = pageSize
      this.queryTableByPage()
    },
    queryTableByPage () {
      this.$refs['tables'].queryTableData(this.resTgListData.currPage, this.resTgListData.pageSize)
    },
    getTablePageInfo (currentPage, pageSize, pageTotalCount, totalPage) {
      this.resTgListData.currPage = currentPage
      this.resTgListData.totalCount = pageTotalCount
      this.resTgListData.pageSize = pageSize
      this.resTgListData.totalPage = totalPage
    },
    // search () {
    //   axios.request({
    //     method: 'post',
    //     data: {
    //       date: this.searchDate,
    //       dataType: this.dataType,
    //       orgNo: '',
    //       // tgId: item.tgId,
    //       custManagerName: this.custMamagerName
    //     },
    //     url: '/sea-lineLose/custManagerAssess/accountManagerAssessSynthInfo'
    //   }).then(res => {
    //     if (res.status === 200 && res.data.data) {
    //       this.list = res.data.data.list[0]
    //       setTimeout(() => {
    //         this.searchBarFlag = !this.searchBarFlag
    //       }, 500)
    //     } else {
    //       this.$Message.success('查询失败!')
    //     }
    //   })
    // },
    selectOrg (data) {
      this.searchBarForm.orgName = data.orgName
      this.searchBarForm.orgNo = data.orgNo
      this.searchBarForm.orgType = data.orgType
      this.reportForm.orgNo = data.orgNo
      this.reportForm.orgType = data.orgType
      this.showOrgFlag = false
    },
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 180 : 600
    }
  },
  mounted () {
    this.initOrgManagementPageQuery()
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

<style  lang="less" scoped>
  @import "./managerAppraise.less";
</style>

<style scoped>
  .currentRank,.mark{
    font-size: 20px;
    font-weight: bold;
    margin-right:30px;
    color: #D68381;
  }
  .ivu-modal-header{
    background-color: rgba(0, 153, 153, 1);
  }
  .ivu-modal-header-inner{
    font-family: 'PingFang SC Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #FFFFFF;
  }
  .ivu-modal-close .ivu-icon-ios-close{
    color: #FFFFFF;
  }
  .ivu-modal .ivu-table-header th{
    text-align: center;
    font-family:'Arial Negreta', 'Arial';
    font-weight:700;
    font-style:normal;
    font-size:14px;
    color:#009999;
    height: 40px;
  }
  .ivu-modal td{
    text-align: center;
    height: 40px;
  }
  .ivu-modal .detailDiv{
      margin-top:10px;
      padding-top:5px;
      height: 36px;
      background: #ffffff;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(226, 226, 226, 1);
      border-radius: 4px;
  }
  .ivu-modal .detailDiv span{
      font-family:'Arial Negreta', 'Arial';
      font-weight:700;
      font-style:normal;
      font-size:17px;
      color:#009999;
      margin-left:10px;
  }
  .ivu-modal .ivu-table-cell{
    padding-left: 5px;
    padding-right: 5px;
  }
  .seaModal .ivu-btn {
    margin-top: 80px;
  }
</style>
