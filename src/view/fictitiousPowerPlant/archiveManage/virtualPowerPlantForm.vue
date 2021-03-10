<template>
  <div>
    <Modal
      class="powerplant-modal"
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      draggable
      :zIndex="901"
      :value="showVirtualPowerPlantFlag"
      class-name="vertical-center-modal"
      footer-hide
      closable
      @on-visible-change="closeModal($event)"
      :title="virtualPowerPlantTitle">
      <div class="vp-form-body">
        <div class="vp-form-box">
          <div class="vp-form-title">基本信息</div>
          <Form :model="virtualPowerPlantFormItem" :label-width="100">
            <Row>
              <Col span="6">
                <FormItem label="电厂编码:">
                  <Input v-model="virtualPowerPlantFormItem.plantNo" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="业务场景ID:">
                  <Input v-model="virtualPowerPlantFormItem.businessId" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="电子业务许可编号:">
                  <Input v-model="virtualPowerPlantFormItem.licenseNumber" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="开户银行:">
                  <Input v-model="virtualPowerPlantFormItem.accountBank" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="电厂名称:">
                  <Input v-model="virtualPowerPlantFormItem.plantName" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="地理区域ID:">
                  <Input v-model="virtualPowerPlantFormItem.regionId" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="工商营业执照号:">
                  <Input v-model="virtualPowerPlantFormItem.licenseNo" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="开户名称:">
                  <Input v-model="virtualPowerPlantFormItem.accountName" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="电厂简称:">
                  <Input v-model="virtualPowerPlantFormItem.plantShortName" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="控制区域ID:">
                  <Input v-model="virtualPowerPlantFormItem.contrlRegionId" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="税务登记证号:">
                  <Input v-model="virtualPowerPlantFormItem.registNo" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="开户账号:">
                  <Input v-model="virtualPowerPlantFormItem.accountNo" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="商业性质:">
                  <Input v-model="virtualPowerPlantFormItem.businessAttr" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="法定代表人:">
                  <Input v-model="virtualPowerPlantFormItem.legalRepresent" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="信息更新时间:">
                  <DatePicker :value="virtualPowerPlantFormItem.updateTime" @on-change="changeUpdateTime" format="yyyy-MM-dd" type="date" :disabled="disabledFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="注册时间:">
                  <DatePicker :value="virtualPowerPlantFormItem.registDate" @on-change="changeRegistDateTime" format="yyyy-MM-dd" type="date" :disabled="disabledFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="通信地址:">
                  <Input v-model="virtualPowerPlantFormItem.commAddr" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="联系人职务:">
                  <Input v-model="virtualPowerPlantFormItem.position" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="信息更新人编号:">
                  <Input v-model="virtualPowerPlantFormItem.updateNumber" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="入市时间:">
                  <DatePicker :value="virtualPowerPlantFormItem.entryDate" @on-change="changeEntryDateTime" format="yyyy-MM-dd" type="date" :disabled="disabledFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="邮政编码:">
                  <Input v-model="virtualPowerPlantFormItem.postCode" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="组织机构代码:">
                  <Input v-model="virtualPowerPlantFormItem.orgNo" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="所属发电集团:">
                  <Input v-model="virtualPowerPlantFormItem.powerGenerationGroup" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="退市时间:">
                  <DatePicker :value="virtualPowerPlantFormItem.delistDate" @on-change="changeDelistDateTime" format="yyyy-MM-dd" type="date" :disabled="disabledFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="法人名称:">
                  <Input v-model="virtualPowerPlantFormItem.legalName" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="机组额定容量:">
                  <Input v-model="virtualPowerPlantFormItem.unitRatedCap" :disabled="disabledFlag" style="width: 130px;"></Input>kW
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="购电计算单位:">
                  <Input v-model="virtualPowerPlantFormItem.purchaseUnit" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="入市协议:">
                  <Input v-model="virtualPowerPlantFormItem.entryAgreement" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="常用联系人:">
                  <Input v-model="virtualPowerPlantFormItem.contactName" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="额定上网容量:">
                  <Input v-model="virtualPowerPlantFormItem.ratedCap" :disabled="disabledFlag" style="width: 130px;"></Input>kW
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="许可证发证时间:">
                  <DatePicker :value="virtualPowerPlantFormItem.licenseTime" @on-change="changeLicenseTime" format="yyyy-MM-dd" type="date" :disabled="disabledFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="注册资本:">
                  <Input v-model="virtualPowerPlantFormItem.registCap" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="办公电话:">
                  <Input v-model="virtualPowerPlantFormItem.officeTel" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="机组最大出力:">
                  <Input v-model="virtualPowerPlantFormItem.unitMaxOutput" :disabled="disabledFlag" style="width: 130px;"></Input>kW
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="许可证失效时间:">
                  <DatePicker :value="virtualPowerPlantFormItem.licenceExpTime" @on-change="changeLicenceExpTime" format="yyyy-MM-dd" type="date" :disabled="disabledFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="营业期限:">
                  <Input v-model="virtualPowerPlantFormItem.businessTerm" :disabled="disabledFlag" style="width: 130px;"></Input>年
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="手机号码:">
                  <Input v-model="virtualPowerPlantFormItem.phoneNumber" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="机组最小出力:">
                  <Input v-model="virtualPowerPlantFormItem.unitMinOutput" :disabled="disabledFlag" style="width: 130px;"></Input>kW
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="企业注册地址:">
                  <Input v-model="virtualPowerPlantFormItem.registAddr" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="增容容量:">
                  <Input v-model="virtualPowerPlantFormItem.increaseCap" :disabled="disabledFlag" style="width: 130px;"></Input>kW
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="传真号码:">
                  <Input v-model="virtualPowerPlantFormItem.faxNumber" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="爬坡率:">
                  <Input v-model="virtualPowerPlantFormItem.climbRate" :disabled="disabledFlag" style="width: 110px;"></Input>%/min
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="统一社会信用代码:">
                  <Input v-model="virtualPowerPlantFormItem.unifiedCreditCode" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="接入电压:">
                  <Input v-model="virtualPowerPlantFormItem.accessVol" :disabled="disabledFlag" style="width: 140px;"></Input>V
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="电子邮箱:">
                  <Input v-model="virtualPowerPlantFormItem.emailAddr" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="滑坡率:">
                  <Input v-model="virtualPowerPlantFormItem.landslideRate" :disabled="disabledFlag" style="width: 110px;"></Input>%/min
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="许可证是否豁免:">
                  <Input v-model="virtualPowerPlantFormItem.isLicenseExempt" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="状态:">
                  <Input v-model="virtualPowerPlantFormItem.statusCode" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="企业网址:">
                  <Input v-model="virtualPowerPlantFormItem.webSite" :disabled="disabledFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="曾用名:">
                  <Input v-model="virtualPowerPlantFormItem.usedName" :disabled="disabledFlag" style="width: 130px;"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div class="vp-button" v-if="showBtnFlag">
        <div @click="editFun">编辑</div>
        <div @click="save">保存</div>
        <div>上传</div>
      </div>
    </Modal>

  </div>
