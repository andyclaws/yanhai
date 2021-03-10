<template>
  <div >
    <Form ref="formValidate" :model="form" :label-width="100">
      <Row>
        <Col span="4">
        <FormItem :label="$t('创建人')" prop="userAgent">
          <Input v-model="form.createBy" :placeholder="$t('请输入...')" clearable></Input>
        </FormItem>
        </Col>
        <Col span="4">
          <FormItem :label="$t('请求地址')" prop="userAgent">
            <Input v-model="form.requestUri" :placeholder="$t('请输入...')" clearable></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem :label="$t('方法名')" prop="title">
            <Input v-model="form.methodName" :placeholder="$t('请输入...')" clearable></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem :label="$t('文件名')" prop="title">
            <Input v-model="form.fileName" :placeholder="$t('请输入...')" clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
      <Col span="4">
        <FormItem :label="$t('创建时间')" prop="createTimes">
          <DatePicker v-model="createTimes" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请输入时间..." clearable ></DatePicker>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem :label-width="20">
          <Button type="primary" @click="query">查询</Button>
        </FormItem>
      </Col>
      </Row>
    </Form>
    <Tables border ref="tables" :axiosUrl="axiosUrl" :axiosData="axiosData"  :height="tableHeight" :columns="columns" />
    <!-- 表格 -->
    <!-- 分页 -->
  </div>
</template>

<script>
import Tables from '_c/tables'
import { formatDate } from '@/libs/index.js'

export default {
  name: 'audit-log',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {
          title: '服务器名',
          key: 'serverHost',
          sortable: true,
          // width必须传入，此width用于调整表格每一列的宽度
          width: 200
        },
        {
          title: '创建人',
          key: 'createBy',
          width: 200
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: 200
        },
        { title: '文件名',
          key: 'fileName',
          width: 200
        },
        {
          title: '类名',
          key: 'methodClass',
          width: 200
        },
        {
          title: '方法名',
          key: 'methodName',
          width: 200
        },
        {
          title: '操作提交数据',
          key: 'params',
          width: 500
        },
        {
          title: '异常消息',
          key: 'message',
          width: 600
        },
        {
          title: '详细原因',
          key: 'stackTrace',
          width: 600
        },
        {
          title: '请求地址',
          key: 'requestUri',
          width: 200
        }
      ],
      form: {
        createBy: '',
        requestUri: '',
        methodName: '',
        createTime: '',
        fileName: ''
      },
      axiosUrl: '',
      tableData: [],
      current: '',
      total: '1',
      pageSizeOpts: [2, 10, 20, 30, 40, 100],
      pageSize: '',
      axiosData: {

      },
      bottomTools: ['page', 'export'],
      tableHeight: 600,
      createTimes: [],
      p (s) {
        return s < 10 ? '0' + s : s
      }
    }
  },
  methods: {
    pageChange (current, pageSize) {
      this.current = current
      this.pageSize = pageSize
      console.log(this.current, this.pageSize)
    },
    query () {
      if (this.createTimes[0] !== '') {
        for (var i = 0; i < this.createTimes.length; i++) {
          const d = new Date(this.createTimes[i])
          this.createTimes[i] = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        }
        this.form.createTime = this.createTimes.join(',')
      } else {
        this.form.createTime = ''
      }
      this.axiosUrl = 'sea-log/error/list'
      this.axiosData = this.form
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "./audit-log.less";
</style>
