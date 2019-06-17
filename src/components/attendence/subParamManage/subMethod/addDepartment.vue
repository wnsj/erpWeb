<template>
	<!-- 添加部门 -->
	<div class="modal fade" id="mybmgl">
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
								<input class="form-control" type="text" name="" v-model="newdepartmentName" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">父级部门：</label>
							</div>
							<div class="col-md-9">
								<!-- :departName="departName" :departId="departId" -->
								<department @departChange='departChange'></department>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">顺序号：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" name="" v-model="newdepartmentOrderNum" @input="inputNumber()"/>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary" @click="addDepartment">确认</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {
		isBlank
	} from '@/assets/js/constant.js'
	import department from '@/components/vuecommon/department.vue'

	export default {
		components: {
			department
		},
		data() {
			return {
				newdepartmentName: '',
				newdepartmentFatherId: '0',
				newdepartmentOrderNum: 0,
				pName: ''
			}
		},
		methods: {
			//添加部门信息
			addDepartment() {
				var url = this.url + "/kqParamSetContr/addDepartment";
				if (isBlank(this.newdepartmentName)) {
					alert("部门名不能为空");
					return false;
				}
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						Name: this.newdepartmentName,
						ParentID: this.newdepartmentFatherId,
						OrderNum: this.newdepartmentOrderNum
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						$("#mybmgl").modal("hide");
						this.$parent.showDepartment();
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
				$("#mybmgl").modal("hide");
			},
			//获取部门名字和id
			departChange: function(departId, departName) {
				this.newdepartmentFatherId = departId;
				this.pName = departName;
			},
			inputNumber() {
				this.newdepartmentOrderNum = this.newdepartmentOrderNum.replace(/[^\.\d]/g, '');
				this.newdepartmentOrderNum = this.newdepartmentOrderNum.replace('.', '');
			}
		},
		created() {

		}
	}
</script>

<style>
</style>
