<template>
	<div>
		<span class="countdate">部门：</span>
		<depart @departChange='departChange'></depart>
		<span class="countdate">岗位：</span>
		<select class="form-control" v-model.lazy="positionId" v-on:change="positionChange()">
			<option value="0">---请选择---</option>
			<option v-for="(item,index) in positionList" :key="index" v-bind:value="item.position_ID">{{item.position_Name}}</option>
		</select>
	</div>
</template>

<script>
	import axios from "axios";
	import depart from '../vuecommon/department.vue'
	import position from '../vuecommon/position.vue'
	export default {
		name: "deptchange",
		components: {
			depart,
			position
		},
		data() {
			return {
				departName: "",
				departId: "0",
				positionId: '0',
				positionName: '',
				positionList: [],
			};
		},
		methods: {
			departChange: function(departId, departName) {
				this.departLinkChange(departId)
				this.$emit('departChange',departId,departName)
				this.positionId='0'
			},
			positionChange: function() {
				this.$emit('positionChange', this.positionId)
			},
			
			//岗位随部门ID联动
			departLinkChange(departId) {
				var url = this.url + "/kqParamSetContr/queryDepartmentPosition";
				axios({
						method: "post",
						url: url,
						headers: {
							"Content-Type": this.contentType,
							"Access-Token": this.accessToken
						},
						data: {
							deptId: departId
						},
						dataType: "json"
					})
					.then(response => {
						if (response.data.retCode == "0000") {
							this.positionList = response.data.retData
							
						} else {
							console.log(response.data);
						}
					})
					.catch(function(error) {
						console.log("请求失败处理");
					});
			},
		}
	};
</script>

<style>
</style>
