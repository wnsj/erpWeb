<template>

	<select class="form-control" v-model="projectId" v-on:change="projectChange()">
		<option value="0">全部</option>
		<option v-for="(item, index) in projectList" :key="index" v-bind:value="item.projectID">{{item.projectName}}</option>
	</select>

</template>

<script>
	import axios from 'axios'
	export default {
		name: 'project',
		data() {
			return {
				projectName: '0',
				projectId: '0',
				projectList: [],
			};
		},
		methods: {
			//提交项目名称和ID
			projectChange: function() {
				this.projectName = this.exchangeProjectName(this.projectId)
				// alert(this.projectId + this.projectName)
				this.$emit('projectChange', this.projectId, this.projectName)
			},
			setProject:function(param){
				this.projectId = param
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeProjectName: function(param) {
				var project = {}

				for (var i = 0; i < this.projectList.length; i++) {
					project = this.projectList[i]
					if (project.projectID == param) {
						return project.projectName
					}
				}
			},
			// 获取所有项目
			getProject: function() {
				var url = this.url + '/search/projectList'

				axios.get(url).then((response) => {
						this.projectList = response.data
						console.log(response.data)
					})
					.catch((error) => {
						console.log(error)
					});
			},
		},
		created() {
			this.getProject()
		}
	}
</script>

<style>

</style>
