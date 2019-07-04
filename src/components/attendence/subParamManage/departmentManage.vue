<template>
	<!-- 部门信息管理主页 -->
	<div class="tab-pane fade" id="bmgl">
		<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7" style="position:relative;">
			<div class="table-responsive col-xs-10 col-sm-10 col-md-10 col-lg-10">
				<div class="col-lg-8 mtr_a"> <span>部门信息管理：</span> </div>
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th class="text-center">部门名称</th>
							<th class="text-center">上级部门</th>
							<th class="text-center">顺序号</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in department" :key="index" v-on:dblclick="doubleDepartment(item)">
							<td class="text-center">{{item.NAME}}</td>
							<td class="text-center">{{item.PNAME}}</td>
							<td class="text-center">{{item.ORDERNUM}}</td>
						</tr>
					</tbody>
				</table>
				</div>
			<updateDepartment :deptObj = 'deptObj' ref="updateDepartment"></updateDepartment>
			<addDepartment></addDepartment>
			<button class="btn-primary btn" data-toggle='modal' data-target='#mybmgl'>新增</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import updateDepartment from './subMethod/updateDepartment.vue'
	import addDepartment from './subMethod/addDepartment.vue'
	
	export default {
		components: {
			updateDepartment,
			addDepartment
		},
		data() {
			return {
				department: [],
				deptObj:{}
			}
		},
		methods: {
			//查询部门信息
			showDepartment: function(item) {
				var url = this.url + "/kqParamSetContr/queryDepartment";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.department = response.data.retData;
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			},
			// 双击弹部门修改框
			doubleDepartment: function(item) {
				$("#mybmgl_show").modal("show");
				this.deptObj = Object.assign({}, item); 
				this.$refs.updateDepartment.setDepartmentParam(item.PID);
			}
		},
		created() {
			this.showDepartment();
		}
	}
</script>

<style>
</style>
