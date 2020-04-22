<template>
  <div style="margin: 0 auto">
    <Row type="flex" justify="center">
      <Form ref="loginForm" :model="loginForm" :label-width="80" :rules="rules" style="width: 450px">
        <FormItem label="账号" prop="account">
          <Input v-model="loginForm.account" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="loginForm.password" type="password" placeholder="请输入密码"></Input>
        </FormItem>
      </Form>
    </Row>
    <Button @click="handleClick">{{buttonStr}}</Button>
  </div>
</template>

<script>
  export default {
    props: {
      buttonStr: {
        type: String,
        default: ''
      }
    },
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
            this.$emit("click",this.loginForm)
          }
        })
      }
    }
  }
</script>

<style>
</style>
