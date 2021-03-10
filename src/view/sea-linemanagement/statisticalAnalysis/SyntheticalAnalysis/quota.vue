<template>
  <div class="quota" style="position:relative;height: 1200px">
    <!--顶部搜索栏-->
    <div class="searchBar"
         :style="{height: searchBarFlag ? '100px' : '0'}">
      <Form ref="searchBarForm"
            :rules="ruleValidate"
            :model="searchBarForm"
            :label-width="100">
        <Row>
          <Col span="7">
            <FormItem label="供电单位"
                      prop="orgName">
              <Poptip v-model="showOrgFlag"
                      trigger="hover"
                      placement="bottom">
                <Input search
                       enter-button
                       v-model="searchBarForm.orgName"
                       :placeholder="$t('please_input_org')"
                       style="width: 100%"/>
                <div slot="content"
                     style="max-height: 500px; overflow-y: auto; width: 250px">
                  <orgs :show-refresh-text="false"
                        @on-select="selectOrg"></orgs>
                </div>
              </Poptip>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem prop="selectDateType"
                      label="时间纬度">
              <RadioGroup v-model="searchBarForm.dateType" @on-change="changeDateType">
                <Radio label="day"><span>日</span></Radio>
                <Radio label="month"><span>月</span></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="选择日期">
              <DatePicker type="date"
                          :value="searchBarForm.date"
                          v-if="searchBarForm.dateType === 'day'"
                          :options="selectDateDayOptions"
                          @on-change="changeDate"
                          placeholder="默认前一日"
                          format="yyyy-MM-dd"
                          :clearable="false"
                          style="width: 150px"></DatePicker>
              <DatePicker type="month"
                          :value="searchBarForm.date"
                          v-if="searchBarForm.dateType === 'month'"
                          @on-change="changeDate"
                          placeholder="默认当前月"
                          format="yyyy-MM"
                          :clearable="false"
                          style="width: 150px"></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
              <Button type="primary"
                      class="margin-right-3"
                      @click="topPanelQuery('searchBarForm')">查询</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div :style="{height: searchBarFlag ? '100px' : '0', width: '100%', transition: '.3s'}"></div>
    <div style="float: left; width: 54%; margin-top: 1%; margin-left: 1%">
      <Card style="height: 49%">
        <p slot="title" class="title" style="margin-right: 40px">台区线损合格率分析</p>
        <p slot="extra"><Button @click="passRateFlag = !passRateFlag">表格</Button></p>
        <div style="height: 400px; width: 100%">
          <tg-line-loss-pass-rate
            :totalData="passRateTotalData"
            :dateType="searchBarForm.dateType"
            :change="selectedQuota"
            style="height: 100%">
          </tg-line-loss-pass-rate>
        </div>
      </Card>
      <Card style="height: 49%; margin-top: 1%">
        <p slot="title" class="title" style="margin-right: 40px">台区线损分布情况  <span style="color: red">(统计规则为左闭右开)</span></p>
        <p slot="extra"><Button @click="distributionFlag = !distributionFlag">表格</Button></p>
        <div style="height: 400px; width: 100%">
          <div style="float: left; height: 100%; width: 20%; display: flex; align-items: center; justify-content: center;">
            <div>
              <Row  v-for="(item, index) in orgList" :key="index">
                <Button type="primary" v-if="item.code === checkedOrg" style="margin-top: 3px" @click="change(item.code)">{{ item.name }}</Button>
                <Button v-if="item.code !== checkedOrg" style="margin-top: 3px" @click="change(item.code)">{{ item.name }}</Button>
              </Row>
            </div>
          </div>
          <div style="float: right; height: 100%; width: 80%">
            <tg-line-loss-distribution
              :totalData="selectedOrg"
              :change="selectedQuota"
              style="height: 100%">
            </tg-line-loss-distribution>
          </div>
        </div>
      </Card>
    </div>

    <!--分析报告-->
    <div style="float: right; width: 43%; margin-top: 1%; margin-left: 1%; margin-right: 1%">
      <Card style="min-height: 983.38px">
        <p slot="title" class="title" style="margin-right: 40px">分析报告</p>
          <p slot="extra">
            分析日期
            <DatePicker type="date"
                        :value="searchBarForm.date"
                        v-if="searchBarForm.dateType === 'day'"
                        @on-change="reInitQuotaDate"
                        :clearable=false
                        :options="selectDateDayOptions"
                        placeholder="默认前一日"
                        style="width: 150px"></DatePicker>
            <DatePicker type="month"
                        :value="searchBarForm.date"
                        v-if="searchBarForm.dateType === 'month'"
                        @on-change="reInitQuotaDate"
                        :clearable=false
                        placeholder="默认当前月"
                        style="width: 150px"></DatePicker>
          </p>
        <sea-card
          :exportFileName="searchBarForm.orgName + '_ 指标分析报告'"
          @on-fullScreen="fullScreenClick"
          @on-save="saveDataFlag = true"
          @on-saveEnd="saveDataFlag = false">
          <quota-report
            :base-data="quotaBaseData"
            :quota-fc-gc="quotaFcGc"
            :line-lose-data="quotaLineLoseData"
            :line-lose-data-detail="quotaLineLoseDataDetail"
            :date-type="searchBarForm.dateType"
            :date="searchBarForm.date"
            :compare-msg="quotaCompare"
            :full-screen-flag="fullScreenFlag"
            :save-data-flag="saveDataFlag"
            @on-showPowerDetail="showPowerDetail"/>
        </sea-card>
      </Card>
    </div>

    <!--台区线损合格率分析表格-->
    <Modal
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      draggable
      :zIndex="901"
      v-model="passRateFlag"
      class-name="vertical-center-modal"
      footer-hide
      title="台区线损合格率分析表格">
      <div class="quotaTable">
        <Tables
          ref="passRateTableRef"
          :height="tableHeight - 50"
          :filename="'台区线损合格率分析表格'"
          :bottomTools="bottomTools"
          :columns="passRateTable.columns"
          :axiosUrl="passRateTable.axiosUrl"
          :axiosData="searchBarForm"
          @on-load-data="getPassRateTableDataList"
        />
      </div>
    </Modal>

    <!--台区线损分布情况表格-->
    <Modal
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      draggable
      :zIndex="901"
      v-model="distributionFlag"
      class-name="vertical-center-modal"
      footer-hide
      title="台区线损分布情况表格">
      <div class="quotaTable">
        <Tables
          ref="distributionTableRef"
          :height="tableHeight - 50"
          :filename="'台区线损分布情况表格'"
          :bottomTools="bottomTools"
          :columns="distributionTable.columns"
          :axiosUrl="distributionTable.axiosUrl"
          :axiosData="searchBarForm"
          @on-load-data="getDistributionTableDataList"
        />
      </div>
    </Modal>

    <!--供电单位台区供售电量明细-->
    <Modal
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      draggable
      :zIndex="901"
      v-model="showPowerDetailFlag"
      class-name="vertical-center-modal"
      footer-hide
      title="供电单位台区供售电量明细">
      <div class="quotaTable">
        <Tables
          ref="powerDetail"
          :height="tableHeight - 50"
          :filename="'供电单位台区供售电量明细'"
          :bottomTools="bottomTools"
          :columns="powerDetailTable.columns"
          :axiosUrl="powerDetailTable.axiosUrl"
          :axiosData="searchBarForm"
        />
      </div>
    </Modal>

    <Modal
      v-model="layerShow"
      :width="boxWidth < 1100 ? '950px' : boxWidth * 0.85"
      :value="true"
      draggable
      footer-hide
      :title="modalTitle">
      <component
        :ref="componentRef"
        :is="componentName"
        :title="sonTitle"
        :axiosUrl="axiosUrl"
        :axiosData="axiosData"
        :pTgStatus = 'pTgStatus'/>
    </Modal>

  </div>
