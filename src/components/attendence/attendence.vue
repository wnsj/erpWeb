<template>
	<div class="row">
		<div class="col-md-12 col-lg-12 main-title">
			<div>
				<ul id="myTab" class="nav nav-tabs">
					<h2 class="col-lg-2" id="tresult">考勤管理</h2>
					<li class="col-lg-1 pull-right dropdown">
						<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
						 aria-haspopup="true" aria-expanded="true"> 请假倒休 <span class="caret"></span> </button>
						<ul class="dropdown-menu">
							<li class="ac"><a href="#qjgl" data-toggle="tab">请假管理</a></li>
							<li class="ac"><a href="#" data-toggle="tab">调休管理</a></li>
							<li class="ac"><a href="#" data-toggle="tab">漏打卡管理</a></li>
						</ul>
					</li>
					<li class="col-lg-1 pull-right dropdown">
						<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
						 aria-haspopup="true" aria-expanded="true"> 参数设置 <span class="caret"></span> </button>
						<ul class="dropdown-menu">
							<li class="ac"><a href="#jqzlgl" data-toggle="tab" v-on:click="titleBtn($event)">假期种类管理</a></li>
							<li class="ac"><a href="#cqgzgl" data-toggle="tab" v-on:click="titleBtn($event)">出勤规则管理</a></li>
							<li class="ac"><a href="#pbgzgl" data-toggle="tab" v-on:click="titleBtn($event)">排班规则管理</a></li>
							<li class="ac"><a href="#bzgl" data-toggle="tab" v-on:click="titleBtn($event)">班组管理</a></li>
							<li class="ac"><a href="#bmgl" data-toggle="tab" v-on:click="titleBtn($event)">部门管理</a></li>
							<li class="ac"><a href="#zwgl" data-toggle="tab" v-on:click="titleBtn($event)">职位管理</a></li>
							<li class="ac"><a href="#gwlxgl" data-toggle="tab" v-on:click="titleBtn($event)">岗位类型管理</a></li>
						</ul>
					</li>
					<li class="col-lg-1 pull-right dropdown">
						<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu3" data-toggle="dropdown"
						 aria-haspopup="true" aria-expanded="true"> 排班管理 <span class="caret"></span> </button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
							<li class="ac"><a href="#rypbjh" data-toggle="tab" v-on:click="titleBtn($event)">人员排班计划</a></li>
							<li class="ac"><a href="#pbjhsc" data-toggle="tab" v-on:click="titleBtn($event)">排班计划删除</a></li>
							<li class="ac"><a href="#pbjhdr" data-toggle="tab" v-on:click="titleBtn($event)">排班计划导入</a></li>
						</ul>
					</li>
					<li class="col-lg-1 pull-right dropdown">
						<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu4" data-toggle="dropdown"
						 aria-haspopup="true" aria-expanded="true"> 考勤查询 <span class="caret"></span> </button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
							<li class="ac"><a href="#gscqmx" data-toggle="tab" v-on:click="titleBtn($event)">公司出勤明细</a></li>
							<li class="ac"><a href="#bmcqmx" data-toggle="tab" v-on:click="titleBtn($event)">部门出勤统计</a></li>
							<li class="ac"><a href="#grcqmx" data-toggle="tab" v-on:click="titleBtn($event)">个人出勤明细</a></li>
							<li class="ac"><a href="#gscqtj" data-toggle="tab" v-on:click="titleBtn($event)">人员出勤统计</a></li>
							<li class="ac"><a href="#kqbb" data-toggle="tab" v-on:click="titleBtn($event)">考勤报表</a></li>
							<li class="ac"><a href="#kqtjbb" data-toggle="tab" v-on:click="titleBtn($event)">考勤统计报表</a></li>
              <li class="ac"><a href="#testId" data-toggle="tab" v-on:click="titleBtn($event)">test</a></li>
						</ul>
					</li>
				</ul>
			</div>
			<div id="myTabContent" class="tab-content">
				<firmAtt></firmAtt>
				<departAtt></departAtt>
				<attCountTable></attCountTable>
				<attTable></attTable>
				<employeeAtt></employeeAtt>
				<personalAtt></personalAtt>
				<singleDepartAtt></singleDepartAtt>
				<singleEmployeeAtt></singleEmployeeAtt>
				<holidaysTypeManage></holidaysTypeManage>
				<attendanceRulesManage></attendanceRulesManage>
				<schedulingRulesManage></schedulingRulesManage>
				<attShiftGroupManage></attShiftGroupManage>
				<departmentManage></departmentManage>
				<positionManage></positionManage>
				<positionTypeManage></positionTypeManage>
				<scheduleManage></scheduleManage>
				<monday></monday>
				<deleteSchedule></deleteSchedule>
        <test></test>
			</div>
		</div>
	</div>
</template>

<script>
	import firmAtt from '../attendence/subAttManage/firmAtt.vue'
	import departAtt from '../attendence/subAttManage/departAtt.vue'
	import attCountTable from '../attendence/subAttManage/attCountTable.vue'
	import attTable from '../attendence/subAttManage/attTable.vue'
	import employeeAtt from '../attendence/subAttManage/employeeAtt.vue'
	import personalAtt from '../attendence/subAttManage/personalAtt.vue'
	import singleDepartAtt from '../attendence/subAttManage/singleDepartAtt.vue'
	import singleEmployeeAtt from '../attendence/subAttManage/singleEmployeeAtt.vue'
	import holidaysTypeManage from '../attendence/subParamManage/holidaysTypeManage.vue'
	import attendanceRulesManage from '../attendence/subParamManage/attendanceRulesManage.vue'
	import schedulingRulesManage from '../attendence/subParamManage/schedulingRulesManage.vue'
	import attShiftGroupManage from '../attendence/subParamManage/attShiftGroupManage.vue'
	import departmentManage from '../attendence/subParamManage/departmentManage.vue'
	import positionManage from '../attendence/subParamManage/positionManage.vue'
	import positionTypeManage from '../attendence/subParamManage/positionTypeManage.vue'
	import scheduleManage from './subScheduleManage/scheduleManage.vue'
	import monday from './subScheduleManage/subMethod/monday.vue'
	import deleteSchedule from './subScheduleManage/subMethod/deleteSchedule.vue'
  import test from '@/components/vuecommon/test.vue'

	export default {
		components: {
			firmAtt,
			departAtt,
			attCountTable,
			attTable,
			employeeAtt,
			personalAtt,
			singleDepartAtt,
			singleEmployeeAtt,
			holidaysTypeManage,
			attendanceRulesManage,
			schedulingRulesManage,
			attShiftGroupManage,
			departmentManage,
			positionManage,
			positionTypeManage,
			scheduleManage,
			monday,
			deleteSchedule,
      test
		},
		data() {
			return {

			};
		},
		methods: {
			titleBtn: function(event) {

				$("#tresult").text(event.target.innerText);
			},
			changeTitle() {
				//切换标题
				document.onreadystatechange = function() {
					if (document.readyState == "complete") {
						//当页面加载状态为完全结束时进入
						$(".ac").click(function() {
							$("#tresult").text($(this).text());
						});
						//console.log('document is onload');
					} else if (document.readyState == "interactive") {
						//DOM构建了就会执行，先与complete执行
						//console.log('document is interactive ,so DOM obj is ' + document.getElementById('img1'));
					}
				}
			}
		}
	}
</script>

<style>
	@import '../../assets/css/attendance.css';
</style>
