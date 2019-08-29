<template>
	<!--修改员工弹出-->
	<div class="modal fade" id="REModalupdata" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog staff_t">
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeBtn()">×</button>
			
		</div>
		<div class="modal-body">
			<ul class="nav nav-tabs martop">
				<li class="active"><a href="#checkBasic" data-toggle="tab">基本信息</a></li>
				<li><a href="#checkDetailed" data-toggle="tab">详细信息</a></li>
				<li><a href="#checkFamily" data-toggle="tab">家庭成员</a></li>
				<li><a href="#checkRecord" data-toggle="tab">调动记录</a></li>
			</ul>
			<div class="tab-content" style=" height:600px; overflow-y:scroll;">
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
			<div class="col-md-12">
				
				<button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
			</div>
		</div>
	</div>
</div>
</div>

</template>

<script>
	import axios from 'axios'
	import baseInfo from '../checkEntryInfo/subCEI/checkEmpBase.vue'
	import detailInfo from '../checkEntryInfo/subCEI/checkEmpDetail.vue'
	import familyInfo from '../checkEntryInfo/subCEI/checkEmpFamily.vue'
	import shiftInfo from '../checkEntryInfo/subCEI/checkEmpShift.vue'
	export default {
		components: {
			baseInfo,
			detailInfo,
			familyInfo,
			shiftInfo,
		},
		
		data() {
			return {
				accountId:'',
			};
		},
		methods: {
			//传对应的参数给子模块
			paramDevliverToSubModel:function(param){
				this.$refs.baseInfo.childrenBaseInfo(param)
				this.$refs.detailInfo.childrenDetailInfo(param)
				this.$refs.familyInfo.getEmpFamilyInfo(param)
				this.$refs.shiftInfo.childrenShiftInfo(param)
			},
			closeBtn:function(){
				$("#REModalupdata").modal('hide')
			},
		}

	}
</script>

<style>

</style>
