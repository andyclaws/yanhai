<template>
  <div>
  <Col span="11"
       offset="2"
       class="cardDiv">
    <Card dis-hover>
      <!--cardTitle-->
      <span slot="title">
        <span class="title">上级单位：{{item.previousOrgName}} </span>
        <span style="margin-left:13px;">当前所属单位：</span>
        <span class="title2" >{{item.orgName}}</span>
        <span v-if="showRank" style="margin-left:13px;">当前排名：</span>
        <span class="title3" v-if="showRank">({{item.ranking}})</span>
        <span slot="extra">
          <a @click="showSeaModal(item)"><img class="extraImg" style="float: right" src="../../images/u3183.png" alt="详细信息"/></a>
        </span>
      </span>
      <fieldset class="fieldset">
        <legend class="argSpan argSpanTitle">管辖台区基本信息:</legend>
        <!-- <div class="fieldset-title">
           台区总数：<a class="argSpan argSpanTitle2"
                   @click="showTableLayer('tgAllNumDetail', item.orgNo,item.dataDate,item.dateType,item.orgType)">{{item.allTgNums}}</a>
         </div>-->
        <Row>
          <Col span="8">
            台区经理数：
            <a class="argSpan argSpanNormal" @click="showTableLayer('customerManagerDetail', item)">
              {{item.customerManagerNums}}
            </a>
          </Col>

          <Col span="8">
            运行台区数:
            <a class="argSpan argSpanNormal" @click="showTableLayer('operationTgDetail', item)">
              {{item.operationTgNums}}
            </a>
          </Col>

          <Col span="8">
            无台区经理的台区数:
            <a class="argSpan argSpanNormal" @click="showTableLayer('noAccountManagerTgDetail', item)">
              {{item.noCutomerManagerTgNums}}
            </a>
          </Col>

        </Row>
        <Row>
          <Col span="8">
            拆除台区总数：<a class="argSpan argSpanAlarm" @click="showTableLayer('dismantleTgDetail', item)">
            {{item.dismantleTgNums}}
          </a>
          </Col>
          <Col span="8">
            停运台区总数：
            <a class="argSpan argSpanAlarm" @click="showTableLayer('offStreamTgDetail', item)">
              {{item.offStreamTgNums}}
            </a>
          </Col>
          <Col span="8">
            未覆盖台区数：
            <a class="argSpan argSpanAlarm" @click="showTableLayer('noCoverageTgDetail', item)">
              {{item.noCoverageTgNums}}
            </a>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            分布式电源台区数:
            <a class="argSpan argSpanAlarm" @click="showTableLayer('distributedPowerTgDetail', item)">
              {{item.distributedPowerTgNums}}
            </a>
          </Col>
          <Col span="8">
            换表台区数：
            <a class="argSpan argSpanAlarm" @click="showTableLayer('exchangeTableTgDetail', item)">
              {{item.exchangeTableTgNums}}
            </a>
          </Col>
          <Col span="8">
            零电量台区数：
            <a class="argSpan argSpanAlarm" @click="showTableLayer('zeroElectricTgDetail', item)">
              {{item.zeroElectricTgNums}}
            </a>
          </Col>
        </Row>

      </fieldset>
      <fieldset class="fieldset">
        <legend class="argSpan  argSpanTitle">
          计划治理进度
        </legend>
        <div class="fieldset-title">
          线损治理率:
          <a class="argSpan argSpanNormal" @click="showTableLayer('lineLossAbsentRate', item)">
            {{item.linelossAbsentRate}}%
          </a>
        </div>
        <Row>
          <Col span="12">
            本月线损计划治理台区数:
            <a class="argSpan argSpanAlarm" @click="showTableLayer('thisMonthLineLossPlanAbsentTgDetail', item)">
              {{item.tmllossPlanAbsentTgNums}}
            </a>
          </Col>
          <Col span="12">
            本月线损实际治理台区数:
            <a class="argSpan argSpanAlarm" @click="showTableLayer('thisMonthLineLossActalAbsentTgDetail', item)">
              {{item.tmllActalAbsentTgNums}}
            </a>
          </Col>
          新增异常台区数:
          <a class="argSpan argSpanNormal" @click="showTableLayer('newAddAbnomalTgNums', item)">
            {{item.increaseAnomalyTgNums}}
          </a>
        </Row>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="argSpan  argSpanTitle">
          指标信息
        </legend>
        <div class="fieldset-title">
          台区线损合格率：
          <a class="argSpan argSpanNormal" @click="showTableLayer('tgLineLossQualifiedRateDetail', item)">
            {{item.tgLinelossQualifiedRate}}%
          </a>
        </div>
        <Row>
          <Col span="8">
            {{ gpqName }}：
            <a class="argSpan argSpanNormal" @click="showTableLayer('allGpqDetail', item)">{{item.allGpq}}</a>
          </Col>
          <Col span="8">
            {{ ppqName }}：
            <a class="argSpan argSpanNormal" @click="showTableLayer('allPpqDetail', item)">{{item.allPpq}}</a>
          </Col>
          <Col span="8">
            {{ spqName }}：
            <a class="argSpan argSpanNormal" @click="showTableLayer('allSpqDetail', item)">{{item.allSpq}}</a>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            总线损电量:
            <a class="argSpan argSpanNormal" @click="showTableLayer('allLineLossElectricDetail', item)">
              {{item.allLinelossElectric}}
            </a>
          </Col>
          <Col span="12">
            总台区线损率：
            <a class="argSpan argSpanNormal" @click="showTableLayer('allTgLineLossRateDetail', item)">
              {{item.allTgLinelossRate}}%
            </a>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            台区在线监测率
            <a class="argSpanNormal" @click="showTableLayer('tgOnlineMonitorRateDetail', item)">
              {{item.tgOnlineMoniterRate}}%
            </a>
            (
            <a class="argSpanAlarm" @click="showTableLayer('tgOnlineMonitorOnlineNumDetail', item)">
              {{item.tgOnlineMoniterOnlineNums}}
            </a>
            /
            <a class="argSpanNormal" @click="showTableLayer('tgOnlineMonitorAllNumDetail', item)">
              {{item.tgOnlineMoniterAllNums}}
            </a>
            )
          </Col>
          <Col span="12">
            采集覆盖率:
            <a class="argSpanNormal" @click="showTableLayer('collectCoverageRateDetail', item)">
              {{item.collectCoverageRate}}%&nbsp;
            </a>
            (
            <a class="argSpanAlarm" @click="showTableLayer('collectCoverageNumDetail', item)">
              {{item.collectCoverageNums}}&nbsp;
            </a>
            /
            <a class="argSpanNormal" @click="showTableLayer('collectAllNumDetail', item)">
              {{item.collectAllNums}}&nbsp;
            </a>
            )
          </Col>
        </Row>
        <Row>
          <Col span="12">
            示值采集成功率:
            <a class="argSpan argSpanNormal" @click="showTableLayer('indicationCollectSuccessRateDetail', item)">
              {{item.icsuccessRate}}%
            </a>
            <!--(
            <a class="argSpan argSpanAlarm"
               @click="showTableLayer('indicationCollectSuccessNumDetail', item.orgNo,item.dataDate,item.dateType,item.orgType)">{{item.indicationCollectSuccessNumDetail}}</a>
            /
            <a class="argSpan argSpanNormal"
               @click="showTableLayer('indicationCollectAllNumDetail', item.orgNo,item.dataDate,item.dateType,item.orgType)">{{item.indicationCollectAllNumDetail}}</a>
            )-->
          </Col>
          <Col span="12">
            费控成功率:
            <a class="argSpanNormal" @click="showTableLayer('feeControlSuccessRateDetail', item)">
              {{item.costcontrolSuccessRate}}%
            </a>
            (
            <a class="argSpanAlarm" @click="showTableLayer('feeControlSuccessNumDetail', item)">
              {{item.costcontrolSuccessNum}}
            </a>
            /
            <a class="argSpanNormal" @click="showTableLayer('feeControlAllNumDetail', item)">
              {{item.costcontrolAllNum}}
            </a>
            )
          </Col>
        </Row>
        <Row>
          <Col span="6"> 负损台区总数：
            <a class="argSpan argSpanAlarm" @click="showTableLayer('minusLossTgDetail', item)">
              {{item.minusLossTgNums}}
            </a>
          </Col>
          <Col span="6"> 高损台区总数：
            <a class="argSpan argSpanAlarm" @click="showTableLayer('highLossTgDetail', item)">
              {{item.highLossTgNums}}
            </a>
          </Col>
          <Col span="6"> 不可算台区总数：
            <a class="argSpan argSpanNormal" @click="showTableLayer('noCalculateTgDetail', item)">
              {{item.noCalculateTgNums}}
            </a>
          </Col>
          <Col span="6"> 合格台区总数：
            <a class="argSpan argSpanNormal" @click="showTableLayer('normalTgDetail', item)">
              {{item.normalTgNums}}
            </a>
          </Col>
        </Row>
        <Row>
          <!--停运台区供电量超200千瓦时的台区数:-->
          {{ daytgName }}
          <a class="argSpan argSpanAlarm" @click="showTableLayer('offStreamTgPpg200KwhTgDetail', item)">
            {{offSteamNums}}
          </a>
        </Row>
        <Row>
          {{ monthtgName }}
          <a class="argSpan argSpanAlarm" @click="showTableLayer('operationTgPpq1000KwhHighLossTgDetail', item)">
            {{onSteamNums}}
          </a>
        </Row>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="argSpan  argSpanTitle">
          指标关联信息
        </legend>
        <Row>
          <Col span="8">
            疑似窃电台区数：
            <a @click="showTableLayer('questionablyStealElectricTgDetail', item)" class="argSpan argSpanAlarm">
              {{item.qseTgNums}}
            </a>
          </Col>
          <Col span="8">
            配变异常台区数:
            <a class="argSpan argSpanAlarm" @click="showTableLayer('distributionTransformAnomalyTgDetail', item)">
              {{item.dtaTgNums}}
            </a>
          </Col>
          <Col span="8">
            小电量台区数:
            <a class="argSpan argSpanAlarm" @click="showTableLayer('littleElectricTgDetail', item)">
              {{item.littleElectricTgNums}}
            </a>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            档案异常涉及台区数：
            <a class="argSpan argSpanAlarm" @click="showTableLayer('recordAnomalyTgDetail', item)">
              {{item.recordAnomalyTgNums}}
            </a>
          </Col>
          <Col span="8">
            计量异常台区数：
            <a @click="showTableLayer('meterAnomalyTgDetail', item)" class="argSpan argSpanAlarm">
              {{item.meterAnomalyTgNums}}
            </a>
          </Col>
          <Col span="8">
            用电异常台区数：
            <a @click="showTableLayer('electricAnomalyTgDetail', item)" class="argSpan argSpanAlarm">
              {{item.eatgNums}}
            </a>
          </Col>
        </Row>
      </fieldset>
    </Card>
  </Col>
  </div>
