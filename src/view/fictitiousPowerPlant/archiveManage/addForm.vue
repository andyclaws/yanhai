<template>
  <div>
    <Modal
      class="add-modal"
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      draggable
      :zIndex="901"
      :value="showAddFormModal"
      class-name="vertical-center-modal"
      footer-hide
      closable
      @on-visible-change="closeModal($event)"
      :title="addFormTitle">
      <div class="add-form-body">
        <Form :model="formItem" :label-width="80" class="radio-box">
          <FormItem label="档案类型:">
            <RadioGroup v-model="formItem.archiveTypeValue" @on-change="selectArchiveType">
              <Radio label="电厂" :disabled="!showForm.showPower">电厂</Radio>
              <Radio label="业主" :disabled="!showForm.showUser">业主</Radio>
              <Radio label="机组" :disabled="!showForm.showUnit">机组</Radio>
              <Radio label="设备" :disabled="!showForm.showDevice">设备</Radio>
            </RadioGroup>
          </FormItem >
        </Form>
        <div class="form-box">
          <div class="form-title">基本信息</div>
          <div v-if="showForm.showPower">
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
                    <DatePicker :value="virtualPowerPlantFormItem.updateTime" @on-change="changeUpdateTime" format="yyyy-MM-dd" type="date" placeholder="请输入信息更新时间" style="width: 150px"></DatePicker>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="注册时间:">
                    <DatePicker :value="virtualPowerPlantFormItem.registDate" @on-change="changeRegistDateTime" format="yyyy-MM-dd" type="date" placeholder="请输入注册时间" style="width: 150px"></DatePicker>
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
                    <DatePicker :value="virtualPowerPlantFormItem.entryDate" @on-change="changeEntryDateTime" format="yyyy-MM-dd" type="date" placeholder="请输入入市时间" style="width: 150px"></DatePicker>
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
                    <DatePicker :value="virtualPowerPlantFormItem.delistDate" @on-change="changeDelistDateTime" format="yyyy-MM-dd" type="date" placeholder="请输入退市时间" style="width: 150px"></DatePicker>
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
                    <DatePicker :value="virtualPowerPlantFormItem.licenseTime" @on-change="changeLicenseTime" format="yyyy-MM-dd" type="date" placeholder="请输入许可证发证时间" style="width: 150px"></DatePicker>
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
                    <DatePicker :value="virtualPowerPlantFormItem.licenceExpTime" @on-change="changeLicenceExpTime" format="yyyy-MM-dd" type="date" placeholder="请输入许可证失效时间" style="width: 150px"></DatePicker>
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
          <div v-if="showForm.showUser">
            <Form :model="userFormItem" :label-width="100">
              <Row>
                <Col span="6">
                  <FormItem label="业主编码:">
                    <Input v-model="userFormItem.ownerNo" placeholder="请输入业主编码" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="所属区域:">
                    <Input v-model="userFormItem.areaNo" placeholder="请输入所属区域" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="电能表标识:">
                    <Input v-model="userFormItem.meterId" placeholder="请输入电能表标识" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="主变容量:">
                    <Input v-model="userFormItem.mtransformerCapacity" placeholder="请输入主变容量" style="width: 150px;"></Input> kWA
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
                  <FormItem label="主变台数:">
                    <Input v-model="userFormItem.mtransformerNumber" placeholder="请输入主变台数" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="联系人:">
                    <Input v-model="userFormItem.contactName" placeholder="请输入联系人" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="发电资源运行状态:">
                    <Input v-model="userFormItem.presourcesStae" placeholder="请输入发电资源运行状态" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="地址:">
                    <Input v-model="userFormItem.addr"  placeholder="请输入地址" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="发电资源的类型:">
                    <Input v-model="userFormItem.presourcesStype" placeholder="请输入发电资源的类型" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="发电资源简称:">
                    <Input v-model="userFormItem.presourcesShortName" placeholder="请输入发电资源简称" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="响应速度:">
                    <Input v-model="userFormItem.responseSpeed" placeholder="请输入响应速度" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="爬坡速率:">
                    <Input v-model="userFormItem.landslideRate" placeholder="请输入爬坡速率" style="width: 150px;"></Input> %/min
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="可靠指数:">
                    <Input v-model="userFormItem.reliableIndex" placeholder="请输入可靠指数" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="历史表现:">
                    <Input v-model="userFormItem.historicalPerformance" placeholder="请输入历史表现" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
          <div v-if="showForm.showUnit">
            <Form :model="virtualUnitFormItem" :label-width="100">
              <Row>
                <Col span="6">
                  <FormItem label="机组名称:">
                    <Input v-model="virtualUnitFormItem.unitName" placeholder="请输入机组名称" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="机组编码:">
                    <Input v-model="virtualUnitFormItem.unitNo" placeholder="请输入机组编码" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="机组简称:">
                    <Input v-model="virtualUnitFormItem.unitShortName" placeholder="请输入机组简称" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="所属业主:">
                    <Input v-model="virtualUnitFormItem.ownerName" placeholder="请输入所属业主" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="业主编号:">
                    <Input v-model="virtualUnitFormItem.ownerNo" placeholder="请输入业主编号" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="所属区域:">
                    <Input v-model="virtualUnitFormItem.areaNo" placeholder="请输入所属区域" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="用户标识:">
                    <Input v-model="virtualUnitFormItem.consId" placeholder="请输入用户标识" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="用户编号:">
                    <Input v-model="virtualUnitFormItem.consNo" placeholder="请输入用户编号" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="电能表标识:">
                    <Input v-model="virtualUnitFormItem.meterId" placeholder="请输入电能表标识" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="线路编号:">
                    <Input v-model="virtualUnitFormItem.lineNo" placeholder="请输入线路编号" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="所属线路:">
                    <Input v-model="virtualUnitFormItem.lineName" placeholder="请输入所属线路" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="机组类别:">
                    <Input v-model="virtualUnitFormItem.unitCategory" placeholder="请输入机组类别" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="机组类型:">
                    <Input v-model="virtualUnitFormItem.unitType" placeholder="请输入机组类型" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="机组性质:">
                    <Input v-model="virtualUnitFormItem.unitAttr" placeholder="请输入机组性质" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="额定容量:">
                    <Input :value="virtualUnitFormItem.ratedCap" placeholder="请输入额定容量" style="width: 150px"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="增容容量:">
                    <Input v-model="virtualUnitFormItem.increaseCap" placeholder="请输入增容容量" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="机组最大技术出力:">
                    <Input v-model="virtualUnitFormItem.maxTecPower" placeholder="请输入机组最大技术出力" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="机组最小技术出力:">
                    <Input v-model="virtualUnitFormItem.minTecPower" placeholder="请输入机组最小技术出力" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="接入电压:">
                    <Input v-model="virtualUnitFormItem.accessVoltage" placeholder="请输入接入电压" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="通信地址:">
                    <Input v-model="virtualUnitFormItem.commAddr" placeholder="请输入通信地址" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="爬坡率:">
                    <Input v-model="virtualUnitFormItem.rampUp" placeholder="请输入爬坡率" style="width: 150px;"></Input> %/min
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="滑坡率:">
                    <Input v-model="virtualUnitFormItem.rampDown" placeholder="请输入滑坡率" style="width: 150px;"></Input> %/min
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="经度:">
                    <Input v-model="virtualUnitFormItem.longitude" placeholder="请输入经度" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="纬度:">
                    <Input v-model="virtualUnitFormItem.latitude" placeholder="请输入纬度" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
          <div v-if="showForm.showDevice">
            <Form :model="deviceFormItem" :label-width="100">
              <Row>
                <Col span="6">
                  <FormItem label="设备标识:">
                    <Input v-model="deviceFormItem.subdeviceId" placeholder="请输入设备标识" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="设备品牌:">
                    <Input v-model="deviceFormItem.equipBrand" placeholder="请输入设备品牌" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="所属终端标识:">
                    <Input v-model="deviceFormItem.deviceId" placeholder="请输入所属终端标识" style="width: 130px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="防触电保护类别:">
                    <Input v-model="deviceFormItem.protectType" placeholder="请输入防触电保护类别" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="设备编码:">
                    <Input v-model="deviceFormItem.subdeviceNo" placeholder="请输入设备编码" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="设备型号:">
                    <Input v-model="deviceFormItem.equipModel" placeholder="请输入设备型号" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="所属机组标识:">
                    <Input v-model="deviceParentNodeId" placeholder="请输入所属机组标识" disabled style="width: 130px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="安装单位:">
                    <Input v-model="deviceFormItem.instOrg" placeholder="请输入安装单位" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="设备名称:">
                    <Input v-model="deviceFormItem.subdeviceName" placeholder="请输入设备名称" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="设备类型:">
                    <Input v-model="deviceFormItem.subdeviceType" placeholder="请输入设备类型" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="所属用户标识:">
                    <Input v-model="deviceFormItem.consId" placeholder="请输入所属用户标识" style="width: 130px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="维护单位:">
                    <Input v-model="deviceFormItem.maintainOrg" placeholder="请输入维护单位" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="安装位置:">
                    <Input v-model="deviceFormItem.instAddr" placeholder="请输入安装位置" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="防水等级:">
                    <Input v-model="deviceFormItem.waterproofLevel" placeholder="请输入防水等级" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="额定电流:">
                    <Input :value="deviceFormItem.ratedCur" placeholder="请输入额定电流" style="width: 120px"></Input> A
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="制造日期:">
                    <DatePicker :value="deviceFormItem.madeDate" @on-change="changeMadeDate" format="yyyy-MM-dd" type="date" placeholder="请输入制造日期" style="width: 150px"></DatePicker>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="投运日期:">
                    <Input v-model="deviceFormItem.runDate" placeholder="请输入投运日期" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="额定电压:">
                    <Input v-model="deviceFormItem.ratedVol" placeholder="请输入额定电压" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="额定功率:">
                    <Input v-model="deviceFormItem.ratedP" placeholder="请输入额定功率" style="width: 120px;"></Input> W
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="出厂日期:">
                    <DatePicker :value="deviceFormItem.manufactureDate" @on-change="changeManufactureDate" placeholder="请输入出厂日期" format="yyyy-MM-dd" type="date" style="width: 150px"></DatePicker>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="生产编号:">
                    <Input v-model="deviceFormItem.productNo" placeholder="请输入生产编号" style="width: 150px;"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="额定频率:">
                    <Input v-model="deviceFormItem.ratedFreq" placeholder="请输入额定频率" style="width: 120px;"></Input> Hz
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="质量:">
                    <Input v-model="deviceFormItem.quality" placeholder="请输入质量" style="width: 120px;"></Input> kg
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
          <!--<add-virtual-power-plant-form v-if="showForm.showPower" :virtualPowerPlantFormItem="virtualPowerPlantFormItem"></add-virtual-power-plant-form>-->
          <!--<add-user-form v-if="showForm.showUser" :userFormItem="userFormItem"></add-user-form>-->
          <!--<add-virtual-unit-form v-if="showForm.showUnit" :virtualUnitFormItem="virtualUnitFormItem"></add-virtual-unit-form>-->
          <!--<add-device-form v-if="showForm.showDevice" :deviceFormItem="deviceFormItem"></add-device-form>-->
        </div>
      </div>
      <div class="addButton" v-if="showForm.showPower">
        <div @click="addPowerPlant">保存</div>
        <div @click="powerPlantAddReport">上传</div>
      </div>
      <div class="addButton" v-if="showForm.showUser">
        <div @click="addUser">保存</div>
        <div @click="userAddReport" style="display: none">上传</div>
      </div>
      <div class="addButton" v-if="showForm.showUnit">
        <div @click="addUnit">保存</div>
        <div @click="unitAddReport" style="display: none">上传</div>
      </div>
      <div class="addButton" v-if="showForm.showDevice">
        <div @click="addDevice">保存</div>
        <div @click="deviceAddReport" style="display: none">上传</div>
      </div>
    </Modal>

  </div>
