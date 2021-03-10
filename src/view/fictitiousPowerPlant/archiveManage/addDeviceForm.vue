<template>
  <div>
    <Form :model="deviceFormItem" :label-width="100">
      <Row>
        <Col span="6">
          <FormItem label="设备标识:">
            <Input v-model="deviceFormItem.subdeviceIdentif" placeholder="请输入设备标识" style="width: 150px;"></Input>
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
            <Input v-model="deviceFormItem.unitId" placeholder="请输入所属机组标识" style="width: 130px;"></Input>
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
            <DatePicker :value="deviceFormItem.madeDate" format="yyyy年MM月dd日" type="date" placeholder="请输入制造日期" style="width: 150px"></DatePicker>
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
            <DatePicker :value="deviceFormItem.manufactureDate" placeholder="请输入出厂日期" format="yyyy年MM月dd日" type="date" style="width: 150px"></DatePicker>
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
</template>

<script>
export default {
  name: 'addDeviceForm',
  props: ['deviceFormItem'],
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
