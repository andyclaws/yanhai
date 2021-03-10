<template>
  <!--台区分相线损-->
  <div class="tgPqPhase">
    <Menu mode="horizontal"
          theme="dark"
          active-name="1"
          @on-select="tabSelected">
      <MenuItem name="1">台区分相线损统计</MenuItem>
      <MenuItem name="2">台区分相线损明细</MenuItem>
    </Menu>
    <!--顶部查询form-->
    <Form ref="searchForm"
          :rules="ruleValidate"
          :model="searchForm"
          :label-width="100">
      <Row>
        <Col span="8">
          <FormItem label="节点名称："
                    prop="nodeName">
            <Poptip v-model="showOrgFlag"
                    trigger="click"
                    placement="bottom"
            >
              <Input search
                     enter-button
                     v-model="searchForm.orgName"
                     :placeholder="$t('please_input_org')"
                     style="width: 150%;margin-top: 3px;"/>
              <div slot="content"
                   style="max-height: 300px; overflow-y: auto">
                <orgs :show-refresh-text="false"
                      @on-select="selectOrg"></orgs>
              </div>
            </Poptip>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="日期："
                    prop="selectDate">
            <DatePicker type="date"
                        :value="searchForm.selectDate"
                        @on-change="searchForm.selectDate=$event"
                        :clearable=false
                        :options="selectDateDayOptions"
                        placeholder="默认当日"
                        style="width: 100%"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8"
             v-show="showFlag == 2">
          <FormItem label="台区编号："
                    prop="tgId">
            <Input v-model="searchForm.tgId"
                   placeholder="请输入台区编号"
                   clearable></Input>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="8"
             v-show="showFlag == 1">
          <FormItem label="线损维度："
                    prop="lineLossDimension">
            <Select v-model="searchForm.lineLossDimension"
                    placeholder="请选择线损维度">
              <Option v-for="item in lineLossDimensionList"
                      :value="item.code"
                      :key="item.code">{{ item.name }}
              </Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="8"
             v-show="showFlag == 2">
          <FormItem label="台区名称："
                    prop="tgName">
            <Input v-model="searchForm.tgName"
                   placeholder="请输入台区名称"
                   clearable></Input>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="责任人工号"
                    prop="respEmpNo">
            <Input v-model="searchForm.respEmpNo"
                   placeholder="请输入责任人工号"
                   clearable></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem>
            <Button type="primary"
                             v-show="showFlag == 1"
                             class="margin-right-3"
                             @click="queryStat('searchForm')">查询
          </Button>
            <Button type="primary"
                    v-show="showFlag == 2"
                    class="margin-right-3"
                    @click="queryDetail('searchForm')">查询
            </Button>
          </FormItem>
        </Col>

      </Row>
    </Form>

    <div class="top"
         v-show="showFlag == 1">
      <h4 class="h4">{{panelTitle}}</h4>
    </div>
    <div class="barCharts"
         v-show="showFlag == 1">
      <RadioGroup v-model="phase"
                  vertical
                  @on-change="phaseChanged">
        <Radio label="A">
          <span>A相</span>
        </Radio>
        <Radio label="B">
          <span>B相</span>
        </Radio>
        <Radio label="C">
          <span>C相</span>
        </Radio>
      </RadioGroup>
      <!--放置柱状图-->
      <bar-chart class="barChart" :refreshDataTrigger="refreshDataTrigger" :queryItems="queryItems"></bar-chart>
    </div>
    <div class="top">
      <h4 class="h4">{{panelTitle2}}</h4>
    </div>
    <stat-table ref="statTable" v-show="showFlag == 1" :axiosData="axiosData"></stat-table>
    <detail-table ref="detailTable" v-show="showFlag == 2" :axiosData="axiosData"></detail-table>
  </div>
