<!-- author:dingdong -->
<template>
  <div class="container user-container" id="report-app" v-cloak>
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>请假报备管理</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
        <div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
          <p>填写日期：</p>
        </div>
        <div class="col-md-10 col-lg-10">
          <span><input type="date" value="" id="firstTime" v-model="beginDate"/></span>
          <span>&nbsp;~&nbsp;</span>
          <span><input type="date" value="" id="secondTime" v-model="endDate"/></span>
        </div>
      </div>
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">请假人部门</span>
          <department :departId="departSelId" @departChange='departSelChange'></department>
        </div>
      </div>
     <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
      <div class="input-group">
          <span class="input-group-addon">姓名</span>
          <input type="text" class="form-control" placeholder="Username" v-model="leaveName">
        </div>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="input-group">
          <span class="input-group-addon">状态</span>
          <select class="form-control" v-model="state">
            <option v-for="(item,index) in stateList" :key="index" :value="item.value">
              {{item.label}}
            </option>
          </select>
        </div>
      </div>
    </div><br>
    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-9">
        <button type="button" class="btn btn-warning pull-right m_r_10">导出</button>
        <button type="button" class="btn btn-info pull-right m_r_10" data-toggle="modal" data-target="#reportAdd">申请</button>
        <button type="button" class="btn btn-primary pull-right m_r_10" @click="queryReport">查询</button>
      </div>
    </div>
    <br>
    <!-- 查询结果集 -->
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="pre-scrollable">
          <table class="table table-bordered table-hover text-nowrap" id="reporttable">
            <thead>
            <tr>
                <th class="text-center">类型</th> 
                <th class="text-center">请假人</th> 
                <th class="text-center">请假人部门</th> 
                <th class="text-center">开始时间</th> 
                <th class="text-center">结束时间</th> 
                <th class="text-center">请假原因</th> 
                <th class="text-center">填表人</th> 
                <th class="text-center">填表人部门</th> 
                <th class="text-center">填表时间</th> 
                <th class="text-center">审批人</th> 
                <th class="text-center">审批时间</th> 
                <th class="text-center">审批结果</th> 
                <th class="text-center">审批意见</th> 
                <th class="text-center">状态</th> 
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in reportList" :key="index">
              <td class="text-center">{{item.type}}</td>
              <td class="text-center">{{item.leaveEmpName}}</td>
              <td class="text-center">{{item.leaveDepartmentName}}</td>
              <td class="text-center">{{item.startTime}}</td>
              <td class="text-center">{{item.endTime}}</td>
              <td class="text-center">{{item.leaveRemark}}</td>
              <td class="text-center">{{item.fillEmpName}}</td>
               <td class="text-center">{{item.fillDepartmentName}}</td>
              <td class="text-center">{{item.fillTime}}</td>
              <td class="text-center">{{item.checkEmpName}}</td>
              <td class="text-center">{{item.checkTime}}</td>
              <td class="text-center">{{item.checkResult}}</td>
              <td class="text-center">{{item.checkRemark}}</td>
              <td class="text-center">{{item.state}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div><!-- /.row 查询页面-->
    <!--模态对话框-->
    <!-- 新增 -->
    <div class="modal fade" id="reportAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
      <div class="modal-dialog modal-lg" >
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">请假报备</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body" >
            <form action="">
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">类型：</label>
                <div class="col-md-3">
                  <leaveType :leaveTypeId="leaveTypeId" @leaveTypeChange='leaveTypeChange'></leaveType>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">部门：</label>
                <div class="col-md-3">
                  <department @departChange='departChange'></department>
                </div>
                <label class="col-md-2 control-label text-right nopad">请假人：</label>
                <div class="col-md-3">
                  <deptEmp :deptEmpId="deptEmpId" ref="deptEmp" @deptEmpChange='deptEmpChange'></deptEmp>
                </div>
              </div>
              <div class="form-group clearfix">
                <label for="startTime" class="col-md-2 control-label text-right nopad">开始日期：</label>
				        <div class="col-md-3">
          			  <!-- <input type="datetime-local" class="form-control" id="startTime" v-model="startTime"/> -->
                  <input type="datetime-local" class="form-control" id="startTime" v-model="startTime"/>
				        </div>
                <label for="endTime" class="col-md-2 control-label text-right nopad">结束日期：</label>
				        <div class="col-md-3">
          			  <input type="datetime-local" class="form-control" id="endTime" v-model="endTime"/>
				        </div>
              </div>
              <div class="form-group clearfix">
                <label for="remark" class="col-md-2 control-label text-right nopad">请假原因：</label>
                <div class="col-md-10">
                  <textarea class="textarea" id="remark" placeholder="请填写请假原因：" v-model="leaveRemark"></textarea>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">审批人：</label>
                <div class="col-md-3">
                  <approvalLeaveAcc :accountID="accountID" @approvalChange='approvalChange'></approvalLeaveAcc>
                </div>
              </div>
              <div class="form-group clearfix">
                <label for="checkRemark" class="col-md-2 control-label text-right nopad">审批意见：</label>
                <div class="col-md-10">
                  <textarea class="textarea" id="checkRemark" placeholder="由审批人填写" v-model="checkRemark" disabled></textarea>
                </div>
              </div> 
            </form>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-12">
              <button type="button" class="btn btn-warning" @click="addReport">确认</button>
              <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
</template>
<script>
  import axios from 'axios'
  import department from '../vuecommon/department.vue'
  import leaveType from '../vuecommon/leaveType.vue'
  import deptEmp from '../vuecommon/deptEmp.vue'
  import approvalLeaveAcc from '../report/subReport/approvalLeaveAcc.vue'

  export default {
    components: {
      department,
      leaveType,
      deptEmp,
      approvalLeaveAcc
    },
    data(){
      return {
        // 查询
        beginDate: this.getCurrentDay,
        endDate: this.getCurrentDay,
        departSelId: '',
        reportList:[],
        leaveName: '',
        state:'',
        stateList: [
					{value:'',label:'全部'},
          {value:'1',label:'待审批'},
          {value:'2',label:'同意'},
          {value:'3',label:'不同意'},
          {value:'4',label:'已销假'},
          {value:'5',label:'未销假'},
          {value:'6',label:'已取消'}
				],

        // 添加
        leaveTypeId:'',
        departId:'0',
        deptEmpId:'',
        startTime: '2019-06-01T10:00',
        endTime: '',
        leaveRemark:'',
        accountID:'',
        checkRemark:''
      }
    },
    methods: {
      // ---------------------------------------查询----------------------------------
      departSelChange(departId){
        this.departSelId = departId
      },
      queryReport(){      // 查询招聘发布信息
        console.log(this.departSelId)
        axios({
          method: 'post',
          url: this.url + '/wzbgController/queryLeavePrepare',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            startTime: this.beginDate,
            endTime: this.endDate,
            leaveDeptId: this.departSelId,
            leaveEmpName: this.leaveName,
            state: this.state
          },
          dataType: 'json',
        }).then((response) => {
          this.reportList = response.data.retData
          console.log(this.reportList)
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },

      // ---------------------------------------添加----------------------------------
      leaveTypeChange(leaveTypeId){ // 假期类型
        this.leaveTypeId = leaveTypeId
      },
      departChange(departId){   // 部门
        console.log("更改后的id" + departId)
        this.departId = departId
        this.$refs.deptEmp.getDeptId(departId)
      },
      deptEmpChange(deptEmpId){   // 部门员工
        this.deptEmpId = deptEmpId
      },
      approvalChange(accountID){   // 审批人
        this.accountID = accountID
      },
      addReport(){     // 添加请假报备信息
        if(this.isBlank(this.leaveTypeId)) {
          alert('请选择请假类型');
          return false;
        }
        if(this.departId == 0 || this.departId == '') {
          alert('请选择部门');
          return false;
        }
        if(this.isBlank(this.deptEmpId)) {
          alert('请选择请假人');
          return false;
        }
        if(this.isBlank(this.leaveRemark)) {
          alert('请选择请假原因');
          return false;
        }
        if(this.isBlank(this.accountID)) {
          alert('请选择审批人');
          return false;
        }
        console.log("type" + this.leaveTypeId)
        console.log("fillAccount" + "239")
        console.log("fillTime" + this.getCurrentDay)
        console.log("leaveAccount" + this.deptEmpId)
        console.log("startTime" + this.startTime)
        console.log("endTime" + this.endTime)
        console.log("leaveRemark" + this.leaveRemark)
        console.log("checkAccount" + this.accountID)
        console.log("updateTime" + this.getCurrentDay)
        axios({
          method: 'post',
          url: this.url + '/wzbgController/addLeavePrepare',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            type: this.leaveTypeId,
            fillAccount: '239',
            fillTime: this.getCurrentDay,
            leaveAccount: this.deptEmpId,
            startTime: this.startTime,
            endTime: this.endTime,
            leaveRemark: this.leaveRemark,
            checkAccount: this.accountID,
            updateTime: this.getCurrentDay
          },
          dataType: 'json',
        }).then((response) => {
            console.log(response.data.retData)
        }).catch((error) => {
          console.log('请求失败处理')
          console.log(response.data.retData)
        });
        $('#reportAdd').modal('hide');
      },
    },
  }
</script>
<style>
  @-moz-document url-prefix(){fieldset{display: table-cell;}}
  .nopad{padding-left:0;padding-right:0;line-height:34px;}
  .user-container{background-color: #fff; width: 100%; padding: 0 20px;}
  .user-btn-group>button{margin: 0 2px;}
  .main-title h2{line-height: 50px;}
  .m_r_10{margin-right:10px;}
  .textarea{
    resize:none;
    width: 79%;
    height: 80px;
  }
  input[type="date"]{line-height: 26px!important;}
</style>


