<template>
  <div>
    <Row class="storedEnergyDetail-container">
      <i-col span="24">
        <Card class="storedEnergyDetail">
          <div slot="title" class="storedEnergyDetail-title">
            <img src="../historyPowerGenerationEvent/images/u2269.png" alt />
            <p>宝龙1号机组储能系统</p>
          </div>
          <Row>
            <i-col span="7">
              <div class="storedEnergyDetail-left">
                <div class="storedEnergyDetail-left-top">
                  <p>基本信息</p>
                  <div class="line1">
                    <span>电站名称：</span>
                    <span>电站A</span>
                    <span>SOC：</span>
                    <span>90%</span>
                  </div>
                  <div class="line1 line2">
                    <span>装机容量：</span>
                    <span>1.2MW</span>
                    <span>SOH：</span>
                    <span>90%</span>
                  </div>
                  <div class="line1">
                    <span>电池组数：</span>
                    <span>3</span>
                  </div>
                  <div class="line1">
                    <span>设计利用小时数：</span>
                    <span>1200h</span>
                  </div>
                  <div class="line1">
                    <span>设计充放电次数：</span>
                    <span>3000</span>
                  </div>
                  <div class="line1">
                    <span>当前总充放电次数：</span>
                    <span>300</span>
                  </div>
                  <div class="line1">
                    <span>首次并网日期：</span>
                    <span>2019年9月17日</span>
                  </div>
                </div>
                <div class="storedEnergyDetail-left-center">
                  <h3>运行信息</h3>
                  <div class="line2">
                    <span>并网有功功率：</span>
                    <span>220kW</span>
                    <span>并网电压：</span>
                    <span>220V</span>
                  </div>
                  <div class="line2">
                    <span>并网无功功率：</span>
                    <span>220kW</span>
                    <span>并网电压：</span>
                    <span>50Hz</span>
                  </div>
                </div>
                <!-- 充放电时段分布 -->
                <ChargeDischarge />
              </div>
            </i-col>
            <i-col span="17">
              <div class="storedEnergyDetail-right">
                <!-- 充放电时段分布 -->
                <RealTimePower />
                <!-- 当月充放电量(kWh) -->
                <MonthCharge />
                <!-- 设备因子状态信息 -->
                <div class="deviceFoctorState">
                  <h3>||| 设备因子状态信息</h3>
                  <div class="deviceFoctorState-lunbo">
                    <Carousel
                      :autoplay="setting.autoplay"
                      :dots="setting.dots"
                      :trigger="setting.trigger"
                      :arrow="setting.arrow"
                    >
                      <Carousel-item>
                        <div class="demo-carousel">
                          <div class="lunboOne">
                            <h4>设备信息</h4>
                            <div class="lunboOne-container">
                              <div class="lunboOne-container-left">
                                <div class="img-contain">
                                  <img src="./images/u11956.png" alt class="img1" />
                                </div>
                                <h5 @click="changeModalFlag(true)">电池组一号</h5>
                              </div>
                              <!-- <img src="./images/04.png" alt="" class="imgSpread"> -->
                              <div class="lunboOne-container-right">
                                <div class="topOne">
                                  <span>
                                    <img src="./images/u11960.png" alt />
                                  </span>
                                  <span>SOC</span>
                                  <span>40</span>
                                  <span>%</span>
                                </div>
                                <div class="topOne topTwo">
                                  <span>
                                    <img src="./images/01.png" alt />
                                  </span>
                                  <span>功率</span>
                                  <span>40</span>
                                  <span>kW</span>
                                </div>
                                <div class="topOne topThree">
                                  <span>
                                    <img src="./images/02.png" alt />
                                  </span>
                                  <span>电池组状态</span>
                                  <span>发电</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Carousel-item>
                      <Carousel-item>
                        <div class="demo-carousel">
                          <div class="lunboTwo">
                            <h4>设备信息</h4>
                            <div class="lunboOne-container">
                              <div class="lunboOne-container-left">
                                <div class="img-contain">
                                  <img src="./images/u11956.png" alt class="img1" />
                                </div>
                                <h5 @click="changeModalFlag(true)">电池组二号</h5>
                              </div>
                              <div class="lunboOne-container-right">
                                <div class="topOne">
                                  <span>
                                    <img src="./images/u11960.png" alt />
                                  </span>
                                  <span>SOC</span>
                                  <span>40</span>
                                  <span>%</span>
                                </div>
                                <div class="topOne topTwo">
                                  <span>
                                    <img src="./images/01.png" alt />
                                  </span>
                                  <span>功率</span>
                                  <span>40</span>
                                  <span>kW</span>
                                </div>
                                <div class="topOne topThree">
                                  <span>
                                    <img src="./images/03.png" alt />
                                  </span>
                                  <span>电池组状态</span>
                                  <span>离线</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Carousel-item>
                    </Carousel>
                  </div>
                </div>
                <!-- 当月充放电量(kWh) -->
                <ThisMonthChargeAndDischarge />
              </div>
            </i-col>
          </Row>
        </Card>
      </i-col>
    </Row>
    <Modal
      width="1000px"
      draggable
      :zIndex="901"
      v-model="showModalFlag"
      class-name="vertical-center-modal energyDeviceModal"
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
                    <span class="modalText">电压:</span>
                    <span class="modalValue">{{deviceObj.volt}}V</span>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="12">
                    <span class="modalText">当前容量:</span>
                    <span class="modalValue">{{deviceObj.curCap}}Ah</span>
                  </i-col>
                  <i-col span="12">
                    <span class="modalText">电流:</span>
                    <span class="modalValue">{{deviceObj.current}}A</span>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="12">
                    <span class="modalText">可充电量:</span>
                    <span class="modalValue">{{deviceObj.enC}}MWh</span>
                  </i-col>
                  <i-col span="12">
                    <span class="modalText">SOC:</span>
                    <span class="modalValue">{{deviceObj.soc}}%</span>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="12">
                    <span class="modalText">可放电量:</span>
                    <span class="modalValue">{{deviceObj.letC}}MWh</span>
                  </i-col>
                  <i-col span="12">
                    <span class="modalText">SOH:</span>
                    <span class="modalValue">{{deviceObj.soh}}%</span>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="24">
                    <span class="modalText">最高单体电压:</span>
                    <span class="modalValue">{{deviceObj.maxV}}V</span>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="24">
                    <span class="modalText">最高单体电压所属位置:</span>
                    <span class="modalValue">{{deviceObj.maxVPos}}号</span>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="24">
                    <span class="modalText">最高单体温度:</span>
                    <span class="modalValue">{{deviceObj.maxTem}}MWh</span>
                  </i-col>
                </Row>
                <Row class="textRowControl" :gutter="10">
                  <i-col span="24">
                    <span class="modalText">最高单体温度所属位置:</span>
                    <span class="modalValue">{{deviceObj.maxTemPos}}号</span>
                  </i-col>
                </Row>
              </Card>
            </i-col>
            <i-col span="14">
              <Card class="rightModalMain">
                <div class="rightModalTitle">||| 交流有功(kW)</div>
                <div class="rightModalCharts">
                  <ActivePower
                    :vCurveDatas="activeVCurveDatas"
                    :cCurveDatas="activeCCurveDatas"
                    style="height: 293.4px;"
                  />
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
import '@/view/fictitiousPowerPlant/storedEnergyDetail/storedEnergyDetail.less'
import ChargeDischarge from './chargeDischarge.vue'
import RealTimePower from './realTimePower.vue'
import MonthCharge from './monthCharge.vue'
import ThisMonthChargeAndDischarge from './thisMonthChargeAndDischarge.vue'
import ActivePower from './activePower.vue'