</template>

<script>
import TgLineLossPassRate from './tgLineLossPassRate'
import TgLineLossDistribution from './tgLineLossDistribution'
import Tables from '_c/tables'
import axios from '@/libs/api.request'
import Orgs from '_c/common-select-box/components/org'
import QuotaReport from './report/quotaReport'
import SeaCard from '_c/sea-card'
import { formatDate, numberFormat, dateToString } from '@/libs/index'
import { getTitle, judgeNull } from './util'
import { modalsData } from '../orgManagement/modalsData'
export default {
  name: 'quota',
  components: {
    TgLineLossPassRate,
    TgLineLossDistribution,
    Tables,
    Orgs,
    QuotaReport,
    SeaCard,
    windowWithChildWindow: () => import('../orgManagement/windows_tables/windowWithChildWindow.vue'),
    windowIndicationCollectSuccessRateDetail: () => import('../orgManagement/windows_tables/windowIndicationCollectSuccessRateDetail.vue'),
    windowCollectCoverRateDetail: () => import('../orgManagement/windows_tables/windowCollectCoverRateDetail.vue'),
    windowOnlineTgRateDetail: () => import('../orgManagement/windows_tables/windowOnlineTgRateDetail.vue')
  },
  props: {
    searchBarFlag: false,
    selectedQuota: true,
    baseSearchBarForm: {
      type: Object,
      default () {
        return {
          orgName: this.$store.state.auth.orgName && this.$store.state.auth.orgName !== '' ? this.$store.state.auth.orgName : ' ',
          orgNo: this.$store.state.auth.orgNo,
          orgType: this.$store.state.auth.orgType,
          date: formatDate(undefined, -2),
          dateType: 'day'
        }
      }
    }
  },
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      tableHeight: 500,
      day: '昨日',
      selectDateDayOptions: {
        shortcuts: [
          {
            text: '今天',
            value () {
              return formatDate('', 0)
            }
          }, {
            text: '昨日',
            value () {
              return formatDate('', -1)
            }
          }, {
            text: '上周',
            value () {
              return formatDate('', -7)
            }
          }
        ]
      },
      searchBarForm: {
        orgName: '',
        orgNo: '',
        orgType: '',
        date: '',
        dateType: ''
      },
      ruleValidate: {
        orgName: [
          { required: true, message: '供电单位不能为空', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择查询维度', trigger: 'blur' }
        ],
        dateType: [
          { required: true, message: '查询日期不能为空', trigger: 'blur' }
        ]
      },
      quotaDatePickerValue: formatDate(),

      passRateTotalData: [],
      passRateFlag: false,
      passRateTable: {
        columns: [{
          'title': '供电单位',
          'dayTitle': '供电单位',
          'monthTitle': '供电单位',
          'key': 'orgName',
          'width': 120
        },
        {
          'title': '台区总数',
          'dayTitle': '台区总数',
          'monthTitle': '台区总数',
          'key': 'tgNum',
          'width': 120
        },
        {
          'title': '昨日合格台区数',
          'dayTitle': '昨日合格台区数',
          'monthTitle': '上月合格台区数',
          'key': 'yesPass',
          'width': 120,
          render: (h, params) => {
            return h('a', {
              props: {
                href: '#',
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.showTableLayer('normalTgDetail', params.row, -1)
                }
              }
            }, params.row.yesPass)
          }
        },
        {
          'title': '昨日不合格台区数',
          'dayTitle': '昨日不合格台区数',
          'monthTitle': '上月不合格台区数',
          'key': 'yesUnpass',
          'width': 120
        },
        {
          'title': '今日合格台区数',
          'dayTitle': '今日合格台区数',
          'monthTitle': '当月合格台区数',
          'key': 'toPass',
          'width': 120,
          render: (h, params) => {
            return h('a', {
              props: {
                href: '#',
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.showTableLayer('normalTgDetail', params.row)
                }
              }
            }, params.row.toPass)
          }
        },
        {
          'title': '今日不合格台区数',
          'dayTitle': '今日不合格台区数',
          'monthTitle': '当月不合格台区数',
          'key': 'toUnpass',
          'width': 120
        },
        {
          'title': '当日合格率(%)',
          'dayTitle': '当日合格率(%)',
          'monthTitle': '当月合格率(%)',
          'key': 'llrNormalRate',
          'width': 120,
          render: (h, params) => {
            return h('a', {
              props: {
                href: '#',
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.showTableLayer('tgLineLossQualifiedRateDetail', params.row)
                }
              }
            }, numberFormat(params.row.llrNormalRate))
          }
        },
        {
          'title': '采集成功率(%)',
          'dayTitle': '采集成功率(%)',
          'monthTitle': '采集成功率(%)',
          'key': 'readSuccRate',
          'width': 120,
          render: (h, params) => {
            return h('a', {
              props: {
                href: '#',
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.showTableLayer('indicationCollectSuccessRateDetail', params.row)
                }
              }
            }, numberFormat(params.row.readSuccRate))
          }
        },
        {
          'title': '采集覆盖率(%)',
          'dayTitle': '采集覆盖率(%)',
          'monthTitle': '采集覆盖率(%)',
          'key': 'coverMetRate',
          'width': 120,
          render: (h, params) => {
            return h('a', {
              props: {
                href: '#',
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.showTableLayer('collectCoverageRateDetail', params.row)
                }
              }
            }, numberFormat(params.row.coverMetRate))
          }
        },
        {
          'title': '日在线监测率(%)',
          'dayTitle': '日在线监测率(%)',
          'monthTitle': '月在线监测率(%)',
          'key': 'isMonitorTgRate',
          'width': 120,
          render: (h, params) => {
            return h('a', {
              props: {
                href: '#',
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.showTableLayer('tgOnlineMonitorRateDetail', params.row)
                }
              }
            }, numberFormat(params.row.isMonitorTgRate))
          }
        },
        {
          'title': '日线损率(%)',
          'dayTitle': '日线损率(%)',
          'monthTitle': '月线损率(%)',
          'key': 'lLlrScore',
          'width': 120,
          render: (h, params) => {
            return h('a', {
              props: {
                href: '#',
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.showTableLayer('allTgLineLossRateDetail', params.row)
                }
              }
            }, numberFormat(params.row.lLlrScore))
          }
        },
        {
          'title': '数据统计日期',
          'key': 'dataDate',
          'width': 120
        }],
        axiosUrl: 'sea-lineLose/synthAnalysis/queryTgLineLossQuaRateAnalysis'
      },
      orgList: [],
      checkedOrg: '',
      diffOrgDistribution: [],
      selectedOrg: [],
      distributionFlag: false,
      bottomTools: ['export'],
      distributionTable: {
        columns: [{
          'title': '供电单位',
          'dayTitle': '供电单位',
          'monthTitle': '供电单位',
          'key': 'orgName',
          'width': 120
        },
        {
          'title': '台区总数',
          'key': 'tgNum',
          'width': 120
        },
        {
          'title': '日线损率(%)',
          'dayTitle': '日线损率(%)',
          'monthTitle': '月线损率(%)',
          'key': 'lLlrScoreAvg',
          'width': 120,
          render: (h, params) => {
            return h('a', {
              props: {
                href: '#',
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.showTableLayer('allTgLineLossRateDetail', params.row)
                }
              }
            }, numberFormat(params.row.lLlrScoreAvg))
          }
        },
        {
          'title': '不可算台区数',
          'key': 'nocalcTgNum',
          'width': 120,
          render: (h, params) => {
            return h('a', {
              props: {
                href: '#',
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.showTableLayer('noCalculateTgDetail', params.row)
                }
              }
            }, params.row.nocalcTgNum)
          }
        },
        {
          'title': '小于0%',
          'key': 'llrLess0',
          'width': 120
        },
        {
          'title': '0%-4%',
          'key': 'llr0to4',
          'width': 120
        },
        {
          'title': '4%-7%',
          'key': 'llr4to7',
          'width': 120
        },
        {
          'title': '7%-10%',
          'key': 'llr7to10',
          'width': 120
        },
        {
          'title': '10%-15%',
          'key': 'llr10to15',
          'width': 120
        },
        {
          'title': '15%-18%',
          'key': 'llr15to18',
          'width': 120
        },
        {
          'title': '18%-40%',
          'key': 'llr18to40',
          'width': 120
        },
        {
          'title': '40%以上',
          'key': 'llrMore40',
          'width': 120
        },
        // {
        //   'title': '-1%以下',
        //   'key': 'belowNegOne',
        //   'width': 120
        // },
        // {
        //   'title': '-1%到0%',
        //   'key': 'negOneToZero',
        //   'width': 120
        // },
        // {
        //   'title': '0%-5%',
        //   'key': 'zeroToFive',
        //   'width': 120
        // },
        // {
        //   'title': '5%-7%',
        //   'key': 'fiveToSeven',
        //   'width': 120
        // },
        // {
        //   'title': '7%-15%',
        //   'key': 'sevenToFif',
        //   'width': 120
        // },
        // {
        //   'title': '15%-20%',
        //   'key': 'fifToTwen',
        //   'width': 120
        // },
        // {
        //   'title': '20%以上',
        //   'key': 'moreThanTwen',
        //   'width': 120
        // },
        {
          'title': '数据统计日期',
          'key': 'dataDate',
          'width': 120
        }],
        axiosUrl: 'sea-lineLose/synthAnalysis/queryTgLineLossDisSituation'
      },
      quotaBaseData: {},
      quotaLineLoseData: [],
      quotaLineLoseDataDetail: [],
      quotaCompare: '',
      quotaFcGc: {},
      fullScreenFlag: false,
      saveDataFlag: false,
      showPowerDetailFlag: false,
      powerDetailTable: {
        columns: [{
          'title': '供电单位',
          'dayTitle': '供电单位',
          'monthTitle': '供电单位',
          'key': 'orgName',
          'width': 120
        },
        {
          'title': '台区总发电量(kwh)',
          'key': 'gpq',
          'width': 120
        },
        {
          'title': '台区总供电量(kwh)',
          'key': 'ppq',
          'width': 120
        },
        {
          'title': '台区总售电量(kwh)',
          'key': 'spq',
          'width': 120
        },
        {
          'title': '台区总线损电量(kwh)',
          'key': 'losspq',
          'width': 120
        }],
        axiosUrl: 'sea-lineLose/synthAnalysis/orgPowerDetail'
        // 71接口没有
      },
      showOrgFlag: false,
      layerShow: false,
      modalTitle: '',
      componentName: '',
      componentRef: '',
      sonTitle: '',
      axiosUrl: '',
      axiosData: {},
      pTgStatus: ''
    }
  },
  methods: {
    removeNull (val) {
      return judgeNull(val, '')
    },
    topPanelQuery: function (name = 'searchBarForm') {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.changeTitle()
          if (this.searchBarForm.dateType === 'day') {
            this.day = '昨日'
          } else if (this.searchBarForm.dateType === 'month') {
            this.day = '上月'
          }
          this.initQuotaDate()
          this.getAnalysisReportData()
          this.$emit('on-search', false, this.searchBarForm)
        } else {
          this.$Message.error('请补充查询条件!')
          this.$emit('on-search', true)
        }
      })
    },
    // cahnge Table title
    changeTitle () {
      let dateType = this.searchBarForm.dateType
      this.passRateTable.columns.forEach(t => {
        t.title = getTitle(dateType, t.dayTitle, t.monthTitle, t.title)
      })
      this.distributionTable.columns.forEach(t => {
        t.title = getTitle(dateType, t.dayTitle, t.monthTitle, t.title)
      })
    },
    // 台区线损合格率分析表格数据回调渲染echarts
    getPassRateTableDataList (tableDataList) {
      this.passRateTotalData = tableDataList
    },

    // 台区线损分布情况表格数据回调渲染echarts
    getDistributionTableDataList (tableDataList) {
      let _this = this
      let tempData = tableDataList
      let tempOrgList = []
      let tempDiffOrgDistribution = []
      tempData.forEach(function (row, i) {
        tempOrgList.push({ code: i, name: row.orgName })
        tempDiffOrgDistribution.push([
          // { name: '-1%以下', value: _this.removeNull(row.belowNegOne) },
          // { name: '-1%~0%', value: _this.removeNull(row.negOneToZero) },
          // { name: '0%~5%', value: _this.removeNull(row.zeroToFive) },
          // { name: '5%~7%', value: _this.removeNull(row.fiveToSeven) },
          // { name: '7%~15%', value: _this.removeNull(row.sevenToFif) },
          // { name: '15%~20%', value: _this.removeNull(row.fifToTwen) },
          // { name: '20%以上', value: _this.removeNull(row.moreThanTwen) },
          { name: '小于0%', value: _this.removeNull(row.llrLess0) },
          { name: '0%~4%', value: _this.removeNull(row.llr0to4) },
          { name: '4%~7%', value: _this.removeNull(row.llr4to7) },
          { name: '7%~10%', value: _this.removeNull(row.llr7to10) },
          { name: '10%~15%', value: _this.removeNull(row.llr10to15) },
          { name: '15%~18%', value: _this.removeNull(row.llr15to18) },
          { name: '18%~40%', value: _this.removeNull(row.llr18to40) },
          { name: '40%以上', value: _this.removeNull(row.llrMore40) },
          { name: '不可算台区', value: _this.removeNull(row.nocalcTgNum) }
        ])
      })
      this.orgList = tempOrgList
      this.diffOrgDistribution = tempDiffOrgDistribution
      this.selectedOrg = this.diffOrgDistribution[0]
      this.checkedOrg = tempOrgList && tempOrgList.length > 0 ? tempOrgList[0].code : ''
    },

    initQuotaDate () {
      this.$nextTick(() => {
        this.$refs.passRateTableRef.queryTableData()
        this.$refs.distributionTableRef.queryTableData()
        this.$refs.powerDetail.queryTableData()
      })
    },
    reInitQuotaDate (newDate) {
      this.changeDate(newDate)
      this.topPanelQuery('searchBarForm')
    },

    change (code) {
      this.selectedOrg = this.diffOrgDistribution[code]
      this.checkedOrg = code
    },

    getAnalysisReportData () {
      axios.request({
        method: 'post',
        data: this.searchBarForm,
        url: 'sea-lineLose/synthAnalysis/queryAnalysisBase'
        // 71接口没有
      }).then(res => {
        this.quotaBaseData = res.data.data
      })

      axios.request({
        method: 'post',
        data: this.searchBarForm,
        url: 'sea-lineLose/synthAnalysis/queryAnalysisLineLose'
        // 71接口没有
      }).then(res => {
        this.quotaLineLoseData = res.data.data
      })

      axios.request({
        method: 'post',
        data: this.searchBarForm,
        url: 'sea-lineLose/synthAnalysis/queryAnalysisLineLoseDetail'
        // 71接口没有
      }).then(res => {
        this.quotaLineLoseDataDetail = res.data.data
      })

      axios.request({
        method: 'post',
        data: this.searchBarForm,
        url: 'sea-lineLose/synthAnalysis/queryAnalysisReportCompare'
        // 71接口没有

      }).then(res => {
        this.quotaCompare = res.data.data
      })

      axios.request({
        method: 'post',
        data: this.searchBarForm,
        url: 'sea-lineLose/synthAnalysis/queryAnalysisFcGc'
      }).then(res => {
        this.quotaFcGc = res.data.data
      })
    },
    selectOrg (data) {
      this.searchBarForm.orgName = data.orgName
      this.searchBarForm.orgNo = data.orgNo
      this.searchBarForm.orgType = data.orgType
      this.showOrgFlag = false
    },
    changeDate (date) {
      this.searchBarForm.date = date
    },
    changeDateType (val) {
      if (val === 'day') {
        this.searchBarForm.date =
          this.searchBarForm.date.length === 10 ? this.searchBarForm.date : this.searchBarForm.date + '-01'
      } else {
        this.searchBarForm.date =
          this.searchBarForm.date.length === 7 ? this.searchBarForm.date : this.searchBarForm.date.substring(0, 7)
      }
    },
    fullScreenClick (val) {
      this.fullScreenFlag = val
    },
    showPowerDetail () {
      this.showPowerDetailFlag = true
    },
    showTableLayer (apiName, params, day) {
      this.axiosUrl = '/sea-lineLose/unitControl/' + apiName
      let date = day !== undefined
        ? (this.searchBarForm.dateType === 'month'
          ? dateToString(this.getDate(this.searchBarForm.date), true) : formatDate(this.searchBarForm.date, day))
        : this.searchBarForm.date
      this.axiosData = {
        'orgNo': params.orgNo,
        'orgType': params.orgType,
        'dateType': this.searchBarForm.dateType,
        'statDate': date,
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
      if (apiName === 'noCalculateTgDetail') {
        this.pTgStatus = '3'
      } else if (apiName === 'normalTgDetail') {
        this.pTgStatus = '4'
      } else {
        this.pTgStatus = ''
      }

      setTimeout(() => {
        this.$refs[apiName].$refs.tables.queryTableData()
      }, 300)
    },
    getDate (dateStr) {
      let dateArr = dateStr.split('-')
      let year = parseInt(dateArr[0])
      let month
      if (dateArr[1].indexOf('0') === 0) {
        month = parseInt(dateArr[1].substring(1))
      } else {
        month = parseInt(dateArr[1])
      }
      let date = new Date(year, month - 1 - 1)
      return date
    },
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 300 : 500
    }
  },
  created () {
    this.searchBarForm = this.baseSearchBarForm
    this.$nextTick(() => {
      this.initQuotaDate()
      this.getAnalysisReportData()
    })
  },
  watch: {
    baseSearchBarForm (val) {
      this.searchBarForm = val
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
<style>
.quotaTable .table{
  position: relative
}
.quotaTable .ivu-poptip{
  position: absolute;
  bottom: 0;
  right: 60px;
  z-index: 999;
}
</style>
