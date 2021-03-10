<template>
  <div class="analysisReport">
    <Row>
      <Col span="24"
           class="cardDiv">
        <Card style="margin-top:-80px;margin-left:-10px;">
        <span class="title"
              slot="title">分析结果 </span>
          <p slot="extra">
            时间纬度
            <span style="color:red;">*</span>
            <RadioGroup v-model="dateType" @on-change="changeDateType">
              <Radio label="day">
                <span>日</span>
              </Radio>
              <Radio label="month">
                <span>月</span>
              </Radio>
            </RadioGroup>
            分析日期
            <DatePicker type="date"
                        :clearable=false
                        :value="date"
                        @on-change="searchDateChange"
                        v-if="dateType=='day'"
                        show-week-numbers
                        placeholder="默认昨日或上月"
                        style="width: 150px"></DatePicker>
            <DatePicker type="month"
                        :clearable=false
                        :value="date"
                        @on-change="searchDateChange"
                        v-if="dateType=='month'"
                        show-week-numbers
                        placeholder="默认昨日或上月"
                        style="width: 150px"></DatePicker>
            &nbsp;&nbsp;
            <Button
              type="primary"
              @click="analysisQuery">查询
            </Button>
          </p>
          <!--<fieldset>-->
          <!--<legend></legend>-->
          <!--<span class="argSpan argSpanNormal argSpanTitle">评分:</span>-->
          <!--<br>-->
          <!--单位评价分=1/8*线损率+2/8*线损合格率+2/8*线损消缺率+2/8*采集成功率+2/8*采集覆盖率。-->
          <!--<br>-->
          <!--单位总评价分<span class="normal">{{score.totalScore}}</span>分，-->
          <!--在该市公司的<span>{{score.allUnitInCity}}</span>个单位中，-->
          <!--排名第<span class="normal">{{score.rank}}</span>位。-->

          <!--</fieldset>-->
        </Card>

        <sea-card>
          <Card style="padding: 6px">
              <span class="argSpan argSpanNormal argSpanTitle">评分:</span>
              <br>
              单位评价分 = 1/8*线损率 + 2/8 * 线损合格率 + 2/8 * 线损消缺率 + 2/8 * 采集成功率 + 2/8 * 采集覆盖率。
              <br>
              单位总评价分<span class="normal">{{removeNull(score.totalScore)}}</span>分，
              在该市公司的<span>{{removeNull(score.allUnitInCity)}}</span>个单位中，
              排名第<span class="normal">{{removeNull(score.rank)}}</span>位。
          </Card>
          <quota-report
            :base-data="quotaBaseData"
            :line-lose-data="quotaLineLoseData"
            :line-lose-data-detail="quotaLineLoseDataDetail"
            :date-type="dateType"
            :date="date"
            :compare-msg="quotaCompare"/>
        </sea-card>
        <!--<Card>-->
        <!--<fieldset>-->
        <!--<legend></legend>-->
        <!--青海台区总数：<span class="alarm">{{data.tgCount}}</span>，-->
        <!--合格台区数：<span class="alarm">{{data.qualifiedTG}}</span>-->
        <!--<span class="normal">({{data.qualifiedRate}}%)</span>。-->
        <!--总供电量为<span class="alarm">{{data.ppq}}</span>kwh,-->
        <!--总售电量为<span class="alarm">{{data.spq}}</span>kwh。-->
        <!--总体线损率为 <span class="normal">{{data.llr}}%</span>，-->
        <!--覆盖率：<span class="normal">{{data.coverRate}}%</span>，-->
        <!--采集成功率：<span class="normal">{{data.collectSuccess}}%</span>。-->
        <!--<br>-->
        <!--采集未覆盖台区数<span class="alarm">{{data.uncoverTG}}</span>，-->
        <!--未覆盖用户<span class="alarm">{{data.uncoverCon}}</span>；-->
        <!--电量采集失败用户<span class="alarm">{{data.collectFailed}}</span>。-->
        <!--<br>-->
        <!--覆盖率低于<span class="alarm">{{data.coverBelow}}%</span>-->
        <!--台区有<span class="alarm">{{data.coverBelowTG}}</span>；-->
        <!--采集成功率低于<span class="alarm">{{data.collectSuccessBelow}}%</span>-->
        <!--的台区有<span class="alarm">{{data.collectSuccessBelowTG}}</span>。-->
        <!--</fieldset>-->
        <!--</Card>-->
      </Col>
    </Row>

    <!--<fieldset>-->
    <!--<legend></legend>-->
    <!--<Row>-->
    <!--<Col span="5">-->
    <!--<p align="center"-->
    <!--style="color:#e75d0e;">-->
    <!--<br>高损台区<br>-->
    <!--(600)<br>-->
    <!--6%:-->
    <!--</p>-->
    <!--</Col>-->
    <!--&lt;!&ndash;垂直分割线&ndash;&gt;-->
    <!--<span class="span1"></span>-->

    <!--<Col span="5">-->
    <!--<p align="center">-->
    <!--10-15：200<br>-->
    <!--</p>-->
    <!--<hr>-->
    <!--<p align="center">-->
    <!--城西区：20<br>-->
    <!--城东区：10<br>-->
    <!--城北区：15-->
    <!--</p>-->
    <!--</Col>-->
    <!--&lt;!&ndash;垂直分割线&ndash;&gt;-->
    <!--<span class="span1"></span>-->
    <!--<Col span="5">-->
    <!--<p align="center">-->
    <!--15-20：100<br>-->
    <!--</p>-->
    <!--<hr>-->
    <!--<p align="center">-->
    <!--城西区：15<br>-->
    <!--城东区：21<br>-->
    <!--城北区：33<br>-->
    <!--</p>-->
    <!--</Col>-->
    <!--&lt;!&ndash;垂直分割线&ndash;&gt;-->
    <!--<span class="span1"></span>-->
    <!--<Col span="5">-->
    <!--<p align="center">-->
    <!--20以上：300<br>-->
    <!--</p>-->
    <!--<hr>-->
    <!--<p align="center">-->
    <!--城西区：3 <br>-->
    <!--城东区：5 <br>-->
    <!--城北区：12-->
    <!--</p>-->
    <!--</Col>-->
    <!--</Row>-->

    <!--<table align="center">-->
    <!--<tr>-->
    <!--<td><span style="color:#448c86;">负损台区：300（8%）</span></td>-->
    <!--<td>城西区：33</td>-->
    <!--<td>|</td>-->
    <!--<td>城东区：200</td>-->
    <!--<td>|</td>-->
    <!--<td>城南区：200</td>-->
    <!--<td>|</td>-->
    <!--<td>城北区：200</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td><span style="color:#448c86;">合格台区：800（6%） &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>-->
    <!--<td>城西区：33</td>-->
    <!--<td>|</td>-->
    <!--<td>城东区：200</td>-->
    <!--<td>|</td>-->
    <!--<td>城南区：200</td>-->
    <!--<td>|</td>-->
    <!--<td>城北区：200</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<td><span style="color:#448c86;">不可算台区：800（6%） &nbsp;&nbsp;&nbsp;&nbsp;</span></td>-->
    <!--<td>城西区：33</td>-->
    <!--<td>|</td>-->
    <!--<td>城东区：200</td>-->
    <!--<td>|</td>-->
    <!--<td>城南区：200</td>-->
    <!--<td>|</td>-->
    <!--<td>城北区：200</td>-->
    <!--</tr>-->
    <!--</table>-->
    <!--</fieldset>-->
    <!--<fieldset>-->
    <!--<legend></legend>-->
    <!--<span class="argSpan argSpanNormal argSpanTitle">结论：</span><br>-->

    <!--&nbsp;&nbsp;1.采集覆盖率较昨日提升（<span class="alarm">0.1%</span>），-->
    <!--环比提高（<span class="alarm">20%</span>），-->
    <!--采集成功率较昨日下降（<span class="normal">0.03%</span>），-->
    <!--环比<span style="font-weight:700;">下降</span>（<span class="alarm">10%</span>）。-->
    <!--<br>-->
    <!--&nbsp;&nbsp;2.高损台区较昨日增加2台，-->
    <!--负损台区较昨日减少3台，-->
    <!--合格台区较昨日增加4台，-->
    <!--不可算台区增加2台。-->
    <!--合格率较昨日提高（<span class="alarm">5%</span>），-->
    <!--环比提高（<span class="alarm">15%</span>）。-->
    <!--指标贡献单位：城西区、城南区 || 指标影响单位：城北区、城东区-->
    <!--<br>-->
    <!--&nbsp;&nbsp;3.线损率较昨日下降（<span class="normal">0.002%</span>），-->
    <!--环比下降（<span class="normal">5%</span>）。-->
    <!--指标贡献单位：城西区、城南区 || 指标影响单位：城北区、城东区-->
    <!--</fieldset>-->
    <!--<p class="content-detail">{{analysisHtml}}</p>-->
  </div>
