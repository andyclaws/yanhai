<template>
  <div>
    <Form :model="virtualUnitFormItem" :label-width="100">
      <Row>
        <Col span="6">
          <FormItem label="机组名称:">
            <Input v-model="virtualUnitFormItem.unitName" placeholder="请输入机组名称" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="企业网址:">
            <Input v-model="virtualUnitFormItem.webSite" placeholder="请输入企业网址" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="电子业务许可编号:">
            <Input v-model="virtualUnitFormItem.licenseNumber" placeholder="请输入电子业务许可编号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="组织机构代码:">
            <Input v-model="virtualUnitFormItem.orgNo" placeholder="请输入组织机构代码" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="机组简称:">
            <Input v-model="virtualUnitFormItem.unitShortName" placeholder="请输入机组简称" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="通信地址:">
            <Input v-model="virtualUnitFormItem.commAddr" placeholder="请输入通信地址" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="工商营业执照号:">
            <Input v-model="virtualUnitFormItem.licenseNo" placeholder="请输入工商营业执照号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="机组额定容量:">
            <Input v-model="virtualUnitFormItem.unitRatedCap" placeholder="请输入机组额定容量" style="width: 130px;"></Input> kWh
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="商业性质:">
            <Input v-model="virtualUnitFormItem.businessAttr" placeholder="请输入商业性质" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="法人名称:">
            <Input v-model="virtualUnitFormItem.legalName" placeholder="请输入法人名称" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="税务登记证号:">
            <Input v-model="virtualUnitFormItem.registNo" placeholder="请输入税务登记证号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="额定上网容量:">
            <Input v-model="virtualUnitFormItem.ratedCap" placeholder="请输入额定上网容量" style="width: 130px;"></Input> kWh
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="业务场景ID:">
            <Input v-model="virtualUnitFormItem.businessId" placeholder="请输入业务场景ID" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="联系人职务:">
            <Input v-model="virtualUnitFormItem.position" placeholder="请输入联系人职务" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="信息更新时间:">
            <DatePicker :value="virtualUnitFormItem.updateTime" format="yyyy年MM月dd日" type="date" placeholder="请输入信息更新时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="机组最大出力:">
            <Input v-model="virtualUnitFormItem.unitMaxOutput" placeholder="请输入机组最大出力" style="width: 130px;"></Input> kWh
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="控制区域ID:">
            <Input v-model="virtualUnitFormItem.contrlRegionId" placeholder="请输入控制区域ID" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="邮政编码:">
            <Input v-model="virtualUnitFormItem.postCode" placeholder="请输入邮政编码" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="信息更新人编号:">
            <Input v-model="virtualUnitFormItem.updateNumber" placeholder="请输入信息更新人编号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="机组最小出力:">
            <Input v-model="virtualUnitFormItem.unitMinOutput" placeholder="请输入机组最小出力" style="width: 130px;"></Input> kWh
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="地理区域ID:">
            <Input v-model="virtualUnitFormItem.regionId" placeholder="请输入地理区域ID" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="开户银行:">
            <Input v-model="virtualUnitFormItem.accountBank" placeholder="请输入开户银行" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="所属发电集团:">
            <Input v-model="virtualUnitFormItem.powerGenerationGroup" placeholder="请输入所属发电集团" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="增容容量:">
            <Input v-model="virtualUnitFormItem.increaseCap" placeholder="请输入增容容量" style="width: 130px;"></Input> kWh
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="法定代表人:">
            <Input v-model="virtualUnitFormItem.legalRepresent" placeholder="请输入法定代表人" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="开户名称:">
            <Input v-model="virtualUnitFormItem.accountName" placeholder="请输入开户名称" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="购电计算单位:">
            <Input v-model="virtualUnitFormItem.purchaseUnit" placeholder="请输入购电计算单位" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="接入电压:">
            <Input v-model="virtualUnitFormItem.accessVol" placeholder="请输入接入电压" style="width: 135px;"></Input> V
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="常用联系人:">
            <Input v-model="virtualUnitFormItem.contactName" placeholder="请输入常用联系人" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="开户账号:">
            <Input v-model="virtualUnitFormItem.accountNo" placeholder="请输入开户账号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="许可证发证时间:">
            <DatePicker :value="virtualUnitFormItem.licenseTime" format="yyyy年MM月dd日" type="date" placeholder="请输入许可证发证时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="营业期限:">
            <Input v-model="virtualUnitFormItem.businessTerm" placeholder="请输入营业期限" style="width: 140px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="办公电话:">
            <Input v-model="virtualUnitFormItem.officeTel" placeholder="请输入办公电话" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="注册时间:">
            <DatePicker :value="virtualUnitFormItem.registDate" format="yyyy年MM月dd日" type="date" placeholder="请输入注册时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="许可证失效时间:">
            <DatePicker :value="virtualUnitFormItem.licenceExpTime" format="yyyy年MM月dd日" type="date" placeholder="请输入许可证失效时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="爬坡率:">
            <Input v-model="virtualUnitFormItem.climbRate" placeholder="请输入爬坡率" style="width: 120px;"></Input> %/min
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="手机号码:">
            <Input v-model="virtualUnitFormItem.phoneNumber" placeholder="请输入手机号码" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="入市时间:">
            <DatePicker :value="virtualUnitFormItem.entryDate" format="yyyy年MM月dd日" type="date" placeholder="请输入入市时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="注册地址:">
            <Input v-model="virtualUnitFormItem.companyRegistAddr" placeholder="请输入注册地址" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="滑坡率:">
            <Input v-model="virtualUnitFormItem.landslideRate" placeholder="请输入滑坡率" style="width: 120px;"></Input> %/min
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="传真号码:">
            <Input v-model="virtualUnitFormItem.faxNumber" placeholder="请输入传真号码" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="退市时间:">
            <DatePicker :value="virtualUnitFormItem.delistDate" format="yyyy年MM月dd日" type="date" placeholder="请输入退市时间" style="width: 150px"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="统一社会信用代码:">
            <Input v-model="virtualUnitFormItem.unifiedCreditCode" placeholder="请输入统一社会信用代码" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="状态:">
            <Input v-model="virtualUnitFormItem.statusCode" placeholder="请输入状态" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="电子邮箱:">
            <Input v-model="virtualUnitFormItem.emailAddr" placeholder="请输入电子邮箱" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="入市协议:">
            <Input v-model="virtualUnitFormItem.entryAgreement" placeholder="请输入入市协议" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="许可证是否豁免:">
            <Input v-model="virtualUnitFormItem.isLicenseExempt" placeholder="请输入许可证是否豁免" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="曾用名:">
            <Input v-model="virtualUnitFormItem.usedName" placeholder="请输入曾用名" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="注册资本:">
            <Input v-model="virtualUnitFormItem.registCap" placeholder="请输入注册资本" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="营销表号:">
            <Input v-model="virtualUnitFormItem.registCap" placeholder="请输入营销表号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="所属线路编号:">
            <Input v-model="virtualUnitFormItem.registCap" placeholder="请输入所属线路编号" style="width: 150px;"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="所属线路名称:">
            <Input v-model="virtualUnitFormItem.registCap" placeholder="请输入所属线路名称" style="width: 150px;"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'addVirtualUnitForm',
  props: ['virtualUnitFormItem'],
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
