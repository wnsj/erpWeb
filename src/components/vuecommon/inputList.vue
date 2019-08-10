<template>
	<div>
		<input list="addFLLevel" v-model="name" v-on:change="inputChange()" />
		<datalist id="addFLLevel">
			<option v-for="(item,index) in datalist" :key='index'>{{item.name}}</option>
		</datalist>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				datalist:[],
				name:'',
			};
		}
	}
</script>

<style>

</style>