export default {
  name: 'storedEnergyDetail',
  components: {
    ChargeDischarge,
    RealTimePower,
    MonthCharge,
    ThisMonthChargeAndDischarge,
    ActivePower
  },
  data () {
    return {
      setting: {
        autoplay: false,
        dots: 'none',
        trigger: 'click',
        arrow: 'always'
      },
      showModalFlag: false,
      deviceObj: {
        deviceName: '逆变器一号',
        volt: '1',
        curCap: '38.1',
        current: '1',
        enC: '38.1',
        soc: '1',
        letC: '38.1',
        soh: '1',
        maxV: '38.1',
        maxVPos: '38.1',
        maxTem: '38.1',
        maxTemPos: '38.1'
      },
      activeVCurveDatas: [],
      activeCCurveDatas: []
    }
  },
  methods: {
    changeModalFlag: function (val) {
      let _this = this
      if (_this.showModalFlag !== val) {
        _this.showModalFlag = val
      }
      if (_this.showModalFlag) {
        _this.$nextTick(() => {
          _this.activeVCurveDatas = [
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
          _this.activeCCurveDatas = [
            '400',
            '420',
            '450',
            '480',
            '450',
            '620',
            '670',
            '580',
            '520',
            '580',
            '476',
            '425',
            '425'
          ]
        })
      }
    }
  },
  mounted () {}
}
</script>

<style scoped>
.energyDeviceModal .modalMain .textIcol .leftModalTitle,
.energyDeviceModal .modalMain .rightModalMain .rightModalTitle {
  position: relative;
  font-weight: 700;
  font-size: 13px;
  color: #009999;
  margin-bottom: 15px;
}

.energyDeviceModal .modalMain .textIcol .modalText {
  font-weight: 400;
  font-size: 12px;
  margin-right: 5px;
}

.energyDeviceModal .modalMain .textIcol .modalValue {
  color: #009999;
  font-weight: 400;
  font-size: 12px;
  word-break: break-all;
  display: inline-block;
  width: 60%;
  vertical-align: top;
}

.energyDeviceModal .modalMain .textIcol .circleControl {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid #07db8a;
  border-radius: 50%;
  text-align: center;
  line-height: 13px;
}

.energyDeviceModal .modalMain .textIcol .circleControl.outLine {
  border: 1px solid #ff6633;
}

.energyDeviceModal .modalMain .textIcol .textRowControl {
  margin-bottom: 15px;
}

.energyDeviceModal .modalMain .rightModalCharts {
  margin-top: -20px;
}
</style>
