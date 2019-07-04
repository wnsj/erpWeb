<template>
	<div class="container user-container" id="employee-app">
		<div class="row">
			<div class="col-md-12 col-lg-12 main-title">
				<h2>倒休管理</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>申请日期：</p>
				</div>
				<div class="col-md-10 col-lg-10">
					<span class="leavespan">
						<input type="date" value="" class="form-control" v-model="beginDate" />
					</span> <span class="leavespan01">&nbsp;&nbsp;&nbsp;至：</span>
					<span class="leavespan">
						<input type="date" value="" class="form-control" v-model="endDate" />
					</span>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>部门：</p>
				</div>
				<div class="col-md-10 col-lg-10">
					<depart></depart>
				</div>
			</div>
			<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
				<div class="col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>姓名：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<span>
						<input type="text" value="" class="form-control" v-model="name" />
					</span>
				</div>
			</div>
			<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
				<div class="col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>状态：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<select class="form-control" v-model="handleState">
						<option value="0">全部</option>
						<option value="1">待处理</option>
						<option value="2">处理中</option>
						<option value="3">已通过</option>
						<option value="4">未通过</option>
					</select>
				</div>
			</div>


		</div>
		<div class="row add-mt">
			<div style="padding: 0; width:3.3%; display:inline-block; float:left; margin-left:15px; line-height: 34px; font-size:0;">
				<p>项目：</p>
			</div>

			<button type="button" class="btn btn-primary pull-right" @click="dowmelxe('请假表')">导出</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" data-target="#myModalJoin">申请</button>

			<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal">查询</button>

		</div>
		<div class="row">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive">
					<table class="table table-bordered table-hover user-table offover" id="datatable">
						<thead>
							<tr>
								<th class="text-center">类型</th>
								<th class="text-center">申请人</th>
								<th class="text-center">申请部门</th>
								<th class="text-center">原因</th>
								<th class="text-center">申请时间</th>
								<th class="text-center">休假开始时间</th>
								<th class="text-center">休假结束时间</th>
								<th class="text-center">加班日期</th>
								<th class="text-center">加班累积</th>
								<th class="text-center">说明</th>
								<th class="text-center">审查人</th>
								<th class="text-center">审查结果</th>
								<th class="text-center">审核人</th>
								<th class="text-center">审核结果</th>
								<th class="text-center">批准人</th>
								<th class="text-center">批准结果</th>
								<th class="text-center">报备人</th>
								<th class="text-center">报备结果</th>
								<th class="text-center">查看</th>
								<th class="text-center">修改</th>
								<th class="text-center">处理</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in rdLsit" :key='index'>
								<td class="text-center">类型</td>
								<td class="text-center">王二小</td>
								<td class="text-center">公共事业部</td>
								<td class="text-center">个人</td>
								<td class="text-center">今天</td>
								<td class="text-center">明天</td>
								<td class="text-center">后天</td>
								<td class="text-center">20190628</td>
								<td class="text-center">1天</td>
								<td class="text-center">说明</td>
								<td class="text-center">王二小</td>
								<td class="text-center">同意</td>
								<td class="text-center">王二小</td>
								<td class="text-center">同意</td>
								<td class="text-center">王二小</td>
								<td class="text-center">同意</td>
								<td class="text-center">王二小</td>
								<td class="text-center">同意</td>
								<td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal"
									 data-target="#myModalJoin_check" v-on:click="showLeaveInfo(item,'select')">查看</button></td>
								<td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal"
									 data-target="#myModalJoin_revise" v-on:click="showLeaveInfo(item,'modyfy')">修改</button></td>
								<td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" 
								v-on:click="showLeaveInfo(item,'handle')">处理</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<rdInfo></rdInfo>
	</div>
</template>

<script>
	import depart from '../vuecommon/department.vue'
	import rdInfo from '../paperlessOffice/subRD/rdInfo.vue'
	export default {
		components:{
			depart,
			rdInfo,
		},
		data() {
			return {
				name:'',
				handleState:'0',
				beginDate:this.getCurrentDay,
				endDate:this.getCurrentDay,
				departId:'0',
				departName:'',
				
				rdLsit:[''],
			};
		},
		methods:{
			showLeaveInfo:function(lInfo,param){
				
				$("#myModalJoin").modal('show')
			}
		}
		
	}
</script>

<style>
@import '../../assets/css/paperlessOffice/changeoffday.css';
</style>
