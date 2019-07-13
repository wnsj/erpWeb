<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
			<h1 class="modal-title">请假</h1>
		</div>
		<div class="modal-header">
			<h4 id="myModalLabel" class="modal-title"><span>申请人姓名：<i>{{lInfo.account_Name}}</i></span>
				<span>部门：<i>{{lInfo.departName}}</i></span>
				<span>职位：<i>{{lInfo.positionName}}</i></span></h4>
		</div>
		<div class="modal-header modal_header_leave">
			<h6>请假</h6>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>类型：</p>
				</div>
				<div class="col-xs-8  col-sm-8 col-md-8 col-lg-8">
					<leave @leaveChange='leaveChange'></leave>
				</div>
			</div>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>代理人：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control" v-model="lInfo.agentAccount">
						<option v-for="(item , index) in emps" :key="index" v-bind:value="item.employeeId">{{item.employeeName}}</option>
					</select>
				</div>


			</div>

			<div class="col-md-1">

				<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" data-target="#myModalJoin_add">+</button>

			</div>

			<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>请假时间：</p>
				</div>
				<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
					<span class="leavespan">
						<div class='input-group date datetimePicker'>
							<input id="inputDate" type='text' class="form-control" ref="result" v-model="beginDate"/>
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</span> <span class="leavespan01">&nbsp;&nbsp;&nbsp;至：</span>
					<span class="leavespan">
						<div class='input-group date datetimePicker' id='datetimepicker2' >
							<input type='text' class="form-control" v-model="endDate"/>
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</span>
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" style="padding: 0; line-height: 34px;">
					<p>说明：</p>
				</div>
				<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11">
					<textarea class="explain_leave"></textarea>
				</div>

				<div class="col-md-5">
					<br />
					<button type="button" class="btn btn-warning pull-right m_r_10">取消</button>
					<button type="button" class="btn btn-warning pull-right m_r_10" v-on:click="">确定</button>
				</div>
			</div>
		</div>

		<div class="modal-header modal_header_leave">
			<h6>审查</h6>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
					<p>审查人：</p>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
					<select class="form-control">
						<option value="0">王斌</option>
					</select>
				</div>
				<div class="col-xs-1 col-sm-1 col-md-1">

					<button type="button" class="btn btn-warning pull-left m_r_10" v-on:click="addEmp('check')">+</button>

				</div>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>备注：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<input type="text" class="form-control">
				</div>
			</div>
			<div class="col-md-3">

				<button type="button" class="btn btn-info" :disabled="isModify_1">同意</button>
				<button type="button" class="btn btn-info" :disabled="isModify_1">不同意</button>
			</div>
		</div>

		<div class="modal-header modal_header_leave">
			<h6>审核</h6>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class=" col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
					<p>审核人：</p>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<select class="form-control" v-model="lInfo.account2">
						<option v-for="(item , index) in emps" :key="index">{{}}</option>
					</select>
				</div>
				<div class="col-md-1">

					<button type="button" class="btn btn-warning pull-left m_r_10" v-on:click="addEmp('verify')">+</button>

				</div>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>备注：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<input type="text" class="form-control">
				</div>
			</div>
			<div class="col-md-3">

				<button type="button" class="btn btn-info" :disabled="isModify_2">同意</button>
				<button type="button" class="btn btn-info" :disabled="isModify_2">不同意</button>
			</div>
		</div>

		<div class="modal-header modal_header_leave">
			<h6>批准</h6>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
					<p>批准人：</p>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<select class="form-control">
						<option value="0">王艳杰</option>
						<option value="1">宋子龙</option>
					</select>
				</div>
				<div class="col-md-1">

					<button type="button" class="btn btn-warning pull-left m_r_10" v-on:click="addEmp('approval')">+</button>

				</div>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>备注：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<input type="text" class="form-control">
				</div>
			</div>
			<div class="col-md-3">

				<button type="button" class="btn btn-info" :disabled="isModify_3">同意</button>
				<button type="button" class="btn btn-info" :disabled="isModify_3">不同意</button>
			</div>
		</div>

		<div class="modal-header modal_header_leave">
			<h6>报备</h6>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>报备人：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control">
						<option value="0">李珊珊</option>
					</select>
				</div>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>备注：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<input type="text" class="form-control">
				</div>
			</div>
			<div class="col-md-4">

				<button type="button" class="btn btn-info" :disabled="isModify_4">同意</button>
				<button type="button" class="btn btn-info" :disabled="isModify_4">不同意</button>
			</div>
		</div>

		<div class="modal-footer">
			<!--按钮-->
			<div class="col-md-12">

				<button type="button" class="btn btn-info" >确认</button>
				<button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
			</div>

			<div class="beihzu">

				<i>按钮用来扩大选择其他人员</i>
				<div class="col-md-1">

					<button type="button" class="btn btn-warning pull-left m_r_10">+</button>

				</div>
			</div>
		</div>
		<aod @backAciton='receivedAction'></aod>
	</div>
