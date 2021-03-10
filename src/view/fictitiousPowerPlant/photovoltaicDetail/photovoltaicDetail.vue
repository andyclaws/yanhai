<template>
  <div class="photovoltaicDetail" :style="mainHeight">
    <Card class="photoDetailMainCard">
      <div class="pdTitle">{{pdInfo.name}}</div>
      <Row :gutter="6" class="mainRowCol">
        <i-col span="7" class="leftCol">
          <Row class="baseInfoRow">
            <Card class="baseInfoCard">
              <div class="baseInfoTitle">基础信息</div>
              <div class="baseInfoBody">
                <Row :gutter="6">
                  <i-col span="12">
                    <span class="pdInfoText">电站名称:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.baseInfo.elecName}}</span>
                  </i-col>
                  <i-col span="12">
                    <span class="pdInfoText">光伏板面积:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.baseInfo.pdCardSpread}}㎡</span>
                  </i-col>
                </Row>
                <Row :gutter="6">
                  <i-col span="12">
                    <span class="pdInfoText">装机容量:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.baseInfo.machineInner}}MW</span>
                  </i-col>
                  <i-col span="12">
                    <span class="pdInfoText">设计利用小时数:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.baseInfo.useHours}}h</span>
                  </i-col>
                </Row>
                <Row :gutter="6">
                  <i-col span="12">
                    <span class="pdInfoText">并离网状态:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.baseInfo.netStatus}}</span>
                  </i-col>
                  <i-col span="12">
                    <span class="pdInfoText">逆变器总数:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.baseInfo.changeMacTotal}}台</span>
                  </i-col>
                </Row>
                <Row :gutter="6">
                  <i-col span="24">
                    <span class="pdInfoText">首次并网日期:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.baseInfo.firstInNetDate}}</span>
                  </i-col>
                </Row>
              </div>
            </Card>
          </Row>
          <Row class="runtimeRow">
            <Card class="runtimeCard">
              <div class="runtimeTitle">运行信息</div>
              <div class="runtimeBody">
                <Row :gutter="6">
                  <i-col span="10">
                    <span class="pdInfoText">并网电压:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.runtimeInfo.inNetUI}}</span>
                  </i-col>
                  <i-col span="14">
                    <span class="pdInfoText">并网电流:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.runtimeInfo.inNetI}}A</span>
                  </i-col>
                </Row>
                <Row :gutter="6">
                  <i-col span="10">
                    <span class="pdInfoText">并网无功:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.runtimeInfo.inNetUPower}}kW</span>
                  </i-col>
                  <i-col span="14">
                    <span class="pdInfoText">年最大发电功率:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.runtimeInfo.yearBigestPower}}kW</span>
                  </i-col>
                </Row>
                <Row :gutter="6">
                  <i-col span="10">
                    <span class="pdInfoText">并网频率:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.runtimeInfo.inNetInterval}}Hz</span>
                  </i-col>
                  <i-col span="14">
                    <span class="pdInfoText">平均发电利用小时数:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.runtimeInfo.hourAvgUseCounts}}h</span>
                  </i-col>
                </Row>
                <Row :gutter="6">
                  <i-col span="24">
                    <span class="pdInfoText">发电效率:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.runtimeInfo.supportElecEffectity}}</span>
                  </i-col>
                </Row>
                <Row :gutter="6">
                  <i-col span="24">
                    <span class="pdInfoText">年最大发电功率发生时间:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.runtimeInfo.yearBiggestSEDate}}</span>
                  </i-col>
                </Row>
              </div>
            </Card>
          </Row>
          <Row class="weatherRow">
            <Card class="weatherCard">
              <div class="weatherTitle">气象信息</div>
              <div class="weatherBody">
                <Row :gutter="6">
                  <i-col span="12">
                    <span class="pdInfoText">温度:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.weatherInfo.temp}}℃</span>
                  </i-col>
                  <i-col span="12">
                    <span class="pdInfoText">辐照:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.weatherInfo.irra}}w/㎡</span>
                  </i-col>
                </Row>
                <Row :gutter="6">
                  <i-col span="12">
                    <span class="pdInfoText">湿度:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.weatherInfo.hum}}%</span>
                  </i-col>
                  <i-col span="12">
                    <span class="pdInfoText">风速:&nbsp;</span>
                    <span class="pdInfoValue">{{pdInfo.weatherInfo.windSpeed}}m/s</span>
                  </i-col>
                </Row>
              </div>
            </Card>
          </Row>
          <Row class="cutPowerRow">
            <Card class="cutPowerCard">
              <div class="cutPowerTitle">节能减排</div>
              <Row :gutter="6" class="cutPowerRowCol">
                <i-col span="5">
                  <div class="cutPowerImgControl cutCo">
                    <img src="./images/u10570.png" />
                  </div>
                </i-col>
                <i-col span="11">
                  <span class="cutPowerText">CO2减排</span>
                </i-col>
                <i-col span="8">
                  <span class="cutPowerValue">{{pdInfo.cutPowerInfo.cutCo}}</span>
                  <span class="cutPowerText">t/年</span>
                </i-col>
              </Row>
              <div class="cutPowerLineImgCol">
                <img />
              </div>
              <Row :gutter="6">
                <i-col span="5">
                  <div class="cutPowerImgControl cutSo">
                    <img src="./images/u10577.png" />
                  </div>
                </i-col>
                <i-col span="11">
                  <span class="cutPowerText">SO2减排</span>
                </i-col>
                <i-col span="8">
                  <span class="cutPowerValue">{{pdInfo.cutPowerInfo.cutSo}}</span>
                  <span class="cutPowerText">t/年</span>
                </i-col>
              </Row>
              <div class="cutPowerLineImgCol">
                <img />
              </div>

              <Row :gutter="6">
                <i-col span="5">
                  <div class="cutPowerImgControl cutC">
                    <img src="./images/u10584.png" />
                  </div>
                </i-col>
                <i-col span="11">
                  <span class="cutPowerText">节约标煤</span>
                </i-col>
                <i-col span="8">
                  <span class="cutPowerValue">{{pdInfo.cutPowerInfo.cutC}}</span>
                  <span class="cutPowerText">t/年</span>
                </i-col>
              </Row>
            </Card>
          </Row>
        </i-col>
        <i-col span="17" class="rightCol">
          <Row class="realPowerRow">
            <Card class="realPowerCard">
              <div class="pdRightTitle">||| 发电实时功率</div>
              <div class="pgRightMain">
                <RealTimeCurve :curveDatas="curveDatas" style="height: 100%;" />
              </div>
              <div></div>
            </Card>
          </Row>
          <Row class="elecSupportMonthRow">
            <Card class="elecSupportMonthCard">
              <div class="pdRightTitle">||| 发电量月统计</div>
              <!-- 单位: (kWh) -->
              <div class="pgRightMain">
                <MonthPlan :monthData="monthData" style="height: 100%;" />
              </div>
            </Card>
          </Row>
          <Row class="subDeviceInfoRow">
            <Card class="subDeviceInfoCard">
              <div class="subDeviceTitle">||| 设备因子信息</div>
              <Carousel v-model="value1" class="subDeviceCar">
                <CarouselItem v-for="(itemArr, index) in formatSubInfos" :key="index">
                  <Row>
                    <i-col span="12" v-for="(item, innerIndex) in itemArr" :key="innerIndex">
                      <SubDeviceCard :subDeviceInfo="item" @changeModalFlag="changeModalFlag" />
                    </i-col>
                  </Row>
                </CarouselItem>
              </Carousel>
            </Card>
          </Row>
        </i-col>
      </Row>
    </Card>
    <Modal
      width="1000px"
      draggable
      :zIndex="901"
      v-model="showModalFlag"
      class-name="vertical-center-modal photovoltaicDeviceModal"
      footer-hide
      title="单个逆变器设备详情"
    >
      <Card>
        <div class="modalMain">
          <Row :gutter="20">
            <i-col span="10" class="textIcol">
              <Card>
                <div class="leftModalTitle">||| 详细信息</div>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="12">
                    <span class="modalText">设备名称:</span>
                    <span class="modalValue">{{deviceObj.deviceName}}</span>
                  </i-col>
                  <i-col span="12">
                    <span class="modalText">逆变器状态:</span>
                    <div class="circleControl outLine" v-if="deviceObj.deviceStatus === '0'">
                      <img src="./images/u8728.png" />
                    </div>
                    <div class="circleControl" v-if="deviceObj.deviceStatus === '1'">
                      <img src="./images/u8726.png" />
                    </div>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="12">
                    <span class="modalText">直流功率:</span>
                    <span class="modalValue">{{deviceObj.dcp}}kW</span>
                  </i-col>
                  <i-col span="12">
                    <span class="modalText">通讯状态:</span>
                    <div class="circleControl outLine" v-if="deviceObj.commStatus === '0'">
                      <img src="./images/u8728.png" />
                    </div>
                    <div class="circleControl" v-if="deviceObj.commStatus === '1'">
                      <img src="./images/u8726.png" />
                    </div>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="12">
                    <span class="modalText">直流电压:</span>
                    <span class="modalValue">{{deviceObj.dcv}}V</span>
                  </i-col>
                  <i-col span="12">
                    <span class="modalText">发电状态:</span>
                    <div class="circleControl outLine" v-if="deviceObj.sEStatus === '0'">
                      <img src="./images/u8728.png" />
                    </div>
                    <div class="circleControl" v-if="deviceObj.sEStatus === '1'">
                      <img src="./images/u8726.png" />
                    </div>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="12">
                    <span class="modalText">直流电流:</span>
                    <span class="modalValue">{{deviceObj.dcc}}A</span>
                  </i-col>
                  <i-col span="12">
                    <span class="modalText">故障状态:</span>
                    <div class="circleControl outLine" v-if="deviceObj.expStatus === '0'">
                      <img src="./images/u8728.png" />
                    </div>
                    <div class="circleControl" v-if="deviceObj.expStatus === '1'">
                      <img src="./images/u8726.png" />
                    </div>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="12">
                    <span class="modalText">交流有功:</span>
                    <span class="modalValue">{{deviceObj.aca}}kW</span>
                  </i-col>
                  <i-col span="12">
                    <span class="modalText">Ua:</span>
                    <span class="modalValue">{{deviceObj.ua}}V</span>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="12">
                    <span class="modalText">交流无功:</span>
                    <span class="modalValue">{{deviceObj.acr}}kW</span>
                  </i-col>
                  <i-col span="12">
                    <span class="modalText">Ub:</span>
                    <span class="modalValue">{{deviceObj.ub}}V</span>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="12">
                    <span class="modalText">日发电量:</span>
                    <span class="modalValue">{{deviceObj.todaySE}}MWh</span>
                  </i-col>
                  <i-col span="12">
                    <span class="modalText">Uc:</span>
                    <span class="modalValue">{{deviceObj.uc}}V</span>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="12">
                    <span class="modalText">月发电量:</span>
                    <span class="modalValue">{{deviceObj.monthSE}}MWh</span>
                  </i-col>
                  <i-col span="12">
                    <span class="modalText">la:</span>
                    <span class="modalValue">{{deviceObj.la}}A</span>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="12">
                    <span class="modalText">年发电量:</span>
                    <span class="modalValue">{{deviceObj.yearSE}}MWh</span>
                  </i-col>
                  <i-col span="12">
                    <span class="modalText">lb:</span>
                    <span class="modalValue">{{deviceObj.lb}}A</span>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="12">
                    <span class="modalText">功率因数:</span>
                    <span class="modalValue">{{deviceObj.powerCount}}</span>
                  </i-col>
                  <i-col span="12">
                    <span class="modalText">lc:</span>
                    <span class="modalValue">{{deviceObj.lc}}A</span>
                  </i-col>
                </Row>
              </Card>
            </i-col>
            <i-col span="14">
              <Card class="rightModalMain">
                <div class="rightModalTitle">||| 交流有功(kW)</div>
                <div class="rightModalCharts">
                  <ActivePower :curveDatas="activeCurveDatas" style="height: 342px;" />
                </div>
              </Card>
            </i-col>
          </Row>
        </div>
      </Card>
    </Modal>
  </div>
