<template>
  <div class="runTimeMain" :style="mainHeight" id="runTimeMain">
    <div class="mapIntro">
      <Card class="modelIntro">
        <Row class="rowMarginControl infoRow" :gutter="8">
          <i-col span="8">
            <div class="iconArea drImg">
              <img src="./images/u20069.png" />
            </div>
            <span class="drSpan">DR</span>
          </i-col>
          <i-col span="8" class="infoControl">
            <span>在线：</span>
            <span class="valueCount">{{modelIntroInfo.drOnline}}</span>
          </i-col>
          <i-col span="8" class="infoControl">
            <span>离线：</span>
            <span class="valueCount">{{modelIntroInfo.drOutline}}</span>
          </i-col>
        </Row>
        <Row class="rowMarginControl infoRow" :gutter="8">
          <i-col span="8">
            <div class="iconArea adrImg">
              <img src="./images/u20074.png" />
            </div>
            <span class="adrSpan">ADR</span>
          </i-col>
          <i-col span="8" class="infoControl">
            <span>在线：</span>
            <span class="valueCount">{{modelIntroInfo.adrOnline}}</span>
          </i-col>
          <i-col span="8" class="infoControl">
            <span>离线：</span>
            <span class="valueCount">{{modelIntroInfo.adrOutline}}</span>
          </i-col>
        </Row>
        <Row class="rowMarginControl infoRow" :gutter="8">
          <i-col span="8">
            <div class="iconArea adrDrImg">
              <img src="./images/u20062.png" />
            </div>
            <span class="adrDrSpan">ADR&AMP;DR</span>
          </i-col>
          <i-col span="8" class="infoControl">
            <span>在线：</span>
            <span class="valueCount">{{modelIntroInfo.adrDrOnline}}</span>
          </i-col>
          <i-col span="8" class="infoControl">
            <span>离线：</span>
            <span class="valueCount">{{modelIntroInfo.adrDrOutline}}</span>
          </i-col>
        </Row>
      </Card>
      <Card class="onlineIntro">
        <Row class="rowControl">
          <div class="imgControl">
            <img src="./images/u18784.png" />
          </div>
          <span>在线</span>
        </Row>
        <Row class="rowControl">
          <div class="imgControl">
            <img src="./images/u18786.png" />
          </div>
          <span>离线</span>
        </Row>
      </Card>
    </div>
    <div class="mapBody">
      <Map :mapData="mapData" style="height:100%; min-height:500px;" />
    </div>
    <div ref="runTimeInfo" class="runTimeInfo" :style="infoHeight">
      <Card class="dataStatictis">
        <div class="statictisTitle">||| 数据统计</div>
        <Row :gutter="6">
          <i-col span="6" class="itemCol">
            <div class="dataStatictisImgDiv onlineMedicals">
              <img src="./images/u1296.png" />
            </div>
            <div class="dataStatictisItem">在线机组数</div>
            <div class="dataStatictisValue">{{statisData.onlineMedicals}}</div>
          </i-col>
          <i-col span="6" class="itemCol">
            <div class="dataStatictisImgDiv onlineRate">
              <img src="./images/online.png" />
            </div>
            <div class="dataStatictisItem">在线率</div>
            <div class="dataStatictisValue">{{statisData.onlineRate}}%</div>
          </i-col>
          <i-col span="6" class="itemCol">
            <div class="dataStatictisImgDiv realLoad">
              <img src="./images/u2607.png" />
            </div>
            <div class="dataStatictisItem">实时负荷</div>
            <div class="dataStatictisValue">{{statisData.realLoad}}kW</div>
          </i-col>
          <i-col span="6" class="itemCol">
            <div class="dataStatictisImgDiv todaySupport">
              <img src="./images/u2614.png" />
            </div>
            <div class="dataStatictisItem">今日发电量</div>
            <div class="dataStatictisValue">{{statisData.todaySupport}}kWh</div>
          </i-col>
        </Row>
        <Row :gutter="6" class="statisBottomRowControl">
          <i-col span="12">
            <div class="statisBottomImg">
              <img src="./images/u2628.png" />
            </div>
            <span class="statisBottomInfo">可上调裕度:&nbsp;</span>
            <span class="statisBottomValue">{{statisData.upDeg}}kW</span>
          </i-col>
          <i-col span="12">
            <div class="statisBottomImg downImg">
              <img src="./images/u2628.png" />
            </div>
            <span class="statisBottomInfo">可下调裕度:&nbsp;</span>
            <span class="statisBottomValue">{{statisData.downDeg}}kW</span>
          </i-col>
        </Row>
      </Card>
      <Card class="supportEvent">
        <div class="supportTitle">||| 当日发电事件</div>
        <div class="supportBody">
          <Row class="eventRowControl" :gutter="8">
            <i-col span="14">
              <span class="eventInfo">发电事件名称:</span>
              <span class="eventValue">{{support.eventName}}</span>
            </i-col>
            <i-col span="10">
              <span class="eventInfo">执行状态:</span>
              <span class="eventValue">{{support.carryStatus}}</span>
            </i-col>
          </Row>
          <Row class="eventRowControl" :gutter="8">
            <i-col span="24">
              <span class="eventInfo">事件开始时间:</span>
              <span class="eventValue">{{support.eventStartTime}}</span>
            </i-col>
          </Row>
          <Row class="eventRowControl" :gutter="8">
            <i-col span="24">
              <span class="eventInfo">事件结束时间:</span>
              <span class="eventValue">{{support.eventEndTime}}</span>
            </i-col>
          </Row>
          <Row class="eventRowControl" :gutter="8">
            <i-col span="8">
              <span class="eventInfo">目标值:</span>
              <span class="eventValue">{{support.targetValue}}kW</span>
            </i-col>
            <i-col span="8">
              <span class="eventInfo">实际值:</span>
              <span class="eventValue">{{support.realValue}}kW</span>
            </i-col>
            <i-col span="8">
              <span class="eventInfo">完成率:</span>
              <span class="eventValue">{{support.complateRate}}%</span>
            </i-col>
          </Row>
          <Progress
            :percent="support.complateRate"
            :stroke-width="16"
            hide-info
            :stroke-color="supportProcessColor"
            style="margin-top: 5px;"
          />
        </div>
      </Card>
      <Card class="realTimeCurve">
        <RealTimeCurve
          :actualValues="actualValues"
          :predictedValues="predictedValues"
          style="height:160px;"
        />
      </Card>
      <Card class="powerArea">
        <div class="powerTitle">||| 能力区间</div>
        <div class="chooseModel">
          <span :class="isPowerChoose === 0 ? 'isChoose' : ''" @click="changePowerModel(0)">削峰</span>
          <span :class="isPowerChoose === 1 ? 'isChoose' : ''" @click="changePowerModel(1)">填谷</span>
        </div>
        <div class="powerMain">
          <Row class="rowTopControl">
            <span class="perInfo">&nbsp;0&nbsp;~&nbsp;100kW&nbsp;:</span>
          </Row>
          <Row :gutter="6" class="rowControl">
            <i-col span="16" class="colControl">
              <Progress
                :percent="able.onePer"
                status="active"
                hide-info
                :stroke-color="processColor"
              />
            </i-col>
            <i-col span="8">
              <span class="lastInfo">{{able.powerOneCounts}}个&nbsp;({{able.onePer}}%)</span>
            </i-col>
          </Row>
          <Row class="rowTopControl">
            <span class="perInfo">100&nbsp;~&nbsp;300kW</span>
          </Row>
          <Row :gutter="6" class="rowControl">
            <i-col span="16" class="colControl">
              <Progress
                :percent="able.twoPer"
                status="active"
                hide-info
                :stroke-color="processColor"
              />
            </i-col>
            <i-col span="8">
              <span class="lastInfo">{{able.powerTwoCounts}}个({{able.twoPer}}%)</span>
            </i-col>
          </Row>
          <Row class="rowTopControl">
            <span class="perInfo">500&nbsp;~&nbsp;700kW</span>
          </Row>
          <Row :gutter="6" class="rowControl">
            <i-col span="16" class="colControl">
              <Progress
                :percent="able.threePer"
                status="active"
                hide-info
                :stroke-color="processColor"
              />
            </i-col>
            <i-col span="8">
              <span class="lastInfo">{{able.powerThreeCounts}}个({{able.threePer}}%)</span>
            </i-col>
          </Row>
          <Row class="rowTopControl">
            <span class="perInfo">700&nbsp;~&nbsp;800kW</span>
          </Row>
          <Row :gutter="6" class="rowControl">
            <i-col span="16" class="colControl">
              <Progress
                :percent="able.fourPer"
                status="active"
                hide-info
                :stroke-color="processColor"
              />
            </i-col>
            <i-col span="8">
              <span class="lastInfo">{{able.powerFourCounts}}个({{able.fourPer}}%)</span>
            </i-col>
          </Row>
          <Row class="rowTopControl">
            <span class="perInfo">800&nbsp;~&nbsp;1100kW</span>
          </Row>
          <Row :gutter="6" class="rowControl">
            <i-col span="16" class="colControl">
              <Progress
                :percent="able.fivePer"
                status="active"
                hide-info
                :stroke-color="processColor"
              />
            </i-col>
            <i-col span="8">
              <span class="lastInfo">{{able.powerFiveCounts}}个({{able.fivePer}}%)</span>
            </i-col>
          </Row>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/fictitiousPowerPlant/runtimeWatch/mainview-data.js'
