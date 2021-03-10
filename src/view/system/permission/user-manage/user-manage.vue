<template>
  <div>
    <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="100">
      <Row>
        <!--<Col span="4">-->
          <!--<FormItem :label="$t('org')" prop="orgName">-->
            <!--<Poptip v-model="showOrgFlag"-->
                    <!--trigger="hover"-->
                    <!--placement="bottom">-->
              <!--<Input search-->
                     <!--enter-button-->
                     <!--v-model="form.orgName"-->
                     <!--:placeholder="$t('please_input_org')"-->
                     <!--style="width: 100%"/>-->
              <!--<div slot="content" style="max-height: 500px; overflow-y: auto; width: 250px">-->
                <!--<orgs :show-refresh-text="false"-->
                      <!--@on-select="selectOrg"></orgs>-->
              <!--</div>-->
            <!--</Poptip>-->
          <!--</FormItem>-->
        <!--</Col>-->
        <Col span="4">
          <FormItem label="用户名称" prop="userName">
            <Input v-model="form.userName" placeholder="请输入用户名称" clearable></Input>
          </FormItem>
        </Col>
        <!--        <Col span="4">-->
        <!--          <FormItem label="用户姓名" prop="name">-->
        <!--            <Input v-model="form.name" placeholder="请输入用户姓名" clearable></Input>-->
        <!--          </FormItem>-->
        <!--        </Col>-->
        <!--<Col span="4">-->
          <!--<FormItem label="当前状态" prop="status">-->
            <!--<Select v-model="form.status" placeholder="请选择当前状态" clearable>-->
              <!--<Option v-for="item in userStatus" :value="item.code" :key="item.code">{{ item.name }}</Option>-->
            <!--</Select>-->
          <!--</FormItem>-->
        <!--</Col>-->
        <Col span="8">
          <FormItem :label-width="20">
            <Button type="primary" @click="handleSubmit('formValidate')">{{$t('inquiry')}}</Button>
            <Button type="primary" @click="addMenu()" style="margin-left: 8px">{{$t('add')}}</Button>
            <!--            <Button type="primary" @click="addMenu" style="margin-left: 8px">重置密码</Button>-->
            <!--            <Button type="error" @click="addMenu" style="margin-left: 8px">{{$t('delete')}}</Button>-->
            <!--            <Button type="error" @click="addMenu" style="margin-left: 8px">永久删除</Button>-->
            <!--            <Button type="warning" @click="addMenu" style="margin-left: 8px">恢复</Button>-->
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Card>
<!--      <tables ref="tables"-->
<!--              editable searchable-->
<!--              v-model="tableData"-->
<!--              :columns="columns"-->
<!--              :current="current"-->
<!--              :total="total"-->
<!--              :pageSizeOpts="pageSizeOpts"-->
<!--              :pageSize="pageSize"-->
<!--              :bottomTools="bottomTools"-->
<!--              @on-view="handleUpdate" @on-change="pageChange" @on-page-change="pageChange"/>-->
      <Tables
        border
        ref="tables"
        isLoginAxios="true"
        :axiosUrl="axiosUrl"
        :axiosData="axiosData"
        :columns="columns"
        height="550"
        @on-view="handleUpdate" />

    </Card>
    <Modals v-model="showModels"
            @on-cancel="showModels = false"
            :title="isAddMenu ? '新增' : '修改'"
            :fullscreen="fullscreen"
            :draggable="draggable"
            width='800'
            footer-hide
    >
      <add-or-update @cancel="showModels = false" ref="addOrUpdate"></add-or-update>
    </Modals>
  </div>
</template>

