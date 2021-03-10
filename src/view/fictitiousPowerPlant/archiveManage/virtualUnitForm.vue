<template>
  <div>
    <Modal
      class="unit-modal"
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      draggable
      :zIndex="901"
      :value="showVirtualUnitFlag"
      class-name="vertical-center-modal"
      footer-hide
      closable
      @on-visible-change="closeModal($event)"
      :title="virtualUnitTitle">
      <div class="vuf-form-body">
        <div class="vuf-form-box">
          <div class="vuf-form-title">基本信息</div>
          <Form :model="virtualUnitFormItem" :label-width="100">
            <Row>
              <Col span="6">
                <FormItem label="机组名称:">
                  <Input v-model="virtualUnitFormItem.unitName" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="企业网址:">
                  <Input v-model="virtualUnitFormItem.webSite" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="电子业务许可编号:">
                  <Input v-model="virtualUnitFormItem.licenseNumber" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="组织机构代码:">
                  <Input v-model="virtualUnitFormItem.orgNo" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="机组简称:">
                  <Input v-model="virtualUnitFormItem.unitShortName" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="通信地址:">
                  <Input v-model="virtualUnitFormItem.commAddr" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="工商营业执照号:">
                  <Input v-model="virtualUnitFormItem.licenseNo" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="机组额定容量:">
                  <Input v-model="virtualUnitFormItem.unitRatedCap" :disabled="disabledVirtualUnitFlag" style="width: 120px;"></Input> kWh
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="商业性质:">
                  <Input v-model="virtualUnitFormItem.businessAttr" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="法人名称:">
                  <Input v-model="virtualUnitFormItem.legalName" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="税务登记证号:">
                  <Input v-model="virtualUnitFormItem.registNo" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="额定上网容量:">
                  <Input v-model="virtualUnitFormItem.ratedCap" :disabled="disabledVirtualUnitFlag" style="width: 120px;"></Input> kWh
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="业务场景ID:">
                  <Input v-model="virtualUnitFormItem.businessId" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="联系人职务:">
                  <Input v-model="virtualUnitFormItem.position" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="信息更新时间:">
                  <DatePicker :value="virtualUnitFormItem.updateTime" format="yyyy年MM月dd日" type="date" :disabled="disabledVirtualUnitFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="机组最大出力:">
                  <Input v-model="virtualUnitFormItem.unitMaxOutput" :disabled="disabledVirtualUnitFlag" style="width: 120px;"></Input> kWh
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="控制区域ID:">
                  <Input v-model="virtualUnitFormItem.contrlRegionId" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="邮政编码:">
                  <Input v-model="virtualUnitFormItem.postCode" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="信息更新人编号:">
                  <Input v-model="virtualUnitFormItem.updateNumber" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="机组最小出力:">
                  <Input v-model="virtualUnitFormItem.unitMinOutput" :disabled="disabledVirtualUnitFlag" style="width: 120px;"></Input> kWh
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="地理区域ID:">
                  <Input v-model="virtualUnitFormItem.regionId" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="开户银行:">
                  <Input v-model="virtualUnitFormItem.accountBank" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="所属发电集团:">
                  <Input v-model="virtualUnitFormItem.powerGenerationGroup" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="增容容量:">
                  <Input v-model="virtualUnitFormItem.increaseCap" :disabled="disabledVirtualUnitFlag" style="width: 120px;"></Input> kWh
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="法定代表人:">
                  <Input v-model="virtualUnitFormItem.legalRepresent" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="开户名称:">
                  <Input v-model="virtualUnitFormItem.accountName" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="购电计算单位:">
                  <Input v-model="virtualUnitFormItem.purchaseUnit" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="接入电压:">
                  <Input v-model="virtualUnitFormItem.accessVol" :disabled="disabledVirtualUnitFlag" style="width: 130px;"></Input> V
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="常用联系人:">
                  <Input v-model="virtualUnitFormItem.contactName" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="开户账号:">
                  <Input v-model="virtualUnitFormItem.accountNo" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="许可证发证时间:">
                  <DatePicker :value="virtualUnitFormItem.licenseTime" format="yyyy年MM月dd日" type="date" :disabled="disabledVirtualUnitFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="营业期限:">
                  <Input v-model="virtualUnitFormItem.businessTerm" :disabled="disabledVirtualUnitFlag" style="width: 140px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="办公电话:">
                  <Input v-model="virtualUnitFormItem.officeTel" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="注册时间:">
                  <DatePicker :value="virtualUnitFormItem.registDate" format="yyyy年MM月dd日" type="date" :disabled="disabledVirtualUnitFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="许可证失效时间:">
                  <DatePicker :value="virtualUnitFormItem.licenceExpTime" format="yyyy年MM月dd日" type="date" :disabled="disabledVirtualUnitFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="爬坡率:">
                  <Input v-model="virtualUnitFormItem.climbRate" :disabled="disabledVirtualUnitFlag" style="width: 100px;"></Input> %/min
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="手机号码:">
                  <Input v-model="virtualUnitFormItem.phoneNumber" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="入市时间:">
                  <DatePicker :value="virtualUnitFormItem.entryDate" format="yyyy年MM月dd日" type="date" :disabled="disabledVirtualUnitFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="注册地址:">
                  <Input v-model="virtualUnitFormItem.companyRegistAddr" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="滑坡率:">
                  <Input v-model="virtualUnitFormItem.landslideRate" :disabled="disabledVirtualUnitFlag" style="width: 100px;"></Input> %/min
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="传真号码:">
                  <Input v-model="virtualUnitFormItem.faxNumber" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="退市时间:">
                  <DatePicker :value="virtualUnitFormItem.delistDate" format="yyyy年MM月dd日" type="date" :disabled="disabledVirtualUnitFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="统一社会信用代码:">
                  <Input v-model="virtualUnitFormItem.unifiedCreditCode" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="状态:">
                  <Input v-model="virtualUnitFormItem.statusCode" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="电子邮箱:">
                  <Input v-model="virtualUnitFormItem.emailAddr" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="入市协议:">
                  <Input v-model="virtualUnitFormItem.entryAgreement" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="许可证是否豁免:">
                  <Input v-model="virtualUnitFormItem.isLicenseExempt" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="曾用名:">
                  <Input v-model="virtualUnitFormItem.usedName" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="注册资本:">
                  <Input v-model="virtualUnitFormItem.registCap" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="营销表号:">
                  <Input v-model="virtualUnitFormItem.registCap" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="所属线路编号:">
                  <Input v-model="virtualUnitFormItem.registCap" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="所属线路名称:">
                  <Input v-model="virtualUnitFormItem.registCap" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div class="vuf-button" v-if="showVirtualUnitBtnFlag">
        <div @click="editFun">编辑</div>
        <div>保存</div>
        <div>上传</div>
      </div>
    </Modal>

  </div>
</template>

<script>
export default {
  name: 'virtualUnitForm',
  props: ['showVirtualUnitFlag', 'virtualUnitFormItem', 'virtualUnitTitle', 'showVirtualUnitBtnFlag', 'disabledVirtualUnitFlag'],
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
      this.$emit('closeModalFun', e, 3)
    },
    editFun () {
      this.$emit('disabledVirtualUnitFlagFun', false)
    }
  }
}
</script>

<style lang="less">
  .unit-modal .ivu-modal-body {
    background: #f2f2f2;
  }
  .vuf-form-body {
    width: 100%;
    height: auto;
    border: 1px solid #e2e2e2;
    background: #ffffff;
    padding: 20px;
    border-radius: 4px;
  }
  .vuf-form-box {
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
  .vuf-form-title {
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
  .vuf-button {
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
