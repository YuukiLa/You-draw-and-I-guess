<template>
	<div class="content">
		<Card class="center-card">
			<div style="text-align: center;">
				 <img :src="logo" width="80" height="80">
				<Tabs value="login">
					<TabPane label="登陆" name="login">
						<login-model button-str="登陆" @click="handleLogin"></login-model>
					</TabPane>
					<TabPane label="注册" name="regirest">
						<login-model button-str="注册" @click="handleRegister"></login-model>
					</TabPane>
				</Tabs>
			</div>
		</Card>
	</div>
</template>

<script>
	import LoginModel from './login-model'
	export default {
		components: {
			LoginModel
		},
		computed: {
			logo() {
				return require("@/assets/logo.png")
			}
		},
		methods: {
			handleLogin(data) {
				this.$ajax.postJson("/api/login",data).then(res=> {
					if(res.code===200) {
						this.$store.commit("set_user",res.data)
						localStorage.setItem("token",res.data.token)
						this.$router.replace("/")
						this.$Message.success("登陆成功")
					}else {
						this.$Message.error(res.msg)
					}

				})
			},
			handleRegister(data) {
				this.$ajax.postJson("/api/register",data).then(res=> {
					this.$Message.success("注册成功")
				})
			}
		}
	}
</script>

<style>

</style>