<script>
import Tables from '_c/tables'
import Modals from '_c/modals'
import AddOrUpdate from './addOrUpdate'
import Orgs from '_c/common-select-box/components/org'
export default {
  name: 'user-manage',
  components: {
    Tables,
    Modals,
    AddOrUpdate,
    Orgs
  },
  data () {
    return {
      showOrgFlag: false,
      userStatus: [
        {
          code: '0',
          name: '待审核'
        },
        {
          code: '1',
          name: '审核未通过'
        },
        {
          code: '2',
          name: '审核通过正常'
        },
        {
          code: '3',
          name: '锁定'
        },
        {
          code: '4',
          name: '长期锁定'
        },
        {
          code: '5',
          name: '删除'
        }
      ],
      form: {
        orgName: this.$store.state.auth.orgName,
        orgNo: '',
        orgType: this.$store.state.auth.orgType,
        userName: '',
        name: '',
        status: ''
      },
      ruleValidate: {},
      columns: [
        {
          title: '用户名称',
          key: 'userName',
          sortable: true,
          width: ''
        },
        // {
        //   title: '供电单位',
        //   key: 'orgName',
        //   sortable: true,
        //   width: ''
        // },
        {
          title: '角色类型',
          key: 'roleNames',
          sortable: true,
          width: ''
        },
        // {
        //   title: '状态',
        //   key: 'status',
        //   sortable: true,
        //   width: '',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           type: params.row.status === 2 ? 'primary' : 'error',
        //           size: 'small'
        //         }
        //       }, params.row.status === 2 ? '审核通过' : params.row.status === 0 ? '待审核'
        //         : params.row.status === 1 ? '未通过'
        //           : params.row.status === 3 ? '锁定'
        //             : params.row.status === 4 ? '长期锁定'
        //               : params.row.status === 5 ? '删除' : '未知')
        //     ])
        //   }
        // },
        // {
        //   title: '创建用户',
        //   key: 'createUser',
        //   sortable: true,
        //   width: ''
        // },
        {
          title: '创建时间',
          key: 'createTime',
          sortable: true,
          width: ''
        },
        {
          title: '类型',
          key: 'accountType',
          sortable: true,
          width: '',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: params.row.accountType === 1 ? 'primary' : 'error',
                  size: 'small'
                }
              }, params.row.accountType === 1 ? '长期' : '临时')
            ])
          }
        },
        {
          title: '操作',
          key: 'handle',
          button: [
            // (h, params, vm) => {
            //   return h('Button', {
            //     props: {
            //       type: 'text'
            //     },
            //     on: {
            //       'click': () => {
            //         vm.$emit('on-view', params)
            //       }
            //     }
            //   }, [
            //     h('span', '查看')
            //   ])
            // },
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'text'
                },
                on: {
                  'click': () => {
                    vm.$emit('on-view', params)
                  }
                }
              }, [
                h('span', '修改')
              ])
            }
            // (h, params, vm) => {
            //   return h('Button', {
            //     props: {
            //       type: 'text'
            //     },
            //     on: {
            //       'click': () => {
            //         vm.$emit('on-view', params)
            //       }
            //     }
            //   }, [
            //     h('span', '修改状态')
            //   ])
            // },
            // (h, params, vm) => {
            //   return h('Button', {
            //     props: {
            //       type: 'error',
            //       ghost: true
            //     },
            //     on: {
            //       'click': () => {
            //         vm.$emit('on-view', params)
            //       }
            //     }
            //   }, [
            //     h('span', '删除')
            //   ])
            // }
          ]
        }
      ],
      tableData: [{
        remark: 'test'
      }],
      current: 1,
      total: 0,
      pageSizeOpts: [2, 10, 20, 30, 40, 100],
      pageSize: 25,
      bottomTools: ['page', 'export'],
      showModels: false,
      fullscreen: true,
      draggable: false,
      isAddMenu: true,
      axiosUrl: '',
      axiosData: {}
    }
  },
  methods: {
    handleSubmit () {
      let data = {
        orgNo: this.form.orgNo,
        userName: this.form.userName,
        status: this.form.status,
        page: this.current,
        limit: this.pageSize
      }
      this.form.input = data
      this.axiosUrl = 'sea-system/sysUser/list'
      this.axiosData = this.form
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
    },
    // 修改
    handleUpdate (params) {
      this.isAddMenu = params.row.userId === undefined
      this.showModels = true
      this.$refs.addOrUpdate.init(params.row.userId)
    },
    handleInput (params) {
      console.log(params)
    },
    pageChange (current, pageSize) {
      this.current = current
      this.pageSize = pageSize
      console.log(this.current, this.pageSize)
    },
    addMenu (userId) {
      this.isAddMenu = userId === undefined
      this.showModels = true
      this.$refs.addOrUpdate.init(userId)
    },
    selectOrg (data) {
      this.form.orgName = data.orgName
      this.form.orgNo = data.orgNo
      this.form.orgType = data.orgType
      // this.showOrgFlag = false
    }
  }
}
</script>

<style scoped>

</style>
