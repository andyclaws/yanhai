<template>
  <div class="medicalGroupDetail-container" style="position:relative">
    <!-- 点击放大镜显示框 -->
    <Card class="search" :class="[isShow ? '' : 'searchHeight0']">
      <div class="searchBox1">
        <span>业主名称</span>
        <i-select v-model="searchUserNo" style="width:150px" @on-change="getUnitList">
          <i-option
            v-for="(divideInfos,index) in searchList"
            :key="index"
            :value="divideInfos.ownerNo"
          >{{ divideInfos.ownerName }}</i-option>
        </i-select>
      </div>
      <div class="searchBox2">
        <span>机组名称</span>
        <i-select v-model="searchUnitNo" style="width:150px">
          <i-option
            v-for="(item,index) in searchUnitList"
            :key="index"
            :value="item.unitNo"
          >{{ item.unitName }}</i-option>
        </i-select>
      </div>
      <i-button class="searchButton" @click="showDetailsBtn">查询</i-button>
    </Card>
    <div class="machineDetails" id="machineDetails">
      <Row class="row">
        <i-col span="7" class="col1">
          <!-- 机组明细信息 -->
          <Card class="machine-leftOne">
            <p slot="title" class="machine-leftOne-header">机组明细信息</p>
            <!-- 基本信息 -->
            <div class="machine-leftOne-top">
              <div class="title">基本信息</div>
              <div style="display:flex">
                <div>
                  <p class="line1">
                    <span class="span1">名称:</span>
                    <span class="span2">{{baseInfo.unitName}}</span>
                  </p>
                  <p class="line1">
                    <span class="span1">所属业主:</span>
                    <span class="span2">{{baseInfo.ownerName}}</span>
                  </p>
                  <p class="line1">
                    <span class="span1">所属线路:</span>
                    <span class="span2">{{baseInfo.lineName}}</span>
                  </p>
                  <p class="line1">
                    <span class="span1">所属线路编号:</span>
                    <span class="span2">{{baseInfo.ownerNo}}</span>
                  </p>
                  <p class="line1">
                    <span class="span1">联系电话:</span>
                    <span class="span2">{{baseInfo.phoneNumber}}</span>
                  </p>
                </div>
                <div>
                  <p class="line1">
                    <span class="span3">编号:</span>
                    <span class="span4">{{baseInfo.unitNo}}</span>
                  </p>
                  <p class="line1">
                    <span class="span3">因子数:</span>
                    <span class="span4">{{baseInfo.subdeviceCnt}}</span>
                  </p>
                  <p class="line1">
                    <span class="span3">机组性质:</span>
                    <span class="span4">{{baseInfo.unitAttr}}</span>
                  </p>
                  <p class="line1">
                    <span class="span1">名称:</span>
                    <span class="span2">{{baseInfo.unitName}}</span>
                  </p>
                  <p class="line1">
                    <span class="span3">联系人:</span>
                    <span class="span4">{{baseInfo.contactName}}</span>
                  </p>
                </div>
              </div>
              <p class="line1" style="width:270px">
                <span class="span1">地址:</span>
                <span class="span2">{{baseInfo.regionId}}</span>
              </p>
              <p class="line1" style="width:270px">
                <span class="span1">接入时间:</span>
                <span class="span2">{{baseInfo.accessTime}}</span>
              </p>
            </div>
            <!-- 运行信息 -->
            <div class="machine-leftOne-bottom">
              <div class="machine-leftOne-bottom-left">运行信息</div>
              <div class="machine-leftOne-bottom-right">
                <span>运行状态:</span>
                <span>{{runInfo.isOnline}}</span>
              </div>
              <div style="display:flex">
                <div>
                  <p class="line1">
                    <span class="span1">可上调裕度:</span>
                    <span class="span2">{{runInfo.adjDownlimit}}</span>
                  </p>
                  <p class="line1">
                    <span class="span1">可下调裕度:</span>
                    <span class="span2">{{runInfo.adjUplimit}}</span>
                  </p>
                  <p class="line1">
                    <span class="span3">爬坡率:</span>
                    <span class="span4">{{runInfo.climbRate}}</span>
                  </p>
                  <p class="line1">
                    <span class="span1">累计参与发电次数:</span>
                    <span class="span2">{{runInfo.genCntAll}}</span>
                  </p>
                  <p class="line1">
                    <span class="span1">累计完成发电次数:</span>
                    <span class="span2">{{runInfo.genCntFinishAll}}</span>
                  </p>
                </div>
                <div>
                  <p class="line1">
                    <span class="span3">警告数:</span>
                    <span class="span4">{{runInfo.alarmNumber}}</span>
                  </p>
                  <p class="line1">
                    <span class="span3">今日发电:</span>
                    <span class="span4">{{runInfo.genCap}}</span>
                  </p>
                  <p class="line1">
                    <span class="span3">实时负荷:</span>
                    <span class="span4">{{runInfo.prt}}</span>
                  </p>

                  <p class="line1">
                    <span class="span3">累计发电:</span>&nbsp;
                    <span class="span4">{{runInfo.genCapAll}}kWh</span>
                  </p>
                  <p class="line1">
                    <span class="span3">累计结算:</span>&nbsp;
                    <span class="span4">{{runInfo.settleAll}}元</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
          <!-- 因子分解 -->
          <Factorization :pieData="pieData" />
        </i-col>
        <i-col span="10" class="col2">
          <!-- 逻辑图 -->
          <Card class="machine-centerTop">
            <p slot="title" class="title">逻辑图</p>
            <div class="logic-img-box">
              <div class="line-name">{{baseInfo.lineName}}</div>
              <div class="line_img_1">
                <img class="img1" src="./images/u5477.png" alt />
                <img class="img2" src="./images/u5376.png" alt />
              </div>
              <div class="transformer-img">
                <img src="./images/u5438.png" alt />
                <div>变压器</div>
              </div>
              <div class="line_img_2">
                <img class="img1" src="./images/u5477.png" alt />
                <img class="img2" src="./images/u5378.png" alt />
              </div>
              <div class="line_img_3">
                <img class="img1" src="./images/u5473.png" alt />
                <img class="img2" src="./images/u5390.png" alt />
              </div>
              <div
                class="outlet-cabinet-img"
                v-on:mouseenter="showCabinetTipDetails"
                v-on:mouseleave="hideCabinetTipDetails"
              >
                <img src="./images/u5443.png" alt />
                <p>出线柜</p>
              </div>
              <div class="line_img_4">
                <img class="img1" src="./images/u5473.png" alt />
                <img class="img2" src="./images/u5380.png" alt />
              </div>
              <div class="line_img_5">
                <img class="img1" src="./images/u5382.png" alt />
              </div>
              <div class="line_img_6">
                <img class="img1" src="./images/u5473.png" alt />
                <img class="img2" src="./images/u5384.png" alt />
              </div>
              <div class="line_img_6 line_same1">
                <img class="img1" src="./images/u5473.png" alt />
                <img class="img2" src="./images/u5384.png" alt />
              </div>
              <div class="line_img_6 line_same2">
                <img class="img1" src="./images/u5473.png" alt />
                <img class="img2" src="./images/u5384.png" alt />
              </div>
              <div class="line_img_6 line_same3">
                <img class="img1" src="./images/u5473.png" alt />
                <img class="img2" src="./images/u5384.png" alt />
              </div>
              <div
                class="line_img_7"
                v-on:mouseenter="showAirTipDetails"
                v-on:mouseleave="hideAirTipDetails"
                @click="goToAircondition"
              >
                <img class="img1" src="./images/u5452.png" alt />
                <p class="air">空调风机</p>
              </div>
              <div class="line_img_7 air_img1" @click="goToAircondition">
                <img class="img1" src="./images/u5452.png" alt />
                <p class="air">空调风机</p>
              </div>
              <div class="line_img_7 air_img2" @click="goToAircondition">
                <img class="img1" src="./images/u5452.png" alt />
                <p class="air">空调风机</p>
              </div>
              <div
                class="line_img_7 air_img3"
                v-on:mouseenter="showFanTipDetails"
                v-on:mouseleave="hideFanTipDetails"
                @click="goToAircondition"
              >
                <p>. . . . . .</p>
              </div>
              <div class="power-plant-img">
                <img class="img1" src="./images/u5456.png" alt />
                <p>虚拟电厂</p>
              </div>
              <div class="virtual-unit-img">
                <img class="img1" src="./images/u5445.png" alt />
                <p>虚拟机组</p>
              </div>
              <div class="virtual-unit-img vu-img">
                <img class="img1" src="./images/u5445.png" alt />
                <p>虚拟机组</p>
              </div>
              <div class="control-terminal-img ct-img">
                <img src="./images/u5447.png" alt />
                <p>控制终端</p>
              </div>
              <div class="control-terminal-img">
                <img src="./images/u5447.png" alt />
                <p>控制终端</p>
              </div>
              <div class="line_img_8">
                <img class="img1" src="./images/u5479.png" alt />
                <img class="img2" src="./images/u5416.png" alt />
              </div>
              <div class="line_img_8 img_8">
                <img class="img1" src="./images/u5479.png" alt />
                <img class="img2" src="./images/u5416.png" alt />
              </div>
              <div class="line_img_9">
                <img class="img1" src="./images/u5392.png" alt />
              </div>
              <div class="line_img_10">
                <img class="img1" src="./images/u5394.png" alt />
              </div>
              <div class="line_img_11">
                <img class="img1" src="./images/u5479.png" alt />
                <img class="img2" src="./images/u5396.png" alt />
              </div>
              <div class="line_img_11 img_11">
                <img class="img1" src="./images/u5479.png" alt />
                <img class="img2" src="./images/u5396.png" alt />
              </div>
              <div class="line_img_12">
                <img class="img1" src="./images/u5410.png" alt />
              </div>
              <div class="line_img_13">
                <img class="img1" src="./images/u5408.png" alt />
              </div>
              <div class="line_img_14">
                <img class="img1" src="./images/u5475.png" alt />
                <img class="img2" src="./images/u5404.png" alt />
              </div>
              <div class="line_img_15">
                <img class="img1" src="./images/u5479.png" alt />
                <img class="img2" src="./images/u5402.png" alt />
              </div>
              <div class="line_img_16">
                <img class="img1" src="./images/u5475.png" alt />
                <img class="img2" src="./images/u5406.png" alt />
              </div>
              <div class="line_img_17">
                <img class="img1" src="./images/u5479.png" alt />
                <img class="img2" src="./images/u5400.png" alt />
              </div>
              <div class="line_img_17 img_17">
                <img class="img1" src="./images/u5479.png" alt />
                <img class="img2" src="./images/u5400.png" alt />
              </div>
              <div class="line_img_18">
                <img class="img1" src="./images/u5414.png" alt />
              </div>
              <div class="line_img_19">
                <img class="img1" src="./images/u5479.png" alt />
                <img class="img2" src="./images/u5412.png" alt />
              </div>
              <div class="tag-div">
                <div>
                  <img src="./images/u5277.png" alt />
                  <span>能量流</span>
                </div>
                <div>
                  <img src="./images/u5279.png" alt />
                  <span>信息流</span>
                </div>
              </div>
              <!-- <div class="air-tool-tip" v-if="showAirToolTip">
                <div class="air-tip-title">【饮水机】</div>
                <div>
                  <P>
                    la：
                    <span>17.2A</span>
                  </P>
                  <P>
                    Uab：
                    <span>403V</span>
                  </P>
                </div>
                <div>
                  <P>
                    lb：
                    <span>17.2A</span>
                  </P>
                  <P>
                    Uab：
                    <span>403V</span>
                  </P>
                </div>
                <div>
                  <P>
                    lc：
                    <span>17.2A</span>
                  </P>
                  <P>
                    Ubc：
                    <span>401V</span>
                  </P>
                </div>
                <div>
                  <P>
                    P：
                    <span>13kW</span>
                  </P>
                  <P>
                    Ta：
                    <span>42.3C</span>
                  </P>
                </div>
                <div>
                  <P>
                    Q：
                    <span>9kvar</span>
                  </P>
                  <P>
                    Tb：
                    <span>42.1C</span>
                  </P>
                </div>
                <div>
                  <P>
                    S：
                    <span>13kVA</span>
                  </P>
                  <P>
                    Tc：
                    <span>42.0C</span>
                  </P>
                </div>
              </div>-->
              <!-- <div class="fan-tool-tip" v-if="showFanToolTip">
                <div class="fan-tip-title">【空调风机】</div>
                <div>
                  风机回风温度：
                  <span>25.2℃</span>
                </div>
                <div>
                  风机回风湿度：
                  <span>60.6%</span>
                </div>
                <div>
                  风机送风动压：
                  <span>166.9Pa</span>
                </div>
                <div>
                  风机送风温度：
                  <span>25.2℃</span>
                </div>
                <div>
                  风机回风湿度：
                  <span>25.2℃</span>
                </div>
              </div>-->
              <!-- <div class="outlet-cabinet-tool-tip" v-if="showCabinetToolTip">
                <div class="cabinet-tip-title">【出线柜】</div>
                <div>
                  <P>
                    la：
                    <span>17.2A</span>
                  </P>
                  <P>
                    Uab：
                    <span>403V</span>
                  </P>
                </div>
                <div>
                  <P>
                    lb：
                    <span>17.2A</span>
                  </P>
                  <P>
                    Uab：
                    <span>403V</span>
                  </P>
                </div>
                <div>
                  <P>
                    lc：
                    <span>17.2A</span>
                  </P>
                  <P>
                    Ubc：
                    <span>401V</span>
                  </P>
                </div>
                <div>
                  <P>
                    P：
                    <span>13kW</span>
                  </P>
                  <P>
                    Ta：
                    <span>42.3C</span>
                  </P>
                </div>
                <div>
                  <P>
                    Q：
                    <span>9kvar</span>
                  </P>
                  <P>
                    Tb：
                    <span>42.1C</span>
                  </P>
                </div>
                <div>
                  <P>
                    S：
                    <span>13kVA</span>
                  </P>
                  <P>
                    Tc：
                    <span>42.0C</span>
                  </P>
                </div>
              </div>-->
            </div>
          </Card>
          <!-- 因子信息 -->
          <Card class="machine-centerBottom">
            <p slot="title" class="title">因子信息</p>
            <!-- <div v-for="(divide, index) in divideInfos" :key="index"> -->
            <div class="divideInfo">
              <Card class="infoBody">
                <div class="infoStatus">
                  <span>运行状态：</span>
                  <span class="divideOnlineStatus">{{divideInfos.airCondition}}</span>
                  <!-- <span class="divideOutlineStatus" v-if="divide.airCondition ==='0'">离线</span> -->
                </div>
                <Row :gutter="6" class="divideRowControl">
                  <i-col span="8" class="divideIcolControl">
                    <div class="divideImgControl innerMachineCounts" style="cursor:pointer;" @click="goToAircondition">
                      <img src="@/assets/images/machine/u2719.png" />
                    </div>
                    <div class="imgBottomSpan">内机数量</div>
                    <div class="imgBottomCount">{{divideInfos.neiJiShuLiang}}</div>
                  </i-col>
                  <i-col span="8" class="divideIcolControl">
                    <div class="divideImgControl expCounts">
                      <img src="@/assets/images/machine/u2712.png" />
                    </div>
                    <div class="imgBottomSpan">异常数量</div>
                    <div class="imgBottomCount">{{divideInfos.expectCnt}}</div>
                  </i-col>
                  <i-col span="8" class="divideIcolControl">
                    <div class="divideImgControl runDevice">
                      <img src="@/assets/images/machine/u2726.png" />
                    </div>
                    <div class="imgBottomSpan">运行数量</div>
                    <div class="imgBottomCount">{{divideInfos.runCnt}}</div>
                  </i-col>
                </Row>
                <div class="divideLineImg">
                  <img src="@/assets/images/machine/u2728.png" />
                </div>
                <Row :gutter="25">
                  <i-col span="2">
                    <span>&nbsp;</span>
                  </i-col>
                  <i-col span="11">
                    <span class="infoText">实时功率:&nbsp;</span>
                    <span class="infoValue">{{divideInfos.realTimePower}}kW</span>
                  </i-col>
                  <i-col span="11">
                    <span class="infoText">今日发电量:&nbsp;</span>
                    <span class="infoValue">{{divideInfos.genCap}}kWh</span>
                  </i-col>
                </Row>
                <Row :gutter="25">
                  <i-col span="2">
                    <span>&nbsp;</span>
                  </i-col>
                  <i-col span="11">
                    <span class="infoText">累计发电次数:&nbsp;</span>
                    <span class="infoValue">{{divideInfos.genCntAll}}次</span>
                  </i-col>
                  <i-col span="11">
                    <span class="infoText">累计发电量:&nbsp;</span>
                    <span class="infoValue">{{divideInfos.genCapAll}}kWh</span>
                  </i-col>
                </Row>
              </Card>
            </div>
            <!-- </div> -->
            <div class="tableChoosBtn">
              <div>空调</div>
              <!-- <div
                @click="changeDivideChoose('0')"
                :class="['divideChooseBtn', isDivideChoose === '0' ? 'isDivideActive' :'']"
              >空调风机</div>
              <div
                @click="changeDivideChoose('1')"
                :class="['divideChooseBtn', isDivideChoose === '1' ? 'isDivideActive' :'']"
              >饮水机</div>-->
            </div>
          </Card>
        </i-col>
        <i-col span="7" class="col3">
          <!-- 当前执行计划 -->
          <Card class="machine-leftTwo">
            <p slot="title" class="title">当前执行计划</p>
            <p class="line1">
              <span class="span1">正在执行：</span>&nbsp;
              <span class="span2">{{unitCurrentExecutionInfo.planName}}</span>
            </p>
            <p class="line1">
              <span class="span1">执行开始时间：</span>&nbsp;
              <span class="span2">{{unitCurrentExecutionInfo.planStartDate}}</span>
            </p>
            <p class="line1">
              <span class="span1">执行结束时间：</span>&nbsp;
              <span class="span2">{{unitCurrentExecutionInfo.planEndDate}}</span>
            </p>
            <p class="line1">
              <span class="span1">目标值：</span>&nbsp;
              <span class="span2">{{unitCurrentExecutionInfo.unitPlanValue}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="span3">已执行：</span>&nbsp;
              <span class="span4">{{unitCurrentExecutionInfo.unitActualValue}}</span>
            </p>
          </Card>
          <!-- 实时负荷曲线 -->
          <RealTimeLoad :curveDatas="curveDatas" />
          <!-- 今年历史发电量 -->
          <ThisYearHistory :monthData="monthData" />
        </i-col>
      </Row>

      <!-- 放大镜 -->
      <div class="glass" @click="btn">
        <img src="@/assets/images/machine/u3123.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
// import '@/view/fictitiousPowerPlant/machineDetails/machineDetails.less'
import RealTimeLoad from './realTimeLoad.vue'
import ThisYearHistory from './thisYearHistory'
import Factorization from './factorization.vue'
import axios from '@/libs/api.request'
export default {
  name: 'machineDetails',
  components: {
    RealTimeLoad,
    ThisYearHistory,
    Factorization,
    axios
  },
  props: [],
  data () {
    return {
      ownerName: '',
      unitName: '',
      curveDatas: {},
      pieData: [],
      monthData: [],
      isDivideChoose: '0',
      searchUserNo: '',
      searchUnitList: [],
      searchUnitNo: '',
      // 基本信息
      baseInfo: {
        unitName: '',
        ownerName: '',
        lineName: '',
        ownerNo: '',
        phoneNumber: '',
        regionId: '',
        accessTime: '',
        unitNo: '',
        subdeviceCnt: '',
        unitAttr: '',
        unitName: '',
        contactName: ''
      },
      // 运行信息
      runInfo: {
        isOnline: '',
        adjDownlimit: 0,
        adjUplimit: 0,
        climbRate: 0,
        genCntAll: 0,
        genCntFinishAll: 0,
        alarmNumber: 0,
        genCap: 0,
        prt: 0,
        genCapAll: 0,
        settleAll: 0
      },
      // 当前执行计划
      unitCurrentExecutionInfo: {
        planName: '',
        planStartDate: '',
        planEndDate: '',
        unitPlanValue: '',
        unitActualValue: ''
      },
      // 因子信息
      divideInfos: {
        airCondition: '', // 运行状态
        neiJiShuLiang: '', // 内机数量
        expectCnt: '', // 异常数量
        realTimePower: '', // 实时功率
        runCnt: '', // 运行数量
        genCap: '', // 今日发电量
        genCntAll: '', // 累计发电量
        genCapAll: '' // 累计发电次数
      },

      isShow: false,
      sel: 1,
      searchList: [],
      showAirToolTip: false,
      showFanToolTip: false,
      showCabinetToolTip: false,
      unitNo: '',
      divideList1: [],
      divideList2: []
    }
  },
  mounted () {
    let query = this.$route.query
    this.unitNo = query.unitNo
    this.getOwnerList()
    this.getUnitDetailsData() // 基本信息
    this.getUnitRunInfoData() // 运行信息
    this.getUnitCurrentExecutionData() // 当前执行计划
    this.getUnitEquipmentFactorInfoData() // 因子信息
    this.getFactorizationData() // 因子分解
    this.getThisYearHistoryData() // 当月历史发电量
    this.getRealTimeLoadData()
    // this.changeDivideChoose("0");
    let name = this.$route.query.name
  },
  methods: {
    getOwnerList () {
      var _this = this
      let data = {}
      axios
        .request({
          method: 'post',
          data: data,
          url: 'rlc/getOwnerList'
        })
        .then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            _this.searchList = res.data.data
          }
        })
    },
    getUnitList () {
      var _this = this
      let data = _this.searchUserNo
      axios
        .request({
          method: 'post',
          data: data,
          url: 'rlc/getUnitList'
        })
        .then(res => {
          if (res.data.code === 200) {
            _this.searchUnitList = res.data.data
          }
        })
    },
    // 基本信息
    getUnitDetailsData () {
      var _this = this
      let data = { unitNo: _this.unitNo }
      axios
        .request({
          method: 'post',
          data: data,
          url: 'rlc/unitDetails'
        })
        .then(res => {
          if (res.data.code === 200) {
            _this.baseInfo = res.data.data
          }
        })
    },
    // 运行信息
    getUnitRunInfoData () {
      var _this = this
      let data = { unitNo: _this.unitNo }
      axios
        .request({
          method: 'post',
          data: data,
          url: 'rlc/unitRunInfo'
        })
        .then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            _this.runInfo = res.data.data
            if (_this.runInfo.isOnline === '01') {
              _this.runInfo.isOnline = '在线'
            } else {
              _this.runInfo.isOnline = '离线'
            }
          }
        })
    },
    // 当前执行计划
    getUnitCurrentExecutionData () {
      var _this = this
      let data = { unitNo: _this.unitNo }
      axios
        .request({
          method: 'post',
          data: data,
          url: 'rlc/unitCurrentExecutionPlan'
        })
        .then(res => {
          // console.log(res);
          if (res.data.code === 200 && res.data !== null) {
            _this.unitCurrentExecutionInfo = res.data.data
          }
        })
    },
    // 因子信息
    getUnitEquipmentFactorInfoData () {
      var _this = this
      let data = { unitNo: _this.unitNo }
      axios
        .request({
          method: 'post',
          data: data,
          url: 'rlc/unitEquipmentFactorInfo'
        })
        .then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            _this.divideInfos = res.data.data
            if (_this.divideInfos.airCondition === '01') {
              _this.divideInfos.airCondition = '在线'
            } else {
              _this.divideInfos.airCondition = '离线'
            }
            // _this.divideList1 = [];
            // _this.divideList2 = [];
            // let list1 = {};
            // list1.airCondition = res.data.data[0].airCondition;
            // list1.neiJiShuLiang = res.data.data[0].neiJiShuLiang;
            // list1.expectCnt = res.data.data[0].expectCnt;
            // list1.realTimePower = res.data.data[0].realTimePower;
            // list1.genCap = res.data.data[0].genCap;
            // list1.genCntAll = res.data.data[0].genCntAll;
            // list1.genCapAll = res.data.data[0].genCapAll;
            // _this.divideList1.push(list1);

            // let list2 = {};
            // list2.airCondition = res.data.data[0].airCondition;
            // list2.neiJiShuLiang = res.data.data[0].neiJiShuLiang;
            // list2.expectCnt = res.data.data[0].expectCnt;
            // list2.realTimePower = res.data.data[0].realTimePower;
            // list2.genCap = res.data.data[0].genCap;
            // list2.genCntAll = res.data.data[0].genCntAll;
            // list2.genCapAll = res.data.data[0].genCapAll;
            // _this.divideList2.push(list2);
            // console.log(_this.divideList1, _this.divideList2);
          }
          // _this.changeDivideChoose("0");
        })
    },
    // 因子分解
    getFactorizationData () {
      var _this = this
      let data = { unitNo: _this.unitNo }
      axios
        .request({
          method: 'post',
          data: data,
          url: 'rlc/factorization'
        })
        .then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            _this.pieData = res.data.data
          }
        })
    },
    // 当月历史发电量
    getThisYearHistoryData () {
      var _this = this
      let data = { unitNo: _this.unitNo }
      axios
        .request({
          method: 'post',
          data: data,
          url: 'rlc/unitHistoricalExecutionPlan'
        })
        .then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            _this.monthData = res.data.data
            // console.log(_this.monthData);
          }
        })
    },
    // 实时负荷曲线
    getRealTimeLoadData () {
      var _this = this
      let data = { unitNo: _this.unitNo }
      axios
        .request({
          method: 'post',
          data: data,
          url: 'rlc/realTimeLoadResp'
        })
        .then(res => {
          // console.log(res);
          if (
            res.data.code === 200 &&
            res.data.actualValue !== null &&
            res.data.predictedValue !== null
          ) {
            _this.curveDatas = res.data.data
            // console.log(_this.curveDatas);
          }
        })
    },
    // 空调页面跳转
    goToAircondition () {
      let _this = this
      this.$router.push({
        name: 'airConditioningDetail',
        query: {
          unitNo: _this.unitNo
        }
      })
    },
    showAirTipDetails () {
      this.showAirToolTip = true
    },
    hideAirTipDetails () {
      this.showAirToolTip = false
    },
    showCabinetTipDetails () {
      this.showCabinetToolTip = true
    },
    hideCabinetTipDetails () {
      this.showCabinetToolTip = false
    },
    showFanTipDetails () {
      this.showFanToolTip = true
    },
    hideFanTipDetails () {
      this.showFanToolTip = false
    },
    btn () {
      this.isShow = !this.isShow
    },
    select (divideInfos) {
      this.sel = divideInfos.id
    },
    // changeDivideChoose(model) {
    //   let _this = this;
    //   console.log(_this.divideList1);
    //   this.isDivideChoose = model;
    //   if (model === "1") {
    //     _this.divideInfos = _this.divideList1;
    //     console.log(_this.divideInfos);
    //   } else {
    //     _this.divideInfos = _this.divideList2;
    //   }
    // },
    // 查询按钮
    showDetailsBtn () {
      this.unitNo = this.searchUnitNo
      console.log(this.unitNo)
      this.getUnitDetailsData() // 基本信息
      this.getUnitRunInfoData() // 运行信息
      this.getUnitCurrentExecutionData() // 当前执行计划
      this.getUnitEquipmentFactorInfoData() // 因子信息
      this.getFactorizationData() // 因子分解
      this.getThisYearHistoryData() // 当月历史发电量
      this.getRealTimeLoadData() // 实时负荷曲线
      this.isShow = !this.isShow
    }
  },
  watch: {
    $route (newRoute) {
      let _this = this
      const { name, query, params, meta } = newRoute
      console.log(query)
      _this.unitNo = query.unitNo
    }
  }
}
</script>

