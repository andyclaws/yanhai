<template>
  <div>
    <Button type="primary" @click="modal1 = true">Display dialog box</Button>
    <Modals v-model="modal1"
            @on-cancel="modal1 = false"
            title="sb"
            :fullscreen="fullscreen"
            :draggable="draggable"
    >
      撒大啊大大
    </Modals>
    <common-select-box
      :cons-select-more="consSelectMore"
      :tmnl-select-more="tmnlSelectMore"
      :show-components="showComponents"
      @on-select="select"
    ></common-select-box>

    <common-select-box
      :cons-select-more="consSelectMore"
      :tmnl-select-more="tmnlSelectMore"
      :show-components="showComponents"
      @on-select="select"
    ></common-select-box>

    <Button type="primary" @click="showSeaModal">sea-modal</Button>
    <sea-modal ref="seaModal"
               width="800px" :title="title"
               :titleStyle="'1'" :subTitle="subTitle" :showOrg="false"
               dateType="date" :date="date" :score="score" :tabs="tabs" @change-tab="changeTab" @select-org="selectOrg">
      <div slot="trendAnalysis">
        <Split value="0.6" style="height: 500px;">
          <div slot="left">
            <Split value="0.4" mode="vertical" style="height: 400px">
              <div slot="top">
                Top Pane
              </div>
              <div slot="bottom">
                Bottom Pane
              </div>
            </Split>
          </div>
          <div slot="right">
            Right Pane
          </div>
        </Split>
      </div>
      <div slot="analysisReport">
        <Tabs type="card">
          <TabPane label="分析过程">
            <sea-line-lose-analysis :tabs="subTabs" @change-tab="changeSubTab">
              <div slot="coverRate">采集覆盖率</div>
              <div slot="successRate">采集成功率</div>
              <div slot="measurementAbnormal">计量异常</div>
              <div slot="powerAbnormal">用电异常</div>
              <div slot="zeroElectricity">零电量</div>
            </sea-line-lose-analysis>
          </TabPane>
          <TabPane label="分析结果">分析结果：</TabPane>
        </Tabs>
      </div>
    </sea-modal>
    <component :is="co"/>
    <Row>
      <Col span="12">
        <sea-card>
          <br><br><br><br><br><br>
          <img src="../sea-linemanagement/images/u3183.png"/>
          <div>hello</div>
        </sea-card>
      </Col>
      <Col span="12">
        <sea-card :title="'testTitle'" :help="'我是帮助'">
          <sea-line-lose-analysis :tabs="subTabs" @change-tab="changeSubTab">
            <div slot="coverRate">采集覆盖率</div>
            <div slot="successRate">采集成功率</div>
            <div slot="measurementAbnormal">计量异常</div>
            <div slot="powerAbnormal">用电异常</div>
            <div slot="zeroElectricity">零电量</div>
          </sea-line-lose-analysis>
        </sea-card>
      </Col>
    </Row>
    <Button type="primary" @click="test1">test1</Button>
    <Button type="primary" @click="test2">test2</Button>
    <router-view ref="child"/>

    <br>
    <br>
    <Button type="primary" @click="modal2 = true">测试可拖拽全屏modal</Button>
    <Modals v-model="modal2"
            @on-cancel="modal2 = false"
            title="test"
            draggable
    >
      <sea-card>
        test
      </sea-card>
    </Modals>
  </div>
</template>

<script>
import Modals from '_c/modals'
import CommonSelectBox from '_c/common-select-box'
import SeaModal from '_c/sea-modal'
import SeaLineLoseAnalysis from '_c/sea-line-lose-analysis'
import SeaCard from '_c/sea-card'
export default {
  name: 'missModal',
  components: {
    Modals,
    CommonSelectBox,
    SeaModal,
    SeaLineLoseAnalysis,
    SeaCard
  },
  data () {
    return {
      co: 'SeaModal',
      modal1: false,
      modal2: false,
      fullscreen: true,
      draggable: false,
      consSelectMore: true,
      tmnlSelectMore: true,
      showComponents: ['org', 'cons', 'tmnl'],
      title: `<div style="color: #fff; font-size: 20px">一级标题</div>`,
      subTitle: `<div style="color: #fff; font-size: 15px">二级标题</div>`,
      date: '2019-01-01',
      score: '99',
      tabs: [
        { title: '趋势分析', name: 'trendAnalysis', pic: 'errorAnalysisPic', activePic: 'errorAnalysisActivePic', active: true },
        { title: '分析报告', name: 'analysisReport', pic: 'lineLoseAnalysisPic', activePic: 'lineLoseAnalysisActivePic' }
      ],
      subTabs: [
        { title: '采集覆盖率', name: 'coverRate', pic: 'coverRatePic', isWarn: false, data: '100%', popTip: '建议1' },
        { title: '采集成功率', name: 'successRate', pic: 'successRatePic', isWarn: true, data: '98.5%', popTip: '建议2' },
        { title: '计量异常', name: 'measurementAbnormal', pic: 'measurementAbnormalPic', data: '0', isWarn: false, popTip: '建议3' },
        { title: '用电异常', name: 'powerAbnormal', pic: 'powerAbnormalPic', isWarn: true, data: '23', popTip: '建议4' },
        { title: '零电量', name: 'zeroElectricity', pic: 'zeroElectricityPic', isWarn: true, data: '5', popTip: '建议5' }
      ]
    }
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    select (data) {
      console.log('miss-modal', data)
    },
    showSeaModal () {
      this.$refs.seaModal.showModal()
    },
    changeTab (tab, tabName) {
      console.log(tab, tabName)
      this.title = `<div style="color: #fff; font-size: 20px">tab已经切换</div>`
    },
    changeSubTab (tab, tabName) {
      console.log(tab, tabName)
    },
    selectOrg (data) {
      console.log(data)
    },
    test1 () {
      console.log('test1')
      this.$router.push({
        name: 'test1'
      })
    },
    test2 () {
      console.log('test2')
      this.$router.push({
        name: 'test2'
      })
    },
    ttt () {
      console.log('this.$store.state.auth: ', this.$store.state.auth)
      console.log('orgNo: ', this.$store.state.auth.orgNo)
      console.log('orgType: ', this.$store.state.auth.orgType)
    }
  },
  created () {
    this.ttt()
  }
}
</script>

<style scoped>

</style>
