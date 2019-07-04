<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default{
		components: {
	
		},
		methods: {
			setRouter(param) {
				window.location.href = param;
				//this.$router.push('/mainPage');//此方法会导致跳转2次
			}
		},
	}
</script>

