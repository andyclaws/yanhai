<template>
  <div class="main" style="position:relative;">
  <Card dis-hover>
    <p slot="title" class="headTitle">台区治理计划维护</p>
    <echarts1 ref="echarts1" :searchbar="searchBarForm"></echarts1>
  </Card>

<card>
  <p slot="title" class="headTitle">计划治理明细</p>
  <p slot="extra" class="cursor"
        @click="tgdetail = ! tgdetail">
    <img src="../image/图标绿_u2312.png" width="15px" height="15px">
    新增计划台区
  </p>
  <h5 class="label">{{ label }}</h5>
  <Tables
    ref="tables"
    editable
    v-model="nowData"
    :axiosUrl="initUrl"
    :filename="'台区治理计划维护'"
    :axiosData="loadAxiosData"
    :columns="backlogColumns"

  />

</card>
  <div class="buttonBox">
    <div class="buttonBoxDiv"
         @click="searchBarFlag = !searchBarFlag">
      <img class="buttonBoxImgSearch"
           src="../image/u4215.png"
           alt="搜索" />
    </div>

    <div class="buttonBoxDiv analyze"
         @click="openAnalys">
      <img class="buttonBoxImgAnalyze"
           src="../image/高损_u4222_selected.png"
           alt="分析报告" />
      <Row>治理成效</Row>
    </div>
    </div>
  <div class="searchBar" v-show="searchBarFlag">
    <Form ref="formValidate" :model="searchBarForm" :rules="ruleValidate" :label-width="100">
      <Row>
        <Col span="5" class="red">
          <FormItem label="供电单位" prop="orgName">
            <Poptip trigger="click" placement="bottom"  v-model="showOrgFlag">
              <Input search enter-button v-model="searchBarForm.orgName"
                     :placeholder="$t('please_input_org')" style="width: 100%"/>
              <div slot="content" style="max-height: 300px; overflow-y: auto">
                <orgs :show-refresh-text="false" @on-select="selectOrg"></orgs>
              </div>
            </Poptip>
          </FormItem>
        </Col>
        <Col span="5" class="red">
          <FormItem label="台区经理" prop="menuName">
            <Input v-model="searchBarForm.custManager" placeholder="请输入台区经理" clearable></Input>
          </FormItem>
        </Col>
        <Col span="5" class="red">
          <FormItem label="时间纬度">
            <RadioGroup v-model="queryDateType">
              <Radio label="月"></Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="5" class="red">
          <FormItem label="选择日期" prop="typeRadio">
            <DatePicker type="month" placement="bottom-end" :value="searchBarForm.statDate"
                        placeholder="默认上月" v-show="queryDateType==='月'" @on-change="selectDateChange"></DatePicker>
          </FormItem>
        </Col>
        <Col span="3" class="red">
          <FormItem>
            <Button type="primary" class="margin-right-3" @click="loadData">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
 <Modal
   width="70%"
   v-model="analyze"
   class-name="vertical-center-modal"
   footer-hide
   title="分析报告">
  <div class="analyze">
    <!--<p slot="title" class="headTitle">分析报告</p>-->
<card>
  <p slot="title">分析结果</p>
  <p> 总体情况：</p>
<h5>1.截止本月，{{reportTotalOrgName}}计划治理台区共{{reportTotalPlanTgNums}}台，其中已治理{{reportTotalDealTgNums}}台，
  未治理{{reportTotalNoDealTgNums}}台，治理率为{{reportTotalPlanTgRate}}%。</h5>
  <h5>2.系统生成计划台区共{{reportSystemPlanTgNums}}台，其中已治理{{reportSystemDealTgNums}}台，
    未治理{{reportSystemNoDealTgNums}}台，治理率为{{reportSystemPlanTgRate}}%。</h5>
  <h5> 3.人工生成计划台区共{{reportManPlanTgNums}}台，其中已治理{{reportManDealTgNums}}台，
    未治理{{reportManNoDealTgNums}}台，治理率为{{reportManPlanTgRate}}%。</h5>
