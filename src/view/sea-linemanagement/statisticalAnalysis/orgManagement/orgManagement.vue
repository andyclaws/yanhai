<template>
  <div class="orgManagement">
    <!--顶部搜索面板-->
    <div class="searchBar"
         :style="{height: searchBarFlag ? '100px' : '0', overflowY: 'hidden'}">
      <Form ref="searchBarForm"
            :rules="ruleValidate"
            :model="searchBarForm"
            :label-width="100">
        <Row>
          <Col span="7">
            <FormItem label="供电单位"
                      prop="orgNo">
              <Poptip v-model="showOrgFlag"
                      trigger="click"
                      placement="bottom"
              >
                <Input search
                       enter-button
                       v-model="searchBarForm.orgName"
                       :placeholder="$t('please_input_org')"
                       style="width: 100%"/>
                <div slot="content"
                     style="max-height: 300px; overflow-y: auto">
                  <orgs :show-refresh-text="false"
                        @on-select="selectOrg"></orgs>
                </div>
              </Poptip>
              <!-- <Select v-model="searchBarForm.orgNo"
                      placeholder="请选择供电单位">
                <Option v-for="item in orgList"
                        :value="item.orgNo"
                        :key="item.orgNo">{{ item.orgName }}</Option>
              </Select> -->
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem prop="selectDateType"
                      label="时间纬度">
              <RadioGroup v-model="searchBarForm.selectDateType" @on-change="changeDayOrMonth">
                <Radio label="day"><span>日</span></Radio>
                <Radio label="month"><span>月</span></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="选择日期">
              <DatePicker type="date"
                          :value="searchBarForm.selectDate"
                          v-if="searchBarForm.selectDateType === 'day'"
                          @on-change="searchBarForm.selectDate=$event"
                          :clearable=false
                          :options="selectDateDayOptions"
                          placeholder="默认前一日"
                          style="width: 150px"></DatePicker>
              <DatePicker type="month"
                          :value="searchBarForm.selectDate"
                          v-if="searchBarForm.selectDateType === 'month'"
                          @on-change="searchBarForm.selectDate=$event"
                          :clearable=false
                          placeholder="默认当前月"
                          style="width: 150px"></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
              <Button type="primary"
                      class="margin-right-3"
                      @click="topPanelQuery('searchBarForm')">查询
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>

    <!--content区域-->
    <div style="position:relative;">
      <!--卡片展示-->
      <div v-for="(item, index) in mainPanelList"
           v-show="changeFlag"
           :key="index">
        <div style="clear: both;" v-if="index % 2 === 0"></div>
        <card-item
          ref="card-item"
          :item="item"
          :item2="item"
          :daytgName="daytgNumsName"
          :monthtgName="monthtgNumsName"
          :ppqName="ppqName"
          :spqName="spqName"
          :gpqName="gpqName"
          :total="mainPanelList.length > 1 ? mainPanelList.length -1 : 1"
          :showRank="index === 0 ? false : true"/>
      </div>

      <!--表格展示-->
      <div v-show="!changeFlag">
        <Col span="24">
          <om_Table ref="om_Table"
                    :axiosUrl="initialUrl"
                    :axiosData="initialQueryItem"
                    @on-load-data="getOm_TableDataList"/>
        </Col>
      </div>

      <!--搜索按钮区域-->
      <div class="buttonBox">
        <div class="buttonBoxDiv"
             @click="searchBarFlag=!searchBarFlag">
          <img class="buttonBoxImgSearch"
               src="../../images/u48796.png"
               alt="搜索"/>
        </div>

        <div class="buttonBoxDiv buttonBoxDivChange"
             @click="changeFlag = !changeFlag">
          <p v-if="changeFlag">表格切换</p>
          <p v-if="!changeFlag">表单切换</p>
        </div>

        <div class="menu-bottom" style="margin-top: 80px;">
          <div class="buttonBoxDiv buttonBoxImgMenuBackground"
               @click="linkBoxFlag=!linkBoxFlag">
            <img class="buttonBoxImgMenu"
                 src="../../images/u48802.png"
                 alt="菜单"/>
          </div>

          <div class="linkBox"
               v-show="linkBoxFlag">
            <router-link
              to="syntheticalAnalysis"
              class="comprehensive"
              tag="div">
              <div>
                <img src="../../images/u48815.png"/>
              </div>
              综合分析
            </router-link>
            <router-link
              to="orgManagement"
              class="org_Management  selected"
              tag="div">
              <div>
                <img src="../../images/u48824.png"/>
              </div>
              单位管控
            </router-link>
            <router-link
              to="managerAppraise"
              class="manager_Appraise"
              tag="div">
              <div>
                <img src="../../images/u41495.png"/>
              </div>
              台区经理评价
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!--弹窗-->
    <Modal
      v-model="layerShow"
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9 + 'px'"
      :value="true"
      draggable
      footer-hide
      :title="modalTitle">
      <component
        :ref="componentRef"
        :is="componentName"
        :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9 + 'px'"
        :title="sonTitle"
        :axiosUrl="axiosUrl"
        :axiosData="axiosData"/>
    </Modal>

    <!--带图表的复杂弹窗-->
    <sea-modal ref="seaModal"
               :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.8 + 'px'"
               height="800px"
               :title="title"
               :titleStyle="'1'"
               :subTitle="subTitle"
               :showOrg="false"
               :dateType="dateType"
               :dateRange="seaModalDateRange"
               :tabs="tabs"
               @change-tab="changeTab"
               @sea-model-query="seaModelQuery">
      <div slot="trendAnalysis"
           style="height:80%;">
        <trend-analysis ref="trendA"
                        :refreshDataTrigger="refreshDataTrigger"
                        :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.8 + 'px'"
                        :queryItems="initialQueryItem"
                        :queryDateRange="trendQueryDateRange"
                        @window-trend-analysis-subtitle="getTrendAnalysisSubtitle"
                        @change-lineLoss-queryType="changeLineLossQueryType"
                        @change-lineLoss-day="changeLineLossDay"/>
      </div>
      <div slot="analysisReport">
        <Tabs type="card">
          <analysis-report ref="analysisReport"
                           :analysisHtml="analysisHtml"
                           :org-no="checkedOrgNo"
                           :org-type="checkedOrgType"
                           @analysis-date-change="analysisDateChange"
                           @analysis-query="analysisQuery"/>
        </Tabs>
      </div>

    </sea-modal>

  </div>
