<template>
  <div style="line-height: 25px">
    <Card>
      <div style="padding: 6px">
        <p>{{removeNull(baseData.orgName)}}&nbsp;
          <!--台区总数:&nbsp;<span style="color: red"><b>{{removeNull(baseData.tgNum)}}</b></span>台,&nbsp;-->
          <!--其中-->
          运行台区数:&nbsp;<span style="color: red"><b>{{removeNull(baseData.runTgNum)}}</b></span>台,&nbsp;
          停运台区:&nbsp;<span style="color: red"><b>{{removeNull(baseData.stopTgNum)}}</b></span>台,&nbsp;
          拆除台区:&nbsp;<span style="color: red"><b>{{removeNull(baseData.removeTgNum)}}</b></span>台,&nbsp;
          可监测台区:&nbsp;<span style="color: red"><b>{{removeNull(baseData.monitorTgNum)}}</b></span>&nbsp;
          (<span style="color: #448c86"><b>{{removeNull(baseData.monitorTgRate)}}%</b></span>),&nbsp;
          <!--分布式电源台区:&nbsp;<span style="color: red"><b>{{removeNull(baseData.fcGcTgNum)}}</b></span>台,&nbsp;-->
          分布式电源台区:&nbsp;<span style="color: red"><b>{{removeNull(quotaFcGc.fcGcTgNums)}}</b></span>台
          (<span style="color: #448c86"><b>{{removeNull(quotaFcGc.fcGcTgNormalRate)}}%</b></span>),&nbsp;
          小电量台区数:&nbsp;<span style="color: red"><b>{{removeNull(baseData.smallPqTgNum)}}</b></span>台,&nbsp;
          合格台区数:&nbsp;<span style="color: red"><b>{{removeNull(baseData.normalTgNum)}}</b></span>&nbsp;
          (<span style="color: #448c86"><b>{{removeNull(baseData.normalTgRate)}}%</b></span>)。
        </p>
        <br/>
        <p>
          {{removeNull(baseData.orgName)}}&nbsp;
          台区总发电量:&nbsp;
          <b @click="showPowerDetail">
            <a style="text-decoration: underline">
              {{removeNull(baseData.gpq)}}&nbsp;
              <span style="font-size: 15px">kwh</span>
            </a>
          </b>,&nbsp;
          台区总供电量:&nbsp;
          <b @click="showPowerDetail">
            <a style="text-decoration: underline">
              {{removeNull(baseData.ppq)}}&nbsp;
              <span style="font-size: 15px">kwh</span>
            </a>
          </b>,&nbsp;
          总售电量:&nbsp;
          <b @click="showPowerDetail">
            <a style="text-decoration: underline">
              {{removeNull(baseData.spq)}}&nbsp;
              <span style="font-size: 15px">kwh</span>
            </a>
          </b>,&nbsp;
          总线损电量:&nbsp;
          <b @click="showPowerDetail">
            <a style="text-decoration: underline">
              {{removeNull(baseData.losspq)}}&nbsp;
              <span style="font-size: 15px">kwh</span>
            </a>
          </b>。
        </p>
        <br/>
        <p>
          总体线损率:&nbsp;
          <span style="color:  #448c86"><b>{{removeNull(baseData.llr)}}%</b></span>&nbsp;&nbsp;|&nbsp;&nbsp;
          <!--平均线损率:<span style="color: #448c86">{{quotaAnalysisReportData.avgLLSRate}}%</span>-->
          覆盖率:&nbsp;<span style="color: #448c86"><b>{{removeNull(baseData.coverRate)}}%</b></span>&nbsp;&nbsp;|&nbsp;&nbsp;
          采集成功率:&nbsp;<span style="color: #448c86"><b>{{removeNull(baseData.readSuccRate)}}%</b></span>
        </p>
      </div>
    </Card>

    <Card>
      <div style="padding: 6px">
        采集未覆盖台区:&nbsp;<span style="color: red"><b>{{removeNull(baseData.unCoverTgNum)}}</b></span>台,&nbsp;
        未覆盖电表数:&nbsp;<span style="color: red"><b>{{removeNull(baseData.unCoverMetNum)}}</b></span>,&nbsp;
        电量采集失败电表数:&nbsp;<span style="color: red"><b>{{removeNull(baseData.readFailMetNum)}}</b></span>。
        <br/>
        <br/>
        覆盖率低于98%台区有:&nbsp;<span style="color: red"><b>{{removeNull(baseData.coverLess98TgNum)}}</b></span>台,&nbsp;
        采集成功率低于98%有:&nbsp;<span style="color: red"><b>{{removeNull(baseData.readLess98TgNum)}}</b></span>台。
      </div>
    </Card>

    <Card>
      <div style="padding: 6px;">
        <Row type="flex" justify="center">
          <Col span="21" style="color: red; margin-bottom: 8px; text-align: center">
            <b>高损台区:&nbsp;<b>{{removeNull(baseData.highllTgNum)}}</b>台,&nbsp;占比<b>{{removeNull(baseData.highllTgRate)}}</b>%</b>
          </Col>
          <Col span="3" v-if="!fullScreenFlag">
            <span v-if="!showMore" @click="showMore = !showMore" class="textButton">显示详情</span>
            <span v-if="showMore" @click="showMore = !showMore" class="textButton">隐藏详情</span>
          </Col>
        </Row>
        <div :class="showMore || fullScreenFlag ? '' : 'hide'">
          <Row>
            <!--10 - 15 详情-->
            <Col span="8">
              <div style="border-right: 1px solid #E3E3E3;margin-right: 10px;">
                <div style="border-bottom: 1px solid #E3E3E3;width:  90%; margin-bottom: 8px">
                  <Row type="flex" justify="center">
                    <Col span="20" style="text-align: center" v-for="item in lineLoseDataDetail"
                         :key="item.orgName+'tt'" v-if="item.orgName === 'base'">
                      10%-15%:&nbsp;<b>{{removeNull(item.ll10to15TgNum)}}(台)</b></Col>
                  </Row>
                </div>
                <div v-for="item in lineLoseDataDetail" :key="item.orgName+'tenToFif'"
                     style="margin-bottom: 8px" v-if="item.orgName !== 'base'">
                  <Row type="flex" justify="center">
                    <Col span="18">{{removeNull(item.orgName)}}:&nbsp;<b>{{removeNull(item.ll10to15TgNum)}}</b></Col>
                  </Row>
                </div>
              </div>
            </Col>
            <!--15 - 20 详情 -->
            <Col span="8">
              <div style="border-right: 1px solid #E3E3E3;margin-right: 10px;">
                <div style="border-bottom: 1px solid #E3E3E3;width:  90%;margin-bottom: 8px">
                  <Row type="flex" justify="center">
                    <Col span="20" style="text-align: center" v-for="item in lineLoseDataDetail"
                         :key="item.orgName+'ff'" v-if="item.orgName === 'base'">
                      15%-20%:&nbsp;<b>{{removeNull(item.ll15to20TgNum)}}(台)</b></Col>
                  </Row>
                </div>
                <div v-for="item in lineLoseDataDetail" :key="item.orgName+'fifToTwen'"
                     style="margin-bottom: 8px" v-if="item.orgName !== 'base'">
                  <Row type="flex" justify="center">
                    <Col span="18">{{removeNull(item.orgName)}}:&nbsp;<b>{{removeNull(item.ll15to20TgNum)}}</b></Col>
                  </Row>
                </div>
              </div>
            </Col>
            <!--20 ++ 详情 -->
            <Col span="8">
              <div style="border-bottom: 1px solid #E3E3E3;width:  90%;margin-bottom: 8px">
                <Row type="flex" justify="center">
                  <Col span="20" style="text-align: center" v-for="item in lineLoseDataDetail"
                       :key="item.orgName+'mm'" v-if="item.orgName === 'base'">
                    20%以上:&nbsp;<b>{{removeNull(item.llmore20TgNum)}}(台)</b></Col>
                </Row>
              </div>
              <div v-for="item in lineLoseDataDetail" :key="item.orgName+'moreThanTwen'"
                   style="margin-bottom: 8px" v-if="item.orgName !== 'base'">
                <Row type="flex" justify="center">
                  <Col span="18">{{removeNull(item.orgName)}}:&nbsp;<b>{{removeNull(item.llmore20TgNum)}}</b></Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div :class="showMore || fullScreenFlag ? '' : 'hide'">
          <p style="color: #448c86;margin-bottom: 5px">
            负损台区(小于0):&nbsp;<b>{{removeNull(baseData.lllow0TgNum)}}</b>台,&nbsp;占比<b>{{removeNull(baseData.lllow0TgRate)}}</b>%:&nbsp;</p>
          <span style="margin-bottom: 5px" v-for="(item, index) in lineLoseData"
                :key="item.orgName+'negaLoss1'" v-if="item.orgName !== 'base'">
            {{removeNull(item.orgName)}}:&nbsp;<b>{{removeNull(item.lllow0TgNum)}}</b>
            <span v-if="(index + 1) !== lineLoseData.length">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          </span>
          <p style="color: #448c86;margin-top: 10px; margin-bottom: 5px">
            合格台区:&nbsp;<b>{{removeNull(baseData.normalTgNum)}}</b>台,&nbsp;占比<b>{{removeNull(baseData.normalTgRate)}}</b>%:&nbsp;</p>
          <span style="margin-bottom: 5px" v-for="(item, index) in lineLoseData"
                :key="item.orgName+'negaLoss2'" v-if="item.orgName !== 'base'">
            {{removeNull(item.orgName)}}:&nbsp;<b>{{removeNull(item.normalTgNum)}}</b>
            <span v-if="(index + 1) !== lineLoseData.length">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          </span>
          <p style="color: #448c86;margin-top: 10px;margin-bottom: 5px">
            不可算总数:&nbsp;<b>{{removeNull(baseData.cannotCalcTgNum)}}</b>台,&nbsp;占比<b>{{removeNull(baseData.cannotCalcTgRate)}}</b>%:&nbsp;</p>
          <span style="margin-bottom: 5px" v-for="(item, index) in lineLoseData"
                :key="item.orgName+'negaLoss3'" v-if="item.orgName !== 'base'">
            {{removeNull(item.orgName)}}:&nbsp;<b>{{removeNull(item.cannotCalcTgNum)}}</b>
            <span v-if="(index + 1) !== lineLoseData.length">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          </span>
        </div>
      </div>
    </Card>

    <Card>
      <div style="padding: 6px;">
        <p style="line-height: 40px;font-size: 20px;">
          <span class="total">结论:</span>
        </p>
        <p class="quotaP">
          &nbsp;&nbsp;&nbsp;&nbsp;1.采集覆盖率较{{compareDay}}有所
          <b :style="{color: baseData.coverRateFlag ? '#448c86' : 'red'}">
            {{removeNull(baseData.coverRateCompare)}}{{removeNull(baseData.coverRateDiff)}}
            （{{removeNull(baseData.coverRateSequ)}}%）</b>,
          <!--环比{{quotaAnalysisReportData.CCRQOQChange}}（<span style="color: #448c86;font-weight:bold">{{quotaAnalysisReportData.CCRQOQUp}}%</span>）,-->
          采集成功率较{{compareDay}}
          <b :style="{color: baseData.readSuccRateFlag ? '#448c86' : 'red'}">
            {{removeNull(baseData.readSuccRateCompare)}}{{removeNull(baseData.readSuccRateDiff)}}
            （{{removeNull(baseData.readSuccRateSequ)}}%）</b>,
          <!--环比{{quotaAnalysisReportData.CSRQOQChange}}（<span style="color: #448c86;font-weight:bold">{{quotaAnalysisReportData.CSRQOQDown}}%</span>）。-->
        </p>
        <p class="quotaP">
          &nbsp;&nbsp;&nbsp;&nbsp;2.<span>
          <!--todo-->
          <!--高损台区较{{compareDay}}{{quotaAnalysisReportData.highLossTgCompareYestdayChange}}{{quotaAnalysisReportData.highLossTgCompareYestdayAdd}}台,-->
          <!--负损台区较{{compareDay}}{{quotaAnalysisReportData.negaLossTgCompareYestdayChange}}{{quotaAnalysisReportData.negaLossTgCompareYestdayReduce}}台,-->
          <!--合格台区较{{compareDay}}{{quotaAnalysisReportData.passTgCompareYestdayChange}}{{quotaAnalysisReportData.passTgCompareYestdayAdd}}台,-->
          <!--不可算台区{{quotaAnalysisReportData.notCountTgCompareYestdayChange}}{{quotaAnalysisReportData.notCountTgCompareYestdayAdd}}台。-->
          <b>{{compareMsg}}</b>
        </span>
          合格率较{{compareDay}}
          <b :style="{color: baseData.llrNormalRateFlag ? '#448c86' : 'red'}">
            {{removeNull(baseData.llrNormalRateCompare)}}{{removeNull(baseData.llrNormalRateDiff)}}
            （ {{removeNull(baseData.llrNormalRateSequ)}}%）</b>,
          <!--环比{{quotaAnalysisReportData.passRateQOQChange}}（<span style="color: red;">{{quotaAnalysisReportData.passRateQOQUp}}%</span>）,-->
          指标较高单位:
          <b><span>{{removeNull(baseData.llrNormalRateContributeOrg)}}</span></b>&nbsp;&nbsp;||&nbsp;&nbsp;
          指标滞后单位:
          <b><span style="color: red">{{removeNull(baseData.llrNormalRateImpatOrg)}}</span></b>&nbsp;&nbsp;&nbsp;&nbsp;。
        </p>
        <p class="quotaP">
          &nbsp;&nbsp;&nbsp;&nbsp;3.线损率较{{compareDay}}
          <b :style="{color: baseData.llrFlag ? '#448c86' : 'red'}">
            {{removeNull(baseData.llrCompare)}}{{removeNull(baseData.llrDiff)}}
            （{{removeNull(baseData.llrSequ)}}%）</b>,
          <!--<span style="color: #656565;font-weight:bold">环比{{quotaAnalysisReportData.llrQOQChange}}</span>（<span style="color: #448c86;font-weight:bold">{{quotaAnalysisReportData.llrQOQDown}}%</span>）。-->
          指标较高单位:
          <b><span>{{removeNull(baseData.lllrContributeOrg)}}</span></b>&nbsp;&nbsp;||&nbsp;&nbsp;
          指标滞后单位:
          <b><span style="color: red">{{removeNull(baseData.lllrImpactOrg)}}</span></b>&nbsp;&nbsp;&nbsp;&nbsp;。
        </p>
      </div>
    </Card>
    <Card>
      <div style="padding: 6px;">
        <p style="text-align: right">报告日期:&nbsp;{{date}}&nbsp;&nbsp;&nbsp;&nbsp;</p>
      </div>
    </Card>
  </div>
