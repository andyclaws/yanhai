<template>
  <div>
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
      <Divider orientation="left">基本信息</Divider>
      <Row>
        <Col span="12">
          <FormItem label="工号" prop="userName">
            <Input v-model="form.userName" placeholder="请输入工号" :disabled="this.userId !== null"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="用户姓名" prop="name">
            <Input v-model="form.name" placeholder="请输入用户姓名"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="账号类型" prop="accountType">
            <Select v-model="form.accountType" placeholder="请选择账号类型" clearable>
              <Option v-for="item in accountTypes" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <!--<Col span="12">-->
          <!--<FormItem :label="$t('org')" prop="orgName">-->
            <!--<Poptip v-model="showOrgFlag" trigger="hover" placement="bottom" width="284">-->
              <!--<Input-->
                <!--search-->
                <!--enter-button-->
                <!--v-model="form.orgName"-->
                <!--:placeholder="$t('please_input_org')"-->
                <!--style="width: 284px"-->
              <!--/>-->
              <!--<div slot="content">-->
                <!--<orgs :show-refresh-text="false" @on-select="selectOrg"></orgs>-->
              <!--</div>-->
            <!--</Poptip>-->
          <!--</FormItem>-->
        <!--</Col>-->
      </Row>
      <Row>
        <!--<Col span="12">-->
          <!--<FormItem label="员工编号" prop="erpNo">-->
            <!--<Input v-model="form.erpNo" placeholder="请输入员工编号" clearable></Input>-->
          <!--</FormItem>-->
        <!--</Col>-->
<!--        <Col span="12">-->
<!--          <FormItem label="工号属性" prop="erpType">-->
<!--            <Select v-model="form.erpType" placeholder="请选择工号属性" clearable>-->
<!--              <Option v-for="item in erpTypes" :value="item.code" :key="item.code">{{ item.name }}</Option>-->
<!--            </Select>-->
<!--          </FormItem>-->
<!--        </Col>-->
      </Row>
      <Row>
        <!--<Col span="12">-->
          <!--<FormItem label="单位类型" prop="orgType">-->
            <!--<Input v-model="form.orgType" placeholder="请输入单位类型"></Input>-->
          <!--</FormItem>-->
        <!--</Col>-->
<!--        <Col span="12">-->
<!--          <FormItem label="所属部门" prop="deptNo">-->
<!--            <Select v-model="form.deptNo" placeholder="请选择所属部门" clearable>-->
<!--              <Option v-for="item in depts" :value="item.code" :key="item.code">{{ item.name }}</Option>-->
<!--            </Select>-->
<!--          </FormItem>-->
<!--        </Col>-->
      </Row>
<!--      <Row>-->
<!--        <Col span="12">-->
<!--          <FormItem label="用户类型" prop="consType">-->
<!--            <Select v-model="form.consType" placeholder="请选择用户类型" multiple clearable>-->
<!--              <Option v-for="item in consTypes" :value="item.code" :key="item.code">{{ item.name }}</Option>-->
<!--            </Select>-->
<!--          </FormItem>-->
<!--        </Col>-->
<!--        <Col span="12">-->
<!--          <FormItem label="终端厂商" prop="factoryCode">-->
<!--            <Select v-model="form.factoryCode" placeholder="请选择终端厂商" multiple clearable>-->
<!--              <Option v-for="item in factorys" :value="item.code" :key="item.code">{{ item.name }}</Option>-->
<!--            </Select>-->
<!--          </FormItem>-->
<!--        </Col>-->
<!--      </Row>-->
      <Row>
        <!--<Col span="12">-->
          <!--<FormItem label="绑定IP" prop="accessIp">-->
            <!--<Input v-model="form.accessIp" placeholder="请输入绑定IP"></Input>-->
          <!--</FormItem>-->
        <!--</Col>-->
        <!--        <Col span="12">-->
        <!--          <FormItem label="外围厂商" prop="erpCoNo">-->
        <!--            <Select v-model="form.erpCoNo" placeholder="请选择外围厂商" clearable>-->
        <!--              <Option v-for="item in erpCoNos" :value="item.code" :key="item.code">{{ item.name }}</Option>-->
        <!--            </Select>-->
        <!--          </FormItem>-->
        <!--        </Col>-->
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="备注" prop="remarks">
            <Input v-model="form.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入备注..."></Input>
          </FormItem>
        </Col>
      </Row>
      <!--<Divider orientation="left">私人信息</Divider>-->
      <!--<Row>-->
        <!--<Col span="12">-->
          <!--<FormItem label="身份证号" prop="idCard">-->
            <!--<Input v-model="form.idCard" placeholder="请输入身份证号"></Input>-->
          <!--</FormItem>-->
        <!--</Col>-->
        <!--<Col span="12">-->
          <!--<FormItem label="座机号" prop="fixedPhone">-->
            <!--<Input v-model="form.fixedPhone" placeholder="请输入座机号"></Input>-->
          <!--</FormItem>-->
        <!--</Col>-->
      <!--</Row>-->
      <!--<Row>-->
        <!--<Col span="12">-->
          <!--<FormItem label="手机号" prop="mobilePhone">-->
            <!--<Input v-model="form.mobilePhone" placeholder="请输入手机号"></Input>-->
          <!--</FormItem>-->
        <!--</Col>-->
        <!--<Col span="12">-->
          <!--<FormItem label="地址" prop="address">-->
            <!--<Input v-model="form.address" placeholder="请输入地址"></Input>-->
          <!--</FormItem>-->
        <!--</Col>-->
      <!--</Row>-->
      <!--<Row>-->
        <!--<Col span="12">-->
          <!--<FormItem label="电子邮件" prop="email">-->
            <!--<Input v-model="form.email" placeholder="请输入电子邮件"></Input>-->
          <!--</FormItem>-->
        <!--</Col>-->
      <!--</Row>-->
      <Divider orientation="left">角色信息</Divider>
      <Row>