</template>

<script>
import { getFormatDate, formatDate } from '@/libs/index'
import '@/view/fictitiousPowerPlant/photovoltaicDetail/photovoltaicDetail.less'
import SubDeviceCard from './subDeviceCard.vue'
import RealTimeCurve from './realTimeCurve.vue'
import MonthPlan from './monthPlan.vue'
import ActivePower from './activePower.vue'

export default {
  name: 'photovoltaic-detail',
  components: {
    SubDeviceCard,
    RealTimeCurve,
    MonthPlan,
    ActivePower
  },
  props: {},
  data () {
    return {
      value1: 0,
      mainHeight: 'height: 820px;',
      pdInfo: {
        name: '宝龙1号机组光伏系统',
        baseInfo: {
          elecName: '光伏电站A',
          pdCardSpread: '120',
          machineInner: '1.2',
          useHours: '1200',
          netStatus: '并网',
          changeMacTotal: '12',
          firstInNetDate: '2019年9月17日'
        },
        runtimeInfo: {
          inNetUI: '220',
          inNetI: '22',
          inNetUPower: '220',
          yearBigestPower: '230',
          inNetInterval: '50',
          hourAvgUseCounts: '500',
          supportElecEffectity: '0.8',
          yearBiggestSEDate: '2019-2-7 11:00:00'
        },
        weatherInfo: {
          temp: '22',
          irra: '2400',
          hum: '55',
          windSpeed: '3'
        },
        cutPowerInfo: {
          cutCo: '1.1',
          cutSo: '2.2',
          cutC: '22'
        },
        subDeviceInfos: [
          {
            deviceName: '逆变器1号',
            deviceImg: '',
            unChangeInner: '220',
            supportElecPower: '400',
            changeMacStatus: '1'
          },
          {
            deviceName: '逆变器2号',
            deviceImg: '',
            unChangeInner: '221',
            supportElecPower: '401',
            changeMacStatus: '0'
          },
          {
            deviceName: '逆变器3号',
            deviceImg: '',
            unChangeInner: '223',
            supportElecPower: '403',
            changeMacStatus: '0'
          },
          {
            deviceName: '逆变器4号',
            deviceImg: '',
            unChangeInner: '225',
            supportElecPower: '402',
            changeMacStatus: '1'
          }
        ]
      },
      curveDatas: [],
      monthData: [],
      formatSubInfos: [],
      showModalFlag: false,
      deviceObj: {
        deviceName: '逆变器一号',
        deviceStatus: '1',
        dcp: '38.1',
        commStatus: '1',
        dcv: '38.1',
        sEStatus: '1',
        dcc: '38.1',
        expStatus: '1',
        aca: '38.1',
        ua: '38.1',
        acr: '38.1',
        ub: '38.1',
        todaySE: '38.1',
        uc: '38.1',
        monthSE: '38.1',
        la: '38.1',
        yearSE: '38.1',
        lb: '38.1',
        powerCount: '0.8',
        lc: '38.1'
      },
      activeCurveDatas: []
    }
  },
  mounted () {
    this.changeHeight()
    this.getFormatData()
    let that = this
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
  },
  created () {
    var _this = this
    this.$nextTick(() => {
      setTimeout(_this.setTestData, 500)
    })
  },
  methods: {
    changeModalFlag: function (val) {
      let _this = this
      if (_this.showModalFlag !== val) {
        _this.showModalFlag = val
      }
      if (_this.showModalFlag) {
        _this.$nextTick(() => {
          _this.activeCurveDatas = [
            '300',
            '320',
            '350',
            '380',
            '450',
            '520',
            '570',
            '480',
            '420',
            '380',
            '375',
            '325',
            '325'
          ]
        })
      }
    },
    setTestData: function () {
      this.curveDatas = [1, 2]
      this.monthData = [
        {
          planName: '0901',
          peakPlan: '1000',
          peakReal: '1000',
          peakComplateRate: '100'
          // peelPlan: "50",
          // peelReal: "25",
          // peelComplateRate: "50"
        },
        {
          planName: '0902',
          peakPlan: '1000',
          peakReal: '1000',
          peakComplateRate: '100'
          // peelPlan: "50",
          // peelReal: "25",
          // peelComplateRate: "50"
        },
        {
          planName: '09033',
          peakPlan: '1000',
          peakReal: '1000',
          peakComplateRate: '100'
          // peelPlan: "50",
          // peelReal: "25",
          // peelComplateRate: "50"
        },
        {
          planName: '0904',
          peakPlan: '1000',
          peakReal: '1000',
          peakComplateRate: '100'
          // peelPlan: "50",
          // peelReal: "25",
          // peelComplateRate: "50"
        },
        {
          planName: '0905',
          peakPlan: '1000',
          peakReal: '1000',
          peakComplateRate: '100'
          // peelPlan: "50",
          // peelReal: "25",
          // peelComplateRate: "50"
        }
      ]
    },
    getFormatData () {
      let list = this.pdInfo.subDeviceInfos
      if (list.length > 0) {
        let arr = []
        for (let index = 0; index < list.length; index++) {
          arr.push(list[index])
          if (index % 2 !== 0) {
            this.formatSubInfos.push(arr)
            arr = []
          }
        }
        if (arr.length > 0) {
          this.formatSubInfos.push(arr)
        }
      }
    },
    changeHeight: function () {
      this.mainHeight = 'height: ' + (window.innerHeight - 140) + 'px'
    }
  },
  watch: {},
  beforeDestroy () {}
}
</script>
<style scoped>
.photovoltaicDetail {
  position: relative;
  width: 100%;
  min-height: 650px;
  background-color: #fcfcfc;
}

