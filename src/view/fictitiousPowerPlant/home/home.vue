<template>
  <div class="vituralHome" :style="mainHeight">
    <Row style="height: 100%" :gutter="6">
      <i-col span="22">
        <span class="datepicker">选择日期</span>
        <Date-picker class="datepicker"></Date-picker>
      </i-col>
      <i-col span="9" style="height: 100%">
        <Row class="spreadMapRow">
          <Card class="spreadMap" v-if="mapModel === 0">
            <div class="mapTitle">
              ||| {{ areaName }}规划图
              <i-col span="8" class="mapChoose">
                <span>规划区域</span>
                <Select
                  v-model="city"
                  placeholder="请选择规划区域"
                  :label-in-value="true"
                  style="width: 120px"
                  @on-change="showCityMess"
                >
                  <Option
                    v-for="item in citys"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.name }}</Option
                  >
                </Select>
              </i-col>
            </div>
            <!-- <Card class="legTip" v-if="isMapLegShow">
              <div class="countTip">
                <div class="tipCircle"></div>
                <span class="tipText">机组数(个)</span>
              </div>
              <div class="rateTip">
                <div class="tipCircle"></div>
                <span class="tipText">在线率(%)</span>
              </div>
            </Card> -->
            <div class="visualTip">实时负荷(kW)</div>
            <SpreadMap
              :mapData="mapData"
              :barData="mapBarData"
              :area="areaName"
              style="height: 100%"
              @changeMap="changeMap"
              @changeMapLegShow="changeMapLegShow"
            />
          </Card>
          <Card class="spreadMap" v-if="mapModel === 1">
            <div class="goBackMap" @click="changeMap(0)">
              <img src="./images/u559.png" />
              <span>返回</span>
            </div>
            <SpreadDetailMap
              :mapData="detailMapData"
              :mapName="mapName"
              :area="areaName"
              style="height: 100%"
            />
            <Card class="legDetailTip">
              <div class="detailRealTip">
                <div class="tipCircle"></div>
                <span class="tipText">实时负荷</span>
              </div>
              <div class="detailUpTip">
                <div class="tipCircle"></div>
                <span class="tipText">可上调裕度</span>
              </div>
              <div class="detailDownTip">
                <div class="tipCircle"></div>
                <span class="tipText">可下调裕度</span>
              </div>
            </Card>
          </Card>
        </Row>
      </i-col>

      <i-col span="7" style="height: 100%">
        <Row class="medicalTypeRow">
          <Card class="medicalType">
            <div class="typeTitle">||| {{ areaName }}供电曲线</div>
            <div class="typeMain">
              <MedicalTypePie
                :upList="realCurve.upList"
                :downList="realCurve.downList"
                :aplantPForecasts="realCurve.aplantPForecasts"
                :aplantPRealtimes="realCurve.aplantPRealtimes"
                style="height: 100%"
              />
            </div>
          </Card>
        </Row>
        <Row class="medicalSpreadRow">
          <Card class="medicalSpread">
            <div class="spreadTitle">
              ||| {{ areaName }}分布式<br />能源数据
            </div>
            <div
              class="alarmAside"
              style="width: 36%; margin-top: 100px; float: left"
            >
              <Row
                class="rowMarginControl infoRow"
                :gutter="8"
                style="margin-bottom: 30px"
              >
                <i-col span="12">
                  <div class="iconArea drImg">
                    <img src="./images/u20069.png" />
                  </div>
                  <span class="drSpan">光伏</span>
                </i-col>
                <i-col span="8" class="infoControl">
                  <span class="drSpan">3400</span>
                  <span>MW</span>
                </i-col>
              </Row>
              <Row
                class="rowMarginControl infoRow"
                :gutter="8"
                style="margin-bottom: 30px"
              >
                <i-col span="12">
                  <div class="iconArea adrImg">
                    <img src="./images/u20062.png" />
                  </div>
                  <span class="adrSpan">风电</span>
                </i-col>
                <i-col span="8" class="infoControl">
                  <span class="adrSpan">15</span>
                  <span>MW</span>
                </i-col>
              </Row>
              <Row class="rowMarginControl infoRow" :gutter="8">
                <i-col span="12">
                  <div class="iconArea adrDrImg">
                    <img src="./images/u20074.png" />
                  </div>
                  <span class="adrDrSpan">储能</span>
                </i-col>
                <i-col span="8" class="infoControl">
                  <span class="adrDrSpan">45</span>
                  <span>MW</span>
                </i-col>
              </Row>
            </div>
            <div class="realTimeMain" style="width: 64%; float: right">
              <RealTimeCurve
                :upList="realCurve.upList"
                :downList="realCurve.downList"
                :aplantPForecasts="realCurve.aplantPForecasts"
                :aplantPRealtimes="realCurve.aplantPRealtimes"
                style="height: 102%"
              />
            </div>
          </Card>
        </Row>
      </i-col>
      <i-col span="8" style="height: 100%">
        <Row class="alarmExpRow">
          <Card class="alarmExp">
            <div class="alramTitle">||| {{ areaName }}用户接入数据</div>
            <div
              class="alarmAside"
              style="width: 36%; margin-top: 80px; float: left"
            >
              <Row
                class="rowMarginControl infoRow"
                :gutter="8"
                style="margin-bottom: 20px"
              >
                <i-col span="14">
                  <div class="iconArea drImg">
                    <img src="./images/u20069.png" />
                  </div>
                  <span class="drSpan">居民用户数</span>
                </i-col>
                <i-col span="8" class="infoControl">
                  <span class="drSpan">34000</span>
                  <span>个</span>
                </i-col>
              </Row>
              <Row
                class="rowMarginControl infoRow"
                :gutter="8"
                style="margin-bottom: 20px"
              >
                <i-col span="14">
                  <div class="iconArea adrImg">
                    <img src="./images/u20062.png" />
                  </div>
                  <span class="adrSpan">工业用户数</span>
                </i-col>
                <i-col span="8" class="infoControl">
                  <span class="adrSpan">15</span>
                  <span>个</span>
                </i-col>
              </Row>
              <Row
                class="rowMarginControl infoRow"
                :gutter="8"
                style="margin-bottom: 20px"
              >
                <i-col span="14">
                  <div class="iconArea adrDrImg">
                    <img src="./images/u20074.png" />
                  </div>
                  <span class="adrDrSpan">海水淡化</span>
                </i-col>
                <i-col span="8" class="infoControl">
                  <span class="adrDrSpan">1</span>
                  <span>个</span>
                </i-col>
              </Row>
            </div>
            <div class="alarmMain" style="width: 64%; float: right">
              <AlarmExpPie :pieData="alarmPieData" style="height: 102%" />
            </div>
          </Card>
        </Row>
        <Row class="realTimeCurveRow">
          <Card class="realTimeCurve">
            <div class="realTimeTitle">||| {{ areaName }}负荷曲线</div>
            <div class="spreadMain">
              <SpreadRose
                :roseData="spreadRoseData"
                :totalSize="totalMedicals"
                style="height: 100%"
              />
            </div>
          </Card>
        </Row>
      </i-col>
    </Row>
  </div>
