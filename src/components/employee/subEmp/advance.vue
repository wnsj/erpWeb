<template>
	<!-- 高级管理 -->
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			<h4 class="modal-title" id="myModalLabel">高级查询</h4>
		</div>
		<div class="modal-body">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<div class="col-md-1 col-lg-1 clear-mp" style="line-height: 34px;">
						<label>类别：</label>
					</div>
					<div class="col-md-4 col-lg-4 clear-mp" style="width:205px;">
						<select class="form-control" v-model="category">
							<option value="0">全部</option>
							<option value="1">入职日期</option>
							<option value="2">转正日期</option>
							<option value="3">离职日期</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row add-mt">
				<div class="form-inline col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<div class="form-group">
						<label for="firstTime" class="control-label">时间：</label>
						<div class="input-group">
							<input type="date" class="form-control" id="firstTime" v-model="begin">
							<div class="input-group-addon"> <span class="glyphicon glyphicon-calendar"></span> </div>
						</div>
					</div>
				</div>
				<div class="form-inline col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<div class="form-group">
						<label for="secondTime" class="control-label">至：</label>
						<div class="input-group">
							<input type="date" class="form-control" id="secondTime" v-model="end">
							<div class="input-group-addon"> <span class="glyphicon glyphicon-calendar"></span> </div>
						</div>
					</div>
				</div>
			</div>
			<div class="row add-mt">
				<div class="form-inline col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<div class="form-group">
						<label for="firstTime" class="control-label">离职类型：</label>
						<div class="input-group" style="width:176px;">
							<select class="form-control" v-model="advanceResignType">
								<option value="辞职">辞职</option>
								<option value="辞退">辞退</option>
								<option value="其他">其他</option>
							</select>
						</div>
					</div>
				</div>
				<div class="form-inline col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<div class="form-group">
						<label for="secondTime" class="control-label">离职原因：</label>
						<div class="input-group" style="width:160px;">
							<leaveReason @leaveChange='leaveChange'></leaveReason>
						</div>
					</div>
				</div>
			</div>
			<div class="row add-mt"> 
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
					<div class="col-md-3 col-lg-3 clear-mp" style="line-height: 34px;">
						<label>查看生日在：</label>
					</div>
					<div class="col-md-7 col-lg-7 clear-mp">
						<select class="form-control" v-on:change="submitAdvacedParam('0')" v-model="birthday">
							<option value="0">全部</option>
							<option v-for="n in 12" v-bind:value="n">{{n}}月</option>
						</select>
					</div>
					<div class="col-md-2 col-lg-2 clear-mp" style="line-height: 34px; text-align: right">
						<label>月份员工</label>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" v-on:click="submitAdvacedParam('1')">查询</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import leaveReason from '../../vuecommon/leaveReason.vue'
	export default {
		components:{
			leaveReason
		},
		data() {
			return {
				category:'0', 
				begin:'',
				end:'',
				advanceResignType:'',
				advanceReasonId:'',
				birthday:'0',
				lrList:[],
				
				//高级查询
				advanceParam:{},
			};
		},
		methods:{
			leaveChange:function(reasonId,reasonName){
				this.advanceReasonId=reasonId
			},
			// 高级查询
			submitAdvacedParam:function(param){
				this.advanceParam.category = this.category
				this.advanceParam.begin = this.begin
				this.advanceParam.end = this.end
				this.advanceParam.advanceResignType = this.advanceResignType
				this.advanceParam.advanceReasonId = this.advanceReasonId
				this.advanceParam.birthday = this.birthday
				this.advanceParam.selectType=param
				this.$emit('submitAdvacedParam',this.advanceParam)
			}
		}
	}
</script>

<style>
/* @import '../../../assets/css/employee.css'; */
</style>
