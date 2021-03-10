<template>
  <div class="subDeviceCard">
    <div class="scMain">
      <div class="scTitle">设备信息</div>
      <Row :gutter="6">
        <i-col span="9" class="scBorderICol">
          <div class="scMainImgCol">
            <img src="./images/u10294.png" />
          </div>
          <div class="scDeviceName" @click="changeModalFlag">
            <span>{{subDeviceInfo.deviceName}}</span>
          </div>
          <img class="scLineImg" src="./images/u10287.png" />
        </i-col>
        <i-col span="15">
          <Row :gutter="6">
            <i-col span="4">
              <div class="scSmallImgCol">
                <img src="./images/u10298.png" />
              </div>
            </i-col>
            <i-col span="10">
              <div class="scIntroText">额定容量</div>
            </i-col>
            <i-col span="10">
              <div class="scIntroVlaue">
                {{subDeviceInfo.unChangeInner}}
                <span class="scIntroUnit">kVA</span>
              </div>
            </i-col>
          </Row>
          <Row :gutter="6">
            <i-col span="4">
              <div class="scSmallImgCol yellowBorder">
                <img src="./images/u10308.png" />
              </div>
            </i-col>
            <i-col span="10">
              <div class="scIntroText">发电功率</div>
            </i-col>
            <i-col span="10">
              <div class="scIntroVlaue">
                {{subDeviceInfo.supportElecPower}}
                <span class="scIntroUnit">kW</span>
              </div>
            </i-col>
          </Row>
          <Row :gutter="6">
            <i-col span="4">
              <div class="scSmallImgColCircle outLine" v-if="subDeviceInfo.changeMacStatus === '0'">
                <img src="./images/u8728.png" />
              </div>
              <div class="scSmallImgColCircle" v-if="subDeviceInfo.changeMacStatus === '1'">
                <img src="./images/u8726.png" />
              </div>
            </i-col>
            <i-col span="10">
              <div class="scIntroText textLast">逆变器状态</div>
            </i-col>
            <i-col span="10">
              <div class="scStatusVlaue outLine" v-if="subDeviceInfo.changeMacStatus === '0'">离线</div>
              <div class="scStatusVlaue" v-if="subDeviceInfo.changeMacStatus === '1'">发电</div>
            </i-col>
          </Row>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
import "@/view/fictitiousPowerPlant/photovoltaicDetail/photovoltaicDetail.less";

export default {
  name: "subDevice-card",
  components: {},
  props: {
    subDeviceInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    changeModalFlag: function() {
      this.$emit("changeModalFlag", true);
    }
  },
  watch: {},
  beforeDestroy() {}
};
</script>
<style scoped>
.subDeviceCard {
  border: none;
  margin-top: 2%;
}

.subDeviceCard .scMain {
  border: 1px solid #dcdee2;
  border-radius: 4px;
  padding: 25px 20px 10px 20px;
  width: 90%;
  margin-left: 5%;
}

.subDeviceCard .scMain .scTitle {
  position: absolute;
  display: inline-block;
  top: 0;
  background-color: #fcfcfc;
  font-weight: 700;
  font-size: 13px;
  color: #009999;
}

.subDeviceCard .scMain .scMainImgCol {
  display: inline-block;
  width: 64px;
  height: 64px;
  border-radius: 4px;
  background-color: #00cccc;
}

.subDeviceCard .scMain .scMainImgCol img {
  width: 64px;
  margin-top: 7px;
}

.subDeviceCard .scMain .scDeviceName {
  display: inline-block;
  font-weight: 700;
  font-size: 13px;
  color: #009999;
  margin-top: 10px;
  margin-left: 2px;
  width: 100%;
  cursor: pointer;
}

.subDeviceCard .scMain .scDeviceName span:hover {
  text-decoration: underline;
}

.subDeviceCard .scMain .scLineImg {
  display: inline-block;
  position: absolute;
  top: 0;
  height: 100%;
  right: 18%;
  width: 3px;
}

.subDeviceCard .scMain .scIntroText,
.subDeviceCard .scMain .scIntroUnit {
  font-weight: 400;
  font-size: 13px;
  color: #666666;
  line-height: 16px;
  margin-bottom: 22px;
}

.subDeviceCard .scMain .scIntroText.textLast {
  margin-bottom: 0;
}

.subDeviceCard .scMain .scIntroVlaue,
.subDeviceCard .scMain .scStatusVlaue {
  font-weight: 700;
  color: #21a5a7;
  font-size: 14px;
  line-height: 16px;
}

.subDeviceCard .scMain .scStatusVlaue.outLine {
  color: #ff6633;
}

.subDeviceCard .scMain .scSmallImgCol {
  display: inline-block;
  width: 16px;
  height: 16px;
}

.subDeviceCard .scMain .scSmallImgCol.yellowBorder {
  border: 1px solid #ff9933;
  border-radius: 4px;
}

.subDeviceCard .scMain .scSmallImgCol img {
  width: 16px;
}

.subDeviceCard .scMain .scSmallImgColCircle {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid #07db8a;
  border-radius: 50%;
  text-align: center;
}

.subDeviceCard .scMain .scSmallImgColCircle.outLine {
  border: 1px solid #ff6633;
}

.subDeviceCard .scMain .scSmallImgColCircle img {
  width: 8px;
  vertical-align: middle;
  display: inline-block;
  margin-bottom: 8px;
}
</style>
