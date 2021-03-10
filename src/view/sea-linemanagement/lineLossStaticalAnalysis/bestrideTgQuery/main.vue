<template>
  <div class="bestride-tg-query">
    <div>
      <Form :label-width="80">
      <Row>
        <Col span="5">
          <FormItem label="供电单位" prop="unit">
            <Select>
              <Option v-for="item in userStatus" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="终端类型" prop="type">
            <Select>
              <Option>

              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="终端规约" prop="agreement">
            <Select>
              <Option>

              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="终端地址" prop="address">
            <Input></Input>
          </FormItem>
        </Col>
        <Col span="4">
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
    <div>
      <Modal
        width="1200"
        title="【用户明细】"
        v-model="modal10"
        class-name="vertical-center-modal"
        footer-hide
        :parentInfo="parentInfo">
        <user-details :parentInfo=parentInfo.topTitle></user-details>
      </Modal>
    </div>

  </div>
</template>
<script>
import Tables from '_c/tables'
import userDetails from './userDetails'

export default {
  components: {
    Tables,
    userDetails
  },
  data () {
    return {
      parentInfo: {
        titleTop: ''
      },
      modal10: false,
      bottomTools: ['page', 'export'],
      // 分页
      pageSize: 5, // 每页显示多少条
      total: 0, // 总条数
      current: 1, // 当前页
      pageSizeOpts: [2, 5, 10, 20, 40, 100],
      nowData: [],
      tableData: [],
      // ruleValidate: {},
      columns: [
        { type: 'selection', width: 60, align: 'center' },
        { title: '序号', key: 'id', width: 90, sortable: true, align: 'center' },
        { title: '供电单位', key: 'unit', width: 200, align: 'center' },
        // sortable: true,
        // width必须传入，此width用于调整表格每一列的宽度
        { title: '终端地址',
          key: 'address',
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.modal10 = true
                    this.parentInfo.topTitle = params.row.address
                  }
                }
              }, params.row.address)
            ])
          },
          align: 'center'
        },
        { title: '台区编号', key: 'TgNum', align: 'center' },
        { title: '台区名称', key: 'TgName', align: 'center' },
        { title: '用户数量', key: 'adminNum', align: 'center' }
      ],
      userStatus: [
        { code: '0', name: '安徽省电力公司' },
        { code: '1', name: '合肥供电公司' },
        { code: '2', name: '六安供电公司' },
        { code: '3', name: '锁定' },
        { code: '4', name: '长期锁定' },
        { code: '5', name: '删除' }
      ]
    }
  },
  methods: {
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

      // // 需要显示开始数据的index,(因为数据是从0开始的，页码是从1开始的，需要-1)
      // let _start = (index - 1) * this.pageSize
      // // 需要显示结束数据的index
      // let _end = index * this.pageSize
      // // 截取需要显示的数据
      // this.nowData = this.tableData.slice(_start, _end)
      // // 储存当前页
      // this.pageCurrent = index
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

    // exportData (type) {
    //   // 导出源数据
    //   if (type === 1) {
    //     this.$refs.tables.exportCsv({
    //       filename: '计量在线监测_异常处理_代办事项_源数据',
    //       columns: this.columns,
    //       data: this.tableData
    //     })
    //   } else if (type === 2) { // 导出排序和筛选后的数据
    //     this.$refs.tables.exportCsv({
    //       filename: '计量在线监测_异常处理_代办事项_排序和筛选后的数据',
    //       original: false
    //     })
    //   }
    // },
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

<style lang="less">
  .bestride-tg-query .ivu-card-body{
    position: relative
  }
  .bestride-tg-query .ivu-poptip{
    position: absolute;
    bottom: 16px;
    right: 80px;
    z-index: 999;
  }
  .bestride-tg-query .ivu-card-body{
    padding: 8px 16px 16px 16px;
  }
  .bestride-tg-query .ivu-card-head button{
    margin-right: 10px;
    margin-bottom: 8px;
  }
  .ivu-table-tbody td,.ivu-table-header th{
    text-align: center;
  }
</style>
