<template>
  <div class="analysisReport">
    <div class="titlePanel">
      <span class="title">分析结果</span>
      <div style="float: right; padding: 3px 15px 0 0">
        <span class="time">时间纬度</span>
        <span class="asterisk">*</span>
        <RadioGroup v-model="dateType" @on-change="changeDateType">
          <Radio label="day"><span>日</span></Radio>
          <Radio label="month"><span>月</span></Radio>
        </RadioGroup>
        <span class="analysisDate">分析日期</span>
        <DatePicker v-if="dateType === 'day'"
                    type="date"
                    @on-change="searchDateChange"
                    :value="date"
                    :clearable=false
                    placeholder="默认昨日或上月"/>
        <DatePicker v-if="dateType === 'month'"
                    :clearable=false
                    type="month"
                    @on-change="searchDateChange"
                    :value="date"
                    placeholder="默认昨日或上月"/>
        <Button type="primary" @click="queryReport">查询</Button>
      </div>
    </div>
    <sea-card>
      <div class="contentPanel" style=" width:98%;height:300px;margin:10px auto">
        <div class="conclusion">结论:&nbsp;</div>
        <div class="detail">
            <span>
              该台区经理管辖台区&nbsp;<b>{{tgManagerScore.tgNum}}</b>台,&nbsp;
              线损率&nbsp;<b>{{tgManagerScore.lLlr}}%</b>，
              线损合格率&nbsp;<b>{{tgManagerScore.linelossNormalTgRate}}%</b>,&nbsp;
              线损治理率&nbsp;<b>{{tgManagerScore.llrDealRate}}%</b>,&nbsp;
              采集成功率&nbsp;<b>{{tgManagerScore.readSuccRate}}%</b>,&nbsp;
              采集覆盖率&nbsp;<span>{{tgManagerScore.metCoverRate}}%</span>。
            </span>
          <hr>
          <span>台区经理评价分 = 1/8 * 线损率 + 2/8 * 线损合格率 + 2/8 * 线损治理率 + 2/8 * 采集成功率 + 1/8 * 采集覆盖率。</span>
          <hr>
          <span>
            台区经理总评价分<b>{{tgManagerScore.custManagerScore}}</b>分,&nbsp;
            在该供电所的<b>{{tgManagerScore.orgTotalManagers}}</b>个台区经理中,&nbsp;
            排名第<b>{{tgManagerScore.rank}}</b>位。</span>
          <hr>
        </div>
      </div>
    </sea-card>
  </div>
</template>

<script>
import axios from '@/libs/api.request'
import { formatDate } from '@/libs/index'
import SeaCard from '_c/sea-card'

export default {
  name: 'analysisReport',
  components: { SeaCard },
  props: {
    custManagerNo: {
      type: String,
      default () {
        return ''
      }
    },
    queryDate: {
      type: String,
      default () {
        return formatDate(undefined, -1)
      }
    },
    queryDateType: {
      type: String,
      default () {
        return 'day'
      }
    }
  },
  data () {
    return {
      dateType: 'day',
      date: formatDate(undefined, -1),
      tgManagerScore: {}
    }
  },
  methods: {
    searchDateChange (value) {
      this.date = value
      this.$emit('analysis-date-change', value, this.dateType)
    },
    changeDateType (val) {
      if (val === 'day') {
        this.date =
          this.date.length === 10 ? this.date : this.date + '-01'
      } else {
        this.date =
          this.date.length === 7 ? this.date : this.date.substring(0, 7)
      }
    },
    // analysisQuery () {
    //   axios.request({
    //     method: 'post',
    //     data: this.param,
    //     url: '/sea-lineLose/custManagerAssess/queryAnalysisResult'
    //   }).then(response => {
    //     let title = '<div><span style="color: #5EEE0F; font-size: 18px; margin-right: 30px">台区经理：' + response.data.data.custManagerName + '</span><span style="color: #5EEE0F; font-size: 14px">线损率：' +
    //       response.data.data.lllr + '%</span><span style="color: #66FFCC; font-size: 14px"> | ' + response.data.data.allRate + '%</span></div>'
    //     let subTitle = "<div style='color: #fff; font-size: 13px'>台区总数：" + response.data.data.tgNums + ' | 停运台区数：' + response.data.data.stopTgNum +
    //       ' | 合格台区数：' + response.data.data.passTgTgNum + ' | 高损台区数：' + response.data.data.linelossHighTgNum + '(' + response.data.data.linelossLowTgNum + ')  负损台区数：' + response.data.data.linelossLowTgNum +
    //       ' | 线损降幅：' + response.data.data.downrate + '%</div>'
    //     console.log('mananger_analysisReport', this.title)
    //     this.scoreShow = this.score
    //     console.log('trend' + subTitle)
    //     // this.$emit('window-trend-analysis-subtitle',subTitle,title)
    //     this.$emit('analysis-query', subTitle, title)
    //   })
    // },
    queryReport () {
      let queryData = {
        custManagerNo: this.custManagerNo,
        date: this.date,
        dateType: this.dateType
      }
      axios.request({
        method: 'post',
        data: queryData,
        url: 'sea-lineLose/synthAnalysis/tgManagerScore'
      }).then(res => {
        this.tgManagerScore = res.data.data
      })
    }
  },
  watch: {
    queryDate (val) {
      this.date = val
    },
    queryDateType (val) {
      this.dateType = val
    }
  }
}
</script>
<style lang="less">
  .analysisReport .titlePanel, .analysisReport .contentPanel {
    margin-top: 10px;
    height: 36px;
    background: #ffffff;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(226, 226, 226, 1);
    border-radius: 4px;
  }

  .analysisReport .detail {
    padding: 20px;

  }

  .analysisReport .contentPanel span {
    font-family: 'Arial Negreta', 'Arial';
    font-style: normal;
    font-size: 14px;
  }

  .analysisReport .contentPanel span span {
    font-family: 'Arial Negreta', 'Arial';
    font-weight: 500;
    font-style: normal;
    font-size: 14px;
    color: #009999;
  }

  .analysisReport hr {
    color: grey;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .analysisReport .title {
    font-family: 'Arial Negreta', 'Arial';
    font-weight: 800;
    font-style: normal;
    font-size: 20px;
    color: #009999;
  }

  .analysisReport .conclusion {
    font-family: 'Arial Negreta', 'Arial';
    font-weight: 700;
    font-style: normal;
    font-size: 17px;
    color: #009999;
    margin-top: 15px;
    margin-left: 10px;
  }

  .analysisReport .time {
    margin-left: 240px;
    font-size: 16px;
  }

  .analysisReport .asterisk {
    margin-left: 1px;
    margin-right: 20px;
    font-size: 16px;
    color: red;
  }

  .analysisReport .analysisDate {
    margin-left: 15px;
    margin-right: 15px;
  }

  .analysisReport .ivu-date-picker {
    width: 130px;
    margin-right: 10px;
  }
</style>
