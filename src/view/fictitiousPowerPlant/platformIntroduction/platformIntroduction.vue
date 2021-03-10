<template>
  <div class="platformIntroduction">
    <div class="platformTitle">
      <div class="mainTitle">虚拟电厂平台</div>
      <div class="subTitle">Virtual Power Plant Platform</div>
    </div>
    <div class="platformMain">
      <div class="mainIntro">
        <div>
          <div class="lineImgControl">
            <img src="./images/u44315.png" />
          </div>
          <span class="imgIntro">能量流</span>
        </div>
        <div>
          <div class="lineImgControl">
            <img src="./images/u44317.png" />
          </div>
          <span class="imgIntro">信息流</span>
        </div>
      </div>
      <div class="platformImgControl newPowerDiv">
        <span>新能源</span>
        <img src="./images/u44293.png" />
      </div>
      <div class="leftTopLine">
        <img src="./images/u44333.png" />
        <img src="./images/u44339.png" />
      </div>
      <div class="platformImgControl savePowerDiv">
        <span>储能</span>
        <img src="./images/u44299.png" />
      </div>
      <div class="leftLine">
        <img src="./images/u44341.png" />
        <img src="./images/u44335.png" />
      </div>
      <div class="platformImgControl controlLoadDiv">
        <span>可控负荷</span>
        <img src="./images/u44301.png" />
      </div>
      <div class="platformImgControl controlLocalDiv">
        <img src="./images/u44297.png" />
        <span>本地控制</span>
      </div>
      <div class="leftBottomLine">
        <img src="./images/u44343.png" />
        <img src="./images/u44337.png" />
      </div>
      <div class="platformImgControl addElecDiv">
        <img src="./images/u44303.png" />
        <span>充电桩</span>
      </div>
      <div class="bottomLine">
        <span>能量交互</span>
        <img src="./images/u44263.png" />
      </div>
      <div class="platformImgControl bigElecDiv">
        <img src="./images/u44295.png" />
        <span>大电网</span>
      </div>
      <div class="rightLine">
        <img src="./images/u44323p000.png" />
        <span>数据交互</span>
      </div>
      <div class="platformImgControl elecMarketDiv">
        <img src="./images/u44289.png" />
        <span>电力市场</span>
      </div>
      <div class="platformImgControl cloudDiv">
        <span>云平台</span>
        <img src="./images/u44291.png" />
      </div>
      <div class="innerLineLeftMiddleTop">
        <img src="./images/u44321p000.png" />
      </div>
      <div class="innerLineLeftMiddlebottom">
        <img src="./images/u44321p000.png" />
      </div>
      <div class="innerLineLeftTop">
        <img src="./images/u44269p000.png" />
      </div>
      <div class="innerLineLeftBottom">
        <img src="./images/u44321p000.png" />
      </div>
      <div class="innerMiddleLine">
        <span>运行指导</span>
        <img src="./images/u44267p000.png" />
      </div>
      <div class="innerRightTopLine">
        <span>市场信息</span>
        <img src="./images/u44265p000.png" />
      </div>
      <div class="innerRightBottomLine">
        <span>调度信息</span>
        <img src="./images/u44271p000.png" />
      </div>
    </div>
    <div class="heightControl"></div>
  </div>
</template>

<script>
export default {
  name: 'platformIntroduction',
  components: {},
  props: {},
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth
    }
  },
  methods: {},
  watch: {},
  mounted () {}
}
</script>

<style scoped>
.platformIntroduction {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 530px;
  min-width: 960px;
}

.platformIntroduction .platformTitle {
  display: inline-block;
  text-align: center;
  width: 100%;
  margin-top: 10px;
}

.platformIntroduction .platformTitle .mainTitle,
.platformIntroduction .platformTitle .subTitle {
  font-weight: 700;
  font-size: 24px;
  color: #666666;
  height: 24px;
  line-height: 24px;
  margin-top: 10px;
}

.platformIntroduction .mainIntro {
  display: inline-block;
  left: 50%;
  position: relative;
  transform: translateX(-50%);
  top: -110px;
  width: 150px;
}

.platformIntroduction .mainIntro .lineImgControl {
  display: inline-block;
  margin-right: 10px;
}

.platformIntroduction .mainIntro .imgIntro {
  font-weight: 400;
  font-size: 14px;
  color: #376d9c;
}

.platformIntroduction .platformMain {
  position: absolute;
  width: 0;
  height: 0;
  left: 50%;
  top: calc(54% - 60px);
}

.platformIntroduction .platformMain .platformImgControl {
  display: inline-block;
  position: absolute;
}

.platformIntroduction .platformMain .platformImgControl span {
  font-weight: 700;
  font-size: 14px;
  color: #005b5b;
  display: inline-block;
}

