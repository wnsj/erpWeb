<template>
  <!--修改员工弹出-->
  <div class="modal fade" id="myModalupdata" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog staff_t">

      <div class="modal-content">
        <div class="modal-header">
          <button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
          <h4 id="myModalLabel" class="modal-title">员工信息修改</h4>
        </div>
        <div class="modal-body">
          <ul class="nav nav-tabs martop">
            <li class="active"><a href="#updatabasic" data-toggle="tab">基本信息</a></li>
            <li><a href="#updatadetailed" data-toggle="tab">详细信息</a></li>
            <li><a href="#updatafamily" data-toggle="tab">家庭成员</a></li>
            <li><a href="#updatarecord" data-toggle="tab">调动记录</a></li>
            <li class="pull-right" id="lookms">
              <button type="button" class="btn btn-sm btn-info btn-block" @click="relateToInterview">查看面试</button>
            </li>
          </ul>
          <div class="tab-content" style=" height:600px; overflow-y:scroll;">
            <!-- 人员基本信息 -->
            <baseInfo ref='baseInfo'></baseInfo>
            <!-- 人员详细信息 -->
            <detailInfo ref='detailInfo'></detailInfo>
            <!--家庭成员-->
            <familyInfo ref='familyInfo'></familyInfo>
            <!--调动记录-->
            <shiftInfo ref='shiftInfo'></shiftInfo>
          </div>
        </div>
        <div class="modal-footer">
          <!--按钮-->
          <div class="col-md-12">
            <div class="col-md-8">
              <button type="button" class="btn btn-info btn-sm int_pwd" v-on:click="initPassword()">初始化密码</button>
              <button type="button" class="btn btn-info btn-sm reg_work" id="shiftPositionBtn" v-show="isShowPBtn"
                      v-on:click="shiftPosition()">
                转正
              </button>
              <button type="button" class="btn btn-info btn-sm recovery" v-if="isShow==true" v-on:click="employeeResgin('2')">离职</button>
              <button type="button" class="btn btn-info btn-sm recovery" v-show="isShow==false" v-on:click="employeeResgin('1')">恢复</button>
              <button type="button" class="btn btn-info btn-sm detl" v-on:click="deleteEmployee()">删除</button>
            </div>
            <button type="button" class="btn btn-info" v-on:click="updataEmployeeInfo()">确认</button>
            <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
          </div>
        </div>
      </div>
    </div>
    <interviewShow ref="interview"></interviewShow>
  </div>
</template>

<script>
  import axios from 'axios'
  import baseInfo from '../subEmp/subModifyEE/modifyEmpBase.vue'
  import detailInfo from '../subEmp/subModifyEE/modifyEmpDetail.vue'
  import familyInfo from '../subEmp/subModifyEE/modifyEmpFamily.vue'
  import shiftInfo from '../subEmp/subModifyEE/modifyEmpShift.vue'
  import interviewShow from '../../recruitment/interview.vue'

  export default {
    components: {
      interviewShow,
      baseInfo,
      detailInfo,
      familyInfo,
      shiftInfo,
    },

    data() {
      return {
        personalBase: {},
        personalDetail: {},
        personalFamily: [],

        personalShift: [],

        isShowPBtn: true,
        isShow: true,

        accountId: '',
        userId: '',
        name: '',
      };
    },
    methods: {
      //传对应的参数给子模块
      paramDevliverToSubModel: function (param) {
        console.log('recruitDataID:' + param.recruitDataID)
        this.personalBase = param
        console.log('recruitDataID:' + this.personalBase.recruitDataID)
        this.accountId = param.accountId
        this.userId = param.id
        this.name = param.name

        this.btnShow()

        console.log('isShiftPosition' + this.isShiftPosition)
        this.$refs.baseInfo.childrenBaseInfo(this.personalBase)
        this.$refs.detailInfo.childrenDetailInfo(this.userId)
        this.$refs.familyInfo.childrenFamilyInfo(this.accountId)
        this.$refs.shiftInfo.childrenShiftInfo(this.accountId)
        // if(this.personalBase.entryDate<)
      },
      //判断是否在职，在职显示转正和离职，离职显示恢复
      btnShow: function () {
        if (this.personalBase.state == 1) {
          //判断是否显示转正按钮
          this.isShow = true
          if (!this.isBlank(this.personalBase.positiveDate)) {
            this.isShowPBtn = false
          } else {
            this.isShow = true
          }
        } else if (this.personalBase.state == 2) {
          this.isShow = false
          this.isShowPBtn = false
        }
      },
      //初始化密码
      initPassword: function () {

        var url = this.url + '/search/updataAccountPwd'
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            accountId: this.accountId,
          },
          dataType: 'json',
        }).then((response) => {
          var res = response.data
          console.log(res)
          if (res.retCode == '0000') {
            alert('密码初始化成功')
          } else {
            alert(res.retMsg)
          }

        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
      //转正
      shiftPosition: function () {
        var url = this.url + '/search/shiftPositiveDate'
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            id: this.userId,
            positiveDate: this.personalBase.positiveDate
          },
          dataType: 'json',
        }).then((response) => {
          var res = response.data
          console.log('转正:' + res)
          if (res.retCode == '0000') {
            this.submitBackUpPage()
          } else {
            alert(res.retMsg)
          }

        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
      //离职/恢复修改
      employeeResgin: function (param) {
        var url = this.url + '/search/employeeResginDate'

        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            id: this.userId,
            state: param,
            resignDate: this.personalBase.resignDate
          },
          dataType: 'json',
        }).then((response) => {
          var res = response.data
          console.log(res)
          if (res.retCode == '0000') {
            this.submitBackUpPage()
          } else {
            alert(res.retMsg)
          }
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
      //删除
      deleteEmployee: function () {

        var url = this.url + '/search/deleteEmployee'
        axios({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            id: this.userId,
            idDelete: '1'
          },
          dataType: 'json',
        }).then((response) => {
          var res = response.data
          console.log(res)
          if (res.retCode == '0000') {
            this.submitBackUpPage()
          } else {
            alert(res.retMsg)
          }

        }).catch((error) => {
          console.log('请求失败处理')
        });
      },

      // 提交修改的员工信息
      updataEmployeeInfo: function () {
        // 修改基本信息
        this.personalBase = this.$refs.baseInfo.personalBase
        this.personalDetail = this.$refs.detailInfo.personalDetail
        this.personalDetail.uEmployeeBasicID = this.personalBase.id
        this.personalFamily = this.$refs.familyInfo.personalFamily

        console.log('personalDetail:' + this.personalDetail.uNationality)
				
        var userInfo = this.personalDetail
        userInfo = this.personalBase

        console.log(userInfo)
        var url = this.url + '/search/updateUserInfo'

        if (this.personalBase.state == '1') {
          this.personalBase.resignDate = ''
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
          console.log(res)
          if (res.retCode == '0000') {
            alert(res.resData.message)
            this.submitBackUpPage()
          } else {
            alert(res.retMsg)
          }
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
      submitBackUpPage: function () {
        this.$emit('submitBackUpPage')
      },
      // 关联面试

      relateToInterview() {
        //判断是否有面试记录
        if (this.isBlank(this.personalBase.recruitDataID)) {
          const msg = confirm('没有对应的面试记录是否关联？')
          if (msg) {
            this.$router.push({
              name: 'interview',
              params: {account: this.accountId, name: this.name}
            })
          }
        } else {
          this.$refs.interview.showInterviewInfo(this.accountId)
        }
      },
    }

  }
</script>
<style>
</style>
