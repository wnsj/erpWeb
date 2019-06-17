<template>
	<!-- 添加排班规则 -->
	<div class="modal fade" id="mypbgzgl_add">
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
								<input class="form-control" type="text" name="" v-model="newshiftsName" />
							</div>
							<div class="col-md-2 texr">
								<label for="">简称：</label>
							</div>
							<div class="col-md-4">
								<input class="form-control" type="text" name="" v-model="newshiftsshortName" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-2 texr">
								<label for="">起始时间：</label>
							</div>
							<div class="col-md-4">
								<input class="form-control time-picker" type="text" name="" id="timePicker" v-model="newshiftsstartTime" />
							</div>
							<div class="col-md-2 texr">
								<label for="">结束时间：</label>
							</div>
							<div class="col-md-4">
								<input class="form-control  time-picker" type="text" name="" v-model="newshiftsendTime" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-2 texr">
								<label for="">类型：</label>
							</div>
							<div class="col-md-10">
								<select class="com-opt" v-model="newshiftstype">
									<option value="1">工作</option>
									<option value="2">休息</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-2 texr">
								<label for="">备注：</label>
							</div>
							<div class="col-md-10">
								<textarea cols="50" rows="5" placeholder="备注" v-model="newshiftsremarks"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-primary" @click="addAttShiftSchedule">确认</button>
					<!--<button type="submit" class="btn btn-danger" @click="deletequeryAttRuleType">删除</button>-->
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
				newshiftsName: "",
				newshiftsshortName: "",
				newshiftsstartTime: "",
				newshiftsendTime: "",
				newshiftstype: "2",
				newshiftsremarks: "",
			}
		},
		methods: {
			//添加班次类型
			addAttShiftSchedule() {
				// var newshiftsType = new Object();
				// vm.newshiftsId = vm.queryAttRuleType.length + 1;
				// newshiftsType.id = vm.newshiftsId;
				// newshiftsType.name = vm.newshiftsName;
				// newshiftsType.shortName = vm.newshiftsshortName;
				// newshiftsType.startTime = vm.newshiftsstartTime;
				// newshiftsType.endTime = vm.newshiftsendTime;
				// newshiftsType.type = vm.newshiftstype;
				// newshiftsType.remarks = vm.newshiftsremarks;
				var url = this.url + "/kqParamSetContr/addAttShiftSchedule";
				if (isBlank(this.newshiftsName) || isBlank(this.newshiftsshortName)|| isBlank(this.newshiftstype)) {
					alert("班次各项信息不能为空");
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
						name: this.newshiftsName,
						shortName: this.newshiftsshortName,
						type: this.newshiftstype,
						startTime: this.newshiftsstartTime,
						endTime: this.newshiftsendTime,
						remarks: this.newshiftsremarks
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						$("#mypbgzgl_add").modal("hide");
						this.$parent.getShiftsType();
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
				this.newshiftsName = '';
				this.newshiftsshortName = '';
				this.newshiftstype = '';
				this.newshiftsstartTime = '';
				this.newshiftsendTime = '';
				this.newshiftsremarks = '';
				$("#mypbgzgl").modal("hide");
			}
		}
	}
</script>

<style>
</style>
