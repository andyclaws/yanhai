<template>
  <div>
  <Col span="11" offset="2" class="cardDiv">
    <Card dis-hover>
      <div class="header">
        <span class="title" slot="title">台区名称：{{removeNullName(item.tgName)}}</span>
        <p slot="extra" class="extra">
          <!--排名和评分先不做-->
          <!--<div>
            <div class="now-ranking">当前排名：<span>({{item.ranking}}&lt;!&ndash;/{{item.total}}&ndash;&gt;)</span></div>
            <div>
              <span class="scoreLabel">台区健康评价：</span>
              <span class="score">{{item.healthScore}}</span>
            </div>
          </div>-->
          <a href="#" @click="showSeaModal(item)">
            <span style="color: #009999;" >线损趋势</span>
            <img class="extraImg" src="../../images/u3183.png" alt="详细信息"></img>
          </a>
        </p>
      </div>
      <div class="content">
        <fieldset>
          <legend>基本档案</legend>
          <div>
            <Row>
              <Col span="7">
                <p>台区经理：<span>{{removeNullName(item.accountManagerName)}}</span></p>
              </Col>
              <Col span="9">
                <p>台区编号：<span>{{removeNullName(item.tgNo)}}</span></p>
              </Col>
              <Col span="8">
                <p>台区状态：
                  <span v-if="item.tgStatus == 1">投运</span>
                  <span v-if="item.tgStatus == 2">停运</span>
                  <span v-if="item.tgStatus == 3">拆除</span>
                  <span v-if="item.tgStatus == 4">投运前</span>
                  <span v-if="item.tgStatus == null ">-</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col span="7">
                <p>台区总表数：<span class="link" @click="showTableLayerTgZMeter('tgZMeter', item)">{{removeNullVal(item.zongMetCnt)}}</span></p>
              </Col>
              <Col span="9">
                <p>低压居民数：<span class="link" @click="showTableLayerTgZMeter('tgCons', item)">{{removeNullVal(item.lowConsCnt)}}</span></p>
              </Col>
              <Col span="8">
                <p>分布式电源：<span class="link" @click="showTableLayerTgZMeter('tgGcCons', item)">{{removeNullVal(item.gcMetCnt)}}</span></p>
              </Col>
            </Row>
            <Row>
              <Col span="16">
                <p>终端地址：<span class="link" @click="showTableLayerTgZMeter('tgTmnl', item)">{{removeNullName(item.tmnlAddr)}}</span></p>
              </Col>
              <Col span="8">
                <p><span class="link" @click="showTableLayerTgZMeter('tgLineLoseCalcModel', item)">台区线损计算模型</span></p>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <p>台区安装地址：<span>{{removeNullName(item.instAddr)}}</span></p>
              </Col>
            </Row>
          </div>
        </fieldset>
        <fieldset class="index-info">
          <legend>指标信息</legend>
          <RadioGroup v-model="selectDateType" type="button" @on-change="dateTypeChange(item, index, selectDateType)">
            <Radio label="day" type="primary"><span>日</span></Radio>
            <Radio label="month" type="primary"><span>月</span></Radio>
          </RadioGroup>

          <div  class="target-info">
            <Row>
              <Col span="6">
                <p>线损电量：<span @click="showTableLayerTarget('tgLineLosePower', item)">{{removeNullVal(item.lineLoseElec)}}kWh</span></p>
              </Col>
              <Col span="9">
                <p>线损率：<span @click="showTableLayerTarget('tgLineLoseRate', item)">{{removeNullVal(item.lllr)}}%</span></p>
              </Col>
              <Col span="9">
                <p><span @click="showTableLayerTarget('tgLineLoseDataMonitor', item)">日线损数据监测</span></p>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <p>供电量：<span @click="showTableLayer('tgPpq', item)">{{removeNullVal(item.ppq)}}kWh</span></p>
              </Col>
              <Col span="9">
                <p>售电量：<span @click="showTableLayer('tgSpq', item)">{{removeNullVal(item.spq)}}kWh</span>
                  <!--<b>（</b><span class="high-light-error" @click="showTableLayer('tgSpqRepair', item)">{{item.spqRepair}}</span><b>）</b>-->
                </p>
              </Col>
              <Col span="9">
                <p>发电量：<span @click="showTableLayer('tgGpq', item)">{{removeNullVal(item.gpq)}}kWh</span></p>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <p>负载率：<span class="high-light-error" @click="showTableLayer('tgLoadDetail', item)">{{removeNullVal(item.tgLoadRate)}}%</span></p>
              </Col>
              <Col span="9">
                <p>采集成功率：<span @click="showTableLayer('tgReadDetail', item)">{{removeNullVal(item.readSuccRate)}}%={{removeNullVal(item.readSuccNum)}}/{{removeNullVal(item.meetNeedNum)}}</span></p>
              </Col>
              <Col span="9">
                <p>采集覆盖率：<span @click="showTableLayer('tgCoverDetail', item)">{{removeNullVal(item.coverMetRate)}}%={{removeNullVal(item.coverMetNum)}}/{{removeNullVal(item.collectMetCnt)}}</span></p>
              </Col>
            </Row>
            <Row v-if="selectDateType === 'day'">
              <Col span="9">
                <p>截至目前合格次数：{{ item.normalNums }}</p>
              </Col>
            </Row>
            <Row v-if="selectDateType === 'month'">
              <Col span="6">
                <p>换表记录：<span class="high-light-error" @click="showTableLayer('tgChangeMetDetail', item)">{{removeNullVal(item.replaceMetCnt)}}</span></p>
              </Col>
              <Col span="9">
                <p>换倍率记录：<span class="high-light-error" @click="showTableLayer('tgChangeFactorDetail', item)">{{removeNullVal(item.replaceTFactor)}}</span></p>
              </Col>
            </Row>
          </div>
        </fieldset>
        <fieldset>
          <legend>异常影响信息</legend>
          <div class="alarm-info">
            <Row>
              <Col span="7">
                <p>电量计算失败数：<span @click="showTableLayer('tgPowerCalcErrorDetail', item)">{{removeNullVal(item.calcErrorCnt)}}</span></p>
              </Col>
              <Col span="6">
                <p>未覆盖电表数：<span @click="showTableLayer('tgUncoverDetail', item)">{{removeNullVal(item.unCoverCnt)}}</span></p>
              </Col>
              <Col span="6">
                <p>用电异常数：<span @click="showTableLayer('tgPowerAbnormalDetail', item)">{{removeNullVal(item.powerAbnormalCnt)}}</span></p>
              </Col>
              <Col span="5">
                <p>档案异常数：<span @click="showTableLayer('tgDataAbnormalDetail', item)">{{removeNullVal(item.dataAbnormalCnt)}}</span></p>
              </Col>
            </Row>
            <Row>
              <Col span="7">
                <p>配变异常数：<span @click="showTableLayer('tgDistributionAbnormalDetail', item)">{{removeNullVal(item.distributionAbnormalCnt)}}</span></p>
              </Col>
              <Col span="6">
                <p>零电量电表数：<span @click="showTableLayer('tgZeroPowerDetail', item)">{{removeNullVal(item.zeroPowerCnt)}}</span></p>
              </Col>
              <Col span="6">
                <p>计量异常数：<span @click="showTableLayer('tgMeteringAbnormalDetail', item)">{{removeNullVal(item.meteringAbnormalCnt)}}</span></p>
              </Col>
              <Col span="5">
                <p>疑似窃电户：<span @click="showTableLayer('tgStealElectricityDetail', item)">{{removeNullVal(item.stealElecCnt)}}</span></p>
              </Col>
            </Row>
            <Row v-if="selectDateType === 'day'">
              <Col span="8">
                <p><span @click="showTableLayer('U96datas',item)">电压</span></p>
              </Col>
              <Col span="8">
                <p><span @click="showTableLayer('I96datas',item)">电流</span></p>
              </Col>
              <Col span="8">
                <p><span @click="showTableLayer('P96datas',item)">功率</span></p>
              </Col>
            </Row>
          </div>
        </fieldset>
      </div>
    </Card>
  </Col>
  </div>
