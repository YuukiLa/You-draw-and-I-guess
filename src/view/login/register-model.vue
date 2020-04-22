<template>
  <div style="margin: 0 auto">
    <Row type="flex" justify="center">
      <Form ref="loginForm" :model="loginForm" :label-width="80" :rules="rules" style="width: 450px">
        <FormItem label="用户名" prop="account">
          <Input v-model="loginForm.account" placeholder="请输入账号"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="loginForm.password" type="password" placeholder="请输入密码"></Input>
        </FormItem>
      </Form>
    </Row>
    <Button @click="handleClick">注册</Button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm: {
          account: '',
          password: '',
        },
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleClick() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$ajax.postJson("/api/register",this.loginForm).then(res=> {

            })
          }
        })
      }
    }
  }
</script>

<style>
</style>
