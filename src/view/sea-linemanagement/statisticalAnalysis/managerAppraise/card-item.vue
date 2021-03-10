<template>
    <Col span="11" offset="2" class="cardDiv">
      <Card dis-hover>
        <span class="title" slot="title">台区经理：{{item.custManagerName}};台区经理编码:{{item.custManager}}</span>
        <span class="currentRankLabel" style="margin-left:13px;">当前排名：</span>
        <span class="currentRank"> ({{ item.custManagerRank }})</span>
        <span>台区经理评价：</span>
        <span class="mark">{{item.custManagerScore}}</span>

        <span slot="extra">
          <a  href="#">
          <img class="extraImg" src="../../images/u3183.png" alt="详细信息"
               @click="showLineLossTrend('queryLineLossTrend', index, item)"/>
          </a>
        </span>
        <fieldset>
          <legend>管辖台区基本信息</legend>

          <Row>
            <Col span="12">
              台区经理联系方式：<span class="argSpan argSpanNormal">{{item.custManagerMobileNo}}</span>
            </Col>
            <Col span="12">
              下辖分布式电源台区数：
              <a href="#" class="argSpan argSpanNormal" @click="showTableLayer('queryFcGcTgDetail',item)">{{item.fcGcTgNum}}</a>
            </Col>
          </Row>
          <Row>
            <Col span="6">
              停运台区数：
              <a href="#" class="argSpan argSpanAlarm" @click="showTgDetail('queryStopTgDetail02','02',item)">{{item.stopTgNum}}</a>
            </Col>
            <Col span="6">
              拆除台区数：
              <a href="#" class="argSpan argSpanAlarm" @click="showTgDetail('queryStopTgDetail03','03',item)">{{item.removeTgNum}}</a>
            </Col>
            <Col span="6">
              运行台区数：
              <a href="#" class="argSpan argSpanNormal" @click="showTgDetail('queryStopTgDetail01','01', item)">{{item.runTgNum}}</a>
            </Col>
            <Col span="6">
              终端数：
              <a href="#" class="argSpan argSpanNormal" @click="showTableLayer('queryTmnlDetail', item)">{{item.tmnlNum}}</a>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              管辖台区主表数：
              <a href="#" class="argSpan argSpanNormal" @click="showTableLayer('queryTgMainMeterDetail', item)">{{item.mainMetNum}}</a>
            </Col>
            <Col span="8">
              户表数：
              <a href="#" class="argSpan argSpanNormal" @click="showTableLayer('queryTgConsMeterDetail', item)">{{item.consMetNum}}</a>
            </Col>
            <Col span="8">
              分布式电源用户数：
              <a href="#" class="argSpan argSpanNormal" @click="showTableLayer('queryTgFcGcConsDetail', item)">{{item.fcGcConsNum}}</a>
            </Col>
          </Row>
        </fieldset>
        <fieldset>
          <legend>计划治理进度</legend>
          <div class="rightLegend">
            线损治理率：
            <a href="#" class="argSpan1 argSpanNormal" @click="showTableLayer('queryTgEliminationDetail', item)">{{item.lineLossRemoveLackRate}}%</a>
          </div>
          <Row>
            <Col span="12">
              本月线损计划治理台区数：
              <a href="#" class="argSpan argSpanAlarm" @click="showTableLayer('queryPlanTgEliminationDetail', item)">{{item.planRemoveLackTgNum}}</a>
            </Col>
            <Col span="12">
              本月线损实际治理台区数：
              <a href="#" class="argSpan argSpanAlarm" @click="showTableLayer('queryRealTgEliminationDetail', item)">{{item.realRemoveLackTgNum}}</a>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              新增异常台区数：
              <a href="#" class="argSpan argSpanAlarm" @click="showTableLayer('queryNewExceptTgDetail', item)" >{{item.newExecptTgNum}}</a>
            </Col>
          </Row>
        </fieldset>
        <fieldset>
          <legend>指标信息</legend>
          <div class="rightLegend">
            管辖台区线损合格率：
            <a href="#" class="argSpan1 argSpanNormal" @click="showTableLayer('queryTgLineLossDetail', item)">{{item.mtgLLSuccRate}}%</a>
          </div>
          <Row>
            <Col span="9">
              <span class = "custManagerTotalGpq">日总发电量：</span>
              <a href="#" class="argSpan argSpanNormal" @click="showTableLayer('allPpqTgLineLossRateDetail', item)">{{item.gpq}}</a>
            </Col>
            <Col span="9">
              <span class = "custManagerTotalPpq">日总供电量：</span>
              <a href="#" class="argSpan argSpanNormal" @click="showTableLayer('allPpqTgLineLossRateDetail', item)">{{item.ppq}}</a>
            </Col>
            <Col span="9">
              <span class = "custManagerTotalSpq">日总售电量：</span>
              <a href="#" class="argSpan argSpanNormal" @click="showTableLayer('queryAllSpqTgLineLossRateDetail', item)">{{item.spq}}</a>
            </Col>
            <Col span="9">
              总线损电量：
              <a href="#" class="argSpan argSpanNormal" @click="showTableLayer('queryAllLlMTgLineLossRateDetail', item)">{{item.lossPq}}</a>
            </Col>
            <Col span="9">
              总线损率：
              <a href="#" class="argSpan argSpanNormal" @click="showTableLayer('queryAllLlrTgLineLossRateDetail', item)">{{item.lllr}}%</a>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              管辖台区可在线监测率：
              <a href="#" class="argSpan1 argSpanNormal" @click="showTableLayer('queryOnLineMonitorDetail', item)">{{item.isMonitorTgRate}}%</a> (
              <a href="#" class="argSpan1 argSpanAlarm" @click="showTableLayer('queryFailOnLineMonitorDetail', item)">{{item.isMonitorTgFailNum}}</a>
              / <a href="#" class="argSpan1 argSpanNormal" @click="showTableLayer('queryAllNumOnLineMonitorDetail', item)">{{item.isMonitorTgAllNum}}</a> )
            </Col>
            <Col span="12">
              采集覆盖率：
              <a href="#" class="argSpan1 argSpanNormal" @click="showTableLayer('collectCoverRateDetail', item)">{{item.metCoverRate}}%</a> (
              <a href="#" class="argSpan1 argSpanAlarm" @click="showTableLayer('collectCoverRateFailDetail', item)">{{item.metCoverFailNum}}</a>
              / <a href="#" class="argSpan1 argSpanNormal" @click="showTableLayer('collectCoverRateTotalDetail', item)">{{item.metCoverAllNum}}</a> )
            </Col>
          </Row>
          <Row>
            <Col span="12">
              管辖台区示值成功率：<a href="#" class="argSpan argSpanNormal" @click="showTableLayer('dataCollectSuccessRateDetail', item)">{{item.ivSuccRate}}%</a>
            </Col>
            <Col span="12">
              费控成功率：
              <a href="#" class="argSpan1 argSpanNormal" @click="showTableLayer('feeControlSuccessRateDetail', item)">{{item.costCtrSuccRate}}%</a> (
              <a href="#" class="argSpan1 argSpanAlarm" @click="showTableLayer('feeControlFailDetail', item)">{{item.costCtrSuccFailNum}}</a>
              / <a href="#" class="argSpan1 argSpanNormal" @click="showTableLayer('feeControlSuccessDetail', item)">{{item.costCtrSuccAllNum}}</a> )
            </Col>
          </Row>
          <Row>
            <Col span="8">
              负损台区总数：
              <a href="#" class="argSpan argSpanAlarm" @click="showLineLossTypeNumDetail('queryLineLossTypeNumDetail02','02', item)">{{item.linelossLowTgNum}}</a>
            </Col>
            <Col span="8">
              高损台区总数：
              <a href="#" class="argSpan argSpanAlarm" @click="showLineLossTypeNumDetail('queryLineLossTypeNumDetail01','01', item)">{{item.linelossHighTgNum}}</a>
            </Col>
            <Col span="8">
              不可算台区总数：
              <a href="#" class="argSpan argSpanAlarm" @click="showLineLossTypeNumDetail('queryLineLossTypeNumDetail99','99', item)">{{item.linelossNocalcTgNum}}</a>
            </Col>
            <Col span="8">
              合格台区总数：
              <a href="#" class="argSpan argSpanAlarm" @click="showLineLossTypeNumDetail('queryLineLossTypeNumDetail03','03', item)">{{item.linelossNormalTgNum}}</a>
            </Col>
          </Row>
        </fieldset>
        <fieldset>
          <legend>链接信息</legend>
          <Row>
            <Col span="6">
              电量计算失败：
              <a href="#" class="argSpan argSpanAlarm" @click="showTableLayer('electricCalcFailedDetail', item)">{{item.meterValueCalFailNum}}</a>
            </Col>
            <Col span="6">
              疑似窃电台区数：
              <a href="#" class="argSpan argSpanAlarm" @click="showTableLayer('stealElectricTgDetail', item)">{{item.elecStealNum}}</a>
            </Col>
            <Col span="6">
              配变异常数：
              <a href="#" class="argSpan argSpanAlarm" @click="showTableLayer('distributionAnomalyTgDetail', item)">{{item.transforExecptNum}}</a>
            </Col>
            <Col span="6">
              小电量台区数：
              <a href="#" class="argSpan argSpanAlarm" @click="showTableLayer('lessElectricTgDetail', item)">{{item.amallPqTgNum}}</a>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              档案异常涉及台区数：
              <a href="#" class="argSpan argSpanAlarm" @click="showTableLayer('recordAnomalyTgDetail', item)">{{item.archExecptTgNum}}</a>
            </Col>
            <Col span="8">
              计量异常涉及台区数：
              <a href="#" class="argSpan argSpanAlarm" @click="showTableLayer('meterAnomalyTgDetail', item)">{{item.calcExecptTgNum}}</a>
            </Col>
            <Col span="8">
              用电异常涉及台区数：
              <a href="#" class="argSpan argSpanAlarm" @click="showTableLayer('electricAnomalyTgDetail', item)">{{item.elecExecptTgNum}}</a>
            </Col>
          </Row>
        </fieldset>
      </Card>
    </Col>
