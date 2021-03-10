<template>
  <div>
    <Modal
      class="user-modal"
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      draggable
      :zIndex="901"
      :value="showUserFlag"
      class-name="vertical-center-modal"
      footer-hide
      closable
      @on-visible-change="closeModal($event)"
      :title="userTitle">
      <div class="uf-form-body">
        <div class="uf-form-box">
          <div class="uf-form-title">基本信息</div>
          <Form :model="userFormItem" :label-width="100">
            <Row>
              <Col span="6">
                <FormItem label="业主编码:">
                  <Input v-model="userFormItem.ownerNo" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="虚拟机组数:">
                  <Input v-model="userFormItem.unitCnt" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="电子业务许可编号:">
                  <Input v-model="userFormItem.licenseNumber" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="开户银行:">
                  <Input v-model="userFormItem.accountBank" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="业主名称:">
                  <Input v-model="userFormItem.ownerName" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="DR:">
                  <Input v-model="userFormItem.DR" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="工商营业执照号:">
                  <Input v-model="userFormItem.licenseNo" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="开户名称:">
                  <Input v-model="userFormItem.accountName" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="业主地址:">
                  <Input v-model="userFormItem.customerAddress" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="ADR:">
                  <Input v-model="userFormItem.ADR" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="税务登记证号:">
                  <Input v-model="userFormItem.registNo" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="开户账号:">
                  <Input v-model="userFormItem.accountNo" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="联系人:">
                  <Input v-model="userFormItem.contactName" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="DR+ADR:">
                  <Input v-model="userFormItem.ADR_DR" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="信息更新时间:">
                  <DatePicker :value="userFormItem.updateTime" format="yyyy年MM月dd日" type="date" :disabled="disabledUserFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="注册时间:">
                  <DatePicker :value="userFormItem.registDate" format="yyyy年MM月dd日" type="date" :disabled="disabledUserFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="联系人职务:">
                  <Input v-model="userFormItem.position" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="设备因子数:">
                  <Input v-model="userFormItem.subdeviceCnt" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="注册资金:">
                  <Input v-model="userFormItem.registCap" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="入市时间:">
                  <DatePicker :value="userFormItem.entryDate" format="yyyy年MM月dd日" type="date" :disabled="disabledUserFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="办公电话:">
                  <Input v-model="userFormItem.officeTel" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="服务等级:">
                  <Input v-model="userFormItem.serverLevel" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="企业网址:">
                  <Input v-model="userFormItem.webSite" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="退市时间:">
                  <DatePicker :value="userFormItem.delistDate" format="yyyy年MM月dd日" type="date" :disabled="disabledUserFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="联系电话:">
                  <Input v-model="userFormItem.phoneNumber" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="传真号码 :">
                  <Input v-model="userFormItem.faxNumber" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="电子邮箱:">
                  <Input v-model="userFormItem.emailAddr" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="入市协议:">
                  <Input v-model="userFormItem.entryAgreement" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div class="uf-button" v-if="showUserBtnFlag">
        <div @click="editFun">编辑</div>
        <div>保存</div>
        <div>上传</div>
      </div>
    </Modal>

  </div>
</template>

<script>
export default {
  name: 'userForm',
  props: ['showUserFlag', 'userFormItem', 'userTitle', 'showUserBtnFlag', 'disabledUserFlag'],
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      titleName: ''
    }
  },
  mounted () {
  },
  methods: {
    closeModal (e) {
      this.$emit('closeModalFun', e, 2)
    },
    editFun () {
      this.$emit('disabledUserFlagFun', false)
    }
  }
}
</script>

<style lang="less">
  .user-modal .ivu-modal-body {
    background: #f2f2f2;
  }
  .uf-form-body {
    width: 100%;
    height: auto;
    border: 1px solid #e2e2e2;
    background: #ffffff;
    padding: 20px;
    border-radius: 4px;
  }
  .uf-form-box {
    width: 100%;
    height: auto;
    border: 1px solid #e2e2e2;
    position: relative;
    padding-right: 60px;
    .ivu-form {
      margin-top: 20px;
    }
    .ivu-form .ivu-form-item-label {
      font-size: 10px;
      margin-right: 0px;
    }
    .ivu-form .ivu-form-item-content {
      margin-left: 0px!important;
    }
  }
  .uf-form-title {
    width: 70px;
    height: 20px;
    color: #009999;
    font-size: 16px;
    background: #ffffff;
    text-align: center;
    position: absolute;
    top: -10px;
    left: 10px;
  }
  .uf-button {
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    div {
      width: 80px;
      height: 25px;
      background: #009999;
      border-radius: 4px;
      color: #ffffff;
      margin-right: 20px;
      text-align: center;
      line-height: 25px;
      font-size: 14px;
    }
    div:hover {
      cursor: pointer;
    }
  }
</style>