<style lang="less">
@import "machineDetails.less";
.select.active {
  background: #009999;
  color: #ffffff;
}
.tableBarActive {
  background: #009999;
  color: #ffffff;
}

.medicalGroupDetail-container .machine-centerBottom .ivu-card-body {
  padding: 0;
}

.medicalGroupDetail-container .divideInfo {
  height: 250px;
  padding: 20px 10px 0 10px;
}

.medicalGroupDetail-container .divideInfo .ivu-card-body {
  background-color: #fcfcfc;
  position: relative;
}

.medicalGroupDetail-container .divideInfo .infoBody {
  background-color: rgba(255, 255, 255, 0);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(228, 228, 228, 1);
  border-radius: 4px;
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 20px 20px 10px 20px;
  height: 90%;
}

.medicalGroupDetail-container .divideInfo .infoBody .divideRowControl {
  margin-top: 5px;
}

.medicalGroupDetail-container .divideInfo .infoBody span {
  font-weight: 400;
  font-size: 13px;
  line-height: 28px;
  color: #666666;
}

.medicalGroupDetail-container .divideInfo .infoBody .infoTitle {
  display: inline-block;
  position: absolute;
  top: -10px;
  font-weight: 700;
  font-size: 13px;
  color: #009999;
  z-index: 10;
  background-color: #fcfcfc;
  left: 15px;
  cursor: pointer;
}

