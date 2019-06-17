<template>
	<!-- 排班规则管理主页 -->
	<div class="tab-pane fade" id="pbgzgl">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="position:relative;">
			<div class="table-responsive col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th class="text-center">名称</th>
							<th class="text-center">简称</th>
							<th class="text-center">开始时间</th>
							<th class="text-center">结束时间</th>
							<th class="text-center">类型</th>
							<th class="text-center">备注</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in shiftsType" :key="index" v-on:dblclick="showShiftsType(item)">
							<td class="text-center">{{item.name}}</td>
							<td class="text-center">{{item.shortName}}</td>
							<td class="text-center">{{item.startTime}}</td>
							<td class="text-center">{{item.endTime}}</td>
							<td class="text-center typename">{{item.type}}</td>
							<td class="text-center">{{item.remarks}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<button class="btn-primary btn pull-left" data-toggle='modal' data-target='#mypbgzgl_add'>新增</button>
		<div>
			<updateSchedulingRules  :dataObj="dataObj"/>
			<addSchedulingRules />
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import updateSchedulingRules from '../subParamManage/subMethod/updateSchedulingRules.vue'
	import addSchedulingRules from '../subParamManage/subMethod/addSchedulingRules.vue'

	export default {
		components: {
			updateSchedulingRules,
			addSchedulingRules
		},
		data() {
			return {
				shiftsType: [],
				dataObj:{}
			}
		},
		methods: {
			//查询班次
			getShiftsType: function(item) {
				var url = this.url + "/kqParamSetContr/queryAttShiftSchedule";
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
						this.shiftsType = response.data.retData;
					} else {
						alert(response.data.retMsg);
					}
				}).catch(
					function(error) {
						console.log("请求失败处理");
					}
				);
			},

			// 双击弹班次修改框
			showShiftsType: function(item) {
				$("#mypbgzgl").modal("show");
				//clone对象
				this.dataObj = Object.assign({}, item); 
			}
		},
		created() {
			this.getShiftsType();
		}
	}
</script>

<style>
</style>