import '@/view/fictitiousPowerPlant/runTimeWatch/runTimeWatch.less'
import RealTimeCurve from './realTimeCurve.vue'
import Map from './runTimeMap.vue'
import { judgeNull } from '../util.js'

export default {
  name: 'runTimeWatch',
  components: {
    RealTimeCurve,
    Map
  },
  props: {},
  data () {
    let boxWidth = window.innerWidth
    return {
      mainHeight: 'height: 500px;',
      infoHeight: 'height: 500px;',
      boxWidth: boxWidth,
      timer1: {},
      timer2: {},
      timer3: {},
      timer4: {},
      timer5: {},
      timer6: {},
      modelIntroInfo: {
        drOnline: '0',
        drOutline: '0',
        adrOnline: '0',
        adrOutline: '0',
        adrDrOnline: '0',
        adrDrOutline: '0'
      },
      actualValues: [],
      predictedValues: [],
      statisData: {
        onlineMedicals: '',
        onlineRate: '',
        realLoad: '',
        todaySupport: '',
        upDeg: '',
        downDeg: ''
      },
      isPowerChoose: 0,
      able: {
        powerOneCounts: '0',
        powerTwoCounts: '0',
        powerThreeCounts: '0',
        powerFourCounts: '0',
        powerFiveCounts: '0',
        onePer: 0,
        twoPer: 0,
        threePer: 0,
        fourPer: 0,
        fivePer: 0
      },
      peakAble: {
        powerOneCounts: '0',
        powerTwoCounts: '0',
        powerThreeCounts: '0',
        powerFourCounts: '0',
        powerFiveCounts: '0',
        onePer: 0,
        twoPer: 0,
        threePer: 0,
        fourPer: 0,
        fivePer: 0
      },
      cutAble: {
        powerOneCounts: '0',
        powerTwoCounts: '0',
        powerThreeCounts: '0',
        powerFourCounts: '0',
        powerFiveCounts: '0',
        onePer: 0,
        twoPer: 0,
        threePer: 0,
        fourPer: 0,
        fivePer: 0
      },
      processColor: '#20DF96',
      mapData: [],
      support: {
        eventName: '',
        carryStatus: '',
        eventStartTime: '',
        eventEndTime: '',
        targetValue: '0',
        realValue: '0',
        complateRate: 0
      },
      supportProcessColor: '#1CA3FD'
    }
  },
  methods: {
    removeNull (val, initStr = '') {
      return judgeNull(val, initStr)
    },
    getDataStatistics: function () {
      let _this = this
      api
        .getDataStatistics({})
        .then(res => {
          let obj = res.data.data
          if (typeof obj !== 'undefined' && obj !== null) {
            _this.statisData.onlineMedicals = _this.removeNull(obj.onlineUnitCnt, '0')
            _this.statisData.onlineRate =
              '' +
              Number(
                (Number(obj.unitCnt) === 0 || Number(obj.unitCnt) === ''
                  ? 0
                  : (Number(obj.onlineUnitCnt) * 100) / Number(obj.unitCnt)
                ).toFixed(3)
              )
            _this.statisData.realLoad = _this.removeNull(obj.pRt, '0')
            _this.statisData.todaySupport = _this.removeNull(obj.genCap, '0')
            _this.statisData.upDeg = _this.removeNull(obj.adjUplimit, '0')
            _this.statisData.downDeg = _this.removeNull(obj.adjDownlimit, '0')
          }
        })
        .catch(err => {
          console.log(err)
          _this.$Message.error('数据统计查询失败！')
        })
    },
    getRealTimeGenerationEvents () {
      let _this = this
      api
        .getRealTimeGenerationEvents({})
        .then(res => {
          let obj = res.data.data
          if (typeof obj !== 'undefined' && obj !== null) {
            _this.support.eventName = obj.eventName
            _this.support.carryStatus = obj.eventStatus
            _this.support.eventStartTime = obj.beginTime
            _this.support.eventEndTime = obj.endTime
            _this.support.targetValue = _this.removeNull(obj.targetValue, '0')
            _this.support.realValue = _this.removeNull(obj.finishValue, '0')
            _this.support.complateRate = Number(obj.finishRate)
          }
        })
        .catch(err => {
          console.log(err)
          _this.$Message.error('当日发电事件查询失败！')
        })
    },
    getUnitOnlineNo () {
      let _this = this
      api
        .getUnitOnlineNo({})
        .then(res => {
          let obj = res.data.data
          if (typeof obj !== 'undefined' && obj !== null) {
            _this.modelIntroInfo.drOnline = _this.removeNull(
              obj.drOnlineCnt,
              '0'
            )
            _this.modelIntroInfo.drOutline = _this.removeNull(
              obj.drOfflineCnt,
              '0'
            )
            _this.modelIntroInfo.adrOnline = _this.removeNull(
              obj.adrOnlineCnt,
              '0'
            )
            _this.modelIntroInfo.adrOutline = _this.removeNull(
              obj.adrOfflineCnt,
              '0'
            )
            _this.modelIntroInfo.adrDrOnline = _this.removeNull(
              obj.adrDrOnlineCnt,
              '0'
            )
            _this.modelIntroInfo.adrDrOutline = _this.removeNull(
              obj.adrDrOfflineCnt,
              '0'
            )
          }
        })
        .catch(err => {
          console.log(err)
          _this.$Message.error('在线数量查询失败！')
        })
    },
    getUnitPositionInfo () {
      let _this = this
      api
        .getUnitPositionInfo({})
        .then(res => {
          let list = res.data.data
          if (typeof list !== 'undefined' && list !== null && list.length > 0) {
            _this.mapData = list
          } else {
            _this.mapData = []
          }
        })
        .catch(err => {
          console.log(err)
          _this.mapData = []
          _this.$Message.error('机组信息查询失败！')
        })
    },
    getCapabilityInterval () {
      let _this = this
      api
        .getCapabilityInterval({})
        .then(res => {
          let list = res.data.data
          if (typeof list !== 'undefined' && list !== null && list.length > 0) {
            for (let index = 0; index < list.length; index++) {
              if (list[index].capType === '01') {
                _this.peakAble = {
                  powerOneCounts: _this.removeNull(list[index].cnt0100, '0'),
                  powerTwoCounts: _this.removeNull(list[index].cnt100300, '0'),
                  powerThreeCounts: _this.removeNull(
                    list[index].cnt300500,
                    '0'
                  ),
                  powerFourCounts: _this.removeNull(list[index].cnt500800, '0'),
                  powerFiveCounts: _this.removeNull(list[index].cnt800, '0'),
                  onePer:
                    list[index].totalCnt === '0' ||
                    list[index].totalCnt === null ||
                    list[index].totalCnt === undefined
                      ? 0
                      : Number(
                        (
                          (Number(list[index].cnt0100) * 100) /
                            Number(list[index].totalCnt)
                        ).toFixed(2)
                      ),
                  twoPer:
                    list[index].totalCnt === '0' ||
                    list[index].totalCnt === null ||
                    list[index].totalCnt === undefined
                      ? 0
                      : Number(
                        (
                          (Number(list[index].cnt100300) * 100) /
                            Number(list[index].totalCnt)
                        ).toFixed(2)
                      ),
                  threePer:
                    list[index].totalCnt === '0' ||
                    list[index].totalCnt === null ||
                    list[index].totalCnt === undefined
                      ? 0
                      : Number(
                        (
                          (Number(list[index].cnt300500) * 100) /
                            Number(list[index].totalCnt)
                        ).toFixed(2)
                      ),
                  fourPer:
                    list[index].totalCnt === '0' ||
                    list[index].totalCnt === null ||
                    list[index].totalCnt === undefined
                      ? 0
                      : Number(
                        (
                          (Number(list[index].cnt500800) * 100) /
                            Number(list[index].totalCnt)
                        ).toFixed(2)
                      ),
                  fivePer:
                    list[index].totalCnt === '0' ||
                    list[index].totalCnt === null ||
                    list[index].totalCnt === undefined
                      ? 0
                      : Number(
                        (
                          (Number(list[index].cnt800) * 100) /
                            Number(list[index].totalCnt)
                        ).toFixed(2)
                      )
                }
              } else {
                _this.cutAble = {
                  powerOneCounts: _this.removeNull(list[index].cnt0100, '0'),
                  powerTwoCounts: _this.removeNull(list[index].cnt100300, '0'),
                  powerThreeCounts: _this.removeNull(
                    list[index].cnt300500,
                    '0'
                  ),
                  powerFourCounts: _this.removeNull(list[index].cnt500800, '0'),
                  powerFiveCounts: _this.removeNull(list[index].cnt800, '0'),
                  onePer:
                    list[index].totalCnt === '0' ||
                    list[index].totalCnt === null ||
                    list[index].totalCnt === undefined
                      ? 0
                      : Number(
                        (
                          (Number(list[index].cnt0100) * 100) /
                            Number(list[index].totalCnt)
                        ).toFixed(2)
                      ),
                  twoPer:
                    list[index].totalCnt === '0' ||
                    list[index].totalCnt === null ||
                    list[index].totalCnt === undefined
                      ? 0
                      : Number(
                        (
                          (Number(list[index].cnt100300) * 100) /
                            Number(list[index].totalCnt)
                        ).toFixed(2)
                      ),
                  threePer:
                    list[index].totalCnt === '0' ||
                    list[index].totalCnt === null ||
                    list[index].totalCnt === undefined
                      ? 0
                      : Number(
                        (
                          (Number(list[index].cnt300500) * 100) /
                            Number(list[index].totalCnt)
                        ).toFixed(2)
                      ),
                  fourPer:
                    list[index].totalCnt === '0' ||
                    list[index].totalCnt === null ||
                    list[index].totalCnt === undefined
                      ? 0
                      : Number(
                        (
                          (Number(list[index].cnt500800) * 100) /
                            Number(list[index].totalCnt)
                        ).toFixed(2)
                      ),
                  fivePer:
                    list[index].totalCnt === '0' ||
                    list[index].totalCnt === null ||
                    list[index].totalCnt === undefined
                      ? 0
                      : Number(
                        (
                          (Number(list[index].cnt800) * 100) /
                            Number(list[index].totalCnt)
                        ).toFixed(2)
                      )
                }
              }
            }
            _this.able =
              _this.isPowerChoose === 0 ? _this.peakAble : _this.cutAble
          }
        })
        .catch(err => {
          console.log(err)
          _this.$Message.error('能力区间查询失败！')
        })
    },
    getRealTimeLoadCurve () {
      let _this = this
      api
        .getRealTimeLoadCurve({})
        .then(res => {
          let obj = res.data.data
          if (typeof obj !== 'undefined' && obj !== null) {
            _this.actualValues = obj.actualValue
            _this.predictedValues = obj.predictedValue
          }
        })
        .catch(err => {
          console.log(err)
          _this.$Message.error('负荷实时曲线查询失败！')
        })
    },
    changePowerModel (model) {
      if (this.isPowerChoose === model) {
        return
      }
      this.isPowerChoose = model
      this.able = this.isPowerChoose === 0 ? this.peakAble : this.cutAble
    },
    changeHeight: function () {
      this.mainHeight = 'height: ' + (window.innerHeight - 140) + 'px'
      this.infoHeight = 'height: ' + (window.innerHeight - 200) + 'px'
    }
  },
  created () {
    var _this = this
    this.$nextTick(() => {
      _this.getUnitPositionInfo()
      _this.timer5 = setInterval(_this.getUnitPositionInfo, 900000)
      _this.getRealTimeLoadCurve()
      _this.timer6 = setInterval(_this.getRealTimeLoadCurve, 900000)
    })
  },
  watch: {},
  mounted () {
    this.changeHeight()
    let that = this
    that.getDataStatistics()
    that.timer1 = setInterval(that.getDataStatistics, 900000)
    that.getRealTimeGenerationEvents()
    that.timer2 = setInterval(that.getRealTimeGenerationEvents, 900000)
    that.getUnitOnlineNo()
    that.timer3 = setInterval(that.getUnitOnlineNo, 900000)
    that.getCapabilityInterval()
    that.timer4 = setInterval(that.getCapabilityInterval, 900000)
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
  },
  beforeDestroy () {
    clearInterval(this.timer1)
    clearInterval(this.timer2)
    clearInterval(this.timer3)
    clearInterval(this.timer4)
    clearInterval(this.timer5)
    clearInterval(this.timer6)
  }
}
</script>

