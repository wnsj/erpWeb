<template>
	<!--家庭成员添加弹窗-->
	<div class="modal-dialog staff_t" id="familyAdd">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeBtn()">×</button>
			<!-- <h4 id="myModalLabel" class="modal-title">添加家庭成员</h4> -->
		</div>
		<div class="col-md-12 clearfix nopad addbord martop">
			<div class="col-md-8 col-md-offset-2 pt2">
				<div class="form-group clearfix">
					<label class="col-md-3 control-label text-right nopad">称谓：</label>
					<div class="col-md-6">
						<input type="text" class="form-control" v-model="familyInfo.appellation">
					</div>
				</div>
				<div class="form-group clearfix">
					<label class="col-md-3 control-label text-right nopad">姓名：</label>
					<div class="col-md-6">
						<input type="text" class="form-control" v-model="familyInfo.chname">
					</div>
				</div>
				<div class="form-group clearfix">
					<label class="col-md-3 control-label text-right nopad">出生日期：</label>
					<dP v-model="familyInfo.birth" v-on:change="dateAction()"></dP>
				</div>
				<div class="form-group clearfix">
					<label class="col-md-3 control-label text-right nopad">工作单位：</label>
					<div class="col-md-9">
						<input type="text" class="form-control" v-model="familyInfo.workadress">
					</div>
				</div>
				<div class="form-group clearfix">
					<label class="col-md-3 control-label text-right nopad">职务：</label>
					<div class="col-md-6">
						<input type="text" class="form-control" v-model="familyInfo.position">
					</div>
				</div>
				<div class="form-group clearfix">
					<label class="col-md-3 control-label text-right nopad">联系电话：</label>
					<div class="col-md-6">
						<input type="text" class="form-control" v-model="familyInfo.phone">
					</div>
				</div>
				<div class="form-group clearfix">
					<label class="col-md-3 control-label text-right nopad">微信：</label>
					<div class="col-md-6">
						<input type="text" class="form-control" v-model="familyInfo.wechat">
					</div>
				</div>
				<div class="form-group clearfix">
					<label class="col-md-3 control-label text-right nopad">家庭住址：</label>
					<div class="col-md-9">
						<input type="text" class="form-control" v-model="familyInfo.famAddress">
					</div>
				</div>
				<!--确认添加按钮-->
				<div class="col-md-2 col-md-offset-8">
					<button type="button" class="btn btn-warning" id="submitFamilyInfo" v-on:click="submitFamilyInfo">确认</button>
				</div>
				<div class="col-md-2">
					<button type="button" class="btn btn-warning" v-on:click="closeBtn()">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	import dP from 'vue2-datepicker'
	export default {
		components:{dP,},
		data() {
			return {
				familyInfo:{},
			};
		},
		methods:{
			//初始化传值
			childrenFEmpInfo:function(param){
				this.familyInfo=param
			},
			//修改时间
			dateAction:function(){
				this.familyInfo.birth=this.moment(this.familyInfo.birth,'YYYY-MM-DD HH:MM:SS.000')
			},
			
			//提交数据
			submitFamilyInfo:function(){
				if(this.isBlank(this.familyInfo.appellation)){
					alert('称谓不能为空')
					return
				}
				if(this.isBlank(this.familyInfo.chname)){
					alert('名字不能为空')
					return
				}
				this.$emit('submitFamilyInfo',this.familyInfo)
			},
			closeBtn:function (){
				$("#familyAdd").modal('hide')
			}
		}
	}
</script>

<style>

</style>
