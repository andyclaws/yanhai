<template>
    <div>
      <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="100">
        <Row>
          <Col span="6">
            <FormItem label="角色类型" prop="roleAttrName">
              <Input v-model="form.roleAttrName" placeholder="请输入角色类型" clearable></Input>
            </FormItem>
          </Col>
          <Col span="18">
            <FormItem :label-width="20">
              <Button type="primary" @click="query('formValidate')">{{$t('inquiry')}}</Button>
              <Button type="primary" @click="addOrUpdateRoleAttr()" style="margin-left: 8px">{{$t('add')}}</Button>
<!--              <Button type="error" @click="deleteRoleAttr" style="margin-left: 8px">{{$t('delete')}}</Button>-->
            </FormItem>
          </Col>
        </Row>
      </Form>

      <Card>
        <!--<tables ref="tables" editable searchable v-model="tableData" :columns="columns"-->
                <!--:current="current" :total="total" :pageSizeOpts="pageSizeOpts" :pageSize="pageSize"-->
                <!--:bottomTools="bottomTools"-->
                <!--@on-view="handleView" @on-update="handleUpdate" @on-delete="handleDelete" @on-change="pageChange" @on-page-change="pageChange"/>-->

        <Tables
          border
          ref="tables"
          isLoginAxios="true"
          :axiosUrl="axiosUrl"
          :axiosData="axiosData"
          :columns="columns"
          height="550"
          @on-view="handleView"
          @on-update="handleUpdate"
          @on-delete="handleDelete" />

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
import { del } from '@/api/system/permission/role-attr-manage/role-attr-manage'
export default {
  name: 'role-attr-manage',
  components: {
    Tables,
    Modals,
    AddOrUpdate
  },
  data () {
    return {
      form: {
        roleAttrName: ''
      },
      ruleValidate: {},
      columns: [
        {
          title: '角色类型名称',
          key: 'roleName',
          sortable: true,
          width: ''
        },
        {
          title: '备注',
          key: 'remarks',
          sortable: true,
          width: ''
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
                    vm.$emit('on-update', params)
                  }
                }
              }, [
                h('span', '修改')
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
                    vm.$emit('on-delete', params)
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
      axiosUrl: '',
      axiosData: {},
      bottomTools: ['page', 'export'],
      showModels: false,
      fullscreen: true,
      draggable: false,
      isAddMenu: true
    }
  },
  methods: {
    query () {
      this.axiosData = {
        roleName: this.form.roleAttrName
      }
      this.axiosUrl = 'sea-system/sysRole/list'
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
    },
    handleView (params) {
      console.log('view', params.row.roleAttrId)
    },
    handleUpdate (params) {
      console.log('update', params.row.roleId)
      // this.addOrUpdateRoleAttr(params.row.roleAttrId)
      this.addOrUpdateRoleAttr(params.row.roleId)
    },
    handleDelete (params) {
      del(params.row.roleId).then(res => {
        console.log(res)
      })
    },

    addOrUpdateRoleAttr (roleAttrId) {
      this.isAddMenu = roleAttrId === undefined
      this.showModels = true
      this.$refs.addOrUpdate.init(roleAttrId)
    },
    closeModal (refresh) {
      this.showModels = false
      if (refresh) {
        console.log('这里调了一次')
        this.query()
      }
    }
  }
}
</script>

<style scoped>

</style>
