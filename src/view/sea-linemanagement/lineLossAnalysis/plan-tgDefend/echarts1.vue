<template>
  <div class="demo-split">
    <p slot="title">
      <!--<RadioGroup v-model="radioButton" type="button" v-for="(item, index) in orgList" :key="index" @on-change="changeOrgs">-->
      <RadioGroup v-model="radioButton" type="button" v-for="(item, index) in orgList" :key="index">
        <Radio v-bind:label="item.orgNo + '-' + item.orgType">{{item.orgName}}</Radio>
      </RadioGroup>
    </p>
    <div id="echartContainer">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import axios from '@/libs/api.request'
export default {
  components: {
    axios
  },
  props: {
    searchbar: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      radioButton: '',
      orgList: []
    }
  },
  methods: {
    paintChars () {
      if (this.searchbar.orgType !== '06' && !this.searchbar.custManager) {
        axios.request({
          method: 'post',
          data: {
            orgNo: this.searchbar.orgNo,
            orgType: this.searchbar.orgType,
            statDate: this.searchbar.statDate
          },
          url: '/sea-lineLose/tgLineLoseDetail/tgPlanDefend/indexOrgTgManager'
        }).then(res => {
          this.orgList = res.data.data
          this.radioButton = ''
        })
      } else {
        axios.request({
          method: 'post',
          data: {
            orgNo: this.searchbar.orgNo,
            orgType: this.searchbar.orgType,
            custManager: this.searchbar.custManager,
            statDate: this.searchbar.statDate
          },
          url: '/sea-lineLose/tgLineLoseDetail/tgPlanDefend/indexOrgTgManager'
        }).then(res => {
          this.orgList = res.data.data
          this.radioButton = ''
        })
      }
      axios.request({
        method: 'post',
        data: {
          orgNo: this.searchbar.orgNo,
          orgType: this.searchbar.orgType,
          custManager: this.searchbar.custManager,
          statDate: this.searchbar.statDate
        },
        url: '/sea-lineLose/tgLineLoseDetail/tgPlanDefend/indexChart'
      }).then(res => {
        var myecharts = echarts.init(document.getElementById('echartContainer'), 'light')
        let systemPlanTgs = []
        let systemDealTgs = []
        let systemPlanTgRate = []
        let manPlanTgs = []
        let manDealTgs = []
        let manPlanTgRate = []
        let orgs = []
        let man = res.data.data.man
        let system = res.data.data.system
        for (let i = 0; i < man.length; i++) {
          orgs[orgs.length] = man[i].orgName
          manPlanTgs[manPlanTgs.length] = man[i].planTgNums - man[i].dealTgNums
          manDealTgs[manDealTgs.length] = man[i].dealTgNums
          manPlanTgRate[manPlanTgRate.length] = man[i].planTgRate
        }
        for (let i = 0; i < system.length; i++) {
          systemPlanTgs[systemPlanTgs.length] = system[i].planTgNums - system[i].dealTgNums
          systemDealTgs[systemDealTgs.length] = system[i].dealTgNums
          systemPlanTgRate[systemPlanTgRate.length] = system[i].planTgRate
        }
        myecharts.setOption({
          legend: {
            top: '13%',
            orient: 'vertical',
            left: 'left',
            data: ['系统已治理', '系统待治理', '人工已治理', '人工待治理', '系统治理率', '人工治理率']
          },
          grid: {
            left: '10%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              // saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            data: orgs
          },
          yAxis: [
            {
              type: 'value',
              name: '单位：台区',
              max: 40000,
              min: 0,
              interval: 10000
            },
            {
              type: 'value',
              name: '单位:%',
              min: 0,
              max: 100,
              interval: 25
            }
          ],
          series: [
            {
              name: '系统已治理',
              type: 'bar',
              stack: '治理',
              barWidth: 30,
              // barGap:50,
              data: systemDealTgs
            },
            {
              name: '系统待治理',
              type: 'bar',
              stack: '治理',
              barWidth: 30,
              // barGap:50,
              data: systemPlanTgs
            },
            {
              name: '人工已治理',
              type: 'bar',
              stack: '治理',
              barWidth: 30,
              // barGap:50,
              data: manDealTgs
            },
            {
              name: '人工待治理',
              type: 'bar',
              stack: '治理',
              barWidth: 30,
              // barGap:50,
              data: manPlanTgs
            },
            {
              name: '系统治理率',
              type: 'line',
              stack: '系统',
              smooth: true,
              yAxisIndex: 1,
              data: systemPlanTgRate
            },
            {
              name: '人工治理率',
              type: 'line',
              stack: '人工',
              smooth: true,
              yAxisIndex: 1,
              data: manPlanTgRate
            }
          ]
        })
      })
    },
    changeOrgs () {
      console.log(this.radioButton)
      this.searchbar.orgNo = this.radioButton.split('-')[0]
      this.searchbar.orgType = this.radioButton.split('-')[1]
      this.paintChars()
    }
  },
  mounted () {
    this.paintChars()
  }
}
</script>
<style scoped>
  .demo-split {
    width: 100%;
    height: 180px;
  }
  #echartContainer {
    width: 90%;
    height: 170px;
  }
  p{
    position:relative;
    display: flex;
    float: right;
    right: 20%;
  }
  .ivu-radio-wrapper-checked{
    background-color: #448c86;
    border-color: #448c86;
    color: #fff;
  }
</style>
