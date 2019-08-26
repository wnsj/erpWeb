<template>
	<div class="container user-container" id="employee-app">
		<div class="row">
			<div class="col-md-12 col-lg-12 main-title">
				<h2>倒休管理</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>申请日期：</p>
				</div>
				<div class="col-md-10 col-lg-10">
					<dPicker v-model="beginDate" v-on:change="dateAction('begin')"></dPicker>
					<span>&nbsp;&nbsp;&nbsp;至：</span>
					<dPicker v-model="endDate" v-on:change="dateAction('end')"></dPicker>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>部门：</p>
				</div>
				<div class="col-md-10 col-lg-10">
					<depart @departChange="departChange"></depart>
				</div>
			</div>
			<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
				<div class="col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>姓名：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<span>
						<input type="text" value="" class="form-control" v-model="name" />
					</span>
				</div>
			</div>
			<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
				<div class="col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>状态：</p>
				</div>
				<div class="col-md-8 col-lg-8">
					<select class="form-control" v-model="handleState">
						<option value="0">全部</option>
						<option value="1">待处理</option>
						<option value="2">处理中</option>
						<option value="3">已通过</option>
						<option value="4">未通过</option>
					</select>
				</div>
			</div>


		</div>
		<div class="row add-mt">
			<div style="padding: 0; width:3.3%; display:inline-block; float:left; margin-left:15px; line-height: 34px; font-size:0;">
				<p>项目：</p>
			</div>

			<button type="button" class="btn btn-primary pull-right" @click="dowmelxe('请假表')">导出</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" v-on:click="showRestInfo('','3')">申请</button>

			<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" v-on:click="restDownList()">查询</button>

		</div>
		<div class="row">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive">
					<table class="table table-bordered table-hover user-table offover" id="datatable">
						<thead>
							<tr>
								<th class="text-center">申请人</th>
								<th class="text-center">申请部门</th>
								<th class="text-center">原因</th>
								<th class="text-center">申请时间</th>
								<th class="text-center">休假开始时间</th>
								<th class="text-center">休假结束时间</th>
								<th class="text-center">加班日期</th>
								<th class="text-center">加班累积</th>
								<th class="text-center">说明</th>
								<th class="text-center">审查人</th>
								<th class="text-center">审查结果</th>
								<th class="text-center">审核人</th>
								<th class="text-center">审核结果</th>
								<th class="text-center">批准人</th>
								<th class="text-center">批准结果</th>
								<th class="text-center">报备人</th>
								<th class="text-center">报备结果</th>
								<th class="text-center">查看</th>
								<th class="text-center">修改</th>
								<th class="text-center">处理</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in rdLsit" :key='index'>
								<td class="text-center">{{item.leaveAccountName}}</td>
								<td class="text-center">{{item.departName}}</td>
								<td class="text-center">{{item.reason}}</td>
								<td class="text-center">{{item.addTime}}</td>
								<td class="text-center">{{item.startTime}}</td>
								<td class="text-center">{{item.endTime}}</td>
								<td class="text-center">{{item.workTime}}</td>
								<td class="text-center">{{item.workTotal}}</td>
								<td class="text-center">{{item.leaveRemark}}</td>
								<td class="text-center">{{item.accountName1}}</td>
								<td class="text-center">{{item.result1}}</td>
								<td class="text-center">{{item.accountName2}}</td>
								<td class="text-center">{{item.result2}}</td>
								<td class="text-center">{{item.accountName3}}</td>
								<td class="text-center">{{item.result3}}</td>
								<td class="text-center">{{item.accountName4}}</td>
								<td class="text-center">{{item.result4}}</td>
								<td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal"
									 data-target="#myModalJoin_check" v-on:click="showRestInfo(item,'4')">查看</button></td>
								<td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal"
									 data-target="#myModalJoin_revise" v-on:click="showRestInfo(item,'5')">修改</button></td>
								<td class="text-center"><button type="button" class="btn btn-warning pull-right m_r_10" 
								v-on:click="showRestInfo(item,'6')">处理</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
			<rdInfo @restDownApply='rdInfoBack'></rdInfo>
			<rdCheck></rdCheck>
			<rdModify @restDownApply='rdInfoBack'></rdModify>
			<rdHandle @submitROHModify='rdInfoBack'></rdHandle>
			
	</div>
