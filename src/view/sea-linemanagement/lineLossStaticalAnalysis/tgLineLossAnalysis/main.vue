<template>
  <div class="tg-line-loss-analysis">
    <Form ref="form" :model="form" :label-width="100">
      <Row>
        <Col span="7">
          <FormItem label="供电单位:" prop="supplyPowerUnit">
            <Select v-model="form.supplyPowerUnit">
              <Option v-for="item in supPowUnitList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="运行状态:" prop="runStatus">
            <Select v-model="form.runStatus">
              <Option v-for="item in runStatusList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="9">
          <FormItem label="线损率:">
            <Select v-model="form.lineLossRate1" @on-change="changeLineLossRate1" style="width: 25%">
              <Option v-for="item in rateList1" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
            <Input v-model="form.lineLossRate1Value" clearable style="width: 15%; margin-left: 5px"></Input> %
            <Select v-model="form.lineLossRate2" :disabled="form.lineLossRate2Flag" style="width: 25%">
              <Option v-for="item in rateList2" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
            <Input v-model="form.lineLossRate2Value" clearable :disabled="form.lineLossRate2Flag" style="width: 15%; margin-left: 5px"></Input> %
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="7">
          <FormItem label="台区编号:" prop="tgNo">
            <Input v-model="form.tgNo" placeholder="--请输入--" clearable  :disabled="form.selectedCompositeUnitFlag"></Input>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="台区名称:" prop="tgName">
            <Input v-model="form.tgName" placeholder="--请输入--" clearable  :disabled="form.selectedCompositeUnitFlag"></Input>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem>
            <RadioGroup v-model="phone">
              <Radio label="全部">
                <span>全部</span>
              </Radio>
              <Radio label="达标">
                <span>达标</span>
              </Radio>
              <Radio label="高损">
                <span>高损</span>
              </Radio>
              <Radio label="异常">
                <span>异常</span>
              </Radio>
              <Radio label="可算">
                <span>可算</span>
              </Radio>
              <Radio label="不可算">
                <span>不可算</span>
              </Radio>
            </RadioGroup>

          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span="7">
          <FormItem label="考核单元名称:" prop="assetNo">
            <Input v-model="form.assetNo" placeholder="--请输入--"></Input>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="查询日期:" prop="queryDate">
            <DatePicker type="date" placeholder="--请选择--" ></DatePicker>
          </FormItem>
        </Col>
        <Col span="9">
          <FormItem>
            <RadioGroup v-model="phone">
              <Radio label="按日">
                <span>按日</span>
              </Radio>
              <Radio label="按周">
                <span>按周</span>
              </Radio>
              <Radio label="按月">
                <span>按月</span>
              </Radio>
              <Radio label="按年">
                <span>按年</span>
              </Radio>
              <Radio label="按时间段">
                <span>按时间段</span>
              </Radio>
            </RadioGroup>
          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span="7">
          <FormItem label="标记:" prop="terminalAddr">
            <Input v-model="form.terminalAddr" placeholder="--请输入--" clearable></Input>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem  prop="compositeUnit">
            <Checkbox
              v-model="compositeUnit"
              @on-change="selectedCompositeUnit">组合单元</Checkbox>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem  prop="eventr">
            <Button type="primary" @click="handleSubmit('formValidate')">{{$t('inquiry')}}</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Card class="my-card">
      <p slot="title">台区全部明细</p>
      <p slot="extra" @click="collapse" style="cursor: pointer">
        <Tooltip :content="!showTmnl ? '展开' : '折叠'">
          <Icon v-if="showTmnl" :size="18" type="md-arrow-dropdown-circle"/>
          <Icon v-else :size="18" type="md-arrow-dropup-circle"/>
        </Tooltip>
      </p>
      <div v-if="showTmnl" :style="{height: height + 'px'}">
        <tg-line-loss-analysis-top></tg-line-loss-analysis-top>
      </div>
    </Card>
    <Card class="my-card">
      <p slot="title"></p>
      <p slot="extra" @click="collapse" style="cursor: pointer">
        <Tooltip :content="showTmnl ? '展开' : '折叠'">
          <Icon v-if="!showTmnl" :size="18" type="md-arrow-dropdown-circle"/>
          <Icon v-else :size="18" type="md-arrow-dropup-circle"/>
        </Tooltip>
      </p>
      <div v-if="!showTmnl" :style="{height: height + 'px'}">
        <div>
          <Menu mode="horizontal" theme="dark" active-name="1" @on-select="tabSelected">
            <MenuItem name="1">考核单元组成</MenuItem>
            <MenuItem name="2">安装情况</MenuItem>
            <MenuItem name="3">抄表分析</MenuItem>
            <MenuItem name="4">异常分析</MenuItem>
            <MenuItem name="5">趋势分析</MenuItem>
          </Menu>
          <div class="tab-sub">
            <tg-line-loss-analysis-bottom v-show="showFlag == 1"></tg-line-loss-analysis-bottom>
            <install-condition v-show="showFlag == 2"></install-condition>
            <analysis-of-meter-reading v-show="showFlag == 3"></analysis-of-meter-reading>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import tgLineLossAnalysisTop from './tgLineLossAnalysisTop/main.vue'
