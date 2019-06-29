<template>

	<div>
		<div class="row">
			<div class="col-md-10 col-lg-10 main-title">
				<h2>人员管理</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>项目：</p>
				</div>
				<div class="col-md-10 col-lg-10">
					<project ref='project' @projectChange='projectChange'></project>
				</div>
			</div>

			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>状态：</p>
				</div>
				<div class="col-md-10 col-lg-10">
					<select class="form-control" v-model="state" v-on:change="getEmployee('state')">
						<option value="0">全部</option>
						<option value="1">在职</option>
						<option value="2">离职</option>
					</select>
				</div>
			</div>

			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>部门：</p>
				</div>
				<div class="col-md-10 col-lg-10">
					<department ref='department' @departChange='departChange'></department>
				</div>
			</div>

			<button type="button" class="btn btn-info" v-on:click="getEmployee('all')">显示所有</button>
		</div>
		<div class="row add-mt">
			<div style="padding: 0; width:3.3%; display:inline-block; float:left; margin-left:15px; line-height: 34px; font-size:0;">
				<p>项目：</p>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding-left:1.5%;">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="Search for..." v-model.lazy="searchContent">
					<span class="input-group-btn">
						<button class="btn btn-default" type="button" v-on:click="getEmployee('search')">搜索</button>
					</span>
				</div>
			</div>
			<div style="padding-right:1.5%;">
				<button type="button" class="btn btn-primary pull-right m_r_10" @click="exportTableToExcel('datatable','人员管理表')">导出</button>
				<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" data-target="#myModalJoin">员工入职</button>
				<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" data-target="#myModalFamily">家庭成员</button>
				<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" data-target="#myModalQuery">高级查询</button>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive">
					<table class="table table-bordered table-hover user-table" id="datatable">
						<thead>
							<tr>
								<th class="text-center">序号</th>
								<th class="text-center">工号</th>
								<th class="text-center">姓名</th>
								<th class="text-center">性别</th>
								<th class="text-center">部门</th>
								<th class="text-center">职位</th>
								<th class="text-center">ERP账号</th>
								<th class="text-center">出生日期</th>
								<th class="text-center">入职日期</th>
								<th class="text-center">转正日期</th>
								<th class="text-center">离职日期</th>
								<th class="text-center">状态</th>
								<th class="text-center">离职类型</th>
								<th class="text-center">离职原因</th>
							</tr>
						</thead>
						<tbody>
							<!-- <tr v-for="(item,index) in searchEmployee(searchContent)" :key="index" v-if="(state == 0     	&& departName == 0                && projectName=='0') 
							|| (state == 0     		&& item.departName == departName  && projectName=='0') 
						   || (state == 0     		&& departName == 0                && item.projectName == projectName) 
						   || (state == 0     		&& item.departName == departName  && item.projectName == projectName)
						   || (item.state == state 	&& departName == 0                && projectName == '0') 
						   || (item.state == state 	&& item.departName == departName  && projectName =='0') 
						   || (item.state == state 	&& departName == 0                && item.projectName  == projectName) 
						   || (item.state == state 	&& item.departName == departName  && item.projectName == projectName)"
							 v-on:dblclick="showEmployeeInfo(item)"> -->
							<tr v-for="(item,index) in employeeList" :key="index" v-on:dblclick="showEmployeeInfo(item)">
								<td>{{index}}</td>
								<td>{{item.jobNum}}</td>
								<td>{{item.name}}</td>
								<td>{{item.sex}}</td>
								<td>{{item.departName}}</td>
								<td>{{item.positionName}}</td>
								<td>{{item.erpaaccount}}</td>
								<td>{{item.birth}}</td>
								<td>{{item.entryDate}}</td>
								<td>{{item.positiveDate}}</td>
								<td>{{item.resignDate}}</td>
								<template>
									<td v-if="item.state == 1">在职</td>
									<td v-if="item.state == 2">停职</td>
								</template>
								<td>{{item.resignType}}</td>
								<td>{{item.resignName}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="myModalQuery">
				<div class="modal-dialog">
					<advance @submitAdvacedParam='advanceSelect'></advance>
				</div>
			</div>
			<div class="modal fade" id="myModalFamily" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-family">
					<family></family>
				</div>
			</div>
			<div class="modal fade" id="myModalJoin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog staff_t">
					<empEntry></empEntry>
				</div>
			</div>
			<div class="modal fade" id="myModalupdata" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog staff_t">
					<mEE ref='mEE' :personalBase='personalBase' :personalDetail='personalDetail' :personalFamily='personalFamily'
					 :personalShift='personalShift' @submitBackUpPage='receivePersonalBase'></mEE>
				</div>
			</div>
		</div>
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

	import {
		timeInit
	} from '../../assets/js/date.js'
	/**
	 * 这个导入路径没有提示。按照自己的路径写，按提示可能不能实现，具体原因不详
	 */
	export default {
		name: 'employee',
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
			// this.getEmployee()
			return {
				projectName: '0',
				projectId: '0',
				departName: '0',
				departId: '',
				state: '1',
				searchContent: '',
				employeeId: '',
				accountId: '',

				employeeList: [], //从服务器请求的个人信息


				personalInfo: {}, //首页列表获取的一个人的基础信息
				personalBase: {}, //服务器获取的一个人的基础信息
				copyPersonalBase: {},
				personalDetail: {}, //服务器获取的一个人的详细信息
				personalFamily: [], //服务器获取的一个人的家庭信息
				personalShift: [], //服务器获取的一个人的调动信息
			}
		},

		methods: {

			requireAllInfo: function() {
				alert(this.getMonthFirstDay)
			},
			//数据导出表格
			dowmelxe: function(name) {
				var myDate = new Date();
				var year = myDate.getFullYear();
				var month = myDate.getMonth() + 1;
				var date = myDate.getDate();
				$("#datatable").table2excel({
					exclude: ".noExl",
					name: "Excel Document Name",
					filename: name + year + month + date,
					exclude_img: true,
					exclude_links: true,
					exclude_inputs: true
				})
			},
			exportToExcel() {
				//excel数据导出
				require.ensure([], () => {
					const {
						export_json_to_excel
					} = require('../../assets/js/Export2Excel');
					const tHeader = ['序号', '省份', '投资总额', '收益总额', '主要投资项目', '投资周期', '投资人数', '投资年变化率', '备注'];
					const filterVal = ['index', 'provinces', 'orderMoney', 'incomeMoney', 'payType', 'orderPeriod',
						'orderPersonConunt', 'orderYearRate', 'remarks'
					];
					const list = this.tableData;
					const data = this.formatJson(filterVal, list);
					export_json_to_excel(tHeader, data, '列表excel');
				})
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]))
			},
			//获取项目名字和id
			projectChange: function(projectId, projectName) {
				this.projectId = projectId
				this.projectName = projectName
				this.getEmployee("project")
			},
			//获取部门名字和id
			departChange: function(departId, departName) {
				this.departId = departId
				this.departName = departName
				this.getEmployee("depart")
			},
			//高级查询
			advanceSelect: function(advanceParam) {
				$("#myModalQuery").modal('hide');
				if (advanceParam.selectType == '0') {
					this.birthdayScreen(advanceParam.birthday)
				} else {
					this.advancedQuery(advanceParam)
				}

			},
			//接收修改返回的基本信息
			receivePersonalBase: function() {
				this.getEmployee('all')
				$("#myModalupdata").modal('hide')
			},
			//模糊搜索
			searchEmployee: function(param) {

				var newList = [];
				if (this.isBlank(param)) {
					return this.employeeList
				}
				this.employeeList.forEach(function(item) {
					if (item.name.search(param) != -1 || item.jobNum.search(param) != -1) {
						newList.push(item)
					}
				})
				console.log('searchEmployee')
				console.log(newList)
				if (newList.length > 0) {
					return newList
				} else {
					return this.employeeList
				}
			},
			// 高级查询
			advancedQuery: function(advanceParam) {

				var url = this.url + '/search/advanceAllList'
				console.log(advanceParam.begin + advanceParam.end + advanceParam.category)
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						searchType: advanceParam.category,
						startDate: advanceParam.begin,
						endDate: advanceParam.end,
						resignType: advanceParam.advanceResignType,
						resignReasonId: advanceParam.advanceReasonId,
					},
					dataType: 'json',
				}).then((response) => {
					console.log('advancedQuery')
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						// alert(res.resData.length)
						if (res.resData.length > 0) {
							this.employeeList = res.resData
							$("#myModalQuery").modal('hide');
						} else {
							alert('没有查询到相关数据')
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			//通过生日月份筛选在职员工
			birthdayScreen: function(param) {
				alert(param)
				var url = this.url + '/search/advanceBirthQuery'

				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						birth: param
					},
					dataType: 'json',
				}).then((response) => {
					console.log('birthdayScreen')
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.resData.length)
						if (res.resData.length > 0) {
							this.employeeList = res.resData
							if (this.projectId != '0') {
								this.searchEmployee('')
							}
							$("#myModalQuery").modal('hide');
						} else {
							alert('没有查询到相关数据')
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});
			},

			// 双击弹出员工修改框
			showEmployeeInfo: function(item) {

				$("#myModalupdata").modal('show')
				this.accountId = item.accountId
				this.personalInfo = Object.assign({}, item)
				this.$refs.mEE.paramDevliverToSubModel(this.personalInfo)
				this.personalInfo.entryDate = timeInit(this.personalInfo.entryDate)
				this.personalInfo.positiveDate = timeInit(this.personalInfo.positiveDate)
				this.personalInfo.resignDate = timeInit(this.personalInfo.resignDate)

				var uDetailUrl = this.url + '/search/singleUDInfo'
				var ufmUrl = this.url + '/search/singlefamilyList'
				var uPositionUrl = this.url + '/search/positionShifts'
			},
			getEmployee: function(param) {
				var copyProjectId = ''
				var copyDepartName = ''
				console.log(param)
				if (param == 'all') {
					this.state = '1'
					this.projectId = '0'
					copyProjectId = ''
					this.projectName = '0'
					this.departName = '0'
					this.searchContent = ''
					this.$refs.department.setDpart('0')
					this.$refs.project.setProject('0')
				} else if (param == 'project') {
					copyDepartName = ''
					if (this.projectId != '0') {
						copyProjectId = this.projectId
					}else{
						copyProjectId=''
					}
				} else if (param == 'depart') {
					copyProjectId = ''
					if (this.departName != '0') {
						copyDepartName = this.departName
					}else{
						copyDepartName=''
					}
				} else if (param == 'search') {
					this.state = '1'
					copyProjectId = ''
					copyDepartName = ''
				} else {
					if (this.projectId != '0') {
						copyProjectId = this.projectId
					}else{
						copyProjectId=''
					}
					if (this.departName != '0') {
						copyDepartName = this.departName
					}else{
						copyDepartName=''
					}
				}
				console.log('projectId:' + copyProjectId + 'departName' + this.departName)
				var url = this.url + '/search/allList'
				axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						state: this.state,
						projectId: copyProjectId,
						departName: copyDepartName,
						searchContent: this.searchContent,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						console.log('employeeList-length:' + res.resData.length)
						if (res.resData.length > 0) {
							console.log('employeeList-length:' + res.resData.length)
							this.employeeList = res.resData
							$("#myModalQuery").modal('hide');
						} else {
							alert('没有查询到相关数据')
						}
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
		},
		created() {
			this.getEmployee()
		}
	}
</script>


<style>
	@import '../../assets/css/employee.css';
</style>
