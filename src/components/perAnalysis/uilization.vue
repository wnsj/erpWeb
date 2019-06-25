<template>

	<div id="page-inner">
				<div class="row">
					<div class="col-md-12 col-lg-12 main-title">
						<h2> 人力资源利用率分析表</h2>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<!-- Advanced Tables -->
						<div class="panel panel-default">
							<div class="panel-heading">
								人力资源利用率分析表
							</div>
							<div>

							</div>
							<ul class="panel-condition">
								<li>
									<span class="countdate">部门：</span>
									<department ref='department' @departChange='departChange'></department>
								</li>
								
								<li>
									<span class="countdate">统计日期：</span>
									<input type="date" class="form-control" v-model="begDate">
								</li>
								<li>
									<span class="countdate">包括当月入职：</span>
									<select class="btn btn-default dropdown-toggle" title="" v-model="isEntry">
										<option value="1">否</option>
										<option value="0">是</option>
									</select>
								</li>
								<li>
									<span class="countdate">包括当月离职：</span>
									<select class="btn btn-default dropdown-toggle" title="" v-model="isQuit">
										<option value="1">否</option>
										<option value="0">是</option>
									</select>
								</li>

								<button class="btn btn-default" @click="queryUlilization">查询</button>
								<button class="btn btn-default">导出</button>
							</ul>

							<div class="panel-body">
								<div class="table-responsive">
									<div class="col-md-12">
										<table id="table_zz_01" class="table table-bordered context-menu-one">
											
											<tbody>
												<tr>
													<td rowspan="2" >部门</td>
													<td rowspan="2" >总人数</td>
													<td colspan="3" >总出勤天数</td>
													<td rowspan="2" >本月天数</td>
													<td rowspan="2" >月平均出勤人数</td>
													<td rowspan="2" >排班休假天数</td>
													<td rowspan="2" >合理缺勤人数</td>
													<td rowspan="2" >超出缺勤人数</td>
													<td rowspan="2" >未利用人力咨询</td>
													<td rowspan="2" >人力咨询利用率</td>
												</tr>
												<tr>
													<td>小计</td>
													<td>系统打卡天数</td>
													<td>未打开增加天数</td>
												</tr>
												<tr v-for="(item,index) in ziYuan" :key="index">
													<td>{{item.name}}</td>
													<td>{{item.total}}</td>
													<td>{{item.dismiss}}</td>
													<td>{{item.diaoRu}}</td>
													<td>{{item.jinSheng}}</td>
													<td>{{item.diaoChu}}</td>
													<td>{{item.avgCount}}</td>
													<td>{{item.change}}</td> 
													<td>{{item.sumCount}}</td>
													<td>{{item.quitMix}}</td>
													<td>{{item.count}}</td>
													<td>{{item.changeMix}}</td>
												</tr>
											</tbody>
										</table>
									</div>
									<p class="text-right"><small>系统打卡天数=全天只有一次打开，即算作出勤 总出勤天数=系统打开天数+未打开增加天数 月平均出勤人数=总出勤天数÷本月天数 合理缺勤天数=排班休息总天数 合理缺勤人数=合理缺勤÷本月天数 超出缺勤人数=总人数-约平均出勤人数 未利用人力资源=超出缺勤人数-合理缺勤人数 人力咨询利用率=（总人数-未利用人力咨询）÷总人数×100%</small></p>
									<p class="text-right"><small>注：【未打开增加天数】=上下班均未打开增加天数，如果已有一次打卡，则不需要增加！有权限的人员，可以修改，离开后自动计算并保持</small></p>

								</div>
								<p class="text-right"><small>鼠标右键可全选、复制</small></p>
							</div>
						</div>
						<!--End Advanced Tables -->
					</div>
				</div>
				<!-- /. ROW  -->

			</div>

</template>


<script>
	import axios from 'axios'
	import department from '../vuecommon/department.vue'
	import project from '../vuecommon/project.vue'
	import advance from '../employee/subEmp/advance.vue'
	import family from '../employee/subEmp/family.vue'
	import empEntry from '../employee/subEmp/empEntry.vue'
	import mEE from '../employee/subEmp/modifyEmpEntry.vue'
	
	import {timeInit} from '../../assets/js/date.js'
	/**
	 * 这个导入路径没有提示。按照自己的路径写，按提示可能不能实现，具体原因不详
	 */
	export default {
		name: 'uilization',
		components: {
			department,
			project,
			advance,
			family,
			empEntry,
			mEE,
			

		},
		// props:['faasdfsdfsadfasdf'],
		data() {
			return {
				// 部门列表
				departmentList: [],	//排序后添加级别前缀 
				departmentListSource: [],//没有进行排序的源数据 

				employeeList: [], //从服务器请求的个人信息
			
				personalInfo: {}, //首页列表获取的一个人的基础信息
				personalBase: {}, //服务器获取的一个人的基础信息
				copyPersonalBase: {},
				personalDetail: {}, //服务器获取的一个人的详细信息
				personalFamily: [], //服务器获取的一个人的家庭信息
				personalShift: [], //服务器获取的一个人的调动信息

				begDate:this.getCurrentDay,
				isEntry:0,
				isQuit:0,
				newRecruitDepartmentId:'',

				ziYuan:[],
			}
		},
		mounted(){
			const s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = '../../static/js/copyexcel.js';
			document.body.appendChild(s);
		},
		methods: {
			requireAllInfo:function(){
// 				alert(this.$store.state.count)
// 				console.log(this.$store.state.count)
				alert(this.getMonthFirstDay)
			},
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

			queryUlilization(){
				
				axios({
					method: 'post',
					url:this.url+'/ryxxlController/queryRlzylyReport',
					headers:{
						'Content-Type':this.contentType,
						'Access-Token':this.accessToken
					},
					data:{
						begDate:this.begDate,//查询时间（必填）
						isEntry:this.isEntry,//包括当月入职（必填）【0包括，1不包括】 
						isQuit:this.isQuit,//包括当月离职（必填）【0包括，1不包括】 
						deptId:this.newRecruitDepartmentId,//部门id
						
					},
					dataType:'json',
				}).then((response) => {
					console.log(response.data.retMsg)
					this.ziYuan = response.data.retData.ziYuan

				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			
		},
		created() {
			this.queryUlilization()
		}
	}
</script>


<style>
	@import '../../assets/css/poresonnel.css';
</style>
