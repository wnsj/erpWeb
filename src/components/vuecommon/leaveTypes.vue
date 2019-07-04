<template>
	<select class="form-control" v-model="leaveId" v-on:change="leaveChange()">
		<option value="0">病假</option>
		<option value="1">事假</option>
		<option value="2">年假</option>
		<option value="3">婚假</option>
		<option value="4">产检</option>
		<option value="5">产假</option>
		<option value="6">哺乳假</option>
		<option value="7">丧假</option>
		<option value="8">停薪留职</option>
		<option value="9">其他</option>
	</select>
</template>

<script>
	export default {
		data() {
			return {
				leaveId: '0',
				leaveName: '病假',

				leaveList: [],
			};
		},
		methods: {
			leaveChange: function() {
				this.$emit('leaveChange', this.leaveId, this.leaveName)
			},
			setLeave: function(param) {
				this.leaveId = param
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeLeaveName: function(param) {
				var Leave = {}

				for (var i = 0; i < this.leaveList.length; i++) {
					leave = this.leaveList[i]
					if (leave.leaveID == param) {
						return leave.leaveName
					}
				}
			},
			// 获取所有项目
			getLeave: function() {
				var url = this.url + '/search/leaveList'

				axios.get(url).then((response) => {
						this.leaveList = response.data
						console.log(response.data)
					})
					.catch((error) => {
						console.log(error)
					});
			},
		},
		created() {
			// this.getLeave()
		}
	}
</script>

<style>

</style>
