<template>
  <div class="charge-contanier">
      <Card style="width:100%" :style="cardHeight">
      <div slot="title">
        <div>
          <div><img src="./images/u2269.png" alt=""></div>
          <div><span>宝龙1号机组充电桩系统</span></div>
        </div>
      </div>
      <row class="charge-top">
        <i-col span="6">
          <div class="info-view" style="height: 100%;">
            <div class="title">||| 信息概览</div>
            <div class="img-detail">
              <div>
                <p><img src="./images/u13474.png" alt=""></p>
                <p>充电中</p>
                <p>12</p>
              </div>
              <div>
                <p><img src="./images/u13474.png" alt=""></p>
                <p>空闲数</p>
                <p>10</p>
              </div>
              <div>
                <p><img src="./images/u13474.png" alt=""></p>
                <p>故障数</p>
                <p>10</p>
              </div>
              <div>
                <p><img src="./images/u13474.png" alt=""></p>
                <p>离线</p>
                <p>04</p>
              </div>
            </div>
          </div>
        </i-col>
        <i-col span="9">
          <div class="charge-rank" style="height: 100%;">
            <charge-rank-charts style="height: 100%"></charge-rank-charts>
          </div>
        </i-col>
        <i-col span="8">
          <div class="charge-time-slot" style="height: 100%;">
            <div class="title">||| 充电时段分布</div>
            <charge-time-slot-pie style="height: 100%;"></charge-time-slot-pie>
          </div>
        </i-col>
      </row>
      <div class="charge-bottom">
        <div class="left-box">
          <div class="list-box">
            <p>充电桩名称</p>
            <div>
              <ul>
                <li v-for="(item, index) in 6" :key="index" @click="changeTransactionNo(index)">
                  <span class="circle" :class="activeIndex===index ? 'bg-color' : ''"></span>
                  <span class="transaction-no" :class="activeIndex===index ? 'bg-color' : ''">{{index+1}}号桩</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="right-box">
          <div class="right-info">
            <div class="base-info">
              <p class="title">基础信息</p>
              <div>
                <p>设备名称：<span>充电桩站一号</span></p>
                <p>额定电压：<span>38V</span></p>
              </div>
              <div>
                <p>设备类型：<span>直流桩</span></p>
                <p>额定电流：<span>5A</span></p>
              </div>
              <div>
                <p>所属充电站：<span>前海嘉里</span></p>
                <p>额定功率：<span>190W</span></p>
              </div>
              <div>
                <p>投运状态：<span>已投运</span></p>
                <p>投运日期：<span>2019年9月17日</span></p>
              </div>
            </div>
            <div class="interface-type">
              <div class="interface-A" @click="switchType(0)" :class="isChoose===0 ? 'add-color' : ''">A口(充电中)</div>
              <div class="interface-B" @click="switchType(1)" :class="isChoose===1 ? 'add-color' : ''">B口(待机)</div>
            </div>
            <div class="charge-run-info">
              <div class="pile-run-info">
                <p>||| 充电桩运行信息</p>
                <div class="info-box">
                  <div class="info-div">
                    <p>-当前充电桩参数-</p>
                    <p v-if="isChoose===0">充电状态：<span>{{chargePileInfo.parameter.chargeStatus}}</span></p>
                    <p v-else>充电状态：<span :class="isChoose===1 ? 'font-color' : ''">{{chargePileInfo.parameter.chargeStatus}}</span></p>
                    <p>最高输出电压：<span>{{chargePileInfo.parameter.maxOutputV}}</span></p>
                    <p>最低输出电压：<span>{{chargePileInfo.parameter.minOutputV}}</span></p>
                    <p>最高输出电流：<span>{{chargePileInfo.parameter.maxOutputA}}</span></p>
                    <p>最低输出电流：<span>{{chargePileInfo.parameter.minOutputA}}</span></p>
                  </div>
                  <div class="info-div">
                    <p>-实际输出电压/电流/功率-</p>
                    <p>当前输出电压：<span>{{chargePileInfo.actualOutput.voltage}}</span></p>
                    <p>当前输出电流：<span>{{chargePileInfo.actualOutput.current}}</span></p>
                    <p>当前输出功率：<span>{{chargePileInfo.actualOutput.power}}</span></p>
                  </div>
                  <div class="info-div">
                    <p>-当前充电桩电量-</p>
                    <p>已充电量：<span>{{chargePileInfo.currentCapacity.capacity}}</span></p>
                    <p>已充时间：<span>{{chargePileInfo.currentCapacity.time}}</span></p>
                    <p>充电开始时间：</p>
                    <p><span>{{chargePileInfo.currentCapacity.startTime}}</span></p>
                  </div>
                  <div class="info-table">
                    <Table
                      border
                      stripe
                      :row-class-name="rowClassName"
                      :columns="chargePileInfo.chargeTable.chargeColumns"
                      :data="chargePileInfo.chargeTable.chargeData"
                      width="100%"
                    ></Table>
                  </div>
                </div>
              </div>
              <div class="car-run-info">
                <p>||| 充电车辆运行信息</p>
                <div class="info-box">
                  <div class="info-div">
                    <p>-当前车辆参数-</p>
                    <p>车牌号：<span>{{chargeCarInfo.parameterOne.carNo}}</span></p>
                    <p>起始SOC：<span>{{chargeCarInfo.parameterOne.startSOC}}</span></p>
                    <p>当前SOC：<span>{{chargeCarInfo.parameterOne.currentSOC}}</span></p>
                    <p>单体最高温度：<span>{{chargeCarInfo.parameterOne.monomerMaxTemp}}</span></p>
                    <p>单体最低温度：<span>{{chargeCarInfo.parameterOne.monomerMinTemp}}</span></p>
                  </div>
                  <div class="info-div">
                    <p>-当前车辆参数-</p>
                    <p>SOC：<span>{{chargeCarInfo.parameterTwo.SOC}}</span></p>
                    <p>电池电压：<span>{{chargeCarInfo.parameterTwo.batteryVoltage}}</span></p>
                    <p>最高单体电压：<span>{{chargeCarInfo.parameterTwo.monomerMaxV}}</span></p>
                    <p>最高单体温度：<span>{{chargeCarInfo.parameterTwo.monomerMaxTemp}}</span></p>
                  </div>
                  <div class="info-div">
                    <p>-实时输出电压/电流-</p>
                    <p>当前需求电压：<span>{{chargeCarInfo.actualOutput.currentRequireV}}</span></p>
                    <p>当前充电电压：<span>{{chargeCarInfo.actualOutput.currentChargeV}}</span></p>
                    <p>当前需求电流：<span>{{chargeCarInfo.actualOutput.currentRequireA}}</span></p>
                    <p>当前充电电流：<span>{{chargeCarInfo.actualOutput.currentChargeA}}</span></p>
                    <p>实时充电功率：<span>{{chargeCarInfo.actualOutput.actualChargeP}}</span></p>
                  </div>
                  <div class="info-charts">
                    <voltage-and-currents-charts :voltageData="chargeCarInfo.voltageData" :currentsData="chargeCarInfo.currentsData"></voltage-and-currents-charts>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import chargeRankCharts from './chargeRankCharts'