<style scoped>
.runTimeMain {
  background-color: rgba(252, 252, 252, 1);
  width: 100%;
  position: relative;
}

.runTimeMain .mapIntro {
  display: inline-block;
  position: fixed;
  margin-left: 10px;
  margin-top: 10px;
  z-index: 10;
}

.runTimeMain .modelIntro {
  width: 320px;
  height: 100px;
  background-color: rgba(252, 252, 252, 1);
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
  border-radius: 4px;
  font-weight: 400;
  font-size: 13px;
  padding: 8px 5px 5px 3px;
  opacity: 0.8;
}

.runTimeMain .modelIntro .rowMarginControl {
  margin-bottom: 5px;
}

.runTimeMain .modelIntro .infoRow {
  line-height: 24px;
}

.runTimeMain .modelIntro .drSpan {
  font-size: 14px;
  color: #28de99;
}

.runTimeMain .modelIntro .adrSpan {
  font-size: 14px;
  color: #ff9933;
}

.runTimeMain .modelIntro .adrDrSpan {
  font-size: 14px;
  color: #0099ff;
}

.runTimeMain .modelIntro .infoControl {
  line-height: 23px;
}

.runTimeMain .modelIntro .valueCount {
  font-size: 14px;
  color: #009999;
  font-weight: 700;
}

