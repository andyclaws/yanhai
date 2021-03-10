<template>
  <div
    class="loadControlEvent"
    style="position: relative"
    id="loadControlEvent"
  >
    <!-- 虚拟电厂 -->
    <Card class="virtualPowerPlant" v-show="isShow">
      <div slot="title" class="virtualPowerPlant-header">
        <img src="./images/u2269.png" />
        <span
          class="span1"
          @click="powerPlantclick1"
          :class="{virtualPowerPlantActive:isActive2}"
        >整体控制事件查询</span>
        <span class="span2">|</span>
        <span
          class="span3"
          @click="powerPlantclick2"
          :class="{virtualPowerPlantActive:!isActive2}"
        >整体控制事件统计</span>
      </div>
      <!-- 整体控制事件查询 -->
      <PlantPlanEnquiry v-if="isShow2" />

      <!-- 整体控制事件统计 -->
      <PowerPlantPlanningStatistics v-if="!isShow2" @func='powerPlantclick2'/>
    </Card>

    <!-- 虚拟机组 -->
    <VirtualMachine v-show="!isShow" />

    <div class="loadControlEvent-clickSpan1" @click="click1" :class="{active:isActive}">
      <p>整体</p>
      <p>控制</p>
    </div>
    <div class="loadControlEvent-clickSpan2" @click="click2" :class="{active:!isActive}">
      <p>机组</p>
      <p>控制</p>
    </div>

    <!-- 左边的悬框 -->
    <!-- <div class="loadControlEvent-clickBar" @click="navbarClick">
      <Icon type="ios-arrow-forward" size="25" color="#fff" v-show="isTransform" class="leftIcon"></Icon>
      <Icon type="ios-arrow-back" size="25" color="#fff" v-show="!isTransform" class="rightIcon"></Icon>
    </div>
    <Card class="loadControlEvent-left" ref="navbar" :class="{transform:isTransform}">
      <div slot="title" class="header">
        <img src="./images/u2269.png" />
        <p>查询</p>
      </div>
      <i-input :value.sync="value" placeholder="请输入关键字" class="ipt"></i-input>
      <img src="@/assets/images/machine/u3123.png" class="img" />
      <div class="loadControlEvent-left-box">
        <Tree :data="baseData" show-checkbox></Tree>
      </div>
    </Card> -->
  </div>
</template>

<script>
// import VirtualPowerPlant from "./virtualPowerPlant/virtualPowerPlant.vue";
import PlantPlanEnquiry from './virtualPowerPlant/plantPlanEnquiry.vue'
import PowerPlantPlanningStatistics from './virtualPowerPlant/powerPlantPlanningStatistics.vue'
import VirtualMachine from './virtualMachine/virtualMachine.vue'
import axios from '@/libs/api.request'
export default {
  name: 'loadControlEvent',
  components: {
    // VirtualPowerPlant,
    PlantPlanEnquiry,
    PowerPlantPlanningStatistics,
    VirtualMachine,
    axios
  },
  props: {},
  data () {
    return {
      isActive: true,
      isShow: true,
      isActive2: true,
      isShow2: true,
      isTransform: true,
      searchDataList: {
        beginTime: '',
        currentPage: 1,
        endTime: '',
        eventName: '',
        eventNo: '',
        finishRate: '',
        mode: '',
        pageSize: 10,
        targetValue: ''
      }
    }
  },
  mounted () {
    // this.getPlantPlanEnquiryData()
  },
  methods: {
    click1 () {
      this.isActive = !this.isActive
      this.isShow = !this.isShow
    },
    click2 () {
      this.isActive = !this.isActive
      this.isShow = !this.isShow
    },
    navbarClick () {
      this.isTransform = !this.isTransform
    },
    powerPlantclick1 () {
      this.isActive2 = !this.isActive2
      this.isShow2 = !this.isShow2
    },
    powerPlantclick2 () {
      this.isActive2 = !this.isActive2
      this.isShow2 = !this.isShow2
    }
  }
}
</script>

<style lang="less" scoped>
@import "loadControlEvent.less";
.active {
  background: #009999;
}
.transform {
  transform: translateX(-215px);
  transform: translateX(-215px);
  transition: 0.5s;
}
.virtualPowerPlantActive {
  border-bottom: 2px solid #009999;
}
</style>
