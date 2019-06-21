<template>
	<!-- 删除，修改部门 -->
	<div class="modal fade" id="mybmgl_show">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- 模态弹出窗内容 -->
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4></h4>
				</div>
				<div class="modal-body clearfix">
					<div class="col-md-10 col-md-offset-1">
						<h2>部门信息</h2>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">部门：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" name="" v-model="deptObj.NAME" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">父级部门：</label>
							</div>
							<div class="col-md-9">
								<!-- <select class="form-control" v-model.lazy="departmentParentID">
									<option value="0">九博健康管理有限公司</option>
									<option v-for="(item,index) in dpSortList" :key="index" :value="item.id">{{item.name}}</option>
								</select> -->
								<department @departChange='departData' ref="department"></department>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">顺序号：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" name="" v-model="deptObj.ORDERNUM" @input="inputNumber"/>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary" @click="updateDepartment">确认</button>
					<button class="btn btn-danger" @click="deleteDepartment">删除</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import department from '@/components/vuecommon/department.vue'

	export default {
		props: ['deptObj'],
		components: {
			department
		},
		data() {
			return {
				pId: '',
				pName: '',
			}
		},
		methods: {
			//修改部门信息
			updateDepartment() {
				var url = this.url + "/kqParamSetContr/updateDepartment";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						id: this.deptObj.ID,
						Name: this.deptObj.NAME,
						ParentID: this.deptObj.PID,
						OrderNum: this.deptObj.ORDERNUM
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.showDepartment();
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
				$("#mybmgl_show").modal("hide");
			},
			//删除部门信息
			deleteDepartment() {
				$("#mybmgl_show").modal("hide");
				var url = this.url + "/kqParamSetContr/deleteDepartment";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						id: this.deptObj.ID
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.showDepartment();
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			},
			departData(pId, pName) {
				this.deptObj.PID = pId;
				this.deptObj.PNAME = pName;
			},
			inputNumber() {
				this.deptObj.ORDERNUM = this.deptObj.ORDERNUM.replace(/[^\.\d]/g, '');
				this.deptObj.ORDERNUM = this.deptObj.ORDERNUM.replace('.', '');
			},
			setDepartmentParam(deptId){
				this.$refs.department.setDpart(deptId);
			}
		},
		created() {

		}
	}
</script>

<style>
</style>
