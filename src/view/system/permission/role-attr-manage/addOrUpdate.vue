<template>
  <div style="height: 420px;">
    <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="130">
<!--      <FormItem label="角色类型名称" prop="roleAttrName">-->
<!--        <Input v-model="form.roleAttrName" placeholder="角色类型名称"></Input>-->
      <FormItem label="角色类型名称" prop="roleName">
        <Input v-model="form.roleName" placeholder="角色类型名称" :disabled="this.roleAttrId !== null"></Input>
      </FormItem>
      <!--<FormItem label="专业类别" prop="fieldTypeCode">-->
        <!--<RadioGroup v-model="form.fieldTypeCode">-->
          <!--<Radio label="0">计量</Radio>-->
          <!--<Radio label="1">营业</Radio>-->
          <!--<Radio label="2">电费</Radio>-->
          <!--<Radio label="3">其他</Radio>-->
        <!--</RadioGroup>-->
      <!--</FormItem>-->
<!--      <FormItem label="读写主站数据权限" prop="allowRwStation">-->
<!--        <RadioGroup v-model="form.allowRwStation">-->
        <!--<FormItem label="读写主站数据权限" prop="rwStation">-->
          <!--<RadioGroup v-model="form.rwStation">-->
          <!--<Radio :label="0">不允许</Radio>-->
          <!--<Radio :label="1">允许</Radio>-->
        <!--</RadioGroup>-->
      <!--</FormItem>-->
<!--      <FormItem label="读写终端数据权限" prop="allowRwTmnl">-->
<!--        <RadioGroup v-model="form.allowRwTmnl">-->
      <!--<FormItem label="读写终端数据权限" prop="rwTmnl">-->
          <!--<RadioGroup v-model="form.rwTmnl">-->
          <!--<Radio :label="0">不允许</Radio>-->
          <!--<Radio :label="1">允许</Radio>-->
        <!--</RadioGroup>-->
      <!--</FormItem>-->
      <FormItem label="菜单权限">
        <div style="max-height: 250px; overflow-y: auto">
          <menus ref="menus" :show-checkbox="true" :show-refresh-text="false" @on-checkChange="checkChange"></menus>
        </div>
      </FormItem>
      <FormItem label="备注" prop="remarks">
        <Input v-model="form.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
      </FormItem>
      <FormItem style="text-align: right">
        <Button type="primary" @click="saveOrUpdate('formValidate')" v-if="this.roleAttrId === null">确定</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" v-if="this.roleAttrId !== null" style="margin-left: 8px">修改</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px" type="warning">重置</Button>
        <Button @click="cancel()" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import CommonIcon from '_c/common-icon'
import Menus from '_c/common-select-box/components/menu'
import { save, update, detail } from '@/api/system/permission/role-attr-manage/role-attr-manage'
export default {
  name: 'addOrUpdate',
  components: {
    CommonIcon,
    Menus
  },
  data () {
    return {
      roleAttrId: null,
      form: {
        fieldTypeCode: '',
        roleName: '',
        rwStation: 0,
        rwTmnl: 0,
        remarks: '',
        menuList: [],
        selectList: []
      },
      ruleValidate: {
      }
    }
  },
  methods: {
    init (roleAttrId) {
      this.$refs['formValidate'].resetFields()
      if (roleAttrId) {
        this.loadData(roleAttrId)
        this.roleAttrId = roleAttrId
      } else {
        this.initTree(3)
        this.roleAttrId = null
      }
    },
    loadData (roleAttrId) {
      let data = {
        roleAttrId: roleAttrId
      }
      detail(data).then(res => {
        let data = res.data
        console.log(data)
        this.form = data.data
        this.$refs.menus.showChecked(this.form.selectList)
      })
    },
    initTree (type) {
      this.$refs.menus.initData(type)
    },
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
    cancel (refresh) {
      this.$emit('cancel', refresh)
    },
    selectIcon (icon) {
      console.log(icon)
    },
    saveOrUpdate () {
      let saveOrUpdate = this.roleAttrId === null ? save(this.form) : update(this.form)
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
