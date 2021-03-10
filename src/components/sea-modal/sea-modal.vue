<template>
  <div class="miss-back"
       :style="{display: display}">
    <div class="miss-modal"
         :style="isFullScreen ? fullStyle : modalStyle">
      <div class="miss-modal-head">
        <Icon class="miss-modal-head-iconButton"
              size="20"
              color="#fff"
              type="md-close"
              @click="closeModal" />
        <Icon class="miss-modal-head-iconButton"
              size="20"
              color="#fff"
              type="md-contract"
              v-if="isFullScreen"
              @click="isFullScreen = false" />
        <Icon class="miss-modal-head-iconButton"
              size="20"
              color="#fff"
              type="md-expand"
              v-if="!isFullScreen"
              @click="isFullScreen = true" />
        <span class="miss-modal-head-logo">
          <img src="./img/logo_u2909.png" />
          <span>用电信息采集系统</span>
        </span>
        <span class="miss-modal-head-title">
          <Poptip v-if="showOrg"
                  class="miss-modal-head-title-org"
                  trigger="click"
                  placement="bottom"
                  width="250">
            <Input enter-button
                   v-model="orgName"
                   :placeholder="$t('please_input_org')"
                   style="width: 250px" />
            <div slot="content"
                 style="max-height: 500px; overflow-y: auto">
              <orgs :show-refresh-text="false"
                    @on-select="selectOrg"></orgs>
            </div>
          </Poptip>
          <div style="position: relative;">
            <div v-html="title"></div>
            <div v-if="score !== ''"
                 v-html="tgState"
                 style="position: absolute; right: 0; bottom: 0;margin: 0;"></div>
          </div>
          <div v-html="subTitle"
               :class="titleStyle === '1' ? 'dash' : ''"></div>
        </span>
        <span class="miss-modal-head-date">
          <DatePicker v-if="dateType === 'dateRange'"
                      :clearable=false
                      split-panels
                      :value="dateRangeTmp"
                      format="yyyy-MM-dd"
                      type="daterange"
                      placeholder="选择日期"
                      @on-change="changeDateRange"
                      style="width: 190px"/>
          <DatePicker v-if="dateType === 'date'"
                      :value="date"
                      format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期"
                      @on-change="changeDate"/>
          <DatePicker v-if="dateType === 'month'"
                      :value="monthDateS"
                      format="yyyy-MM"
                      type="month"
                      placeholder="选择日期"
                      @on-change="changeMonthDateS"/>
          <DatePicker v-if="dateType === 'month'"
                      :value="monthDateE"
                      format="yyyy-MM"
                      type="month"
                      placeholder="选择日期"
                      @on-change="changeMonthDateE"/>
          <Button
            v-if="dateType === 'dateRange' || dateType === 'date' || dateType === 'month'"
            type="primary"
            @click="seaModelQuery"
            style="margin-left: 10px;">查询</Button>
        </span>

        <span v-if="score !== ''"
              class="miss-modal-head-score">
          <span class="miss-modal-head-score-value">
            {{score}}
          </span>
          <span class="miss-modal-head-score-unit">
            分
          </span>
        </span>
      </div>
      <div class="miss-modal-content">
        <div v-for="tab in copyTabs"
             :key="tab.name"
             v-show="tab.active">
          <slot :name="tab.name"></slot>
        </div>
      </div>
      <div class="miss-modal-bottom">
        <img src="./img/u3913.png" />
        <div class="miss-modal-bottom-tabs">
          <div :class="tab.active === true ?
           'miss-modal-bottom-tabs-tab miss-modal-bottom-tabs-tab-active' :
            'miss-modal-bottom-tabs-tab'"
               v-for="tab in copyTabs"
               :key="tab.name"
               @click="changeTab(tab)">
            <img :src="getPic(tab)"
                 v-if="!tab.active" />
            <img :src="getPic(tab, true)"
                 v-if="tab.active" />
            <span>{{tab.title}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import errorAnalysisPic from './img/error_analysis.png'
import errorAnalysisActivePic from './img/error_analysis_active.png'
import lineLoseAnalysisPic from './img/line_lose_analysis.png'
import lineLoseAnalysisActivePic from './img/line_lose_analysis_active.png'
import Orgs from '_c/common-select-box/components/org'
import { deepCopy } from '@/libs/util'
import { formatDate } from '@/libs/index.js'
export default {
  name: 'sea-modal',
  components: {
    Orgs
  },
  props: {
    width: {
      type: [Number, String],
      default () {
        return '800px'
      }
    },
    title: {
      type: String,
      default () {
        return ``
      }
    },
    /**
       * @description 台区状态
       */
    tgState: {
      type: String,
      default () {
        return ``
      }
    },
    /**
       * @description 标题样式 1 代表虚线
       */
    titleStyle: {
      type: String,
      default () {
        return ''
      }
    },
    subTitle: {
      type: String,
      default () {
        return ``
      }
    },
    /**
       * @description 日期类型 支持 date(日期选择) dateRange(日期段)
       */
    dateType: {
      type: String,
      default () {
        return 'dateRange'
      }
    },

    /**
     * @description 日期数据
     */
    date: {
      type: String,
      default () {
        return ''
      }
    },
    /**
     * @description 日期段数据
     */
    dateRange: {
      Type: Array,
      default: () => [formatDate('', -8), formatDate('', -1)]
    },
    /**
       * @description 得分情况 默认为空，为空为不显示
       */
    score: {
      type: String,
      default () {
        return ''
      }
    },
    showOrg: {
      type: Boolean,
      default () {
        return false
      }
    },
    orgName: {
      type: String,
      default () {
        return ''
      }
    },
    /**
       * @description tabs
       * [
         {title: '趋势分析', name: 'trendAnalysis', pic: 'errorAnalysisPic',activePic: 'errorAnalysisActivePic', active: true},
         {title: '分析报告', name: 'analysisReport', pic: 'lineLoseAnalysisPic',activePic: 'lineLoseAnalysisActivePic'},
         ]
       */
    tabs: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    seaModelItem: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      display: 'none',
      isFullScreen: false,
      modalStyle: {
        width: this.width,
        height: '80%',
        background: 'white',
        position: 'relative',
        left: '',
        marginLeft: '50%',
        marginTop: '5%'
      },
      fullStyle: {
        width: '100%',
        height: '100%',
        background: 'white'
      },
      copyTabs: [],
      monthDateS: '',
      monthDateE: '',
      dateRangeTmp: []
    }
  },
  methods: {
    showModal () {
      this.display = 'block'
    },
    closeModal () {
      this.display = 'none'
    },
    // 日期选择
    changeDate (value) {
      this.date = value
      this.$emit('change-date', value)
    },
    // 按月查询start月份选择
    changeMonthDateS (value) {
      this.monthDateS = value
      this.dateRangeTmp[1] = value
    },
    // 按月查询end月份选择
    changeMonthDateE (value) {
      this.monthDateE = value
      this.dateRangeTmp[0] = value
    },
    // 日期范围选择
    changeDateRange (value) {
      this.dateRangeTmp = value
      // this.$emit('change-date-range', value)
    },
    initStyle () {
      this.modalStyle.left = '-' + parseInt(this.width) / 2 + 'px'
    },
    deepCopyTabs () {
      let tabs = deepCopy(this.tabs)
      this.copyTabs = tabs
      let hasActive = false
      try {
        this.copyTabs.forEach((tab) => {
          if (tab.active) {
            hasActive = true
            let end = 'end'
            throw end
          }
        })
      } catch (e) { }
      if (!hasActive && this.copyTabs.length > 0) {
        this.copyTabs[0].active = true
      }
    },
    getPic (tab, active) {
      const picName = active ? tab.activePic : tab.pic
      switch (picName) {
        case 'errorAnalysisPic':
          return errorAnalysisPic
        case 'errorAnalysisActivePic':
          return errorAnalysisActivePic
        case 'lineLoseAnalysisPic':
          return lineLoseAnalysisPic
        case 'lineLoseAnalysisActivePic':
          return lineLoseAnalysisActivePic
        case 'alarmMonitorPic':
          return errorAnalysisPic
        case 'continueAnalysisPic':
          return lineLoseAnalysisPic
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
      this.$emit('change-tab', clickedTab, clickedTab.name)
    },
    selectOrg (value) {
      this.$emit('select-org', value)
    },
    seaModelQuery () {
      console.log(this.dateRangeTmp)
      this.$emit('sea-model-query', this.dateType === 'date' ? this.date : this.dateRangeTmp, this.seaModelItem)
    }
  },
  mounted () {
    this.initStyle()
    this.deepCopyTabs()
  },
  watch: {
    dateRange (val) {
      this.dateRangeTmp = val
    }
  }
}
</script>

<style lang="less">
@import "index";
</style>
