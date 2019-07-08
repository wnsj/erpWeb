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
					<leave></leave>
				</div>
			</div>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>代理人：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control" >
						<option value="0">崔艳红</option>
						<option value="1">冯恺</option>
					</select>
				</div>
	
	
			</div>
	
			<div class="col-md-1">
	
				<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" data-target="#myModalJoin_add">+</button>
	
			</div>
	
			<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>请假时间：</p>
				</div>
				<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
					<span class="leavespan">
						<input type="date" value="" class="form-control" v-model="beginDate" />
					</span> <span class="leavespan01">&nbsp;&nbsp;&nbsp;至：</span>
					<span class="leavespan">
						<input type="date" value="" class="form-control" v-model="endDate" />
					</span>
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" style="padding: 0; line-height: 34px;">
					<p>说明：</p>
				</div>
				<div class="col-xs-11 col-sm-11 col-md-11 col-lg-11">
					<textarea class="explain_leave"></textarea>
				</div>
	
				<div class="col-md-5">
					<br />
					<button type="button" class="btn btn-warning pull-right m_r_10">取消</button>
					<button type="button" class="btn btn-warning pull-right m_r_10">确定</button>
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
					<select class="form-control">
						<option value="0">王斌</option>
					</select>
				</div>
				<div class="col-xs-1 col-sm-1 col-md-1">
	
					<button type="button" class="btn btn-warning pull-left m_r_10">+</button>
	
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
	
				<button type="button" class="btn btn-info">同意</button>
				<button type="button" class="btn btn-info">不同意</button>
			</div>
		</div>
	
		<div class="modal-header modal_header_leave">
			<h6>审核</h6>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class=" col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
					<p>审核人：</p>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<select class="form-control">
						<option value="0">王艳杰</option>
						<option value="1">宋子龙</option>
					</select>
				</div>
				<div class="col-md-1">
	
					<button type="button" class="btn btn-warning pull-left m_r_10">+</button>
	
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
	
				<button type="button" class="btn btn-info">同意</button>
				<button type="button" class="btn btn-info">不同意</button>
			</div>
		</div>
	
		<div class="modal-header modal_header_leave">
			<h6>批准</h6>
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
					<p>批准人：</p>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<select class="form-control">
						<option value="0">王艳杰</option>
						<option value="1">宋子龙</option>
					</select>
				</div>
				<div class="col-md-1">
	
					<button type="button" class="btn btn-warning pull-left m_r_10">+</button>
	
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
	
				<button type="button" class="btn btn-info">同意</button>
				<button type="button" class="btn btn-info">不同意</button>
			</div>
		</div>
	
	
		<div class="modal-header modal_header_leave">
			<h6>报备</h6>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>报备人：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<select class="form-control">
						<option value="0">李珊珊</option>
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
			<div class="col-md-4">
	
				<button type="button" class="btn btn-info">同意</button>
				<button type="button" class="btn btn-info">不同意</button>
			</div>
		</div>
	
	
	
		<div class="modal-footer">
			<!--按钮-->
			<div class="col-md-12">
	
				<button type="button" class="btn btn-info" v-on:click="submitEmployeeInfo()">确认</button>
				<button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
			</div>
	
			<div class="beihzu">
	
				<i>按钮用来扩大选择其他人员</i>
				<div class="col-md-1">
	
					<button type="button" class="btn btn-warning pull-left m_r_10">+</button>
	
				</div>
			</div>
		</div>
	
	</div>
</template>

<script>
	import depart from '../../vuecommon/department.vue'
	import leave from '../../vuecommon/leaveTypes.vue'
	export default {
		components:{
			depart,
			leave
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
				alert(param)
				this.lInfo=lInfo
				this.isModify=param
			}
		}
	}
</script>

<style>

</style>