</template>

<script>
import axios from '@/libs/api.request'
import addVirtualPowerPlantForm from './addVirtualPowerPlantForm'
import addUserForm from './addUserForm'
import addVirtualUnitForm from './addVirtualUnitForm'
import addDeviceForm from './addDeviceForm'
export default {
  name: 'virtualPowerPlantForm',
  props: ['nodeStatus', 'showForm', 'showAddFormModal', 'addFormTitle', 'userParentNodeId', 'unitPrentNodeId', 'deviceParentNodeId'],
  components: {
    addVirtualPowerPlantForm,
    addUserForm,
    addVirtualUnitForm,
    addDeviceForm
  },
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      titleName: '',
      formItem: {
        archiveTypeValue: '电厂'
      },
      virtualPowerPlantFormItem: {
        plantNo: '',
        businessId: '',
        licenseNumber: '',
        accountBank: '',
        plantName: '',
        regionId: '',
        licenseNo: '',
        accountName: '',
        plantShortName: '',
        contrlRegionId: '',
        registNo: '',
        accountNo: '',
        businessAttr: '',
        legalRepresent: '',
        updateTime: '',
        registDate: '',
        commAddr: '',
        position: '',
        updateNumber: '',
        entryDate: '',
        postCode: '',
        orgNo: '',
        powerGenerationGroup: '',
        delistDate: '',
        legalName: '',
        unitRatedCap: '',
        purchaseUnit: '',
        entryAgreement: '',
        contactName: '',
        ratedCap: '',
        licenseTime: '',
        registCap: '',
        officeTel: '',
        unitMaxOutput: '',
        licenceExpTime: '',
        businessTerm: '',
        phoneNumber: '',
        unitMinOutput: '',
        registAddr: '',
        increaseCap: '',
        faxNumber: '',
        climbRate: '',
        unifiedCreditCode: '',
        accessVol: '',
        emailAddr: '',
        landslideRate: '',
        isLicenseExempt: '',
        statusCode: '',
        webSite: '',
        usedName: ''
      },
      userFormItem: {
        ownerNo: '',
        areaNo: '',
        meterId: '',
        mtransformerCapacity: '',
        ownerName: '',
        mtransformerNumber: '',
        contactName: '',
        presourcesStae: '',
        addr: '',
        presourcesStype: '',
        presourcesShortName: '',
        responseSpeed: '',
        landslideRate: '',
        reliableIndex: '',
        historicalPerformance: ''
      },
      virtualUnitFormItem: {
        unitName: '',
        unitNo: '',
        unitShortName: '',
        ownerName: '',
        ownerNo: '',
        areaNo: '',
        consId: '',
        consNo: '',
        meterId: '',
        lineNo: '',
        lineName: '',
        unitCategory: '',
        unitType: '',
        unitAttr: '',
        ratedCap: '',
        increaseCap: '',
        maxTecPower: '',
        minTecPower: '',
        accessVoltage: '',
        commAddr: '',
        rampUp: '',
        rampDown: '',
        longitude: '',
        latitude: ''
      },
      deviceFormItem: {
        'calorificOutput': '',
        'calorificPower': '',
        'chineseNmae': '',
        'coldMaxPressure': '',
        'consId': '',
        'deviceId': '',
        'equipBrand': '',
        'equipModel': '',
        'hotMaxPressure': '',
        'instAddr': '',
        'instOrg': '',
        'madeDate': '',
        'maintainOrg': '',
        'manufactureDate': '',
        'productNo': '',
        'protectType': '',
        'quality': '',
        'ratedCur': '',
        'ratedFreq': '',
        'ratedP': '',
        'ratedVol': '',
        'refrigerOutput': '',
        'refrigerPower': '',
        'runDate': '',
        'subdeviceId': '',
        'subdeviceName': '',
        'subdeviceNo': '',
        'subdeviceType': '',
        'unitId': '',
        'waterproofLevel': ''
      }
    }
  },
  mounted () {
  },
  methods: {
    closeModal (e) {
      this.$emit('closeModalFun', e)
    },
    // 选择头部档案类型-加载对应表单
    selectArchiveType (val) {
      if (val === '电厂') {
        this.$emit('changeNodeStatus', 1)
      }
      if (val === '业主') {
        this.$emit('changeNodeStatus', 2)
      }
      if (val === '机组') {
        this.$emit('changeNodeStatus', 3)
      }
      if (val === '设备') {
        this.$emit('changeNodeStatus', 4)
      }
    },
    // -------新增电厂-------
    changeUpdateTime (val) {
      this.virtualPowerPlantFormItem.updateTime = val
    },
    changeRegistDateTime (val) {
      this.virtualPowerPlantFormItem.registDate = val
    },
    changeEntryDateTime (val) {
      this.virtualPowerPlantFormItem.entryDate = val
    },
    changeDelistDateTime (val) {
      this.virtualPowerPlantFormItem.delistDate = val
    },
    changeLicenseTime (val) {
      this.virtualPowerPlantFormItem.licenseTime = val
    },
    changeLicenceExpTime (val) {
      this.virtualPowerPlantFormItem.licenceExpTime = val
    },
    addPowerPlant () {
      let params = {
        'accessVol': this.virtualPowerPlantFormItem.accessVol,
        'accountBank': this.virtualPowerPlantFormItem.accountBank,
        'accountName': this.virtualPowerPlantFormItem.accountName,
        'accountNo': this.virtualPowerPlantFormItem.accountNo,
        'businessAttr': this.virtualPowerPlantFormItem.businessAttr,
        'businessId': this.virtualPowerPlantFormItem.businessId,
        'businessTerm': this.virtualPowerPlantFormItem.businessTerm,
        'climbRate': this.virtualPowerPlantFormItem.climbRate,
        'commAddr': this.virtualPowerPlantFormItem.commAddr,
        'contactName': this.virtualPowerPlantFormItem.contactName,
        'contrlRegionId': this.virtualPowerPlantFormItem.contrlRegionId,
        'delistDate': this.virtualPowerPlantFormItem.delistDate,
        'emailAddr': this.virtualPowerPlantFormItem.emailAddr,
        'entryAgreement': this.virtualPowerPlantFormItem.entryAgreement,
        'entryDate': this.virtualPowerPlantFormItem.entryDate,
        'faxNumber': this.virtualPowerPlantFormItem.faxNumber,
        'increaseCap': this.virtualPowerPlantFormItem.increaseCap,
        'isLicenseExempt': this.virtualPowerPlantFormItem.isLicenseExempt,
        'landslideRate': this.virtualPowerPlantFormItem.landslideRate,
        'legalName': this.virtualPowerPlantFormItem.legalName,
        'legalRepresent': this.virtualPowerPlantFormItem.legalRepresent,
        'licenceExpTime': this.virtualPowerPlantFormItem.licenceExpTime,
        'licenseNo': this.virtualPowerPlantFormItem.licenseNo,
        'licenseNumber': this.virtualPowerPlantFormItem.licenseNumber,
        'licenseTime': this.virtualPowerPlantFormItem.licenseTime,
        'officeTel': this.virtualPowerPlantFormItem.officeTel,
        'orgNo': this.virtualPowerPlantFormItem.orgNo,
        'phoneNumber': this.virtualPowerPlantFormItem.phoneNumber,
        'plantId': this.currentNodeId,
        'plantName': this.virtualPowerPlantFormItem.plantName,
        'plantNo': this.virtualPowerPlantFormItem.plantNo,
        'plantShortName': this.virtualPowerPlantFormItem.plantShortName,
        'position': this.virtualPowerPlantFormItem.position,
        'postCode': this.virtualPowerPlantFormItem.postCode,
        'powerGenerationGroup': this.virtualPowerPlantFormItem.powerGenerationGroup,
        'purchaseUnit': this.virtualPowerPlantFormItem.purchaseUnit,
        'ratedCap': this.virtualPowerPlantFormItem.ratedCap,
        'regionId': this.virtualPowerPlantFormItem.regionId,
        'registAddr': this.virtualPowerPlantFormItem.registAddr,
        'registCap': this.virtualPowerPlantFormItem.registCap,
        'registDate': this.virtualPowerPlantFormItem.registDate,
        'registNo': this.virtualPowerPlantFormItem.registNo,
        'statusCode': this.virtualPowerPlantFormItem.statusCode,
        'unifiedCreditCode': this.virtualPowerPlantFormItem.unifiedCreditCode,
        'unitMaxOutput': this.virtualPowerPlantFormItem.unitMaxOutput,
        'unitMinOutput': this.virtualPowerPlantFormItem.unitMinOutput,
        'unitRatedCap': this.virtualPowerPlantFormItem.unitRatedCap,
        'updateNumber': this.virtualPowerPlantFormItem.updateNumber,
        'updateTime': this.virtualPowerPlantFormItem.updateTime,
        'usedName': this.virtualPowerPlantFormItem.usedName,
        'webSite': this.virtualPowerPlantFormItem.webSite
      }
      axios.request({
        url: 'armac/virtualPowerPlantFileInformationAdd',
        data: params,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('保存成功!')
          this.$emit('closeModalFun', false)
          this.$emit('resetLoadTree')
        } else {
          this.$Message.warning('保存失败!')
        }
      })
    },
    // 添加电厂上传
    powerPlantAddReport () {
      axios.request({
        url: 'armac/zhuceReport',
        method: 'get'
      }).then(res => {
        if (res.data.success === true) {
          this.$Message.success('上传成功!')
        } else {
          this.$Message.warning('上传失败!')
        }
      })
    },
    // ---------新增业主---------
    addUser () {
      let params = {
        plantId: this.userParentNodeId,
        ownerNo: this.userFormItem.ownerNo,
        areaNo: this.userFormItem.areaNo,
        meterId: this.userFormItem.meterId,
        mtransformerCapacity: this.userFormItem.mtransformerCapacity,
        ownerName: this.userFormItem.ownerName,
        mtransformerNumber: this.userFormItem.mtransformerNumber,
        contactName: this.userFormItem.contactName,
        presourcesStae: this.userFormItem.presourcesStae,
        addr: this.userFormItem.addr,
        presourcesStype: this.userFormItem.presourcesStype,
        presourcesShortName: this.userFormItem.presourcesShortName,
        responseSpeed: this.userFormItem.responseSpeed,
        landslideRate: this.userFormItem.landslideRate,
        reliableIndex: this.userFormItem.reliableIndex,
        historicalPerformance: this.userFormItem.historicalPerformance
      }
      axios.request({
        url: 'armac/userProfileInformationAdd',
        data: params,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('保存成功!')
          this.$emit('closeModalFun', false)
          this.$emit('resetLoadTree')
        } else {
          this.$Message.warning('保存失败!')
        }
      })
    },
    // 添加业主上传
    userAddReport () {
      axios.request({
        url: 'armac/zhuceReport',
        method: 'get'
      }).then(res => {
        if (res.data.success === true) {
          this.$Message.success('上传成功!')
        } else {
          this.$Message.warning('上传失败!')
        }
      })
    },
    // ---------新增机组----------
    addUnit () {
      let params = {
        ownerId: this.unitPrentNodeId,
        unitId: this.currentUnitNodeId,
        unitName: this.virtualUnitFormItem.unitName,
        unitNo: this.virtualUnitFormItem.unitNo,
        unitShortName: this.virtualUnitFormItem.unitShortName,
        ownerName: this.virtualUnitFormItem.ownerName,
        ownerNo: this.virtualUnitFormItem.ownerNo,
        areaNo: this.virtualUnitFormItem.areaNo,
        consId: this.virtualUnitFormItem.consId,
        consNo: this.virtualUnitFormItem.consNo,
        meterId: this.virtualUnitFormItem.meterId,
        lineNo: this.virtualUnitFormItem.lineNo,
        lineName: this.virtualUnitFormItem.lineName,
        unitCategory: this.virtualUnitFormItem.unitCategory,
        unitType: this.virtualUnitFormItem.unitType,
        unitAttr: this.virtualUnitFormItem.unitAttr,
        ratedCap: this.virtualUnitFormItem.ratedCap,
        increaseCap: this.virtualUnitFormItem.increaseCap,
        maxTecPower: this.virtualUnitFormItem.maxTecPower,
        minTecPower: this.virtualUnitFormItem.minTecPower,
        accessVoltage: this.virtualUnitFormItem.accessVoltage,
        commAddr: this.virtualUnitFormItem.commAddr,
        rampUp: this.virtualUnitFormItem.rampUp,
        rampDown: this.virtualUnitFormItem.rampDown,
        longitude: this.virtualUnitFormItem.longitude,
        latitude: this.virtualUnitFormItem.latitude
      }
      axios.request({
        url: 'armac/UnitFileInformationAdd',
        data: params,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('保存成功!')
          this.$emit('closeModalFun', false)
          this.$emit('resetLoadTree')
        } else {
          this.$Message.warning('保存失败!')
        }
      })
    },
    // 添加机组上传
    unitAddReport () {
      axios.request({
        url: 'armac/zhuceReport',
        method: 'get'
      }).then(res => {
        if (res.data.success === true) {
          this.$Message.success('上传成功!')
        } else {
          this.$Message.warning('上传失败!')
        }
      })
    },
    // ----------新增设备-------------
    changeMadeDate (val) {
      this.deviceFormItem.madeDate = val
    },
    changeManufactureDate (val) {
      this.deviceFormItem.manufactureDate = val
    },
    addDevice () {
      let params = {
        'unitId': this.deviceParentNodeId,
        'calorificOutput': '',
        'calorificPower': '',
        'chineseNmae': '',
        'coldMaxPressure': '',
        'consId': this.deviceFormItem.consId,
        'deviceId': this.deviceFormItem.deviceId,
        'equipBrand': this.deviceFormItem.equipBrand,
        'equipModel': this.deviceFormItem.equipModel,
        'hotMaxPressure': '',
        'instAddr': this.deviceFormItem.instAddr,
        'instOrg': this.deviceFormItem.instOrg,
        'madeDate': this.deviceFormItem.madeDate,
        'maintainOrg': this.deviceFormItem.maintainOrg,
        'manufactureDate': this.deviceFormItem.manufactureDate,
        'productNo': this.deviceFormItem.productNo,
        'protectType': this.deviceFormItem.protectType,
        'quality': this.deviceFormItem.quality,
        'ratedCur': this.deviceFormItem.ratedCur,
        'ratedFreq': this.deviceFormItem.ratedFreq,
        'ratedP': this.deviceFormItem.ratedP,
        'ratedVol': this.deviceFormItem.ratedVol,
        'refrigerOutput': '',
        'refrigerPower': '',
        'runDate': this.deviceFormItem.runDate,
        'subdeviceId': this.deviceFormItem.subdeviceId,
        'subdeviceName': this.deviceFormItem.subdeviceName,
        'subdeviceNo': this.deviceFormItem.subdeviceNo,
        'subdeviceType': this.deviceFormItem.subdeviceType,
        'unitId': this.deviceParentNodeId,
        'waterproofLevel': this.deviceFormItem.waterproofLevel
      }
      axios.request({
        url: 'armac/equipmentFileInformationAdd',
        data: params,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success('保存成功!')
          this.$emit('closeModalFun', false)
          this.$emit('resetLoadTree')
        } else {
          this.$Message.warning('保存失败!')
        }
      })
    },
    // 添加设备上传
    deviceAddReport () {
      axios.request({
        url: 'armac/zhuceReport',
        method: 'get'
      }).then(res => {
        if (res.data.success === true) {
          this.$Message.success('上传成功!')
        } else {
          this.$Message.warning('上传失败!')
        }
      })
    }
  },
  watch: {
    // 监听选择节点--添加表单弹框选中对应档案类型
    nodeStatus (val) {
      if (val === 1) {
        this.formItem.archiveTypeValue = '电厂'
      }
      if (val === 2) {
        this.formItem.archiveTypeValue = '业主'
      }
      if (val === 3) {
        this.formItem.archiveTypeValue = '机组'
      }
      if (val === 4) {
        this.formItem.archiveTypeValue = '设备'
      }
    }
  }
}
</script>

<style lang="less">
  .add-modal .ivu-modal-body {
    background: #f2f2f2;
  }
  .add-form-body {
    width: 100%;
    height: auto;
    border: 1px solid #e2e2e2;
    background: #ffffff;
    padding: 20px;
    border-radius: 4px;
    .ivu-form {
      margin-top: 0px;
      margin-left: 0px;
    }
    .ivu-form .ivu-form-item-label {
      font-size: 10px;
      margin-right: 0px;
    }
    .ivu-form .ivu-form-item-content {
      margin-left: 0px!important;
    }
  }
  .radio-box {
    width: 30%;
    height: 40px;
    padding-left: 20px;
  }
  .form-box {
    width: 100%;
    height: auto;
    border: 1px solid #e2e2e2;
    position: relative;
    margin-top: 10px;
    padding-top: 20px;
  }
  .form-title {
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
  .addButton {
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