</template>

<script>
import axios from '@/libs/api.request'
export default {
  name: 'cardItem',
  components: {
    axios
  },
  data () {
    return {
      selectDateType: this.dateType,
      oneItem: this.item
    }
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    dateType: {
      type: String,
      default () {
        return ''
      }
    },
    index: {
      type: Number,
      default () {
        return 0
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
    dateTypeChange (item, key, dateType) {
      this.$emit('dateTypeChange', item, key, dateType)
    },
    removeNullVal (val) {
      let result = '0'
      if (val != null && val !== '') {
        result = val
      }
      return result
    },
    removeNullName (val) {
      let result = '-'
      if (val != null && val !== '') {
        result = val
      }
      return result
    },
    showSeaModal (item) {
      this.$parent.showSeaModal(item)
    },
    showTableLayerTgZMeter (tableName, item) {
      this.$parent.showTableLayerTgZMeter(tableName, item)
    },

    showTableLayer (apiName, item) {
      this.$parent.showTableLayer(apiName, item)
    },

    showTableLayerTarget (tableName, item) {
      this.$parent.showTableLayerTarget(tableName, item)
    },

    /**
     * 展示线损类型明细
     * @param tableName
     * @param type
     * @param item
     */
    showLineLossTypeNumDetail (tableName, type, item) {
      this.$parent.showLineLossTypeNumDetail(tableName, type, item)
    },

    /**
     * 爸爸修改子组件时间类型
     * @param type
     */
    changeDateType (type) {
      this.selectDateType = type
    }
  },
  updated () {
    this.selectDateType = this.item.dateType
  }
}
</script>

<style lang="less" scoped>
  @import "./newTgLineLossAnalysis.less";
</style>