.photovoltaicDetail .photoDetailMainCard {
  position: relative;
  height: 100%;
}

.photovoltaicDetail .pdTitle {
  position: relative;
  width: 100%;
  height: 35px;
  background: linear-gradient(
    180deg,
    rgba(252, 252, 252, 1) 0%,
    rgba(252, 252, 252, 1) 0%,
    rgba(246, 246, 246, 1) 100%,
    rgba(246, 246, 246, 1) 100%
  );
  box-sizing: border-box;
  border: 1px solid rgba(226, 226, 226, 1);
  border-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  font-weight: 700;
  font-size: 14px;
  color: #009999;
  line-height: 32px;
  padding-left: 15px;
}

.photovoltaicDetail .mainRowCol {
  padding: 15px 10px 10px 10px;
  position: relative;
  height: calc(100% - 35px);
}

.photovoltaicDetail .mainRowCol .leftCol,
.photovoltaicDetail .mainRowCol .rightCol {
  position: relative;
  height: 100%;
}

.photovoltaicDetail .mainRowCol .leftCol .baseInfoRow {
  position: relative;
  height: 21%;
  min-height: 128px;
  margin-bottom: 4%;
}

.photovoltaicDetail .baseInfoCard {
  position: relative;
  height: 100%;
}

.photovoltaicDetail .mainRowCol .leftCol .runtimeRow {
  position: relative;
  height: 27%;
  min-height: 156px;
  margin-bottom: 4%;
}

