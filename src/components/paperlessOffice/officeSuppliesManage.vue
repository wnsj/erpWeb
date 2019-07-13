<template>
	<div class="container user-container" id="officeSuppliesManage">
		<div class="row">
			<div class="col-md-12 col-lg-12 main-title">
				<h2>办公用品管理</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding:0">
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
					<p>部门：</p>
				</div>
				<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
					<department @departChange='getDept'></department>
				</div>
			</div>

			<div class="co-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
					<p>申请月份：</p>
				</div>
				<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<div class="input-append date" id="datetimepicker">
						<input size="16" type="text" id='textDatePick' readonly>
						<span class="add-on"><i class="icon-th"></i></span>
					</div>
				</div>
			</div>

			<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding:0">
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
					<p>名称：</p>
				</div>
				<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
					<span>
						<input type="text" value="" class="form-control" v-model="kquName" />
					</span>
				</div>
			</div>
			<div>
				<button type="button" class="btn btn-warning pull-left m_r_10" data-toggle="modal">汇总</button>
				<button type="button" class="btn btn-primary pull-right" @click="exportTableToExcel('datatable','办公用品申请表')">导出</button>
				<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" data-target="#myModalJoin" @click="requestOffice()">申请</button>
				<button type="button" class="btn btn-warning pull-right m_r_10" data-toggle="modal" @click="queryOfficeSupplies">查询</button>
			</div>
		</div>

		<div class="row add-mt">
			<div style="padding: 0; width:3.3%; display:inline-block; float:left; margin-left:15px; line-height: 34px; font-size:0;">
				<p>项目：</p>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive">
					<table class="table table-bordered table-hover user-table offover" id="datatable">
						<thead>
							<tr>
								<th class="text-center">部门</th>
								<th class="text-center">月份</th>
								<th class="text-center">名称 </th>
								<th class="text-center">数量</th>
								<th class="text-center">规格及要求</th>
								<th class="text-center">备注</th>
								<th class="text-center">统计人</th>
								<th class="text-center">审核人</th>
								<th class="text-center">审核意见</th>
								<th class="text-center">状态</th>
								<th class="text-center">查看详情</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in employeeList" :key="index">
								<td>{{item.departmentName}}</td>
								<td>{{item.month}}</td>
								<td>{{item.name}}</td>
								<td>{{item.num}}</td>
								<td>{{item.specification}}</td>
								<td>{{item.remark}}</td>
								<td>{{item.account1Name}}</td>
								<td>{{item.account2Name}}</td>
								<td>{{item.advice2}}</td>
								<td>{{item.state}}</td>
								<td>
									<template>
										<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" data-target="#myModalJoinInfo"
										 @click="officeInfo(item)">点击查看详情</button>
									</template>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>


		<!-- 办公用品申请表弹出     -->
		<div class="modal fade" id="myModalJoin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog staff_t">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
						<h1 class="modal-title">办公用品申请</h1>
					</div>

					<div class="modal-header modal_header_leave">
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
							<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
								<p>部门：</p>
							</div>
							<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
								<department @departChange='getDept2' ref='dept2'></department>
							</div>
						</div>

						<div class="co-xs-4 col-sm-4 col-md-4 col-lg-4">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>申请月份：</p>
							</div>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<input type="text" value="" class="form-control" v-model="dpbeginDate" readonly="readonly" />
							</div>
						</div>

						<div class="co-xs-3 col-sm-3 col-md-3 col-lg-3">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
								<p>办公用品申领计划单</p>
							</div>
						</div>
					</div>

					<div class="office_table">
						<table class="table table-bordered table-hover user-table">
							<thead>
								<tr>
									<th class="text-center"><span style="color: red;">*</span>名称</th>
									<th class="text-center"><span style="color: red;">*</span>数量</th>
									<th class="text-center"><span style="color: red;">*</span>规格与要求 </th>
									<th class="text-center">备注</th>
									<th class="text-center">删除</th>
									<th class="text-center"></th>
								</tr>

								<tr v-for="(itemObj,index) in addOffice" :key='index'>
									<th class="text-center">
										<select class="form-control" v-model="itemObj.officeId" @change="officeChange(itemObj)">
											<option value="0">--请选择--</option>
											<option v-for="item in officeNames" :key="item.id" :value="item.id">
												{{item.name}}
											</option>
										</select>
									</th>
									<th class="text-center"><input type="text" placeholder="请输入数字" class="form-control" v-model="itemObj.num"
										 @input="inputOfficeNum(itemObj)"></th>
									<th class="text-center">
										<select class="form-control" v-model="itemObj.specId" @change="speChange(itemObj)">
											<option value="0">--请选择--</option>
											<option v-for="item in itemObj.specificationList" :key="item.id" :value="item.id">
												{{item.specification}}
											</option>
										</select>
									</th>
									<th class="text-center"><input type="text" placeholder="备注" class="form-control" v-model="itemObj.remark"></th>
									<th class="text-center"><button @click="delRow(index)">删除</button></th>
									<th class="col-md-1">
										<button type="button" class="btn btn-warning pull-left m_r_10" @click="addRow(itemObj,addOffice)">+</button>
									</th>
								</tr>
							</thead>
						</table>
					</div>
					<div style="float: right; margin-right: 30px;">红色<span style="color: red;">*</span>为必填项</div>
					<div class="modal-header modal_header_leave" style="margin-top:15px">
						<h6>申请人</h6>
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
							<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
								<p>申请人：</p>
							</div>
							<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 ">
								<input type="text" :value="account.account_Name" class="col-xs-10 col-sm-10 col-md-10 col-lg-10" style="padding: 0; line-height: 30px;" readonly>
							</div>
						</div>

						<div class="col-md-3">
							<button type="button" class="btn btn-info">确定</button>
							<button type="button" class="btn btn-info">取消</button>
						</div>
					</div>

					<div class="modal-header modal_header_leave">
						<h6>审核人</h6>
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
							<div class=" col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>主管/组长：</p>
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<select class="form-control" v-model="state">
									<option value="0">李明伟</option>
									<option value="1">王杰林</option>
								</select>
							</div>
							<div class="col-md-1">
								<button type="button" class="btn btn-warning pull-left m_r_10">+</button>
							</div>
						</div>
						<div class="col-md-3">
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
			</div>
		</div>

		<!-- 办公用品详情 -->
		<div class="modal fade" id="myModalJoinInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog staff_t">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
						<h1 class="modal-title">办公用品详情</h1>
					</div>

					<div class="modal-header modal_header_leave">
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
							<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
								<p>部门：</p>
							</div>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<input type="text" v-model="deptmentName" readonly="readonly" />
							</div>
						</div>

						<div class="co-xs-4 col-sm-4 col-md-4 col-lg-4">
							<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>申请月份：</p>
							</div>
							<div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<input type="text" value="" class="form-control" :value="officeInfoDate" readonly="readonly" />
							</div>
						</div>

						<div class="co-xs-3 col-sm-3 col-md-3 col-lg-3">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0; line-height: 34px;">
								<p>办公用品申领计划单</p>
							</div>
						</div>
					</div>

					<div class="office_table">
						<table class="table table-bordered table-hover user-table">
							<thead>
								<tr>
									<th class="text-center"><span style="color: red;">*</span>名称</th>
									<th class="text-center"><span style="color: red;">*</span>数量</th>
									<th class="text-center"><span style="color: red;">*</span>规格与要求 </th>
									<th class="text-center">备注</th>
									<th class="text-center">删除</th>
									<th class="text-center"></th>
								</tr>

								<tr v-for="(itemObj,index) in officeInfoList" :key='index'>
									<th class="text-center">
										<select class="form-control" v-model="itemObj.officeId" @change="officeChange(itemObj)">
											<option value="0">--请选择--</option>
											<option v-for="item in officeNames" :key="item.id" :value="item.id">
												{{item.name}}
											</option>
										</select>
									</th>
									<th class="text-center"><input type="text" placeholder="请输入数字" class="form-control" v-model="itemObj.num"
										 @input="inputOfficeNum(itemObj)"></th>
									<th class="text-center">
										<select class="form-control" v-model="itemObj.specId" @change="speChange(itemObj)">
											<option value="0">--请选择--</option>
											<option v-for="item in itemObj.specificationList" :key="item.id" :value="item.id">
												{{item.specification}}
											</option>
										</select>
									</th>
									<th class="text-center"><input type="text" placeholder="备注" class="form-control" v-model="itemObj.remark"></th>
									<th class="text-center"><button>删除</button></th>
									<th class="col-md-1">
										<button type="button" class="btn btn-warning pull-left m_r_10" @click="addRow(itemObj,officeInfoList)">+</button>
									</th>
								</tr>
							</thead>
						</table>
					</div>
					<div style="float: right; margin-right: 30px;">红色<span style="color: red;">*</span>为必填项</div>
					<div class="modal-header modal_header_leave" style="margin-top:15px">
						<h6>申请人</h6>
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
							<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding: 0; line-height: 34px;">
								<p>申请人：</p>
							</div>
							<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 ">
								<input type="text" value="" class="col-xs-10 col-sm-10 col-md-10 col-lg-10" style="padding: 0; line-height: 30px;" readonly="readonly">
							</div>
						</div>

						<div class="col-md-3">
							<button type="button" class="btn btn-info">确定</button>
							<button type="button" class="btn btn-info">取消</button>
						</div>
					</div>

					<div class="modal-header modal_header_leave">
						<h6>审核人</h6>
						<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
							<div class=" col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0; line-height: 34px;">
								<p>主管/组长：</p>
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<select class="form-control" v-model="state">
									<option value="0">李明伟</option>
									<option value="1">王杰林</option>
								</select>
							</div>
							<div class="col-md-1">
								<button type="button" class="btn btn-warning pull-left m_r_10">+</button>
							</div>
						</div>
						<div class="col-md-3">
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
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import axios from 'axios'
	import moment from 'moment'
	import department from '@/components/vuecommon/department.vue'
	import Cookies from 'js-cookie'
	export default {
		components: {
			department
		},
		data() {
			return {
				dpbeginDate: moment(moment().add(1, 'month')).format("YYYY-MM"),
				kquName: '',
				employeeList: [],
				departId: '',
				deptId: '',
				departmentList: [],
				state: '',
				officeNames: [],
				specificationList: [],
				officeId: 0,
				addOffice: [{
					officeId: 0,
					specId: 0,
					remark: '',
					name: '',
					num: '',
					specification: ''
				}],
				officeNum: 0,
				specId: 0,
				officeInfoList: [],
				deptmentName: '',
				officeInfoDate:'',
				account:{
					account_Name:''
				}
			};
		},
		methods: {
			//Promise使用：https://www.cnblogs.com/momozjm/p/7273272.html
			//公共请求方法,返回响应数据
			requestData(url, rquestParam) {
				return new Promise((resolve, reject) => {
					axios({
						method: "post",
						url: url,
						headers: {
							"Content-Type": this.contentType,
							"Access-Token": this.$root.accountAccessToken
						},
						data: rquestParam,
						dataType: "json"
					}).then((response) => {
						resolve(response.data);
					}).catch(
						function(error) {
							reject(error)
						}
					);
				});
			},
			//办公用品管理查询
			queryOfficeSupplies() {
				var accountId = this.has("70") ? '' : JSON.parse(Cookies.get("accountData")).account.account_ID;
				var url = this.url + "/officeAction/queryOfficeSuppliesData";
				var date = $('#textDatePick').val();
				var rquestParam = {
					month: date,
					accountId1: accountId,
					departmentId: this.departId,
					name: this.kquName
				};
				this.requestData(url, rquestParam).then((responseData) => {
					if (responseData.retCode == '0000') {
						this.employeeList = responseData.retData;
					} else {
						alert(responseData.retMsg);
					}
				}, (error) => {
					console.log("请求失败处理");
				});
			},
			//部门切换1
			getDept(deptId, deptName) {
				this.departId = deptId == 0 ? '' : deptId;
			},
			//部门切换2
			getDept2(deptId, deptName) {
				this.deptId = deptId == 0 ? '' : deptId;
			},
			//查询所有办公用品
			queryOfficeNames() {
				var url = this.url + "/officeAction/queryOfficeNames";
				this.requestData(url, {}).then((responseData) => {
					if (responseData.retCode == '0000') {
						this.officeNames = responseData.retData;
					} else {
						alert(responseData.retMsg);
					}
				}, (error) => {
					console.log("请求失败处理");
				});
			},
			//办公用品名切换
			officeChange(office) {
				office.name = '';
				office.specId = 0;
				office.specification = '';
				for (var i = 0; i < this.officeNames.length; i++) {
					if (this.officeNames[i].id == office.officeId) {
						office.specificationList = this.officeNames[i].specification;
						office.name = this.officeNames[i].name;
						return;
					}
				}
			},
			//规格切换
			speChange(office) {
				for (var i = 0; i < office.specificationList.length; i++) {
					if (office.specId == office.specificationList[i].id) {
						office.specification = office.specificationList[i].specification;
						return;
					}
				}
			},
			//只能输入数字
			inputOfficeNum(itemObj) {
				itemObj.num = itemObj.num.replace(/[^\.\d]/g, '');
				itemObj.num = itemObj.num.replace('.', '');
			},
			//校验数组中的数据是否合法
			verificationArr(addOffice){
				for (var i = 0; i < addOffice.length; i++) {
					if (this.isBlank(addOffice[i].name)) {
						alert('名称不能为空!(请完善必填项后再继续操作!)');
						return false;
					}
				
					if (addOffice[i].num <= 0) {
						alert('数量不能为0!(请完善必填项后再继续操作!)');
						return false;
					}
				
					if (this.isBlank(addOffice[i].specification)) {
						alert('规格不能为空!(请完善必填项后再继续操作!)');
						return false;
					}
				}
				return true;
			},
			//校验数据是否合法
			verificationData(itemObj, addOffice) {
				if (this.isBlank(itemObj.name)) {
					alert('名称不能为空!(请完善必填项后再继续操作!)');
					return false;
				}

				if (itemObj.num <= 0) {
					alert('数量不能为0!(请完善必填项后再继续操作!)');
					return false;
				}
				
				if (this.isBlank(itemObj.specification)) {
					alert('规格不能为空!(请完善必填项后再继续操作!)');
					return false;
				}
				if(!this.verificationArr(addOffice))return false;
				return true;
			},
			//添加行
			addRow(itemObj, addOffice) {
				if (!this.verificationData(itemObj, addOffice)) return;
				addOffice.push({
					officeId: 0,
					specId: 0,
					remark: '',
					name: '',
					num: '',
					specification: ''
				});
			},
			//删除行
			delRow(key) {
				if (this.addOffice.length - 1 <= 0) {
					alert("当前数据只有一行不允许删除!");
					return;
				}
				this.addOffice.splice(key, 1);
			},
			//同部门办公用品信息
			officeInfo(office) {
				this.officeInfoList = [];
				this.employeeList.forEach(item => {
					if (item.departmentId == office.departmentId) {
						for (var i = 0; i < this.officeNames.length; i++) {
							if (this.officeNames[i].id == item.officeId) {
								item.specificationList = this.officeNames[i].specification;
							}
						}
						let ite = Object.assign({},item);
						this.officeInfoList.push(ite);
						this.deptmentName = item.departmentName;
						this.officeInfoDate = item.month;
					}
				});
			},
			//将申请表清空
			requestOffice(){
				this.$refs.dept2.setDpart();
				this.addOffice = [];
				this.addOffice.push({
					officeId: 0,
					specId: 0,
					remark: '',
					name: '',
					num: '',
					specification: ''
				});
			}
		},
		mounted() {
			//只能选择年月
			$(function() {
				$('#datetimepicker').datetimepicker({
					format: 'yyyy-mm',
					autoclose: true,
					startView: 3,
					minView: 3,
					language: 'cn',
				});
				$('#textDatePick').val(moment(moment().add(1, 'month')).format("YYYY-MM"));
			});
			this.queryOfficeNames();
			this.account = JSON.parse(Cookies.get("accountData")).account;
		}
	}
</script>

<style>
	@import url("../../assets/css/paperlessOffice/office.css");
</style>