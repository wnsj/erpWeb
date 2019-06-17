<template>
	<!-- 修改排班规则 -->
	<div class="modal fade" id="mypbgzgl">
		<div class="modal-dialog" style="position:relative;">
			<div class="modal-content">
				<!-- 模态弹出窗内容 -->
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4></h4>
				</div>
				<div class="modal-body clearfix">
					<div class="col-md-12" style="padding:0">
						<h2>编辑排班规则</h2>
						<div class="form-group">
							<div class="col-md-2 text-right">
								<label for="">名称：</label>
							</div>
							<div class="col-md-4">
								<input class="form-control" type="text" name="" v-model="dataObj.name" />
							</div>
							<div class="col-md-2 texr">
								<label for="">简称：</label>
							</div>
							<div class="col-md-4">
								<input class="form-control" type="text" name="" v-model="dataObj.shortName" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-2 texr">
								<label for="">起始时间：</label>
							</div>
							<div class="col-md-4">
								<input class="form-control time-picker" type="text" name="" id="shiftsstartTime" v-model="dataObj.startTime" />
							</div>
							<div class="col-md-2 texr">
								<label for="">结束时间：</label>
							</div>
							<div class="col-md-4">
								<input class="form-control time-picker" type="text" name="" id="shiftsendTime" v-model="dataObj.endTime" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-2 texr">
								<label for="">类型：</label>
							</div>
							<div class="col-md-10">
								<select class="com-opt" v-model="dataObj.type">
									<option value="工作">工作</option>
									<option value="休息">休息</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-2 texr">
								<label for="">备注：</label>
							</div>
							<div class="col-md-10">
								<textarea cols="50" rows="5" placeholder="备注" v-model="dataObj.remarks"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-primary" @click="updateShiftsType">确认</button>
					<button type="submit" class="btn btn-danger" @click="deleteShiftsType">删除</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {isBlank} from '../../../../assets/js/constant.js'
	export default {
		props: ['dataObj'],
		data() {
			return {
				shiftstype: ''
			}
		},
		methods: {
			//删除班次
			deleteShiftsType() {
				$("#mypbgzgl").modal("hide");
				var url = this.url + "/kqParamSetContr/deleteAttShiftSchedule";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						id: this.dataObj.id
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.getShiftsType();
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			},
			//修改班次类型
			updateShiftsType() {
				// vm.shiftsstartTime = $("#shiftsstartTime").val();
				// vm.shiftsendTime = $("#shiftsendTime").val();
				if (isBlank(this.dataObj.name) || isBlank(this.dataObj.shortName)) {
					alert("班次各项信息不能为空");
					return;
				}
				
				this.shiftstype = this.dataObj.type == "工作" ? "1" : "2";
				var url = this.url + "/kqParamSetContr/updateAttShiftSchedule";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						id: this.dataObj.id,
						name: this.dataObj.name,
						shortName: this.dataObj.shortName,
						type: this.shiftstype,
						startTime: this.dataObj.startTime,
						endTime: this.dataObj.endTime,
						remarks: this.dataObj.remarks
					},
					//data:param,
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.getShiftsType();
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
				$("#mypbgzgl").modal("hide");
			}
		}
	}
</script>

<style>
</style>
