<template>
  <Card class="virtualPowerPlant virtualMachine">
    <div slot="title" class="virtualPowerPlant-header">
      <img src="../images/u2269.png">
      <span class="span1" @click="click1" :class="{virtualPowerPlantActive:isActive}">机组控制事件查询</span>
      <span class="span2">|</span>
      <span class="span3" @click="click2" :class="{virtualPowerPlantActive:!isActive}">机组控制事件统计</span>
    </div>
    <!-- 机组控制事件查询 -->
    <PlantPlanEnquiry v-if="isShow"/>
    <!-- 机组控制事件统计 -->
    <PowerPlantPlanningStatistics v-if="!isShow"/>
  </Card>
</template>
<script>
import PlantPlanEnquiry from './plantPlanEnquiry.vue'
import PowerPlantPlanningStatistics from './powerPlantPlanningStatistics.vue'
export default {
  name: 'virtualPowerPlant',
  components: {
    PlantPlanEnquiry,
    PowerPlantPlanningStatistics
  },
  data () {
    return {
      isActive: true,
      isShow: true
    }
  },
  methods: {
    click1 () {
      this.isActive = !this.isActive
      this.isShow = !this.isShow
    },
    click2 () {
      this.isActive = !this.isActive
      this.isShow = !this.isShow
    }
  }
}
</script>
<style lang="less">
@import "../loadControlEvent.less";
.virtualPowerPlantActive {
  border-bottom: 2px solid #009999;
}
</style>
