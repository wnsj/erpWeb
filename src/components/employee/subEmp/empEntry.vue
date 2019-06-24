<template>
	<!--员工入职弹出-->

	<div class="modal-content">
		<div class="modal-header">
			<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
			<h4 id="myModalLabel" class="modal-title">员工入职</h4>
		</div>
		<div class="modal-body  pos_r">
			<ul class="nav nav-tabs martop" id="inforElement">
				<li class="active"><a href="#basic" data-toggle="tab">基本信息</a></li>
				<li><a href="#detailed" data-toggle="tab">详细信息</a></li>
				<li><a href="#family" data-toggle="tab">家庭成员</a></li>
				<li><a href="#record" data-toggle="tab">调动记录</a></li>
			</ul>
			<div class="tab-content" style=" height:400px; overflow-y:scroll;">
				<!-- 人员基本信息 -->
				<baseInfo ref='baseInfo'></baseInfo>
				<!-- 人员详细信息 -->
				<detailInfo ref='detailInfo'></detailInfo>
				<!--家庭成员-->
				<familyInfo ref='familyInfo'></familyInfo>
				<!--调动记录-->
				<shiftInfo ref='shiftInfo'></shiftInfo> 
			</div>
		
		</div>
		<div class="modal-footer">
			<!--按钮 -->
			<div class="col-md-12">
				<div class="col-md-8" style="display: none">
					<button type="button" class="btn btn-info btn-sm int_pwd">初始化密码</button>
					<button type="button" class="btn btn-info btn-sm reg_work">转正</button>
					<button type="button" class="btn btn-info btn-sm recovery">离职</button>
					<button type="button" class="btn btn-info btn-sm detl">删除</button>
				</div>
				<button type="button" class="btn btn-info" v-on:click="updataEmployeeInfo()">确认</button>
				<button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
			</div>
		</div>
	</div>


</template>

<script>
	import axios from 'axios'
	import baseInfo from '../subEmp/subEmpEntry/empBase.vue'
	import detailInfo from '../subEmp/subEmpEntry/empDetail.vue'
	import familyInfo from '../subEmp/subEmpEntry/empFamily.vue'
	import shiftInfo from '../subEmp/subEmpEntry/empShift.vue'
	export default {
		components:{
			baseInfo,
			detailInfo,
			familyInfo,
			shiftInfo,
		},
		data() {
			return {
				personalBase:{},
				personalDetail:{},
				personalFamily:[],
			};
		},
		methods:{
			updataEmployeeInfo: function() {
				
				// 修改基本信息
				this.personalBase = this.$refs.baseInfo.personalBase
				this.personalBase.isDelete = '0'
				this.personalDetail = this.$refs.detailInfo.personalDetail
				this.personalFamily = this.$refs.familyInfo.personalFamily
	
				alert(this.personalFamily.length)
				var url = this.url + '/search/insertUserInfo'
			
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						//基本信息
						userBase: this.personalBase,
						//详细信息
						userDetail:this.personalDetail,
						
						//家庭信息
						userFamily: this.personalFamily,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log('updataEmployeeInfo')
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.resData.message)
						this.$emit('updataEmployeeInfo')
					} else {
						alert(res.retMsg)
					}
			
				}).catch((error) => {
					console.log('请求失败处理')
				});
			}
		}
		
	}
</script>

<style>

</style>
