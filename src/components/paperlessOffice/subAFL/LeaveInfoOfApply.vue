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

				<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" v-on:click="addBtnAction()">+</button>
				<div class="modal fade" id="myModalJoin_add" tabindex="3" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
					<DatePicker v-model="beginDate" v-on:change="dateAction('begin')"></DatePicker>
					<span>&nbsp;&nbsp;&nbsp;至：</span>
					<DatePicker v-model="endDate" v-on:change="dateAction('end')"></DatePicker>
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
					<button type="button" class="btn btn-warning pull-right m_r_10" v-on:click="submitAskForLeaveApply()">确定</button>
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

					<button type="button" class="btn btn-warning pull-left m_r_10"	:disabled="isClickCheckBtn" v-on:click="addEmp('check')">+</button>

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

					<button type="button" class="btn btn-warning pull-left m_r_10":disabled="isClickVerifyBtn" v-on:click="addEmp('verify')">+</button>

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
						<option v-for="(item , index) in empList_approval" :key="index" v-bind:value="item.accountId">{{item.accountName}}</option>
					</select>
				</div>
				<div class="col-md-1">

					<button type="button" class="btn btn-warning pull-left m_r_10" :disabled="isClickApprovalBtn" v-on:click="addEmp('approval')">+</button>

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
	import DatePicker from 'vue2-datepicker'
	import depart from '../../vuecommon/department.vue'
	import leave from '../../vuecommon/leaveTypes.vue'
	import agent from '../subAFL/agentOfDepart.vue'
	export default {
		components: {
			depart,
			leave,
			agent,
			DatePicker
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
				levelCheck: '0', //0代表审核，1代表审查
				isClickCheckBtn:false,
				empList_verify: [],
				empListVerifyTimes: 0,
				levelVerify: '1',
				isClickVerifyBtn:false,
				empList_approval: [],
				empListApprovalTimes: 0,
				levelApproval: '1',
				isClickApprovalBtn:false,


				beginDate: this.moment('', 'YYYY-MM-DD 08:30'),
				endDate: this.moment('', 'YYYY-MM-DD 17:30'),
				dayNum:'0',

				isModify: '',
				isModify_1: true,
				isModify_2: true,
				isModify_3: true,
				isModify_4: true,
			};
		},
		methods: {
			vOnChange: function() {
				console.log("adsfdsfsafdas")
			},
			//sDate1和sDate2是2006-12-18格式
			datedifference:function(sDate1, sDate2) {
				var dateSpan,
					tempDate,
					iDays;
				sDate1 = Date.parse(sDate1);
				sDate2 = Date.parse(sDate2);
				dateSpan = sDate2 - sDate1;
				dateSpan = Math.abs(dateSpan);
				iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
				return iDays
			},
			//更新时间
			dateAction: function(param) {
				if (param == 'begin') {
					this.beginDate = this.moment(this.beginDate, 'YYYY-MM-DD 00:00:00.000')
				} else if (param == 'end') {
					this.endDate = this.moment(this.endDate, 'YYYY-MM-DD 23:59:59.000')
				}
				this.addEmp('approval')
				this.empListApprovalTimes--
			},
			showLInfo: function(lInfo, param) {
				this.lInfo = this.accountInfo()
				this.departId = this.accountInfo().departId
				this.positionId = this.accountInfo().position_ID
				this.accountId = this.accountInfo().account_ID
				this.lInfo.leaveAccount = this.accountInfo().account_ID
				this.lInfo.departId = this.accountInfo().departId
				this.lInfo.positionId = this.accountInfo().position_ID
				this.lInfo.positionTypeId = this.accountInfo().positionTypeId
				this.lInfo.addTime = this.moment()
				this.lInfo.step = '0'
				this.lInfo.leaveType = '病假'
				this.lInfo.account4='1127'
				this.lInfo.dayNum='0'//是否大于三天，大于等于三天 为1，否则为 0

				//清空数据
				this.empList_check = []
				this.empListCheckTimes = 0
				this.levelCheck = '0'
				this.isClickCheckBtn=false
				this.empList_verify = []
				this.empListVerifyTimes = 0
				this.levelVerify = '0'
				this.isClickVerifyBtn=false
				this.empList_approval = []
				this.empListApprovalTimes = 0
				this.levelApproval = '0'
				this.isClickApprovalBtn=false


				this.empList()
				this.addEmp('check')
				this.addEmp('verify')
				this.addEmp('approval')
			},
			levelStype: function(param) {
				this.lInfo.leaveType = param
			},
			//代理人添加弹窗
			addBtnAction: function() {
				this.$children[1].initData()
				$("#myModalJoin_add").modal("show")
			},
			//代理人数据返回
			agentAction: function(param) {
				console.log('agentActionId:' + param.employeeId)
				$("#myModalJoin_add").modal('hide')
				this.emps.push(param)
				this.lInfo.agentAccount = param.employeeId
			},
			closeModal: function() {
				$("#myModalJoin_add").modal('hide')
			},
			//代理人弹窗
			showSelectEmp: function() {
				$("#myModalJoin_add").modal('show')
			},
			//'+'被点击的方法
			addEmp: function(param) {
				if (param == 'check') {
					
					this.levelCheck = '0'
					this.checkEmpList(param, this.levelCheck, this.empListCheckTimes)
					this.empListCheckTimes++
					if (this.empListCheckTimes == 9) {
						this.isClickCheckBtn = true
					}
				} else if (param == 'verify') {
					this.levelVerify = '1'

					this.checkEmpList(param, this.levelVerify, this.empListVerifyTimes)
					this.empListVerifyTimes++
					if (this.empListVerifyTimes == 9) {
						this.isClickVerifyBtn = true
					}
				} else if (param == 'approval') {
					var bDate,eDate,dn
					bDate=this.moment(this.beginDate, 'YYYY-MM-DD')
					eDate=this.moment(this.endDate, 'YYYY-MM-DD')
					dn=this.datedifference(eDate,bDate)//开始时间和结束时间的差值
					if(dn>1){
						this.dayNum='1'
					}else{
						this.dayNum='0'
					}
					if(this.accountInfo().positionTypeId==6 ||(this.accountInfo().positionTypeId<5 && dn>1)){
						this.empListApprovalTimes=5
					}else{
						this.empListApprovalTimes=0
					}

					this.checkEmpList(param, this.levelApproval, this.empListApprovalTimes)
					this.empListApprovalTimes++
					if (this.empListApprovalTimes == 9) {
						this.isClickApprovalBtn = true
					}
				}
			},
			//查询不同类型审核人员
			checkEmpList: function(param, level, clickTimes) {
				var url = ''
				if (param == 'check') {
					url = this.url + '/wzbg/checkOfEmpList'
				} else if (param == 'verify') {
					url = this.url + '/wzbg/verifyOfEmpList'
				} else if (param == 'approval') {
					url = this.url + '/wzbg/approveOfEmpList'
				}
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
						accountId:this.accountInfo().account_ID,
						clickTimes: clickTimes,
						// level: level,
						dayNum:this.dayNum,
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
								this.lInfo.account1 = this.empList_check[0].accountId
							} else if (param == 'verify') {
								this.empList_verify = {}
								this.empList_verify = res.resData
								this.lInfo.account2 = this.empList_verify[0].accountId
							} else if (param == 'approval') {
								this.empList_approval = {}
								this.empList_approval = res.resData
								this.lInfo.account3 = this.empList_approval[0].accountId
							}

							$("#myModalQuery").modal('hide');
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			empList: function() {
				var url = this.url + '/wzbg/departOfEmpList'
				console.log('empList-modify:' + this.lInfo.departId)
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						departId: this.lInfo.departId,
						accountId: this.lInfo.leaveAccount
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						console.log('LeaveInfoOfApply:' + res.resData.length)
						if (res.resData.length > 0) {
							this.emps = res.resData
							this.lInfo.agentAccount =this.emps[0].employeeId
							$("#myModalQuery").modal('hide');
						} 
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			submitAskForLeaveApply: function() {
				var url = this.url + '/wzbg/insertLeaveApplication'
				
				var bDate,eDate,cDate
				cDate=this.moment('', 'YYYY-MM-DD')
				bDate=this.moment(this.beginDate, 'YYYY-MM-DD')
				eDate=this.moment(this.endDate, 'YYYY-MM-DD')
				if(bDate<=cDate){
					alert('开始时间必须大于当前日期')
					return
				}
				if(this.endDate<this.beginDate){
					alert('结束日期必须大于等于开始日期')
					return
				}
				this.lInfo.startTime = this.beginDate
				this.lInfo.endTime = this.endDate
				console.log(this.lInfo.startTime+'+结束时间：'+this.lInfo.endTime)
				if (this.isBlank(this.lInfo.account_ID)) {
					alert('提交请假账户数据异常')
					return
				}
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
						console.log('LeaveInfoOfApply:' + res.resData.length)
						// console.log('LeaveInfoOfApply:' + res.resData)
						if (res.resData == 1) {
							alert('请假成功')
							this.$emit('submitAskForLeaveApply', 'apply')
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
