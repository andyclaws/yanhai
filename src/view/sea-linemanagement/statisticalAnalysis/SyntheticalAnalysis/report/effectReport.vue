<template>
  <div>
    <Card>
      <div style="padding: 6px">
        <p class="effectP">
          <b><span class="total">总述:&nbsp;</span></b>
          本单位&nbsp;<b>({{removeNull(baseData.orgName)}})</b>&nbsp;
          需治理台区:&nbsp;<b><span style="color: red">{{removeNull(baseData.needDealTgNum)}}</span></b>台,&nbsp;
          当前治理了:&nbsp;<b><span style="color: red">{{removeNull(baseData.llrNormal0)}}</span></b>台,&nbsp;
          新增异常台区:&nbsp;<b><span style="color: red">{{removeNull(baseData.lllrNonormalNum)}}</span></b>台。
          <!--治理率=({{baseData.goveredTg}}/-->
          <!--{{baseData.newExceTg}}*k)/-->
          <!--{{baseData.needGoverTg}}%=-->
          治理率:&nbsp;<b><span style="color: #448c86">{{removeNull(baseData.llrDealRate)}}%</span></b>,&nbsp;
          <span v-if="!isTgManager">
            {{removeNull(effectOrg.llrDealContributeOrg)}}&nbsp;为贡献单位,&nbsp;
            {{removeNull(effectOrg.llrDealImpactOrg)}}&nbsp;为影响单位。
          </span>
        </p>
        <br/>
        <p class="effectP">
          线损率{{removeNull(baseData.lLlrDiffEffect)}}
          <b><span style="color: red">{{removeNull(baseData.lLlrDiff)}}%</span></b>&nbsp;
          (&nbsp;{{removeNull(baseData.lLlrSequEffect)}}
          <b><span style="color: red">{{removeNull(baseData.lLlrSequ)}}%</span></b>)&nbsp;;&nbsp;
          <span v-if="!isTgManager">
            {{removeNull(effectOrg.lLlrContributeOrg)}}线损率下降;&nbsp;
            {{removeNull(effectOrg.lLlrImpactOrg)}}线损率上升。
          </span>
          合格率{{removeNull(baseData.llrNormalRateDiffEffect)}}
          <b><span style="color: red">{{removeNull(baseData.llrNormalRateDiff)}}%</span></b>&nbsp;
          (&nbsp;{{removeNull(baseData.llrNormalRateSequEffect)}}
          <b><span style="color: red">{{removeNull(baseData.llrNormalRateSequ)}}%</span></b>&nbsp;);&nbsp;
          <span v-if="!isTgManager">
            {{removeNull(effectOrg.llrNormalRateImpatOrg)}}合格率下降;&nbsp;
            {{removeNull(effectOrg.llrNormalRateContributeOrg)}}合格率上升。
          </span>
          <span v-if="isTgManager">
            持续高损
            <span v-for="item in nDayLineLoses" :key="item.orgName+'continHighLoss1'" v-if="item.orgName === 'base'">
              <b style="color: red">{{removeNull(item.linelossHighNTgNum)}}</b>
            </span>
            台,&nbsp;
            持续负损
            <span v-for="item in nDayLineLoses" :key="item.orgName+'continLowLoss1'" v-if="item.orgName === 'base'">
              <b style="color: red">{{removeNull(item.linelossLowNTgNum)}}</b>
            </span>
            台,&nbsp;
            持续不可算
            <span v-for="item in nDayLineLoses" :key="item.orgName+'lenelossNocalcNTgNum1'" v-if="item.orgName === 'base'">
              <b style="color: red">{{removeNull(item.lenelossNocalcNTgNum)}}</b>
            </span>
            台。
          </span>
          <br/>
          <br/>

          <span v-if="!isTgManager">
            持续高损
            <span v-for="item in nDayLineLoses" :key="item.orgName+'continHighLoss1'" v-if="item.orgName === 'base'">
              <b>{{removeNull(item.linelossHighNTgNum)}}</b>
            </span>
            台:&nbsp;&nbsp;
            <span v-for="(item, index) in nDayLineLoses" :key="item.orgName+'continHighLoss'" v-if="item.orgName !== 'base'">
              {{removeNull(item.orgName)}}&nbsp;<b>({{removeNull(item.linelossHighNTgNum)}})</b>&nbsp;
              <span v-if="(index + 1) !== nDayLineLoses.length">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            </span>
            <br/>
            <br/>
            持续负损
            <span v-for="item in nDayLineLoses" :key="item.orgName+'continLowLoss1'" v-if="item.orgName === 'base'">
              <b>{{removeNull(item.linelossLowNTgNum)}}</b>
            </span>
            台:&nbsp;&nbsp;
            <span v-for="(item, index) in nDayLineLoses" :key="item.orgName+'continLowLoss'" v-if="item.orgName !== 'base'">
              {{removeNull(item.orgName)}}&nbsp;<b>({{removeNull(item.linelossLowNTgNum)}})</b>&nbsp;
              <span v-if="(index + 1) !== nDayLineLoses.length">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            </span>
            <br/>
            <br/>
            持续不可算
            <span v-for="item in nDayLineLoses" :key="item.orgName+'lenelossNocalcNTgNum1'" v-if="item.orgName === 'base'">
              <b>{{removeNull(item.lenelossNocalcNTgNum)}}</b>
            </span>
            台:&nbsp;&nbsp;
            <span v-for="(item, index) in nDayLineLoses" :key="item.orgName+'lenelossNocalcNTgNum'" v-if="item.orgName !== 'base'">
              {{removeNull(item.orgName)}}&nbsp;<b>({{removeNull(item.lenelossNocalcNTgNum)}})</b>&nbsp;
              <span v-if="(index + 1) !== nDayLineLoses.length">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            </span>
          </span>
        </p>
      </div>
    </Card>
    <Card>
      <div style="text-align: right;margin: 5px 8px 0">
        <span v-if="!showMore" @click="showMore = !showMore" class="textButton">显示治理明细详情</span>
        <span v-if="showMore" @click="showMore = !showMore" class="textButton">隐藏治理明细详情</span>
      </div>
      <div style="margin: 6px" :class="showMore || fullScreenFlag ? '' : 'hide'">
        <div class="manageControlUnit">
          <Row>
            <Col span="3">
              <div style="border-right: 1px solid #E3E3E3;margin-right: 17px;">
                <p class="center">管控单位</p>
              </div>
            </Col>
            <Col span="3">
              <div style="border-right: 1px solid #E3E3E3;margin-right: 17px;">
                <p class="center">治理对象</p>
              </div>
            </Col>
            <Col span="8">
              <div style="border-right: 1px solid #E3E3E3;margin-right: 17px;">
                <div style="border-bottom: 1px solid #E3E3E3;width:  90%;">
                  <p class="center">{{compareDay}}合格率成效</p>
                </div>
                <div>
                  <Row>
                    <Col span="8"><p class="center">治好</p></Col>
                    <Col span="8"><p class="center">治坏</p></Col>
                    <Col span="8"><p class="center">正常</p></Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span="8">
              <div style="border-right: 1px solid #E3E3E3;margin-right: 17px;">
                <div style="border-bottom: 1px solid #E3E3E3;width:  90%;">
                  <p class="center">{{compareDay}}线损率成效</p>
                </div>
                <div>
                  <Row>
                    <Col span="8"><p class="center">上月</p></Col>
                    <Col span="8"><p class="center">{{this.dateType === 'day' ? '当日' : '当月'}}</p></Col>
                    <Col span="8" style="color: #448c86"><p class="center">降幅</p></Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span="2">
              <p class="center">得分</p>
            </Col>
          </Row>
          <Divider style="margin: 10px 0px 5px"/>
        </div>
        <div
             v-for="item in effectReportItems"
             :key="item.orgName+'manaContrBot'"
             class="manageControlUnitBottom"
             style="border-bottom: 1px solid #E3E3E3;margin-bottom: 5px">
          <Row>
            <Col span="3">
              <div style="margin-right: 17px;">
                <p>{{removeNull(item.orgName)}}</p>
              </div>
            </Col>
            <Col span="3">
              <div>
                <p class="center"><b>{{removeNull(item.needDealTgNum)}}</b></p>
              </div>
            </Col>
            <Col span="8">
              <div style="margin-right: 17px;">
                <div>
                  <Row>
                    <Col span="8"><p class="center"><b>{{removeNull(item.llrNormal0)}}</b></p></Col>
                    <Col span="8"><p class="center"><b>{{removeNull(item.llrNormal1)}}</b></p></Col>
                    <Col span="8"><p class="center"><b>{{removeNull(item.llrNormal2)}}</b></p></Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span="8">
              <div style="margin-right: 17px;">
                <div>
                  <Row>
                    <Col span="8"><p class="center"><b>{{removeNull(item.lLlrLastMon)}}%</b></p></Col>
                    <Col span="8"><p class="center"><b>{{removeNull(item.lLlrLastDay)}}%</b></p></Col>
                    <Col span="8" style="color: #448c86"><p class="center"><b>{{removeNull(item.lLlrRaise)}}%</b></p></Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span="2">
              <p class="p1, center"><b>{{removeNull(item.lLlrScore)}}</b></p>
            </Col>
          </Row>
          <!--<Divider style="margin: 5px 0px"/>-->
        </div>
      </div>
    </Card>
    <Card>
      <div style="padding: 6px">
        <p class="effectP">
          <b><span class="total">结论:</span></b>
          当前线损治理效果呈<b>&nbsp;<span style="color: #448c86">{{removeNull(baseData.lLlrEffect)}}</span>&nbsp;</b>状态
          <span v-if="!isTgManager">
            ,
            <span style="color: #448c86">{{removeNull(effectOrg.llrDealContributeOrg)}}</span>
            治理效果较好,
            <span style="color: red">{{removeNull(effectOrg.llrDealImpactOrg)}}</span>
            越治越差
          </span>
          。
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
  name: 'effectReport',
  props: {
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
    baseData: {
      type: Object,
      default () {
        return {
          lLlrDiff: null,
          lLlrEffect: null,
          lLlrNonormalNum: null,
          lLlrSequ: null,
          lllrDiff: null,
          lllrEffect: null,
          lllrNonormalNum: null,
          lllrSequ: null,
          llrDealRate: null,
          llrNormalRateDiff: null,
          llrNormalRateSequ: null,
          needDealTgNum: null,
          orgName: null,
          orgNo: null,
          orgType: null,
          llrNormalRateSequEffect: null,
          llrNormalRateDiffEffect: null,
          lLlrSequEffect: null,
          lLlrDiffEffect: null
        }
      }
    },
    effectOrg: {
      type: Object,
      default () {
        return {
          lLlrContributeOrg: '',
          lLlrImpactOrg: '',
          lllrContributeOrg: '',
          lllrImpactOrg: '',
          llrDealContributeOrg: '',
          llrDealImpactOrg: '',
          llrNormalRateContributeOrg: '',
          llrNormalRateImpatOrg: ''
        }
      }
    },
    nDayLineLoses: {
      type: Array,
      default () {
        return []
      }
    },
    effectReportItems: {
      type: Array,
      default () {
        return []
      }
    },
    isTgManager: {
      type: Boolean,
      default () {
        return false
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
    },
    showAll: {
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
    },
    showAll (val) {
      this.showMore = val
    }
  },
  mounted () {
    if (this.showAll) {
      this.showMore = true
    }
  }
}
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
