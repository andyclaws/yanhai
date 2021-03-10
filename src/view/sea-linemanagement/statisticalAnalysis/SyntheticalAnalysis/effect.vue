<template>
  <div class="effect" style="height: 1200px; position: relative" id="effect">
    <!--顶部搜索栏-->
    <div class="searchBar" :style="{height: searchBarFlag ? '100px' : '0'}">
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
                <div slot="content" style="max-height: 500px; overflow-y: auto; width: 250px">
                  <orgs :show-refresh-text="false"
                        @on-select="selectOrg"></orgs>
                </div>
              </Poptip>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem prop="dateType"
                      label="时间纬度">
              <RadioGroup v-model="searchBarForm.dateType" @on-change="changeDateType">
                <Radio label="day"><span>日</span></Radio>
                <Radio label="month"><span>月</span></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="选择日期" prop="date">
              <DatePicker type="date"
                          :value="searchBarForm.date"
                          v-if="searchBarForm.dateType === 'day'"
                          :options="selectDateDayOptions"
                          placeholder="默认前一日"
                          @on-change="changeDate"
                          format="yyyy-MM-dd"
                          :clearable="false"
                          style="width: 150px"></DatePicker>
              <DatePicker type="month"
                          :value="searchBarForm.date"
                          v-if="searchBarForm.dateType === 'month'"
                          placeholder="默认当前月"
                          @on-change="changeDate"
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
        <p slot="title" class="title" style="margin-right: 40px;">台区线损治理分析</p>
        <p slot="extra"><Button @click="governFlag = !governFlag">表格</Button></p>
        <div style="height: 400px; width: 100%">
          <tg-line-loss-govern
            :totalData="governTotalData"
            :dateType="searchBarForm.dateType"
            :change="selectedQuota"
            style="height: 100%">
          </tg-line-loss-govern>
        </div>
      </Card>
      <Card style="height: 49%; margin-top: 1%">
        <p slot="title" class="title" style="margin-right: 40px;">台区线损趋势</p>
        <p slot="extra"><Button @click="trendFlag = !trendFlag">表格</Button></p>
        <div style="height: 400px; width: 100%">
          <div style="float: left; height: 100%; width: 20%; display: flex; align-items: center; justify-content: center;" >
            <div>
              <Row v-for="(item, index) in orgList" :key="index">
                <Button v-if="item.code === checkedOrg" type="primary" style="margin-top: 3px" @click="change(item.code)">{{ item.name }}</Button>
                <Button v-if="item.code !== checkedOrg" style="margin-top: 3px" @click="change(item.code)">{{ item.name }}</Button>
              </Row>
            </div>
          </div>
          <div style="float: right; height: 100%; width: 80%">
            <tg-line-loss-trend
              :totalData="selectedOrg"
              :change="selectedQuota"
              style="height: 100%">
            </tg-line-loss-trend>
          </div>
        </div>
      </Card>
    </div>

    <!--日治理成效分析报告-->
    <div style="float: right; width: 43%; margin-top: 1%; margin-left: 1%; margin-right: 1%">
      <Card style="min-height: 983.38px">
        <span slot="title">
            <span class="title" style="margin-right: 40px;">日治理成效分析报告</span>
        </span>
        <span slot="extra">
          分析日期
          <DatePicker type="date"
                      :value="searchBarForm.date"
                      v-if="searchBarForm.dateType === 'day'"
                      @on-change="reInitEffectDate($event)"
                      :clearable=false
                      :options="selectDateDayOptions"
                      placeholder="默认前一日"
                      style="width: 150px"></DatePicker>
          <DatePicker type="month"
                      :value="searchBarForm.date"
                      v-if="searchBarForm.dateType === 'month'"
                      @on-change="reInitEffectDate($event)"
                      :clearable=false
                      placeholder="默认当前月"
                      style="width: 150px"></DatePicker>
        </span>
        <sea-card
          :exportFileName="searchBarForm.orgName + '_治理成效分析报告'"
          @on-fullScreen="fullScreenClick"
          @on-save="saveDataFlag = true"
          @on-saveEnd="saveDataFlag = false">
          <effect-report
            :date="searchBarForm.date"
            :date-type="searchBarForm.dateType"
            :base-data="baseData"
            :effect-org="effectOrg"
            :n-day-line-loses="nDayLineLoses"
            :effect-report-items="effectReportItems"
            :full-screen-flag="fullScreenFlag"
            :save-data-flag="saveDataFlag"/>
        </sea-card>
      </Card>
    </div>

    <Modal
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      v-model="governFlag"
      draggable
      :zIndex="901"
      class-name="vertical-center-modal"
      footer-hide
      title="台区线损治理分析表格">
      <div class="effectTable">
        <Tables
          ref="governTableRef"
          :height="tableHeight - 50"
          :filename="'台区线损治理分析表格'"
          :bottomTools="bottomTools"
          :columns="governTable.columns"
          :axiosUrl="governTable.axiosUrl"
          :axiosData="searchBarForm"
          @on-load-data="getGovernTableDataList"
        />
      </div>
    </Modal>

    <Modal
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      v-model="trendFlag"
      draggable
      :zIndex="901"
      class-name="vertical-center-modal"
      footer-hide
      title="台区线损趋势表格">
      <div class="effectTable">
        <Tables
          ref="trendTableRef"
          :height="tableHeight - 50"
          :filename="'台区线损趋势表格'"
          :bottomTools="bottomTools"
          :columns="trendTable.columns"
          :axiosUrl="trendTable.axiosUrl"
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
import TgLineLossGovern from './tgLineLossGovern'
import TgLineLossTrend from './tgLineLossTrend'
import Tables from '_c/tables'
import axios from '@/libs/api.request'
import Orgs from '_c/common-select-box/components/org'
import SeaCard from '_c/sea-card'
import EffectReport from './report/effectReport'
import { formatDate, numberFormat, dateToString } from '@/libs/index'
import { getData, getTitle, getTitleShow, judgeNull } from './util'
import { modalsData } from '../orgManagement/modalsData'
export default {
  name: 'effect',
  components: {
    TgLineLossGovern,
    TgLineLossTrend,
    Tables,
    axios,
    Orgs,
    SeaCard,
    EffectReport,
    windowNewlyIncreasedAlarmTgDetail: () => import('../orgManagement/windows_tables/windowNewlyIncreasedAlarmTgDetail.vue'),
    windowWithChildWindow: () => import('../orgManagement/windows_tables/windowWithChildWindow.vue'),
    windowOnlineTgRateDetail: () => import('../orgManagement/windows_tables/windowOnlineTgRateDetail.vue'),
    windowGovernLineLossTgDetail: () => import('../orgManagement/windows_tables/windowGovernLineLossTgDetail.vue')
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
        dateType: [
          { required: true, message: '请选择查询维度', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '查询日期不能为空', trigger: 'blur' }
        ]
      },

      governTotalData: [],
      governFlag: false,
      bottomTools: ['export'],
      governTable: {
        columns: [{
          'title': '供电单位',
          'key': 'orgName',
          'width': 120
        },
        {
          'title': '台区总数',
          'key': 'tgNum',
          'width': 120
        },
        {
          'title': '日治理台区数',
          'dayTitle': '日治理台区数',
          'monthTitle': '月治理台区数',
          'key': 'goverTgNum',
          'width': 120
        },
        {
          'title': '日新增异常台区数',
          'dayTitle': '日新增异常台区数',
          'monthTitle': '月新增异常台区数',
          'key': 'addExtTgNum',
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
                  this.showTableLayer('newAddAbnomalTgNums', params.row)
                }
              }
            }, params.row.addExtTgNum)
          }
        },
        {
          'title': '当日线损合格数',
          'dayTitle': '当日线损合格数',
          'monthTitle': '当月线损合格数',
          'key': 'normalTgNum',
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
            }, params.row.normalTgNum)
          }
        },
        {
          'title': '当前合格率(%)',
          'dayTitle': '当前合格率(%)',
          'monthTitle': '当月合格率(%)',
          'key': 'normalTgRate',
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
                  this.showTableLayer('tgLineLossQualifiedRateDetail', params.row, -1, true)
                }
              }
            }, numberFormat(params.row.normalTgRate))
          }
        },
        {
          'title': '上月线损率(%)',
          'dayTitle': '上月线损率(%)',
          'monthTitle': '上月线损率(%)',
          'key': 'lastMonthLlr',
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
                  this.showTableLayer('allTgLineLossRateDetail', params.row, -1, true)
                }
              }
            }, numberFormat(params.row.lastMonthLlr))
          }
        },
        {
          'title': '当前线损率(%)',
          'dayTitle': '当前线损率(%)',
          'monthTitle': '当月线损率(%)',
          'key': 'lllr',
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
            }, numberFormat(params.row.lllr))
          }
        }
        // {
        //   'title': '月合格台区数',
        //   'show': false,
        //   'dayShow': false,
        //   'monthShow': true,
        //   'key': 'lllr',
        //   'width': 120
        // },
        // {
        //   'title': '月不合格台区数',
        //   'show': false,
        //   'dayShow': false,
        //   'monthShow': true,
        //   'key': 'lllr',
        //   'width': 120
        // },
        // {
        //   'title': '上月合格台区数',
        //   'show': false,
        //   'dayShow': false,
        //   'monthShow': true,
        //   'key': 'lllr',
        //   'width': 120
        // },
        // {
        //   'title': '采集成功率',
        //   'show': false,
        //   'dayShow': false,
        //   'monthShow': true,
        //   'key': 'lllr',
        //   'width': 120
        // },
        // {
        //   'title': '采集覆盖率',
        //   'show': false,
        //   'dayShow': false,
        //   'monthShow': true,
        //   'key': 'lllr',
        //   'width': 120
        // },
        // {
        //   'title': '月在线监测率',
        //   'show': false,
        //   'dayShow': false,
        //   'monthShow': true,
        //   'key': 'lllr',
        //   'width': 120
        // },
        // {
        //   'title': '月线损率',
        //   'show': false,
        //   'dayShow': false,
        //   'monthShow': true,
        //   'key': 'lllr',
        //   'width': 120
        // }, {
        //   'title': '数据统计日期',
        //   'key': 'dataDate',
        //   'width': 120
        // }
        ],
        axiosUrl: 'sea-lineLose/synthAnalysis/queryTgLineLossMangeAnalysis'
      },
      orgList: [],
      checkedOrg: '',
      diffOrgTrend: [],
      selectedOrg: [],
      trendFlag: false,
      trendTable: {
        columns: [{
          'title': '供电单位',
          'key': 'orgName',
          'width': 120
        }, {
          'title': '线损率(%)',
          'key': 'lineLossRate',
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
            }, numberFormat(params.row.lineLossRate))
          }
        }, {
          'title': '线损治理率(%)',
          'key': 'lineLossGovernRate',
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
                  this.showTableLayer('lineLossAbsentRate', params.row)
                }
              }
            }, numberFormat(params.row.lineLossGovernRate))
          }
        }, {
          'title': '统计时间',
          'key': 'statDate',
          'width': 120
        }],
        axiosUrl: 'sea-lineLose/synthAnalysis/queryTgLineLossTrend'
      },
      baseData: {},
      effectOrg: {},
      nDayLineLoses: [],
      effectReportItems: [],
      fullScreenFlag: false,
      saveDataFlag: false,
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
            this.to = '当天'
          } else {
            this.to = '当月'
          }
          this.initEffectDate()
          this.getTrendData()
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
      this.governTable.columns.forEach(t => {
        t.title = getTitle(dateType, t.dayTitle, t.monthTitle, t.title)
        t.show = getTitleShow(dateType, t.dayShow, t.monthShow, t.show)
      })
      this.trendTable.columns.forEach(t => {
        t.title = getTitle(dateType, t.dayTitle, t.monthTitle, t.title)
      })
    },
    // 台区线损治理分析表格数据回调渲染echarts
    getGovernTableDataList (tableDataList) {
      this.governTotalData = tableDataList
    },
    // 查询表格数据
    initEffectDate () {
      this.$nextTick(() => {
        this.$refs.governTableRef.queryTableData()
      })
      this.$nextTick(() => {
        this.$refs.trendTableRef.queryTableData()
      })
    },
    reInitEffectDate (newDate) {
      this.changeDate(newDate)
      this.topPanelQuery('searchBarForm')
    },

    change (code) {
      this.selectedOrg = this.diffOrgTrend[code]
      this.checkedOrg = code
    },
    // 台区线损趋势echarts图
    getTrendData () {
      axios.request({
        method: 'post',
        data: this.searchBarForm,
        url: 'sea-lineLose/synthAnalysis/queryTgLineLossTrendCharts'
        // 71接口没有
      }).then(res => {
        let tempData = res.data.data
        let tempOrgList = []
        let tempDiffOrgTrend = []
        tempData.forEach(function (row, i) {
          let data = row.tgLineLossTrendChartsItems
          tempOrgList.push({ code: i, name: row.orgName })
          tempDiffOrgTrend.push(
            [
              { date: getData(data, 0, 'statDate'), lineLossRate: getData(data, 0, 'lineLossRate'), lineLossGovernRate: getData(data, 0, 'lineLossGovernRate'), governTgCnt: getData(data, 0, 'governTgCnt') },
              { date: getData(data, 1, 'statDate'), lineLossRate: getData(data, 1, 'lineLossRate'), lineLossGovernRate: getData(data, 1, 'lineLossGovernRate'), governTgCnt: getData(data, 1, 'governTgCnt') },
              { date: getData(data, 2, 'statDate'), lineLossRate: getData(data, 2, 'lineLossRate'), lineLossGovernRate: getData(data, 2, 'lineLossGovernRate'), governTgCnt: getData(data, 2, 'governTgCnt') },
              { date: getData(data, 3, 'statDate'), lineLossRate: getData(data, 3, 'lineLossRate'), lineLossGovernRate: getData(data, 3, 'lineLossGovernRate'), governTgCnt: getData(data, 3, 'governTgCnt') },
              { date: getData(data, 4, 'statDate'), lineLossRate: getData(data, 4, 'lineLossRate'), lineLossGovernRate: getData(data, 4, 'lineLossGovernRate'), governTgCnt: getData(data, 4, 'governTgCnt') },
              { date: getData(data, 5, 'statDate'), lineLossRate: getData(data, 5, 'lineLossRate'), lineLossGovernRate: getData(data, 5, 'lineLossGovernRate'), governTgCnt: getData(data, 5, 'governTgCnt') },
              { date: getData(data, 6, 'statDate'), lineLossRate: getData(data, 6, 'lineLossRate'), lineLossGovernRate: getData(data, 6, 'lineLossGovernRate'), governTgCnt: getData(data, 6, 'governTgCnt') }
            ]
          )
        })
        this.orgList = tempOrgList
        this.diffOrgTrend = tempDiffOrgTrend
        this.selectedOrg = this.diffOrgTrend[0]
        this.checkedOrg = tempOrgList && tempOrgList.length > 0 ? tempOrgList[0].code : ''
      })
    },
    // 分析报告
    getAnalysisReportData () {
      axios.request({
        method: 'post',
        data: this.searchBarForm,
        url: 'sea-lineLose/synthAnalysis/effectReportBase'
        // 71接口没有
      }).then(res => {
        this.baseData = res.data.data
      })

      axios.request({
        method: 'post',
        data: this.searchBarForm,
        url: 'sea-lineLose/synthAnalysis/effectReportEffectOrg'
        // 71接口没有
      }).then(res => {
        this.effectOrg = res.data.data
      })

      axios.request({
        method: 'post',
        data: this.searchBarForm,
        url: 'sea-lineLose/synthAnalysis/effectReportNDay'
        // 71接口没有
      }).then(res => {
        this.nDayLineLoses = res.data.data.ndayLineLoses
        this.effectReportItems = res.data.data.effectReportItems
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
    showTableLayer (apiName, params, day, isMonth) {
      this.axiosUrl = '/sea-lineLose/unitControl/' + apiName
      let date = day !== undefined
        ? (this.searchBarForm.dateType === 'month' || isMonth
          ? dateToString(this.getDate(this.searchBarForm.date), true) : formatDate(this.searchBarForm.date, day))
        : this.searchBarForm.date
      this.axiosData = {
        'orgNo': params.orgNo,
        'orgType': params.orgType,
        'dateType': isMonth ? 'month' : this.searchBarForm.dateType,
        'statDate': params.statDate ? params.statDate : date,
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
      this.initEffectDate()
      this.getTrendData()
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
.effectTable .table{
  position: relative
}
.effectTable .ivu-poptip{
  position: absolute;
  bottom: 0;
  right: 60px;
  z-index: 999;
}
</style>