</template>

<script>
import QuotaReport from '../../SyntheticalAnalysis/report/quotaReport'
import SeaCard from '_c/sea-card'
import axios from '@/libs/api.request'
import { judgeNull } from '../../SyntheticalAnalysis/util'

export default {
  props: {
    analysisHtml: {
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
    },
    parentDate: {
      type: String,
      default () {
        return ''
      }
    }
  },
  components: {
    QuotaReport,
    SeaCard
  },
  data () {
    return {
      date: this.parentDate, // 默认昨天
      dateType: 'day',
      // score: {
      //   'totalScore': 99, // 单位总评价分
      //   'allUnitInCity': 50, // 该市公司单位总数
      //   'rank': 12// 排名
      // },
      data: {
        'tgCount': 20500, // 台区总数
        'qualifiedTG': 17000, // 合格台区数
        'qualifiedRate': 82.93, // 合格率
        'ppq': 99999999,
        'spq': 99999999,
        'llr': 9.23,
        'coverRate': 99.32,
        'collectSuccess': 98.99,
        'uncoverTG': 50,
        'uncoverCon': 1000,
        'collectFailed': 14000,
        'coverBelow': 98,
        'coverBelowTG': 200,
        'collectSuccessBelow': 98,
        'collectSuccessBelowTG': 300
      },
      quotaBaseData: {},
      quotaLineLoseData: [],
      quotaLineLoseDataDetail: [],
      quotaCompare: '',
      score: {}
    }
  },
  methods: {
    removeNull (val) {
      return judgeNull(val)
    },
    searchDateChange (value) {
      this.date = value
      this.$emit('analysis-date-change', value, this.dateType)
    },
    changeDateType (val) {
      if (val === 'day') {
        this.date = this.date.length === 10 ? this.date : this.date + '-01'
      } else {
        this.date = this.date.length === 7 ? this.date : this.date.substring(0, 7)
      }
    },
    analysisQuery () {
      this.$emit('analysis-query')
      this.queryReport()
    },
    queryReport () {
      let queryDate = {
        orgNo: this.orgNo,
        orgType: this.orgType,
        date: this.date,
        dateType: this.dateType
      }
      axios.request({
        method: 'post',
        data: queryDate,
        url: 'sea-lineLose/synthAnalysis/queryAnalysisBase'
      }).then(res => {
        this.quotaBaseData = res.data.data
      })

      axios.request({
        method: 'post',
        data: queryDate,
        url: 'sea-lineLose/synthAnalysis/queryAnalysisLineLose'
      }).then(res => {
        this.quotaLineLoseData = res.data.data
      })

      axios.request({
        method: 'post',
        data: queryDate,
        url: 'sea-lineLose/synthAnalysis/queryAnalysisLineLoseDetail'
      }).then(res => {
        this.quotaLineLoseDataDetail = res.data.data
      })

      axios.request({
        method: 'post',
        data: queryDate,
        url: 'sea-lineLose/synthAnalysis/queryAnalysisReportCompare'
      }).then(res => {
        this.quotaCompare = res.data.data
      })

      axios.request({
        method: 'post',
        data: queryDate,
        url: 'sea-lineLose/synthAnalysis/orgScore'
      }).then(res => {
        this.score = res.data.data
      })
    }
  }
}
</script>

<style lang="less">
  @import "../main.less";

  .analysisReport {
    width: 100%;
    height: 100%;

    .ivu-card-bordered, .ivu-card.ivu-card-dis-hover.ivu-card-bordered:hover {
      border: 1px solid #e8eaec;
    }

    .ivu-card-body {
      padding: 0px;
    }

    .normal {
      color: #448c86;
      font-size: 15px;
    }

    .alarm {
      color: #e75d0e;
      font-size: 15px;
    }

    .span1 {
      padding: 6px 8px 70px 6px;
      float: left;
      margin-left: 10px;
      border-left: 1px solid;
      border-color: #c0c7c6;
      font-size: 0;
    }

    table td {
      text-align: center;
    }
  }
</style>
