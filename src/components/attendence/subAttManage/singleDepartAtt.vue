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
	export default {
		data() {
			return {
				departSingleKqList:[],
			};
		}
	}
</script>

<style>

</style>
