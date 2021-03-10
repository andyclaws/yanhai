<template>
  <div style="width:100%;height:100%;background:white">

    <Form ref="formValidate" :model="form" :label-width="100">
      <Row>
        <Col span="4">
          <FormItem :label="$t('操作用户')" prop="userAgent">
            <Input v-model="form.createBy" :placeholder="$t('请输入...')" clearable></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem :label="$t('操作名称')" prop="title">
            <Input v-model="form.title" :placeholder="$t('请输入...')" clearable></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem :label="$t('方法名')" prop="title">
            <Input v-model="form.methodName" :placeholder="$t('请输入...')" clearable></Input>
          </FormItem>
        </Col>
<!--        <Col span="4">-->
<!--          <FormItem :label="$t('创建时间')" prop="title">-->
<!--            <DatePicker :value="form.createTime" type="date" placeholder="请选择时间" @on-change="form.createTime = $event"></DatePicker>-->
<!--          </FormItem>-->
<!--        </Col>-->
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
import { list } from '@/api/system/logs/menu-log/menu-log'
import { formatDate } from '@/libs/index.js'
export default {
  name: 'menu-log',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {
          title: '操作用户',
          key: 'createBy'
        },
        {
          title: '用户代理',
          key: 'userAgent',
          sortable: true,
          // width必须传入，此width用于调整表格每一列的宽度
          width: 200
        },
        {
          title: '操作名称',
          key: 'title'
        },
        {
          title: '方法名',
          key: 'methodName'
        },
        { title: '访问IP',
          key: 'serverIp'
          // show: false
        },
        { title: '执行时间(ms)',
          key: 'time'
        },
        {
          title: '访问时间',
          key: 'createTime',
          options: ['delete'],
          // align: 'right',
          button: [
            (h, params, vm) => {
              return h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '你确定要删除吗?'
                  },
                  on: {
                    'on-ok': () => {
                      vm.$emit('on-delete', params)
                      vm.$emit(
                        'input',
                        params.tableData.filter(
                          (item, index) => index !== params.row.initRowIndex
                        )
                      )
                    }
                  }
                }

              )
            }
          ]
        }
      ],
      menudata: [],
      tableData: [],
      form: {
        createBy: '',
        title: '',
        methodName: '',
        createTime: ''
      },
      ruleValidate: {},
      current: 1,
      total: 0,
      pageSizeOpts: [2, 10, 20, 30, 40, 100],
      pageSize: 2,
      bottomTools: ['page', 'export'],
      tableHeight: 600,
      axiosUrl: '',
      axiosData: {

      }
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
        'userAgent': this.form.userAgent,
        'title': this.form.title
      }
      this.form.input = formData
      this.axiosUrl = 'sea-log/api/list'
      this.axiosData = this.form
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
    }
  },
  mounted () {
    getTableData().then(res => {
      let data = res.data
      this.tableData = data.data.list
      this.total = data.totalCount
      console.log(ata.totalCount)
      this.tableHeight = window.innerHeight - 250
    })
  }
}
</script>

<style scoped lang="less">
@import "./menu-log.less";
</style>
