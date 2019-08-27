<template>
	<div class="tab-pane fade in active martop" id="basic">
		<form action="">
			<div class="form-group clearfix">
				<label for="cyname" class="col-md-2 control-label text-right nopad">姓名：</label>
				<div class="col-md-5">
					<input type="text" class="form-control" v-model="personalBase.name" placeholder="">
				</div>
			</div>
			<div class="form-group clearfix">
				<label for="sex" class="col-md-2 control-label text-right nopad">性别：</label>
				<div class="col-md-5">
					<input type="text" class="form-control" v-model="personalBase.sex" placeholder="">
				</div>
			</div>
			<div class="form-group clearfix">
				
				<label class="col-md-2 control-label text-right nopad">出生年月：</label>
				<dPicker v-model="personalBase.birth" v-on:change="dateAction('0')"></dPicker>
				<!-- <div class="col-md-5 input-group date form_date">
					
					<input type="date" class="form-control" v-model="personalBase.birth" value="">
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				</div> -->
			</div>
			<div class="form-group clearfix">
				<label for="gh" class="col-md-2 control-label text-right nopad">工号：</label>
				<div class="col-md-5">
					<input type="text" class="form-control" v-model="personalBase.jobNum" placeholder="">
				</div>
			</div>
			<div class="form-group clearfix">
				<label for="erpzh" class="col-md-2 control-label text-right nopad">ERP账号：</label>
				<div class="col-md-5">
					<input type="text" class="form-control" v-model="personalBase.erpaaccount" placeholder="">
				</div>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">部门：</label>
				<div class="col-md-5">
					<department @departChange='departChange'></department>
				</div>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">职位：</label>
				<div class="col-md-5">
					<position @positionChange='positionChange'></position>
				</div>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">入职日期：</label>
				<dPicker v-model="personalBase.entryDate" v-on:change="dateAction('1')"></dPicker>
				<!-- <div class="col-md-5 input-group date form_date">
					<input type="date" class="form-control" v-model="personalBase.entryDate" value="">
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span> </div> -->
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">转正日期：</label>
				<dPicker v-model="personalBase.positiveDate" v-on:change="dateAction('2')"></dPicker>
				<!-- <div class="col-md-5 input-group date form_date">
					<input type="date" class="form-control" v-model="personalBase.positiveDate" value="">
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span> </div> -->
			</div>
			
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">状态：</label>
				<div class="col-md-5 input-group date form_date">
					<select class="form-control" v-model="personalBase.state" disabled="true">
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
	</div>
	
</template>

<script>
	import department from '../../../vuecommon/department.vue'
	import position from '../../../vuecommon/position.vue'
	import dPicker from 'vue2-datepicker'
	export default {
		components:{department,position,dPicker},
		data() {
			return {
				personalBase:{
					birth:this.moment('','YYYY-MM-DD HH:MM:SS.000'),
					entryDate:this.moment('','YYYY-MM-DD HH:MM:SS.000'),
					positiveDate:this.moment('','YYYY-MM-DD HH:MM:SS.000'),
					state:'1',
				},
				departmentList:[],
				positionList:[],
			};
		},
		methods:{
			//员工入职
			initDate:function(param){
				if(!this.isBlank(param)){
					this.personalBase=param
				}else{
					this.personalBase={
						birth:this.moment('','YYYY-MM-DD HH:MM:SS.000'),
						entryDate:this.moment('','YYYY-MM-DD HH:MM:SS.000'),
						positiveDate:this.moment('','YYYY-MM-DD HH:MM:SS.000'),
						state:'1',
					}
				}
				this.$children[1].setDpart('0')
				this.$children[2].setPosition('0')
			},
			
			//时间变化后格式化
			dateAction:function(type){
				if(type=='0'){
					this.personalBase.birth=this.moment(this.personalBase.birth,'YYYY-MM-DD HH:MM:SS.000')
				}else if(type=='1'){
					this.personalBase.entryDate=this.moment(this.personalBase.entryDate,'YYYY-MM-DD HH:MM:SS.000')
				}else if(type=='2'){
					this.personalBase.positiveDate=this.moment(this.personalBase.positiveDate,'YYYY-MM-DD HH:MM:SS.000')
				}
			},
			//获取部门名字和id
			departChange: function(departId, departName) {
				this.personalBase.departId = departId
				this.personalBase.departName = departName
			},
			positionChange:function (positionId,positionName){
				this.personalBase.positionId = positionId
				this.personalBase.positionName = positionName
			}
		}
	}
</script>

<style>

</style>
