<template>
  <div>
    <Modal
      class="device-modal"
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      draggable
      :zIndex="901"
      :value="showDeviceFlag"
      class-name="vertical-center-modal"
      footer-hide
      closable
      @on-visible-change="closeModal($event)"
      :title="deviceTitle">
      <div class="df-form-body">
        <div class="df-form-box">
          <div class="df-form-title">基本信息</div>
          <Form :model="deviceFormItem" :label-width="100">
            <Row>
              <Col span="6">
                <FormItem label="设备标识:">
                  <Input v-model="deviceFormItem.subdeviceIdentif" :disabled="disabledDeviceFlag" style="width: 150px;"></Input>
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
                  <Input v-model="deviceFormItem.unitId" :disabled="disabledDeviceFlag" style="width: 130px;"></Input>
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
                  <Input :value="deviceFormItem.ratedCur" placeholder="请输入制热消耗功率" :disabled="disabledDeviceFlag"  style="width: 120px"></Input> A
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="制造日期:">
                  <DatePicker :value="deviceFormItem.madeDate" format="yyyy年MM月dd日" type="date" :disabled="disabledDeviceFlag" style="width: 150px"></DatePicker>
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
                  <DatePicker :value="deviceFormItem.manufactureDate" format="yyyy年MM月dd日" type="date" :disabled="disabledDeviceFlag" style="width: 150px"></DatePicker>
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
                  <Input v-model="deviceFormItem.ratedFreq" placeholder="请输入额定频率" :disabled="disabledDeviceFlag" style="width: 130px;"></Input> Hz
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
        <div @click="editFun">编辑</div>
        <div>保存</div>
        <div>上传</div>
      </div>
    </Modal>

  </div>
</template>

<script>
export default {
  name: 'deviceForm',
  props: ['showDeviceFlag', 'deviceFormItem', 'deviceTitle', 'disabledDeviceFlag'],
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
      this.$emit('closeModalFun', e, 4)
    },
    editFun () {
      this.$emit('disabledDeviceFlagFun', false)
    }
  }
}
</script>

<style lang="less">
  .device-modal .ivu-modal-body {
    background: #f2f2f2;
  }
  .df-form-body {
    width: 100%;
    height: auto;
    border: 1px solid #e2e2e2;
    background: #ffffff;
    padding: 20px;
    border-radius: 4px;
  }
  .df-form-box {
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
  .df-form-title {
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
  .df-button {
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
