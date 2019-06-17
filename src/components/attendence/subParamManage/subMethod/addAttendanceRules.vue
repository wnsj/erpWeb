<template>
	<!-- 新增考勤规则种类修改框 -->
	<div class="modal fade" id="mygz">
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
								<label for="">名称：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" name="" placeholder="输入规则" v-model="newqueryAttRuleName" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">最早时间</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" name="" v-model="newqueryAttRuleEarlyMinutes" @input="inputNumber()" />
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-3 texr">
								<label for="">最晚时间：</label>
							</div>
							<div class="col-md-9">
								<input class="form-control" type="text" name="" v-model="newearlyMinutesLateMinutes" @input="inputLaterNumber()"/>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-primary" @click="addqueryAttRuleType">确认</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {isBlank} from '@/assets/js/constant.js'

	export default {
		data() {
			return {
				newqueryAttRuleId: "",
				newqueryAttRuleName: "",
				newqueryAttRuleEarlyMinutes: 0,
				newearlyMinutesLateMinutes: 0,
			}
		},
		methods: {
			//添加考勤类型
			addqueryAttRuleType() {
				//this.newqueryAttRuleId = this.queryAttRuleType.length + 1;
				var url = this.url + "/kqParamSetContr/addAttRuleType";
				// var newqueryAttRule = new Object();
				// newqueryAttRule.id = this.newqueryAttRuleId;
				// newqueryAttRule.name = this.newqueryAttRuleName;
				// newqueryAttRule.earlyMinutes = this.newqueryAttRuleEarlyMinutes;
				// newqueryAttRule.lateMinutes = this.newearlyMinutesLateMinutes;
				if (isBlank(this.newqueryAttRuleEarlyMinutes) || isBlank(this.newearlyMinutesLateMinutes)) {
					alert("出勤规则最早或最晚时间为空！");
					return;
				}
				axios({
					method: "post",
					url: url,
					headers: {
						"Content-Type": this.contentType,
						"Access-Token": this.accessToken
					},
					data: {
						name: this.newqueryAttRuleName,
						earlyMinutes: this.newqueryAttRuleEarlyMinutes,
						lateMinutes: this.newearlyMinutesLateMinutes
					},
					dataType: "json"
				}).then((response) => {
					if (response.data.retCode == '0000') {
						this.$parent.getqueryAttRuleType();
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
				this.newqueryAttRuleName = "";
				this.newqueryAttRuleEarlyMinutes = 0;
				this.newearlyMinutesLateMinutes = 0;
				$("#mygz").modal("hide");
			},
			inputNumber() {
				this.newqueryAttRuleEarlyMinutes = this.newqueryAttRuleEarlyMinutes.replace(/[^\.\d]/g, '');
				this.newqueryAttRuleEarlyMinutes = this.newqueryAttRuleEarlyMinutes.replace('.', '');
			},
			inputLaterNumber() {
				this.newearlyMinutesLateMinutes = this.newearlyMinutesLateMinutes.replace(/[^\.\d]/g, '');
				this.newearlyMinutesLateMinutes = this.newearlyMinutesLateMinutes.replace('.', '');
			}
		}
	}
</script>

<style>
</style>
