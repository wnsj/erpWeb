<template>
	<!--倒休申请表弹出-->
	<div class="modal fade" id="rdApplyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog staff_t">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
					<h1 class="modal-title" id="title1">倒休</h1>
				</div>
				<div class="modal-header">
					<h4 id="myModalLabel" class="modal-title"><span>申请人姓名：<i>{{rdInfo.account_Name}}</i></span>
						<span>部门：<i>{{rdInfo.departName}}</i></span>
						<span>职位：<i>{{rdInfo.positionName}}</i></span></h4>
				</div>

				<div class="modal-header modal_header_leave modal-headeroffday">
					<h6>倒休</h6>
					<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
							<p>原因：</p>
						</div>
						<div class="col-xs-8  col-sm-8 col-md-8 col-lg-8">
							<select class="form-control" v-model="rdInfo.reason">
								<option value="个人">个人</option>
								<option value="工作">工作</option>

							</select>
						</div>
					</div>
				</div>
				<div class="modal-header modal_header_leave">
					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>加班时间：</p>
						</div>
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 change_01">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 change_date">
								<option v-for="(item,index) in dateList" :key='index' v-on:click="selectedDate(index)">{{item}}</option>
							</div>
						</div>
						<!-- 使用吴松的办法将按钮放在input标签上，用样式将input标签和内容隐藏 -->
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 change_02">
							<dPicker style='width: 30px;' v-model='addDate' v-on:change="dateAdd()"></dPicker>
							<button type="button" class="btn btn-warning pull-left m_r_12" v-on:click="deleteDateTime()">-</button>
						</div>
					</div>

					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>加班累积：</p>
						</div>
						<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 change_right">
							<input class="col-xs-8 col-sm-8 col-md-8 col-lg-8" style="padding: 0; line-height: 34px;" v-model="totleNum">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 change_01 offday_add">
								<button class="btn btn-default" type="button"><i class="fa fa-caret-up" v-on:click="cumulative('+')"></i></button>
								<button class="btn btn-default" type="button"><i class="fa fa-caret-down" v-on:click="cumulative('-')"></i></button>
							</div>

						</div>

						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
							<select class="form-control col-xs-12 col-sm-12 col-md-12 col-lg-12" v-model="totleName" style="padding: 0; line-height: 34px;">
								<option value="天">天</option>
								<option value="小时">小时</option>
							</select>
						</div>

					</div>

					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
						<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
							<p>休息时间：</p>
						</div>
						<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 change_01">

							<div class='input-group date datetimePicker'>

								<input ref="startTime" type='text' class="form-control" v-model="beginDate" />
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-calendar"></span>
								</span>
							</div>
							<div class='input-group date datetimePicker'>

								<input ref="endTime" type='text' class="form-control" v-model="endDate" />
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-calendar"></span>
								</span>
							</div>

						</div>

					</div>
				</div>

				<!--说明-->
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" style="padding: 0; line-height: 34px;">
						<p>说明：</p>
					</div>
					<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11">
						<textarea class="explain_leave" v-model="rdInfo.leaveRemark"></textarea>
					</div>

					<div class="col-md-5">
						<br />
						<button type="button" class="btn btn-warning pull-right m_r_10" v-on:click="closeBtnAction()">取消</button>
						<button type="button" class="btn btn-warning pull-right m_r_10" v-on:click="restDownApply()">确定</button>
					</div>
				</div>

				<div class="modal-header modal_header_leave modal-headeroffday">


					<div class="modal-header modal_header_leave">
						<h6>审查</h6>
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
							<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
								<p>审查人：</p>
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
								<select class="form-control" v-model="rdInfo.account1">
									<option v-for="(item,index) in empList_check" :key="index" v-bind:value="item.accountId">{{item.accountName}}</option>
								</select>
							</div>
							<div class="col-xs-1 col-sm-1 col-md-1">

								<button type="button" class="btn btn-warning pull-left m_r_10" :disabled="isClickCheckBtn" v-on:click="addEmp('check')">+</button>

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
						<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">

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
								<select class="form-control" v-model="rdInfo.account2">
									<option v-for="(item , index) in empList_verify" :key="index" v-bind:value="item.accountId">{{item.accountName}}</option>
								</select>
							</div>
							<div class="col-md-1">

								<button type="button" class="btn btn-warning pull-left m_r_10" :disabled="isClickVerifyBtn" v-on:click="addEmp('verify')">+</button>

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
						<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">

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
								<select class="form-control" v-model="rdInfo.account3">
									<option value="0" v-for="(item , index) in empList_approval" :key="index" v-bind:value="item.accountId">{{item.accountName}}</option>
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
						<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">

							<button type="button" class="btn btn-info" disabled="true">同意</button>
							<button type="button" class="btn btn-info" disabled="true">不同意</button>
						</div>
					</div>

					<!--报备人-->
					<div class="modal-header modal_header_leave">
						<h6>报备</h6>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>报备人：</p>
							</div>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<select class="form-control" v-model="rdInfo.account4">
									<option value="1127">李珊珊</option>
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
						<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">

							<button type="button" class="btn btn-info" disabled="ture">同意</button>
							<button type="button" class="btn btn-info" disabled="ture">不同意</button>
						</div>
					</div>

					<div class="beihzu">

						<i>按钮用来扩大选择其他人员</i>
						<div class="col-md-1">

							<button type="button" class="btn btn-warning pull-left m_r_10" disabled="ture">+</button>

						</div>
					</div>

				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import axios from 'axios'
	import dPicker from 'vue2-datepicker'
	export default {
		components: {
			dPicker
		},
		data() {
			return {
				rdInfo: this.accountInfo(),//到修改的全部信息
				addDate: '', //添加时间变量
				selectedIndex: -1,//删除指定的时间
				totleNum:0,//统计加班时间
				totleName:'天',
				beginDate: this.moment('', 'YYYY-MM-DD 08:30'),
				endDate: this.moment('', 'YYYY-MM-DD 17:30'),



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


				dateList: []
			};
		},
		methods: {
			initInfo:function(){
				this.rdInfo = this.accountInfo()
				this.departId = this.accountInfo().departId
				this.positionId = this.accountInfo().position_ID
				this.accountId = this.accountInfo().account_ID
				this.rdInfo.leaveAccount = this.accountInfo().account_ID
				this.rdInfo.departId = this.accountInfo().departId
				this.rdInfo.positionId = this.accountInfo().position_ID
				this.rdInfo.addTime = this.moment()
				this.rdInfo.account4='1127'
				
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
				
				
				this.addEmp('check')
				this.addEmp('verify')
				this.addEmp('approval')
				
			},
			//添加加班时间
			dateAdd: function() {

				this.addDate = this.moment(this.addDate, 'YYYY-MM-DD')

				if (this.dateList.length > 0) {
					for (var i = 0; i < this.dateList.length; i++) {
						var dateStr = this.dateList[i]
						if (this.addDate == dateStr) {
							return
						}
					}
				}
				this.dateList.push(this.addDate)

				$("#date").trigger("click")
			},
			//删除被选中的时间
			selectedDate: function(index) {
				this.selectedIndex = index
			},
			deleteDateTime: function() {
				if (this.selectedIndex != -1) {
					this.dateList.splice(this.selectedIndex, 1)
				}
				this.selectedIndex = -1
			},
			//加班累计
			cumulative: function(param) {
				if (param == '+') {
					this.totleNum++
				} else if (param == '-') {
					
					if (this.totleNum > 0) {
						this.totleNum--
					}
				}
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
					
					if(this.accountInfo().positionTypeId==6){
						this.empListApprovalTimes=5
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
						accountId:this.accountInfo().account_ID,
						clickTimes: clickTimes,
						// level: level,
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
								this.rdInfo.account1 = this.empList_check[0].accountId
							} else if (param == 'verify') {
								this.empList_verify = {}
								this.empList_verify = res.resData
								this.rdInfo.account2 = this.empList_verify[0].accountId
							} else if (param == 'approval') {
								this.empList_approval = {}
								this.empList_approval = res.resData
								this.rdInfo.account3 = this.empList_approval[0].accountId
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
			//倒休申请
			restDownApply: function() {
				this.rdInfo.startTime = this.$refs.startTime.value
				this.rdInfo.endTime = this.$refs.endTime.value
				if (this.isBlank(this.rdInfo.leaveAccount)) {
					alert('提交倒休账户数据异常')
					return
				}
				if (this.dateList.length<1) {
					alert('请选择加班的时间')
					return
				}
				if (this.totleNum<=0) {
					alert('请统计加班时间')
					return
				}
				this.rdInfo.workTotal=this.totleNum+this.totleName
				this.rdInfo.workTime=this.dateList.join('|')
				if (this.isBlank(this.rdInfo.reason)) {
					alert('请选择倒休原因')
					return
				}
				if (this.isBlank(this.rdInfo.account1)) {
					alert('请选择审查人员')
					return
				}
				if (this.isBlank(this.rdInfo.account2)) {
					alert('请选择审核人员')
					return
				}
				if (this.isBlank(this.rdInfo.account3)) {
					alert('请选择批准人员')
					return
				}
				if (this.isBlank(this.rdInfo.account4)) {
					alert('请选择报备人员')
					return
				}
				if (this.isBlank(this.rdInfo.leaveRemark)) {
					alert('请填写倒休说明')
					return
				}
				
				var url = this.url + '/wzbg/restDownApply'
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						rdInfo:this.rdInfo
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert('restInfoOfApply:' + res.resData.length)
						console.log('restInfoOfApply:' + res.resData)
						if (res.resData == 1) {
							alert('倒休申请成功')
							this.$emit('restDownApply', 'apply')
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
			closeBtnAction:function(){
				$("#rdApplyModal").modal('hide')
			},
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
