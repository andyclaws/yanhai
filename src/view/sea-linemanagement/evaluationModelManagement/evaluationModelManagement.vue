<template>
  <div class="appraise">
    <div style="padding:1%">
      <Row>
        <Col span="11" class="cardDiv">
          <div style="padding-right:1%">
            <Card>
              <span class="title" slot="title">供电单位评价模型</span>
              <Card>
                <Form ref="formValLeft"
                      :model="formValLeft"
                      :rules="ruleValLeft"
                      :label-width="150">
                  <Row>
                    <Col span="20">
                      <FormItem label="线损合格率" prop="tgLineLossPassRate">
                        <Input size="default"
                               placeholder="台区线损合格率"
                               clearable
                               style="width: 80%"
                               v-model="formValLeft.tgLineLossPassRate"></Input> %
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="20">
                      <FormItem label="线损治理率" prop="lineLossEliRate">
                        <Input size="default"
                               placeholder="线损治理率"
                               clearable
                               style="width: 80%"
                               v-model="formValLeft.lineLossEliRate"></Input> %
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="20">
                      <FormItem label="线损率" prop="lineLossRate">
                        <Input size="default"
                               placeholder="线损率"
                               clearable
                               style="width: 80%"
                               v-model="formValLeft.lineLossRate"></Input> %
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="20">
                      <FormItem label="采集成功率" prop="collectSuccRate">
                        <Input size="default"
                               placeholder="采集成功率"
                               clearable
                               style="width: 80%"
                               v-model="formValLeft.collectSuccRate"></Input> %
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="20">
                      <FormItem label="采集覆盖率" prop="collectCoverRate">
                        <Input size="default"
                               placeholder="采集覆盖率"
                               clearable
                               style="width: 80%"
                               v-model="formValLeft.collectCoverRate"></Input> %
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </Card>
              <Button type="primary"  @click="handleSubmit('formValLeft')">确定</Button>
            </Card>
          </div>
        </Col>

        <Col span="11" class="cardDiv">
          <div style="padding-left:1%">
            <Card>
              <span class="title" slot="title">台区责任人评价模型</span>
              <Card >
                <Form ref="formValRight"
                      :model="formValRight"
                      :rules="ruleValRight"
                      :label-width="150">
                  <Row>
                    <Col span="20">
                      <FormItem label="线损合格率" prop="tgLineLossPassRate">
                        <Input size="default"
                               placeholder="台区线损合格率"
                               clearable
                               style="width: 80%"
                               v-model="formValRight.tgLineLossPassRate"></Input> %
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="20">
                      <FormItem label="线损治理率" prop="lineLossEliRate">
                        <Input size="default"
                               placeholder="线损治理率"
                               clearable
                               style="width: 80%"
                               v-model="formValRight.lineLossEliRate"></Input> %
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="20">
                      <FormItem label="线损率" prop="lineLossRate">
                        <Input size="default"
                               placeholder="线损率"
                               clearable
                               style="width: 80%"
                               v-model="formValRight.lineLossRate"></Input> %
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="20">
                      <FormItem label="采集成功率" prop="collectSuccRate">
                        <Input size="default"
                               placeholder="采集成功率"
                               clearable
                               style="width: 80%"
                               v-model="formValRight.collectSuccRate"></Input> %
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="20">
                      <FormItem label="采集覆盖率" prop="collectCoverRate">
                        <Input size="default"
                               placeholder="采集覆盖率"
                               clearable
                               style="width: 80%"
                               v-model="formValRight.collectCoverRate"></Input> %
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </Card>
              <Button type="primary"  @click="handleSubmit('formValRight')">确定</Button>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
    <div style="padding-left:1%;padding-right:1%">
      <Row>
        <Col span="24">
          <Card>
            <span class="title" slot="title">台区健康模型</span>
            <Card>
              <Form ref="formValBottom"
                    :model="formValBottom"
                    :rules="ruleValRight"
                    :label-width="150">
                <Row>
                  <Col span="8">
                    <FormItem label="采集覆盖率" prop="collectCoverRate">
                      <Input size="default"
                             placeholder="采集覆盖率"
                             clearable
                             style="width: 80%"
                             v-model="formValBottom.collectCoverRate"></Input> %
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="采集成功率" prop="collectSuccRate">
                      <Input size="default"
                             placeholder="采集成功率"
                             clearable
                             style="width: 80%"
                             v-model="formValBottom.collectSuccRate"></Input> %
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="线损率" prop="lineLossRate">
                      <Input size="default"
                             placeholder="线损率"
                             clearable
                             style="width: 80%"
                             v-model="formValBottom.lineLossRate"></Input> %
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Card>
            <Button type="primary"  @click="handleSubmit('formValBottom')">确定</Button>
          </Card>
        </Col>
      </Row>
    </div>
  </div>

</template>

<script>
export default {
  name: 'appraise',
  data () {
    return {
      formValLeft: {
        tgLineLossPassRate: '',
        lineLossEliRate: '',
        lineLossRate: '',
        collectSuccRate: '',
        collectCoverRate: ''
      },
      formValRight: {
        tgLineLossPassRate: '',
        lineLossEliRate: '',
        lineLossRate: '',
        collectSuccRate: '',
        collectCoverRate: ''
      },
      formValBottom: {
        collectCoverRate: '',
        collectSuccRate: '',
        lineLossRateL: ''
      },
      ruleValRight: {},
      ruleValLeft: {}
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>

<style  lang="less">
  @import "./evaluationModelManagement.less";
  .appraise .ivu-input{
    width: 100%
  }
  .appraise .ivu-form-item {
    margin-bottom: 30px;
  }
  .appraise .ivu-btn{
    width: 120px;
    margin-left: 40%;
    margin-top: 20px;
    /*margin-bottom: 10px;*/
  }
  .appraise .ivu-form-item-label{
    font-weight:400;
    font-style:normal;
    color:#333333;
  }
</style>
