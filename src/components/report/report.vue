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
        <button type="button" class="btn btn-warning pull-right m_r_10" v-if='has(51)'>导出</button>
        <button type="button" class="btn btn-info pull-right m_r_10" data-toggle="modal" data-target="#reportAdd" v-if='has(51)'>申请</button>
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
                <th class="text-center">申请销假</th>
                <th class="text-center" v-if='has(51)'>审批</th> 
                <th class="text-center" v-if='has(51)'>修改</th> 
                <th class="text-center" v-if='has(51)'>销假</th> 
                <th class="text-center" v-if='has(51)'>取消</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in reportList" :key="index"
               :style="item.state == 1? {'color':'#0033ff'}:(item.state == 2? {'color':'#00ff00'}:{'color':''})">
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
              <td class="text-center">
                  {{item.checkResult == 0? '不同意':(item.checkResult == 1? '同意':'')}}
              </td>
              <td class="text-center">{{item.checkRemark}}</td> 
              <td class="text-center">
                  {{item.state == 1? '已销假':(item.state == 2? '已取消':'')}}
              </td>
              <td class="text-center">
                  <button type="button" :class="item.state==1? 
                    'btn btn-sm btn-primary':(item.state == 2? 'btn btn-sm btn-success':'btn btn-sm btn-default')" 
                    :disabled="item.state==1? true:false"
                    @click="applyReportBack(item)">申请销假
                  </button>
              </td>
              <td class="text-center" v-if='has(51)'><button>审批</button></td> 
              <td class="text-center" v-if='has(51)'><button>修改</button></td> 
              <td class="text-center" v-if='has(51)'><button>销假</button></td> 
              <td class="text-center" v-if='has(51)'><button>取消</button></td>
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
                  <leaveType :leaveTypeName="leaveTypeName" @leaveTypeChange='leaveTypeChange'></leaveType>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">部门：</label>
                <div class="col-md-3">
                  <department ref="depart" @departChange='departChange'></department>
                </div>
                <label class="col-md-2 control-label text-right nopad">请假人：</label>
                <div class="col-md-3">
                  <deptEmp :deptEmpId="deptEmpId" ref="deptEmp" @deptEmpChange='deptEmpChange'></deptEmp>
                </div>
              </div>
              <div class="form-group clearfix">
                <label for="startTime" class="col-md-2 control-label text-right nopad">开始日期：</label>
				        <div class="col-md-3">
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
              <button type="button" data-dismiss="modal" class="btn btn-info" @click="addModelClear">返回</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 申请销假 -->
    <div class="modal fade" id="reportBackApply" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj" aria-hidden="true">
      <div class="modal-dialog modal-lg" >
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">申请销假</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <div class="form-group clearfix">
                <label for="leaveEmpBackName" class="col-md-2 control-label text-right nopad">申请人姓名：</label>
                <div class="col-md-2">
                  <input type="text" class="form-control" disabled="disabled" v-model="leaveEmpBackName"/>
                </div>
                <label for="leaveDepartmentBackName" class="col-md-2 control-label text-right nopad">部门：</label>
                <div class="col-md-2">
                  <input type="text" class="form-control" disabled="disabled" v-model="leaveDepartmentBackName"/>
                </div>
                <label for="leavePositionBackName" class="col-md-2 control-label text-right nopad">职位：</label>
                <div class="col-md-2">
                  <input type="text" class="form-control" disabled="disabled" v-model="leavePositionBackName"/>
                </div>
            </div>
          </div>
          <div class="modal-body">
            <form action="">
                <legend><h5>请假</h5></legend>
                <div class="form-group clearfix">
                  <label class="col-md-2 control-label text-right nopad">类型：</label>
                  <div class="col-md-3">
                    <leaveType :leaveTypeName="leaveTypeBackName" ref="leaveType" @leaveTypeChange='leaveTypeBackChange'></leaveType>
                  </div>
                  <label class="col-md-2 control-label text-right nopad">代理人：</label>
                  <div class="col-md-3">
                    <agent :agentAccount="agentAccount" ref="agent" @agentChange="changeAgent"></agent>
                  </div>
                  <button type="button" data-toggle="modal" data-target="#agentChooseModel" @click="queryEmpByDept"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>                
                </div>
                <div class="form-group clearfix">
                  <label for="startBackTime" class="col-md-2 control-label text-right nopad">开始日期：</label>
                  <div class="col-md-3">
                    <input type="datetime-local" class="form-control" id="startBackTime" v-model="startBackTime" disabled="disabled"/>
                  </div>
                  <label for="endBackTime" class="col-md-2 control-label text-right nopad">结束日期：</label>
                  <div class="col-md-3">
                    <input type="datetime-local" class="form-control" id="endBackTime" v-model="endBackTime" disabled="disabled"/>
                  </div>
                </div>
            </form>
            <agentChoose ref="agentChoose" @getAgentInfo="getAgentInfo"></agentChoose>
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
  import Cookies from 'js-cookie'
  import department from '../vuecommon/department.vue'
  import leaveType from '../vuecommon/leaveType.vue'
  import deptEmp from '../vuecommon/deptEmp.vue'
  import agent from '../report/subReportBack/agent.vue'
  import approvalLeaveAcc from '../report/subReport/approvalLeaveAcc.vue'
  import agentChoose from '../report/subReportBack/subReportBackChild/agentChoose.vue'
  
  export default {
    components: {
      department,
      leaveType,
      deptEmp,
      approvalLeaveAcc,
      agent,
      agentChoose
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
        leaveTypeName: '',
        departId: '',
        deptEmpId: '',
        startTime: '',
        endTime: '',
        leaveRemark:'',
        accountID: '',
        checkRemark: '',

        // 申请销假
        leaveEmpBackName: '',
        leaveDepartmentBackName: '',
        leavePositionBackName: '',
        leaveTypeBackName: '',
        startBackTime:'',
        endBackTime:'',

        leaveAccount:'',
        agentAccount:'',

        departmentId: ''
      }
    },
    methods: {
      // ---------------------------------------查询----------------------------------
      departSelChange(departId){
        this.departSelId = departId
      },
      queryReport(){      // 查询请假报备信息
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/queryLeavePrepare',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            startTime: this.beginDate,
            endTime: this.endDate,
            leaveDeptId: this.departSelId,
            leaveEmpName: this.leaveName,
            accountId: this.has(51) ? '' : JSON.parse(Cookies.get("accountData")).account.account_ID,
            state: this.state
          },
          dataType: 'json',
        }).then((response) => {
          this.reportList = response.data.retData
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },

      // ---------------------------------------添加----------------------------------
      leaveTypeChange(val){ // 假期类型
        this.leaveTypeName =  val
      },
      departChange(departId){   // 部门
        this.departId = departId
        this.$refs.deptEmp.getDeptId(departId)
      },
      deptEmpChange(deptEmpId){   // 部门员工
        this.deptEmpId = deptEmpId
      },
      approvalChange(accountID){   // 审批人
        this.accountID = accountID
      },
      addModelClear(){ // 清空添加模态框
        $('#reportAdd').modal('hide');
        this.leaveTypeName =  '',
        this.departId = this.$refs.depart.setDpart("0"),
        this.deptEmpId = '',
        this.startTime = '',
        this.endTime = '',
        this.leaveRemark = '',
        this.accountID = ''
      },
      addReport(){     // 添加请假报备信息
        if(this.isBlank(this.leaveTypeName)) {
          alert('请选择请假类型');
          return false;
        }
        if(this.isBlank(this.departId) || this.departId == 0) {
          alert('请选择部门');
          return false;
        }
        if(this.isBlank(this.deptEmpId)) {
          alert('请选择请假人');
          return false;
        }
        if(this.isBlank(this.startTime)) {
          alert('请假开始时间不能为空,或格式不正确');
          return false;
        }
        if(this.isBlank(this.endTime)) {
          alert('请假结束时间不能为空,或格式不正确');
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
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/addLeavePrepare',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            type: this.leaveTypeName,
            fillAccount:  JSON.parse(Cookies.get("accountData")).account.account_ID,
            fillTime: this.getCurrentYYYY_MM_DD_HH_MM_SS,
            leaveAccount: this.deptEmpId,
            startTime: this.startTime,
            endTime: this.endTime,
            leaveRemark: this.leaveRemark,
            checkAccount: this.accountID,
            updateTime: this.getCurrentYYYY_MM_DD_HH_MM_SS
          },
          dataType: 'json',
        }).then((response) => {
            console.log(response.data.retData)
        }).catch((error) => {
          console.log('请求失败处理')
          console.log(response.data.retData)
        });
        this.addModelClear();
        this.queryReport();
      },

      // ---------------------------------------销假----------------------------------
      
      leaveTypeBackChange(val){ // 假期类型
        this.leaveTypeBackName = val
      },
      changeAgent(val){
        this.agentAccount = val //外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
      },
      applyReportBack(item){
        if(JSON.parse(Cookies.get("accountData")).account.account_ID !=  item.leaveAccount) {
          alert("不能为他人申请销假")
        } else {
            if(item.type == '倒休'){
              alert("倒休不能申请销假,需要人工手动销假")
            } else {
                if(item.checkResult != 1){
                  alert("该报备未审批或未通过,不能申请销假")
                } else{
                  console.log(item)
                  this.leaveEmpBackName = item.leaveEmpName,
                  this.leaveDepartmentBackName = item.leaveDepartmentName
                  this.leavePositionBackName = item.leavePositionName
                  this.leaveTypeBackName = item.type
                  this.startBackTime = this.getYYYY_MM_DD_T_HH_MM(item.startTime)
                  this.endBackTime = this.getYYYY_MM_DD_T_HH_MM(item.endTime)
                  this.leaveAccount = item.leaveAccount
                  this.$refs.agent.getLeaveAccount([item.leaveAccount,item.leaveDeptId])
                  this.$refs.agentChoose.getLeaveAccount([item.leaveAccount,item.leaveDeptId])
                  $('#reportBackApply').modal('show');
                }
            }
        }
      },
      queryEmpByDept(){
        this.$refs.agentChoose.queryEmpByDept()
      },
      getAgentInfo(item){
        this.$refs.agent.insertAgentInfo(item)
      }

    },
  }
</script>
<style>
  @-moz-document url-prefix(){fieldset{display: table-cell;}}
  .nopad{padding-left:0;padding-right:0;line-height:34px;}
  .user-container{background-color: #fff; width: 100%; padding: 0 20px;}
  .main-title h2{line-height: 50px;}
  .m_r_10{margin-right:10px;}
  .textarea{
    resize:none;
    width: 79%;
    height: 80px;
  }
  input[type="date"]{line-height: 26px!important;}
</style>