<!--        <Col span="12">-->
<!--          <FormItem label="角色类型" prop="roleAttr">-->
<!--            <Select v-model="form.roleAttr" placeholder="请选择角色类型" @on-change="changeRoleAttr" clearable>-->
<!--              <Option v-for="item in roleAttrs" :value="item.code" :key="item.role">{{ item.name }}</Option>-->
<!--            </Select>-->
<!--          </FormItem>-->
<!--        </Col>-->
          <Col span="12">
            <FormItem label="角色类型" prop="role">
              <Select v-model="form.role" placeholder="请选择角色类型"  multiple  clearable>
                <Option v-for="item in roles" :value="item.code" :key="item.code">{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>

<!--        <Col span="12">-->
<!--          <FormItem label="角色" prop="role">-->
<!--            <Select v-model="form.role" placeholder="请选择角色" multiple clearable>-->
<!--              <Option v-for="item in roles" :value="item.code" :key="item.code">{{ item.name }}</Option>-->
<!--            </Select>-->
<!--          </FormItem>-->
<!--        </Col>-->
      </Row>
      <FormItem style="text-align: right">
        <Button type="primary" @click="handleSubmit" v-if="this.userId === null">确定</Button>
        <Button type="primary" @click="handleSubmit('form')" v-if="this.userId !== null" style="margin-left: 8px">修改</Button>
        <Button @click="handleReset('form')" style="margin-left: 8px" type="warning" v-if="this.userId === null">重置</Button>
        <Button @click="cancel()" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import Orgs from '_c/common-select-box/components/org'
import { accountTypes } from './user-manage'
import { selectBoxData, queryByRoleAttrId, saveUser, updateUser, queryUserByUserId } from '@/api/system/permission/user-manage/user-manage'

export default {
  name: 'addOrUpdate',
  components: {
    Orgs
  },
  data () {
    return {
      showOrgFlag: false,
      accountTypes: accountTypes,
      depts: [],
      consTypes: [],
      factorys: [],
      roleAttrs: [],
      roles: [],
      userId: null,
      form: {
        userId: null,
        userName: '',
        name: '',
        accountType: 2,
        orgName: this.$store.state.auth.orgName,
        orgNo: '',
        orgType: '',
        deptNo: '',
        consType: [],
        factoryCode: [],
        accessIp: '',
        remarks: '',
        idCard: '',
        fixedPhone: '',
        mobilePhone: '',
        address: '',
        email: '',
        roleAttr: '',
        role: []
      },
      ruleValidate: {}
    }
  },
  methods: {
    init (userId) {
      this.$refs['form'].resetFields()
      if (userId) {
        this.loadData(userId)
        this.userId = userId
      } else {
        // this.initTree(3)
        this.userId = null
      }
    },
    loadData (userId) {
      let data = {
        userId: userId
      }
      queryUserByUserId(data).then(res => {
        let data = res.data
        if (data && data.code === 200) {
          this.form = data.data
        }
      })
    },
    handleSubmit () {
      let saveOrUpdate = this.userId === null ? saveUser(this.form) : updateUser(this.form)
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
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    cancel (refresh) {
      this.$emit('cancel', refresh)
    },
    selectOrg (data) {
      this.form.orgName = data.orgName
      this.form.orgNo = data.orgNo
      this.form.orgType = data.orgType
      // queryDept({ orgNo: this.form.orgNo }).then(res => {
      //   if (res && res.data && res.data.code === 200) {
      //     this.depts = res.data.data
      //   }
      // })
    },
    initSelectBox () {
      selectBoxData().then(res => {
        if (res && res.data && res.data.code === 200) {
          this.depts = res.data.data.depts
          this.consTypes = res.data.data.consTypes
          this.factorys = res.data.data.factorys
          this.roles = res.data.data.roles
        }
      })
    },
    changeRoleAttr (roleAttrId) {
      console.log('++++++++++++++++++++++++++++++:role:' + this.roles)
      this.form.role = []
      if (roleAttrId) {
        let data = { roleAttrId: roleAttrId }
        queryByRoleAttrId(data).then(res => {
          if (res && res.data && res.data.code === 200) {
            this.roles = res.data.data
            this.form.deptNo = ''
          }
        })
      }
    }
  },
  created () {
    this.initSelectBox()
  }
}
</script>

<style scoped>

</style>
