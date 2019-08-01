<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
			<h1 class="modal-title">请假</h1>
		</div>
		<div class="modal-header">
			<h4 id="myModalLabel" class="modal-title"><span>申请人姓名：<i>{{lInfo.leaveAccountName}}</i></span>
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
					<leave @leaveChange='levelStype'></leave>
				</div>
			</div>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>代理人：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control" v-model="lInfo.agentAccount">
						<option v-for="(item,index) in emps" :key="index" v-bind:value="item.employeeId">{{item.employeeName}}</option>
					</select>
				</div>


			</div>

			<div class="col-md-1">

				<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" data-target="#myModalJoin_modify">+</button>
				<div class="modal fade" id="myModalJoin_modify" tabindex="3" role="dialog" aria-labelledby="myModalLabel"
				 aria-hidden="true">
					<div class="modal-dialog">
						<agent @backAciton='agentAction' @closex='closeModal'></agent>
					</div>
				</div>

			</div>

			<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>请假时间：</p>
				</div>
				<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
					<div class='input-group date datetimePicker'>

						<input ref="startTime" type='text' class="form-control" v-model="beginDate" />
						<span class="input-group-addon">
							<span class="glyphicon glyphicon-calendar"></span>
						</span>
					</div>
					<span class="leavespan01">&nbsp;&nbsp;&nbsp;至：</span>
					<div class='input-group date datetimePicker'>

						<input ref="endTime" type='text' class="form-control" v-model="endDate" />
						<span class="input-group-addon">
							<span class="glyphicon glyphicon-calendar"></span>
						</span>
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" style="padding: 0; line-height: 34px;">
					<p>说明：</p>
				</div>
				<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11">
					<textarea class="explain_leave" v-model="lInfo.leaveRemark"></textarea>
				</div>

				<div class="col-md-5">
					<br />
					<button type="button" class="btn btn-warning pull-right m_r_10">取消</button>
					<button type="button" class="btn btn-warning pull-right m_r_10" v-on:click="submitAskForLeaveModify()">确定</button>
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
					<select class="form-control" v-model="lInfo.account1">
						<option v-for="(item,index) in empList_check" :key="index" v-bind:value="item.accountId">{{item.accountName}}</option>
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
					<input type="text" class="form-control" disabled="true">
				</div>
			</div>
			<div class="col-md-3">

				<button type="button" class="btn btn-info" disabled="true">同意</button>
				<button type="button" class="btn btn-info" disabled="true">不同意</button>
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
						<option v-for="(item , index) in empList_verify" :key="index" v-bind:value="item.accountId">{{item.accountName}}</option>
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
					<input type="text" class="form-control" disabled="true">
				</div>
			</div>
			<div class="col-md-3">

				<button type="button" class="btn btn-info" disabled="true">同意</button>
				<button type="button" class="btn btn-info" disabled="true">不同意</button>
			</div>
		</div>

		<div class="modal-header modal_header_leave">
			<h6>批准</h6>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
					<p>批准人：</p>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<select class="form-control" v-model="lInfo.account3">
						<option value="0" v-for="(item , index) in empList_approval" :key="index" v-bind:value="item.accountId">{{item.accountName}}</option>
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
					<input type="text" class="form-control" disabled="true">
				</div>
			</div>
			<div class="col-md-3">

				<button type="button" class="btn btn-info" disabled="true">同意</button>
				<button type="button" class="btn btn-info" disabled="true">不同意</button>
			</div>
		</div>


		<div class="modal-header modal_header_leave">
			<h6>报备</h6>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>报备人：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control" v-model="lInfo.account4">
						<option value="1127">李珊珊</option>
					</select>
				</div>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>备注：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<input type="text" class="form-control" disabled="true">
				</div>
			</div>
			<div class="col-md-4">

				<button type="button" class="btn btn-info" disabled="true">同意</button>
				<button type="button" class="btn btn-info" disabled="true">不同意</button>
			</div>
		</div>



		<div class="modal-footer">
			<!--按钮-->
			<div class="col-md-12">

				<button type="button" class="btn btn-info" v-on:click="submitAskForLeaveApply()">确认</button>
				<button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
			</div>

			<div class="beihzu">

				<i>按钮用来扩大选择其他人员</i>
				<div class="col-md-1">

					<button type="button" class="btn btn-warning pull-left m_r_10" disabled="true">+</button>

				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import axios from 'axios'
	import depart from '../../vuecommon/department.vue'
	import leave from '../../vuecommon/leaveTypes.vue'
	import agent from '../subAFL/agentOfDepart.vue'
	export default {
		components: {
			depart,
			leave,
			agent
		},
		data() {
			return {
				lInfo: {}, //請假信息
				departId: '', //请假人的部门ID
				positionId: '', //请假人岗位ID
				accountId: '', //请假人账号ID
				delgateEMP: [], //代理人
				cEmpList: [],
				emps: [], //人员列表

				empList_check: [],
				empListCheckTimes: 0,
				levelCheck: '0',
				empList_verify: [],
				empListVerifyTimes: 0,
				levelVerify: '0',
				empList_approval: [],
				empListApprovalTimes: 0,
				levelApproval: '0',


				beginDate: this.moment('', 'YYYY-MM-DD 08:30'),
				endDate: this.moment('', 'YYYY-MM-DD 17:30'),

				isModify: '',
				isModify_1: true,
				isModify_2: true,
				isModify_3: true,
				isModify_4: true,
			};
		},
		methods: {
			showLInfo: function(lInfo, param) {
				this.lInfo = lInfo
				this.departId = lInfo.departId
				this.positionId = lInfo.position_ID
				this.accountId = lInfo.account_ID
				this.lInfo.updateTime = this.moment()
				this.lInfo.step = '0'

				//清空数据
				this.empList_check = [],
					this.empListCheckTimes = 0,
					this.levelCheck = '0',
					this.empList_verify = [],
					this.empListVerifyTimes = 0,
					this.levelVerify = '0',
					this.empList_approval = [],
					this.empListApprovalTimes = 0,
					this.levelApproval = '0',


					this.empList()
				this.addEmp('check')
				this.addEmp('verify')
				this.addEmp('approval')
			},
			levelStype: function(param) {
				this.lInfo.leaveType = param
			},
			//代理人数据返回
			agentAction: function(param) {
				console.log('agentActionId:' + param.employeeId)
				$("#myModalJoin_modify").modal('hide')
				this.emps.push(param)
				this.lInfo.agentAccount = param.employeeId
			},
			closeModal:function(){
				$("#myModalJoin_modify").modal('hide')
			},
			//代理人弹窗
			showSelectEmp: function() {
				$("#myModalJoin_add").modal('show')
			},
			//'+'被点击的方法
			addEmp: function(param) {
				if (param == 'check') {
					if (this.empListCheckTimes == 9) {
						this.empListCheckTimes = 0
					}
					if (this.empListCheckTimes == 0) {
						this.levelCheck = '0'
					} else if (this.empListCheckTimes == 3) {
						this.levelCheck = '1'
					} else if (this.empListCheckTimes == 6) {
						this.levelCheck = '2'
					}
					this.checkEmpList(param, this.levelCheck, this.empListCheckTimes)
					this.empListCheckTimes++
				} else if (param == 'verify') {
					if (this.empListVerifyTimes == 6) {
						this.empListVerifyTimes = 0
					}
					if (this.empListVerifyTimes == 0) {
						this.levelVerify = '1'
					} else if (this.empListVerifyTimes == 3) {
						this.levelVerify = '2'
					}
					this.checkEmpList(param, this.levelVerify, this.empListVerifyTimes)
					this.empListVerifyTimes++
				} else if (param == 'approval') {
					if (this.empListApprovalTimes == 6) {
						this.empListApprovalTimes = 0
					}
					if (this.empListApprovalTimes == 0) {
						this.levelApproval = '1'
					} else if (this.empListApprovalTimes == 1) {
						this.levelApproval = '2'
					}
					this.checkEmpList(param, this.levelApproval, this.empListApprovalTimes)
					this.empListApprovalTimes++
				}
			},
			//查询不同类型审核人员
			checkEmpList: function(param, level, clickTimes) {
				var url = this.url + '/wzbg/checkOfEmpList'
				console.log('checkEmpList:' + url)
				console.log('positionId:' + this.positionId)
				if (this.isBlank(this.positionId)) {
					this.positionId = '1'
				}
				var clickTimes = clickTimes.toString()

				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						clickTimes: clickTimes,
						level: level,
						positionId: this.positionId,
						departId: this.departId,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.resData.length > 0) {
							if (param == 'check') {
								this.empList_check = {}
								this.empList_check = res.resData
							} else if (param == 'verify') {
								this.empList_verify = {}
								this.empList_verify = res.resData
							} else if (param == 'approval') {
								this.empList_approval = {}
								this.empList_approval = res.resData
							}

							$("#myModalQuery").modal('hide');
						} else {
							alert('已经没有更多的数据了')
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			//查询代理人
			empList: function() {
				var url = this.url + '/wzbg/departOfEmpList'
				console.log('checkEmpList:' + url)
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						departId: this.lInfo.departId,
						accountId: this.lInfo.account_ID
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						// alert('LeaveInfoOfApply:' + res.resData.length)
						console.log('LeaveInfoOfApply:' + res.resData)
						if (res.resData.length > 0) {
							this.emps = res.resData
							$("#myModalQuery").modal('hide');
						} else {
							alert('已经没有更多的数据了')
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			submitAskForLeaveModify: function() {
				var url = this.url + '/wzbg/updateLeaveApplication'
				this.lInfo.startTime = this.$refs.startTime.value
				this.lInfo.endTime = this.$refs.endTime.value
				
				if (this.isBlank(this.lInfo.leaveType)) {
					alert('请选择请假类型')
					return
				}
				if (this.isBlank(this.lInfo.account1)) {
					alert('请选择审查人员')
					return
				}
				if (this.isBlank(this.lInfo.account2)) {
					alert('请选择审核人员')
					return
				}
				if (this.isBlank(this.lInfo.account3)) {
					alert('请选择批准人员')
					return
				}
				if (this.isBlank(this.lInfo.account4)) {
					alert('请选择报备人员')
					return
				}
				if (this.isBlank(this.lInfo.leaveRemark)) {
					alert('请填写请假说明')
					return
				}
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						lInfo: this.lInfo
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert('submitAskForLeaveModify:' + res.resData.length)
						console.log('submitAskForLeaveModify:' + res.resData)
						if (res.resData == 1) {
							alert('请假修改成功')
							this.$emit('submitAskForLeaveModify','modify')
						} else {
							alert('已经没有更多的数据了')
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});
			}

		},
		created() {

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
