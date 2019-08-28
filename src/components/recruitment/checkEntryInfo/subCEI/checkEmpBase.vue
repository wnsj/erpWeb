<template>
	<div class="tab-pane fade in active martop" id="checkBasic">
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
				<dPicker v-model="personalBase.birth"></dPicker>
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
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">入职日期：</label>
				<dPicker v-model="personalBase.entryDate"></dPicker>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">转正日期：</label>
				<dPicker v-model="personalBase.positiveDate"></dPicker>
				<template>
					<div class="col-md-3 text-primary linhet" v-if="personalBase.positiveDate == ''">非转正员工</div>
				</template>
			</div>
			<div class="form-group clearfix">
				<label class="col-md-2 control-label text-right nopad">离职日期：</label>
				<dPicker v-model="personalBase.resignDate"></dPicker>
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
	</div>
</template>

<script>
	
	import axios from 'axios'
	import department from '../../../vuecommon/department.vue'
	import position from '../../../vuecommon/position.vue'
	import lReason from '../../../vuecommon/leaveReason.vue'
	import dPicker from 'vue2-datepicker'
	export default {
		components:{department,position,lReason,dPicker},
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
				console.log('BaseInfo:'+param)
				this.getEmpBase(param)
			},
		
			getEmpBase:function (param) {
				var uDetailUrl = this.url + '/search/allList'
				//个人详细信息
				axios({
					method: 'post',
					url: uDetailUrl,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						recruitDataID: param,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.personalBase=res.resData[0]
						console.log('personalBase:'+this.personalBase.name)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			}
			
		},
		
	}
</script>

<style>

</style>
