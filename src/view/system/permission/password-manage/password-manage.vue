<template>
  <div>
    <Card style="width:500px; margin: auto; text-align: center">
      <Form :model="form" :label-width="120">
        <FormItem label="原始密码">
          <Input type="password" v-model="form.oldPwd" placeholder="请输入原始密码"></Input>
        </FormItem>
        <FormItem label="新密码">
          <Input type="password" v-model="form.newPwd" placeholder="请输入新密码"></Input>
        </FormItem>
        <FormItem label="验证新密码">
          <Input type="password" v-model="form.newPwdCheck" placeholder="请再次输入新密码"></Input>
        </FormItem>
      </Form>
      <br><br><br>
      <Button type="primary" @click="change">修改</Button>
    </Card>
  </div>
</template>

<script>
import { changePwd } from '@/api/system/permission/password-manage/password-manage'
import { setToken, encrypt } from '@/libs/util'
import { mapActions } from 'vuex'

export default {
  name: 'password-manage',
  data () {
    return {
      form: {
        oldPwd: '',
        newPwd: '',
        newPwdCheck: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    change () {
      if (this.form.newPwd !== this.form.newPwdCheck) {
        this.$Message.error('两次密码输入不相同,请确认两次新密码输入一致')
      } else {
        let data = {
          oldPwd: encrypt(this.form.oldPwd),
          newPwd: encrypt(this.form.newPwdCheck)
        }
        changePwd(data).then(res => {
          if (res && res.data && res.data.code === 200) {
            this.$Message.success('修改成功,请您从新登录')
            setToken('')
            setTimeout(() => {
              this.handleLogOut().then(() => {
                this.$router.push({
                  name: 'login'
                })
              })
            }, 2 * 1000)
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