</card>
    <card>
      <p>结论：</p>
      <h5> 1.{{reportTotalOrgName}}较上月治理率提升{{reportCompareToLastMonth}}%，
        其中{{reportPlanTgRateMaxOrgs}}为治理率贡献较大单位；{{reportPlanTgRateMinOrgs}}为治理率贡献较小单位。</h5>
      <h5> 2.{{reportTotalOrgName}}本月已治理台区数{{reportTotalDealTgNums}}台，
        其中{{reportDealTgMaxOrg}}治理台区数最多，共计治理{{reportDealTgMaxNums}}台；
        {{reportDealTgMinOrg}}治理台区数最少，共计治理{{reportDealTgMinNums}}台。</h5>
    </card>
  </div>
 </Modal>
    <Modal
      width="70%"
      v-model="tgdetail"
      class-name="vertical-center-modal"
      footer-hide
      title="新增非计划台区明细">
    <div class="detailTable">
      <detailTable></detailTable>
    </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import echarts1 from './echarts1'
import axios from '@/libs/api.request'
import detailTable from './detailTable'
import { formatDate, dateToString } from '@/libs/index'
import Orgs from '_c/common-select-box/components/org/org.vue'
export default {
  name: 'plan-tg',
  components: {
    axios,
    Orgs,
    Tables,
    echarts1,
    formatDate,
    dateToString,
    detailTable
  },
  props: {
    initUrl: {
      type: String,
      default () {
        return '/sea-lineLose/tgLineLoseDetail/tgPlanDefend/indexStatistics'
      }
    }
  },
  data () {
    return {
      reportTotalOrgName: '',
      reportTotalPlanTgNums: '',
      reportTotalDealTgNums: '',
      reportTotalNoDealTgNums: '',
      reportTotalPlanTgRate: '',
      reportSystemPlanTgNums: '',
      reportSystemDealTgNums: '',
      reportSystemNoDealTgNums: '',
      reportSystemPlanTgRate: '',
      reportManPlanTgNums: '',
      reportManDealTgNums: '',
      reportManNoDealTgNums: '',
      reportManPlanTgRate: '',
      reportCompareToLastMonth: '',
      reportPlanTgRateMaxOrgs: '',
      reportPlanTgRateMinOrgs: '',
      reportDealTgMaxOrg: '',
      reportDealTgMaxNums: '',
      reportDealTgMinOrg: '',
      reportDealTgMinNums: '',
      searchBarForm: {
        'orgName': this.$store.state.auth.orgName,
        'orgNo': this.$store.state.auth.orgNo,
        'orgType': this.$store.state.auth.orgType,
        'statDate': dateToString(new Date(new Date().setMonth(new Date().getMonth() - 1)), true)
      },
      label: '共查询出***条计划治理台区记录数，其中已治理**个台区，还剩**个台区未治理，治理率为**%。',
      loadAxiosData: {
      },
      ruleValidate: {
        orgNo: [
          { required: true, message: '供电单位不能为空', trigger: 'blur' }
        ],
        statDate: [
          { required: true, message: '查询日期不能为空', trigger: 'blur' }
        ],
        custManager: [
          { required: true, message: '台区经理不能为空', trigger: 'blur' }
        ]
      },
      showOrgFlag: false,
      searchBarFlag: false,
      analyze: false,
      tgdetail: false,
      queryDateType: '月',
      dataType: 'month',
      searchDate: '',
      backlogColumns: [
        /* {
          type: 'selection',
          width: 60,
          align: 'center'
        }, */
        {
          title: '台区所属单位',
          key: 'orgName',
          width: 120
        },
        {
          title: '台区编号',
          key: 'tgNo',
          width: 100
        }, {
          title: '台区名称',
          key: 'tgName',
          width: 100
        }, {
          title: '加入检测日期',
          key: 'jcrq',
          width: 120
        }, {
          title: '治理月份',
          key: 'zlyf',
          width: 100
        }, {
          title: '线损治理状态',
          key: 'dealFlag',
          width: 120
        }, {
          title: '台区经理',
          key: 'managerName',
          width: 100
        }, {
          title: '联系方式',
          key: 'phone',
          width: 100
        }, {
          title: '线损趋势',
          key: 'ffw',
          width: 100
        }, {
          title: '系统任务',
          key: 'isSystem',
          width: 100
        }, {
          title: '任务派发人',
          key: 'asdf',
          width: 110
        }
      ],
      nowData: [],
      current: 0,
      total: 0,
      pageSize: 0,
      showFlag: 1
    }
  },
  created () {
    this.dealColumns()
    this.getTableData()
  },
  methods: {
    dealColumns () {
      const column = {
        title: '接受人',
        key: 'CLOSE_SFAFF_NO',
        width: 100
      }
      this.flowColumns = this.backlogColumns.slice(0)
      this.flowColumns.splice(1, 0, column)
    },
    openAnalys () {
      this.analyze = true
      axios.request({
        method: 'post',
        data: {
          orgNo: this.searchBarForm.orgNo,
          orgType: this.searchBarForm.orgType,
          custManager: this.searchBarForm.custManager,
          statDate: this.searchBarForm.statDate
        },
        url: '/sea-lineLose/tgLineLoseDetail/tgPlanDefend/tgPlanReport'
      }).then(res => {
        this.reportPlanTgRateMaxOrgs = res.data.data.maxOrgs
        this.reportPlanTgRateMinOrgs = res.data.data.minOrgs
        /**/
        this.reportCompareToLastMonth = res.data.data.totalInfo.compareToLastMonth
        this.reportTotalPlanTgNums = res.data.data.totalInfo.planTgNums
        this.reportTotalDealTgNums = res.data.data.totalInfo.dealTgNums
        this.reportTotalPlanTgRate = res.data.data.totalInfo.planTgRate
        this.reportTotalNoDealTgNums = res.data.data.totalInfo.planTgNums - res.data.data.totalInfo.dealTgNums
        this.reportTotalOrgName = res.data.data.totalInfo.orgName
        /**/
        this.reportSystemPlanTgNums = res.data.data.totalSystemInfo.planTgNums
        this.reportSystemDealTgNums = res.data.data.totalSystemInfo.dealTgNums
        this.reportSystemPlanTgRate = res.data.data.totalSystemInfo.planTgRate
        this.reportSystemNoDealTgNums = res.data.data.totalSystemInfo.planTgNums -
          res.data.data.totalSystemInfo.dealTgNums
        /**/
        this.reportManPlanTgNums = res.data.data.totalManInfo.planTgNums
        this.reportManDealTgNums = res.data.data.totalManInfo.dealTgNums
        this.reportManPlanTgRate = res.data.data.totalManInfo.planTgRate
        this.reportManNoDealTgNums = res.data.data.totalManInfo.planTgNums - res.data.data.totalManInfo.dealTgNums
        /**/
        this.reportDealTgMaxOrg = res.data.data.maxTgInfo.orgName
        this.reportDealTgMaxNums = res.data.data.maxTgInfo.dealTgNums
        this.reportDealTgMinOrg = res.data.data.minTgInfo.orgName
        this.reportDealTgMinNums = res.data.data.minTgInfo.dealTgNums
      })
    },
    selectOrg (data) {
      this.searchBarForm.orgName = data.orgName
      this.searchBarForm.orgNo = data.orgNo
      this.searchBarForm.orgType = data.orgType
      this.showOrgFlag = false
    },
    getTableData () {
      this.loadAxiosData.orgNo = this.searchBarForm.orgNo
      this.loadAxiosData.orgType = this.searchBarForm.orgType
      this.loadAxiosData.statDate = this.searchBarForm.statDate
      this.loadAxiosData.custManager = this.searchBarForm.custManager
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
      axios.request({
        method: 'post',
        data: {
          orgNo: this.searchBarForm.orgNo,
          orgType: this.searchBarForm.orgType,
          custManager: this.searchBarForm.custManager,
          statDate: this.searchBarForm.statDate
        },
        url: '/sea-lineLose/tgLineLoseDetail/tgPlanDefend/indexTotal'
      }).then(res => {
        this.label = `共查询出${res.data.data.topAllTgNeedNums}条计划治理台区记录数，
        其中已治理${res.data.data.topTgsolveNums}个台区，
        还剩${res.data.data.topAllTgNeedNums - res.data.data.topTgsolveNums}个台区未治理，治理率为${res.data.data.topTgsolveRate}%。`
      })
      setTimeout(() => {
        this.searchBarFlag = false
      }, 500)
      if (this.$refs.echarts1) {
        this.$refs.echarts1.paintChars()
      }
    },
    selectDateChange (value) {
      this.searchBarForm.statDate = value
    },
    tabSelected (name) {
      this.showFlag = name
    },
    loadData () {
      this.getTableData()
    }
  }
}
</script>

<style lang='less'>
  @import "./main.less";
  /*.main{*/
    /*.ivu-card-head{*/
      /*p:nth-child(2){*/
        /*.ivu-radio-wrapper-checked{*/
          /*background-color: #448c86;*/
          /*border-color: #448c86;*/
          /*color: #fff;*/
        /*}*/
      /*}*/
    /*}*/
    /*.ivu-radio-wrapper-checked:hover{*/
      /*color: #fff;*/
    /*}*/
  /*}*/
</style>