</template>

<script>
import { judgeNull } from '../util'
export default {
  name: 'quota',
  props: {
    baseData: {
      type: Object,
      default () {
        return {
          cannotCalcTgNum: null,
          cannotCalcTgRate: null,
          coverLess98TgNum: null,
          coverRate: null,
          fcGcTgNum: null,
          highllTgNum: null,
          highllTgRate: null,
          lllow0TgNum: null,
          lllow0TgRate: null,
          llr: null,
          losspq: null,
          monitorTgNum: null,
          monitorTgRate: null,
          normalTgNum: null,
          normalTgRate: null,
          orgName: null,
          ppq: null,
          readFailMetNum: null,
          readLess98TgNum: null,
          readSuccRate: null,
          removeTgNum: null,
          runTgNum: null,
          smallPqTgNum: null,
          spq: null,
          stopTgNum: null,
          tgNum: null,
          unCoverMetNum: null,
          unCoverTgNum: null,
          coverRateCompare: null,
          coverRateSequ: null,
          readSuccRateCompare: null,
          readSuccRateSequ: null,
          llrCompare: null,
          llrSequ: null,
          lllrContributeOrg: null,
          lllrImpactOrg: null,
          llrNormalRateCompare: null,
          llrNormalRateSequ: null,
          llrNormalRateContributeOrg: null,
          llrNormalRateImpatOrg: null
        }
      }
    },
    quotaFcGc: {
      type: Object,
      default () {
        return {
          fcGcTgNums: '',
          fcGcTgNormalNums: '',
          fcGcTgNormalRate: ''
        }
      }
    },
    lineLoseData: {
      type: Array,
      default () {
        return []
      }
    },
    lineLoseDataDetail: {
      type: Array,
      default () {
        return []
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
    compareMsg: {
      type: String,
      default () {
        return ''
      }
    },
    fullScreenFlag: {
      type: Boolean,
      default () {
        return false
      }
    },
    saveDataFlag: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      compareDay: '昨日',
      showMore: false
    }
  },
  methods: {
    removeNull (val) {
      return judgeNull(val)
    },
    showPowerDetail () {
      this.$emit('on-showPowerDetail')
    }
  },
  watch: {
    dateType (val) {
      this.compareDay = val === 'day' ? '昨日' : '上月'
    },
    saveDataFlag (val) {
      if (val) {
        this.showMore = true
      }
    }
  }
}
</script>
<style>
  .textButton {
    font-size: 12px;
    cursor: pointer;
    transition: .3s;
  }
  .textButton:hover {
    font-weight: bold;
  }
  .hide {
    height: 0;
    overflow-y: hidden;
    transition: .3s;
  }
</style>
