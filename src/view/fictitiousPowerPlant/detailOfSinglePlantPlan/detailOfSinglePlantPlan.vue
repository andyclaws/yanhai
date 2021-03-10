<template>
  <div class="detailOfSinglePlantPlan" style="position: relative" id="detailOfSinglePlantPlan">
    <!--事件列表 -->
    <div class="detailOfSinglePlantPlan-clickBar" @click="navbarClick">
      <Icon type="ios-arrow-back" size="25" color="#fff" v-show="!isShow" class="leftIcon"></Icon>
      <Icon type="ios-arrow-forward" size="25" color="#fff" v-show="isShow" class="rightIcon"></Icon>
    </div>
    <Card class="detailOfSinglePlantPlan-left" ref="navbar" :class="{'active':!isShow}">
      <div slot="title" class="header">
        <img src="../historyPowerGenerationEvent/images/u2269.png" />
        <p>事件列表</p>
      </div>
      <i-input
        placeholder="请输入关键字"
        class="ipt"
        v-model="issue_content"
        @on-change="inputFunc"
      ></i-input>
      <img src="@/assets/images/machine/u3123.png" class="img" />
      <div class="navbar">
        <h5>事件名称</h5>
        <div class="line">
          <ul v-for="(item,index) in line" :key="index" @click="lineClick(item,index)" >
            <div class="radio" :class="{isBackgroundcolor:currentIndex===index}"></div>
            <li :class="{isColor:currentIndex===index}">{{item.planName}}</li>
          </ul>
        </div>
      </div>
    </Card>

    <!--事件详情 -->
    <Card class="palneDetails" :class="{'isactive':!isActive}">
      <div slot="title" class="header">
        <img src="../historyPowerGenerationEvent/images/u2269.png" />
        <p>事件详情</p>
      </div>
      <!-- 详细信息 -->
      <div class="detaiInformation">
        <h3>|||&nbsp;详情信息</h3>
        <p>
          <span>事件名称：</span>
          <span>{{detailInformationData.eventName}}</span>
        </p>
        <p>
          <span>日期：</span>
          <span>{{detailInformationData.planDate}}</span>
        </p>
        <p>
          <span>时间：</span>
          <span>{{detailInformationData.planTime}}</span>
        </p>
        <p>
          <span>目标值：</span>
          <span>{{detailInformationData.targetValue}}</span>
        </p>
        <p>
          <span>实际值：</span>
          <span>{{detailInformationData.finishValue}}</span>
        </p>
        <p>
          <span>响应方式：</span>
          <span>{{detailInformationData.responceRate}}</span>
        </p>
        <p>
          <span>参与机组：</span>
          <span>{{detailInformationData.participatingUnit}}</span>
        </p>
        <p>
          <span>完成率：</span>
          <span>{{detailInformationData.finishRate}}</span>
        </p>
        <p>
          <span>爬坡率：</span>
          <span>{{detailInformationData.climbRate}}</span>
        </p>
      </div>
      <!-- 发电事件执行监测 -->
      <GenerationPlanExecutionTest
        :GenerationPlanExecutionTestData="GenerationPlanExecutionTestData"
      />
      <!-- 价格信息 -->
      <PriceMessage />
      <!-- 发电事件执行统计 -->
      <div class="generatingPlanExecutionStatistics">
        <h3>|||&nbsp;发电事件执行统计</h3>
        <div class="generatingPlan-box">
          <span @click="btn1" :class="{activeTwo:isActive1}">统计</span>
          <span @click="btn2" :class="{activeTwo:!isActive1}">详情</span>
        </div>
        <!-- 统计 -->
        <div class="formPage" v-show="!isShow1">
          <Tables
            border
            stripe
            height="240"
            ref="gengeratingPlan"
            :columns="formPageColumns"
            v-model="formPageData"
            :loading="loading"
            @on-load-data="onProtectLoadData"
          ></Tables>
        </div>
        <!-- 详情 -->
        <GeneratingPlanEchart v-show="isShow1" :GeneratingPlanEchartData="GeneratingPlanEchartData" />
      </div>
    </Card>
  </div>
</template>