.runTimeMain .iconArea {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.runTimeMain .iconArea.drImg {
  background-image: url(./images/u20304.png);
}

.runTimeMain .iconArea.adrImg {
  background-image: url(./images/u20309.png);
}

.runTimeMain .iconArea.adrDrImg {
  background-image: url(./images/u20314.png);
}

.runTimeMain .iconArea img {
  width: 16px;
  height: 16px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 17%;
}

.runTimeMain .onlineIntro {
  position: relative;
  display: inline-block;
  margin-top: 12px;
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
  border-radius: 4px;
  padding: 5px 12px 5px 8px;
  background-color: rgba(252, 252, 252, 1);
  opacity: 0.8;
}

.runTimeMain .onlineIntro .rowControl {
  line-height: 25px;
}

.runTimeMain .onlineIntro .imgControl {
  display: inline-block;
  vertical-align: middle;
  width: 14px;
  height: 14px;
  margin-right: 8px;
}

.runTimeMain .onlineIntro .imgControl img {
  vertical-align: top;
}

.runTimeMain .mapBody {
  position: relative;
  height: 100%;
}

.runTimeMain .runTimeInfo {
  display: inline-block;
  width: 345px;
  height: 500px;
  background-color: rgba(252, 252, 252, 1);
  position: absolute;
  right: 30px;
  top: 10px;
  height: 500px;
  overflow-y: scroll;
  overflow-x: auto;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
  border-radius: 4px;
  opacity: 0.8;
  z-index: 10;
}

.runTimeMain .runTimeInfo::-webkit-scrollbar {
  width: 3px;
}
.runTimeMain .runTimeInfo::-webkit-scrollbar-track-piece {
  background-color: #ffffff;
} /* 滚动条的内层滑轨背景颜色 */

.runTimeMain .runTimeInfo::-webkit-scrollbar-track {
  background-color: #fff;
} /* 滚动条的外层滑轨背景颜色 */

.runTimeMain .runTimeInfo::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
} /* 滚动条的内层滑块颜色 */

