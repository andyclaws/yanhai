<template>
  <div class="detailTable">
    <Form ref="form" :model="form" :label-width="100">
      <Row>
        <Col span="9">
          <FormItem label="供电单位" prop="orgName">
            <Poptip trigger="click" placement="bottom" >
              <Input search enter-button v-model="searchBarForm.orgName"
                     :placeholder="$t('please_input_org')" style="width: 100%"/>
              <div slot="content" style="max-height: 300px; overflow-y: auto">
                <orgs :show-refresh-text="false" @on-select="selectOrg"></orgs>
              </div>
            </Poptip>
          </FormItem>
        </Col>
        <Col span="9">
          <FormItem label="台区经理:" prop="tgManager">
            <Input style="width: 90%" v-model="tgManager" placeholder="--请输入--" clearable ></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="18">
          <FormItem label="线损率:">
            <RadioGroup v-model="lineLossRate" @on-change="test">
              <Radio label="noSu">
                <span>不合格台区</span>
              </Radio>
              <Radio label="high">
                <span>高损台区</span>
              </Radio>
              <Radio label="minus">
                <span>负损台区</span>
              </Radio>
              <Radio label="nocal">
                <span>不可算台区</span>
              </Radio>
              <Radio label="interval">
                <span>线损率区间</span>
              </Radio>
            </RadioGroup>
<!--
            <Input style="width:15%" v-model="form.minLossInterval" placeholder="线损率区间"   :disabled="form.selectedCompositeUnitFlag"></Input>~
-->
            <InputNumber style="width:15%" :max="200" placeholder="线损率区间" :min="0.0" :step="0.1" v-model="firstNum"
                         :disabled="form.selectedCompositeUnitFlag" clearable></InputNumber>%
            <InputNumber style="width:15%" :max="200" placeholder="线损率区间" :min="0.0" :step="0.1" v-model="secondNum"
                         :disabled="form.selectedCompositeUnitFlag" clearable></InputNumber>
            <!--<label>~</label>-->
            <!--<Input style="width:15%" v-model="form.maxLossInterval" placeholder="线损率区间" clearable  :disabled="form.selectedCompositeUnitFlag"></Input>%-->
            <!--<label>%</label>-->
          </FormItem>
        </Col>
        <!--<Col span="7">-->
          <!--<FormItem>-->
             <!---->
          <!--</FormItem>-->
        <!--</Col>-->
        <Col span="4">
          <FormItem  prop="eventr">
            <Button type="primary" @click="handleSubmit('formValidate')">{{$t('inquiry')}}</Button>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="18">
          <FormItem label="时间范围:">
            <!--<RadioGroup v-model="timeRate">
              <Radio label="上月">
                <span>上月</span>
              </Radio>
              <Radio label="连续三月">
                <span>连续三月</span>
              </Radio>
              <Radio label="时间区间">
                <span>时间区间</span>
              </Radio>
            </RadioGroup>-->
            <DatePicker
                        :value="monthDateS"
                        format="yyyy-MM"
                        type="month"
                        placeholder="选择日期"
                        @on-change="changeMonthDateS"/>
            <label>~</label>
            <DatePicker
                        :value="monthDateE"
                        format="yyyy-MM"
                        type="month"
                        placeholder="选择日期"
                        @on-change="changeMonthDateE"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
<card>
  <p slot="title" class="headTitle">台区明细</p>
  <Tables
    ref="tables"
    editable
    v-model="nowData"
    :columns="backlogColumns"
    :axiosUrl="axiosUrl"
    :axiosData="axiosData"
  />
</card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
import { dateToString } from '@/libs/index'
import Orgs from '_c/common-select-box/components/org/org.vue'