.platformIntroduction .platformMain .platformImgControl.newPowerDiv {
  top: -132px;
  text-align: center;
  left: -250px;
}

.platformIntroduction .platformMain .platformImgControl.newPowerDiv span {
  width: 100%;
  margin-bottom: 5px;
}

.platformIntroduction .platformMain .platformImgControl.newPowerDiv img {
  transition: all 0.3s;
  width: 60px;
  height: 60px;
}

.platformIntroduction .platformMain .platformImgControl.newPowerDiv img:hover {
  width: 70px;
  height: 70px;
}

.platformIntroduction .platformMain .leftTopLine {
  display: inline-block;
  position: absolute;
  top: -95px;
  width: 140px;
  height: 60px;
  left: -370px;
}

.platformIntroduction .platformMain .leftTopLine img:nth-child(1) {
  position: absolute;
}

.platformIntroduction .platformMain .leftTopLine img:nth-child(2) {
  display: inline-block;
  position: relative;
  top: 15px;
  left: 16px;
}

.platformIntroduction .platformMain .platformImgControl.savePowerDiv {
  left: -420px;
  top: -78px;
}

.platformIntroduction .platformMain .platformImgControl.savePowerDiv span {
  text-align: center;
  width: 100%;
  margin-left: -30px;
}

.platformIntroduction .platformMain .platformImgControl.savePowerDiv img {
  transition: all 0.3s;
  width: 65px;
  height: 65px;
}

.platformIntroduction .platformMain .platformImgControl.savePowerDiv img:hover {
  width: 75px;
  height: 75px;
}

.platformIntroduction .platformMain .leftLine {
  display: inline-block;
  position: absolute;
  top: 0px;
  width: 140px;
  height: 60px;
  left: -425px;
}

.platformIntroduction .platformMain .leftLine img:nth-child(1) {
  position: absolute;
}

.platformIntroduction .platformMain .leftLine img:nth-child(2) {
  display: inline-block;
  position: relative;
  top: 15px;
  left: 20px;
}

.platformIntroduction .platformMain .platformImgControl.controlLoadDiv {
  left: -485px;
  top: 100px;
}

.platformIntroduction .platformMain .platformImgControl.controlLoadDiv img {
  transition: all 0.3s;
  width: 80px;
  height: 65px;
}

.platformIntroduction .platformMain .platformImgControl.controlLoadDiv img:hover {
  width: 90px;
  height: 75px;
}

.platformIntroduction .platformMain .platformImgControl.controlLocalDiv {
  left: -232px;
  top: 30px;
}

.platformIntroduction .platformMain .platformImgControl.controlLocalDiv span {
  display: inline-block;
  width: 100%;
  margin-left: 70px;
  position: relative;
}
.platformIntroduction .platformMain .platformImgControl.controlLocalDiv img {
  transition: all 0.3s;
  width: 60px;
  height: 60px;
}

.platformIntroduction .platformMain .platformImgControl.controlLocalDiv img:hover {
  width: 70px;
  height: 70px;
}

.platformIntroduction .platformMain .leftBottomLine {
  display: inline-block;
  position: absolute;
  top: 170px;
  width: 140px;
  height: 60px;
  left: -380px;
}

.platformIntroduction .platformMain .leftBottomLine img:nth-child(1) {
  position: absolute;
}

.platformIntroduction .platformMain .leftBottomLine img:nth-child(2) {
  display: inline-block;
  position: relative;
  top: -6px;
  left: 24px;
}

.platformIntroduction .platformMain .platformImgControl.addElecDiv {
  left: -248px;
  top: 173px;
  text-align: center;
}

.platformIntroduction .platformMain .platformImgControl.addElecDiv span {
  display: inline-block;
  width: 100%;
  position: relative;
  margin-top: 2px;
}

.platformIntroduction .platformMain .platformImgControl.addElecDiv img {
  transition: all 0.3s;
  width: 90px;
  height: 55px;
}

.platformIntroduction .platformMain .platformImgControl.addElecDiv img:hover {
  width: 100px;
  height: 65px;
}

.platformIntroduction .platformMain .bottomLine {
  display: inline-block;
  position: absolute;
  top: 178px;
  width: 320px;
  height: 16px;
  left: -132px;
  text-align: center;
}

.platformIntroduction .platformMain .bottomLine span {
  font-weight: 400;
  font-size: 14px;
  color: #376d9c;
  line-height: 16px;
}

.platformIntroduction .platformMain .platformImgControl.bigElecDiv {
  left: 180px;
  top: 165px;
  width: 200px;
  height: 90px;
}

