<template>
	<!-- 人员考勤报表-双击弹窗 -->
	<div class="modal fade attendanceModal" id="myPersonalAttendance" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	 aria-hidden="true">
		<div class="modal-dialog staff_t">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
					<h4 class="modal-title">出勤明细</h4>
				</div>
				<div class="modal-body">
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th class="text-center">姓名</th>
								<th class="text-center">工号</th>
								<th class="text-center">部门</th>
								<th class="text-center">职位</th>
								<th class="text-center">班次</th>
								<th class="text-center">出勤班次日期</th>
								<th class="text-center">第一次打卡时间</th>
								<th class="text-center">末一次打卡时间</th>
								<th class="text-center">上班</th>
								<th class="text-center">下班</th>
								<th class="text-center">状态</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in rySingleKqList" :key="index">
								<td>{{item.name}}</td>
								<td>{{item.jobNum}}</td>
								<td>{{item.departname}}</td>
								<td>{{item.positionName}}</td>
								<td>{{item.classTimeName}}</td>
								<td>{{item.shiftDate | dateFormatFilter('YYYY-MM-DD HH:MM')}}</td>
								<td>{{item.firstTime | dateFormatFilter('YYYY-MM-DD HH:MM')}}</td>
								<td>{{item.lastTime | dateFormatFilter('YYYY-MM-DD HH:MM')}}</td>
								<td>{{item.firstTimeState}}</td>
								<td>{{item.lastTimeState}}</td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import axios from 'axios'
	import dPicker from 'vue2-datepicker'
	import depart from '../../vuecommon/department.vue'
	import position from '../../vuecommon/position.vue'
	export default {
		components:{
			depart,
			position
		},
		data(){
			return {
				rySingleKqList:[],
			};
		},
		methods:{
			initDate:function(){
				console.log('singleEmployeeAtt')
			},
			showSearchRYKQInfo:function (param){
				console.log(param)
				$("#myPersonalAttendance").modal('show')
				var url = this.url + '/kqgl/allFirmKQ'
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						accountId: param.accountId,
						beginDate: param.beginDate,
						endDate: param.endDate,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.resData.length > 0) {
							console.log('rySingleKqList-length:'+res.resData.length)
							this.rySingleKqList = res.resData
						} else {
							alert('没有查询到相关数据')
						}
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败')
				});
			},
		}
	}
</script>

<style>

</style>
