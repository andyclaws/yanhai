<template>
  <div class="miss-lineLose">
    <div class="miss-lineLose-tabs">
      <Poptip trigger="hover" v-for="tab in tabs" :key="tab.name">
        <span class="miss-lineLose-tabs-tab">
          <span class="miss-lineLose-tabs-tab-logo">
            <img :src="getPic(tab.pic)" :alt="tab.title">
          </span>
          <span class="miss-lineLose-tabs-tab-warn" v-if="tab.isWarn"></span>
          <span class="miss-lineLose-tabs-tab-title">{{tab.title}}</span>
          <span :class="tab.isWarn ?
           'miss-lineLose-tabs-tab-data miss-lineLose-tabs-tab-data-warn' :
            'miss-lineLose-tabs-tab-data miss-lineLose-tabs-tab-data-qualified'" @click="changeTab(tab)">{{tab.data}}</span>
        </span>
        <div class="miss-lineLose-tabs-popTip" slot="content">{{tab.popTip}}</div>
      </Poptip>
    </div>

    <div class="miss-lineLose-content">
      <div v-for="tab in copyTabs" :key="tab.name" v-show="tab.active">
        <slot :name="tab.name"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import coverRatePic from './img/u5385.png'
import successRatePic from './img/u5386.png'
import measurementAbnormalPic from './img/u5387.png'
import powerAbnormalPic from './img/u5388.png'
import zeroElectricityPic from './img/u5389.png'
import { deepCopy } from '@/libs/util'
export default {
  name: 'sea-line-lose-analysis',
  props: {
    tabs: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      copyTabs: []
    }
  },
  methods: {
    getPic (pic) {
      switch (pic) {
        case 'coverRatePic':
          return coverRatePic
        case 'successRatePic':
          return successRatePic
        case 'measurementAbnormalPic':
          return measurementAbnormalPic
        case 'powerAbnormalPic':
          return powerAbnormalPic
        case 'zeroElectricityPic':
          return zeroElectricityPic
      }
    },
    changeTab (clickedTab) {
      this.copyTabs.forEach((tab) => {
        if (tab.name === clickedTab.name) {
          tab.active = true
        } else {
          tab.active = false
        }
      })
      // 数组修改不生效，强制修改来使其生效
      this.copyTabs.push('')
      this.copyTabs.pop()
      this.$emit('change-tab', clickedTab, clickedTab.name)
    },
    deepCopyTabs () {
      let tabs = deepCopy(this.tabs)
      this.copyTabs = tabs
      let hasActive = false
      try {
        this.copyTabs.forEach((tab) => {
          if (tab.active === true) {
            hasActive = true
            let end = 'end'
            throw end
          }
        })
      } catch (e) {}
      if (!hasActive && this.copyTabs.length > 0) {
        this.copyTabs[0].active = true
      }
    }
  },
  mounted () {
    this.deepCopyTabs()
  }
}
</script>

<style lang="less">
@import "index";
</style>
