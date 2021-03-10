<template>
  <div class="targetAnalysisModal">
    <div class="titlePanel">
      <span class="title">分析结果</span>
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
    <div style="clear: both"></div>
    <sea-card :style="{maxHeight: tableHeight - 100 + 'px', overflowY: 'auto'}">
      <manager-quota-report
        :tg-manager-report="tgManagerReport"
        :tg-manager-report-detail="tgManagerReportDetail"
        :tg-manager-report-compare="tgManagerReportCompare"
        :date="reportDate"/>
    </sea-card>
  </div>
</template>

<script>
import ManagerQuotaReport from './report/managerQuotaReport'
import SeaCard from '_c/sea-card'
import { formatDate } from '@/libs/index.js'
import axios from '@/libs/api.request'

export default {
  name: 'targetAnalysisModal',
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
    ManagerQuotaReport,
    SeaCard
  },
  data () {
    return {
      tableHeight: 500,
      selectDate: formatDate(undefined, -1),
      selectDateType: 'day',
      tgManagerReport: {},
      tgManagerReportDetail: {},
      tgManagerReportCompare: {},
      reportDate: ''
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
        url: 'sea-lineLose/synthAnalysis/tgManagerReportBase'
      }).then(res => {
        this.tgManagerReport = res.data.data
      })

      axios.request({
        method: 'post',
        data: queryDate,
        url: 'sea-lineLose/synthAnalysis/tgManagerReportDetail'
      }).then(res => {
        this.tgManagerReportDetail = res.data.data
      })

      axios.request({
        method: 'post',
        data: queryDate,
        url: 'sea-lineLose/synthAnalysis/tgManagerReportCompare'
      }).then(res => {
        this.tgManagerReportCompare = res.data.data
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
    },
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 180 : 600
    }
  },
  watch: {
    date (val) {
      this.selectDate = val
    },
    dateType (val) {
      this.selectDateType = val
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
