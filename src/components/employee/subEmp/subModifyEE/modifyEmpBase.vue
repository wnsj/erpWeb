<template>
	<div class="tab-pane fade in active martop" id="updatabasic">
		<form action="">
			<div class="form-group clearfix">
				<label for="cyname" class="col-md-2 control-label text-right nopad">成员姓名：</label>
				<div class="col-md-5">
					<input type="text" class="form-control" id="cyname" v-model="personalBase.name">
				</div>
				<template>
					<div class="col-md-3 text-danger linhet" v-if="personalBase.state == 2">已离职</div>
				</template>
			</div>
			<div class="form-group clearfix">
				<label for="sex" class="col-md-2 control-label text-right nopad">性别：</label>
				<div class="col-md-5">
					<input type="text" class="form-control" id="sex" v-model="personalBase.sex">
				</div>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">出生年月：</label>
				<div class="col-md-5 input-group date form_date">
					<input type=" date" class="form-control" v-model="personalBase.birth">
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span> </div>
			</div>
			<div class="form-group clearfix">
				<label for="gh" class="col-md-2 control-label text-right nopad">工号：</label>
				<div class="col-md-5">
					<input type="text" class="form-control" id="gh" v-model="personalBase.jobNum" disabled>
				</div>
			</div>
			<div class="form-group clearfix">
				<label for="erpzh" class="col-md-2 control-label text-right nopad">ERP账号：</label>
				<div class="col-md-5">
					<input type="text" class="form-control" id="erpzh" v-model="personalBase.erpaaccount" disabled>
				</div>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">部门：</label>
				<div class="col-md-5">
					<input type="text" class="form-control" v-model="personalBase.departName" disabled>
				</div>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">职位：</label>
				<div class="col-md-5">
					<input type="text" class="form-control" v-model="personalBase.positionName" disabled>
				</div>
				<button type="button" class="btn btn-warning" data-toggle="modal" v-on:click="positionShiftAction()">岗位调动</button>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">入职日期：</label>
				<div class="col-md-5 input-group date form_date">
					<input type="date" class="form-control" v-model="personalBase.entryDate">
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span> </div>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">转正日期：</label>
				<div class="col-md-5 input-group date form_date">
					<input type="date" class="form-control" v-model="personalBase.positiveDate">
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span> </div>
				<template>
					<div class="col-md-3 text-primary linhet" v-if="personalBase.positiveDate == ''">非转正员工</div>
				</template>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">离职日期：</label>
				<div class="col-md-5 input-group date form_date">
					<input type="date" class="form-control" v-model="personalBase.resignDate">
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span> </div>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">离职类型：</label>
				<div class="col-md-5">
					<select class="form-control" v-model="personalBase.resignType">
						<option value="辞职">辞职</option>
						<option value="辞退">辞退</option>
						<option value="其他">其他</option>
					</select>
				</div>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">离职原因：</label>
				<div class="col-md-5">
					<lReason></lReason>
				</div>
				<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#Cause_management" >原因管理</button>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">状态：</label>
				<div class="col-md-5">
					<select class="form-control" v-model="personalBase.state">
						<option value="1">在职</option>
						<option value="2">离职</option>
					</select>
				</div>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">备注：</label>
				<div class="col-md-5">
					<textarea class="form-control" rows="3" v-model="personalBase.remark"></textarea>
				</div>
			</div>
		</form>
		<lrManager></lrManager>
		<positionShift  @shiftChange = 'positionShift'></positionShift>
	</div>
</template>

<script>
	
	import axios from 'axios'
	import department from '../../../vuecommon/department.vue'
	import position from '../../../vuecommon/position.vue'
	import lReason from '../../../vuecommon/leaveReason.vue'
	import lrManager from '../subModifyEE/subMes/lrManager.vue'
	import positionShift from '../subModifyEE/subMes/positionShift.vue'
	
	export default {
		components:{department,position,lReason,lrManager,positionShift},
		// props:['personalBase'],//传过来的个人信息
		data() {
			return {
				departmentList:[],
				positionList:[],
				personalBase:{},
				// employeeInfo:{},//请求的个人信息
			};
		},
		methods:{
			childrenBaseInfo:function(param){
				this.personalBase = param
			},
			positionShiftAction:function(){
				this.$children[2].initData(this.personalBase)
				$("#Post_transfer").modal('show')
			},
			positionShift:function (positionShiftInfo){
				this.personalBase.departName = positionShiftInfo.departName
				this.personalBase.departId = positionShiftInfo.departId
				this.personalBase.positionName = positionShiftInfo.positionName
				this.personalBase.positionId = positionShiftInfo.positionId
				$("#Post_transfer").modal('hide')
			},
			
		},
		
	}
</script>

<style>

</style>
