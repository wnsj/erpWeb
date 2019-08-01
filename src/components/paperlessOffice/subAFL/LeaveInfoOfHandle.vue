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
					<leave disabled="true"></leave>
				</div>
			</div>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>代理人：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control" v-model="lInfo.agentAccount" disabled="true">
						<option v-for="(item,index) in emps" :key="index" v-bind:value="item.employeeId">{{item.employeeName}}</option>
					</select>
				</div>


			</div>

			<div class="col-md-1">

				<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" data-target="#myModalJoin_modify" disabled="true">+</button>
				<div class="modal fade" id="myModalJoin_modify" tabindex="3" role="dialog" aria-labelledby="myModalLabel"
				 aria-hidden="true">
					<div class="modal-dialog">
						<agent disabled="true"></agent>
					</div>
				</div>

			</div>

			<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>请假时间：</p>
				</div>
				<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
					<div class='input-group date datetimePicker'>

						<input ref="startTime" type='text' class="form-control" disabled="true" v-model="beginDate" />
						<span class="input-group-addon">
							<span class="glyphicon glyphicon-calendar"></span>
						</span>
					</div>
					<span class="leavespan01">&nbsp;&nbsp;&nbsp;至：</span>
					<div class='input-group date datetimePicker'>

						<input ref="endTime" type='text' class="form-control" disabled="true" v-model="endDate" />
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
					<textarea class="explain_leave" v-model="lInfo.leaveRemark" disabled="true"></textarea>
				</div>

				<div class="col-md-5">
					<br />
					<button type="button" class="btn btn-warning pull-right m_r_10" disabled="true">取消</button>
					<button type="button" class="btn btn-warning pull-right m_r_10" disabled="true" v-on:click="submitAskForLeaveModify()">确定</button>
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
					<input type="text" class="form-control" v-model="lInfo.accountName1" :disabled="disabled_check">
				</div>
				<div class="col-xs-1 col-sm-1 col-md-1">

					<button type="button" class="btn btn-warning pull-left m_r_10" disabled="true" v-on:click="addEmp('check')">+</button>

				</div>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>备注：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<input type="text" class="form-control" :disabled="disabled_check" v-model="lInfo.remark1">
				</div>
			</div>
			<div class="col-md-3">

				<button type="button" class="btn btn-info" :disabled="disabled_check" v-on:click="submitCVARBtnAction('check','1')">同意</button>
				<button type="button" class="btn btn-info" :disabled="disabled_check" v-on:click="submitCVARBtnAction('check','0')">不同意</button>
			</div>
		</div>

		<div class="modal-header modal_header_leave">
			<h6>审核</h6>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class=" col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
					<p>审核人：</p>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<input type="text" class="form-control" v-model="lInfo.accountName2" :disabled="disabled_check">
				</div>
				<div class="col-md-1">

					<button type="button" class="btn btn-warning pull-left m_r_10" disabled="true" v-on:click="addEmp('verify')">+</button>

				</div>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>备注：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<input type="text" class="form-control" :disabled="disabled_verify" v-model="lInfo.remark2">
				</div>
			</div>
			<div class="col-md-3">

				<button type="button" class="btn btn-info" :disabled="disabled_verify" v-on:click="submitCVARBtnAction('verify','1')">同意</button>
				<button type="button" class="btn btn-info" :disabled="disabled_verify" v-on:click="submitCVARBtnAction('verify','0')">不同意</button>
			</div>
		</div>

		<div class="modal-header modal_header_leave">
			<h6>批准</h6>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
					<p>批准人：</p>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<input type="text" class="form-control" v-model="lInfo.accountName3" :disabled="disabled_check">
				</div>
				<div class="col-md-1">

					<button type="button" class="btn btn-warning pull-left m_r_10" disabled="true" v-on:click="addEmp('approval')">+</button>

				</div>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>备注：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<input type="text" class="form-control" :disabled="disabled_approval" v-model="lInfo.remark3">
				</div>
			</div>
			<div class="col-md-3">

				<button type="button" class="btn btn-info" :disabled="disabled_approval" v-on:click="submitCVARBtnAction('approval','1')">同意</button>
				<button type="button" class="btn btn-info" :disabled="disabled_approval" v-on:click="submitCVARBtnAction('approval','0')">不同意</button>
			</div>
		</div>


		<div class="modal-header modal_header_leave">
			<h6>报备</h6>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>报备人：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control" v-model="lInfo.account4" disabled="true">
						<option value="1127">李珊珊</option>
					</select>
				</div>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>备注：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<input type="text" class="form-control" :disabled="disabled_report" v-model="lInfo.remark4">
				</div>
			</div>
			<div class="col-md-4">

				<button type="button" class="btn btn-info" :disabled="disabled_report" v-on:click="submitCVARBtnAction('report','1')">同意</button>
				<button type="button" class="btn btn-info" :disabled="disabled_report" v-on:click="submitCVARBtnAction('report','0')">不同意</button>
			</div>
		</div>



		<div class="modal-footer">
			<!--按钮-->
			<div class="col-md-12">

				<button type="button" class="btn btn-info" disabled="true" v-on:click="submitAskForLeaveModify()">确认</button>
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
				disabled_check: true,
				disabled_verify: true,
				disabled_approval: true,
				disabled_report: true,
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

			},
			//显示对应的审查、审核、批准、报备人
			showCVAREmp:function(param){
				if(param=='check'){
					this.disabled_check=false
				}else if(param=='verify'){
					this.disabled_verify=false
				}else if(param=='approval'){
					this.disabled_approval=false
				}else if(param=='report'){
					this.disabled_report=false
				}
			},
			submitCVARBtnAction:function(btnType,isAgree){
				if(btnType=='check'){
					this.lInfo.result1=isAgree
					this.lInfo.time1=this.moment()
				}else if(btnType=='verify'){
					this.lInfo.result2=isAgree
					this.lInfo.time2=this.moment()
				}else if(btnType=='approval'){
					this.lInfo.result3=isAgree
					this.lInfo.time3=this.moment()
				}else if(btnType=='report'){
					this.lInfo.time4=this.moment()
					this.lInfo.result4=isAgree
				}
				
				this.submitAskForLeaveModify()
			},
			submitAskForLeaveModify: function() {
				var url = this.url + '/wzbg/updateLeaveApplication'
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
						console.log('submitAskForLeaveModify:' + res.resData)
						if (res.resData == 1) {
							alert('请假修改成功')
							this.$emit('submitAskForLeaveModify','handle')
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
