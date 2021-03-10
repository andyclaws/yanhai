<template>
  <div>
    <Row class="fanDetails-container">
      <i-col span="24">
        <Card class="fanDetails">
          <div slot="title" class="fanDetails-title">
            <img src="../historyPowerGenerationEvent/images/u2269.png" alt />
            <p>宝龙1号机组风机系统</p>
          </div>
          <Row>
            <i-col span="7">
              <Card class="fanDetails-left-top">
                <div slot="title" class="title">
                  <p>风机信息</p>
                </div>
                <div class="message-box">
                     <p>基本信息</p>
                     <div class="line1">
                        <span>风机名称：</span>
                        <span>风机A</span>
                        <span>风机型号：</span>
                        <span>FD25-100</span>
                     </div>
                     <div class="line1 line2">
                        <span>额定功率：</span>
                        <span>1.2MW</span>
                        <span>额定风速：</span>
                        <span>12m/s</span>
                     </div>
                     <div class="line1 line3">
                        <span>工作风速：</span>
                        <span>3~18m/s</span>
                        <span>峰极端风速：</span>
                        <span>50m/s</span>
                     </div>
                     <div class="line1">
                        <span>额定转速：</span>
                        <span>48r/min</span>
                     </div>
                </div>
              </Card>
              <Card class="fanDetails-left-bottom">
                <div slot="title" class="title">
                  <p>发电能力</p>
                </div>
                <PowerCapacityTop/>
                <PowerCapacityBottom/>
              </Card>
            </i-col>
            <i-col span="17">
              <Card class="fanDetails-right-top">
                <div slot="title" class="title">
                  <p>实时监测</p>
                </div>
                <div class="left-echart-box">
                      <div class="head-listBox">
                            <div class="line1">
                                 <span>当前状态:</span>
                                 <span>运行/</span>
                                 <span>停运</span><span>/</span>
                                 <span>故障</span>
                            </div>
                            <span>|</span>
                            <div class="line2">
                                 <span>实时功率:</span>
                                 <span>380kW</span>
                            </div>
                            <span>|</span>
                            <div class="line3">
                                 <span>实时电量:</span>
                                 <span>380kWh</span>
                            </div>
                      </div>
                      <RealTimeMonitorLeftEchart/>
                </div>
                <div class="right-echart-box">
                      <RealTimeMonitorRightEchart/>
                </div>
              </Card>
              <Card class="fanDetails-right-bottom">
                <div slot="title" class="title">
                  <p>发电统计</p>
                </div>
                 <div class="left-box">
                      <ElectricityStatisticalEchart/>
                 </div>
                 <div class="right-box">
                      <div class="boxOne">
                           <img src="./images/01.png" alt="">
                           <p>本月累计发电量</p>
                           <span>34.22</span>
                           <span>万kWh</span>
                      </div>
                      <div class="boxOne">
                           <img src="./images/02.png" alt="">
                           <p>本月累计抛风电量</p>
                           <span>34.22</span>
                           <span>万kWh</span>
                      </div>
                      <div class="boxOne">
                           <img src="./images/03.png" alt="">
                           <p>本月累计收益</p>
                           <span>34.22</span>
                           <span>万元</span>
                      </div>
                      <div class="boxOne">
                           <img src="./images/04.png" alt="">
                           <p>本月平均风速</p>
                           <span>3.22</span>
                           <span>m/s</span>
                      </div>
                 </div>
              </Card>
            </i-col>
          </Row>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import PowerCapacityTop from './powerCapacityTop.vue'
import PowerCapacityBottom from './powerCapacityBottom.vue'
import RealTimeMonitorLeftEchart from './realTimeMonitorLeftEchart.vue'
import RealTimeMonitorRightEchart from './realTimeMonitorRightEchart.vue'
import ElectricityStatisticalEchart from './electricityStatisticalEchart.vue'
export default {
  name: 'fanDetails',
  components: {
    PowerCapacityTop,
    PowerCapacityBottom,
    RealTimeMonitorLeftEchart,
    RealTimeMonitorRightEchart,
    ElectricityStatisticalEchart
  },
  data () {
    return {}
  },
  methods: {},
  mounted () {}
}
</script>

<style lang="less">
@import "fanDetails.less";
</style>
