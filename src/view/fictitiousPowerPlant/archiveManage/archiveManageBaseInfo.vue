<template>
  <div>
    <div class="header">
      <p><img src="./images/u2269.png" alt=""></p>
      <p v-if="nodeStatus===1"><span>虚拟电厂档案信息</span></p>
      <p v-if="nodeStatus===2"><span>业主档案信息</span></p>
      <p v-if="nodeStatus===3"><span>机组档案信息</span></p>
      <p v-if="nodeStatus===4"><span>设备档案信息</span></p>
    </div>
    <div class="base-info">
      <div>基本信息</div>
      <div class="left-info" v-if="nodeStatus===1">
        <div>
          <div>
            <p>电厂编码：<span>{{virtualPowerPlantBaseInfo.plantNo}}</span></p>
            <p>电厂名称：<span>{{virtualPowerPlantBaseInfo.plantName}}</span></p>
            <p>电厂简称：<span>{{virtualPowerPlantBaseInfo.plantShortName}}</span></p>
            <p>常用联系人：<span>{{virtualPowerPlantBaseInfo.contactName}}</span></p>
          </div>
          <div>
            <p>办公电话：<span>{{virtualPowerPlantBaseInfo.officeTel}}</span></p>
            <p>手机号码：<span>{{virtualPowerPlantBaseInfo.phoneNumber}}</span></p>
            <p>传真号码：<span>{{virtualPowerPlantBaseInfo.faxNumber}}</span></p>
            <p>企业网址：<span>{{virtualPowerPlantBaseInfo.webSite}}</span></p>
          </div>
          <div>
            <p>电子邮箱：<span>{{virtualPowerPlantBaseInfo.emailAddr}}</span></p>
            <p>电子业务许可编号：<span>{{virtualPowerPlantBaseInfo.licenseNumber}}</span></p>
            <p>开户银行：<span>{{virtualPowerPlantBaseInfo.accountBank}}</span></p>
            <p>开户名称：<span>{{virtualPowerPlantBaseInfo.accountName}}</span></p>
          </div>
          <div>
            <p>商业性质：<span>{{virtualPowerPlantBaseInfo.businessAttr}}</span></p>
            <p>业务场景ID：<span>{{virtualPowerPlantBaseInfo.businessId}}</span></p>
            <p>法人名称：<span>{{virtualPowerPlantBaseInfo.legalName}}</span></p>
            <p>邮政编码：<span>{{virtualPowerPlantBaseInfo.postCode }}</span></p>
          </div>
        </div>
        <div>
          <div>通信地址：<span>{{virtualPowerPlantBaseInfo.commAddr}}</span></div>
          <div>开户账号：<span>{{virtualPowerPlantBaseInfo.accountNo}}</span></div>
        </div>
      </div>
      <div class="left-info" v-if="nodeStatus===2">
        <div>
          <div>
            <p>业主编码：<span>{{userBaseInfo.ownerNo}}</span></p>
            <p>业主名称：<span>{{userBaseInfo.ownerName}}</span></p>
            <p>所属区域：<span>{{userBaseInfo.areaNo}}</span></p>
            <p>电能表标识：<span>{{userBaseInfo.meterId}}</span></p>
          </div>
          <div>
            <p>主变容量：<span>{{userBaseInfo.mtransformerCapacity}}</span></p>
            <p>主变台数：<span>{{userBaseInfo.mtransformerNumber}}</span></p>
            <p>联系人：<span>{{userBaseInfo.contactName}}</span></p>
            <p>发电资源运行状态：<span>{{userBaseInfo.presourcesStae}}</span></p>
          </div>
          <div>
            <p>地址：<span>{{userBaseInfo.addr}}</span></p>
            <p>发电资源的类型：<span>{{userBaseInfo.presourcesStype}}</span></p>
            <p>发电资源简称：<span>{{userBaseInfo.presourcesShortName }}</span></p>
            <p>响应速度：<span>{{userBaseInfo.responseSpeed}}</span></p>
          </div>
          <div>
            <p>爬坡速率：<span>{{userBaseInfo.landslideRate}}</span></p>
            <p>可靠指数：<span>{{userBaseInfo.reliableIndex}}</span></p>
            <p>历史表现：<span>{{userBaseInfo.historicalPerformance}}</span></p>
          </div>
        </div>
        <div>
          <!--<div>业主地址：<span>{{userBaseInfo.ownerAddr}}</span></div>-->
          <!--<div>开户账号：<span>{{userBaseInfo.accountNo}}</span></div>-->
        </div>
      </div>
      <div class="unit-info" v-if="nodeStatus===3">
        <div>
          <div>
            <p>机组名称：<span>{{unitBaseInfo.unitName}}</span></p>
            <p>机组编码：<span>{{unitBaseInfo.unitNo}}</span></p>
            <p>机组简称：<span>{{unitBaseInfo.unitShortName}}</span></p>
            <p>所属业主：<span>{{unitBaseInfo.ownerName}}</span></p>
            <p>业主编号：<span>{{unitBaseInfo.ownerNo}}</span></p>
          </div>
          <div>
            <p>所属区域：<span>{{unitBaseInfo.areaNo}}</span></p>
            <p>用户标识：<span>{{unitBaseInfo.consId}}</span></p>
            <p>用户编号：<span>{{unitBaseInfo.consNo}}</span></p>
            <p>电能表标识：<span>{{unitBaseInfo.meterId}}</span></p>
          </div>
          <div>
            <p>所属线路：<span>{{unitBaseInfo.lineName}}</span></p>
            <p>机组类别：<span>{{unitBaseInfo.unitCategory}}</span></p>
            <p>机组类型：<span>{{unitBaseInfo.unitType}}</span></p>
            <p>机组性质：<span>{{unitBaseInfo.unitAttr}}</span></p>
            <p>额定容量：<span>{{unitBaseInfo.ratedCap}}</span></p>
          </div>
          <div>
            <p>增容容量：<span>{{unitBaseInfo.increaseCap}}</span></p>
            <p>机组最大技术出力：<span>{{unitBaseInfo.maxTecPower}}</span></p>
            <p>机组最小技术出力：<span>{{unitBaseInfo.minTecPower}}</span></p>
            <p>接入电压：<span>{{unitBaseInfo.accessVoltage}}</span></p>
            <p>通信地址：<span>{{unitBaseInfo.commAddr}}</span></p>
          </div>
        </div>
      </div>
      <div class="left-info device-info" v-if="nodeStatus===4">
        <div>
          <div>
            <p>设备标识：<span>{{deviceBaseInfo.subdeviceId}}</span></p>
            <p>设备编码：<span>{{deviceBaseInfo.subdeviceNo}}</span></p>
            <p>设备名称：<span>{{deviceBaseInfo.subdeviceName}}</span></p>
            <p>设备类型：<span>{{deviceBaseInfo.subdeviceType}}</span></p>
            <p>所属终端标识：<span>{{deviceBaseInfo.deviceId}}</span></p>
            <p>所属机组标识：<span>{{deviceBaseInfo.unitId}}</span></p>
            <p>所属用户标识：<span>{{deviceBaseInfo.consId}}</span></p>
          </div>
          <div>
            <p>安装位置：<span>{{deviceBaseInfo.instAddr }}</span></p>
            <p>安装单位：<span>{{deviceBaseInfo.instOrg}}</span></p>
            <p>维护单位：<span>{{deviceBaseInfo.maintainOrg}}</span></p>
            <p>设备品牌：<span>{{deviceBaseInfo.equipBrand}}</span></p>
            <p>设备型号：<span>{{deviceBaseInfo.equipModel}}</span></p>
            <p>额定电压：<span>{{deviceBaseInfo.ratedVol}}</span></p>
            <p>额定电流：<span>{{deviceBaseInfo.ratedCur}}</span></p>
            <p>投运日期：<span>{{deviceBaseInfo.runDate}}</span></p>
          </div>
          <div>
            <p>额定功率：<span>{{deviceBaseInfo.ratedP }}</span></p>
            <p>额定频率：<span>{{deviceBaseInfo.ratedFreq}}</span></p>
            <p>质量：<span>{{deviceBaseInfo.quality}}</span></p>
            <p>防触电保护类别：<span>{{deviceBaseInfo.protectType}}</span></p>
            <p>生产编号：<span>{{deviceBaseInfo.productNo}}</span></p>
            <p>防水等级：<span>{{deviceBaseInfo.waterproofLevel}}</span></p>
            <p>制造日期：<span>{{deviceBaseInfo.madeDate}}</span></p>
            <p>出厂日期：<span>{{deviceBaseInfo.manufactureDate }}</span></p>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div class="right-btn" v-if="nodeStatus===1 || nodeStatus===2 || nodeStatus===3">
        <div @click="maintainInfo">信息维护</div>
        <div @click="viewMore">查看更多</div>
      </div>
    </div>
    <div class="right-btn" v-if="nodeStatus===4">
      <div @click="maintainInfo">信息维护</div>
    </div>
    <!--虚拟电厂-->
    <Modal
      class="powerplant-modal"
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      draggable
      :zIndex="901"
      :value="showVirtualPowerPlantFlag"
      class-name="vertical-center-modal"
      footer-hide
      closable
      @on-visible-change="closePowerPantModal($event)"
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
        <div @click="editPwerPlantFun">编辑</div>
        <div @click="modifyPowerPlantInfo">保存</div>
        <div @click="powerPlantModifyReport">上传</div>
      </div>
    </Modal>
    <!--业主-->
    <Modal
      class="user-modal"
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      draggable
      :zIndex="901"
      :value="showUserFlag"
      class-name="vertical-center-modal"
      footer-hide
      closable
      @on-visible-change="closeUserModal($event)"
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
                <FormItem label="所属区域:">
                  <Input v-model="userFormItem.areaNo" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="电能表标识:">
                  <Input v-model="userFormItem.meterId" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="主变容量:">
                  <Input v-model="userFormItem.mtransformerCapacity" :disabled="disabledUserFlag" style="width: 150px;"></Input> kWA
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
                <FormItem label="主变台数:">
                  <Input v-model="userFormItem.mtransformerNumber" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="联系人:">
                  <Input v-model="userFormItem.contactName" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="发电资源运行状态:">
                  <Input v-model="userFormItem.presourcesStae" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="地址:">
                  <Input v-model="userFormItem.addr" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="发电资源的类型:">
                  <Input v-model="userFormItem.presourcesStype" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="发电资源简称:">
                  <Input v-model="userFormItem.presourcesShortName" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="响应速度:">
                  <Input v-model="userFormItem.responseSpeed" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="爬坡速率:">
                  <Input v-model="userFormItem.landslideRate" :disabled="disabledUserFlag" style="width: 150px;"></Input> %/min
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="可靠指数:">
                  <Input v-model="userFormItem.reliableIndex" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="历史表现:">
                  <Input v-model="userFormItem.historicalPerformance" :disabled="disabledUserFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div class="uf-button" v-if="showUserBtnFlag">
        <div @click="editUserFun">编辑</div>
        <div @click="modifyUserInfo">保存</div>
        <div @click="userModifyReport" style="display: none">上传</div>
      </div>
    </Modal>
    <!--机组-->
    <Modal
      class="unit-modal"
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      draggable
      :zIndex="901"
      :value="showVirtualUnitFlag"
      class-name="vertical-center-modal"
      footer-hide
      closable
      @on-visible-change="closeUnitModal($event)"
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
                <FormItem label="机组编码:">
                  <Input v-model="virtualUnitFormItem.unitNo" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="机组简称:">
                  <Input v-model="virtualUnitFormItem.unitShortName" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="所属业主:">
                  <Input v-model="virtualUnitFormItem.ownerName" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="业主编号:">
                  <Input v-model="virtualUnitFormItem.ownerNo" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="所属区域:">
                  <Input v-model="virtualUnitFormItem.areaNo" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="用户标识:">
                  <Input v-model="virtualUnitFormItem.consId" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="用户编号:">
                  <Input v-model="virtualUnitFormItem.consNo" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="电能表标识:">
                  <Input v-model="virtualUnitFormItem.meterId" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="线路编号:">
                  <Input v-model="virtualUnitFormItem.lineNo" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="所属线路:">
                  <Input v-model="virtualUnitFormItem.lineName" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="机组类别:">
                  <Input v-model="virtualUnitFormItem.unitCategory" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="机组类型:">
                  <Input v-model="virtualUnitFormItem.unitType" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="机组性质:">
                  <Input v-model="virtualUnitFormItem.unitAttr" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="额定容量:">
                  <Input :value="virtualUnitFormItem.ratedCap" :disabled="disabledVirtualUnitFlag" style="width: 150px"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="增容容量:">
                  <Input v-model="virtualUnitFormItem.increaseCap" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="机组最大技术出力:">
                  <Input v-model="virtualUnitFormItem.maxTecPower" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="机组最小技术出力:">
                  <Input v-model="virtualUnitFormItem.minTecPower" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="接入电压:">
                  <Input v-model="virtualUnitFormItem.accessVoltage" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="通信地址:">
                  <Input v-model="virtualUnitFormItem.commAddr" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="爬坡率:">
                  <Input v-model="virtualUnitFormItem.rampUp" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input> %/min
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="滑坡率:">
                  <Input v-model="virtualUnitFormItem.rampDown" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input> %/min
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="经度:">
                  <Input v-model="virtualUnitFormItem.longitude" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="纬度:">
                  <Input v-model="virtualUnitFormItem.latitude" :disabled="disabledVirtualUnitFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div class="vuf-button" v-if="showVirtualUnitBtnFlag">
        <div @click="editUnitFun">编辑</div>
        <div @click="modifyUnitInfo">保存</div>
        <div @click="unitModifyReport" style="display: none">上传</div>
      </div>
    </Modal>
    <!--设备-->
    <Modal
      class="device-modal"
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      draggable
      :zIndex="901"
      :value="showDeviceFlag"
      class-name="vertical-center-modal"
      footer-hide
      closable
      @on-visible-change="closeDeviceModal($event)"
      :title="deviceTitle">
      <div class="df-form-body">
        <div class="df-form-box">
          <div class="df-form-title">基本信息</div>
          <Form :model="deviceFormItem" :label-width="100">
            <Row>
              <Col span="6">
                <FormItem label="设备标识:">
                  <Input v-model="deviceFormItem.subdeviceId" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="设备品牌:">
                  <Input v-model="deviceFormItem.equipBrand" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="所属终端标识:">
                  <Input v-model="deviceFormItem.deviceId" :disabled="disabledDeviceFlag" style="width: 130px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="防触电保护类别:">
                  <Input v-model="deviceFormItem.protectType" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="设备编码:">
                  <Input v-model="deviceFormItem.subdeviceNo" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="设备型号:">
                  <Input v-model="deviceFormItem.equipModel" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="所属机组标识:">
                  <Input v-model="deviceFormItem.unitId" disabled style="width: 130px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="安装单位:">
                  <Input v-model="deviceFormItem.instOrg" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="设备名称:">
                  <Input v-model="deviceFormItem.subdeviceName" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="设备类型:">
                  <Input v-model="deviceFormItem.subdeviceType" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="所属用户标识:">
                  <Input v-model="deviceFormItem.consId" :disabled="disabledDeviceFlag" style="width: 130px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="维护单位:">
                  <Input v-model="deviceFormItem.maintainOrg" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="安装位置:">
                  <Input v-model="deviceFormItem.instAddr" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="防水等级:">
                  <Input v-model="deviceFormItem.waterproofLevel" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="额定电流:">
                  <Input :value="deviceFormItem.ratedCur" :disabled="disabledDeviceFlag"  style="width: 120px"></Input> A
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="制造日期:">
                  <DatePicker :value="deviceFormItem.madeDate" @on-change="changeMadeDate" format="yyyy-MM-dd" type="date" :disabled="disabledDeviceFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="投运日期:">
                  <Input v-model="deviceFormItem.runDate" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="额定电压:">
                  <Input v-model="deviceFormItem.ratedVol" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="额定功率:">
                  <Input v-model="deviceFormItem.ratedP" :disabled="disabledDeviceFlag" style="width: 120px;"></Input> W
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="出厂日期:">
                  <DatePicker :value="deviceFormItem.manufactureDate" @on-change="changeManufactureDate" format="yyyy-MM-dd" type="date" :disabled="disabledDeviceFlag" style="width: 150px"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="生产编号:">
                  <Input v-model="deviceFormItem.productNo" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="额定频率:">
                  <Input v-model="deviceFormItem.ratedFreq" :disabled="disabledDeviceFlag" style="width: 130px;"></Input> Hz
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="质量:">
                  <Input v-model="deviceFormItem.quality" :disabled="disabledDeviceFlag" style="width: 120px;"></Input> kg
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div class="df-button">
        <div @click="editDeviceFun">编辑</div>
        <div @click="modifyDeviceInfo">保存</div>
        <div @click="deviceModifyReport" style="display: none">上传</div>
      </div>
    </Modal>
    <!--业主-->
    <!--虚拟电厂-->
    <!--<virtual-power-plant-form :virtualPowerPlantFormItem="virtualPowerPlantFormItem" :virtualPowerPlantTitle="virtualPowerPlantTitle" :showBtnFlag="showBtnFlag" :disabledFlag="disabledFlag" :showVirtualPowerPlantFlag="showVirtualPowerPlantFlag" @closeModalFun="closeModalFun" @disabledFlagFun="disabledFlagFun" @modifyPowerPlantInfo="modifyPowerPlantInfo"></virtual-power-plant-form>-->
    <!--业主-->
    <!--<user-form :userFormItem="userFormItem" :userTitle="userTitle" :showUserBtnFlag="showUserBtnFlag" :disabledUserFlag="disabledUserFlag" :showUserFlag="showUserFlag" @closeModalFun="closeModalFun" @disabledUserFlagFun="disabledUserFlagFun"></user-form>-->
    <!--虚拟机组-->
    <!--<virtual-unit-form :virtualUnitFormItem="virtualUnitFormItem" :virtualUnitTitle="virtualUnitTitle" :showVirtualUnitBtnFlag="showVirtualUnitBtnFlag" :disabledVirtualUnitFlag="disabledVirtualUnitFlag" :showVirtualUnitFlag="showVirtualUnitFlag" @closeModalFun="closeModalFun" @disabledVirtualUnitFlagFun="disabledVirtualUnitFlagFun"></virtual-unit-form>-->
    <!--设备-->
    <!--<device-form :deviceFormItem="deviceFormItem" :deviceTitle="deviceTitle" :disabledDeviceFlag="disabledDeviceFlag" :showDeviceFlag="showDeviceFlag" @closeModalFun="closeModalFun" @disabledDeviceFlagFun="disabledDeviceFlagFun"></device-form>-->
  </div>
