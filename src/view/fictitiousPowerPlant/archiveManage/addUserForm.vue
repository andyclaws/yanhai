<template>
  <div>
    <Form :model="userFormItem" :label-width="100">
      <Row>
        <Col span="6">
          <FormItem label="业主编码:">
            <Input v-model="userFormItem.ownerNo" placeholder="请输入业主编码" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="虚拟机组数:">
            <Input v-model="userFormItem.unitCnt" placeholder="请输入虚拟机组数" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="电子业务许可编号:">
            <Input v-model="userFormItem.licenseNumber" placeholder="请输入电子业务许可编号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="开户银行:">
            <Input v-model="userFormItem.accountBank" placeholder="请输入开户银行" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="业主名称:">
            <Input v-model="userFormItem.ownerName" placeholder="请输入业主名称" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="DR:">
            <Input v-model="userFormItem.DR" placeholder="请输入DR数" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="工商营业执照号:">
            <Input v-model="userFormItem.licenseNo" placeholder="请输入工商营业执照号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="开户名称:">
            <Input v-model="userFormItem.accountName" placeholder="请输入开户名称" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="业主地址:">
            <Input v-model="userFormItem.customerAddress" placeholder="请输入业主地址" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="ADR:">
            <Input v-model="userFormItem.ADR" placeholder="请输入ADR数" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="税务登记证号:">
            <Input v-model="userFormItem.registNo" placeholder="请输入税务登记证号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="开户账号:">
            <Input v-model="userFormItem.accountNo" placeholder="请输入开户账号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="联系人:">
            <Input v-model="userFormItem.contactName" placeholder="请输入联系人" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="DR+ADR:">
            <Input v-model="userFormItem.ADR_DR" placeholder="请输入DR+ADR数" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="信息更新时间:">
            <DatePicker :value="userFormItem.updateTime" format="yyyy年MM月dd日" type="date" placeholder="请输入信息更新时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="注册时间:">
            <DatePicker :value="userFormItem.registDate" format="yyyy年MM月dd日" type="date" placeholder="请输入注册时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="联系人职务:">
            <Input v-model="userFormItem.position" placeholder="请输入联系人职务" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="设备因子数:">
            <Input v-model="userFormItem.subdeviceCnt" placeholder="请输入设备因子数" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="注册资金:">
            <Input v-model="userFormItem.registCap" placeholder="请输入注册资金" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="入市时间:">
            <DatePicker :value="userFormItem.entryDate" format="yyyy年MM月dd日" type="date" placeholder="请输入入市时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="办公电话:">
            <Input v-model="userFormItem.officeTel" placeholder="请输入办公电话" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="服务等级:">
            <Input v-model="userFormItem.serverLevel" placeholder="请输入服务等级" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="企业网址:">
            <Input v-model="userFormItem.webSite" placeholder="请输入企业网址" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="退市时间:">
            <DatePicker :value="userFormItem.delistDate" format="yyyy年MM月dd日" type="date" placeholder="请输入退市时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="联系电话:">
            <Input v-model="userFormItem.phoneNumber" placeholder="请输入联系电话" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="传真号码 :">
            <Input v-model="userFormItem.faxNumber" placeholder="请输入传真号码" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="电子邮箱:">
            <Input v-model="userFormItem.emailAddr" placeholder="请输入电子邮箱" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="入市协议:">
            <Input v-model="userFormItem.entryAgreement" placeholder="请输入入市协议" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'addUserForm',
  props: ['userFormItem'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less">
</style>