.photovoltaicDetail .runtimeCard {
  position: relative;
  height: 100%;
}

.photovoltaicDetail .mainRowCol .leftCol .weatherRow {
  position: relative;
  height: 12%;
  min-height: 72px;
  margin-bottom: 4%;
}

.photovoltaicDetail .weatherCard {
  position: relative;
  height: 100%;
}

.photovoltaicDetail .mainRowCol .leftCol .cutPowerRow {
  position: relative;
  height: 31%;
  min-height: 177px;
  margin-bottom: 4%;
}

.photovoltaicDetail .cutPowerCard {
  position: relative;
  height: 100%;
}

.photovoltaicDetail .baseInfoCard .baseInfoTitle,
.photovoltaicDetail .runtimeCard .runtimeTitle,
.photovoltaicDetail .weatherCard .weatherTitle,
.photovoltaicDetail .cutPowerCard .cutPowerTitle {
  display: inline-block;
  position: absolute;
  top: -10px;
  background-color: #fcfcfc;
  font-weight: 700;
  font-size: 13px;
  color: #009999;
}

.photovoltaicDetail .baseInfoBody .pdInfoText,
.photovoltaicDetail .runtimeBody .pdInfoText,
.photovoltaicDetail .weatherBody .pdInfoText {
  font-weight: 400;
  font-size: 13px;
  line-height: 28px;
  color: #666666;
}