</template>

<script>
	import axios from 'axios'
	import rdInfo from '../paperlessOffice/subRD/RdInfoOfApply.vue'
	import rdCheck from '../paperlessOffice/subRD/RdInfoOfCheck.vue'
	import rdHandle from '../paperlessOffice/subRD/RdInfoOfHandle.vue'
	import rdModify from '../paperlessOffice/subRD/RdInfoOfModify.vue'

	import depart from '../vuecommon/department.vue'
	import dPicker from 'vue2-datepicker'
	export default {
		components:{
			dPicker,
			depart,
			rdInfo,
			rdCheck,
			rdModify,
			rdHandle,
		},
		data() {
			return {
				name:'',
				handleState:'0',
				beginDate:this.getCurrentDay,
				endDate:this.getCurrentDay,
				departId:'0',
				departName:'',
				accountId:this.accountInfo().account_ID,
				
				rdLsit:[],
			};
		},
		methods:{
			showRestInfo:function(rdInfo,param){
					
					if(param=='3'){
						$("#rdApplyModal").modal('show')
					}else if(param=='4'){
						$("#rdCheckModal").modal('show')
					}else if(param=='5'){
						console.log(rdInfo.leaveAccount+' == '+this.accountInfo().account_ID)
						if(rdInfo.leaveAccount == this.accountInfo().account_ID){
							$("#rdModifyModal").modal('show')
						}else{
							alert(this.notHaveRule)
						}
					}
					else if(param=='6'){
						if(!this.isBlank(rdInfo.result4)||rdInfo.result4==''){
							alert('处理完成，无法在进行处理')
							return
						}
						if(this.accountId==rdInfo.account1 
						|| this.accountId==rdInfo.account2
						|| this.accountId==rdInfo.account3
						|| this.accountId==rdInfo.account4){
							$("#rdHandleModal").modal('show')
						}else{
							alert(this.notHaveRule)
						}
					}
					this.$children[param].initInfo(rdInfo,param)
					
				},
			
			//申请及其他返回
			rdInfoBack:function(param){
				if(param=='apply'){
					$("#rdApplyModal").modal('hide')
				}else if(param=='modify'){
					$("#rdModifyModal").modal('hide')
				}else if(param=='handle'){
					$("#rdHandleModal").modal('hide')
				}
				this.restDownList()
			},
			departChange:function(departId,departName){
				this.departId=departId
				this.departName=departName
			},
			//更新时间
			dateAction: function(param) {
				if (param == 'begin') {
					this.beginDate = this.moment(this.beginDate, 'YYYY-MM-DD 00:00:00.000')
				} else if (param == 'end') {
					this.endDate = this.moment(this.endDate, 'YYYY-MM-DD 23:59:59.000')
				}
			},
			//查看倒休列表
			restDownList: function() {
				
				
				var dpId,hState,aId
				//权限判断 account=='' 没有值查询所有，有值查询当前用户
				if(this.has(51)){
					aId=''
				}else{
					aId=this.accountId
				}
				if(this.handleState=='全部'){
					hState=''
				}else{
					hState=this.handleState
				}
				
				var url = this.url + '/wzbg/restDownList'
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						name: this.name,
						beginDate: this.getYYYYMMDDHHMMSS_00(this.beginDate),
						endDate: this.getYYYYMMDDHHMMSS_24(this.endDate),
						departId: this.departId,
						handleState: hState,
						accountId:aId,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.resData.length > 0) {
							this.rdLsit = res.resData
							$("#myModalQuery").modal('hide');
						} else {
							alert('没有查询到更多相关数据')
						}
					} else {
						alert(res.retMsg)
					}
			
				}).catch((error) => {
					console.log('倒休数据处理失败')
				});
			},
		},
		create(){
			this.restDownList()
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
@import '../../assets/css/paperlessOffice/changeoffday.css';
</style>