</template>

<script>
export default {
  name: 'card-item',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    index: {
      type: Number,
      default () {
        return 1
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
  methods: {
    /**
       * 展示seamodal
       * @param item
       */
    showLineLossTrend (tableName, index, item) {
      this.$parent.showLineLossTrend(tableName, index, item)
    },
    /**
       * 展示modal
       * @param apiName
       * @param item
       */
    showTableLayer (apiName, item) {
      this.$parent.showTableLayer(apiName, item)
    },
    /**
     * 展示台区明细
     * @param tableName
     * @param type
     * @param item
     */
    showTgDetail (tableName, type, item) {
      this.$parent.showTgDetail(tableName, type, item)
    },

    /**
     * 展示线损类型明细
     * @param tableName
     * @param type
     * @param item
     */
    showLineLossTypeNumDetail (tableName, type, item) {
      this.$parent.showLineLossTypeNumDetail(tableName, type, item)
    }
  }
}
</script>

<style scoped>
  .title{
    color:  #448c86;
    font-size: 20px;
    font-weight:bold;
  }
  .currentRank,.mark{
    font-size: 20px;
    font-weight: bold;
    margin-right:30px;
    color: #D68381;
  }
  .extra{
    margin-right:20px;
    line-height: 1;
  }
  .extraImg{
    transform: rotate(45deg);
  }
  .argSpan{
    margin-right: 20px;
  }
  .argSpan1{
    margin-right: 3px;
  }
  .argSpanNormal{
    color: #448c86;
  }
  .argSpanAlarm{
    color: #D68381;
  }
  a.argSpanNormal{
    color: #448c86;
    text-decoration:underline;
  }
  a.argSpanAlarm{
    color: #D68381;
    text-decoration:underline;
  }
  .cardDiv{
    margin-top: 18px;
    margin-left: 1%;
  }
  .cardTable{
    border-spacing: 10px;
  }
  .cardTable tr:nth-child(even){
    background: #EEE;
  }
  .buttonBox{
    position: fixed;
    right: 80px;
    top: 300px;
  }
  legend {
    margin-left: 20px;
    font-family:'Arial Negreta', 'Arial';
    font-weight:600;
    font-style:normal;
    font-size:14px;
    color:#009999;
  }
  fieldset {
    padding-top: 10px;
    margin-bottom: 10px;
  }
  fieldset .ivu-col {
    padding-left: 20px;
    margin-bottom: 10px;
  }
  .rightLegend {
    float: right;
    margin-top: -30px;
    margin-right: 20px;
    background-color: #ffffff;
    width:auto;
  }
  .buttonBox{
    position: fixed;
    right: 3%;
    top: 40%;
    z-index: 900;
  }
  .buttonBoxDiv{
    width: 60px;
    height: 60px;
    background:inherit;
    border:none;
    border-radius:4px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
    font-size:16px;
    color: #ffffff;
    margin-bottom: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .buttonBoxDivSearch{
    background-color:rgba(0, 0, 0, 0.4);
  }
  .buttonBoxDivChange{
    background-color:rgba(0, 153, 153, 1);
  }
  .buttonBoxDivChange p{
    font-size: 18px;
    width: 45px;
    height: 45px;
    line-height: 22px;
    text-align: center;
  }
  .buttonBoxDivFilter{
    background-color:rgba(0, 0, 0, 0.4);
  }

  .buttonBoxDivFilter:hover{
    background-color:rgba(0, 0, 0, 0.6);
  }
  .buttonBoxDivFilter.selected{
    background-color: rgba(0, 153, 153, 1);
  }
  .buttonBoxDivMenu{
    background-color:rgba(0, 0, 0, 0.4);
  }
  .buttonBoxImgSearch{
    transform: rotate(-45deg);
  }
  .buttonBoxImgMenuBackground{
    background-image: url("../../images/u48800.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .searchBar{
    position: relative;
    top: 0;
    right: 0;
    width: 100%;
    height: 100px;
    line-height: 100px;
    z-index: 99;
    display: flex;
    align-items: center;
    background:inherit;
    background-color:rgba(252, 252, 252, 1);
    box-sizing:border-box;
    border-width:1px;
    border-style:solid;
    border-color:rgba(232, 234, 236, 1);
    border-radius:4px;
    -moz-box-shadow:0px 2px 5px rgba(0, 0, 0, 0.156862745098039);
    -webkit-box-shadow:0px 2px 5px rgba(0, 0, 0, 0.156862745098039);
    box-shadow:0px 2px 5px rgba(0, 0, 0, 0.156862745098039);
  }
  .searchBar .ivu-card-body{
    height: 100px;
    line-height: 100px;
  }
  .menu-bottom{
    position: relative;
  }
  .menu-bottom .linkBox{
    height: 150px;
    width: 180px;
    background: url("../../images/u41486.png") no-repeat;
    position:absolute;
    bottom: 0px;
    right: 60px;
    padding: 0px 10px;
  }
  .linkBox div{
    height: 42px;
    line-height: 42px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }
  .linkBox div.selected,.linkBox div:hover{
    background: url(../../images/bg_mover.png) no-repeat;
    background-size: 100% 100%;
  }
  .linkBox .comprehensive div,.linkBox .org_Management div ,.linkBox .manager_Appraise div{
    width: 28px;
    height: 28px;
    background-color: rgba(4, 223, 213, 1);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    margin: 0 15px 0 10px;
  }
  .linkBox .comprehensive{
    border-bottom: 1px solid rgba(4, 223, 213, 1);
    margin: 5px 0 5px 0;
  }
  .linkBox .org_Management{
    border-bottom: 1px solid rgba(4, 223, 213, 1);
    margin: 5px 0 5px 0;
  }
  .linkImg{
    position:absolute;
    left:0px;
    top:0px;
    width:28px;
    height:28px;
    background:inherit;
    background-color:rgba(4, 201, 223, 1);
    border:none;
    border-radius:4px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
    font-size:16px;
    color:#FFFFFF;
  }
</style>
