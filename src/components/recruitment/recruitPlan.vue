<template>
	<div class="container user-container" id="recruitplan-app">
	    <div class="row">
	        <div class="col-md-12 col-lg-12 main-title">
	            <h2>招聘计划管理</h2>
	        </div>
	    </div>
	    <div class="row">
	        <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
	            <div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
	                <p>计划月份：</p>
	            </div>
	            <div class="col-md-10 col-lg-10">
					<span><input type="date" value="" id="firstTime" v-model="beginDate" /></span>
					<span>&nbsp;~&nbsp;</span>
					<span><input type="date" value="" id="secondTime" v-model="endDate" /></span>
	            </div>
	        </div>
			

	        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	            <div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
	                <p>部门：</p>
	            </div>
	            <div class="col-md-10 col-lg-10">
					<!-- <department :departId="departId" @departChange='departChange'></department> -->
	                <department></department>
	            </div>
	        </div>
	    </div>
			
		<div class="row">
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	            <div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
	                <p>职位：</p>
	            </div>
	            <div class="col-md-10 col-lg-10">
					<position :positionId="positionId" @positionChange='positionChange'></position>
	            </div>
	        </div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-5">
	        	<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" data-target="#myModalAdd">添加</button>
	            <button type="button" class="btn btn-warning pull-right m_r_10" @click="dowmelxe('招聘计划管理')">导出</button>
				<button type="button" class="btn btn-warning pull-right m_r_10" @click="queryRecruitPlan">查询</button>
	        </div>
		</div>
	

	    <div class="row">
	        <div class="col-md-12 col-lg-12">
	            <div class="table-responsive">
	                <table class="table table-bordered table-hover" id="recruittable">
	                    <thead>
	                        <tr>
	                            <th class="text-center">部门</th>
	                            <th class="text-center">职位</th>
	                            <th class="text-center">月份计划</th>
	                            <th class="text-center">缺编人数</th>
	                            <th class="text-center">计划招聘人数</th>
	                            <th class="text-center">编辑</th>
	                            <th class="text-center">删除</th>
	                        </tr>
	                    </thead>
	                    <tbody>
							<tr v-for="(item,index) in recruitPlanList" :key="index">           
	                            <td>{{item.departmentName}}</td>
								<td>{{item.positionName}}</td>
								<td class="text-center">{{item.planDate}}</td>
								<td class="text-center">{{item.lackNum}}</td>
								<td class="text-center">{{item.planNum}}</td>
	                            <td class="text-center warning"><span data-toggle="modal" data-target="#myModaledit" @click="getRecruitPlanInfo(item)">编辑</span></td>
	                            <td class="text-center info"><span data-toggle="modal" data-target="#myModaldelete" @click="getRecruitPlanInfo(item)">删除</span></td>
							</tr>
	                    </tbody>
	                </table>
	            </div>
	        </div>
	    </div>
	    <div class="row row_edit">
	        <!-- 编辑招聘计划 -->
	        <div class="modal fade" id="myModaledit" tabindex="-1" role="dialog" aria-labelledby="myModalLabelbj" aria-hidden="true">
	            <div class="modal-dialog">
	                <div class="modal-content">
	                    <div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
	                        <h4 id="myModalLabelbj" class="modal-title">招聘计划</h4>
	                    </div>
	                    <div class="modal-body">
	                        <div class="tab-content">
	                            <div class="tab-pane fade in active martop" id="basic">
	                                <form action="">
	                                    <div class="form-group clearfix">
	                                        <label class="col-md-2 control-label text-right nopad">部门：</label>
	                                        <div class="col-md-5">
	                                          <department :departId="departId" @departChange='getEditDepartId'></department>
	                                        </div>
	                                    </div>
	                                    <div class="form-group clearfix">
	                                        <label class="col-md-2 control-label text-right nopad">职位：</label>
	                                        <div class="col-md-5">
	                                            <position :positionId="positionId" @positionChange='getEditPositionId'></position>
	                                        </div>
	                                    </div>
	
	                                    <div class="form-group clearfix">
	                                        <label for="firstTime" class="col-md-2 control-label text-right nopad">计划月份：</label>
	                                        <div  class=" col-md-5 ">
	                                        	<div class="input-group">
	                                                <input type="date" class="form-control" v-model="upRecruitPlanDate">
	                                                <div class="input-group-addon">
	                                                    <span class="glyphicon glyphicon-calendar"></span>
	                                                </div>
	                                            </div>
	                                        </div>
	                                    </div>
	
	                                    <div class="form-group clearfix">
	                                        <label class="col-md-2 control-label text-right nopad">缺编人数：</label>
	                                        <div class="col-md-5">
	                                            <input type="number" class="form-control" value="0" min="0" max="999" v-model="upLackNum">
	                                        </div>
	                                    </div>
	                                    <div class="form-group clearfix">
	                                        <label class="col-md-2 control-label text-right nopad">计划招聘：</label>
	                                        <div class="col-md-5">
	                                        	<input type="number" class="form-control" value="0" min="0" max="999" v-model="upPlanNum">
	                                        </div>
	                                    </div>
	                                </form>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="modal-footer">
	                        <!--按钮-->
	                        <div class="col-md-12">
	                            <button type="button" class="btn btn-info" @click="editRecruitPlan">确认</button>
	                            <button type="button" data-dismiss="modal" class="btn btn-info" >返回</button>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <!-- 删除 -->
	        <div class="modal fade" id="myModaldelete">
	            <div class="modal-dialog modal-family">
	                <div class="modal-content">
	                    <div class="modal-header">
	                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	                        <h4 class="modal-title">提示</h4>
	                    </div>
	                    <div class="modal-body">
	                        <div>确定删除么？</div>
	                    </div>
	                    <div class="modal-footer">
	                    	<!--按钮-->
	                        <div class="col-md-12">
	                            <button type="button" class="btn btn-info" @click="deleteRecruitPlan">是</button>
	                            <button type="button" data-dismiss="modal" class="btn btn-info">否</button>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	
	
	        <!--添加招聘计划-->
	        <div class="modal fade" id="myModalAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
	            <div class="modal-dialog">
	                <div class="modal-content">
	                    <div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
	                        <h4 id="myModalLabeltj" class="modal-title">招聘计划</h4>
	                    </div>
	                    <div class="modal-body">
	                        <div class="tab-content">
	                            <div class="tab-pane fade in active martop" id="basic">
	                                <form action="">
	                                    <div class="form-group clearfix">
	                                        <label class="col-md-2 control-label text-right nopad">部门：</label>
	                                        <div class="col-md-5">
												<!-- <department :departId="departId" @departChange='getAddDepartId'></department> -->
												<department></department>
	                                        </div>
	                                    </div>
	                                    <div class="form-group clearfix">
	                                        <label class="col-md-2 control-label text-right nopad">职位：</label>
	                                        <div class="col-md-5">
	                                            <position :positionId="positionId" @positionChange='getAddPositionId'></position>
	                                        </div>
	                                    </div>
	
	                                    <div class="form-group clearfix">
	                                        <label for="firstTime" class="col-md-2 control-label text-right nopad">计划月份：</label>
	                                        <div  class=" col-md-5 ">
	                                        	<div class="input-group">
	                                                <input type="date" class="form-control" id="firstTime" v-model="newRecruitPlanDate">
	                                                <div class="input-group-addon">
	                                                    <span class="glyphicon glyphicon-calendar"></span>
	                                                </div>
	                                            </div>
	                                        </div>
	                                    </div>
	
	                                    <div class="form-group clearfix">
	                                        <label class="col-md-2 control-label text-right nopad">缺编人数：</label>
	                                        <div class="col-md-5">
	                                            <input type="number" class="form-control" value="0" min="0" max="999" v-model="newLackNum">
	                                        </div>
	                                    </div>
	                                    <div class="form-group clearfix">
	                                        <label class="col-md-2 control-label text-right nopad">计划招聘：</label>
	                                        <div class="col-md-5">
	                                        	<input type="number" class="form-control" value="0" min="0" max="999" v-model="newPlanNum">
	                                        </div>
	                                    </div>
	                                </form>
	                            </div>
	                        </div>
	                        <!--</div>-->
	                    </div>
	                    <div class="modal-footer">
	                        <!--按钮-->
	                        <div class="col-md-12">
	                            <button type="button" class="btn btn-info" @click="addRecruitPlan">确认</button>
	                            <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
		
	</div>
