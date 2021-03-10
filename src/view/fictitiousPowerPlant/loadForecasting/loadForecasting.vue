<template>
  <div class="exceptionAlarmMain loadForecasting-container" id="exceptionAlarmMain">
    <div class="lf-search-box">
      <Form ref="formValidate" :model="searchItem" :label-width="120">
        <Row>
          <Col span="10">
            <div class="report-date-box">
              <p>上报</p>
              <Row>
                <!--<i-col span="12">-->
                  <!--<FormItem label prop="reportingTime">-->
                    <!--<TimePicker-->
                      <!--:value="searchItem.reportingTime"-->
                      <!--@on-change="reportingTimeChange"-->
                      <!--format="HH:mm:ss"-->
                      <!--style="width: 200px"-->
                    <!--&gt;</TimePicker>-->
                  <!--</FormItem>-->
                <!--</i-col>-->
                <Col span="15">
                  <FormItem>
                    <div class="primary-btn" @click="handleSubmit()">上报</div>
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span="14">
            <div class="foreast-dateobject-box">
              <p>预测日期及对象</p>
              <row>
                <Col span="12">
                  <FormItem label="预测日期:">
                    <DatePicker
                      :value="searchItem.forecastDate"
                      @on-change="selectForecastDate"
                      format="yyyy-MM-dd"
                      type="date"
                      :clearable = false
                      placeholder="年-月-日"
                      style="width: 150px"
                    ></DatePicker>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="预测对象:">
                    <Select
                      v-model="searchItem.forecastObjValue"
                      @on-change="forecastObjChange"
                      style="width:150px"
                    >
                      <Option
                        v-for="item in forecastObjOption"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.name }}</Option>
                    </Select>
                  </FormItem>
                </Col>
              </row>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="forecastinfo-box">
      <div class="forecast-info">
        <Card style="width:100%; height: 450px;">
          <div slot="title">
            <div>
              <img src="./images/u2269.png" alt />
            </div>
            <div style="line-height: 19px">
              <span>预测对象信息</span>
            </div>
          </div>
          <div class="f_info">
            <div class="forecast-title">
              <p>基本信息</p>
            </div>
            <div class="detail-box" v-if="isPlant===1">
              <div>
                <div>
                  <p>
                    电厂名称：
                    <span>{{informationPowerPlantData.plantName}}</span>
                  </p>
                </div>
                <div>
                  <p>
                    电厂编号：
                    <span>{{informationPowerPlantData.plantNo}}</span>
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <p>
                    联系人：
                    <span>{{informationPowerPlantData.contactName}}</span>
                  </p>
                  <p>
                    联系电话：
                    <span>{{informationPowerPlantData.phoneNumber}}</span>
                  </p>
                </div>
                <div>
                  <p>
                    法人名称：
                    <span>{{informationPowerPlantData.legalName}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="detail-box" v-if="isPlant===0">
              <div>
                <div>
                  <p>
                    机组名称：
                    <span>{{informationUnitData.unitName}}</span>
                  </p>
                </div>
                <div>
                  <p>
                    机组编号：
                    <span>{{informationUnitData.unitNo}}</span>
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <p>
                    联系人：
                    <span>{{informationUnitData.contactName}}</span>
                  </p>
                  <p>
                    联系电话：
                    <span>{{informationUnitData.phoneNumber}}</span>
                  </p>
                  <p>
                    机组性质：
                    <span>{{informationUnitData.unitAttr}}</span>
                  </p>
                </div>
                <div>
                  <p>
                    所属业主：
                    <span>{{informationUnitData.ownerName}}</span>
                  </p>
                  <p>
                    地理区域：
                    <span>{{informationUnitData.areaNo}}</span>
                  </p>
                  <p>
                    机组类型：
                    <span>{{informationUnitData.unitType}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="statistics">
            <div class="forecast-title">
              <p>统计信息</p>
            </div>
            <div class="detail-box" v-if="isPlant===1">
              <div>
                <p>
                  用户数：
                  <span>{{informationPowerPlantData.userNumber}}</span>
                </p>
                <p>
                  虚拟发电机组数：
                  <span>{{informationPowerPlantData.allUnitCnt}}</span>
                </p>
              </div>
              <div>
                <p>
                  累计发电量：
                  <span>{{informationPowerPlantData.genCapAll}}</span>
                </p>
                <p>
                  累计发电次数：
                  <span>{{informationPowerPlantData.genCntAll}}</span>
                </p>
              </div>
            </div>
            <div class="detail-box" v-if="isPlant===0">
              <div>
                <p>
                  今日能耗：
                  <span>{{informationUnitData.energy}}</span>
                </p>
                <p>
                  在线状态：
                  <span>{{informationUnitData.onlineState}}</span>
                </p>
              </div>
              <div>
                <p>
                  累计发电量：
                  <span>{{informationUnitData.genCapAll}}</span>
                </p>
                <p>
                  累计发电次数：
                  <span>{{informationUnitData.genCntAll}}</span>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div class="forecast-chart">
        <Card style="width:100%; height: 450px;">
          <div slot="title">
            <div>
              <div>
                <img src="./images/u2269.png" alt />
              </div>
              <div>
                <span>负荷预测</span>
              </div>
            </div>
          </div>
          <div class="chart-info">
            <!-- <div class="lineUnit">单位: kW</div> -->
            <load-forecasting-charts :loadForecastingData="loadForecastingData"></load-forecasting-charts>
            <load-forecast-margin-control-charts :upMarginData="upMarginData" :downMarginData="downMarginData"></load-forecast-margin-control-charts>
          </div>
        </Card>
      </div>
    </div>
    <div class="forecastTable-box">
      <Card style="width:100%; height: 247px; margin-top: 20px;" :style="cardHeight">
        <div slot="title">
          <div>
            <div>
              <img src="./images/u2269.png" alt />
            </div>
            <div>
              <span>负荷预测信息</span>
            </div>
          </div>
        </div>
        <Table
          border
          stripe
          :columns="forecastColumns"
          :data="forecastData"
          width="100%"
          :height="tableHeight"
        ></Table>
      </Card>
    </div>
  </div>
</template>

<script>
import loadForecastingCharts from './loadForecastingCharts'
import loadForecastMarginControlCharts from './loadForecastMarginControlCharts'
import axios from '@/libs/api.request'
import { judgeNull } from '../util.js'
export default {
  name: 'loadForecasting',
  components: {
    loadForecastingCharts,
    loadForecastMarginControlCharts
  },
  data () {
    return {
      searchItem: {
        reportingTime: '',
        forecastDate: '',
        forecastObjValue: ''
      },
      forecastObjOption: [],
      loadForecastingData: [],
      isPlant: 1,
      informationPowerPlantData: { // 电厂基本信息
        plantName: '',
        contactName: '',
        phoneNumber: '',
        plantNo: '',
        legalName: '',
        userNumber: '',
        allUnitCnt: '',
        genCapAll: '',
        genCntAll: ''
      },
      informationPowerPlantDataBak: { // 电厂基本信息
        plantName: '',
        contactName: '',
        phoneNumber: '',
        plantNo: '',
        legalName: '',
        userNumber: '',
        allUnitCnt: '',
        genCapAll: '',
        genCntAll: ''
      },
      informationUnitData: { // 机组基本信息
        unitName: '',
        contactName: '',
        phoneNumber: '',
        unitAttr: '',
        unitNo: '',
        ownerName: '',
        areaNo: '',
        unitType: '',
        energy: '',
        onlineState: '',
        genCapAll: '',
        genCntAll: ''
      },
      informationUnitDataBak: { // 机组基本信息
        unitName: '',
        contactName: '',
        phoneNumber: '',
        unitAttr: '',
        unitNo: '',
        ownerName: '',
        areaNo: '',
        unitType: '',
        energy: '',
        onlineState: '',
        genCapAll: '',
        genCntAll: ''
      },
      upMarginData: [],
      downMarginData: [],
      tableForecastData: [],
      tableUpMarginData: [],
      tableDownMarginData: [],
      forecastColumns: [
        {
          title: '',
          key: '',
          width: '150px',
          align: 'center',
          className: 'first-row-column-date',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                width: '150px',
                height: '40px',
                color: '#009999',
                background: '#f2f2f2',
                marginLeft: '-18px',
                lineHeight: '40px',
                fontWeight: 'bold'
              }
            }, this.searchItem.forecastDate)
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    width: '150px',
                    height: '40px',
                    color: '#009999',
                    background: '#f2f2f2',
                    marginLeft: '-18px',
                    lineHeight: '40px',
                    fontWeight: 'bold'
                  }
                },
                '负荷/kW'
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    width: '150px',
                    height: '40px',
                    color: '#009999',
                    background: '#f2f2f2',
                    marginLeft: '-18px',
                    lineHeight: '40px',
                    fontWeight: 'bold'
                  }
                },
                '上调裕度/kW'
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    width: '150px',
                    height: '40px',
                    color: '#009999',
                    background: '#f2f2f2',
                    marginLeft: '-18px',
                    lineHeight: '40px',
                    fontWeight: 'bold'
                  }
                },
                '下调裕度/kW'
              )
            }
          }
        },
        {
          title: '',
          key: '00:00',
          align: 'center',
          width: '100',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                color: '#009999',
                fontWeight: 'bold'
              }
            }, '00:00')
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableForecastData[0]
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableUpMarginData[0]
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableDownMarginData[0]
              )
            }
          }
        },
        {
          title: '',
          key: '02:00',
          align: 'center',
          width: '100',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                color: '#009999',
                fontWeight: 'bold'
              }
            }, '02:00')
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableForecastData[1]
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableUpMarginData[0]
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableDownMarginData[0]
              )
            }
          }
        },
        {
          title: '',
          key: '04:00',
          align: 'center',
          width: '100',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                color: '#009999',
                fontWeight: 'bold'
              }
            }, '04:00')
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableForecastData[2]
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableUpMarginData[1]
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableDownMarginData[1]
              )
            }
          }
        },
        {
          title: '',
          key: '06:00',
          align: 'center',
          width: '100',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                color: '#009999',
                fontWeight: 'bold'
              }
            }, '06:00')
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableForecastData[3]
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableUpMarginData[1]
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableDownMarginData[1]
              )
            }
          }
        },
        {
          title: '',
          key: '08:00',
          align: 'center',
          width: '100',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                color: '#009999',
                fontWeight: 'bold'
              }
            }, '08:00')
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableForecastData[4]
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableUpMarginData[2]
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableDownMarginData[2]
              )
            }
          }
        },
        {
          title: '',
          key: '10:00',
          align: 'center',
          width: '100',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                color: '#009999',
                fontWeight: 'bold'
              }
            }, '10:00')
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableForecastData[5]
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableUpMarginData[2]
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableDownMarginData[2]
              )
            }
          }
        },
        {
          title: '',
          key: '12:00',
          align: 'center',
          width: '100',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                color: '#009999',
                fontWeight: 'bold'
              }
            }, '12:00')
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableForecastData[6]
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableUpMarginData[3]
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableDownMarginData[3]
              )
            }
          }
        },
        {
          title: '',
          key: '14:00',
          align: 'center',
          width: '100',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                color: '#009999',
                fontWeight: 'bold'
              }
            }, '14:00')
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableForecastData[7]
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableUpMarginData[3]
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableDownMarginData[3]
              )
            }
          }
        },
        {
          title: '',
          key: '16:00',
          align: 'center',
          width: '100',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                color: '#009999',
                fontWeight: 'bold'
              }
            }, '16:00')
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableForecastData[8]
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableUpMarginData[4]
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableDownMarginData[4]
              )
            }
          }
        },
        {
          title: '',
          key: '18:00',
          align: 'center',
          width: '100',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                color: '#009999',
                fontWeight: 'bold'
              }
            }, '18:00')
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableForecastData[9]
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableUpMarginData[4]
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableDownMarginData[4]
              )
            }
          }
        },
        {
          title: '',
          key: '20:00',
          align: 'center',
          width: '100',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                color: '#009999',
                fontWeight: 'bold'
              }
            }, '20:00')
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableForecastData[10]
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableUpMarginData[5]
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableDownMarginData[5]
              )
            }
          }
        },
        {
          title: '',
          key: '22:00',
          align: 'center',
          width: '100',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                color: '#009999',
                fontWeight: 'bold'
              }
            }, '22:00')
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableForecastData[11]
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableUpMarginData[5]
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableDownMarginData[5]
              )
            }
          }
        },
        {
          title: '',
          key: '24:00',
          align: 'center',
          width: '100',
          renderHeader: (h, index) => {
            return h('div', {
              style: {
                color: '#009999',
                fontWeight: 'bold'
              }
            }, '24:00')
          },
          render: (h, params) => {
            if (params.index == 0) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableForecastData[12]
              )
            }
            if (params.index == 1) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableUpMarginData[6]
              )
            }
            if (params.index == 2) {
              return h(
                'div',
                {
                  style: {
                    fontWeight: 'bold'
                  }
                },
                this.tableDownMarginData[6]
              )
            }
          }
        }
      ],
      forecastData: [
        {
          '00:00': '',
          '02:00': '',
          '04:00': '',
          '06:00': '',
          '08:00': '',
          '10:00': '',
          '12:00': '',
          '14:00': '',
          '16:00': '',
          '18:00': '',
          '20:00': '',
          '22:00': '',
          '24:00': ''
        },
        {
          '00:00': '',
          '02:00': '',
          '04:00': '',
          '06:00': '',
          '08:00': '',
          '10:00': '',
          '12:00': '',
          '14:00': '',
          '16:00': '',
          '18:00': '',
          '20:00': '',
          '22:00': '',
          '24:00': ''
        },
        {
          '00:00': '',
          '02:00': '',
          '04:00': '',
          '06:00': '',
          '08:00': '',
          '10:00': '',
          '12:00': '',
          '14:00': '',
          '16:00': '',
          '18:00': '',
          '20:00': '',
          '22:00': '',
          '24:00': ''
        }
      ],
      showPowerPlant: true,
      showBaoLong: false,
      showBaoLongTwo: false,
      cardHeight: 'height: 247px;',
      tableHeight: '160'
    }
  },
  mounted () {
    this.changeHeight()
    let that = this
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
    // 默认第二天日期
    this.searchItem.forecastDate = this.getDate()
    // 加载预测对象下拉
    this.loadForecastObjOption()
  },
  methods: {
    removeNull (val) {
      return judgeNull(val, '')
    },
    getDate () {
      let nowDate = new Date()
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      let day = nowDate.getDate() + 1
      if (day <= 9) {
        day = '0' + day
      }
      return year + '-' + month + '-' + day
    },
    // 加载预测对象下拉
    loadForecastObjOption () {
      axios.request({
        url: 'ldfc/getPlantAndUnit',
        method: 'get'
      }).then(res => {
        if (res.data.code === 200) {
          this.forecastObjOption = res.data.data
          this.searchItem.forecastObjValue = res.data.data[0].value
          // 加载数据
          this.loadObjectQuery()
        }
      })
    },
    changeHeight: function () {
      this.cardHeight =
        window.innerHeight > 722
          ? 'height: ' + (window.innerHeight - 475) + 'px'
          : 'height: 247px'
      this.tableHeight =
        window.innerHeight > 722 ? window.innerHeight - 565 : 160
    },
    // 上报
    handleSubmit () {
      axios.request({
        url: 'ldfc/reportRegularly',
        method: 'post'
      }).then(res => {
        if (res.data.code === 200 && res.data.success) {
          this.$Message.success('上报成功!')
        } else {
          this.$Message.error('上报失败')
        }
      })
    },
    // 预测日期选择
    selectForecastDate (val) {
      this.searchItem.forecastDate = val
      this.loadObjectQuery()
    },
    // 预测对象选择
    forecastObjChange (val) {
      this.searchItem.forecastObjValue = val
      this.loadObjectQuery()
    },
    loadObjectQuery () {
      if (this.searchItem.forecastObjValue === this.forecastObjOption[0].value) {
        this.isPlant = 1
      } else {
        this.isPlant = 0
      }
      let params = {
        forecastDate: this.searchItem.forecastDate,
        isPlant: this.isPlant,
        predictObject: this.searchItem.forecastObjValue
      }
      axios.request({
        url: 'ldfc/loadObjectQuery',
        data: params,
        method: 'post'
      }).then(res => {
        if (res.status === 200) {
          if (this.isPlant === 1) {
            this.informationPowerPlantData = res.data.loadObjectInformationPowerPlantResp === null ? this.informationPowerPlantDataBak : res.data.loadObjectInformationPowerPlantResp
          } else {
            this.informationUnitData = res.data.loadObjectInformationUnitResp === null ? this.informationUnitDataBak : res.data.loadObjectInformationUnitResp
          }
          this.loadForecastingData = res.data.point96Resp === null ? [] : res.data.point96Resp
          this.upMarginData = res.data.upList === null ? [] : res.data.upList
          this.downMarginData = res.data.downList === null ? [] : res.data.downList
          // table表--负荷预测数据
          let divines = this.loadForecastingData.map(_ => this.removeNull(_.pointValue))
          // table表--上调裕度数据
          this.tableUpMarginData = this.upMarginData.map(_ => this.removeNull(_.pointValue))
          this.tableUpMarginData.unshift(this.tableUpMarginData[0])
          // table表--下调裕度数据
          this.tableDownMarginData = this.downMarginData.map(_ => this.removeNull(_.pointValue))
          this.tableDownMarginData.unshift(this.tableDownMarginData[0])
          this.tableForecastData = []
          for (let i = 0; i < divines.length; i++) {
            if ((i + 1) % 8 === 0) {
              this.tableForecastData.push(divines[i])
            }
          }
          this.tableForecastData.unshift(divines[0])
        }
      })
    },
    reportingTimeChange (date) {
      this.searchItem.reportingTime = date
    }
  }
}
</script>

<style lang="less">
@import "loadForecasting.less";
</style>
