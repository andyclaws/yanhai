<template>
  <div style="width:100%;height:100%;background:white">

    <Form ref="formValidate" :model="form" :label-width="100">
      <Row>
        <Col span="4">
          <FormItem :label="$t('日志等级')" prop="status">
            <Select v-model="form.logLevel" :placeholder="$t('please_input_status')" clearable>
              <Option v-for="item in logLevels" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem :label="$t('类名')" prop="title">
            <Input v-model="form.class" :placeholder="$t('请输入...')" clearable></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem :label="$t('日志内容')" prop="title">
            <Input v-model="form.rest" :placeholder="$t('请输入...')" clearable></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem :label-width="20">
            <Button type="primary" @click="query">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Tables border ref="tables" :axiosUrl="axiosUrl" :axiosData="axiosData" :height="tableHeight" :columns="columns" />
    <!-- 表格 -->
    <!-- 分页 -->
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
export default {
  name: 'operate-log',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {
          title: '日志等级等级',
          key: 'logLevel',
          sortable: true,
          // width必须传入，此width用于调整表格每一列的宽度
          width: 200
        },
        {
          title: '应用名称',
          key: 'serviceName'
        },
        {
          title: '类名',
          key: 'class'
        },
        {
          title: '方法名',
          key: 'thread'
        },
        {
          title: '地址',
          key: 'host'
        },
        {
          title: '日志内容',
          key: 'rest'
        },
        {
          title: '创建时间',
          key: 'createTime'
        }
      ],
      operatedata: [
        {
          name: 'joseifu',
          operate: '查询',
          type: 9,
          target: '审核表1',
          time: 2018,
          operatetime: 2019,
          ipaddress: '114.114.114.114'
        },
        {
          name: 'josida',
          operate: '查询',
          type: 9,
          target: '审核表1',
          time: 2018,
          operatetime: 2019,
          ipaddress: '114.114.114.114'
        },
        {
          name: 'dio',
          operate: '查询',
          type: 9,
          target: '审核表1',
          time: 2018,
          operatetime: 2019,
          ipaddress: '114.114.114.114'
        }
      ],
      logLevels: [
        {
          code: 'INFO',
          name: 'INFO'
        },
        {
          code: 'WARN',
          name: 'WARN'
        },
        {
          code: 'ERROR',
          name: 'ERROR'
        }
      ],
      form: {
        logLevel: '',
        class: '',
        createTime: '',
        rest: ''
      },
      tableData: [],
      current: 1,
      total: 0,
      pageSizeOpts: [2, 10, 20, 30, 40, 100],
      pageSize: 2,
      bottomTools: ['page', 'export'],
      tableHeight: 600,
      axiosUrl: '',
      axiosData: {}
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    handleInput (params) {
      console.log(params)
    },
    pageChange (current, pageSize) {
      this.current = current
      this.pageSize = pageSize
      console.log(this.current, this.pageSize)
    },
    query () {
      let formData = {
        'logLevel': this.form.logLevel,
        'className': this.form.class,
        'rest': this.form.rest
      }
      this.form.input = formData
      this.axiosUrl = 'sea-log/sys/list'
      this.axiosData = this.form
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
    }
  },
  mounted () {
    getTableData().then(res => {
      let data = res.data
      this.tableData = data.data
      this.total = data.data.length
    })
  }
}
</script>
<style scoped lang="less">
@import "./operate-log.less";
</style>