.runTimeMain .runTimeInfo::-webkit-scrollbar-button {
  background-color: #fff;
  display: none;
}

.runTimeMain .dataStatictis {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
  border-radius: 4px;
  padding: 8px;
  background-color: rgba(252, 252, 252, 1);
  width: 100%;
}

.runTimeMain .dataStatictis .statictisTitle,
.runTimeMain .powerArea .powerTitle,
.runTimeMain .supportEvent .supportTitle {
  font-weight: 700;
  font-size: 13px;
  color: #009999;
}

.runTimeMain .dataStatictis .statictisTitle {
  margin-bottom: 15px;
}

.runTimeMain .realTimeCurve,
.runTimeMain .supportEvent,
.runTimeMain .powerArea {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
  border-radius: 4px;
  padding: 8px;
  background-color: rgba(252, 252, 252, 1);
  width: 100%;
  height: 180px;
  margin-top: 10px;
}

.runTimeMain .supportEvent,
.runTimeMain .powerArea {
  height: auto;
}

.runTimeMain .powerArea .chooseModel {
  display: inline-block;
  position: absolute;
  top: 8px;
  right: 10px;
  height: 20px;
  line-height: 20px;
  font-weight: 400;
  font-size: 14px;
  color: #009999;
}

.runTimeMain .powerArea .chooseModel span {
  width: 60px;
  display: inline-block;
  text-align: center;
  vertical-align: top;
  line-height: 18px;
  height: 20px;
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0);
  cursor: pointer;
}

