<template>
	<div>
	<select class="form-control" v-model="nationName" v-on:change="nationChange()">
		
		<option v-for="(item,index) in nationList" :key='index' v-bind:value="item.nation">{{item.nation}}</option>
		<option><input v-if="" /></option>
	</select>
	<button v-on:click="bianhua()">编制</button>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name:'nation',
		data() {
			return {
				nationId:'',
				nationName:'汉族',
				nationList:[],
			};
		},
		methods:{
			bianhua:function(){
				var item={
					nation:'asdfsdaf'
				}
				this.nationList.push(item)
				this.nationName='asdfsdaf'
			},
			//提交民族名称和ID
			nationChange: function() {
				// alert(this.nationName)
				this.$emit('nationChange',this.nationName)
			},
			setNation:function(nationName){
				this.nationName = nationName
			},
			// 获取所有项目
			getNation: function() {
				var url = this.url + '/search/nationList'
			
				axios.get(url).then((response) => {
						this.nationList = response.data
						// console.log(response.data)
					})
					.catch((error) => {
						console.log(error)
					});
			},
		},
		created() {
			this.getNation()
		}
	}
</script>

<style>

</style>