import chargeTimeSlotPie from './chargeTimeSlotPie'
import voltageAndCurrentsCharts from './voltageAndCurrentsCharts'
export default {
  name: 'chargingPileDetail',
  components: {
    chargeRankCharts,
    chargeTimeSlotPie,
    voltageAndCurrentsCharts
  },
  props: {},
  data () {
    return {
      activeIndex: 0,
      isChoose: 0,
      cardHeight: 'height: 826px;',
      chargePileInfo: {
        parameter: {
          chargeStatus: '充电中',
          maxOutputV: '30V',
          minOutputV: '5V',
          maxOutputA: '5A',
          minOutputA: '2A'
        },
        actualOutput: {
          voltage: '30V',
          current: '5A',
          power: '140kW'
        },
        currentCapacity: {
          capacity: '200kWh',
          time: '300S',
          startTime: '2019-09-20 11:00:00'
        },
        chargeTable: {
          chargeColumns: [
            {
              title: '',
              key: '',
              width: '50px',
              align: 'center',
              className: 'first-row-column-date',
              render: (h, params) => {
                if (params.index == 0) {
                  return h(
                    'div',
                    {
                      style: {
                        width: '50px',
                        textAlign: 'center',
                        marginLeft: '-18px',
                        fontWeight: 'bold'
                      }
                    },
                    '日'
                  )
                }
                if (params.index == 1) {
                  return h(
                    'div',
                    {
                      style: {
                        width: '50px',
                        textAlign: 'center',
                        marginLeft: '-18px',
                        fontWeight: 'bold'
                      }
                    },
                    '月'
                  )
                }
                if (params.index == 2) {
                  return h(
                    'div',
                    {
                      style: {
                        width: '50px',
                        textAlign: 'center',
                        marginLeft: '-18px',
                        fontWeight: 'bold'
                      }
                    },
                    '年'
                  )
                }
              }
            },
            {
              title: '充电量(kWh)',
              key: 'chargeCapacity',
              align: 'center',
            },
            {
              title: '充电次数(元)',
              key: 'chargeTimes',
              align: 'center',
            },
            {
              title: '充电收益(元)',
              key: 'chargeRevenue',
              align: 'center',
            }
          ],
          chargeData: [
            {
              'chargeCapacity': 50,
              'chargeTimes': 3,
              'chargeRevenue': 20
            },
            {
              'chargeCapacity': 500,
              'chargeTimes': 90,
              'chargeRevenue': 600
            },
            {
              'chargeCapacity': 5000,
              'chargeTimes': 1100,
              'chargeRevenue': 18000
            }
          ]
        }
      },
      chargeCarInfo: {
        parameterOne: {
          carNo: '沪ALS123',
          startSOC: '45.02%',
          currentSOC: '72.72%',
          monomerMaxTemp: '49℃',
          monomerMinTemp: '30℃'
        },
        parameterTwo: {
          SOC: '50%',
          batteryVoltage: '578.9V',
          batteryTemp: '72℃',
          monomerMaxV: '3.5V',
          monomerMaxTemp: '80℃'
        },
        actualOutput: {
          currentRequireV: '567.9V',
          currentChargeV: '567.9V',
          currentRequireA: '112.9A',
          currentChargeA: '567.9A',
          actualChargeP: '34.9W'
        },
        voltageData: [220, 500, 600, 450, 580, 400, 200],
        currentsData: [100, 300, 500, 680, 490, 200, 80]
      },
      loadForecastingData: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  },
  mounted () {
    this.changeHeight()
    let that = this
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
  },
  watch: {},
  methods: {
    changeHeight: function () {
      // this.cardHeight =
      //   window.innerHeight > 800
      //     ? 'height: ' + (window.innerHeight - 100) + 'px'
      //     : 'height: 900px'
    },
    changeTransactionNo (index) {
      this.activeIndex = index
    },
    switchType (val) {
      this.isChoose = val
      if (this.isChoose === 1) {
        this.chargePileInfo.parameter.chargeStatus = '待机'
      } else {
        this.chargePileInfo.parameter.chargeStatus = '充电中'
      }
    },
    rowClassName (row, index) {
      if (index === 1) {
        return 'demo-table-info-row';
      }
    }
  }
}
</script>

<style lang="less">
@import "./chargingPileDetail.less";
</style>
