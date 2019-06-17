<template>
	<select class="form-control" v-model.lazy="positionId" v-on:change="positionChange()">
		<option value="0">--未选择--</option>
		<option v-for="(item,index) in positionList" :key="index" v-bind:value="item.positionId">{{item.positionName}}</option>
	</select>
</template>

<script>
	import axios from 'axios'
	export default {
		name:'position',
		data() {
			return {
				positionId:'0',
				positionList:[],
				positionName:'',
			};
		},
		methods:{
			//提交职位名称和ID
			positionChange: function() {
				this.positionName = this.exchangePositionName(this.positionId)
				// alert(this.positionId+this.positionName)
				this.$emit('positionChange',this.positionId,this.positionName)
			},
			//添加前缀的部门名字兑换原来的名字
			exchangePositionName: function(param) {
				var position = {}
				
				for (var i = 0; i < this.positionList.length; i++) {
					position = this.positionList[i]
					if (position.positionId == param) {
						return position.positionName
					}
				}
			},
			// 获取所有项目
			getPosition: function() {
				var url = this.url + '/search/positionList'
			
				axios.get(url).then((response) => {
						this.positionList = response.data
						console.log(response.data)
					})
					.catch((error) => {
						console.log(error)
					});
			},
		},
		created() {
			this.getPosition()
		}
	}
</script>

<style>

</style>