export default {
  name: 'detailTable',
  components: {
    axios,
    Tables,
    Orgs
  },
  data () {
    return {
      axiosUrl: '/sea-lineLose/tgLineLoseDetail/tgPlanDefend/noPlanTg',
      axiosData: {},
      lineLossRate: 'high',
      firstNum: 0.0,
      secondNum: 10.0,
      tgManager: '',
      monthDateS: dateToString(new Date(), true),
      monthDateE: dateToString(new Date(), true),
      timeRate: '',
      searchBarForm: {
        'orgName': this.$store.state.auth.orgName,
        'orgNo': this.$store.state.auth.orgNo,
        'orgType': this.$store.state.auth.orgType,
        'lineLossRate': '',
        'tgManager': '',
        'firstNum': '',
        'secondNum': '',
        'monthDateS': '',
        'monthDateE': ''
      },
      backlogColumns: [
        {
          title: '台区所属单位',
          key: 'orgName',
          width: 100
        },
        {
          title: '台区编号',
          key: 'tgNo',
          width: 100
        }, {
          title: '台区名称',
          key: 'tgName',
          width: 100
        }, {
          title: '上月线损率',
          key: 'lastMonthLoss',
          width: 100
        }, {
          title: '线损状态',
          key: 'dealFlag',
          width: 100
        }, {
          title: '台区经理',
          key: 'managerName',
          width: 100
        }, {
          title: '联系方式',
          key: 'phone',
          width: 100
        }, {
          title: '线损趋势',
          key: 'trend',
          width: 100
        }, {
          title: '系统任务',
          key: 'test',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  href: '#',
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.insertToTgPlan(params)
                  }
                }
              }, '加入计划')
            ])
          }
        }, {
          title: '任务派发人',
          key: 'people',
          width: 100
        }
      ],
      form: {
        Org: '',
        tgManager: '',
        selectedCompositeUnitFlag: true
      },
      nowData: [],
      current: 1,
      total: 4,
      pageSize: 2,
      showFlag: 1
    }
  },
  created () {
    this.dealColumns()
    this.getTableData()
  },
  methods: {
    insertToTgPlan (params) {
      axios.request({
        method: 'post',
        data: {
          tgId: params.row.tgId
        },
        url: '/sea-lineLose/tgLineLoseDetail/tgPlanDefend/checkNoPlanTg'
      }).then(res => {
        if (res.data.data === false) {
          this.$Message.error('该台区已在治理计划中')
        } else {
          axios.request({
            method: 'post',
            data: {
              tgId: params.row.tgId
            },
            url: '/sea-lineLose/tgLineLoseDetail/tgPlanDefend/noPlanTgInsertToPlanTg'
          }).then(res => {
            if (res.data.data === false) {
              this.$Message.error('加入到治理计划当中失败')
            } else {
              this.$Message.error('加入成功')
            }
          })
        }
      })
    },
    test (value) {
      if (value === 'interval') {
        this.form.selectedCompositeUnitFlag = false
      } else {
        this.form.selectedCompositeUnitFlag = true
      }
      this.searchBarForm.lineLossRate = value
    },
    changeMonthDateS (value) {
      this.searchBarForm.monthDateS = value
    },
    changeMonthDateE () {
      this.searchBarForm.monthDateE = value
    },
    handleSubmit () {
      this.searchBarForm.lineLossRate = this.lineLossRate
      this.searchBarForm.firstNum = this.firstNum
      this.searchBarForm.secondNum = this.secondNum
      this.searchBarForm.tgManager = this.tgManager
      this.axiosData = this.searchBarForm
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
    },
    selectOrg (data) {
      this.searchBarForm.orgName = data.orgName
      this.searchBarForm.orgNo = data.orgNo
      this.searchBarForm.orgType = data.orgType
    },
    dealColumns () {
      const column = {
        title: '接受人',
        key: 'CLOSE_SFAFF_NO',
        width: 100
      }
      this.flowColumns = this.backlogColumns.slice(0)
      this.flowColumns.splice(1, 0, column)
    },
    getTableData () {
      console.log(this.searchBarForm)
      this.searchBarForm.lineLossRate = this.lineLossRate
      this.searchBarForm.monthDateE = this.monthDateE
      this.searchBarForm.monthDateS = this.monthDateS
      this.searchBarForm.firstNum = this.firstNum
      this.searchBarForm.secondNum = this.secondNum
      this.searchBarForm.tgManager = this.tgManager
      this.axiosData = this.searchBarForm
    },
    tabSelected (name) {
      this.showFlag = name
    }
  }

}
</script>

<style scoped>

</style>
