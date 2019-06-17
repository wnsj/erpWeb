<template>
	<!-- 新增班组 -->
	<div class="modal fade" id="mybzgl">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- 模态弹出窗内容 -->
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4></h4>
				</div>
				<div class="modal-body clearfix">
					<div class="col-md-10 col-md-offset-1">
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">班组名称：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" name="" placeholder="班组名称" v-model="newshiftGroupName" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">备注：</label>
							</div>
							<div class="col-md-9">
								<textarea cols="50" rows="3" placeholder="备注" v-model="newshiftGroupRemark"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary" @click="addShiftGroup">确认</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {isBlank} from '../../../../assets/js/constant.js'

	export default {
		data() {
			return {
				newshiftGroupName: '',
				newshiftGroupRemark:''
			}
		},
		methods: {
			//添加班组类型
			addShiftGroup() {
				// vm.newshiftGroupId = vm.shiftGroup.length + 1;
				// var newshiftGroup = new Object();
				// newshiftGroup.id = vm.newshiftGroupId;
				// newshiftGroup.name = vm.newshiftGroupName;
				// newshiftGroup.remark = vm.newshiftGroupRemark;
				var url = this.url + "/kqParamSetContr/addAttShiftGroup";
				if (isBlank(this.newshiftGroupName)) {
					alert("班组名不能为空");
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
						name: this.newshiftGroupName,
						remark: this.newshiftGroupRemark
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
				$("#mybzgl").modal("hide");
			}
		}
	}
</script>

<style>
</style>
