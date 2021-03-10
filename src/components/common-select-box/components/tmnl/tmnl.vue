<template>
  <div>
    <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="80">
      <Row>
        <Col span="12">
          <FormItem :label="$t('cpNo')" prop="cpNo">
            <Input v-model="form.cpNo" :placeholder="$t('please_input_cpNo')" clearable></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label="$t('cpName')" prop="cpName">
            <Input v-model="form.cpName" :placeholder="$t('please_input_cpName')" clearable></Input>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem :label="$t('cpAddr')" prop="cpAddr">
            <Input v-model="form.cpAddr" :placeholder="$t('please_input_cpAddr')" clearable></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label="$t('cpType')" prop="cpType">
            <Select v-model="form.cpType" :placeholder="$t('please_input_cpType')" clearable>
              <Option v-for="item in cpTypes" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem :label="$t('tmnlAddr')" prop="tmnlAddr">
            <Input v-model="form.tmnlAddr" :placeholder="$t('please_input_tmnlAddr')" clearable></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label="$t('tmnlType')" prop="tmnlType">
            <Select v-model="form.tmnlType" :placeholder="$t('please_input_tmnlType')" clearable>
              <Option v-for="item in tmnlTypes" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem :label="$t('org')" prop="cpName">
            <Poptip trigger="click" placement="bottom" width="305">
              <Input
                search
                enter-button
                v-model="form.orgName"
                :placeholder="$t('please_input_org')"
                style="width: 305px"
              />
              <div slot="content" style="max-height: 500px; overflow-y: auto">
                <orgs
                  :show-refresh-text="false"
                  @on-select="selectOrg"></orgs>
              </div>
            </Poptip>
          </FormItem>
        </Col>
        <Col span="12"></Col>
      </Row>
      <FormItem>
        <span style="float: right">
          <Button type="primary" @click="handleSubmit('formValidate')">{{$t('inquiry')}}</Button>
          <Button type="primary" @click="handleReset('formValidate')" style="margin-left: 8px" v-if="selectMore">{{$t('reset')}}</Button>
          <Button type="primary" @click="selectMoreData('formValidate')" style="margin-left: 8px" v-if="selectMore">{{$t('ok')}}</Button>
        </span>
      </FormItem>
    </Form>
    <tables ref="tables"
            v-model="tableData"
            :columns="columns"
            :current="current"
            :total="total"
            :pageSizeOpts="pageSizeOpts"
            :pageSize="pageSize"
            :bottomTools="bottomTools"
            stripe
            @on-change="pageChange"
            @on-page-change="pageChange"
            @on-row-click="rowClick"
            @on-selection-change="selectionChange"
    />
  </div>
</template>

<script>
import Tables from '../../../tables'
import Orgs from '../org'
export default {
  name: 'cons',
  components: {
    Tables,
    Orgs
  },
  props: {
    selectMore: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      consTypes: [
        {
          code: '01',
          name: '低压'
        }
      ],
      tmnlTypes: [
        {
          code: '5',
          name: '698'
        }
      ],
      protocolCodes: [
        {
          code: '5',
          name: '698'
        }
      ],
      cpTypes: [
        {
          code: '1',
          name: 'test'
        }
      ],
      form: {
        cpNo: '',
        cpName: '',
        cpAddr: '',
        cpType: '',
        tmnlAddr: '',
        tmnlType: '',
        orgName: '',
        orgNo: '',
        orgType: ''
      },
      ruleValidate: {
        consNo: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      },
      selectDatas: [],
      columns: [
        {
          title: '供电单位名称',
          key: 'orgName',
          width: '150'
        },
        {
          title: '供电单位编号',
          key: 'orgNo',
          width: '150'
        },
        {
          title: '用户名称',
          key: 'consName',
          width: '150'
        },
        {
          title: '用户编号',
          key: 'consNo',
          width: '150'
        },
        {
          title: '电表资产号',
          key: 'meterAssetNo',
          width: '150'
        },
        {
          title: '测量点号',
          key: 'mpSn',
          width: '150'
        },
        {
          title: '终端地址',
          key: 'tmnlAddr',
          width: '150'
        }
      ],
      tableData: [{
        consNo: 123
      }],
      current: 1,
      total: 0,
      pageSizeOpts: [10, 20, 50, 100, 200, 500],
      pageSize: 2,
      bottomTools: ['page']
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    pageChange () {},
    selectOrg (data) {
      console.log(data)
    },
    initColumns () {
      if (this.selectMore) {
        let selection = {
          type: 'selection',
          width: 60,
          fixed: 'left',
          align: 'center'
        }
        this.columns = this.columns.concat(selection)
      }
    },
    rowClick (data) {
      if (!this.selectMore) {
        this.$emit('on-select', data)
      }
    },
    selectionChange (data) {
      this.selectDatas = data
    },
    selectMoreData () {
      if (this.selectDatas.length === 0) {
        this.$Message.error('您未选中任何数据!')
      } else {
        this.$emit('on-select', this.selectDatas)
      }
    }
  },
  mounted () {
    this.initColumns()
  }
}
</script>

<style scoped>

</style>
