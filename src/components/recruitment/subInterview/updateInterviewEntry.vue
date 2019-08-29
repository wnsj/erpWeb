<!-- author:dingdong -->
<template>
  <!--面试信息编辑弹框-->
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" data-dismiss="modal" aria-hidden="true" class="close">
        <span>×</span>
      </button>
      <h4 id="myModalLabel" class="modal-title">面试信息</h4>
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
        <div class="col-md-7 col-md-offset-3">
          <button type="button" class="btn btn-warning" v-if="isShow" @click="editInterview">确认</button>
          <button type="button" data-dismiss="modal" class="btn btn-warning">返回</button>
        </div>
        <div class="col-md-2">
          <button type="button" class="btn btn-info" v-if="isEntryBtn" v-on:click="entry()">入职</button>
          <button type="button" class="btn btn-info" v-if="isShowBtn" v-on:click="checkEntry()">查看入职</button>
        </div>
      </div>
    </div>
		<cee ref="cee"></cee>
		<ee ref="ee" @addEmployeeInfo='closeUIEAction'></ee>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import axios from 'axios'
  import updateBasicInfo from '../subInterview/subUpdateInterviewEntry/updateInterviewBasic.vue'
  import updateEducationInfo from '../subInterview/subUpdateInterviewEntry/updateEducationExperience.vue'
  import updateApplyInfo from '../subInterview/subUpdateInterviewEntry/updateApplyInformation.vue'
	import cee from '../../recruitment/checkEntryInfo/checkEmpEntry.vue'//查看入职
	import ee from '../../recruitment/checkEntryInfo/empEntry.vue'//入职
  export default {
    components: {
      updateBasicInfo,
      updateEducationInfo,
      updateApplyInfo,
			cee,
			ee
    },
    data() {
      return {
        // -----基本信息-----
        interviewBaseEdit: {},
        educationExprienceEdit: {},
        applyEdit: {},
        isShow: true,
        isEntryBtn: false,
        isShowBtn: false,
      }
    },
    methods: {
      passParamToSubModule(val) {
        this.$refs.updateBasic.childBasicInfo(val)
        this.$refs.updateEducation.childBasicEduAndExp(val)
        this.$refs.updateApply.childApply(val)
      },
			//入职按钮
			entry:function(){
				this.interviewBaseEdit = this.$refs.updateBasic.interviewBase
				this.educationExprienceEdit = this.$refs.updateEducation.eduAndExpInfo
				
				//赋值基本信息和详细信息
				var entryBaseInfo={},entryDetialInfo={}
				entryBaseInfo.recruitDataID=this.interviewBaseEdit.id
				entryBaseInfo.name=this.interviewBaseEdit.name
				entryBaseInfo.sex=this.interviewBaseEdit.sex
				entryBaseInfo.birth=this.interviewBaseEdit.birth
				entryDetialInfo=Object.assign(this.interviewBaseEdit,this.educationExprienceEdit)
				
				// this.$refs.ee.receiveRecruitmentInfo(entryBaseInfo,entryDetialInfo)
				$("#recruitEntry").modal('show')
				this.$refs.ee.receiveRecruitmentInfo(entryBaseInfo,entryDetialInfo)
			},
			//查看入职
			checkEntry:function(){
				this.interviewBaseEdit = this.$refs.updateBasic.interviewBase
				$("#REModalupdata").modal('show')
				this.$refs.cee.paramDevliverToSubModel(this.interviewBaseEdit.id)
			},
			//关闭当前窗口
			closeUIEAction:function(){
				this.$emit('closeUIEAction')
			},
			
      changeBtn() {
        this.isShow = false
      },
      initBtn() {
        this.isShow = true
        this.isEntryBtn = false
        this.isShowBtn = false
      },
      // ---------------------------------------编辑----------------------------------
      editInterview() {
        this.interviewBaseEdit = this.$refs.updateBasic.interviewBase
        this.educationExprienceEdit = this.$refs.updateEducation.eduAndExpInfo
        this.applyEdit = this.$refs.updateApply.apply
        if (this.isBlank(this.interviewBaseEdit.name)) {
          alert('姓名不能为空');
          return false;
        }
        if (this.isBlank(this.applyEdit.channel)) {
          alert('请选择应聘渠道');
          return false;
        }
        if (this.isBlank(this.applyEdit.invitationDate)) {
          alert('请选择邀约日期');
          return false;
        }
        if (this.applyEdit.department == '0') {
          alert('请选择应聘部门');
          return false;
        }
        if (this.isBlank(this.applyEdit.position)) {
          alert('请选择应聘职位');
          return false;
        }
        if (this.isBlank(this.applyEdit.recruitDate)) {
          alert('请选择面试日期');
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
            accountProp: this.interviewBaseEdit.accountProp == null ? '' : this.interviewBaseEdit.accountProp,
            address: this.interviewBaseEdit.address == null ? '' : this.interviewBaseEdit.address,
            birth: this.interviewBaseEdit.birth == null ? '' : this.$YYYY_MM_DD_HH_mm(this.interviewBaseEdit.birth),
            bloodType: this.interviewBaseEdit.bloodType == null ? '' : this.interviewBaseEdit.bloodType,
            height: this.interviewBaseEdit.height == null ? '' : this.interviewBaseEdit.height,
            homeAddress: this.interviewBaseEdit.homeAddress == null ? '' : this.interviewBaseEdit.homeAddress,
            homeTown: this.interviewBaseEdit.homeTown == null ? '' : this.interviewBaseEdit.homeTown,
            idNum: this.interviewBaseEdit.idNum == null ? '' : this.interviewBaseEdit.idNum,
            mail: this.interviewBaseEdit.mail == null ? '' : this.interviewBaseEdit.mail,
            marital: this.interviewBaseEdit.marital == null ? '' : this.interviewBaseEdit.marital,
            name: this.interviewBaseEdit.name,
            phone: this.interviewBaseEdit.phone == null ? '' : this.interviewBaseEdit.phone,
            ploitical: this.interviewBaseEdit.ploitical == null ? '' : this.interviewBaseEdit.ploitical,
            qq: this.interviewBaseEdit.qq == null ? '' : this.interviewBaseEdit.qq,
            sex: this.interviewBaseEdit.sex == null ? '' : this.interviewBaseEdit.sex,
            nationality: this.interviewBaseEdit.nationality == null ? '' : this.interviewBaseEdit.nationality,
            weight: this.interviewBaseEdit.weight == null ? '' : this.interviewBaseEdit.weight,

            // -------------------学历经验-----------------
            atSchool: this.educationExprienceEdit.atSchool,
            certificate: this.educationExprienceEdit.certificate == null ? '' : this.educationExprienceEdit.certificate,
            education: this.educationExprienceEdit.education,
            graduation: this.educationExprienceEdit.graduation == null ? '' : this.$YYYY_MM_DD_HH_mm(this.educationExprienceEdit.graduation),
            profession: this.educationExprienceEdit.profession == null ? '' : this.educationExprienceEdit.profession,
            school: this.educationExprienceEdit.school == null ? '' : this.educationExprienceEdit.school,
            workCompany: this.educationExprienceEdit.workCompany == null ? '' : this.educationExprienceEdit.workCompany,
            workexp: this.educationExprienceEdit.workexp == null ? '' : this.educationExprienceEdit.workexp,

            // -------------------应聘信息-----------------
            channel: this.applyEdit.channel,
            department: this.applyEdit.department,
            interviewer: this.applyEdit.interviewer == null ? '' : this.applyEdit.interviewer,
            invitationDate: this.applyEdit.invitationDate == null ? '' : this.$YYYY_MM_DD_HH_mm(this.applyEdit.invitationDate),
            isPay: this.applyEdit.isPay,
            isQualified: this.applyEdit.isQualified,
            position: this.applyEdit.position,
            recruitDate: this.$YYYY_MM_DD_HH_mm(this.applyEdit.recruitDate),
            remark: this.applyEdit.remark == null ? '' : this.applyEdit.remark,
            score: this.applyEdit.score == null ? '' : this.applyEdit.score,
            wages: this.applyEdit.wages == null ? '' : this.applyEdit.wages,

            updateDate: this.$currentTime(),
            updateAccount: JSON.parse(Cookies.get("accountData")).account.account_ID
          },
          dataType: 'json',
        }).then(response => {
          console.log(response.data.retData)
          $('#interviewEdit').modal('hide');
          this.$parent.queryInterview();
        }).catch(error => {
          console.log(error)
        });
      }
    }
  }
</script>

<style>

</style>
