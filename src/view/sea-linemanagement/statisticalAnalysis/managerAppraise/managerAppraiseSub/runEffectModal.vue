<template>
  <div class="targetAnalysisModal">
    <div class="titlePanel">
      <span class="title">{{selectDateType=='day' ? '日' : '月'}}治理成效分析结果</span>
      <span style="float: right; padding: 6px">
        时间纬度
        <span style="color:red;">*</span>
        <RadioGroup v-model="selectDateType" @on-change="changeDateType">
          <Radio label="day"><span>日</span></Radio>
          <Radio label="month"><span>月</span></Radio>
        </RadioGroup>
        分析日期
        <DatePicker type="date"
                    :clearable=false
                    :value="selectDate"
                    @on-change="searchDateChange"
                    v-if="selectDateType=='day'"
                    show-week-numbers
                    placeholder="默认昨日或上月"
                    style="width: 150px"></DatePicker>
        <DatePicker type="month"
                    :clearable=false
                    :value="selectDate"
                    @on-change="searchDateChange"
                    v-if="selectDateType=='month'"
                    show-week-numbers
                    placeholder="默认昨日或上月"
                    style="width: 150px"></DatePicker>
        &nbsp;&nbsp;
        <Button
          type="primary"
          @click="queryAnalysis">查询
        </Button>
      </span>
    </div>
    <br>
    <sea-card>
      <effect-report
        :show-all="true"
        :date="reportDate"
        :date-type="selectDateType"
        :base-data="baseData"
        :effect-org="effectOrg"
        :n-day-line-loses="nDayLineLoses"
        :effect-report-items="effectReportItems"
        :is-tg-manager="true"/>
    </sea-card>
  </div>
  <!--<div class="runEffectModal" >-->
    <!--<div class="titlePanel">-->
        <!--<span class="title">日治理成效分析结果</span>-->
        <!--<span class="analysisDate">分析日期</span>-->
        <!--&lt;!&ndash;<DatePicker type="date" :value="report.date" readonly></DatePicker>&ndash;&gt;-->
      <!--<DatePicker type="date" v-model="effectDatePickerValue" @on-change="reInitEffectDate" readonly  style="width: 150px"></DatePicker>-->

    <!--</div>-->
    <!--<div style="height:475px;margin-top:10px">-->
      <!--<div class="head">-->
       <!--<div class="conclusion">总述：</div>-->
        <!--<div class="detail">-->
            <!--<p>本台区经理需治理台区<span class="spanAlarm">{{report.needGoverTgNum}}</span>台，-->
            <!--当日治理了<span  class="spanNormal">{{report.dayGoverTgNum}}</span>台，-->
            <!--新增异常台区<span class="spanAlarm">{{report.newExecptTgNum}}</span>台。-->
            <!--治理率=（{{report.dayGoverTgNum}}-{{report.newExecptTgNum}}*k/{{report.needGoverTgNum}}=<span class="spanAlarm">{{report.goverRate}}%</span>，-->
            <!--线损率降低<span  class="spanNormal">{{report.lllrReduce}}%</span>，-->
            <!--降幅<span  class="spanNormal">{{report.decline}}%</span>，-->
            <!--合格率提升<span  class="spanNormal">{{report.llqrIncrease}}%</span>，-->
            <!--涨幅<span  class="spanNormal">{{report.gain}}%</span>，-->
            <!--持续高损<span class="spanAlarm">{{report.linelossHigh}}</span>台，-->
            <!--持续负损<span class="spanAlarm">{{report.linelossLow}}</span>台，-->
            <!--持续不可算<span class="spanAlarm">{{report.linelossNocalc}}</span>台。</p>-->
        <!--</div>-->
      <!--</div>-->
       <!--<div class="body">-->
           <!--<Table :columns="columns" :data="report.list" border height="261"></Table>-->
      <!--</div>-->
      <!--<div class="foot">-->
        <!--<div class="conclusion">结论：</div>-->
        <!--<div class="detail">-->
            <!--<p>当前线损治理效果呈<span  class="spanNormal">{{report.resultStatus}}</span>状态。</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
</template>

<script>
import EffectReport from '../../SyntheticalAnalysis/report/effectReport'
import SeaCard from '_c/sea-card'
import { formatDate } from '@/libs/index.js'
import axios from '@/libs/api.request'
export default {
  name: 'runEffectModal',
  props: {
    report: {
      type: Object,
      default () {
        return {}
      }
    },
    dateType: {
      type: String,
      default () {
        return 'day'
      }
    },
    date: {
      type: String,
      default () {
        return ''
      }
    },
    orgNo: {
      type: String,
      default () {
        return ''
      }
    },
    orgType: {
      type: String,
      default () {
        return ''
      }
    }
  },
  components: {
    EffectReport,
    SeaCard
  },
  data () {
    return {
      selectDate: formatDate(undefined, -1),
      selectDateType: 'day',
      reportDate: '',
      baseData: {},
      effectOrg: {},
      nDayLineLoses: [],
      effectReportItems: []
    }
  },
  methods: {
    queryAnalysis () {
      let queryDate = {
        orgNo: this.orgNo,
        orgType: this.orgType,
        date: this.selectDate,
        dateType: this.selectDateType
      }
      this.reportDate = this.selectDate
      axios.request({
        method: 'post',
        data: queryDate,
        url: 'sea-lineLose/synthAnalysis/effectReportBase'
      }).then(res => {
        this.baseData = res.data.data
      })

      axios.request({
        method: 'post',
        data: queryDate,
        url: 'sea-lineLose/synthAnalysis/effectReportEffectOrg'
      }).then(res => {
        this.effectOrg = res.data.data
      })

      axios.request({
        method: 'post',
        data: queryDate,
        url: 'sea-lineLose/synthAnalysis/effectReportNDay'
      }).then(res => {
        this.nDayLineLoses = res.data.data.ndayLineLoses
        this.effectReportItems = res.data.data.effectReportItems
      })
    },
    searchDateChange (date) {
      this.selectDate = date
    },
    changeDateType (val) {
      if (val === 'day') {
        this.selectDate = this.selectDate.length === 10 ? this.selectDate : this.selectDate + '-01'
      } else {
        this.selectDate = this.selectDate.length === 7 ? this.selectDate : this.selectDate.substring(0, 7)
      }
    }
  },
  watch: {
    date (val) {
      this.selectDate = val
    },
    dateType (val) {
      this.selectDateType = val
    }
  }
}
</script>