.photovoltaicDetail .baseInfoBody .pdInfoValue,
.photovoltaicDetail .runtimeBody .pdInfoValue,
.photovoltaicDetail .weatherBody .pdInfoValue {
  font-weight: 400;
  font-size: 13px;
  line-height: 28px;
  color: #21a5a7;
}

.photovoltaicDetail .cutPowerCard .cutPowerRowCol {
  margin-top: 10px;
}

.photovoltaicDetail .cutPowerCard .cutPowerText {
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #666666;
  margin-top: 8px;
  display: inline-block;
}

.photovoltaicDetail .cutPowerCard .cutPowerValue {
  font-weight: 700;
  color: #21a5a7;
  font-size: 14px;
  line-height: 16px;
  margin-top: 8px;
  display: inline-block;
}

.photovoltaicDetail .cutPowerCard .cutPowerImgControl {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  margin-left: 15px;
  text-align: center;
}

.photovoltaicDetail .cutPowerCard .cutPowerImgControl.cutCo {
  background-color: #07db8a;
}

.photovoltaicDetail .cutPowerCard .cutPowerImgControl.cutSo {
  background-color: #05ccfe;
}

.photovoltaicDetail .cutPowerCard .cutPowerImgControl.cutC {
  background-color: #ff9933;
}

.photovoltaicDetail .cutPowerCard .cutPowerImgControl img {
  position: relative;
  display: inline-block;
  width: 25px;
  margin-top: 50%;
  transform: translateY(-50%);
}