import tgLineLossAnalysisBottom from './tgLineLossAnalysisBottom/assessmentUnitComposition.vue'
import installCondition from './tgLineLossAnalysisBottom/installCondition.vue'
import analysisOfMeterReading from './tgLineLossAnalysisBottom/analysisOfMeterReading.vue'
export default {
  name: 'main',
  components: {
    Tables,
    tgLineLossAnalysisTop,
    tgLineLossAnalysisBottom,
    installCondition,
    analysisOfMeterReading
  },
  data () {
    return {
      compositeUnit: false,
      showTmnl: true,
      rateList1: [
        { code: 0, name: '大于' },
        { code: 1, name: '大于等于' },
        { code: 2, name: '等于' },
        { code: 3, name: '小于等于' },
        { code: 4, name: '小于' }
      ],
      rateList2: [
        { code: 0, name: '小于等于' },
        { code: 1, name: '小于' }
      ],
      supPowUnitList: [
        { code: 0, name: '安徽省电力公司' },
        { code: 1, name: '合肥电力公司' }
      ],
      runStatusList: [
        { code: 0, name: '全部' }
      ],
      // style: {
      //   border: '1px solid #dcdee2',
      //   height: '500px'
      // },
      showFlag: 1,
      parentInfo: {
        topTitle: '计量异常事件明细',
        subTitle: '',
        flag: true
      },
      form: {
        supplyPowerUnit: 0,
        runStatus: 0,
        lineLossRate1: 3,
        lineLossRate1Value: null,
        lineLossRate2Flag: true,
        lineLossRate2: 0,
        lineLossRate2Value: null,
        selectedCompositeUnitFlag: false
      },
      current: 1,
      total: 4,
      pageSizeOpts: [2, 10, 20, 30, 40, 100],
      pageSize: 2,
      bottomTools: ['page', 'export'],
      showModels: false,
      fullscreen: true,
      draggable: false,
      // isAddMenu: true,
      modal2: false,
      modal_loading: false
    }
  },
  methods: {
    changeLineLossRate1 () {
      if (this.form.lineLossRate1 === 2 || this.form.lineLossRate1 === 3 || this.form.lineLossRate1 === 4) {
        this.form.lineLossRate2Flag = true
      } else {
        this.form.lineLossRate2Flag = false
      }
    },
    selectedCompositeUnit () {
      if (this.compositeUnit) {
        this.form.selectedCompositeUnitFlag = true
      } else {
        this.form.selectedCompositeUnitFlag = false
      }
    },
    collapse () {
      this.showTmnl = !this.showTmnl
    },
    changeHeight () {
      this.style.height = (window.innerHeight - 205) + 'px'
    },
    handleInput (params) {
      console.log(params)
    },
    pageChange (current, pageSize) {
      this.current = current
      this.pageSize = pageSize
      console.log(this.current, this.pageSize)
    },
    // addMenu (menuId) {
    //   this.isAddMenu = menuId !== undefined
    //   this.showModels = true
    // },
    // del () {
    //   this.modal_loading = true
    //   setTimeout(() => {
    //     this.modal_loading = false
    //     this.modal2 = false
    //     this.$Message.success('Successfully delete')
    //   }, 2000)
    // },
    tabSelected (name) {
      this.showFlag = name
    }
  },
  mounted () {
    this.changeHeight()
    const that = this
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
  }
}
</script>
<style lang="less">
  .tg-line-loss-analysis .ivu-menu-horizontal{
    height: 40px !important;
    line-height: 40px !important;
  }
  .tg-line-loss-analysis .ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected{
    background-color: #448c86;
  }
  .ivu-table-header th,.ivu-table-fixed-header th{
    text-align: center !important;
  }
  .tg-line-loss-analysis .ivu-card-body{
    position: relative
  }
  .tg-line-loss-analysis .ivu-poptip{
    position: absolute;
    bottom: 0px;
    right: 80px;
    z-index: 999;
  }
  .tg-line-loss-analysis .ivu-table td,.tg-line-loss-analysis .ivu-table th{
    height: 25px;
    text-align: center;
  }
  .tg-line-loss-analysis .my-card .ivu-card-head{
    padding: 3px 0px;
  }
  .tg-line-loss-analysis .ivu-date-picker{
    width: 255px;
  }
</style>
