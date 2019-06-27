<template>
	<div class="modal fade attendanceModal" id="myDepartmentAttendance" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	 aria-hidden="true">
		<div class="modal-dialog staff_t">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
					<h4 class="modal-title">考勤报表</h4>
				</div>
				<div class="modal-body">
					<div class="mb-2">
						<label class="checkbox-inline">
							<input type="checkbox" id="inlineCheckbox1" value="option1"> 迟到
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" id="inlineCheckbox2" value="option2"> 旷工
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" id="inlineCheckbox3" value="option3"> 打卡异常
						</label>
						<label class="checkbox-inline">
							<input type="checkbox" id="inlineCheckbox3" value="option3"> 早退
						</label>
	
						<button type="button" class="btn btn-primary pull-right">查询</button>
					</div>
	
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th class="text-center">姓名</th>
								<th class="text-center">班次</th>
								<th class="text-center">出勤班次日期</th>
								<th class="text-center">第一次打卡时间</th>
								<th class="text-center">最后一次打卡时间</th>
								<th class="text-center">上班</th>
								<th class="text-center">下班</th>
								<th class="text-center">状态</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in departSingleKqList" :key="index">
								<td>{{item.name}}</td>
								<td>{{item.classTimeName}}</td>
								<td>{{item.shiftDate}}</td>
								<td>{{item.firstTime}}</td>
								<td>{{item.lastTime}}</td>
								<td>{{item.firstTimeState}}</td>
								<td>{{item.lastTimeState}}</td>
								<td>{{item.status}}</td>
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
	export default {
		data() {
			return {
				departSingleKqList:[],
			};
		},
		methods:{
			//单个部门人员考勤信息
			singleDepartAttend(param){
				 console.log('param:'+param)
				 $("#myDepartmentAttendance").modal('show')
				 var url = this.url + '/kqgl/searchKQInfo'
				 axios({
				 	method: 'post',
				 	url: url,
				 	headers: {
				 		'Content-Type': this.contentType,
				 		'Access-Token': this.accessToken
				 	},
				 	data: {
						departName: param.departName,
						positionName: '',
						name: '',
						jobNum: '',
						beginDate: param.beginDate,
						endDate: this.getYYYYMMDDHHMMSS_24(param.endDate)
				 	},
				 	dataType: 'json',
				 }).then((response) => {
					 var res = response.data
					 console.log('departSingleKqList')
					 if (res.retCode == '0000') {
					 	console.log('departSingleKqList')
					 	if (res.resData.length > 0) {
					 		console.log('departSingleKqList-length:'+res.resData.length)
					 		this.departSingleKqList = res.resData
							console.log('departSingleKqList'+this.departSingleKqList)
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
