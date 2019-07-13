<template>
	<div>
		userInfo界面
		<br />
		test：<test></test>
		<br />
		{{uInfo}}
		<button v-on:click="userInfo()">添加个人信息</button>
	</div>
</template>

<script>
	import store from '../../store'
	import test from '../vuecommon/test.vue'
	export default {
		components:{test},
		data() {
			return {
				uInfo:{}
			};
		},
		methods: {
			userInfo() {
				var uu=this.$children[0].userAllInfo()
				this.$store.commit('setAccountData',uu);
				this.uInfo=this.$store.state.accountInfo
			},

		},
	}
</script>

<style>

</style>
