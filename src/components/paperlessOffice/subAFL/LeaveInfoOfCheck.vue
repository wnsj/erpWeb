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
				<select class="form-control" disabled=＂true＂>
                  <option value="0">病假</option>
                  <option value="1">事假</option>
                  <option value="2">年假</option>
                  <option value="3">婚假</option>
                  <option value="4">产检</option>
                  <option value="5">产假</option>
                  <option value="6">哺乳假</option>
                  <option value="7">丧假</option>
                  <option value="8">停薪留职</option>
                  <option value="9">其他</option>
                </select>
				</div>
			</div>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>代理人：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control" disabled=＂true＂>
						<option selected="selected">{{lInfo.agentAccountName}}</option>
					</select>
				</div>
	
	
			</div>
	
			<div class="col-md-1">
	
				<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" data-target="#myModalJoin_add" disabled=＂true＂>+</button>
	
			</div>
	
			<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>请假时间：</p>
				</div>
				<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
					<dPicker v-model="lInfo.startTime" :disabled="true"></dPicker>
					<span class="leavespan01">&nbsp;&nbsp;&nbsp;至：</span>
					<dPicker v-model="lInfo.endTime" :disabled="true"></dPicker>
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" style="padding: 0; line-height: 34px;">
					<p>说明：</p>
				</div>
				<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11">
					<textarea class="explain_leave" v-model="lInfo.leaveRemark" :disabled="true"></textarea>
				</div>
	
				<div class="col-md-5">
					<br />
					<button type="button" class="btn btn-warning pull-right m_r_10" disabled=＂true＂>取消</button>
					<button type="button" class="btn btn-warning pull-right m_r_10" disabled=＂true＂>确定</button>
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
					<select class="form-control" disabled=＂true＂>
						<option selected="selected">{{lInfo.accountName1}}</option>
					</select>
				</div>
				<div class="col-xs-1 col-sm-1 col-md-1">
	
					<button type="button" class="btn btn-warning pull-left m_r_10" disabled=＂true＂>+</button>
	
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
	
				<button type="button" class="btn btn-info" disabled=＂true＂>同意</button>
				<button type="button" class="btn btn-info" disabled=＂true＂>不同意</button>
			</div>
		</div>
	
		<div class="modal-header modal_header_leave">
			<h6>审核</h6>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class=" col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
					<p>审核人：</p>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<select class="form-control" disabled=＂true＂>
						<option selected="selected">{{lInfo.accountName2}}</option>
					</select>
				</div>
				<div class="col-md-1">
	
					<button type="button" class="btn btn-warning pull-left m_r_10" disabled=＂true＂>+</button>
	
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
	
				<button type="button" class="btn btn-info" disabled=＂true＂>同意</button>
				<button type="button" class="btn btn-info" disabled=＂true＂>不同意</button>
			</div>
		</div>
	
		<div class="modal-header modal_header_leave">
			<h6>批准</h6>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
					<p>批准人：</p>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<select class="form-control" disabled=＂true＂>
						<option selected="selected">{{lInfo.accountName3}}</option>
					</select>
				</div>
				<div class="col-md-1">
	
					<button type="button" class="btn btn-warning pull-left m_r_10" disabled=＂true＂>+</button>
	
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
	
				<button type="button" class="btn btn-info" disabled=＂true＂>同意</button>
				<button type="button" class="btn btn-info" disabled=＂true＂>不同意</button>
			</div>
		</div>
	
	
		<div class="modal-header modal_header_leave">
			<h6>报备</h6>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>报备人：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control" disabled=＂true＂>
						<option selected="selected">{{lInfo.accountName4}}</option>
					</select>
				</div>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>备注：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<input type="text" class="form-control" disabled=＂true＂>
				</div>
			</div>
			<div class="col-md-4">
	
				<button type="button" class="btn btn-info" disabled=＂true＂>同意</button>
				<button type="button" class="btn btn-info" disabled=＂true＂>不同意</button>
			</div>
		</div>
	
	
	
		<div class="modal-footer">
			<div class="beihzu">
	
				<i>按钮用来扩大选择其他人员</i>
				<div class="col-md-1">
	
					<button type="button" class="btn btn-warning pull-left m_r_10" disabled=＂true＂>+</button>
	
				</div>
			</div>
		</div>
	
	</div>
</template>

<script>
	import depart from '../../vuecommon/department.vue'
	import leave from '../../vuecommon/leaveTypes.vue'
	import dPicker from 'vue2-datepicker'
	export default {
		components:{
			depart,
			leave,
			dPicker
		},
		data() {
			return {
				lInfo:{},//請假信息
				delgateEMP:[],//代理人
				
				beginDate:this.getCurrentDay,
				endDate:this.getCurrentDay,
				
				isModify:''//操作类型，查询，修改，申请
			};
		},
		methods:{
			showLInfo:function(lInfo,param){
				this.lInfo=lInfo
			}
		}
	}
</script>

<style>

</style>
