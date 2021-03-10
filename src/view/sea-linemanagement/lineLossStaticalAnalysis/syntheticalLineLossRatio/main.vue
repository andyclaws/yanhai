<template>
  <div class="synthetical-line-ratio">
  <Form :label-width="100">
    <Row>
      <Col span="6">
        <FormItem label="供电单位" prop="unit" style="width: 280px">
          <Select>
            <Option>

            </Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="3">
        <!--<RadioGroup @on-change="change1" v-model="level1">-->
        <!--<Radio label="province" checked>-->
        <RadioGroup @on-change="change1" >
          <Radio label="province" >
            <span>全省</span>
          </Radio>
          <Radio label="prower" >
            <span>供电所</span>
          </Radio>
        </RadioGroup>
      </Col>
      <Col span="5">
        <RadioGroup>
          <Radio label="day">
            <span>按日统计</span>
          </Radio>
          <Radio label="week">
            <span>按周统计</span>
          </Radio>
          <Radio label="month">
            <span>按月统计</span>
          </Radio>
        </RadioGroup>
      </Col>

      <Col span="5">
        <FormItem label="选择日期">
          <DatePicker type="date" placeholder="选择日期" style="width: 120px"></DatePicker>
        </FormItem>
      </Col>

      <Col span="3">
        <RadioGroup  @on-change="change2" v-model="level2">
          <Radio label="tg">
            <span>台区</span>
          </Radio>
          <Radio label="concentrator">
            <span>集中器</span>
          </Radio>
        </RadioGroup>
      </Col>
      <Col span="2">
        <FormItem :label-width="20">
          <Button type="primary"
                  @click="handleSubmit('formValidate')">{{$t('inquiry')}}
          </Button>
        </FormItem>
      </Col>

    </Row>
  </Form>
    <card class="my-card" >
      <Tables
        ref="tables"
        v-model="nowData"
        :columns="columns"
        :current="current"
        :total="total"
        :pageSizeOpts="pageSizeOpts"
        :pageSize="pageSize"
        :bottomTools="bottomTools"
        @on-change="pageChange"
        @on-page-change="pageChange">
      </Tables>
    </card>
  </div>
</template>

<script>
import Tables from '_c/tables'

