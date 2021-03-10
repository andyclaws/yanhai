<template>
  <div class="body">
    <div class="header">
      <p>
        <img src="./images/u2269.png" alt />
      </p>
      <p>
        <span>{{removeNull(baseInfo.unitName)}}VRV空调系统</span>
      </p>
    </div>
    <div class="statistics">
      <Card style="width:29%" class="left-detail">
        <div class="energy-box">
          <div>
            <p>
              <span>今</span>
              <img src="./images/u2576.png" alt />
            </p>
            <p>系统今日能耗</p>
            <p>
              <span>{{removeNull(baseInfo.energy, "0")}}</span>kWh
            </p>
          </div>
          <div>
            <p>
              <span>月</span>
              <img src="./images/u2576.png" alt />
            </p>
            <p>系统本月能耗</p>
            <p>
              <span>{{removeNull(baseInfo.energyM, "0")}}</span>kWh
            </p>
          </div>
          <div>
            <p>
              <span>月</span>
              <img src="./images/u2576.png" alt />
            </p>
            <p>系统累计能耗</p>
            <p>
              <span>{{removeNull(baseInfo.energyAll, "0")}}</span>kWh
            </p>
          </div>
        </div>
        <div class="line-box"></div>
        <div class="device-box">
          <div>
            <div>
              <img src="./images/u2561.png" alt />
              <span>内机数量：</span>
              <span>{{removeNull(baseInfo.neiJiShuLiang, "0")}}</span>台
            </div>
            <div>
              <img src="./images/u2559.png" alt />
              <span>离线设备：</span>
              <span>{{removeNull(baseInfo.subdeviceCnt, "0")}}</span>台
            </div>
          </div>
          <div>
            <div>
              <img src="./images/u2563.png" alt />
              <span>运行设备：</span>
              <span>{{removeNull(baseInfo.runCnt, "0")}}</span>台
            </div>
            <div>
              <img src="./images/u2557.png" alt />
              <span>异常设备：</span>
              <span>{{removeNull(baseInfo.expectCnt, "0")}}</span>台
            </div>
          </div>
        </div>
      </Card>
      <div id="right-chart">
        <div style="width:100%; height: 100%;" ref="dom"></div>
        <DatePicker
          class="date"
          type="date"
          :value="realLoadDate"
          @on-change="changeRealLoadDate"
          format="yyyy-MM-dd"
          :clearable="false"
          placeholder="日期"
          style="width: 160px"
        ></DatePicker>
      </div>
    </div>
    <div class="monitor-info" :style="monitorInforHeight">
      <div class="monitor-header">
        <div class="title">||| VRV空调系统内机电监测信息</div>
        <div class="select" style="display:none;">
          <Select v-model="floorValue" style="width:164px" size="small" placeholder="请选择楼层">
            <Option v-for="item in floorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div class="content" :style="contentHeight">
        <Card
          style="width:32%; margin-bottom: 20px"
          :style="cardHeight"
          v-for="(item, index) in airMonitorInfoList"
          :key="index"
        >
          <div slot="title">
            <div>
              <img src="./images/u2269.png" alt />
            </div>
            <div>
              <span>内机名称：{{item.internalMachineName}}</span>
            </div>
          </div>
          <div class="info" :style="infoHeight">
            <div class="title">
              <p>基本信息</p>
              <p>
                编号：
                <span>{{item.code}}</span>
              </p>
            </div>
            <div class="air-form-box">
              <div class="run-status">
                <div>运行状态：</div>
                <RadioGroup v-model="item.runStatus">
                  <Radio label="1" disabled>开</Radio>
                  <Radio label="0" disabled>关</Radio>
                </RadioGroup>
              </div>
              <div class="setting-temperature">
                <div>设置温度(℃)：</div>
                <div>{{item.settingTemperature}}</div>
              </div>
              <div class="indoor-temperature">
                <div>室内温度(℃)：</div>
                <div>{{item.indoorTemperature}}</div>
              </div>
              <div class="wind-volum">
                <div>风量：</div>
                <RadioGroup v-model="item.airvolume">
                  <Radio label="0" disabled>自动</Radio>
                  <Radio label="1" disabled>高</Radio>
                  <Radio label="2" disabled>中</Radio>
                  <Radio label="3" disabled>低</Radio>
                </RadioGroup>
              </div>
              <div class="model">
                <div>模式：</div>
                <RadioGroup v-model="item.model">
                  <Radio label="4" disabled>自动</Radio>
                  <Radio label="0" disabled>制冷</Radio>
                  <Radio label="1" disabled>制热</Radio>
                  <Radio label="2" disabled>通风</Radio>
                  <Radio label="3" disabled>除湿</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </Card>
        <div style="width: 32%;margin-bottom: 20px;height: 354px;" v-if="isNeedBlank"></div>
      </div>
    </div>
    <Page
      :current="current"
      :total="total"
      :page-size="pageSize"
      :page-size-opts="pageSizeOpts"
      size="small"
      :show-total="true"
      :show-elevator="true"
      :show-sizer="true"
      :transfer="false"
      style="margin-top: 20px;margin-bottom: 20px;text-align: center;"
      @on-change="onCardPageChange"
      @on-page-size-change="onCardPageSizeChange"
    />
  </div>