</template>

<script>
	import axios from 'axios'
	import department from '../vuecommon/department.vue'
	import position from '../vuecommon/position.vue'
	// import * as Types from '../../store/mutations-type'
	export default {
		components: {
			department,
			position
		},
		data() {
			return {
				// 部门列表
				departmentList: [],	//排序后添加级别前缀 
				departmentListSource: [],//没有进行排序的源数据 
				
				// 员工职位列表
				positionList: [], 
				
				//招聘计划
				recruitPlanList:[], 
				beginDate:this.getCurrentDay,
				endDate: this.getCurrentDay,
				recruitDepartmentId:'',
				recruitPositionId:'',
				
				newRecruitPlanDate:'',
				newRecruitDepartmentId:'',
				newRecruitPositionId:'',
				newLackNum:'',
				newPlanNum:'',
				
				upRecruitPlanDate:'',
				upRecruitDepartmentId:'',
				upRecruitPositionId:'',
				upLackNum:'',
				upPlanNum:'',
				upPlanId:'',
				
				
				
				departId:'',
				positionId:''

			}
		},
		
		methods: {
			//获取部门名字和id
			departChange(departId) {
				this.recruitDepartmentId = departId
				this.newRecruitDepartmentId = departId
			},
			getAddDepartId(departId){
				this.newRecruitDepartmentId = departId
			},
			getEditDepartId(departId){
				this.upRecruitDepartmentId = departId
			},
			
			// 职位
			positionChange(positionId){
				this.recruitPositionId = positionId
			},
			getEditPositionId(positionId){
				this.upRecruitPositionId = positionId
			},
			getAddPositionId(positionId){
				this.newRecruitPositionId = positionId
			},
			
			//数据导出表格
			dowmelxe: function (name) {
				var myDate = new Date();
				var year = myDate.getFullYear();
				var month = myDate.getMonth() + 1;
				var date = myDate.getDate();
				$("#recruittable").table2excel({
					exclude: ".noExl",
					name: "Excel Document Name",
					filename: name + year + month + date,
					exclude_img: true,
					exclude_links: true,
					exclude_inputs: true
				});
			},
			
			
			//查询招聘计划
			queryRecruitPlan() {
				this.recruitDepartmentId = this.$store.state.departId
				
				
				
				axios({
					method: 'post',
					url:this.url+'/zpglController/queryZpPlan',
					headers:{
						'Content-Type':this.contentType,
						'Access-Token':this.accessToken
					},
					data:{
						begDate:this.beginDate,
						endDate:this.endDate,
						department:this.recruitDepartmentId,
						position:this.recruitPositionId,
					},
					dataType:'json',
				}).then((response) => {
					console.log(response.data.retMsg)
					this.recruitPlanList = response.data.retData
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			
			
			//添加招聘计划
			addRecruitPlan(){
				this.newRecruitDepartmentId = this.$store.state.departId
				
				if (this.newRecruitPositionId=='') {
					alert('职位还没有选择');
					return false;
				}			
				
				axios({
					method: 'post',
					url:this.url+'/zpglController/addZpPlan',
					headers:{
						'Content-Type':this.contentType,
						'Access-Token':this.accessToken
					},
					data:{
						department:this.newRecruitDepartmentId,
						position:this.newRecruitPositionId,
						lackNum:this.newLackNum,
						planNum:this.newPlanNum,
						planDate:this.newRecruitPlanDate,
					},
					dataType:'json',
				}).then((response) => {
					console.log(response.data.retMsg)
					this.queryRecruitPlan()
				}).catch((error) => {
					console.log('请求失败处理')
				});
				
				this.newRecruitPlanDate=''
				this.newRecruitDepartmentId=''
				this.newRecruitPositionId=''
				this.newLackNum=''
				this.newPlanNum=''
				$('#myModalAdd').modal('hide');
			},
			
			//点击获取招聘计划详细信息
			getRecruitPlanInfo(item){
				this.upRecruitPlanDate=item.planDate,
				this.upRecruitDepartmentId=item.department,
				this.upRecruitPositionId=item.position,
				this.upLackNum=item.lackNum,
				this.upPlanNum=item.planNum,
				this.upPlanId=item.planId
			
			
			},
			//修改招聘计划
			editRecruitPlan(){
				if (this.upRecruitPositionId=='') {
					alert('职位还没有选择');
					return false;
				}			
				
				axios({
					method: 'post',
					url:this.url+'/zpglController/updateZpPlan',
					headers:{
						'Content-Type':this.contentType,
						'Access-Token':this.accessToken
					},
					data:{
						department:this.upRecruitDepartmentId,
						position:this.upRecruitPositionId,
						lackNum:this.upLackNum,
						planNum:this.upPlanNum,
						planDate:this.upRecruitPlanDate,
						planId:this.upPlanId,
					},
					dataType:'json',
				}).then((response) => {
					console.log(response.data.retMsg)
					this.queryRecruitPlan()
				}).catch((error) => {
					console.log('请求失败处理')
				});
				
				this.upRecruitPlanDate=''
				this.upRecruitDepartmentId=''
				this.upRecruitPositionId=''
				this.upLackNum=''
				this.upPlanNum=''
				this.upPlanId=''
				$('#myModaledit').modal('hide');
			},
			//删除招聘信息
			deleteRecruitPlan(){
				console.log(this.upPlanId)
				
				axios({
					method: 'post',
					url:this.url+'/zpglController/deleteZpPlan',
					headers:{
						'Content-Type':this.contentType,
						'Access-Token':this.accessToken
					},
					data:{
						id:this.upPlanId,
					},
					dataType:'json',
				}).then((response) => {
					console.log(response.data.retMsg)
					this.queryRecruitPlan()
				}).catch((error) => {
					console.log('请求失败处理')
				});
				
				this.upPlanId=''
				$('#myModaldelete').modal('hide');
			},
			
			
		},
		
		
	}	
	
	
	
	
</script>

<style>
.clear-mp{margin: 0;padding: 0;}
@-moz-document url-prefix(){fieldset{display: table-cell;}}
.user-container{background-color: #fff;width: 100%;padding: 0 20px;}
.user-btn-group{text-align: right;padding: 15px 15px;}
.user-btn-group>button{margin: 0 2px;}
.main-title h2{line-height: 50px;}
.bootstrap-select{width: 200px !important;}
.martop{margin-top:10px;}
.martop1{margin-top:50px;}
.nopad{padding-left:0;padding-right:0;line-height:34px;}
.linhet{line-height:34px;}
.dateicon{position:absolute;right:20px;top:0;width:30px;height:30px;}
.col12{width:100%;}
.addbord{border:1px solid #ddd;padding-bottom:20px;}
.ygtc{position:fixed;top:0px;left:300px;background-color:#fff;width:760px;height:871px;overflow:scroll;}
.staff_close,.fam_close{/*position:absolute;right:20px;top:10px;z-index:99;*/float:right;}
.fam_con{width:1140px;height:628px;position:fixed;top:100px;background-color:#fff;display:none;}
.form_date.input-group[class*=col-]{float:left;padding-left:15px;padding-right:15px;}
.m_r_10{margin-right:10px;}
input[type="date"]{line-height: 26px!important;}

</style>