</template>
radio
<script>
import Tables from '_c/tables'
import barChart from './barChart.vue'
import detailTable from './detailTable.vue'
import { formatDate } from '@/libs/index.js'
import statTable from './statTable.vue'
export default {
  components: {
    Tables,
    barChart,
    detailTable,
    statTable,
    Orgs: () => import('_c/common-select-box/components/org/org.vue')
  },
  data () {
    return {
      name: 'tgPqPhase',
      // columnsFlag: true,
      axiosUrl: '',
      axiosData: {},
      panelTitle: '台区线损监测',
      panelTitle2: '责任人维度线损统计',
      showFlag: 1,
      showOrgFlag: false,
      // 表单对象
      searchForm: {
        'orgNo': this.$store.state.auth.orgNo, // 供电单位
        'orgName': this.$store.state.auth.orgName,
        'orgType': this.$store.state.auth.orgType,
        'selectDate': formatDate(undefined, undefined),
        'tgId': '',
        'lineLossDimension': '0',
        'tgName': '',
        'respEmpNo': ''
      },
      // 验证
      ruleValidate: {
        orgName: [
          { required: true, message: '供电单位名称不能为空', trigger: 'blur' }
        ]
      },
      // 责任人和供电单位
      lineLossDimensionList: [
        {
          code: '0',
          name: '责任人'

        },
        {
          code: '1',
          name: '供电单位'
        }
      ],
      // 日期插件默认选项
      selectDateDayOptions: {
        shortcuts: [
          {
            text: '今天',
            value () {
              return new Date()
            }
          }, {
            text: '昨日',
            value () {
              let date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              return date
            }
          }, {
            text: '上周',
            value () {
              let date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              return date
            }
          }
        ]
      },
      // 单选按钮
      phase: 'A',
      // 联动柱状图渲染
      refreshDataTrigger: true,
      // 柱状图请求参数
      queryItems: {
        'orgNo': '',
        'orgName': '',
        'orgType': '',
        'statDate': '',
        'phase': this.phase, // 相位
        'respEmpNo': ''
      }
    }
  },
  methods: {
    selectOrg (data) {
      this.searchForm.orgName = data.orgName
      this.searchForm.orgNo = data.orgNo
      this.searchForm.orgType = data.orgType
      this.showOrgFlag = false
    },
    // 顶部导航切换
    tabSelected (name) {
      this.showFlag = name
      if (name === '2') {
        this.panTitleCache = this.panelTitle2
        this.panelTitle2 = '台区分相线损明细' // 记录下标题
      } else {
        this.panelTitle2 = this.panTitleCache // 返回记录的标题
      }
    },
    // 查询统计表
    queryStat: function (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.searchForm.lineLossDimension === '0') {
            // 如果是责任人
            this.panelTitle2 = '责任人维度线损统计'
            // this.columnsFlag = true
          } else if (this.searchForm.lineLossDimension === '1') {
            // 如果是供电单位
            this.panelTitle2 = '供电单位维度分相线损统计'
            // 隐藏责任人列
            // this.columnsFlag = false
          }
          let param = {
            'orgNo': this.searchForm.orgNo,
            'orgName': this.searchForm.orgName,
            'orgType': this.searchForm.orgType,
            'respEmpNo': this.searchForm.respEmpNo,
            'statDate': this.searchForm.selectDate
          }
          this.axiosData = param
          this.$nextTick(() => {
            // 调用统计表查询
            this.$refs['statTable'].$refs.statTables.queryTableData()
            // 柱状图
            this.queryItems.orgNo = this.searchForm.orgNo
            this.queryItems.orgName = this.searchForm.orgName
            this.queryItems.orgType = this.searchForm.orgType
            this.queryItems.phase = this.phase
            this.queryItems.statDate = this.searchForm.selectDate
            this.queryItems.respEmpNo = this.searchForm.respEmpNo
            this.refreshDataTrigger = !this.refreshDataTrigger
          })
        } else {
          this.$Message.error('请补充查询条件')
        }
      })
    },
    // 查询明细表
    queryDetail (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let param = {
            'orgNo': this.searchForm.orgNo,
            'orgName': this.searchForm.orgName,
            'orgType': this.searchForm.orgType,
            'respEmpNo': this.searchForm.respEmpNo,
            'statDate': this.searchForm.selectDate,
            'tgId': this.searchForm.tgId,
            'tgName': this.searchForm.tgName
          }
          this.axiosData = param
          this.$nextTick(() => {
            // 调用明细表查询
            this.$refs['detailTable'].$refs.detailTable.queryTableData()
          })
        } else {
          this.$Message.error('请补充查询条件')
        }
      })
    },
    // 相位切换，渲染柱状图
    phaseChanged () {
      console.log('相位', this.phase)
      // 重新获取请求参数并传给子组件
      this.queryItems.phase = this.phase
      // 子组件柱状图渲染
      this.refreshDataTrigger = !this.refreshDataTrigger
    }
  },
  mounted () {
    this.queryStat('searchForm')
  }
}
</script>

<style lang="less">
  .deal-overdue .ivu-menu-horizontal {
    height: 40px !important;
    line-height: 40px !important;
  }

  .top {
    background-color: #448c86;
    height: 30px;
    width: 100%;
  }

  .h4 {
    color: white;
    font-size: 15px;
    padding-left: 5px;
    padding-top: 5px;
    float: left;
  }

  .barChart {
    margin-top: -50px;
    margin-left: 130px;
    height: 250px;
    width: 100%;
  }
  .ivu-poptip-content{
    height: 200px;
    overflow-y: scroll;
  }
</style>
