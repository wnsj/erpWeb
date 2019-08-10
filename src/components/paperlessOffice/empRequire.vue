<template>
	<div class="container user-container" id="employee-app">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 main-title">
				<h2>人员需求管理</h2>
				
			</div>
		</div>
		<div class="row">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>部门：</p>
				</div>
				<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
					<depart></depart>
				</div>
			</div>


			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>申请时间：</p>
				</div>
				<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
					<span class="leavespan">
						<datePicker v-model='beginDate'></datePicker>
					</span> <span class="leavespan01">&nbsp;&nbsp;&nbsp;至：</span>
					<span class="leavespan">
						<datePicker v-model='endDate'></datePicker>
					</span>
				</div>
			</div>

			<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>需求职位：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<position></position>
				</div>
			</div>

		</div>
		<div class="row add-mt">
			<button type="button" class="btn btn-primary pull-right" @click="dowmelxe('人员需求表')">导出</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" v-on:click="showERInfo()">申请</button>
			<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal">查询</button>

		</div>
		<erApply></erApply>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="table-responsive">
					<table class="table table-bordered table-hover user-table" id="datatable">
						<thead>
							<tr>
								<th class="text-center">部门</th>
								<th class="text-center">职位</th>
								<th class="text-center">申请日期</th>
								<th class="text-center">到岗日期</th>
								<th class="text-center">空缺人数</th>
								<th class="text-center">申请原因</th>
								<th class="text-center">审查负责人</th>
								<th class="text-center">审查负责人意见</th>
								<th class="text-center">审查日期</th>
								<th class="text-center">审批负责人</th>
								<th class="text-center">审批负责人意见</th>
								<th class="text-center">审批日期</th>
								<th class="text-center">审核负责人</th>
								<th class="text-center">审核负责人意见</th>
								<th class="text-center">审核日期</th>
								<th class="text-center">完成情况</th>
								<th class="text-center">用人部门负责人</th>
								<th class="text-center">确认时间</th>
								<th class="text-center">状态</th>
								<th class="text-center">查看详情</th>
								<th class="text-center">点击取消</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import depart from '../../components/vuecommon/department.vue'
	import position from '../../components/vuecommon/position.vue'
	import erApply from '../paperlessOffice/subER/subERApply.vue'
	import datePicker from 'vue2-datepicker'
	export default {
		components: {
			depart,
			position,
			erApply,
			datePicker,
		},
		data() {
			return {
				beginDate:this.moment(),
				endDate:this.moment(),
			};
		},
		methods:{
			showERInfo:function(){
				$("#erApply").modal('show')
				this.$children[4].initEMPRInfo()
			}
		}
	}
</script>

<style>
	@import '../../assets/css/paperlessOffice/people.css';
</style>