</template>

<script>
export default {
  name: 'virtualPowerPlantForm',
  props: ['showVirtualPowerPlantFlag', 'virtualPowerPlantFormItem', 'virtualPowerPlantTitle', 'showBtnFlag', 'disabledFlag'],
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
      this.$emit('closeModalFun', e, 1)
    },
    editFun () {
      this.$emit('disabledFlagFun', false)
    },
    changeUpdateTime(val) {
      this.virtualPowerPlantFormItem.updateTime = val
    },
    changeRegistDateTime(val) {
      this.virtualPowerPlantFormItem.registDate = val
    },
    changeEntryDateTime(val) {
      this.virtualPowerPlantFormItem.entryDate = val
    },
    changeDelistDateTime(val) {
      this.virtualPowerPlantFormItem.delistDate = val
    },
    changeLicenseTime(val) {
      this.virtualPowerPlantFormItem.licenseTime = val
    },
    changeLicenceExpTime() {
      this.virtualPowerPlantFormItem.licenceExpTime = val
    },
    save() {
      let params =  {
        "accessVol": this.virtualPowerPlantFormItem.accessVol,
        "accountBank": this.virtualPowerPlantFormItem.accountBank,
        "accountName": this.virtualPowerPlantFormItem.accountName,
        "accountNo": this.virtualPowerPlantFormItem.accountNo,
        "businessAttr": this.virtualPowerPlantFormItem.businessAttr,
        "businessId": this.virtualPowerPlantFormItem.businessId,
        "businessTerm": this.virtualPowerPlantFormItem.businessTerm,
        "climbRate": this.virtualPowerPlantFormItem.climbRate,
        "commAddr": this.virtualPowerPlantFormItem.commAddr,
        "contactName": this.virtualPowerPlantFormItem.contactName,
        "contrlRegionId": this.virtualPowerPlantFormItem.contrlRegionId,
        "delistDate": this.virtualPowerPlantFormItem.delistDate,
        "emailAddr": this.virtualPowerPlantFormItem.emailAddr,
        "entryAgreement": this.virtualPowerPlantFormItem.entryAgreement,
        "entryDate": this.virtualPowerPlantFormItem.entryDate,
        "faxNumber": this.virtualPowerPlantFormItem.faxNumber,
        "increaseCap": this.virtualPowerPlantFormItem.increaseCap,
        "isLicenseExempt": this.virtualPowerPlantFormItem.isLicenseExempt,
        "landslideRate": this.virtualPowerPlantFormItem.landslideRate,
        "legalName": this.virtualPowerPlantFormItem.legalName,
        "legalRepresent": this.virtualPowerPlantFormItem.legalRepresent,
        "licenceExpTime": this.virtualPowerPlantFormItem.licenceExpTime,
        "licenseNo": this.virtualPowerPlantFormItem.licenseNo,
        "licenseNumber": this.virtualPowerPlantFormItem.licenseNumber,
        "licenseTime": this.virtualPowerPlantFormItem.licenseTime,
        "officeTel": this.virtualPowerPlantFormItem.officeTel,
        "orgNo": this.virtualPowerPlantFormItem.orgNo,
        "phoneNumber": this.virtualPowerPlantFormItem.phoneNumber,
        "plantId": this.virtualPowerPlantFormItem.plantId,
        "plantName": this.virtualPowerPlantFormItem.plantName,
        "plantNo": this.virtualPowerPlantFormItem.plantNo,
        "plantShortName": this.virtualPowerPlantFormItem.plantShortName,
        "position": this.virtualPowerPlantFormItem.position,
        "postCode": this.virtualPowerPlantFormItem.postCode,
        "powerGenerationGroup": this.virtualPowerPlantFormItem.powerGenerationGroup,
        "purchaseUnit": this.virtualPowerPlantFormItem.purchaseUnit,
        "ratedCap": this.virtualPowerPlantFormItem.ratedCap,
        "regionId": this.virtualPowerPlantFormItem.regionId,
        "registAddr": this.virtualPowerPlantFormItem.registAddr,
        "registCap": this.virtualPowerPlantFormItem.registCap,
        "registDate": this.virtualPowerPlantFormItem.registDate,
        "registNo": this.virtualPowerPlantFormItem.registNo,
        "statusCode": this.virtualPowerPlantFormItem.statusCode,
        "unifiedCreditCode": this.virtualPowerPlantFormItem.unifiedCreditCode,
        "unitMaxOutput": this.virtualPowerPlantFormItem.unitMaxOutput,
        "unitMinOutput": this.virtualPowerPlantFormItem.unitMinOutput,
        "unitRatedCap": this.virtualPowerPlantFormItem.unitRatedCap,
        "updateNumber": this.virtualPowerPlantFormItem.updateNumber,
        "updateTime": this.virtualPowerPlantFormItem.updateTime,
        "usedName": this.virtualPowerPlantFormItem.usedName,
        "webSite": this.virtualPowerPlantFormItem.webSite
      }
      this.$emit('modifyPowerPlantInfo', params)
    }
  }
}
</script>

<style lang="less">
  .powerplant-modal .ivu-modal-body {
    background: #f2f2f2;
  }
  .vp-form-body {
    width: 100%;
    height: auto;
    border: 1px solid #e2e2e2;
    background: #ffffff;
    padding: 20px;
    border-radius: 4px;
  }
  .vp-form-box {
    width: 100%;
    height: auto;
    border: 1px solid #e2e2e2;
    position: relative;
    background: #ffffff;
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
  .vp-form-title {
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
  .vp-button {
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
