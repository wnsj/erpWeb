<template>
	<!--倒休申请表弹出-->
	<div class="modal fade" id="rdCheckModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog staff_t">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
					<h1 class="modal-title" id="title1">倒休</h1>
				</div>
				<div class="modal-header">
					<h4 id="myModalLabel" class="modal-title"><span>申请人姓名：<i>{{rdInfo.leaveAccountName}}</i></span>
						<span>部门：<i>{{rdInfo.departName}}</i></span>
						<span>职位：<i>{{accountInfo().positionName}}</i></span></h4>
				</div>

				<div class="modal-header modal_header_leave modal-headeroffday">
					<h6>倒休</h6>
					<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
							<p>原因：</p>
						</div>
						<div class="col-xs-8  col-sm-8 col-md-8 col-lg-8">
							<select class="form-control" disabled="ture" v-model="rdInfo.reason">
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
								<option v-for="(item,index) in dateList" :disabled="true" :key='index' v-on:click="selectedDate(index)">{{item}}</option>
							</div>
						</div>
						<!-- 使用吴松的办法将按钮放在input标签上，用样式将input标签和内容隐藏 -->
						<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 change_02">
							<dPicker style='width: 30px;' v-model='addDate' :disabled='true' v-on:change="dateAdd()"></dPicker>
							<button type="button" class="btn btn-warning pull-left m_r_12" disabled="ture" v-on:click="deleteDateTime()">-</button>
						</div>
					</div>

					<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
							<p>加班累积：</p>
						</div>
						<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 change_right">
							<input class="col-xs-8 col-sm-8 col-md-8 col-lg-8" style="padding: 0; line-height: 34px;" disabled="ture" v-model="totleNum">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 change_01 offday_add">
								<button class="btn btn-default" type="button" disabled="ture"><i class="fa fa-caret-up" disabled="ture" v-on:click="cumulative('+')"></i></button>
								<button class="btn btn-default" type="button" disabled="ture"><i class="fa fa-caret-down" disabled="ture" v-on:click=""></i></button>
							</div>

						</div>

						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
							<select class="form-control col-xs-12 col-sm-12 col-md-12 col-lg-12" disabled="ture" v-model="totleName" style="padding: 0; line-height: 34px;">
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

								<input ref="startTime" type='text' class="form-control" disabled="ture" v-model="beginDate" />
								<span class="input-group-addon">
									<span class="glyphicon glyphicon-calendar"></span>
								</span>
							</div>
							<div class='input-group date datetimePicker'>

								<input ref="endTime" type='text' class="form-control" disabled="ture" v-model="endDate" />
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
						<textarea class="explain_leave" disabled="ture" v-model="rdInfo.leaveRemark"></textarea>
					</div>

					<div class="col-md-5">
						<br />
						<button type="button" class="btn btn-warning pull-right m_r_10" disabled="ture">取消</button>
						<button type="button" class="btn btn-warning pull-right m_r_10" disabled="ture" v-on:click="restDownApply()">确定</button>
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
								<select class="form-control" disabled="ture">
									<option>{{rdInfo.accountName1}}</option>
								</select>
							</div>
							<div class="col-xs-1 col-sm-1 col-md-1">

								<button type="button" class="btn btn-warning pull-left m_r_10" disabled="ture" v-on:click="addEmp('check')">+</button>

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
								<select class="form-control" disabled="ture">
									<option>{{rdInfo.accountName2}}</option>
								</select>
							</div>
							<div class="col-md-1">

								<button type="button" class="btn btn-warning pull-left m_r_10" disabled="ture" v-on:click="addEmp('verify')">+</button>

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
								<select class="form-control" disabled="ture">
									<option>{{rdInfo.accountName3}}</option>
								</select>
							</div>
							<div class="col-md-1">

								<button type="button" class="btn btn-warning pull-left m_r_10" disabled="ture" v-on:click="addEmp('approval')">+</button>

							</div>
						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>备注：</p>
							</div>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<input type="text" class="form-control" disabled="true" >
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
								<select class="form-control" disabled="ture">
									<option>{{rdInfo.accountName4}}</option>
								</select>
							</div>
						</div>
						<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>备注：</p>
							</div>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<input type="text" class="form-control" disabled="ture">
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
				rdInfo: {},//到修改的全部信息
				addDate: '', //添加时间变量
				selectedIndex: -1,//删除指定的时间
				totleNum:0,//统计加班时间
				totleName:'天',
				beginDate: this.moment('', 'YYYY-MM-DD 08:30'),
				endDate: this.moment('', 'YYYY-MM-DD 17:30'),



				empList_check: [],
				empListCheckTimes: 0,
				levelCheck: '0',
				empList_verify: [],
				empListVerifyTimes: 0,
				levelVerify: '0',
				empList_approval: [],
				empListApprovalTimes: 0,
				levelApproval: '0',


				dateList: []
			};
		},
		methods: {
			initInfo:function(rdInfo){
				this.rdInfo = rdInfo
				this.departId = this.accountInfo().departId
				this.positionId = this.accountInfo().position_ID
				this.accountId = this.accountInfo().account_ID
				

				
				
				this.rdInfo.applyTime = this.moment()
				this.dateList= []
				
				
				
				if(this.rdInfo.workTime.indexOf("|")){
					this.dateList=this.rdInfo.workTime.split("|")
				}else{
					this.dateList.push(this.rdInfo.workTime)
				}
				console.log('workTotal:'+this.rdInfo.workTotal)
				//分隔加班天数和单位
				this.totleNum=this.rdInfo.workTotal.slice(0,1)
				this.totleName=this.rdInfo.workTotal.slice(1,2)
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
