<template>
	<!-- 出勤规则管理主页 -->
	<div class="tab-pane fade" id="cqgzgl">
		<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="position:relative;">
			<div class="table-responsive col-xs-10 col-sm-10 col-md-10 col-lg-10">
				<!--					<div class="col-lg-8 mtr_a">
										<span>考勤规则管理：</span>
									</div>
				-->
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th class="text-center">名称</th>
							<th class="text-center">最早时间</th>
							<th class="text-center">最晚时间</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in queryAttRuleType" :key="index" v-on:dblclick="showqueryAttRuleType(item)">
							<td class="text-center" :id="'holiday'+index">{{item.name}}</td>
							<td class="text-center">{{item.earlyMinutes}}</td>
							<td class="text-center">{{item.lateMinutes}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<button class="btn-primary btn pull-left" data-toggle='modal' data-target='#mygz'>新增</button>
		</div>
		<div id="subComponents">
			<updateAttendanceRules :item = "item"></updateAttendanceRules>
			<addAttendanceRules></addAttendanceRules>
		</div>
	</div>

</template>

<script>
	import axios from 'axios'
	import updateAttendanceRules from '../subParamManage/subMethod/updateAttendanceRules.vue'
	import addAttendanceRules from '../subParamManage/subMethod/addAttendanceRules.vue'


	export default {
		components: {
			updateAttendanceRules,
			addAttendanceRules
		},
		data() {
			return {
				queryAttRuleType: [],
				item:{}
			}
		},
		methods: {
			getqueryAttRuleType: function() {
				var url = this.url + "/kqParamSetContr/queryAttRuleType";
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
						this.queryAttRuleType = response.data.retData;
					} else {
						alert(response.data.retMsg)
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			},
			// 双击弹出考勤规则种类修改框
			showqueryAttRuleType: function(item) {
				$("#mygz_update").modal("show");
				this.item = Object.assign({},item)
			}
		},
		created() {
			this.getqueryAttRuleType();
		}
	}
</script>

<style>
</style>
