<template>
	<!-- 修改，删除班组 -->
	<div class="modal fade" id="mybzgl_update">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- 模态弹出窗内容 -->
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4></h4>
				</div>
				<div class="modal-body clearfix">
					<div class="col-md-10 col-md-offset-1">
						<div class="form-group ">
							<button class="btn btn-primary pull-right" data-toggle='modal' data-target='#myGroupsInfo'>班组人员分配</button>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">班组名称：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" name="" placeholder="班组名称" v-model="shiftGroupObj.name" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">备注：</label>
							</div>
							<div class="col-md-9">
								<textarea cols="50" rows="3" placeholder="备注" v-model="shiftGroupObj.remark"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-primary" @click="updateShiftGroup">确认</button>
					<button class="btn btn-danger" @click="deleteShiftGroup">删除</button>
				</div>
			</div>
		</div>
		<div>
			<teamAssignment />
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {isBlank} from '../../../../assets/js/constant.js'
	import teamAssignment from './childMethod/teamAssignment.vue'

	export default {
		props: ['shiftGroupObj'],
		components: {
			teamAssignment
		},
		methods: {
			//修改班组类型
			updateShiftGroup() {
				if (isBlank(this.shiftGroupObj.name)) {
					alert("班组名不能为空");
					return;
				}
				var url = this.url + "/kqParamSetContr/updateAttShiftGroup";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						id: this.shiftGroupObj.id,
						name: this.shiftGroupObj.name,
						remark: this.shiftGroupObj.remark
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.getShiftGroup();
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
				$("#mybzgl_update").modal("hide");
			},
			//删除班组
			deleteShiftGroup() {
				//$("#mybzgl").modal("hide");
				var url = this.url + "/kqParamSetContr/deleteAttShiftGroup";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						id: this.shiftGroupObj.id
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.getShiftGroup();
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
				$("#mybzgl_update").modal("hide");
			}
		}
	}
</script>

<style>
</style>