.platformIntroduction .platformMain .platformImgControl.bigElecDiv span {
  display: inline-block;
  position: relative;
  height: 100%;
  margin-left: 3px;
  vertical-align: middle;
}
.platformIntroduction .platformMain .platformImgControl.bigElecDiv img {
  transition: all 0.3s;
  width: 126px;
  height: 80px;
}

.platformIntroduction .platformMain .platformImgControl.bigElecDiv img:hover {
  width: 136px;
  height: 90px;
}

.platformIntroduction .platformMain .platformImgControl.elecMarketDiv {
  left: 182px;
  top: -125px;
  width: 200px;
  height: 90px;
}

.platformIntroduction .platformMain .platformImgControl.elecMarketDiv span {
  display: inline-block;
  position: relative;
  height: 100%;
  margin-left: 3px;
  vertical-align: baseline;
}
.platformIntroduction .platformMain .platformImgControl.elecMarketDiv img {
  transition: all 0.3s;
  width: 126px;
  height: 80px;
}

.platformIntroduction .platformMain .platformImgControl.elecMarketDiv img:hover {
  width: 136px;
  height: 90px;
}

.platformIntroduction .platformMain .platformImgControl.cloudDiv {
  left: 0;
  top: 10px;
}

.platformIntroduction .platformMain .platformImgControl.cloudDiv span {
  width: 100%;
  text-align: center;
}
.platformIntroduction .platformMain .platformImgControl.cloudDiv img {
  transition: all 0.3s;
  width: 105px;
  height: 60px;
}

.platformIntroduction .platformMain .platformImgControl.cloudDiv img:hover {
  width: 115px;
  height: 70px;
}

.platformIntroduction .platformMain .rightLine {
  display: inline-block;
  position: absolute;
  top: 45px;
  left: 142px;
  width: 0;
}

.platformIntroduction .platformMain .rightLine span {
  position: relative;
  font-weight: 400;
  font-size: 14px;
  color: #f46042;
  display: inline-block;
  margin-left: 115px;
  margin-top: -50px;
  vertical-align: middle;
  width: 80px;
}

.platformIntroduction .platformMain .rightLine img {
  display: inline-block;
  position: relative;
  transform: rotate(90deg);
}

.platformIntroduction .platformMain .innerLineLeftMiddleTop {
  display: inline-block;
  position: absolute;
  top: 16px;
  left: -354px;
  width: 0;
}

.platformIntroduction .platformMain .innerLineLeftMiddleTop img {
  transform: rotate(198deg);
}

.platformIntroduction .platformMain .innerLineLeftMiddlebottom {
  display: inline-block;
  position: absolute;
  top: 72px;
  left: -348px;
  width: 0;
}

.platformIntroduction .platformMain .innerLineLeftMiddlebottom img {
  transform: rotate(152deg);
}

.platformIntroduction .platformMain .innerLineLeftTop {
  display: inline-block;
  position: absolute;
  top: -12px;
  left: -246px;
  width: 0;
}

.platformIntroduction .platformMain .innerLineLeftTop img {
  transform: rotate(90deg);
  width: 90px;
}

.platformIntroduction .platformMain .innerLineLeftBottom {
  display: inline-block;
  position: absolute;
  top: 122px;
  left: -250px;
  width: 0;
}

.platformIntroduction .platformMain .innerLineLeftBottom img {
  transform: rotate(90deg);
}

.platformIntroduction .platformMain .innerMiddleLine {
  display: inline-block;
  position: absolute;
  top: 48px;
  left: -155px;
  width: 0;
}

.platformIntroduction .platformMain .innerMiddleLine span {
  position: absolute;
  width: 80px;
  display: inline-block;
  margin-left: 42px;
  font-weight: 400;
  font-size: 14px;
  color: #f46042;
  margin-top: -12px;
}

.platformIntroduction .platformMain .innerRightTopLine {
  display: inline-block;
  position: absolute;
  top: -10px;
  left: 78px;
  width: 0;
}

.platformIntroduction .platformMain .innerRightTopLine span {
  position: absolute;
  width: 80px;
  display: inline-block;
  margin-left: 32px;
  font-weight: 400;
  font-size: 14px;
  color: #f46042;
  transform: rotate(-45deg);
  margin-top: -12px;
}

.platformIntroduction .platformMain .innerRightTopLine img {
  transform: rotate(-45deg);
}

.platformIntroduction .platformMain .innerRightBottomLine {
  display: inline-block;
  position: absolute;
  top: 102px;
  left: 78px;
  width: 0;
}

.platformIntroduction .platformMain .innerRightBottomLine span {
  position: absolute;
  width: 80px;
  display: inline-block;
  margin-left: 60px;
  font-weight: 400;
  font-size: 14px;
  color: #f46042;
  transform: rotate(45deg);
}

.platformIntroduction .platformMain .innerRightBottomLine img {
  transform: rotate(45deg);
}
</style>
