<template>
  <div>
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
      <Row>
        <Col span="6">
          <FormItem label="角色名称" prop="roleName">
            <Input v-model="form.roleName" placeholder="请输入角色名称" clearable></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="状态" prop="status">
            <Select v-model="form.status" placeholder="请选择状态" clearable>
              <Option v-for="item in roleStatus" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label-width="20">
            <Button type="primary" @click="query">{{$t('inquiry')}}</Button>
            <Button type="primary" @click="addOrUpdate()" style="margin-left: 8px">{{$t('add')}}</Button>
            <Button type="error" @click="deleteRole" style="margin-left: 8px">{{$t('delete')}}</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Card>
      <tables ref="tables"
              editable
              searchable
              v-model="tableData"
              :columns="columns"
              :current="current"
              :total="total"
              :pageSizeOpts="pageSizeOpts"
              :pageSize="pageSize"
              :bottomTools="bottomTools"
              @on-view="handleView"
              @on-check="handleCheck"
              @on-lock="handleLock"
              @on-unlock="handleUnlock"
              @on-delete="handleDelete"
              @on-change="pageChange"
              @on-page-change="pageChange"/>
    </Card>

    <Modals v-model="showModels"
            @on-cancel="showModels = false"
            :title="isAddMenu ? '新增' : '修改'"
            :fullscreen="fullscreen"
            :draggable="draggable"
            width='600'
            footer-hide
    >
      <add-or-update ref="addOrUpdate" @cancel="closeModal"></add-or-update>
    </Modals>
  </div>
</template>

<script>
import Tables from '_c/tables'
import Modals from '_c/modals'
import AddOrUpdate from './addOrUpdate'
import { roleStatusList, list } from '@/api/system/permission/role-manage/role-manage'
import { roleStatus } from './role-manage'
export default {
  name: 'role-manage',
  components: {
    Tables,
    Modals,
    AddOrUpdate
  },
  data () {
    return {
      roleStatus: [],
      form: {
        roleName: '',
        status: ''
      },
      ruleValidate: {},
      columns: [
        {
          title: '角色名称',
          key: 'roleName',
          sortable: true
        },
        {
          title: '是否允许配置读写主站数据权限',
          key: 'rwStation',
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: params.row.rwStation === 1 ? 'primary' : 'error',
                  size: 'small'
                }
              }, params.row.rwStation === 1 ? '允许' : '不允许')
            ])
          }
        },
        {
          title: '是否允许配置读写终端数据权限',
          key: 'rwTmnl',
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: params.row.rwTmnl === 1 ? 'primary' : 'error',
                  size: 'small'
                }
              }, params.row.rwTmnl === 1 ? '允许' : '不允许')
            ])
          }
        },
        {
          title: '角色类型',
          key: 'roleAttrName',
          sortable: true
        },
        {
          title: '状态',
          key: 'status',
          sortable: true,
          render: (h, params) => {
            let type = ''
            let showName = ''
            roleStatus.forEach(it => {
              if (parseInt(it.code) === params.row.status) {
                showName = it.name
                type = it.type
              }
            })
            return h('div', [
              h('Button', {
                props: {
                  type: type,
                  size: 'small'
                }
              }, showName)
            ])
          }
        },
        {
          title: '创建用户',
          key: 'createUserName',
          sortable: true
        },
        {
          title: '创建时间',
          key: 'createTime',
          sortable: true
        },
        {
          title: '备注',
          key: 'remarks',
          sortable: true
        },
        {
          title: '操作',
          key: 'handle',
          fixed: 'right',
          width: '250',
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'text'
                },
                on: {
                  'click': () => {
                    vm.$emit('on-view', params.row.roleId)
                  }
                }
              }, [
                h('span', '查看')
              ])
            },
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'text'
                },
                on: {
                  'click': () => {
                    vm.$emit('on-check', params)
                  }
                }
              }, [
                h('span', '审核')
              ])
            },
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'text'
                },
                on: {
                  'click': () => {
                    vm.$emit('on-lock', params)
                  }
                }
              }, [
                h('span', '锁定')
              ])
            },
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'text'
                },
                on: {
                  'click': () => {
                    vm.$emit('on-unlock', params)
                  }
                }
              }, [
                h('span', '解锁')
              ])
            },
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'error',
                  ghost: true
                },
                on: {
                  'click': () => {
                    vm.$emit('on-delete', params.row.roleId)
                  }
                }
              }, [
                h('span', '删除')
              ])
            }
          ]
        }
      ],
      tableData: [],
      current: 1,
      total: 0,
      pageSizeOpts: [10, 20, 50, 100],
      pageSize: 10,
      bottomTools: ['page', 'export'],
      showModels: false,
      fullscreen: true,
      draggable: false,
      isAddMenu: true
    }
  },
  methods: {
    getRoleStatusList () {
      roleStatusList().then(res => {
        let data = res.data
        if (data && data.code === 200) {
          this.roleStatus = data.data
        }
      })
    },
    pageChange (current, pageSize) {
      this.current = current
      this.pageSize = pageSize
      console.log(this.current, this.pageSize)
    },
    addOrUpdate (roleId) {
      this.isAddMenu = roleId !== undefined
      this.showModels = true
      this.$refs.addOrUpdate.init(roleId)
    },
    closeModal (refresh) {
      this.showModels = false
      if (refresh) {
        this.query()
      }
    },
    query () {
      let data = {
        roleName: this.form.roleName,
        status: this.form.status,
        page: this.current,
        limit: this.pageSize
      }
      list(data).then(res => {
        const data = res.data
        if (data.code === 200 && data.data) {
          this.tableData = data.data.list
          this.total = data.data.totalCount
        } else {
          this.$Message.success('查询失败!')
        }
      }).catch(err => {
        this.$Message.success('查询失败!')
        console.error(err)
      })
    },
    deleteRole () {},
    handleView (roleId) {
      this.addOrUpdate(roleId)
    },
    handleCheck (param) {
      console.log(param)
    },
    handleLock (param) {
      console.log(param)
    },
    handleUnlock (param) {
      console.log(param)
    },
    handleDelete (roleId) {
      console.log(roleId)
    }
  },
  created () {
    this.getRoleStatusList()
  }
}
</script>

<style scoped>

</style>