export default {
  name: 'main',
  components: {
    Tables
  },
  data () {
    return {
      level1: 'province',
      level2: 'tg',
      form: {
        roleAttrName: ''
      },
      // ruleValidate: {},
      val1: 'province',
      val2: 'tg',
      columns: [
        {
          title: '',
          align: 'center',
          key: 'none',
          children: [
            {
              title: '供电单位',
              key: 'unit',
              width: 200
            }
          ]
        },

        {
          title: '台区综合线损率（不含异常台区）',
          align: 'center',
          key: 'tg_Syn_Ln_L_Rat',
          children: [
            {
              title: '线损率',
              key: 'name'
            },
            {
              title: '供电量',
              key: 'marketNum'
            },

            {
              title: '发电量',
              key: 'PMSNum'
            },
            {
              title: '售电量',
              key: 'PMSName'
            }
          ]
        },
        {
          title: '异常台区（集中器）',
          align: 'center',
          key: 'abnormalTg',
          children: [
            {
              title: '线损不可算（供电量为0）台',
              key: 'warnNum'
            },
            {
              title: '负损（<=0%）台区（集中器）',
              key: 'occurTime'
            }
          ]
        }
      ],
      tabData: [],
      columns_prov: [
        {
          title: '',
          align: 'center',
          key: 'none',
          children: [
            {
              title: '供电单位',
              key: 'unit',
              width: 200
            }
          ]
        },

        {
          title: '台区综合线损率（不含异常台区）',
          align: 'center',
          key: 'tg_Syn_Ln_L_Rat',
          children: [
            {
              title: '线损率',
              key: 'name'
            },
            {
              title: '供电量',
              key: 'marketNum'
            },

            {
              title: '发电量',
              key: 'PMSNum'
            },
            {
              title: '售电量',
              key: 'PMSName'
            }
          ]
        },
        {
          title: '异常台区（集中器）',
          align: 'center',
          key: 'abnormalTg',
          children: [
            {
              title: '线损不可算（供电量为0）台',
              key: 'warnNum'
            },
            {
              title: '负损（<=0%）台区（集中器）',
              key: 'occurTime'
            }
          ]
        }
      ],
      tabData_prov: [
        {
          unit: '六安供电公司',
          name: '独山供电所',
          marketNum: '69780048',
          PMSNum: '1D024C',
          PMSName: '独山变103开关',
          warnNum: 'B相断线',
          occurTime: '2018-08-10'

        },
        {
          unit: '六安供电公司',
          name: '独山供电所',
          marketNum: '69958632',
          PMSNum: '1F024C',
          PMSName: '独山变107开关',
          warnNum: 'A相断线',
          occurTime: '2018-08-12'

        },
        {
          unit: '六安供电公司',
          name: '独山供电所',
          marketNum: '69958632',
          PMSNum: '1F024C',
          PMSName: '独山变107开关',
          warnNum: 'A相断线',
          occurTime: '2018-08-12'

        },
        {
          unit: '六安供电公司',
          name: '独山供电所',
          marketNum: '69958632',
          PMSNum: '1F024C',
          PMSName: '独山变107开关',
          warnNum: 'A相断线',
          occurTime: '2018-08-12'

        },
        {
          unit: '六安供电公司',
          name: '独山供电所',
          marketNum: '69958632',
          PMSNum: '1F024C',
          PMSName: '独山变107开关',
          warnNum: 'A相断线',
          occurTime: '2018-08-12'

        },
        {
          unit: '六安供电公司',
          name: '独山供电所',
          marketNum: '69958632',
          PMSNum: '1F024C',
          PMSName: '独山变107开关',
          warnNum: 'A相断线',
          occurTime: '2018-08-12'

        }
      ],
      columns_prow: [
        {
          title: '',
          align: 'center',
          key: 'none',
          children: [
            {
              title: '市公司',
              key: 'cityCompany'
              // width: 200
            }, {
              title: '上级单位',
              key: 'superiorUnit'
              // width: 200
            },
            {
              title: '供电单位',
              key: 'unit'
              // width: 200
            }
          ]
        },

        {
          title: '台区综合线损率（不含异常台区）',
          align: 'center',
          key: 'tg_Syn_Ln_L_Rat',
          children: [
            {
              title: '线损率',
              key: 'name'
            },
            {
              title: '供电量',
              key: 'marketNum'
            },

            {
              title: '发电量',
              key: 'PMSNum'
            },
            {
              title: '售电量',
              key: 'PMSName'
            }
          ]
        },
        {
          title: '异常台区（集中器）',
          align: 'center',
          key: 'abnormalTg',
          children: [
            {
              title: '线损不可算（供电量为0）台',
              key: 'warnNum'
            },
            {
              title: '负损（<=0%）台区（集中器）',
              key: 'occurTime'
            }
          ]
        }
      ],
      tabData_prow: [
        {
          unit: '六安供电公司',
          name: '独山供电所',
          marketNum: '69780048',
          PMSNum: '1D024C',
          PMSName: '独山变103开关',
          warnNum: 'B相断线',
          occurTime: '2018-08-10'

        },
        {
          unit: '六安供电公司',
          name: '独山供电所',
          marketNum: '69958632',
          PMSNum: '1F024C',
          PMSName: '独山变107开关',
          warnNum: 'A相断线',
          occurTime: '2018-08-12'

        }
      ],
      columns_conc: [
        {
          title: '',
          align: 'center',
          key: 'none',
          children: [
            {
              title: '供电单位',
              key: 'unit',
              width: 200
            }
          ]
        },

        {
          title: '集中器综合线损率（不含异常集中器）',
          align: 'center',
          key: 'tg_Syn_Ln_L_Rat',
          children: [
            {
              title: '线损率',
              key: 'name'
            },
            {
              title: '供电量',
              key: 'marketNum'
            },

            {
              title: '发电量',
              key: 'PMSNum'
            },
            {
              title: '售电量',
              key: 'PMSName'
            }
          ]
        },
        {
          title: '异常集中器',
          align: 'center',
          key: 'abnormalTg',
          children: [
            {
              title: '线损不可算（供电量为0）台',
              key: 'warnNum'
            },
            {
              title: '负损（<=0%）台区（集中器）',
              key: 'occurTime'
            }
          ]
        }
      ],
      tabData_conc: [
        {
          unit: '六安供电公司',
          name: '独山供电所',
          marketNum: '69780048',
          PMSNum: '1D024C',
          PMSName: '独山变103开关',
          warnNum: 'B相断线',
          occurTime: '2018-08-10'

        },
        {
          unit: '六安供电公司',
          name: '独山供电所',
          marketNum: '69958632',
          PMSNum: '1F024C',
          PMSName: '独山变107开关',
          warnNum: 'A相断线',
          occurTime: '2018-08-12'

        }
      ],
      columns_prow_conc: [
        {
          title: '',
          align: 'center',
          key: 'none',
          children: [
            {
              title: '市公司',
              key: 'cityCompany'
              // width: 200
            }, {
              title: '上级单位',
              key: 'superiorUnit'
              // width: 200
            },
            {
              title: '供电单位',
              key: 'unit'
              // width: 200
            }
          ]
        },

        {
          title: '集中器综合线损率（不含异常集中器）',
          align: 'center',
          key: 'tg_Syn_Ln_L_Rat',
          children: [
            {
              title: '线损率',
              key: 'name'
            },
            {
              title: '供电量',
              key: 'marketNum'
            },

            {
              title: '发电量',
              key: 'PMSNum'
            },
            {
              title: '售电量',
              key: 'PMSName'
            }
          ]
        },
        {
          title: '异常集中器',
          align: 'center',
          key: 'abnormalTg',
          children: [
            {
              title: '线损不可算（售电量为0）台',
              key: 'warnNum'
            },
            {
              title: '负损（<=0%）台区（集中器）',
              key: 'occurTime'
            }
          ]
        }
      ],
      tabData_prow_conc: [
        {
          unit: '六安供电公司',
          name: '独山供电所',
          marketNum: '69780048',
          PMSNum: '1D024C',
          PMSName: '独山变103开关',
          warnNum: 'B相断线',
          occurTime: '2018-08-10'

        },
        {
          unit: '六安供电公司',
          name: '独山供电所',
          marketNum: '69958632',
          PMSNum: '1F024C',
          PMSName: '独山变107开关',
          warnNum: 'A相断线',
          occurTime: '2018-08-12'

        }
      ],
      // tableData: [{
      //   remark: 'test'
      // }],
      current: 1,
      total: 0,
      pageSizeOpts: [2, 10, 20, 30, 40, 100],
      pageSize: 2,
      bottomTools: ['page', 'export'],
      showModels: false,
      fullscreen: true,
      draggable: false,
      isAddMenu: true
    }
  },
  methods: {
    // 选项选中台区或者集中器和全省或者供电所页面切换
    change1 (val) {
      if (val === 'province' && this.val2 === 'tg') {
        this.val1 = val
        this.columns = this.columns_prov
        this.tabData = this.tabData_prov
      } else if (val === 'province' && this.val2 === 'concentrator') {
        this.val1 = val
        this.columns = this.columns_conc
        this.tabData = this.tabData_conc
      } else if (val === 'prower' && this.val2 === 'tg') {
        this.val1 = val
        this.columns = this.columns_prow
        this.tabData = this.tabData_prow
      } else if (val === 'prower' && this.val2 === 'concentrator') {
        this.val1 = val
        this.columns = this.columns_prow_conc
        this.tabData = this.columns_prow_conc
      }
    },
    // 选项选中台区或者集中器和全省或者供电所页面切换
    change2 (val) {
      if (val === 'tg' && this.val1 === 'province') {
        this.val2 = val
        this.columns = this.columns_prov
        this.tabData = this.tabData_prov
      } else if (val === 'tg' && this.val1 === 'prower') {
        this.val2 = val
        this.columns = this.columns_prow
        this.tabData = this.tabData_prow
      } else if (val === 'concentrator' && this.val1 === 'prower') {
        this.val2 = val
        this.columns = this.columns_prow_conc
        this.tabData = this.columns_prow_conc
      } else if (val === 'concentrator' && this.val1 === 'province') {
        this.val2 = val
        this.columns = this.columns_conc
        this.tabData = this.tabData_conc
      }
    },
    _getData () {
      // 所有数据
      this.tableData = []
      for (let i = 0; i < 25; i++) {
        let data = {
          id: i + 1,
          unit: '',
          address: '6626221',
          TgNum: '',
          TgName: '',
          adminNum: ''
        }
        this.tableData.push(data)
      }
      // 分页显示所有数据总数
      this.total = this.tableData.length
      // 循环展示页面刚加载时需要的数据条数
      this.nowData = []
      for (let i = 0; i < this.pageSize; i++) {
        this.nowData.push(this.tableData[i])
      }
    },
    // 点击，切换页面
    pageChange (current, pageSize) {
      this.current = current
      this.pageSize = pageSize
      let _start = (current - 1) * this.pageSize
      let _end = current * this.pageSize
      this.nowData = this.tableData.slice(_start, _end)
    },
    // 每页显示的数据条数
    _nowPageSize (index) {
      let _start = (this.pageCurrent - 1) * index
      // 需要显示结束数据的index
      let _end = index * this.pageCurrent
      // 截取需要显示的数据
      this.nowData = this.tableData.slice(_start, _end)
      // 实时获取当前需要显示的条数
      this.pageSize = index
    },

    // 查询按钮点击事件
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  },
  mounted () {
    this._getData()
  }
}
</script>

<style  lang="less">
  .synthetical-line-ratio .ivu-card-body{
    position: relative
  }
  .synthetical-line-ratio .ivu-poptip{
    position: absolute;
    bottom: 16px;
    right: 80px;
    z-index: 999;
  }
  .synthetical-line-ratio .ivu-card-body{
    padding: 8px 16px 16px 16px;
  }
  .synthetical-line-ratio .ivu-card-head button{
    margin-right: 10px;
    margin-bottom: 8px;
  }
  .ivu-table-tbody td,.ivu-table-header th{
    text-align: center;
  }
</style>
