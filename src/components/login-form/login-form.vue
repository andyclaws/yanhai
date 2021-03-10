<template>
  <div>
    <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit" v-show="!shouldValid">
      <FormItem prop="userName">
        <Input v-model="form.userName" placeholder="请输入用户名">
          <span slot="prepend">
            <Icon :size="16" type="ios-person"></Icon>
          </span>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
        </Input>
      </FormItem>
      <!-- <FormItem prop="captcha">
        <Row :gutter="16">
          <Col span="14">
            <Input v-model="form.captcha" placeholder="请输入验证码">
              <span slot="prepend">
                <Icon :size="14" type="md-apps"></Icon>
              </span>
            </Input>
          </Col>
          <Col span="8">
            <img class="captcha" :src="captchaPath" @click="getCaptcha()" alt="">
          </Col>
        </Row>
      </FormItem> -->
      <FormItem>
        <Button @click="login" type="primary" long>登录</Button>
      </FormItem>
    </Form>
    <slider-verification v-show="shouldValid" :puzzle-img-list="imgList" :deviation="deviation" :width="width"
                         :on-success="checkSuccess" :on-error="checkError"></slider-verification>
  </div>
</template>
<script>
import SliderVerification from '_c/slider-verification'
import { getUUID } from '@/libs'
import { getCaptchaPath } from '@/api/auth/auth'

export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    SliderVerification
  },
  data () {
    return {
      form: {
        uuid: '',
        userName: '',
        password: '',
        captcha: ''
      },
      captchaPath: '',
      imgList: [
        '//upload-images.jianshu.io/upload_images/3167229-75aeda15182b9aff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/449/format/webp',
        '//upload-images.jianshu.io/upload_images/3167229-75aeda15182b9aff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/449/format/webp'
      ],
      deviation: 8,
      width: 240,
      shouldValid: false,
      errorCnt: 0
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  created () {
    // 检测Selenium模拟浏览器
    let webdriver = window.navigator.webdriver
    if (webdriver) {
      console.log('检测到Selenium模拟浏览器,验证码进行防治')
      this.deviation = -5
    }
    this.getCaptcha()
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            uuid: this.form.uuid,
            captcha: this.form.captcha
          })
        }
      })
    },
    login () {
      // todo
      // this.shouldValid = true
      this.handleSubmit()
    },
    checkSuccess () {
      this.handleSubmit()
    },
    checkError () {
      this.errorCnt++
      if (this.errorCnt > 10) {
        this.$Message.error({
          content: '验证失败超过10次, 请刷新页面重试',
          duration: 10,
          closable: true
        })
        // todo 验证失败超过10次,记录失败日志
      }
    },
    getCaptcha () {
      this.form.uuid = getUUID()
      this.form.captcha = ''
      this.captchaPath = getCaptchaPath(this.form.uuid)
    }
  }
}
</script>
<style scoped>
  .captcha {
    height: 26px;
    width: 100px;
  }
  .ivu-form-item {
    margin-bottom: 18px;
  }
</style>