</template>

<script>
import * as api from "@/api/fictitiousPowerPlant/home/mainview-data.js";
import "@/view/fictitiousPowerPlant/home/home.less";
import MedicalTypePie from "./medicalTypePie.vue";
import SpreadRose from "./spreadRose.vue";
import DeviceResolve from "./deviceResolve.vue";
import AlarmExpPie from "./alarmExpPie.vue";
import RealTimeCurve from "./realTimeCurve.vue";
import TopFine from "./topFine.vue";
import MonthSupport from "./monthSupport.vue";
import SpreadMap from "./spreadMap.vue";
import SpreadDetailMap from "./spreadDetailMap.vue";
import { judgeNull } from "../util.js";

export default {
  name: "home",
  components: {
    MedicalTypePie,
    SpreadRose,
    DeviceResolve,
    AlarmExpPie,
    RealTimeCurve,
    TopFine,
    MonthSupport,
    SpreadMap,
    SpreadDetailMap,
  },
  props: {},
  data() {
    let boxWidth = window.innerWidth;
    return {
      boxWidth: boxWidth,
      mainHeight: "height: 500px;",
      baseInfoData: {
        divideCount: "0",
        userCount: "0",
        medicalGroupCount: "0",
        onlineRate: "0",
      },
      timer1: {},
      timer2: {},
      totalMedicals: "0",
      medicalPieData: [],
      spreadRoseData: [],
      deviceData: [],
      statis: {
        totalElec: "0",
        totalPrice: "0",
        ecoCo: "0",
        cutPeakCount: "0",
        tradeTotalCount: "0",
        cutCo: "0",
        fullValCount: "0",
      },
      alarmPieData: [],
      realCurve: {
        upList: [],
        downList: [],
        aplantPForecasts: [],
        aplantPRealtimes: [],
      },
      isBarChoose: "0",
      topFineData: [],
      monthData: [],
      mapData: [],
      mapBarData: [],
      mapModel: 0,
      mapName: "",
      detailMapData: [],
      unitInfoArr: [],
      isMapLegShow: false,
      areaName: "天津市",
      city: "500",
      citys: [
        { name: "上海市", value: "001" },
        { name: "天津市", value: "500" },
      ],
    };
  },
  methods: {
    removeNull(val, initStr = "") {
      return judgeNull(val, initStr);
    },
    changeHeight: function () {
      this.mainHeight = "height: " + (window.innerHeight - 140) + "px";
    },
    getBaseInfoData: function () {
      let _this = this;
      api
        .getBaseInfo({})
        .then((res) => {
          let obj = res.data.data[0];
          if (typeof obj !== "undefined" && obj !== null) {
            _this.baseInfoData.divideCount = _this.removeNull(
              obj.subdeviceCnt,
              "0"
            );
            _this.baseInfoData.userCount = _this.removeNull(obj.ownerCnt, "0");
            _this.baseInfoData.medicalGroupCount = _this.removeNull(
              obj.unitCnt,
              "0"
            );
            _this.baseInfoData.onlineRate = Number(
              obj.unitCnt === "0" || obj.unitCnt === "" || obj.unitCnt === null
                ? 0
                : (
                    ((Number(obj.adrDrOnlineCnt) +
                      Number(obj.drOnlineCnt) +
                      Number(obj.adrOnlineCnt)) *
                      100) /
                    Number(obj.unitCnt)
                  ).toFixed(3)
            );
          }
        })
        .catch((err) => {
          console.log(err);
          _this.$Message.error("基本信息查询失败！");
        });
    },
    getUnitDistribute: function () {
      this.spreadRoseData = [];
    },
    getSubDeviceShow: function () {
      let _this = this;
      api
        .getSubDeviceShow({})
        .then((res) => {
          _this.deviceData = res.data.data;
        })
        .catch((err) => {
          console.log(err);
          _this.$Message.error("基本信息查询失败！");
        });
    },
    getUnitTypeNums: function () {
      let _this = this;
      api
        .getUnitTypeNums({})
        .then((res) => {
          let list = res.data.data;
          if (typeof list !== "undefined" && list !== null && list.length > 0) {
            _this.medicalPieData = list;
          }
        })
        .catch((err) => {
          console.log(err);
          _this.$Message.error("基本信息查询失败！");
        });
    },
    getAramNum: function () {
      this.alarmPieData = [];
    },
    getMonthPower: function () {
      let _this = this;
      api
        .getMonthPower({})
        .then((res) => {
          let list = res.data.data;
          if (typeof list !== "undefined" && list !== null && list.length > 0) {
            _this.monthData = list;
          } else {
            _this.monthData = [];
          }
        })
        .catch((err) => {
          console.log(err);
          _this.$Message.error("基本信息查询失败！");
        });
    },
    getUnitPowerTop: function (val) {
      let _this = this;
      api
        .getUnitPowerTop({ isCount: val })
        .then((res) => {
          let list = res.data.data;
          if (typeof list !== "undefined" && list !== null && list.length > 0) {
            _this.topFineData = list;
          }
        })
        .catch((err) => {
          console.log(err);
          _this.$Message.error("基本信息查询失败！");
        });
    },
    getRealLoad: function () {
      let _this = this;
      // api
      //   .getRealLoad({})
      //   .then(res => {
      //     let list = res.data.data
      let initMapData = [
        { name: "长宁区", value: 0 },
        { name: "崇明区", value: 0 },
        { name: "宝山区", value: 0 },
        { name: "杨浦区", value: 0 },
        { name: "青浦区", value: 0 },
        { name: "浦东新区", value: 0 },
        { name: "嘉定区", value: 0 },
        { name: "虹口区", value: 0 },
        { name: "黄浦区", value: 0 },
        { name: "闸北区", value: 0 },
        { name: "松江区", value: 0 },
        { name: "金山区", value: 0 },
        { name: "奉贤区", value: 0 },
        { name: "闵行区", value: 0 },
        { name: "徐汇区", value: 0 },
        { name: "普陀区", value: 0 },
        { name: "静安区", value: 0 },
        { name: "卢湾区", value: 0 },
      ];
      _this.mapData = initMapData;
      //   if (typeof list !== 'undefined' && list !== null && list.length > 0) {
      //     _this.mapData = []
      //     for (let index = 0; index < list.length; index++) {
      //       for (
      //         let initIndex = 0;
      //         initIndex < initMapData.length;
      //         initIndex++
      //       ) {
      //         if (initMapData[initIndex].name === list[index].areaName) {
      //           initMapData[initIndex].value = list[index].fuhe
      //         }
      //       }
      //       _this.mapData = initMapData
      //     }
      //   } else {
      //     _this.mapData = initMapData
      //   }
      // })
      // .catch(err => {
      //   console.log(err)
      //   _this.mapData = initMapData
      //   _this.$Message.error('基本信息查询失败！')
      // })
    },
    getStatisData: function () {
      let _this = this;
      api
        .getStatisData({})
        .then((res) => {
          let data = res.data.data;
          if (typeof data !== "undefined" && data !== null) {
            _this.statis.totalElec = _this.removeNull(data.finishGenCap, "0");
            _this.statis.totalPrice = _this.removeNull(data.settleAccount, "0");
            _this.statis.ecoCo = _this.removeNull(data.saveCoal, "0");
            _this.statis.cutPeakCount = _this.removeNull(data.allReduce, "0");
            _this.statis.tradeTotalCount = _this.removeNull(
              data.finishPlanCnt,
              "0"
            );
            _this.statis.cutCo = _this.removeNull(data.reduceCo2, "0");
            _this.statis.fullValCount = _this.removeNull(data.allAdd, "0");
          }
        })
        .catch((err) => {
          console.log(err);
          _this.$Message.error("统计信息查询失败！");
        });
    },
    getUnitSumAndOnline() {
      let _this = this;
      api
        .getUnitSumAndOnline({})
        .then((res) => {
          let list = res.data.data;
          if (typeof list !== "undefined" && list !== null && list.length > 0) {
            _this.mapBarData = list;
          }
        })
        .catch((err) => {
          console.log(err);
          _this.$Message.error("机组在线数查询失败！");
        });
    },
    getUnitInformationList() {
      let _this = this;
      api
        .getUnitInformationList({})
        .then((res) => {
          let list = res.data.data;
          if (typeof list !== "undefined" && list !== null && list.length > 0) {
            _this.unitInfoArr = [];
            for (let index = 0; index < list.length; index++) {
              let obj = {
                areaNo: list[index].areaNo,
                areaName: list[index].areaName,
                unitNo: list[index].unitNo,
                name: list[index].unitName,
                coord: [list[index].longitude, list[index].latitude],
              };
              _this.unitInfoArr.push(obj);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          _this.$Message.error("机组在线数查询失败！");
        });
    },
    getTodayLoadCurve: function () {
      let _this = this;
      _this.realCurve.upList = [];
      _this.realCurve.downList = [];
      _this.realCurve.aplantPForecasts = [];
      _this.realCurve.aplantPRealtimes = [];
    },
    chooseBarModel(model) {
      if (this.isBarChoose !== model) {
        this.isBarChoose = model;
        if (model === "0") {
          this.getUnitPowerTop(1);
        } else {
          this.getUnitPowerTop(0);
        }
      }
    },
    changeMap(mapModel, mapName) {
      let _this = this;
      if (mapModel === 1) {
        _this.mapModel = 1;
        _this.mapData = [];
        this.$nextTick(() => {
          _this.setDetailMap(mapName);
        });
      } else {
        _this.mapModel = 0;
        _this.mapName = "";
        _this.detailMapData = [];
        setTimeout(() => {
          _this.getRealLoad();
        }, 100);
      }
    },
    setDetailMap(mapName) {
      this.mapName = mapName;
      for (let index = 0; index < this.unitInfoArr.length; index++) {
        if (this.unitInfoArr[index].areaName === mapName) {
          this.detailMapData.push(this.unitInfoArr[index]);
        }
      }
    },
    changeMapLegShow(isShow) {
      this.isMapLegShow = isShow;
    },
    showCityMess: function (val) {
      let _this = this;
      _this.areaName = val.label;
      setTimeout(() => {
        _this.changeMap(0);
      }, 100);
    },
  },
  watch: {},
  mounted() {},
  created() {
    var _this = this;
    this.$nextTick(() => {
      _this.getUnitDistribute();
      _this.getAramNum();
      _this.getRealLoad();
      _this.getTodayLoadCurve();
    });
  },
  beforeDestroy() {
    let _this = this;
    clearInterval(_this.timer1);
    clearInterval(_this.timer2);
  },
};
</script>

<style scoped>
.vituralHome {
  position: relative;
  width: 100%;
  min-height: 680px;
}

.vituralHome .baseInfoRow,
.vituralHome .dataStatisRow {
  position: relative;
  background-color: rgba(252, 252, 252, 1);
  min-height: 128px;
  height: 16%;
  margin-bottom: 2%;
}

.vituralHome .baseInfo,
.vituralHome .dataStatis {
  background-color: rgba(252, 252, 252, 1);
  padding: 10px;
  height: 100%;
}
.vituralHome .medicalTypeRow,
.vituralHome .medicalSpreadRow,
.vituralHome .alarmExpRow,
.vituralHome .realTimeCurveRow {
  position: relative;
  min-height: 160px;
  height: 57%;
  margin-bottom: 2%;
}

.vituralHome .spreadMapRow {
  position: relative;
  min-height: 462px;
  height: 115.5%;
}

.vituralHome .monthSupportRow {
  position: relative;
  min-height: 225px;
  height: 30%;
}

.vituralHome .medicalType,
.vituralHome .alarmExp {
  padding: 10px;
  height: 100%;
  background-color: rgba(252, 252, 252, 1);
}

.vituralHome .medicalSpread,
.vituralHome .realTimeCurve,
.vituralHome .monthSupport,
.vituralHome .spreadMap {
  padding: 10px;
  height: 100%;
  background-color: rgba(252, 252, 252, 1);
}

.vituralHome .deviceResolveRow,
.vituralHome .topFineRow {
  position: relative;
  min-height: 225px;
  height: 30%;
}

.vituralHome .deviceResolve,
.vituralHome .topFine {
  height: 100%;
  background-color: rgba(252, 252, 252, 1);
  padding: 10px 10px 0 10px;
}

.vituralHome .baseInfo .infoTitle {
  font-weight: 700;
  font-size: 13px;
  color: #009999;
  margin-bottom: 4%;
}

.vituralHome .dataStatis .statisTitle {
  font-weight: 700;
  font-size: 13px;
  color: #009999;
  margin-bottom: 2%;
}

.vituralHome .medicalType .typeTitle,
.vituralHome .alarmExp .alramTitle {
  position: absolute;
  font-weight: 700;
  font-size: 13px;
  color: #009999;
  display: inline-block;
}

.vituralHome .medicalSpread .spreadTitle {
  position: absolute;
  font-weight: 700;
  font-size: 13px;
  color: #009999;
  display: inline-block;
}

.vituralHome .spreadMapRow .mapTitle {
  position: relative;
  font-weight: 700;
  font-size: 13px;
  color: #009999;
  display: block;
  height: 30px;
  line-height: 30px;
}
.vituralHome .spreadMapRow .mapChoose {
  display: block;
  float: right;
}

.vituralHome .realTimeCurve .realTimeTitle,
.vituralHome .monthSupport .supportTitle {
  position: absolute;
  font-weight: 700;
  font-size: 13px;
  color: #009999;
  display: inline-block;
}

.vituralHome .deviceResolve .resovleTitle,
.vituralHome .topFine .topFineTitle {
  position: relative;
  font-weight: 700;
  font-size: 13px;
  color: #009999;
  display: inline-block;
}

.vituralHome .typeMain,
.vituralHome .spreadMain,
.vituralHome .resolveMain,
.vituralHome .alarmMain,
.vituralHome .realTimeMain,
.vituralHome .supportMain {
  height: 100%;
}

.vituralHome .baseInfo .itemCol {
  text-align: center;
}

.vituralHome .baseInfo .baseInfoImgDiv {
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

.vituralHome .baseInfo .baseInfoImgDiv.divide {
  background-color: rgba(7, 219, 138, 1);
}

.vituralHome .baseInfo .baseInfoImgDiv.user {
  background-color: rgba(255, 153, 51, 1);
}

.vituralHome .baseInfo .baseInfoImgDiv.medicalGroup {
  background-color: #07ccfe;
}

.vituralHome .baseInfo .baseInfoImgDiv.onlineRate {
  background-color: #fec620;
}

.vituralHome .baseInfo .baseInfoImgDiv img {
  width: 18px;
  height: 18px;
}

.vituralHome .baseInfo .baseInfoImgDiv.onlineRate img {
  height: 20px;
  margin-top: 5px;
}

.vituralHome .baseInfo .baseInfoItem {
  font-size: 13px;
  font-weight: 400;
  color: #666666;
}

.vituralHome .baseInfo .baseInfoValue {
  font-size: 14px;
  font-weight: 700;
  color: #21a5a7;
  word-break: break-all;
}

.vituralHome .statisInfo {
  color: #666666;
  font-weight: 400;
  font-size: 12px;
  word-break: break-all;
}

.vituralHome .statisValue {
  color: #009999;
}

.vituralHome .statisInnerRow {
  margin-bottom: 2%;
}

.vituralHome .topFine .chooseBar {
  display: inline-block;
  position: absolute;
  right: 20px;
}

.vituralHome .topFine .chooseBar .chooseBtn {
  display: inline-block;
  width: 60px;
  line-height: 19px;
  height: 20px;
  font-size: 13px;
  font-weight: 400;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
  cursor: pointer;
  color: #009999;
  background-color: rgba(255, 255, 255, 0);
}

.vituralHome .topFine .chooseBar .chooseBtn:nth-child(1) {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.vituralHome .topFine .chooseBar .chooseBtn:nth-child(2) {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.vituralHome .topFine .chooseBar .chooseBtn.isChoose {
  color: #ffffff;
  background-color: #009999;
}

.vituralHome .legTip {
  display: inline-block;
  position: absolute;
  right: 20px;
  background-color: #fcfcfc;
  z-index: 10;
  opacity: 0.8;
  padding: 10px;
  top: 50px;
}

.vituralHome .legDetailTip {
  display: inline-block;
  position: absolute;
  right: 20px;
  background-color: #fcfcfc;
  z-index: 10;
  opacity: 0.8;
  padding: 10px;
  bottom: 25px;
}

.vituralHome .legTip .countTip {
  margin-top: 3px;
  margin-bottom: 5px;
}

.vituralHome .legDetailTip .detailRealTip {
  margin-top: 5px;
}

.vituralHome .legDetailTip .detailUpTip {
  margin-top: 5px;
  margin-bottom: 5px;
}

.vituralHome .legTip .tipCircle,
.vituralHome .legDetailTip .tipCircle,
.vituralHome .legDetailTip .tipCircle,
.vituralHome .legDetailTip .tipCircle {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #ff9933;
  margin-right: 10px;
}

.vituralHome .legDetailTip .detailRealTip .tipCircle {
  background-color: #ff6633;
}

.vituralHome .legTip .rateTip .tipCircle,
.vituralHome .legDetailTip .detailDownTip .tipCircle {
  background-color: #07db8a;
}

.vituralHome .legTip .tipText,
.vituralHome .legDetailTip .tipText {
  font-weight: 400;
  font-size: 12px;
  color: #666666;
  vertical-align: top;
  display: inline-block;
  height: 14px;
  line-height: 14px;
}

.vituralHome .goBackMap {
  position: absolute;
  display: inline-block;
  z-index: 10;
  opacity: 0.8;
  background: #fcfcfc;
  width: 55px;
  height: 25px;
  left: 15px;
  top: 20px;
  border-radius: 4px;
  padding-top: 5px;
  padding-left: 5px;
  cursor: pointer;
  box-shadow: 0px 0px 2px #666666;
}

.vituralHome .goBackMap:hover {
  box-shadow: 2px 2px 5px #666666;
}

.vituralHome .goBackMap img {
  width: 15px;
  height: 15px;
  display: inline-block;
  vertical-align: top;
}

.vituralHome .goBackMap span {
  font-weight: 400;
  font-size: 13px;
  color: #00cccc;
  display: inline-block;
  height: 20px;
  line-height: 15px;
  vertical-align: top;
  margin-left: 3px;
}

.vituralHome .spreadMap .visualTip {
  position: absolute;
  display: inline-block;
  font-weight: 400;
  font-size: 12px;
  color: #666666;
}

.vituralHome .iconArea {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 3px;
}

.vituralHome .iconArea.drImg {
  background-image: url(./images/u20304.png);
}

.vituralHome .iconArea.adrImg {
  background-image: url(./images/u20309.png);
}

.vituralHome .iconArea.adrDrImg {
  background-image: url(./images/u20314.png);
}

.vituralHome .iconArea.adrDImg {
  background-image: url(./images/u2129.png);
}

.vituralHome .iconArea img {
  width: 16px;
  height: 16px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 17%;
}

.vituralHome .alarmAside .drSpan {
  font-size: 14px;
  color: #28de99;
}

.vituralHome .alarmAside .adrSpan {
  font-size: 14px;
  color: #ff9933;
}

.vituralHome .alarmAside .adrDrSpan {
  font-size: 14px;
  color: #0099ff;
}

.vituralHome .alarmAside .adrDSpan {
  font-size: 14px;
  color: #f46042;
}
.datepicker {
  position: relative;
  left: 900px;
  bottom: 5px;
  margin-right: 20px;
  font-size: 15px;
}
</style>
