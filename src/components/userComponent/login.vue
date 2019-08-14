<template>
	<div class="g-center login-page" @keyup.enter="login()" id="loincss">
		<div class="loincss01">
		<h1 class="main-title">九博管理系统</h1>
		
			<input placeholder="请输入账号" v-model="accountName" style="width:100%" /><br>
			<input placeholder="请输入密码" type="password" v-model="accountPwd" style="width:100%" /><br>
			<!-- <router-link to="/mainPage"><i class="fa fa-table" aria-hidden="false"></i>登录</router-link> -->
		
			<button style="width:100%" @click="login()">{{btnText}}</button>
		</div>	

<!-- 		<div v-has='1'> 测试内容1</div>
		<div v-if='has(25)'> 测试内容2</div>
		<button @click="consoleLog()" v-has="28">测试Btn</button> -->
	</div>
</template>
<style>
	@import '../../assets/css/logincss.css';
</style>

<script>
	import axios from 'axios';
	import Cookies from 'js-cookie'

	export default {
		data() {
			return {
				accountName: '测试1',
				accountPwd: '11111111',
				accountData: {},
				btnText: '登录'
			};
		},
		methods: {
			login() {
				this.btnText = '登录中...';
				var url = this.url + "/ErpLogin/login";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						"accountName": this.accountName,
						"accountPwd": this.accountPwd
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.accountData = response.data.retData;
						//后台写入cookie不成功，先由前端代替
						if(this.isUseSetCookie){
							//cookie存储大小为4k左右，进行cookie瘦身
							Cookies.set('accessToken', this.accountData.accessToken, { expires: this.accessTokenLife });
							Cookies.set('accountData', response.data.retData.smallAccountData, { expires: this.accountDataLife });
						}
						alert("登录成功！");//添加成功
						this.$parent.setRouter("/mainPage");
					} else {
						this.btnText = '登录';
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						this.btnText = '登录';
						console.log("请求失败处理");
					}
				);
			},
			consoleLog() {
				console.log("accountData:" + this.accountInfo + "##" + this.$root.accessToken)
				console.log("Cookies:" + Cookies.get('accessToken'))
				//this.$store.dispatch('commintAccountInfo',6)
			}
		},
		created() {
			//sessionStorage.clear();
		}
	};
</script>
<style scoped>
	#app {
		display: table;
		width: 100%;
	}

	.main-title {
		text-align: center;
	}

	/* .des{text-align: center;color:#999;margin-bottom: 2em;} */
	.g-center login-page {
		height: 100%;
		width: 400px;
		margin: 13% auto 0;
	}

	.login-page {
		background: #fff;
	}
</style>