.runTimeMain .powerArea .chooseModel span:nth-child(1) {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.runTimeMain .powerArea .chooseModel span:nth-child(2) {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.runTimeMain .powerArea .chooseModel span.isChoose {
  color: #ffffff;
  background-color: #009999;
}

.runTimeMain .powerArea .powerMain {
  margin-top: 6px;
}

.runTimeMain .powerArea .powerMain .perInfo {
  font-weight: 400;
  font-size: 12px;
  color: #666666;
}

.runTimeMain .powerArea .powerMain .lastInfo {
  font-weight: 700;
  font-size: 13px;
  color: #009999;
}

.runTimeMain .powerArea .powerMain .rowTopControl {
  margin-top: 5px;
}
.runTimeMain .powerArea .powerMain .rowControl {
  text-align: center;
}

.runTimeMain .powerArea .powerMain .rowControl .colControl {
  line-height: 18px;
}

.runTimeMain .supportEvent .supportBody .eventRowControl {
  margin-top: 6px;
}

.runTimeMain .supportEvent .supportBody span {
  font-weight: 400;
  font-size: 13px;
  color: #666666;
}

.runTimeMain .supportEvent .supportBody .eventValue {
  color: #009999;
  margin-left: 5px;
  word-break: break-all;
}

.runTimeMain .dataStatictis .itemCol {
  text-align: center;
}

.runTimeMain .dataStatictis .dataStatictisImgDiv {
  position: relative;
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
  border-radius: 4px;
  display: inline-block;
  line-height: 36px;
  margin-bottom: 7%;
}

.runTimeMain .dataStatictis .dataStatictisImgDiv.onlineMedicals {
  background-color: #07db8a;
}

.runTimeMain .dataStatictis .dataStatictisImgDiv.onlineRate {
  background-color: #0ccdfe;
}

.runTimeMain .dataStatictis .dataStatictisImgDiv.realLoad {
  background-color: #ff9933;
}

.runTimeMain .dataStatictis .dataStatictisImgDiv.todaySupport {
  background-color: #ffc313;
}

.runTimeMain .dataStatictis .dataStatictisImgDiv img {
  width: 18px;
  height: 18px;
}

.runTimeMain .dataStatictis .dataStatictisImgDiv.onlineRate img {
  margin-top: 5px;
  width: 20px;
  height: 21px;
}

.runTimeMain .dataStatictis .dataStatictisImgDiv.realLoad img {
  height: 20px;
  width: 20px;
  margin-top: 6px;
}

.runTimeMain .dataStatictis .dataStatictisItem {
  font-size: 13px;
  font-weight: 400;
  color: #666666;
}

.runTimeMain .dataStatictis .dataStatictisValue {
  font-size: 14px;
  font-weight: 700;
  color: #21a5a7;
  word-break: break-all;
}

.runTimeMain .dataStatictis .statisBottomRowControl {
  margin-top: 10px;
}

.runTimeMain .dataStatictis .statisBottomImg {
  display: inline-block;
  margin-right: 5px;
}

.runTimeMain .dataStatictis .statisBottomImg img {
  width: 20px;
  height: 20px;
}

.runTimeMain .dataStatictis .statisBottomImg.downImg img {
  transform: rotate(180deg);
}

.runTimeMain .dataStatictis .statisBottomInfo,
.runTimeMain .dataStatictis .statisBottomValue {
  font-weight: 400;
  font-size: 13px;
  color: #666666;
  word-break: break-all;
  vertical-align: top;
}

.runTimeMain .dataStatictis .statisBottomValue {
  color: #009999;
}
</style>
