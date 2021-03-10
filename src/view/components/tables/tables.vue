<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable v-model="tableData" :columns="columns"
              :current="current" :total="total" :pageSizeOpts="pageSizeOpts" :pageSize="pageSize"
              :bottomTools="bottomTools"
              @on-delete="handleDelete" @on-change="pageChange" @on-page-change="pageChange"/>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'

export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {
          title: 'Name',
          key: 'name',
          sortable: true,
          // width必须穿如，此width用于调整表格每一列的宽度
          width: 220,
          edit: {
            editable: true,
            editType: 'input',
            editItemType: '',
            selectOption: [{ value: 'n', label: 'New York' }],
            timeSteps: [1, 15, 15],
            step: 0.1,
            precision: 2,
            validFunction: (val) => {
              let result = false
              if (!(val > 0)) {
                result = true
              } else {
                this.$Message.error('验证不通过')
              }
              return result
            }
          }
        },
        {
          title: 'Email',
          key: 'email',
          width: '',
          edit:
              {
                editable: true,
                regular: '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$',
                verifyMsg: '请输入正确的邮箱'
              }
        },
        { title: 'Create-Time', key: 'createTime', show: false },
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
          align: 'right',
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', '自定义删除')
              ])
            }
          ]
        }
      ],
      tableData: [],
      current: 1,
      total: 0,
      pageSizeOpts: [25, 50, 75, 100],
      pageSize: 25,
      bottomTools: ['page', 'export']
    }
  },
  methods: {
    handleDelete (params) {
    },
    handleInput (params) {
    },
    pageChange (current, pageSize) {
      this.current = current
      this.pageSize = pageSize
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

<style>
</style>
