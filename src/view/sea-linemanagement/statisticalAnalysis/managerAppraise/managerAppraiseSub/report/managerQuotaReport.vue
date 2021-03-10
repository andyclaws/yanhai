<template>
  <div style="line-height: 25px">
    <div style="margin-top: 30px" class="report">
      <Card class="gray">
        <div class="padding6">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          本单位&nbsp;(&nbsp;<span><b>{{removeNull(tgManagerReport.orgName)}}</b></span>&nbsp;)&nbsp;
          管辖台区经理数:&nbsp;<span><b class="red">{{removeNull(tgManagerReport.custManagerNum)}}</b></span>,&nbsp;
          运行台区数:&nbsp;<span><b class="red">{{removeNull(tgManagerReport.runTgNum)}}</b></span>,&nbsp;
          停运台区:&nbsp;<span><b class="red">{{removeNull(tgManagerReport.stopTgNum)}}</b></span>,&nbsp;
          拆除台区:&nbsp;<span><b class="red">{{removeNull(tgManagerReport.removeTgNum)}}</b></span>,&nbsp;
          整体线损率:&nbsp;<span><b class="red">{{removeNull(tgManagerReport.lLlr)}}%</b></span>,&nbsp;
          线损合格率:&nbsp;<span><b class="red">{{removeNull(tgManagerReport.linelossNormalTgRate)}}%</b></span>。
          覆盖率低于98%的台区数量:&nbsp;<span><b class="red">{{removeNull(tgManagerReport.coverRate98TgNum)}}</b></span>,&nbsp;
          采集成功率低于98%的台区数量:&nbsp;<span><b class="red">{{removeNull(tgManagerReport.readSuccRate98TgNum)}}</b></span>。
        </div>
      </Card>
      <br>
      <Card>
        <div class="padding6">
          <Row>
            <Col span="12">
              <div>
                <table style="text-align: center">
                  <th>管辖台区整体线损率</th>
                  <tr style="height: 40px;">线损率0到7的台区经理数:&nbsp;<b class="red">{{removeNull(tgManagerReportDetail.llr0to7Num)}}</b>人
                  </tr>
                  <tr style="height: 40px;">线损率7到10的台区经理数:&nbsp;<b class="red">{{removeNull(tgManagerReportDetail.llr7to10Num)}}</b>人
                  </tr>
                  <tr style="height: 40px;">线损率10以上的台区经理数:&nbsp;<b class="red">{{removeNull(tgManagerReportDetail.llrMore10Num)}}</b>人
                  </tr>
                </table>
              </div>
            </Col>
            <Col span="1">
              <div><span style="border-left: 1px solid #adadad; height: 180px;display: inline-block"></span></div>
            </Col>
            <Col span="11">
              <div>
                <table style="text-align: center">
                  <th>管辖台区线损合格率</th>
                  <tr>合格率60以下的台区经理数:&nbsp;<b class="red">{{removeNull(tgManagerReportDetail.norRateLess60Num)}}</b>人
                  </tr>
                  <tr>合格率60到70的台区经理数:&nbsp;<b class="red">{{removeNull(tgManagerReportDetail.norRate60to70Num)}}</b>人
                  </tr>
                  <tr>合格率70到80的台区经理数:&nbsp;<b class="red">{{removeNull(tgManagerReportDetail.norRate70to80Num)}}</b>人
                  </tr>
                  <tr>合格率80到90的台区经理数:&nbsp;<b class="red">{{removeNull(tgManagerReportDetail.norRate80to90Num)}}</b>人
                  </tr>
                  <tr>合格率90到100的台区经理数:&nbsp;<b class="red">{{removeNull(tgManagerReportDetail.norRate90to100Num)}}</b>人
                  </tr>
                </table>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
      <br>
      <!--<Card>-->
        <!--<div class="padding6">-->
          <!--<div><b>结论:</b>&nbsp;</div>-->
          <!--<div class="gray">-->
            <!--<p>&nbsp;&nbsp;&nbsp;&nbsp;-->
              <!--1.&nbsp;&nbsp;管辖台区的线损率高于本单位平均线损率的台区经理有{{removeNull(tgManagerReportCompare.highLlrCustManagers)}};&nbsp;&nbsp;&nbsp;&nbsp;-->
              <!--管辖台区的线损率低于本单位平均线损率的台区经理有{{removeNull(tgManagerReportCompare.lowLlrCustManagers)}}。-->
            <!--</p>-->
            <!--<p>&nbsp;&nbsp;&nbsp;&nbsp;-->
              <!--2.&nbsp;&nbsp;管辖台区的合格率高于本单位线损合格率的台区经理有{{removeNull(tgManagerReportCompare.highNorRateCustManagers)}};&nbsp;&nbsp;&nbsp;&nbsp;-->
              <!--管辖台区的合格率低于本单位线损合格率的台区经理有{{removeNull(tgManagerReportCompare.lowNorRateCustManagers)}}。-->
            <!--</p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</Card>-->
      <Card style="padding: 6px">
        <div><b>结论:</b>&nbsp;</div>
        <span style="font-size: 15px">管辖台区的线损率<b style="color: red; font-size: 16px">高于</b>本单位平均线损率的台区经理有:</span>
        <Tables
          :height="''"
          :filename="'线损率高于本单位平均线损率的台区经理'"
          :bottomTools="bottomTools"
          :value = "tgManagerReportCompare.highLlrCustManagers ? tgManagerReportCompare.highLlrCustManagers : []"
          :columns = "columns"
        />
        <br>

        <span style="font-size: 15px">管辖台区的线损率<b style="color: rgb(68, 140, 134); font-size: 16px">低于</b>本单位平均线损率的台区经理有:</span>
        <Tables
          :height="''"
          :filename="'线损率低于本单位平均线损率的台区经理'"
          :bottomTools="bottomTools"
          :value = "tgManagerReportCompare.lowLlrCustManagers ? tgManagerReportCompare.lowLlrCustManagers : []"
          :columns = "columns"
        />
        <br>

        <span style="font-size: 15px">管辖台区的合格率<b style="color: rgb(68, 140, 134); font-size: 16px">高于</b>本单位线损合格率的台区经理有:</span>
        <Tables
          :height="''"
          :filename="'合格率高于本单位线损合格率的台区经理'"
          :bottomTools="bottomTools"
          :value = "tgManagerReportCompare.highNorRateCustManagers ? tgManagerReportCompare.highNorRateCustManagers : []"
          :columns = "columns"
        />
        <br>

        <span style="font-size: 15px">管辖台区的合格率<b style="color: red; font-size: 16px">低于</b>本单位线损合格率的台区经理有:</span>
        <Tables
          :height="''"
          :filename="'合格率低于本单位线损合格率的台区经理'"
          :bottomTools="bottomTools"
          :value = "tgManagerReportCompare.lowNorRateCustManagers ? tgManagerReportCompare.lowNorRateCustManagers : []"
          :columns = "columns"
        />
      </Card>
      <br>
      <Card>
        <div class="padding6">
          <p style="text-align: right">报告日期:&nbsp;{{date}}&nbsp;&nbsp;&nbsp;&nbsp;</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { judgeNull } from '../../../SyntheticalAnalysis/util'
import Tables from '_c/tables'

export default {
  name: 'managerQuotareport',
  components: { Tables },
  props: {
    tgManagerReport: {
      type: Object,
      default () {
        return {}
      }
    },
    tgManagerReportDetail: {
      type: Object,
      default () {
        return {}
      }
    },
    tgManagerReportCompare: {
      type: Object,
      default () {
        return {}
      }
    },
    date: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      bottomTools: ['export'],
      columns: [{
        'title': '供电单位',
        'key': 'orgName',
        'width': 120
      },
      {
        'title': '客户经理',
        'key': 'custManagers',
        'width': 120
      }
      ]
    }
  },
  methods: {
    removeNull (val) {
      return judgeNull(val)
    }
  },
  watch: {
    tgManagerReport (val) {
      console.log('tgManagerReport: ', val)
    },
    tgManagerReportDetail (val) {
      console.log('tgManagerReportDetail: ', val)
    },
    tgManagerReportCompare (val) {
      console.log('tgManagerReportCompare: ', val)
    }
  }
}
</script>
<style lang="less">
  .padding6 {
    padding: 6px;
  }

  .red {
    color: red;
  }

  .gray {
    color: gray;
  }

  .miss-card .report .ivu-card {
    margin-top: 0 !important
  }
</style>