.medicalGroupDetail-container .divideInfo .infoBody .infoStatus {
  display: inline-block;
  position: absolute;
  top: -40px;
  font-weight: 700;
  font-size: 13px;
  color: #009999;
  z-index: 10;
  background-color: #fcfcfc;
  right: 15px;
}

.medicalGroupDetail-container
  .divideInfo
  .infoBody
  .infoStatus
  .divideOnlineStatus {
  color: #21a5a7;
}

.medicalGroupDetail-container
  .divideInfo
  .infoBody
  .infoStatus
  .divideOutlineStatus {
  color: #d68381;
}

.medicalGroupDetail-container .divideInfo .infoBody .divideIcolControl {
  text-align: center;
}

.medicalGroupDetail-container
  .divideInfo
  .infoBody
  .divideIcolControl
  .divideImgControl {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  text-align: center;
}

.medicalGroupDetail-container
  .divideInfo
  .infoBody
  .divideIcolControl
  .divideImgControl.innerMachineCounts {
  background-color: rgba(7, 219, 138, 1);
}

.medicalGroupDetail-container
  .divideInfo
  .infoBody
  .divideIcolControl
  .divideImgControl.expCounts {
  background-color: #ff9933;
}

.medicalGroupDetail-container
  .divideInfo
  .infoBody
  .divideIcolControl
  .divideImgControl.runDevice {
  background-color: #08cdfe;
}