</template>

<script>
import axios from '@/libs/api.request'
import virtualPowerPlantForm from './virtualPowerPlantForm'
import userForm from './userForm'
import virtualUnitForm from './virtualUnitForm'
import deviceForm from './deviceForm'
export default {
  name: 'archiveManageBaseInfo',
  props: [
    'nodeStatus',
    'currentNodeId',
    'currentUserNodeId',
    'currentUnitNodeId',
    'currentDeviceNodeId',
    'closeModifyPowerPlantModal',
    'virtualPowerPlantFormItem',
    'virtualPowerPlantBaseInfo',
    'userFormItem',
    'userBaseInfo',
    'virtualUnitFormItem',
    'unitBaseInfo',
    'deviceFormItem',
    'deviceBaseInfo'
  ],
  components: {
    virtualPowerPlantForm,
    userForm,
    virtualUnitForm,
    deviceForm
  },
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      // 虚拟电厂
      virtualPowerPlantTitle: '',
      showVirtualPowerPlantFlag: false,
      showBtnFlag: true,
      disabledFlag: true,
      // 业主
      userTitle: '',
      showUserFlag: false,
      showUserBtnFlag: true,
      disabledUserFlag: true,
      // 虚拟机组
      virtualUnitTitle: '',
      showVirtualUnitFlag: false,
      showVirtualUnitBtnFlag: true,
      disabledVirtualUnitFlag: true,
      // 设备
      deviceTitle: '',
      showDeviceFlag: false,
      disabledDeviceFlag: true
    }
  },
  mounted () {
  },
  methods: {
    // 信息维护
    maintainInfo () {
      if (this.nodeStatus === 1) {
        this.showVirtualPowerPlantFlag = true
        this.virtualPowerPlantTitle = '虚拟电厂信息维护'
        this.showBtnFlag = true
        this.disabledFlag = true
        this.loadPowerPlantData()
      }
      if (this.nodeStatus === 2) {
        this.showUserFlag = true
        this.userTitle = '业主信息维护'
        this.showUserBtnFlag = true
        this.disabledUserFlag = true
        this.loadUserData()
      }
      if (this.nodeStatus === 3) {
        this.showVirtualUnitFlag = true
        this.virtualUnitTitle = '机组信息维护'
        this.showVirtualUnitBtnFlag = true
        this.disabledVirtualUnitFlag = true
        this.loadUnitData()
      }
      if (this.nodeStatus === 4) {
        this.showDeviceFlag = true
        this.deviceTitle = '设备信息维护'
        this.disabledDeviceFlag = true
        this.loadDeviceData()
      }
    },
    // 查看更多
    viewMore () {
      if (this.nodeStatus === 1) {
        this.showVirtualPowerPlantFlag = true
        this.virtualPowerPlantTitle = '虚拟电厂信息查看'
        this.showBtnFlag = false
        this.disabledFlag = true
        this.loadPowerPlantData()
      }
      if (this.nodeStatus === 2) {
        this.showUserFlag = true
        this.userTitle = '业主信息查看'
        this.showUserBtnFlag = false
        this.disabledUserFlag = true
        this.loadUserData()
      }
      if (this.nodeStatus === 3) {
        this.showVirtualUnitFlag = true
        this.virtualUnitTitle = '机组信息查看'
        this.showVirtualUnitBtnFlag = false
        this.disabledVirtualUnitFlag = true
        this.loadUnitData()
      }
    },
    // 加载电厂信息
    loadPowerPlantData () {
      axios.request({
        url: 'armac/virtualPowerPlantFileInformation',
        method: 'post'
      }).then(res => {
        if (res.status === 200) {
          let powerPlantInfo = res.data.virtualPowerPlantInformation_BasicInformationResp === null ? {} : res.data.virtualPowerPlantInformation_BasicInformationResp
          this.$emit('resetLoadPowerPlantData', powerPlantInfo)
        }
      })
    },
    // 加载业主信息
    loadUserData () {
      axios.request({
        url: 'armac/userProfileInformation',
        data: this.currentUserNodeId,
        method: 'post'
      }).then(res => {
        if (res.status === 200) {
          let userInfo = res.data.userProfileInformation_basicInformationResp === null ? {} : res.data.userProfileInformation_basicInformationResp
          this.$emit('resetLoadUserData', userInfo)
        }
      })
    },
    // 加载机组信息
    loadUnitData () {
      axios.request({
        url: 'armac/unitFileInformation',
        data: this.currentUnitNodeId,
        method: 'post'
      }).then(res => {
        if (res.status === 200) {
          let unitInfo = res.data.unitFileInformation_basicInformationResp === null ? {} : res.data.unitFileInformation_basicInformationResp
          this.$emit('resetLoadUnitData', unitInfo)
        }
      })
    },
    // 加载设备信息
    loadDeviceData () {
      let params = {
        subdeviceId: this.currentDeviceNodeId
      }
      axios.request({
        url: 'armac/equipmentFileInformation',
        data: params,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          let deviceInfo = res.data.data === null ? {} : res.data.data
          this.$emit('resetLoadDeviceData', deviceInfo)
        }
      })
    },
    closeModalFun (val, type) {
      if (type === 1) {
        if (val === false) {
          this.showVirtualPowerPlantFlag = false
        }
      }
      if (type === 2) {
        if (val === false) {
          this.showUserFlag = false
        }
      }
      if (type === 3) {
        if (val === false) {
          this.showVirtualUnitFlag = false
        }
      }
      if (type === 4) {
        if (val === false) {
          this.showDeviceFlag = false
        }
      }
    },

    // ---------电厂修改信息-----------
    closePowerPantModal (val) {
      if (val === false) {
        this.showVirtualPowerPlantFlag = false
      }
    },
    // 编辑按钮
    editPwerPlantFun () {
      this.disabledFlag = false
    },
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
    changeLicenceExpTime () {
      this.virtualPowerPlantFormItem.licenceExpTime = val
    },
    // 保存按钮
    modifyPowerPlantInfo () {
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
      this.$emit('modifyPowerPlantInfo', params)
      this.showVirtualPowerPlantFlag = false
    },
    // 电厂上传
    powerPlantModifyReport () {
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
    // -------------业主信息修改--------------
    closeUserModal (val) {
      if (val === false) {
        this.showUserFlag = false
      }
    },
    editUserFun () {
      this.disabledUserFlag = false
    },
    modifyUserInfo () {
      let params = {
        ownerId: this.currentUserNodeId,
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
      this.$emit('modifyUserInfo', params)
      this.showUserFlag = false
    },
    // 业主上传
    userModifyReport () {
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

    // ----------机组信息修改----------
    closeUnitModal (val) {
      if (val === false) {
        this.showVirtualUnitFlag = false
      }
    },
    editUnitFun () {
      this.disabledVirtualUnitFlag = false
    },
    modifyUnitInfo () {
      let params = {
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
      this.$emit('modifyUnitInfo', params)
      this.showVirtualUnitFlag = false
    },
    // 机组上传
    unitModifyReport () {
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
    //  --------------设备信息修改-------------
    closeDeviceModal (val) {
      if (val === false) {
        this.showDeviceFlag = false
      }
    },
    editDeviceFun () {
      this.disabledDeviceFlag = false
    },
    changeMadeDate (val) {
      this.deviceFormItem.madeDate = val
    },
    changeManufactureDate (val) {
      this.deviceFormItem.manufactureDate = val
    },
    modifyDeviceInfo () {
      let params = {
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
        'unitId': this.deviceFormItem.unitId,
        'waterproofLevel': this.deviceFormItem.waterproofLevel
      }
      this.$emit('modifyDeviceInfo', params)
      this.showDeviceFlag = false
    },
    // 设备上传
    deviceModifyReport () {
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
  watch: {}
}
</script>

<style lang="less">
</style>