</template>

<script>
// 导入切换表格
import om_Table from './om_Table.vue'
import axios from '@/libs/api.request'

// eslint-disable-next-line no-unused-vars
import { dateToString, formatDate } from '@/libs/index'
import { modalsData } from './modalsData'
import CardItem from './card-item'

export default {
  name: 'orgManagement',
  components: {
    axios,
    CardItem,
    Orgs: () => import('_c/common-select-box/components/org/org.vue'),
    Modals: () => import('_c/modals'),
    om_Table,
    SeaModal: () => import('_c/sea-modal'),
    trendAnalysis: () => import('./trendAnalysis/trendAnalysis.vue'),
    analysisReport: () => import('./trendAnalysis/analysisReport.vue'),
    windowTgManagerDetail: () => import('./windows_tables/windowTgManagerDetail.vue'),
    windowWithChildWindow: () => import('./windows_tables/windowWithChildWindow.vue'),
    windowWithChildGPQWindow: () => import('./windows_tables/windowWithChildGPQWindow.vue'),
    windowExchangeTableTgDetail: () => import('./windows_tables/windowExchangeTableTgDetail.vue'),
    windowWrongArchiveTgDetail: () => import('./windows_tables/windowWrongArchiveTgDetail.vue'),
    windowMeasureAlarmTgDetail: () => import('./windows_tables/windowMeasureAlarmTgDetail.vue'),
    windowElectricAlarmTgDetail: () => import('./windows_tables/windowElectricAlarmTgDetail.vue'),
    windowStealElectricTgDetail: () => import('./windows_tables/windowStealElectricTgDetail.vue'),
    windowFactorAlarmTgDetail: () => import('./windows_tables/windowFactorAlarmTgDetail.vue'),
    windowIndicationCollectSuccessRateDetail: () => import('./windows_tables/windowIndicationCollectSuccessRateDetail.vue'),
    windowNewlyIncreasedAlarmTgDetail: () => import('./windows_tables/windowNewlyIncreasedAlarmTgDetail.vue'),
    windowCollectCoverRateDetail: () => import('./windows_tables/windowCollectCoverRateDetail.vue'),
    windowOnlineTgRateDetail: () => import('./windows_tables/windowOnlineTgRateDetail.vue'),
    windowDistributedGenerationTgDetail: () => import('./windows_tables/windowDistributedGenerationTgDetail.vue'),
    windowTranAlarmTgDetail: () => import('./windows_tables/windowTranAlarmTgDetail.vue'),
    windowGovernLineLossTgDetail: () => import('./windows_tables/windowGovernLineLossTgDetail.vue')
  },
  props: {
    // 首次进入页面时初始化请求url地址
    initialUrl: {
      type: String,
      default () {
        return '/sea-lineLose/unitControl/index'
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
          'statDate': formatDate(new Date(), -1), // 首次进入页面时初始化默认时间
          'dateType': 'day'// 初始化页面默认查询日维度
        }
      }
    }
  },
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      lineLossQueryType: '0', // 柱状图高损
      lineLossDay: 7, // 柱状图天数
      analysisDate: formatDate(undefined, -1), // 分析报告组件传回来的日期
      analysisHtml: '', // 分析结果的html
      checkedOrgNo: '',
      checkedOrgType: '',
      reportDate: this.initialQueryItem['statDate'],
      selectDate: 'day', // 分析结果的日期类型 日 月
      axiosUrl: '',
      axiosData: {},
      oneOrgManagement: {},
      sonTitle: '',
      // 日期插件默认选项
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
      refreshDataTrigger: false, // 用于触发趋势分析弹窗中数据初始化加载与刷新
      fullscreen: false,
      draggable: false,
      changeFlag: true,
      // 主题页面面板数据
      mainPanelList: [],
      daytgNumsName: '停运台区供电量超200千瓦时的台区数:',
      monthtgNumsName: '运行台区供电量超10000千瓦时的重损台区数:',
      ppqName: '日总供电量',
      spqName: '日总售电量',
      gpqName: '日总发电量',
      // 弹窗头部数据
      title: '',
      subTitle: '',
      modOrgNo: '',
      modOrgType: '',
      modDate: '',
      modDateType: '',
      score: '',
      scoreShow: '',
      dateType: 'dateRange',
      tabs: [
        {
          title: '趋势分析',
          name: 'trendAnalysis',
          pic: 'errorAnalysisPic',
          activePic: 'errorAnalysisActivePic',
          active: true
        },
        { title: '分析报告', name: 'analysisReport', pic: 'lineLoseAnalysisPic', activePic: 'lineLoseAnalysisActivePic' }
      ],
      linkBoxFlag: false,
      showOrgFlag: false,
      searchBarForm: {
        orgName: this.initialQueryItem['orgName'],
        orgNo: this.initialQueryItem['orgNo'],
        selectDate: this.initialQueryItem['statDate'],
        selectDateType: this.initialQueryItem['dateType'],
        orgType: this.initialQueryItem['orgType']
      },
      searchBarFlag: true,
      ruleValidate: {
        orgNo: [
          { required: true, message: '供电单位不能为空', trigger: 'blur' }
        ],
        selectDateType: [
          { required: true, message: '请选择查询维度', trigger: 'blur' }
        ],
        selectDate: [
          { required: true, message: '查询日期不能为空', trigger: 'blur' }
        ]
      },
      // 趋势分析的时间范围参数
      trendQueryDateRange: [],
      modalTitle: '',
      componentName: '',
      componentRef: '',
      seaModalDateRange: [formatDate(undefined, -8), formatDate(undefined, -1)],
      layerShow: false
    }
  },
  methods: {
    // 从表格中获取数据集合，赋值给mainPanelList
    getOm_TableDataList (tableDataList) {
      this.mainPanelList = tableDataList
    },
    getTrendAnalysisSubtitle (subTitle) {
      this.subTitle = subTitle
    },
    // 初始化页面function
    initOrgManagementPageQuery: function () {
      this.seaModalDateRange = [formatDate(this.searchBarForm.selectDate, -7), formatDate(this.searchBarForm.selectDate, 0)]
      this.$refs['om_Table'].$refs.tables.queryTableData()
      setTimeout(() => {
        this.searchBarFlag = false
      }, 1200)
    },
    // 面板最上面的查询方法
    topPanelQuery: function (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.initialQueryItem['orgNo'] = this.searchBarForm.orgNo
          this.initialQueryItem['orgType'] = this.searchBarForm.orgType
          this.initialQueryItem['statDate'] = typeof this.searchBarForm.selectDate === 'object' ? formatDate(this.searchBarForm.selectDate) : this.searchBarForm.selectDate
          this.initialQueryItem['dateType'] = this.searchBarForm.selectDateType
          this.initOrgManagementPageQuery()
        } else {
          this.$Message.error('请补充查询条件')
        }
      })
    },
    // 带图表的弹窗 趋势分析
    showSeaModal (orgName, orgNo, orgType, dataDate, dateType, item) {
      this.$refs['analysisReport'].dateType = this.initialQueryItem['dateType']
      this.$refs['analysisReport'].date = this.initialQueryItem['statDate']
      let yestString = ''
      if (dateType === 'month') {
        this.dateType = 'month'
        yestString = '较上月'
        let endMonth = (dataDate.substring(5, 7) - 2 + '').length === 1
          ? '0' + (dataDate.substring(5, 7) - 2) : (dataDate.substring(5, 7) - 2)
        this.$refs['seaModal'].dateRangeTmp = [dataDate, dataDate.substring(0, 4) + '-' + endMonth]
        this.$refs['seaModal'].monthDateE = dataDate
        this.$refs['seaModal'].monthDateS = dataDate.substring(0, 4) + '-' + endMonth
        this.trendQueryDateRange = [dataDate, dataDate.substring(0, 4) + '-' + endMonth]
      } else {
        yestString = '较昨日'
        this.dateType = 'dateRange'
        this.$refs['seaModal'].dateRangeTmp = [formatDate(this.searchBarForm.selectDate, -7), formatDate(this.searchBarForm.selectDate, 0)]
        this.trendQueryDateRange = this.seaModalDateRange
      }
      this.oneOrgManagement = item
      this.initialQueryItem.modOrgType = orgType
      this.initialQueryItem.modDateType = dateType
      this.initialQueryItem.modDate = dataDate
      this.initialQueryItem.modOrgNo = orgNo
      this.refreshDataTrigger = !this.refreshDataTrigger
      this.title = `<div style="color: #fff; font-size: 20px">` + orgName + `</div>`
      this.checkedOrgNo = orgNo
      this.checkedOrgType = orgType
      yestString += item.toYesterdayDecline > 0 ? '下降' : '上升'
      let toYesterdayDecline = item.toYesterdayDecline > 0 ? item.toYesterdayDecline : -(item.toYesterdayDecline)
      let linkRatioDecline = item.linkRatioDecline > 0 ? item.linkRatioDecline : -(item.linkRatioDecline)
      let raioString = '环比'
      raioString += item.linkRatioDecline > 0 ? '下降' : '上升'
      this.subTitle = `<div style="color: #fff; font-size: 15px">` +
          `供电量：` + item.allPpq +
          ` | ` +
          `售电量：` + item.allSpq +
          ` | ` +
          `线损率：` + item.allTgLinelossRate +
          `% | ` +
          yestString + toYesterdayDecline +
          `% | ` +
          raioString + linkRatioDecline + `%` +
          `</div>`
      this.$refs.seaModal.showModal()
    },
    // 一些可以公用的请求方法
    /**
       * 明细弹窗方法
       * @param apiName 请求地址 与 弹窗组件ref属性 保持一致
       * @param orgNo 传入参数
       */
    showTableLayer: function (apiName, orgNo, dataDate, dateType, orgType) {
      this.axiosUrl = '/sea-lineLose/unitControl/' + apiName
      this.axiosData = {
        'orgNo': orgNo,
        'orgType': orgType,
        'dateType': dateType,
        'statDate': dataDate,
        'tgNo': '',
        'consNo': '',
        'consName': '',
        'tgStatus': '',
        'tgName': '',
        'jcStatus': '',
        'fkStatus': '',
        'cjStatus': ''
      }
      this.layerShow = true
      this.modalTitle = modalsData[apiName].title + '(该数据为实时数据可能与统计数据有一定误差)'
      this.componentName = modalsData[apiName].componentName
      this.componentRef = apiName
      this.sonTitle = apiName
      setTimeout(() => {
        this.$refs[apiName].$refs.tables.queryTableData()
      }, 500)

      // 弹窗显示
    },
    // 重写seamodel的切换页面方法
    changeTab (clickedTab, clickedTabName) {
      if (clickedTabName === 'analysisReport') {
        this.$refs['analysisReport'].date = this.initialQueryItem['statDate']
        this.scoreShow = ' '
        this.dateType = ''
        this.subTitle = "<div style='color: #fff; font-size: 13px'>台区总数：" + this.oneOrgManagement.allTgNums + ' | 停运台区数：' + this.oneOrgManagement.offStreamTgNums +
            ' | 合格台区数：' + this.oneOrgManagement.normalTgNums + ' | 高损台区数：' + this.oneOrgManagement.highLossTgNums + '(' + this.oneOrgManagement.minusLossTgNums + ')  负损台区数：' + this.oneOrgManagement.minusLossTgNums +
            ' | 线损降幅：' + this.oneOrgManagement.toYesterdayDecline + '%</div>'
      } else if (clickedTabName === 'trendAnalysis') {
        this.scoreShow = ''
        this.dateType = this.oneOrgManagement.dateType === 'month' ? 'month' : 'dateRange'
        let yestString = this.oneOrgManagement.dateType === 'month' ? '较上月' : '较昨日'
        yestString += this.oneOrgManagement.toYesterdayDecline > 0 ? '下降' : '上升'
        let toYesterdayDecline =
          this.oneOrgManagement.toYesterdayDecline > 0
            ? this.oneOrgManagement.toYesterdayDecline : -(this.oneOrgManagement.toYesterdayDecline)
        let linkRatioDecline = this.oneOrgManagement.linkRatioDecline > 0
          ? this.oneOrgManagement.linkRatioDecline : -(this.oneOrgManagement.linkRatioDecline)
        let raioString = '环比'
        raioString += this.oneOrgManagement.linkRatioDecline > 0 ? '下降' : '上升'
        this.subTitle = `
            <div style="color: #fff; font-size: 15px">
              供电量：${this.oneOrgManagement.allPpq}&nbsp;|&nbsp;
              售电量：${this.oneOrgManagement.allSpq}&nbsp;|&nbsp;
              线损率：${this.oneOrgManagement.allTgLinelossRate}%&nbsp;|&nbsp;
              ${yestString}：${toYesterdayDecline}%&nbsp;|&nbsp;
              ${raioString}：${linkRatioDecline}%
            </div>`
      }
    },
    // 重写seamodel的查询方法
    seaModelQuery (dateRangeString) {
      if (dateRangeString[0].length <= 7) {
        if (dateRangeString[0].substr(0, 4) === dateRangeString[1].substr(0, 4)) {
          this.trendQueryDateRange = dateRangeString
          this.refreshDataTrigger = !this.refreshDataTrigger
        } else {
          this.$Message.error('选择日期需要在同一年')
        }
      } else {
        if (dateRangeString[0].substr(0, 7) === dateRangeString[1].substr(0, 7)) {
          this.trendQueryDateRange = dateRangeString
          this.refreshDataTrigger = !this.refreshDataTrigger
        } else {
          this.$Message.error('选择日期需要在同一个月')
        }
      }
    },
    // seamodel里分析报告日期选择框数值改变
    analysisDateChange (value, selectDate) {
      this.analysisDate = value
      this.selectDate = selectDate
    },
    // 柱状图高损负损
    changeLineLossQueryType (lineLossQueryType) {
      this.lineLossQueryType = lineLossQueryType
    },
    // 柱状图天数
    changeLineLossDay (lineLossDay) {
      this.lineLossDay = lineLossDay
    },
    // 重写Seamodel的分析报告查询方法
    analysisQuery () {

    },
    // 供电单位查询框框
    selectOrg (data) {
      this.searchBarForm.orgName = data.orgName
      this.searchBarForm.orgNo = data.orgNo
      this.searchBarForm.orgType = data.orgType
      this.showOrgFlag = false
    },
    changeDayOrMonth (value) {
      if (value === 'day') {
        this.ppqName = '日总供电量'
        this.spqName = '日总售电量'
        this.gpqName = '日总发电量'
        this.daytgNumsName = '停运台区供电量超200千瓦时的台区数:'
        this.monthtgNumsName = '运行台区供电量超10000千瓦时的重损台区数:'
        this.searchBarForm.selectDate = this.searchBarForm.selectDate + '-01'
      } else if (value === 'month') {
        this.ppqName = '月总供电量'
        this.spqName = '月总售电量'
        this.gpqName = '月总发电量'
        this.daytgNumsName = '停运台区供电量超6000千瓦时的台区数:'
        this.monthtgNumsName = '运行台区供电量超300000千瓦时的重损台区数:'
        this.searchBarForm.selectDate = this.searchBarForm.selectDate.substring(0, 7)
      }
    }
  },
  mounted: function () {
    this.initOrgManagementPageQuery()
  }
}
</script>

<style lang="less" scoped>
  @import "./main.less";
</style>
<style>
  .ivu-modal-header {
    background-color: #448c86;
  }

  .ivu-modal-header-inner {
    color: white;
  }

  .fieldset {
    position: relative;
    margin-top: 5px;
    padding: 6px;
  }

  .fieldset-title {
    position: absolute;
    height: 15px;
    top: -5px;
    right: 10px;
    background: white;
    /* 不写的话，不会覆盖父区块的样式 */
  }
</style>
