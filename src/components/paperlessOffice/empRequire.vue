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
					<depart  @departChange='departChange'></depart>
				</div>
			</div>


			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>申请时间：</p>
				</div>
				<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
					
					<span class="leavespan">
						<datePicker v-model='beginDate' v-on:change="dateAction('begin')"></datePicker>
					</span> <span class="leavespan01">&nbsp;&nbsp;&nbsp;至：</span>
					<span class="leavespan">
						<datePicker v-model='endDate' v-on:change="dateAction('end')"></datePicker>
					</span>
				</div>
			</div>

			<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>需求职位：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<position @positionChange='positionChange'></position>
				</div>
			</div>

		</div>
		<div class="row add-mt">
			<button type="button" class="btn btn-primary pull-right" @click="dowmelxe('人员需求表')">导出</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" v-on:click="showERInfo()">申请</button>
			<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" v-on:click="checkEMPRequire()">查询</button>

		</div>
		<erApply @empRequireApply='feedbackApplyInfo'></erApply>
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
						<tbody>
							<tr v-for="(item,index) in erList" :key="index">
								<td class="text-center">{{item.departmentName}}</td>
								<td class="text-center">{{item.positionName}}</td>
								<td class="text-center">{{item.applyTime}}</td>
								<td class="text-center">{{item.needTime}}</td>
								<td class="text-center">{{item.num}}</td>
								<td class="text-center">{{item.applyReason}}</td>
								<td class="text-center">{{item.shenchaName}}</td>
								<td class="text-center">{{item.shenchaAdvice}}</td>
								<td class="text-center">{{item.shenchaTime}}</td>
								<td class="text-center">{{item.shenpiName}}</td>
								<td class="text-center">{{item.shenpiAdvice}}</td>
								<td class="text-center">{{item.shenpiTime}}</td>
								<td class="text-center">{{item.renliName}}</td>
								<td class="text-center">{{item.renliAdvice}}</td>
								<td class="text-center">{{item.renliTime}}</td>
								<td class="text-center">{{item.state}}</td>
								<td class="text-center">{{item.renliName}}</td>
								<td class="text-center">{{item.renliTime}}</td>
								<td class="text-center">{{item.state=='1' ? '已取消' : '正常'}}</td>
								<td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal"
									 	 >查看详情</button></td>
								<td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal"
									 v-on:click="updateEMPRequire(item)">点击取消</button></td>
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
				beginDate:this.moment('','YYYY-MM-DD 00:00:00.000'),
				endDate:this.moment('','YYYY-MM-DD 23:59:59.000'),
				positionId:'0',
				departId:'0',
				erList:[],
			};
		},
		methods:{
			//跳转申请界面
			showERInfo:function(){
				$("#erApply").modal('show')
				this.$children[4].initEMPRInfo()
			},
			//申请界面返回
			feedbackApplyInfo:function(param){
				if(param=='apply'){
					
				}
			},
			//UPDATE DATE
			dateAction: function(param) {
				if (param == 'begin') {
					this.beginDate = this.moment(this.beginDate, 'YYYY-MM-DD 00:00:00.000')
				} else if (param == 'end') {
					this.endDate = this.moment(this.endDate, 'YYYY-MM-DD 23:59:59.000')
				}
			},
			//feedback info of department
			departChange:function(departId,departName){
				this.departId=departId
			},
			//feedback info of position
			positionChange:function(positionId,positionName){
				this.positionId=positionId
			},
			//check applications of employee required
			checkEMPRequire:function(){
				var url = this.url + '/wzbg/empRequireLsit'
				console.log(url)
				axios({
						method: "post",
						url: url,
						headers: {
							"Content-Type": this.contentType,
							"Access-Token": this.accessToken
						},
						data: {
							departId:this.departId,
							positionId:this.positionId,
							beginDate:this.beginDate,
							endDate:this.endDate,
						},
						dataType: "json"
					})
					.then(response => {
						var res = response.data
						if (res.retCode == '0000') {
							if (res.resData.length>0) {
								console.log('erList'+res.resData)
								this.erList=res.resData
							}
						} else {
							alert(res.retMsg)
						}
					})
					.catch(function(error) {
						console.log("请求失败处理");
					});
			},
			//check applications of employee required
			updateEMPRequire:function(item){
				if(item.state=='1'){
					alert('已取消')
					return
				}
				var url = this.url + '/wzbg/updateRYRequire'
				console.log(url)
				axios({
						method: "post",
						url: url,
						headers: {
							"Content-Type": this.contentType,
							"Access-Token": this.accessToken
						},
						data: {
							id:item.id,
							state:'1',
						},
						dataType: "json"
					})
					.then(response => {
						var res = response.data
						console.log(JSON.stringify(res))
						if (res.retCode == '0000') {
							alert(res.retMsg)
							this.checkEMPRequire()
						} else {
							alert(res.retMsg)
						}
					})
					.catch(function(error) {
						console.log("请求失败处理");
					});
			},
		}
	}
</script>

<style>
	@import '../../assets/css/paperlessOffice/people.css';
</style>
