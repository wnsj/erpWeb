<!-- author:dingdong -->
<template>
  <!--面试信息添加弹框-->
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" data-dismiss="modal" aria-hidden="true" class="close">
        <span>×</span>
      </button>
      <h4 id="myModalLabel" class="modal-title">面试信息</h4>
    </div>
    <div class="modal-body">
      <ul class="nav nav-tabs martop">
        <li class="active"><a href="#basic" data-toggle="tab">基本信息</a></li>
        <li><a href="#education" data-toggle="tab">学历经验</a></li>
        <li><a href="#apply" data-toggle="tab">应聘信息</a></li>
      </ul>
      <div class="tab-content" style=" height:400px; overflow-y:scroll;">
        <!-- 基本信息 -->
        <basicInfo ref='basic'></basicInfo>
        <!-- 学历经验 -->
        <educationInfo ref='education'></educationInfo>
        <!-- 应聘信息 -->
        <applyInfo ref='apply'></applyInfo>
      </div>
    </div>
    <div class="modal-footer">
      <div class="col-md-12">
        <button type="button" class="btn btn-warning" @click="addInterview">确认</button>
        <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import axios from 'axios'
  import basicInfo from '../subInterview/subInterviewEntry/interviewBasic.vue'
  import educationInfo from '../subInterview/subInterviewEntry/educationExperience.vue'
  import applyInfo from '../subInterview/subInterviewEntry/applyInformation.vue'

  export default {
    components: {
      basicInfo,
      educationInfo,
      applyInfo
    },
    data() {
      return {
        // 添加
        // -----基本信息-----
        interviewBaseAdd: {},
        educationExprienceAdd: {},
        applyAdd: {}
      }
    },
    methods: {
      // ---------------------------------------添加----------------------------------
      initAdd(){
        this.$refs.basic.initBasic()
        this.$refs.education.initEdu()
        this.$refs.apply.initApply()
      },
      addInterview() {
        this.interviewBaseAdd = this.$refs.basic.interviewBase
        this.educationExprienceAdd = this.$refs.education.eduAndExpInfo
        this.applyAdd = this.$refs.apply.apply

        if (this.isBlank(this.interviewBaseAdd.name)) {
          alert('姓名不能为空');
          return false;
        }
        if (this.isBlank(this.applyAdd.channelAddId)) {
          alert('请选择应聘渠道');
          return false;
        }
        if (this.isBlank(this.applyAdd.invitationDate)) {
          alert('请选择邀约时间');
          return false;
        }
        if (this.applyAdd.departAddId == '0') {
          alert('请选择应聘部门');
          return false;
        }
        if (this.isBlank(this.applyAdd.positionAddId)) {
          alert('请选择应聘职位');
          return false;
        }
        if (this.isBlank(this.applyAdd.recruitDate)) {
          alert('请选择面试时间');
          return false;
        }
        axios({
          method: 'post',
          url: this.url + '/zpglController/addRecruitData',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            // -------------------基本信息-----------------
            accountProp: this.interviewBaseAdd.accountProp == null ? '' : this.interviewBaseAdd.accountProp,
            address: this.interviewBaseAdd.address == null ? '' : this.interviewBaseAdd.address,
            birth: this.interviewBaseAdd.birth == null ? '' : this.$YYYY_MM_DD_HH_mm(this.interviewBaseAdd.birth),
            bloodType: this.interviewBaseAdd.bloodType == null ? '' : this.interviewBaseAdd.bloodType,
            height: this.interviewBaseAdd.height == null ? '' : this.interviewBaseAdd.height,
            homeAddress: this.interviewBaseAdd.homeAddress == null ? '' : this.interviewBaseAdd.homeAddress,
            homeTown: this.interviewBaseAdd.homeTown == null ? '' : this.interviewBaseAdd.homeTown,
            idNum: this.interviewBaseAdd.idNum == null ? '' : this.interviewBaseAdd.idNum,
            mail: this.interviewBaseAdd.mail == null ? '' : this.interviewBaseAdd.mail,
            marital: this.interviewBaseAdd.marital == null ? '' : this.interviewBaseAdd.marital,
            name: this.interviewBaseAdd.name,
            phone: this.interviewBaseAdd.phone == null ? '' : this.interviewBaseAdd.phone,
            ploitical: this.interviewBaseAdd.ploitical == null ? '' : this.interviewBaseAdd.ploitical,
            qq: this.interviewBaseAdd.qq == null ? '' : this.interviewBaseAdd.qq,
            sex: this.interviewBaseAdd.sex == null ? '' : this.interviewBaseAdd.sex,
            nationality: this.interviewBaseAdd.nationality == null ? '' : this.interviewBaseAdd.nationality,
            weight: this.interviewBaseAdd.weight == null ? '' : this.interviewBaseAdd.weight,

            // -------------------学历经验-----------------
            atSchool: this.educationExprienceAdd.atSchool,
            certificate: this.educationExprienceAdd.certificate == null ? '' : this.educationExprienceAdd.certificate,
            education: this.educationExprienceAdd.education,
            graduation: this.educationExprienceAdd.graduation == null ? '' : this.$YYYY_MM_DD_HH_mm(this.educationExprienceAdd.graduation),
            profession: this.educationExprienceAdd.profession == null ? '' : this.educationExprienceAdd.profession,
            school: this.educationExprienceAdd.school == null ? '' : this.educationExprienceAdd.school,
            workCompany: this.educationExprienceAdd.workCompany == null ? '' : this.educationExprienceAdd.workCompany,
            workexp: this.educationExprienceAdd.workexp == null ? '' : this.educationExprienceAdd.workexp,

            // -------------------应聘信息-----------------
            channel: this.applyAdd.channelAddId,
            department: this.applyAdd.departAddId,
            interviewer: this.applyAdd.interviewer == null ? '' : this.applyAdd.interviewer,
            invitationDate: this.applyAdd.invitationDate == null ? '' : this.$YYYY_MM_DD_HH_mm(this.applyAdd.invitationDate),
            isPay: this.applyAdd.isPay,
            isQualified: this.applyAdd.isQualified,
            position: this.applyAdd.positionAddId,
            recruitDate: this.$YYYY_MM_DD_HH_mm(this.applyAdd.recruitDate),
            remark: this.applyAdd.remark == null ? '' : this.applyAdd.remark,
            score: this.applyAdd.score == null ? '' : this.applyAdd.score,
            wages: this.applyAdd.wages == null ? '' : this.applyAdd.wages,

            updateDate: this.$currentTime(),
            updateAccount: JSON.parse(Cookies.get("accountData")).account.account_ID
          },
          dataType: 'json',
        }).then(response => {
          console.log('添加成功')
          $('#interviewAdd').modal('hide');
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