.medicalGroupDetail-container
  .divideInfo
  .infoBody
  .divideIcolControl
  .divideImgControl
  img {
  width: 18px;
  margin-top: 7px;
}

.medicalGroupDetail-container .divideInfo .infoBody .divideLineImg {
  position: relative;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 5px;
}

.medicalGroupDetail-container .divideInfo .infoBody .divideLineImg img {
  width: 100%;
}

.medicalGroupDetail-container .divideInfo .infoBody .infoValue {
  color: #009999;
}

.medicalGroupDetail-container
  .left.ivu-carousel-arrow.ivu-carousel-arrow-always {
  left: 2px;
}

.medicalGroupDetail-container
  .right.ivu-carousel-arrow.ivu-carousel-arrow-always {
  right: 3px;
}

.medicalGroupDetail-container .tableChoosBtn {
  display: inline-block;
  position: absolute;
  top: 12px;
  width: 60px;
  right: 25px;
  text-align: center;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background: #009999;
  color: #ffffff;
}

.medicalGroupDetail-container .tableChoosBtn .divideChooseBtn {
  display: inline-block;
  width: 75px;
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  color: #009999;
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
}

.medicalGroupDetail-container .tableChoosBtn .divideChooseBtn:nth-child(1) {
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
}

.medicalGroupDetail-container .tableChoosBtn .divideChooseBtn:nth-child(2) {
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
}

.medicalGroupDetail-container .tableChoosBtn .divideChooseBtn.isDivideActive {
  background-color: #009999;
  color: #fcfcfc;
}
</style>
