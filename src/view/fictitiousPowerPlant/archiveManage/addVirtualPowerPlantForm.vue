<template>
  <div>
    <Form :model="virtualPowerPlantFormItem" :label-width="100">
      <Row>
        <Col span="6">
          <FormItem label="电厂编码:">
            <Input v-model="virtualPowerPlantFormItem.plantNo" placeholder="请输入电厂编码" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="业务场景ID:">
            <Input v-model="virtualPowerPlantFormItem.businessId" placeholder="请输入业务场景ID" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="电子业务许可编号:">
            <Input v-model="virtualPowerPlantFormItem.licenseNumber" placeholder="请输入电子业务许可编号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="开户银行:">
            <Input v-model="virtualPowerPlantFormItem.accountBank" placeholder="请输入开户银行" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="电厂名称:">
            <Input v-model="virtualPowerPlantFormItem.plantName" placeholder="请输入电厂名称" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="地理区域ID:">
            <Input v-model="virtualPowerPlantFormItem.regionId" placeholder="请输入地理区域ID" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="工商营业执照号:">
            <Input v-model="virtualPowerPlantFormItem.licenseNo" placeholder="请输入工商营业执照号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="开户名称:">
            <Input v-model="virtualPowerPlantFormItem.accountName" placeholder="请输入开户名称" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="电厂简称:">
            <Input v-model="virtualPowerPlantFormItem.plantShortName" placeholder="请输入电厂简称" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="控制区域ID:">
            <Input v-model="virtualPowerPlantFormItem.contrlRegionId" placeholder="请输入控制区域ID"  style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="税务登记证号:">
            <Input v-model="virtualPowerPlantFormItem.registNo" placeholder="请输入税务登记证号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="开户账号:">
            <Input v-model="virtualPowerPlantFormItem.accountNo" placeholder="请输入税务登记证号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="商业性质:">
            <Input v-model="virtualPowerPlantFormItem.businessAttr" placeholder="请输入商业性质" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="法定代表人:">
            <Input v-model="virtualPowerPlantFormItem.legalRepresent" placeholder="请输入法定代表人" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="信息更新时间:">
            <DatePicker :value="virtualPowerPlantFormItem.updateTime" format="yyyy年MM月dd日" type="date" placeholder="请输入信息更新时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="注册时间:">
            <DatePicker :value="virtualPowerPlantFormItem.registDate" format="yyyy年MM月dd日" type="date" placeholder="请输入注册时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="通信地址:">
            <Input v-model="virtualPowerPlantFormItem.commAddr" placeholder="请输入通信地址" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="联系人职务:">
            <Input v-model="virtualPowerPlantFormItem.position" placeholder="请输入联系人职务" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="信息更新人编号:">
            <Input v-model="virtualPowerPlantFormItem.updateNumber" placeholder="请输入信息更新人编号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="入市时间:">
            <DatePicker :value="virtualPowerPlantFormItem.entryDate" format="yyyy年MM月dd日" type="date" placeholder="请输入入市时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="邮政编码:">
            <Input v-model="virtualPowerPlantFormItem.postCode" placeholder="请输入邮政编码" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="组织机构代码:">
            <Input v-model="virtualPowerPlantFormItem.orgNo" placeholder="请输入组织机构代码" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="所属发电集团:">
            <Input v-model="virtualPowerPlantFormItem.powerGenerationGroup" placeholder="请输入所属发电集团" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="退市时间:">
            <DatePicker :value="virtualPowerPlantFormItem.delistDate" format="yyyy年MM月dd日" type="date" placeholder="请输入退市时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="法人名称:">
            <Input v-model="virtualPowerPlantFormItem.legalName" placeholder="请输入法人名称" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="机组额定容量:">
            <Input v-model="virtualPowerPlantFormItem.unitRatedCap" placeholder="请输入机组额定容量" style="width: 130px;"></Input>kW
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="购电计算单位:">
            <Input v-model="virtualPowerPlantFormItem.purchaseUnit" placeholder="请输入购电计算单位" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="入市协议:">
            <Input v-model="virtualPowerPlantFormItem.entryAgreement" placeholder="请输入入市协议" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="常用联系人:">
            <Input v-model="virtualPowerPlantFormItem.contactName" placeholder="请输入常用联系人" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="额定上网容量:">
            <Input v-model="virtualPowerPlantFormItem.ratedCap" placeholder="请输入额定上网容量" style="width: 130px;"></Input>kW
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="许可证发证时间:">
            <DatePicker :value="virtualPowerPlantFormItem.licenseTime" format="yyyy年MM月dd日" type="date" placeholder="请输入许可证发证时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="注册资本:">
            <Input v-model="virtualPowerPlantFormItem.registCap" placeholder="请输入注册资本" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="办公电话:">
            <Input v-model="virtualPowerPlantFormItem.officeTel" placeholder="请输入办公电话" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="机组最大出力:">
            <Input v-model="virtualPowerPlantFormItem.unitMaxOutput" placeholder="请输入机组最大出力" style="width: 130px;"></Input>kW
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="许可证失效时间:">
            <DatePicker :value="virtualPowerPlantFormItem.licenceExpTime" format="yyyy年MM月dd日" type="date" placeholder="请输入许可证失效时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="营业期限:">
            <Input v-model="virtualPowerPlantFormItem.businessTerm" placeholder="请输入营业期限" style="width: 140px;"></Input>年
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="手机号码:">
            <Input v-model="virtualPowerPlantFormItem.phoneNumber" placeholder="请输入手机号码" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="机组最小出力:">
            <Input v-model="virtualPowerPlantFormItem.unitMinOutput" placeholder="请输入机组最小出力" style="width: 130px;"></Input>kW
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="企业注册地址:">
            <Input v-model="virtualPowerPlantFormItem.registAddr" placeholder="请输入企业注册地址" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="增容容量:">
            <Input v-model="virtualPowerPlantFormItem.increaseCap" placeholder="请输入增容容量" style="width: 130px;"></Input>kW
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="传真号码:">
            <Input v-model="virtualPowerPlantFormItem.faxNumber" placeholder="请输入传真号码" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="爬坡率:">
            <Input v-model="virtualPowerPlantFormItem.climbRate" placeholder="请输入爬坡率" style="width: 100px;"></Input>%/min
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="统一社会信用代码:">
            <Input v-model="virtualPowerPlantFormItem.unifiedCreditCode" placeholder="请输入统一社会信用代码" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="接入电压:">
            <Input v-model="virtualPowerPlantFormItem.accessVol" placeholder="请输入接入电压" style="width: 140px;"></Input>V
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="电子邮箱:">
            <Input v-model="virtualPowerPlantFormItem.emailAddr" placeholder="请输入电子邮箱" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="滑坡率:">
            <Input v-model="virtualPowerPlantFormItem.landslideRate" placeholder="请输入滑坡率" style="width: 100px;"></Input>%/min
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="许可证是否豁免:">
            <Input v-model="virtualPowerPlantFormItem.isLicenseExempt" placeholder="请输入许可证是否豁免" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="状态:">
            <Input v-model="virtualPowerPlantFormItem.statusCode" placeholder="请输入状态" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="企业网址:">
            <Input v-model="virtualPowerPlantFormItem.webSite" placeholder="请输入企业网址" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="曾用名:">
            <Input v-model="virtualPowerPlantFormItem.usedName" placeholder="请输入曾用名" style="width: 130px;"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
export default {
  // 组件名
  name: 'addVirtualPowerPlantForm',
  props: ['virtualPowerPlantFormItem'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="less">
</style>
