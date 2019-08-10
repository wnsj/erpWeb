<template>
	<select class="form-control" v-model.lazy="reasonId" v-on:change="leaveChange()">
		<option value="0">--未选择--</option>
		<option v-for="(item,index) in lrList" :key="index" v-bind:value="item.reasonId">{{item.reasonName}}</option>
	</select>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'lReason',
		data() {
			return {
				reasonName: '',
				reasonId: '0',
				lrList: [],
			};
		},
		methods: {
			//提交项目名称和ID
			leaveChange: function() {
				this.reasonName = this.exchangeLeaveName(this.reasonId)
				// alert(this.reasonId + this.reasonName)
				this.$emit('leaveChange', this.reasonId, this.reasonName)
			},
			setLeaveId:function(param){
				this.reasonId=param
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeLeaveName: function(param) {
				var lReason = {}
				for (var i = 0; i < this.lrList.length; i++) {
					lReason = this.lrList[i]
					if (lReason.reasonId == param) {
						return lReason.reasonName
					}
				}
			},
			// 获取所有项目
			getLeaveReason: function() {
				var url = this.url + '/search/leaveReasonList'
	
				axios.get(url).then((response) => {
						this.lrList = response.data
						console.log('lrList')
						console.log(response.data)
					})
					.catch((error) => {
						console.log(error)
					});
			},
		},
		created() {
			this.getLeaveReason()
		}
	}
</script>

<style>

</style>
