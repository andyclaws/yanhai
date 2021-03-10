<template>
  <div class="syntheticalAnalysis" style="position:relative;">
    <quota class="sea-search-box"
           ref="quota"
           v-show="selectedQuota"
           :selected-quota="selectedQuota"
           :searchBarFlag="searchBarFlag"
           :base-search-bar-form="searchBarForm"
           @on-search="searched"/>
    <effect class="sea-search-box"
            ref="effect"
            v-show="!selectedQuota"
            :selected-quota="selectedQuota"
            :searchBarFlag="searchBarFlag"
            :base-search-bar-form="searchBarForm"
            @on-search="searched"/>

    <div class="buttonBox">
      <div class="buttonBoxDiv" @click="searchBarFlag=!searchBarFlag">
        <img class="buttonBoxImgSearch" src="../../images/u48796.png" alt="搜索"/>
      </div>

      <div class="buttonBoxDiv buttonBoxDivFilter" :class="{ 'selected' : selectedQuota }"
           @click="changeNav('quota')">
        <img class="buttonBoxImg" src="../../images/noSelected_highLoss.png" v-show="!selectedQuota" alt="指标分析"/>
        <img class="buttonBoxImg" src="../../images/selected_highLoss.png" v-show="selectedQuota" alt="指标分析"/>
        <Row>指标分析</Row>
      </div>
      <div class="buttonBoxDiv buttonBoxDivFilter" :class="{ 'selected' : !selectedQuota }"
           @click="changeNav('effect')">
        <img class="buttonBoxImg" src="../../images/noSelected_normal.png" v-show="!!selectedQuota" alt="治理成效"/>
        <img class="buttonBoxImg" src="../../images/selected_normal.png" v-show="!selectedQuota" alt="治理成效"/>
        <Row>治理成效</Row>
      </div>
      <div class="menu-bottom">
        <div class="buttonBoxDiv buttonBoxImgMenuBackground" @click="linkBoxFlag=!linkBoxFlag">
          <img class="buttonBoxImgMenu" src="../../images/u48802.png" alt="菜单"/>
        </div>
        <div class="linkBox" v-show="linkBoxFlag">
          <router-link to="syntheticalAnalysis" class="comprehensive selected" tag="div">
            <div>
              <img src="../../images/u48815.png"/>
            </div>
            综合分析
          </router-link>
          <router-link to="orgManagement" class="org_Management" tag="div">
            <div>
              <img src="../../images/u48824.png"/>
            </div>
            单位管控
          </router-link>
          <router-link to="managerAppraise" class="manager_Appraise" tag="div">
            <div>
              <img src="../../images/u41495.png"/>
            </div>
            台区经理评价
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import quota from './quota'
import effect from './effect'
import { formatDate } from '@/libs'

export default {
  components: {
    quota,
    effect
  },
  name: 'SyntheticalAnalysis',
  data () {
    return {
      changeFlag: true,
      selectedQuota: true,
      linkBoxFlag: false,
      searchBarFlag: false,
      searchBarForm: {
        orgName: this.$store.state.auth.orgName && this.$store.state.auth.orgName !== '' ? this.$store.state.auth.orgName : ' ',
        orgNo: this.$store.state.auth.orgNo,
        orgType: this.$store.state.auth.orgType,
        date: formatDate(undefined, -2),
        dateType: 'day'
      }
    }
  },
  methods: {
    tabSelected (name) {
      for (let i in this.selected) {
        this.selected[i] = false
      }
      this.selected[name] = true
    },
    searched (isShow, searchBarForm) {
      if (isShow) {
        this.searchBarFlag = true
      } else {
        let _this = this
        setTimeout(function () {
          _this.searchBarFlag = false
        }, 1000)
      }
      if (searchBarForm) {
        this.searchBarForm = searchBarForm
      }
    },
    toTop () {
      // todo 不行啊 无奈
      window.scrollTo(0, 0)
    },
    changeNav (navName) {
      if (navName === 'quota') {
        this.selectedQuota = true
        this.$refs.quota.topPanelQuery()
      } else if (navName === 'effect') {
        this.selectedQuota = false
        this.$refs.effect.topPanelQuery()
      }
    }
  },
  watch: {
    selectedQuota () {
      this.searchBarFlag = false
    },
    searchBarFlag (val) {
      if (val) {
        this.toTop()
      }
    }
  }
}
</script>

<style lang='less'>
  @import "./syntheticalAnalysis.less";
</style>