</template>

<script>
import axios from '@/libs/api.request'
export default {
  name: 'card-item',
  comments: {
    axios
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    item2: {
      type: Object,
      default () {
        return {}
      }
    },
    ppqName: {
      type: String,
      default () {
        return ''
      }
    },
    spqName: {
      type: String,
      default () {
        return ''
      }
    },
    gpqName: {
      type: String,
      default () {
        return ''
      }
    },
    daytgName: {
      type: String,
      default () {
        return ''
      }
    },
    monthtgName: {
      type: String,
      default () {
        return ''
      }
    },
    total: {
      type: Number,
      default () {
        return 1
      }
    },
    showRank: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      change: this.item.orgName,
      items: this.item,
      offSteamNums: '',
      onSteamNums: ''
    }
  },
  methods: {
    /**
       * 展示seamodal
       * @param item
       */
    showSeaModal (item) {
      this.$parent.showSeaModal(item.orgName, item.orgNo, item.orgType, item.dataDate, item.dateType, item)
    },
    /**
       * 展示modal
       * @param apiName
       * @param item
       */
    showTableLayer (apiName, item) {
      this.$parent.showTableLayer(apiName, item.orgNo, item.dataDate, item.dateType, item.orgType)
    }
  },
  watch: {
    item2 () {
      this.offSteamNums = ''
      this.onSteamNums = ''
      axios.request({
        method: 'post',
        data: {
          orgNo: this.item.orgNo,
          orgType: this.item.orgType,
          statDate: this.item.dataDate,
          dateType: this.item.dateType
        },
        url: '/sea-lineLose/unitControl/offOnTgNums'
      }).then(res => {
        this.offSteamNums = res.data.data.list[0].offStreamTgPpg200KwhTgNums
        this.onSteamNums = res.data.data.list[0].otgPpq1000KwhHighLossTgNums
      })
    }
  },
  mounted () {
    axios.request({
      method: 'post',
      data: {
        orgNo: this.item.orgNo,
        orgType: this.item.orgType,
        statDate: this.item.dataDate,
        dateType: this.item.dateType
      },
      url: '/sea-lineLose/unitControl/offOnTgNums'
    }).then(res => {
      this.offSteamNums = res.data.data.list[0].offStreamTgPpg200KwhTgNums
      this.onSteamNums = res.data.data.list[0].otgPpq1000KwhHighLossTgNums
    })
  }
}
</script>

<style scoped>

</style>