.photovoltaicDetail .rightCol .realPowerRow,
.photovoltaicDetail .rightCol .elecSupportMonthRow {
  height: 30%;
  min-height: 180px;
  margin-bottom: 1.5%;
}

.photovoltaicDetail .rightCol .subDeviceInfoRow {
  height: 33.5%;
  min-height: 198px;
}

.photovoltaicDetail .rightCol .realPowerCard,
.photovoltaicDetail .rightCol .elecSupportMonthCard,
.photovoltaicDetail .rightCol .subDeviceInfoCard {
  position: relative;
  height: 100%;
}

.photovoltaicDetail .rightCol .pdRightTitle {
  position: absolute;
  top: 10px;
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  color: #009999;
}

.photovoltaicDetail .rightCol .subDeviceTitle {
  position: relative;
  top: -5px;
  display: inline;
  font-weight: 400;
  font-size: 14px;
  color: #009999;
}

.photovoltaicDetail .rightCol .pgRightMain {
  position: relative;
  height: 100%;
}

.photovoltaicDetail .rightCol .subDeviceCar {
  position: relative;
  height: 100%;
}

.photovoltaicDeviceModal .modalMain .textIcol .leftModalTitle,
.photovoltaicDeviceModal .modalMain .rightModalMain .rightModalTitle {
  position: relative;
  font-weight: 700;
  font-size: 13px;
  color: #009999;
  margin-bottom: 15px;
}

.photovoltaicDeviceModal .modalMain .textIcol .modalText {
  font-weight: 400;
  font-size: 12px;
  margin-right: 5px;
}

.photovoltaicDeviceModal .modalMain .textIcol .modalValue {
  color: #009999;
  font-weight: 400;
  font-size: 12px;
  word-break: break-all;
  display: inline-block;
  width: 60%;
  vertical-align: top;
}

.photovoltaicDeviceModal .modalMain .textIcol .circleControl {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid #07db8a;
  border-radius: 50%;
  text-align: center;
  line-height: 13px;
}

.photovoltaicDeviceModal .modalMain .textIcol .circleControl.outLine {
  border: 1px solid #ff6633;
}

.photovoltaicDeviceModal .modalMain .textIcol .textRowControl {
  margin-bottom: 15px;
}
</style>
