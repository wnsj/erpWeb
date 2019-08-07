<template>
	<!-- 双击弹出考勤规则种类修改框 -->
	<div class="modal fade" id="mygz_update">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4></h4>
				</div>
				<div class="modal-body clearfix">
					<div class="col-md-10 col-md-offset-1">
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">名称：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" name="" v-model="item.name" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">最早时间</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" name="" v-model="item.earlyMinutes" @input="inputNumber"/>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">最晚时间：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" name="" v-model="item.lateMinutes" @input="inputLaterNumber"/>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-danger" @click="deletequeryAttRuleType">删除</button>
					<button type="submit" class="btn btn-primary" @click="updatequeryAttRuleType">确认</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {isBlank} from '@/assets/js/constant.js'

	export default {
		props: ['item'],
		methods: {
			//删除考勤规则种类
			deletequeryAttRuleType() {
				var url = this.url + "/kqParamSetContr/deleteAttRuleType";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						id: this.item.id
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.getqueryAttRuleType();
						$("#mygz_update").modal("hide");
					} else {
						alert(response.data.retMsg)
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			},
			//修改考勤规则种类
			updatequeryAttRuleType() {
				if (isBlank(this.item.name)) {
					alert("出勤规则名为空！");
					return;
				}
				var url = this.url + "/kqParamSetContr/updateAttRuleType";
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						id: this.item.id,
						name: this.item.name,
						earlyMinutes: this.item.earlyMinutes,
						lateMinutes: this.item.lateMinutes
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.getqueryAttRuleType();
						$("#mygz_update").modal("hide");
					} else {
						alert(response.data.retMsg)
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			},
			inputNumber() {
				this.item.earlyMinutes = this.item.earlyMinutes.replace(/[^\.\d]/g, '');
				this.item.earlyMinutes = this.item.earlyMinutes.replace('.', '');
			},
			inputLaterNumber() {
				this.item.lateMinutes = this.item.lateMinutes.replace(/[^\.\d]/g, '');
				this.item.lateMinutes = this.item.lateMinutes.replace('.', '');
			}
		}
	}
</script>

<style>
</style>
