<!-- author:dingdong -->
<template>
	<!--面试信息编辑弹框-->
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" data-dismiss="modal" aria-hidden="true" class="close">
				 <span>×</span>	
			</button>
			<h4 id="myModalLabel" class="modal-title">修改面试信息</h4>
		</div>
		<div class="modal-body">
			<ul class="nav nav-tabs martop">
				<li class="active"><a href="#updateBasic" data-toggle="tab">基本信息</a></li>
				<li><a href="#updateEducation" data-toggle="tab">学历经验</a></li>
				<li><a href="#updateApply" data-toggle="tab">应聘信息</a></li>
			</ul>
			<div class="tab-content" style=" height:400px; overflow-y:scroll;">
				<!-- 基本信息 -->
				<updateBasicInfo ref='updateBasic'></updatebasicInfo>
				<!-- 学历经验 -->
				<updateEducationInfo ref='updateEducation'></updateEducationInfo>
				<!-- 应聘信息 -->
				<updateApplyInfo ref='updateApply'></updateApplyInfo>
			</div>
		</div>
		<div class="modal-footer">
            <div class="col-md-12">
              <button type="button" class="btn btn-warning" @click="editInterview">确认</button>
              <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
            </div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import updateBasicInfo from '../subInterview/subUpdateInterviewEntry/updateInterviewBasic.vue'
	import updateEducationInfo from '../subInterview/subUpdateInterviewEntry/updateEducationExperience.vue'
	import updateApplyInfo from '../subInterview/subUpdateInterviewEntry/updateApplyInformation.vue'
	
	export default {
		components:{
			updateBasicInfo,
			updateEducationInfo,
			updateApplyInfo
		},
		data() {
			return {
				// -----基本信息-----
				interviewBaseEdit:{},
				educationExprienceEdit:{},
				applyEdit:{}
			}
		},
		methods:{
            passParamToSubModule(val){
				this.$refs.updateBasic.childBasicInfo(val)
				this.$refs.updateEducation.childBasicEduAndExp(val)
				this.$refs.updateApply.childApply(val)
			},
			// ---------------------------------------编辑----------------------------------
			editInterview(){
				this.interviewBaseEdit = this.$refs.updateBasic.interviewBase
				this.educationExprienceEdit = this.$refs.updateEducation.eduAndExpInfo
				this.applyEdit = this.$refs.updateApply.apply
				// sex: this.interviewBaseEdit.sex
				console.log(this.interviewBaseEdit.id)
				// console.log(this.interviewBaseEdit)
				// console.log(this.educationExprienceEdit)
				// console.log(this.applyEdit)
				if(this.isBlank(this.interviewBaseEdit.name)){
					alert('姓名不能为空');
          			return false;
				}
				if(this.isBlank(this.applyEdit.channel)) {
					alert('请选择应聘渠道');
					return false;
				}
				if(this.applyEdit.department == '0') {
					alert('请选择应聘部门');
					return false;
				}
				if (this.isBlank(this.applyEdit.position)) {
					alert('请选择应聘职位');
					return false;
				}
				
				if (this.isBlank(this.applyEdit.invitationDate)) {
					alert('邀约时间不能为空');
					return false;
				}
				if (this.isBlank(this.applyEdit.recruitDate)) {
					alert('面试时间不能为空');
					return false;
				}
				
				axios({
					method: 'post',
					url: this.url + '/zpglController/updateRecruitData',
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						id: this.interviewBaseEdit.id,
						// -------------------基本信息-----------------
						accountProp: this.interviewBaseEdit.accountProp == null? '':this.interviewBaseEdit.accountProp,
						address: this.interviewBaseEdit.address == null? '':this.interviewBaseEdit.address,
						birth: this.interviewBaseEdit.birth == null? '':this.interviewBaseEdit.birth,
						bloodType: this.interviewBaseEdit.bloodType == null? '':this.interviewBaseEdit.bloodType,
						height: this.interviewBaseEdit.height == null? '':this.interviewBaseEdit.height,
						homeAddress: this.interviewBaseEdit.homeAddress == null? '':this.interviewBaseEdit.homeAddress,
						homeTown: this.interviewBaseEdit.homeTown == null? '':this.interviewBaseEdit.homeTown,
						idNum: this.interviewBaseEdit.idNum == null? '':this.interviewBaseEdit.idNum,
						mail: this.interviewBaseEdit.mail == null? '':this.interviewBaseEdit.mail,
						marital: this.interviewBaseEdit.marital == null? '':this.interviewBaseEdit.marital,
						name: this.interviewBaseEdit.name,
						phone: this.interviewBaseEdit.phone == null? '':this.interviewBaseEdit.phone,
						ploitical: this.interviewBaseEdit.ploitical == null? '':this.interviewBaseEdit.ploitical,
						qq: this.interviewBaseEdit.qq == null? '':this.interviewBaseEdit.qq,
						sex: this.interviewBaseEdit.sex == null? '':this.interviewBaseEdit.sex,
						nationality: this.interviewBaseEdit.uNationName == null? '':this.interviewBaseEdit.uNationName,
						weight: this.interviewBaseEdit.weight == null? '':this.interviewBaseEdit.weight,

						// -------------------学历经验-----------------
						atSchool: this.educationExprienceEdit.atSchool,
						certificate: this.educationExprienceEdit.certificate == null? '':this.educationExprienceEdit.certificate,
						education: this.educationExprienceEdit.education,
						graduation: this.educationExprienceEdit.graduation == null? '':this.educationExprienceEdit.graduation,
						profession: this.educationExprienceEdit.profession == null? '':this.educationExprienceEdit.profession,
						school: this.educationExprienceEdit.school == null? '':this.educationExprienceEdit.school,
						workCompany: this.educationExprienceEdit.workCompany == null? '':this.educationExprienceEdit.workCompany,
						workexp: this.educationExprienceEdit.workexp == null? '':this.educationExprienceEdit.workexp,

						// -------------------应聘信息-----------------
						channel: this.applyEdit.channel,
						department: this.applyEdit.department,
						interviewer: this.applyEdit.interviewer == null? '':this.applyEdit.interviewer,
						invitationDate: this.applyEdit.invitationDate == null? '':this.applyEdit.invitationDate,
						isPay: this.applyEdit.isPay,
						isQualified: this.applyEdit.isQualified,
						position: this.applyEdit.position,
						recruitDate: this.applyEdit.recruitDate,
						remark: this.applyEdit.remark == null? '':this.applyEdit.remark,
						score: this.applyEdit.score == null? '':this.applyEdit.score,
						wages: this.applyEdit.wages == null? '': this.applyEdit.wages
					},
					dataType: 'json',
				}).then((response) => {
					if (response.data.retCode == '0000') {
						console.log('修改成功')
						this.$parent.queryInterview();
					} else {
						alert(response.data.retMsg);
					}
			
				}).catch((error) => {
					console.log('请求失败处理')
				});
				$('#interviewEdit').modal('hide');
			}
		}
    }
</script>

<style>

</style>