<script>
import GenerationPlanExecutionTest from './generationPlanExecutionTest.vue'
import PriceMessage from './priceMessage.vue'
import GeneratingPlanEchart from './generatingPlanEchart.vue'
import axios from '@/libs/api.request'
import Tables from '_c/tables'
export default {
  name: 'detailOfSinglePlantPlan',
  components: {
    GenerationPlanExecutionTest,
    PriceMessage,
    GeneratingPlanEchart,
    axios,
    Tables
  },
  props: {},
  data () {
    return {
      issue_content: '',
      serch_result_issue: false,
      GenerationPlanExecutionTestData: {},
      GeneratingPlanEchartData: [],
      loading: false,
      isActive1: true,
      isShow1: true,
      isShow: true,
      isActive: true,
      currentIndex: '',
      eventNo: '',
      planName: '',
      line: [],
      list: [],
      detailInformationData: {
        eventName: '',
        planDate: '',
        planTime: '',
        targetValue: '',
        finishValue: '',
        responceRate: '',
        participatingUnit: '',
        finishRate: '',
        climbRate: ''
      },
      formPageColumns: [
        {
          title: '序号',
          type: 'index',
          key: 'serialNumber',
          align: 'center',
          width: '70'
        },
        {
          title: '机组名称',
          key: 'unitName',
          align: 'center',
          width: '110'
        },
        {
          title: '目标值(kW)',
          key: 'targetValue',
          align: 'center',
          width: '110'
        },
        {
          title: '实际值(kW)',
          key: 'finishValue',
          align: 'center',
          width: '110'
        },
        {
          title: '持续时间(s)',
          key: 'time',
          align: 'center',
          width: '110'
        },
        {
          title: '完成率(%)',
          key: 'finishRate',
          align: 'center',
          width: '100'
        },
        {
          title: '虚拟发电量(kWh)',
          key: 'virPq',
          align: 'center',
          width: '160'
        },
        {
          title: '结算(元)',
          key: 'finalPrice',
          align: 'center',
          width: '100'
        }
      ],
      formPageData: []
    }
  },
  mounted () {
    this.getRouteData()
    this.getAllData()
    this.getLineListData()
    // document.onkeydown = function(event) {
    //   // 回车实现点击功能
    //   var e = event || window.event;
    //   if (e && e.keyCode == 13) {
    //     $("#btn").click(
    //       console.log(666)
    //     );
    //   }
    // };
  },
  methods: {
    onProtectLoadData () {
      this.loading = false
    },
    navbarClick () {
      this.isShow = !this.isShow
      this.isActive = !this.isActive
    },
    lineClick (item, index) {
      var _this = this
      _this.currentIndex = index
      let eventNo = { eventNo: item.planNo }
      axios
        .request({
          method: 'post',
          data: eventNo,
          url: 'hpgec/powerPlantSinglePlan'
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 200 && res.data.data !== null) {
            _this.detailInformationData =
              res.data.data.powerPlantPlanDetailsInfoResp
            _this.formPageData =
              res.data.data.generationPlanImplementationStatisticsResps
            _this.GenerationPlanExecutionTestData = res.data.data
          }
        })
        .catch(err => {
          console.log('err:' + err)
        })
    },
    btn1 () {
      this.isShow1 = true
      this.isActive1 = !this.isActive1
    },
    btn2 () {
      this.isShow1 = false
      this.isActive1 = !this.isActive1
    },
    getRouteData () {
      console.log(this.$route.params)
      this.eventNo = this.$route.params.planNo
      this.planName = this.$route.params.planName
    },
    // 左边弹框列表接口
    getLineListData () {
      var _this = this
      let data = {
        planName: ''
      }
      axios
        .request({
          method: 'post',
          data: data,
          url: 'hpgec/powerPlantSinglePlan_plan_Query'
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 200 && res.data.data !== null) {
            _this.line = res.data.data
            _this.list = res.data.data
            _this.line.forEach((item, index) => {
              if (item.planName === _this.planName) {
                _this.currentIndex = index
              }
            })
          }
        })
        .catch(err => {
          console.log('err:' + err)
        })
    },
    getAllData () {
      var _this = this
      let eventNo = { eventNo: _this.eventNo }
      axios
        .request({
          method: 'post',
          data: eventNo,
          url: 'hpgec/powerPlantSinglePlan'
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 200 && res.data.data !== null) {
            _this.detailInformationData =
              res.data.data.powerPlantPlanDetailsInfoResp
            _this.formPageData =
              res.data.data.generationPlanImplementationStatisticsResps
            _this.GenerationPlanExecutionTestData = res.data.data
            _this.GeneratingPlanEchartData = res.data.data.generationPlanImplementationStatisticsResps
          }
        })
        .catch(err => {
          console.log('err:' + err)
        })
    },
    inputFunc () {
      var _this = this
      if (_this.issue_content.length > 0) {
        _this.planName = _this.issue_content
        let data = {
          planName: _this.planName
        }
        axios
          .request({
            method: 'post',
            data: data,
            url: 'hpgec/powerPlantSinglePlan_plan_Query'
          })
          .then(res => {
            console.log(res)
            if (res.data.code === 200 && res.data.data !== null) {
              _this.line = res.data.data
            }
          })
          .catch(err => {
            console.log('err:' + err)
          })
      } else if (_this.issue_content.length < 0) {
        this.getLineListData()
      }
    }
  },
  watch: {
    issue_content (current, old) {
      var _this = this
      if (current == '') {
        _this.line = _this.list
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "detailOfSinglePlantPlan.less";
.active {
  transform: translateX(105%);
}
.isactive {
  transform: translateX(15.5%);
}
.isColor {
  color: #009999;
}
.activeTwo {
  background: #009999;
  color: #fff !important;
}
</style>