</template>

<script>
import * as api from '@/api/fictitiousPowerPlant/airConditioningDetail/mainview-data.js'
import echarts from 'echarts'
import tdTheme from '../../../components/charts/theme.json'
// eslint-disable-next-line no-unused-vars
import { getFormatDate, formatDate, arrToMap } from '@/libs/index'
import { judgeNull } from '../util.js'
import { off, on } from '@/libs/tools'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  // 组件名
  name: '',
  // 组件属性
  props: {},
  // 组件数据
  data () {
    return {
      dom: null,
      unitNo: '',
      isNeedBlank: false,
      baseInfo: {
        energy: '0',
        energyAll: '0',
        energyM: '0',
        expectCnt: '0',
        neiJiShuLiang: '0',
        runCnt: '0',
        subdeviceCnt: '0',
        unitName: '',
        subdeviceNo: ''
      },
      realLoadDate: formatDate(undefined, 0),
      floorList: [
        {
          value: '1F',
          label: '1F'
        },
        {
          value: '2F',
          label: '2F'
        },
        {
          value: '3F',
          label: '3F'
        }
      ],
      floorValue: '',
      airMonitorInfoList: [],
      monitorInforHeight: 'height: 395px;',
      contentHeight: 'height:350px;',
      cardHeight: 'height:354px;',
      infoHeight: 'height:278px;',
      current: 1,
      pageSize: 25,
      total: 0,
      pageSizeOpts: [25, 50, 100],
      isRealLoading: false,
      isListLoading: false,
      timer: {},
      timer1: {}
    }
  },
  // 组件计算属性
  computed: {},
  // 组件挂载
  components: {},
  methods: {
    resize () {
      this.dom.resize()
    },
    changeRealLoadDate (date) {
      this.realLoadDate = date
      this.getRealLoad('important')
    },
    getBaseInfo () {
      let _this = this
      api
        .getBaseInfo({ unitNo: _this.unitNo })
        .then(res => {
          let data = res.data.data
          if (typeof data !== 'undefined' && data !== null) {
            _this.baseInfo = data
          }
        })
        .catch(err => {
          console.log(err)
          _this.$Message.error('基本信息查询失败！')
        })
    },
    getAirList (model = '') {
      let _this = this
      if (model === 'important') {
        _this.isListLoading = true
        clearInterval(_this.timer1)
      }
      api
        .getAirList({
          unitNo: _this.unitNo,
          floor: _this.floorValue,
          current: _this.current,
          pageSize: _this.pageSize
        })
        .then(res => {
          if (_this.isListLoading && model !== 'important') {
            return
          }
          let list = res.data.data.list
          _this.total = res.data.data.totalCount
          _this.airMonitorInfoList = []
          if (typeof list !== 'undefined' && list !== null && list.length > 0) {
            for (let index = 0; index < list.length; index++) {
              let obj = {
                internalMachineName: '' + list[index].subdeviceName,
                code: '' + list[index].subdeviceNo,
                runStatus: '' + list[index].switchStatus,
                settingTemperature: '' + list[index].temp,
                indoorTemperature: '' + list[index].roomTemp,
                airvolume: '' + list[index].fanSpeed,
                model: '' + list[index].mode1
              }
              _this.airMonitorInfoList.push(obj)
            }
            if (list.length % 3 === 2) {
              _this.isNeedBlank = true
            } else {
              _this.isNeedBlank = false
            }
            document
              .getElementsByClassName('monitor-info')[0]
              .getElementsByClassName('content')[0].scrollTop = 0
          }
        })
        .catch(err => {
          console.log(err)
          _this.$Message.error('空调内机信息查询失败！')
        })
        .finally(() => {
          if (_this.isListLoading && model === 'important') {
            _this.timer1 = setInterval(_this.getAirList, 300000)
            _this.isListLoading = false
          }
        })
    },
    removeNull (val, initStr = '') {
      return judgeNull(val, initStr)
    },
    getRealLoad (model = '') {
      let _this = this
      if (model === 'important') {
        _this.isRealLoading = true
        clearInterval(_this.timer)
      }
      api
        .getRealLoad({
          unitNo: _this.unitNo,
          date: _this.realLoadDate
        })
        .then(res => {
          if (_this.isRealLoading && model !== 'important') {
            return
          }
          let data = res.data.data
          if (typeof data !== 'undefined' && data !== null) {
            let realTimeLoads = []
            if (typeof data !== 'undefined' && data !== null) {
              realTimeLoads = data.realTimeLoad
            }
            _this.$nextTick(() => {
              let option = {
                title: {
                  text: 'VRV空调系统24小时负荷',
                  textStyle: {
                    fontWeight: 'normal',
                    color: '#009999',
                    fontSize: '14'
                  },
                  top: '4%'
                },
                tooltip: {
                  trigger: 'axis'
                },
                legend: {
                  icon: 'rectangle',
                  data: ['实时负荷'],
                  right: '4%',
                  top: '15%'
                },
                grid: {
                  top: '26%',
                  left: '2%',
                  right: '4%',
                  bottom: '15%',
                  containLabel: true
                },
                xAxis: {
                  type: 'category',
                  xAxisLabel: {
                    interval: 15
                  },
                  data: [
                    '00:00',
                    '00:15',
                    '00:30',
                    '00:45',
                    '01:00',
                    '01:15',
                    '01:30',
                    '01:45',
                    '02:00',
                    '02:15',
                    '02:30',
                    '02:45',
                    '03:00',
                    '03:15',
                    '03:30',
                    '03:45',
                    '04:00',
                    '04:15',
                    '04:30',
                    '04:45',
                    '05:00',
                    '05:15',
                    '05:30',
                    '05:45',
                    '06:00',
                    '06:15',
                    '06:30',
                    '06:45',
                    '07:00',
                    '07:15',
                    '07:30',
                    '07:45',
                    '08:00',
                    '08:15',
                    '08:30',
                    '08:45',
                    '09:00',
                    '09:15',
                    '09:30',
                    '09:45',
                    '10:00',
                    '10:15',
                    '10:30',
                    '10:45',
                    '11:00',
                    '11:15',
                    '11:30',
                    '11:45',
                    '12:00',
                    '12:15',
                    '12:30',
                    '12:45',
                    '13:00',
                    '13:15',
                    '13:30',
                    '13:45',
                    '14:00',
                    '14:15',
                    '14:30',
                    '14:45',
                    '15:00',
                    '15:15',
                    '15:30',
                    '15:45',
                    '16:00',
                    '16:15',
                    '16:30',
                    '16:45',
                    '17:00',
                    '17:15',
                    '17:30',
                    '17:45',
                    '18:00',
                    '18:15',
                    '18:30',
                    '18:45',
                    '19:00',
                    '19:15',
                    '19:30',
                    '19:45',
                    '20:00',
                    '20:15',
                    '20:30',
                    '20:45',
                    '21:00',
                    '21:15',
                    '21:30',
                    '21:45',
                    '22:00',
                    '22:15',
                    '22:30',
                    '22:45',
                    '23:00',
                    '23:15',
                    '23:30',
                    '23:45'
                  ]
                },
                yAxis: {
                  name: '        单位：kW',
                  type: 'value'
                },
                dataZoom: [
                  // {
                  //   type: 'inside',
                  //   start: 0,
                  //   end: 100
                  // },
                  // {
                  //   start: 0,
                  //   end: 100,
                  //   handleIcon:
                  //     'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                  //   handleSize: '80%',
                  //   handleStyle: {
                  //     color: '#fff',
                  //     shadowBlur: 3,
                  //     shadowColor: 'rgba(0, 0, 0, 0.6)',
                  //     shadowOffsetX: 2,
                  //     shadowOffsetY: 2
                  //   }
                  // }
                  {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100,
                    xAxisIndex: 0
                  },
                  {
                    type: 'inside',
                    realtime: true,
                    start: 30,
                    end: 70,
                    xAxisIndex: 0
                  }
                ],
                series: [
                  {
                    name: '实时负荷',
                    data: realTimeLoads,
                    type: 'line',
                    smooth: true
                  }
                ]
              }
              _this.dom = echarts.init(_this.$refs.dom, 'tdTheme')
              _this.dom.setOption(option)
              on(window, 'resize', _this.resize)
            })
          }
        })
        .catch(err => {
          console.log(err)
          _this.$Message.error('负荷信息查询失败！')
        })
        .finally(() => {
          if (
            _this.isRealLoading &&
            model === 'important' &&
            _this.realLoadDate === formatDate(undefined, 0)
          ) {
            _this.timer = setInterval(_this.getRealLoad, 900000)
            _this.isRealLoading = false
          }
        })
    },
    onCardPageChange (current) {
      this.current = current
      this.getAirList('important')
    },
    onCardPageSizeChange (size) {
      this.pageSize = size
      this.onCardPageChange(1)
    },
    changeHeight: function () {
      this.monitorInforHeight =
        window.innerHeight > 722
          ? 'height: ' + (window.innerHeight - 327) + 'px'
          : 'height: 395px'
      this.contentHeight =
        window.innerHeight > 722
          ? 'height: ' + (window.innerHeight - 400) + 'px'
          : 'height: 350px'
      // this.cardHeight =
      //   window.innerHeight > 722
      //     ? "height: " + (window.innerHeight - 368) + "px"
      //     : "height: 354px";
      // this.infoHeight =
      //   window.innerHeight > 722
      //     ? "height: " + (window.innerHeight - 444) + "px"
      //     : "height: 278px";
    }
  },
  mounted () {
    let _this = this
    let query = _this.$route.query
    _this.unitNo = query.unitNo
    this.changeHeight()
    this.getBaseInfo()
    this.getRealLoad('important')
    this.getAirList('important')
    let that = this
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  },
  watch: {
    $route (newRoute) {
      let _this = this
      // eslint-disable-next-line no-unused-vars
      const { name, query, params, meta } = newRoute
      _this.unitNo = query.unitNo
    }
  }
}
</script>

<style lang="less">
@import "airConditioningDetail.less";
.monitor-info .air-form-box .ivu-radio-inner {
  border-color: #009999;
}

.monitor-info .air-form-box .ivu-radio-inner:after {
  background-color: #009999;
}
</style>
