<template>
  <div>
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="130">
      <FormItem label="角色名称" prop="roleName">
        <Input v-model="form.roleName" placeholder="请输入角色名称"></Input>
      </FormItem>
      <FormItem label="专业类别" prop="fieldTypeCode">
        <Select v-model="form.fieldTypeCode" placeholder="请选择专业类别" clearable>
          <Option v-for="item in fieldTypes" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="读写主站数据权限" prop="rwStation">
        <Select v-model="form.rwStation" placeholder="请选择读写主站数据权限" clearable>
          <Option v-for="item in rwStations" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="读写终端数据权限" prop="rwTmnl">
        <Select v-model="form.rwTmnl" placeholder="请选择读写终端数据权限" clearable>
          <Option v-for="item in rwTmnls" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="角色类型" prop="roleAttrId">
        <Select v-model="form.roleAttrId" placeholder="请选择角色类型" @on-change="changeRoleAttr" clearable filterable>
          <Option v-for="item in roleAttrs" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="菜单权限">
        <div style="max-height: 250px; overflow-y: auto">
          <menus ref="menus" :show-checkbox="true" :show-refresh-text="false" @on-checkChange="checkChange"></menus>
        </div>
      </FormItem>
      <FormItem label="备注" prop="remarks">
        <Input v-model="form.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
      </FormItem>
      <FormItem style="text-align: right">
        <Button type="primary" @click="saveOrUpdate">确定</Button>
        <Button type="primary" @click="handleSubmit('form')" style="margin-left: 8px">修改</Button>
        <Button @click="handleReset('form')" style="margin-left: 8px" type="warning">重置</Button>
        <Button @click="cancel()" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import CommonIcon from '_c/common-icon'
import Menus from '_c/common-select-box/components/menu'
import { save, update, rwStations, rwTmnls, detail, getFieldType, getRoleAttrList } from '@/api/system/permission/role-manage/role-manage'
export default {
  name: 'addOrUpdate',
  components: {
    CommonIcon,
    Menus
  },
  data () {
    return {
      fieldTypes: [],
      rwStations: [{ code: '0', name: '不允许' }, { code: '1', name: '允许' }],
      rwTmnls: [{ code: '0', name: '不允许' }, { code: '1', name: '允许' }],
      roleAttrs: [],
      form: {
        roleId: '',
        roleName: '',
        fieldTypeCode: '',
        rwStation: '',
        rwTmnl: '',
        roleAttrId: '',
        remarks: '',
        menuList: [],
        selectList: []
      },
      ruleValidate: {},
      roleId: null
    }
  },
  methods: {
    init (roleId) {
      this.$refs.form.resetFields()
      getFieldType().then(res => {
        let data = res.data
        if (data && data.code === 200) {
          this.fieldTypes = data.data
        }
      })
      getRoleAttrList().then(res => {
        let data = res.data
        if (data && data.code === 200) {
          this.roleAttrs = data.data
        }
      })
      if (roleId) {
        this.loadData(roleId)
        this.roleId = roleId
      } else {
        this.roleId = null
        this.initTree(-1, -1)
      }
    },
    loadData (roleId) {
      let data = { roleId: roleId }
      detail(data).then(res => {
        if (res && res.data && res.data.code === 200) {
          this.form = res.data.data
          this.form.rwStation = res.data.data.rwStation + ''
          this.form.rwTmnl = res.data.data.rwTmnl + ''
          this.$refs.menus.showChecked(this.form.selectList)
        }
      })
    },
    initTree (type, roleAttrId) {
      this.$refs.menus.initData(type, roleAttrId)
    },
    changeRoleAttr () {
      this.roleAttrId = this.form.roleAttrId
      this.form.menuList = []
      this.form.selectList = []
      if (this.roleAttrId && this.roleAttrId !== null && this.roleAttrId !== '') {
        this.initTree(3, this.roleAttrId)
        let data = { roleAttrId: this.roleAttrId }
        rwStations(data).then(res => {
          if (res && res.data && res.data.code === 200) {
            this.rwStations = res.data.data
            this.form.rwStation = '0'
          }
        })
        rwTmnls(data).then(res => {
          if (res && res.data && res.data.code === 200) {
            this.rwTmnls = res.data.data
            this.form.rwTmnl = '0'
          }
        })
      } else {
        this.form.rwStation = ''
        this.form.rwTmnl = ''
      }
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    cancel (refresh) {
      this.$emit('cancel', refresh)
    },
    saveOrUpdate () {
      let saveOrUpdate = this.roleId === null ? save(this.form) : update(this.form)
      saveOrUpdate.then(res => {
        let data = res.data
        if (data && data.code === 200) {
          this.$Message.success({
            content: 'success',
            duration: 5
          })
          this.cancel(true)
        } else {
          this.$Message.success({
            content: data.msg,
            duration: 5
          })
        }
      })
    },
    checkChange (checkedNodes, checkedAndIndeterminateNodes) {
      this.form.menuList = []
      checkedAndIndeterminateNodes.forEach(item => {
        this.form.menuList.push(item.menuId)
      })
      this.form.selectList = []
      checkedNodes.forEach(item => {
        this.form.selectList.push(item.menuId)
      })
    }
  }
}
</script>

<style scoped>

</style>
