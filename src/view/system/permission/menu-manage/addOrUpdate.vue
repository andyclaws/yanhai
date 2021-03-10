<template>
  <div>
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
      <FormItem label="类型" prop="type">
        <RadioGroup v-model="form.type" @on-change="menuTypeChange">
          <Radio :label="0">目录</Radio>
          <Radio :label="1">菜单</Radio>
          <Radio :label="2">按钮</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem :label="form.type === 0 ? '目录名称' : form.type === 1 ? '菜单名称' : '按钮名称'" prop="name">
        <Input v-model="form.name"
               :placeholder="form.type === 0 ? '目录名称' : form.type === 1 ? '菜单名称' : '按钮名称'"></Input>
      </FormItem>
      <FormItem label="上级菜单" prop="parentName">
        <Poptip trigger="click" placement="bottom">
          <Input
            search
            enter-button
            v-model="form.parentName"
            placeholder="请选择上级菜单" style="width: 487px"
          />
          <div slot="content" style="width: 460px">
            <menus
              ref="menus"
              :show-refresh-text="false"
              @on-select="selectMenu"></menus>
          </div>
        </Poptip>
      </FormItem>

      <FormItem label="菜单路由" prop="url" v-if="form.type === 0 || form.type === 1">
        <Input v-model="form.url" placeholder="请输入菜单路由"></Input>
      </FormItem>

      <FormItem label="组件地址" prop="componentAddr" v-if="form.type === 1">
        <Input v-model="form.componentAddr" placeholder="请输入组件地址"></Input>
      </FormItem>

      <FormItem label="授权标识" prop="perms" v-if="form.type === 1 || form.type === 2">
        <Input v-model="form.perms" placeholder="请输入授权标识"></Input>
      </FormItem>

      <FormItem label="排序号" prop="orderNum" v-if="form.type === 0 || form.type === 1">
        <InputNumber v-model="form.orderNum" :min="1" style="width: 100%;"></InputNumber>
      </FormItem>

      <FormItem label="菜单图标" v-if="form.type === 0 || form.type === 1" prop="icon">
        <Poptip trigger="click" placement="bottom">
          <Input
            search
            enter-button
            v-model="form.icon"
            placeholder="请选择菜单图标" style="width: 487px"
          />
          <div slot="content" style="width: 460px">
            <Button style="margin-right: 5px" type="primary" ghost v-for="icon in icons" v-bind:key="icon" @click="selectIcon(icon)">
              <CommonIcon size="18" :type="icon" />
            </Button>
          </div>
        </Poptip>
      </FormItem>

      <FormItem label="备注" prop="remarks">
        <Input v-model="form.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
      </FormItem>
      <FormItem style="text-align: right">
        <Button type="primary" @click="handleSubmit()">确定</Button>
        <Button type="primary" @click="handleSubmit()" style="margin-left: 8px">修改</Button>
        <Button @click="handleReset" style="margin-left: 8px" type="warning">重置</Button>
        <Button @click="cancel()" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import CommonIcon from '_c/common-icon'
import Menus from '_c/common-select-box/components/menu'
import { icons } from './icons'
import { save, menuDetail, update } from '@/api/system/permission/menu-manage/menu-manage'
export default {
  name: 'addOrUpdate',
  components: {
    CommonIcon,
    Menus
  },
  data () {
    return {
      menuId: null,
      form: {
        menuId: null,
        type: 0,
        name: '',
        parentName: '',
        pMenuId: '',
        url: '',
        componentAddr: '',
        perms: '',
        orderNum: 1,
        icon: '',
        remarks: ''
      },
      menuType: '1',
      ruleValidate: {
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' },
          { type: 'string', max: 20, message: '菜单名称不能超过20个字符', trigger: 'blur' }
        ]
      },
      icons: icons
    }
  },
  methods: {
    init (menuId) {
      this.$refs['form'].resetFields()
      if (menuId) {
        this.loadData(menuId)
        this.menuId = menuId
      } else {
        this.menuId = null
      }
      this.initTree()
    },
    loadData (menuId) {
      menuDetail(menuId).then(res => {
        let data = res.data
        if (data && data.code === 200) {
          this.form = data.data
        }
      })
    },
    initTree () {
      this.$refs.menus.initData(parseInt(this.form.type))
    },
    handleSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let savaOrUpdate = this.menuId === null ? save(this.form) : update(this.form)
          savaOrUpdate.then(res => {
            const data = res.data
            if (data.code === 200 && data.data) {
              this.$Message.success({
                content: 'success',
                duration: 5
              })
              this.cancel(true)
            } else {
              this.$Message.success('保存失败!')
            }
          }).catch(err => {

          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset () {
      console.log(this.$refs['form'])
      this.$refs['form'].resetFields()
    },
    cancel (refresh) {
      this.$emit('cancel', refresh)
    },
    selectIcon (icon) {
      this.form.icon = icon
    },
    menuTypeChange () {
      this.menuType = this.form.type
    },
    selectMenu (data) {
      if (this.form.type === '2' && data.type !== 2) {
        this.$Message.error('请选择菜单！')
      } else {
        this.form.parentName = data.name
        this.form.pMenuId = data.menuId
      }
    }
  },
  watch: {
    menuType () {
      this.initTree()
    }
  }
}
</script>

<style scoped>

</style>
