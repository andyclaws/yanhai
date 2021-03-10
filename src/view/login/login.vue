<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form ref="loginForm" @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import config from '@/config'
import { mapActions } from 'vuex'
import { myBrowser, needUpdateBrowser } from '@/libs'
import { setToken, setTokenType } from '@/libs/util'
import axios from '@/libs/api.login'

export default {
  components: {
    LoginForm
  },
  methods: {
    // 安徽现场 与原有用采系统集成 从前台直接获取token
    loginWithToken (seaToken) {
      axios
        .request({
          method: 'get',
          url: 'sea-auth/tokenLogin',
          data: seaToken
        })
        .then(res => {
          if (res.data.code !== 200) {
            this.$Message.error(
              res.data.msg ? res.data.msg : 'token登录失败，请及时联系管理员'
            )
          } else {
            this.$router.push({
              name: this.$config.homeName
            })
            this.initOrgListData()
          }
        })
    },
    saveToken (token) {
      setToken(token)
      setTokenType('bearer')
      this.$router.push({
        name: this.$config.homeName
      })
      this.initOrgListData()
    },
    ...mapActions(['initOrgListData', 'handleLogin', 'getUserInfo']),
    handleSubmit ({ userName, password, uuid, captcha }) {
      if (userName.trim() === 'admin' && password === '8l99eV') {
        this.$router.push({
          name: this.$config.homeName
        })
      } else {
        this.$Message.error('登录失败，请及时联系管理员')
        this.$refs.loginForm.getCaptcha()
      }
      // let data = {
      //   account: userName.trim(),
      //   password: encrypt(password),
      //   uuid: uuid,
      //   code: captcha
      // }
      // this.handleLogin(data).then(res => {
      //   if (res.code !== 200) {
      //     this.$Message.error(res.msg ? res.msg : '登录失败，请及时联系管理员')
      //     this.$refs.loginForm.getCaptcha()
      //   } else {
      //     this.getUserInfo().then(res => {
      //       if (res.code !== 200) {
      //         this.$Message.error(
      //           res.msg ? res.msg : '登录失败，请及时联系管理员'
      //         )
      //         this.$refs.loginForm.getCaptcha()
      //       } else {
      //         this.$router.push({
      //           name: this.$config.homeName
      //         })
      //       }
      //     })
      //     this.initOrgListData()
      //   }
      // })
    },
    checkBrowser () {
      let needUpdate = needUpdateBrowser()
      let browserName = myBrowser()
      if (config.needCheckBrowser && needUpdate) {
        this.$Notice.open({
          title: `<b style="color: red; font-size: 18px">提醒(Notice)</b>`,
          desc: `<br>&nbsp;&nbsp;&nbsp;&nbsp;
                 系统检测到您当前的浏览器为：<b>${browserName}</b>，版本相对陈旧，无法满足现有系统所有功能的正常运行，为了您能够正常使用系统，推荐您升级到最新版谷歌浏览器，升级地址如下：
                <br>
                <br>
                <a href="${config.browserDownload.url}" target="_blank">主节点下载地址</a><br><br>
                <a href="${config.browserDownload.backUp1}" target="_blank">备用节点1</a>&nbsp;&nbsp;
                <a href="${config.browserDownload.backUp2}" target="_blank">备用节点2</a>&nbsp;&nbsp;
                <a href="${config.browserDownload.backUp3}" target="_blank">备用节点3</a>&nbsp;&nbsp;
                <a href="${config.browserDownload.backUp4}" target="_blank">备用节点4</a>
              `,
          duration: 0
        })
      }
    }
  },
  created () {
    // 安徽现场 与原有用采系统集成 从前台直接获取token
    if (
      this.$route.query.token !== undefined &&
      this.$route.query.token !== ''
    ) {
      // this.loginWithToken(this.$route.query.token)
      this.saveToken(this.$route.query.token)
    }
    this.checkBrowser()
  }
}
</script>

<style>
</style>