</template>

<script>
	import axios from 'axios'
	import leave from '../../vuecommon/leaveTypes.vue'
	import aod from '../subAFL/agentOfDepart.vue'
	import moment from 'moment'
	
	export default {
		components: {
			leave,
			aod
		},
		data() {
			return {
				lInfo: this.accountInfo, //請假信息
				delgateEMP: [], //代理人
				dateList:[],
				emps:[],//人员列表
				
				empList_check:[],
				empListCheckTimes:0,
				empList_verify:[],
				empListVerifyTimes:0,
				empList_approval:[],
				empListApprovalTimes:0,
				level:'0',
				

				beginDate: this.moment('','YYYY/MM/DD 08:30'),
				endDate: this.moment('','YYYY/MM/DD 17:30'),

				isModify: '' ,
				isModify_1: true,
				isModify_2: true ,
				isModify_3: true ,
				isModify_4: true ,
				
				
			};
		},
		methods: {
			leaveChange: function(leaveName) {
				this.lInfo.leaveType=leaveName
				alert(this.lInfo.leaveType)
			},
			showLInfo:function(lInfo,param){
				
			},
			//返回代理人
			receivedAction:function(item){
				this.emps.push(item)
				this.lInfo.agentAccount=item.employeeId
				$("#myModalJoin_add").modal('hide')
			},
			//代理人弹窗
			showSelectEmp:function(){
				$("#myModalJoin_add").modal('show')
			},
			//'+'被点击的方法
			addEmp:function(param){
				if(param=='check'){
					this.empListCheckTimes++
					if(this.empListCheckTimes==3){
						this.empListCheckTimes=0
						this.level='456'
					}else if(this.empListCheckTimes==2){
						this.level='45'
					}else if(this.empListCheckTimes==1){
						this.level='4'
					}
				}else if(param=='verify'){
					this.empListVerifyTimes++
					if(this.empListVerifyTimes==3){
						this.empListVerifyTimes=0
						this.level='456'
					}else if(this.empListVerifyTimes==2){
						this.level='45'
					}else if(this.empListVerifyTimes==1){
						this.level='4'
					}
				}else if(param=='approval'){
					this.empListApprovalTimes++
					if(this.empListApprovalTimes==2){
						this.empListApprovalTimes=0
						this.level='56'
					}else if(this.empListApprovalTimes==1){
						this.level='5'
					}
				}
				this.checkEmpList()
			},
			//查询不同类型审核人员
			checkEmpList:function(){
				var url = this.url + '/wzbg/checkOfEmpList'
				console.log('checkEmpList:'+url)
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						level:this.level,
						positionId:'5'
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log('checkEmpList:'+res)
					if (res.retCode == '0000') {
						if (res.resData.length > 0) {
							this.checkEmpList = res.resData
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
			empList:function(){
				var url = this.url + '/wzbg/departOfEmpList'
				console.log('checkEmpList:'+url)
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						departId:this.lInfo.departId ,
						accountId:this.accountInfo.account_ID
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert('LeaveInfoOfApply:'+res.resData.length)
						console.log('LeaveInfoOfApply:'+res.resData)
						if (res.resData.length > 0) {
							this.emps = res.resData
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
			}

		},
		created(){
			this.empList()
		},
		mounted: function() {
			$(function() {
				$('.datetimePicker').datetimepicker({
					format: 'yyyy-mm-dd hh:ii',
					language: 'cn',
				});
			})
		}
	}
</script>

<style>

</style>
