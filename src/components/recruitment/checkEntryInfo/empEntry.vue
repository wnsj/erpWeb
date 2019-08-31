<template>
	<!--员工入职弹出-->
	<div class="modal fade" id="recruitEntry" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog staff_t">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
					<h4 id="myModalLabel" class="modal-title">员工入职</h4>
				</div>
				<div class="modal-body  pos_r">
					<ul class="nav nav-tabs martop" id="inforElement">
						<li class="active"><a href="#cBasic" data-toggle="tab">基本信息</a></li>
						<li><a href="#cDetailed" data-toggle="tab">详细信息</a></li>
						<li><a href="#cFamily" data-toggle="tab">家庭成员</a></li>
					</ul>
					<div class="tab-content" style=" height:400px; overflow-y:scroll;">
						<!-- 人员基本信息 -->
						<!-- <div class="tab-pane fade in active martop" id="basic"> -->
						<baseInfo ref='baseInfo'></baseInfo>
						<!-- </div> -->
						<!-- 人员详细信息 -->
						<detailInfo ref='detailInfo'></detailInfo>
						<!--家庭成员-->
						<familyInfo ref='familyInfo'></familyInfo>
						
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
						<button type="button" class="btn btn-info" v-on:click="addEmployeeInfo()">确认</button>
						<button type="button" data-dismiss="modal" class="btn btn-info" v-on:click="closeCurrentPage()">返回</button>
					</div>
				</div>
			</div>
		</div>
	</div>


</template>

<script>
	import axios from 'axios'
	import baseInfo from '../checkEntryInfo/subEE/empBase.vue'
	import detailInfo from '../checkEntryInfo/subEE/empDetail.vue'
	import familyInfo from '../checkEntryInfo/subEE/empFamily.vue'
	export default {
		components: {
			baseInfo,
			detailInfo,
			familyInfo,
		},
		data() {
			return {
				personalBase: {},
				personalDetail: {},
				personalFamily: [],
			};
		},
		methods: {
			closeCurrentPage: function() {
				$("#recruitEntry").modal('hide')
			},
			//初始化数据
			cleanData: function() {
				console.log('cleanData')
				this.$refs.baseInfo.initDate()
				this.$refs.detailInfo.cleanData()
				this.$refs.familyInfo.cleanData()
			},
			//面试传信息
			receiveRecruitmentInfo:function(baseInfo,detailInfo){
				this.$refs.baseInfo.initDate(baseInfo)
				this.$refs.detailInfo.initData(detailInfo)
				console.log("接收面试信息:"+detailInfo.name)
				
			},
			addEmployeeInfo: function() {
				// 修改基本信息
				this.personalBase = this.$refs.baseInfo.personalBase
				this.personalBase.isDelete = '0'
				this.personalBase.state = '1'
				this.personalBase.createUser = this.accountInfo().account_ID


				this.personalDetail = this.$refs.detailInfo.personalDetail
				this.personalFamily = this.$refs.familyInfo.personalFamily

				var url = this.url + '/search/insertUserInfo'

				if (this.isBlank(this.personalBase.name)) {
					alert("添加人员的姓名不能为空")
					return
				}
				if (this.isBlank(this.personalBase.sex)) {
					alert("添加人员的性别不能为空")
					return
				}
				if (this.isBlank(this.personalBase.jobNum)) {
					alert("添加人员的工号不能为空")
					return
				}
				if (this.isBlank(this.personalBase.erpaaccount)) {
					alert("添加人员的ERP账号不能为空")
					return
				}
				if (this.isBlank(this.personalBase.departId) || this.personalBase.departId == '0') {
					alert("必须选择部门")
					return
				}
				if (this.isBlank(this.personalBase.positionId) || this.personalBase.positionId == '0') {
					alert("必须选择岗位")
					return
				}
				
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
						userDetail: this.personalDetail,
						//家庭信息
						userFamily: this.personalFamily,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log('addEmployeeInfo')
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.resData.message)
						if (res.resData.message == '添加成功') {
							this.$emit('addEmployeeInfo')
							$("#recruitEntry").modal('hide')
						}
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});

			},
			goToUrl() {
				const msg = confirm("员工添加成功,是否需要申请电脑？")
				if (msg) {
					this.$router.push({
						// path:'/paperlessOffice/computerPreApplication',
						// query:{userName: this.personalBase.erpaaccount}
						name: 'preApplication',
						params: {
							userName: this.personalBase.erpaaccount
						}
					});
				}

			},
			
		}

	}
</script>

<style>

</style>
