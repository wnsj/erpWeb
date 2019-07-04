<template>

	<div class="container user-container" id="employee-app">
		<div class="row">
			<div class="col-md-12 col-lg-12 main-title">
				<h2>请假管理</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>申请日期：</p>
				</div>
				<div class="col-md-11 col-lg-11">
					<span class="leavespan">
						<input type="date" value="" class="form-control" v-model="beginDate"/>
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
					<depart @departChange='departChange'></depart>
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
			<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" v-on:click="showLeaveInfo('apply')">申请</button>

			<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" v-on:click="askOfLeaveList('')">查询</button>

		</div>
		<div class="row">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive">
					<table class="table table-bordered table-hover user-table" id="datatable">
						<thead>
							<tr>
								<th class="text-center">类型</th>
								<th class="text-center">申请人</th>
								<th class="text-center">申请部门</th>
								<th class="text-center">申请时间</th>
								<th class="text-center">开始时间</th>
								<th class="text-center">结束时间</th>
								<th class="text-center">说明</th>
								<th class="text-center">代理人</th>
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

							<tr v-for="(item,index) in aflList" :key="index">
								<td class="text-center">事假</td>
								<td class="text-center">王二小</td>
								<td class="text-center">公共事业部</td>
								<td class="text-center">申请时间</td>
								<td class="text-center">开始时间</td>
								<td class="text-center">结束时间</td>
								<td class="text-center">说明</td>
								<td class="text-center">代理人</td>
								<td class="text-center">审查人</td>
								<td class="text-center">审查结果</td>
								<td class="text-center">审核人</td>
								<td class="text-center">审核结果</td>
								<td class="text-center">批准人</td>
								<td class="text-center">批准结果</td>
								<td class="text-center">报备人</td>
								<td class="text-center">报备结果</td>
								<td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal"
									 	 v-on:click="showLeaveInfo(item,'select')">查询</button></td>
								<td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal"
									 v-on:click="showLeaveInfo(item,'modify')">修改</button></td>
								<td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" 
								v-on:click="showLeaveInfo(item,'handle')">处理</button></td>
							</tr>

						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="row row_edit">

			<div class="modal fade" id="myModalJoin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog staff_t">
					<LInfo></LInfo>
				</div>
			</div>

		</div> 
	</div>

</template>

<script>
	import axios from 'axios'
	import LInfo from '../paperlessOffice/subAFL/leaveInfo.vue'
	import depart from '../vuecommon/department.vue'
	export default {
		components:{
			LInfo,
			depart
		},
		data() {
			this.askOfLeaveList("")
			return {
				aflList:[],
				beginDate:this.getCurrentDay,
				endDate:this.getCurrentDay,
				handleState:'0',
				departId:'0',
				departName:'',
				name:'',
				
				lInfo:{},
			};
		},
		methods:{
			departChange:function(departId,departName){
				this.departId=departId
				this.departName=departName
			},
			showLeaveInfo:function(lInfo,param){
				
				$("#myModalJoin").modal('show')
			},
			timeChange:function(){
				console.log('begin:'+this.beginDate)
			},
			askOfLeaveList: function(param) {
			
				var url = this.url + '/wzbg/askOfLeaveList'
				console.log(param)
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						name: this.name,
						startDate: this.beginDate,
						endDate: this.endDate,
						departId: this.departId,
						handleState: this.handleState,
					},
					dataType: 'json',
				}).then((response) => {
					console.log('advancedQuery')
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						// alert(res.resData.length)
						if (res.resData.length > 0) {
							this.employeeList = res.resData
							$("#myModalQuery").modal('hide');
						} else {
							alert('没有查询到相关数据')
						}
					} else {
						alert(res.retMsg)
					}
			
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
		}
	}
</script>

<style>
	@import '../../assets/css/paperlessOffice/leave.css';
</style>
