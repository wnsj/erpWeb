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
          <department ref="departSel" @departChange='departSelChange'></department>
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
    </div>
    <br>
    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-9">
        <button type="button" class="btn btn-warning pull-right m_r_10" v-if='has(51)'>导出</button>
        <button type="button" class="btn btn-info pull-right m_r_10" data-toggle="modal" data-target="#reportAddModel"
                v-if='has(51)'>申请
        </button>
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
                <button type="button" class="btn btn-sm"
                        :disabled="item.state==1? true:false"
                        @click="applyReportBack(item)"><b>申请销假</b>
                </button>
              </td>
              <td class="text-center" v-if='has(51)'>
                <button type="button" class="btn btn-sm"
                        :disabled="item.checkResult==0? true:(item.checkResult == 1? true:false)"
                        @click="reportReview(item)"><b>审批</b>
                </button>
              </td>
              <td class="text-center" v-if='has(51)'>
                <button type="button" class="btn btn-sm"
                        :disabled="item.state==1? true:false"
                        @click="getEditInfo(item)"><b>修改</b></button>
              </td>
              <td class="text-center" v-if='has(51)'>
                <button type="button" class="btn btn-sm"
                        :disabled="item.state==1? true:false"
                        @click="reportBack(item)"><b>销假</b></button>
              </td>
              <td class="text-center" v-if='has(51)'>
                <button type="button" class="btn btn-sm"
                        :disabled="item.state==1? true:false"
                        @click="reportCancel(item)"><b>取消</b></button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div><!-- /.row 查询页面-->
    <!--模态对话框-->
    <!-- 请假报备申请 -->
    <div class="modal fade" id="reportAddModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj"
         aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">请假报备申请</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
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
                  <department ref="departAdd" @departChange='departAddChange'></department>
                </div>
                <label class="col-md-2 control-label text-right nopad">请假人：</label>
                <div class="col-md-3">
                  <deptEmp :deptEmpId="deptEmpId" ref="deptEmpAdd" @deptEmpChange='deptEmpChange'></deptEmp>
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
                <label for="leaveRemark" class="col-md-2 control-label text-right nopad">请假原因：</label>
                <div class="col-md-10">
                  <textarea class="textarea" id="leaveRemark" placeholder="请填写请假原因：" v-model="leaveRemark"></textarea>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">审批人：</label>
                <div class="col-md-3">
                  <approvalLeaveAcc :accountID="accountID" @approvalChange='approvalChange'></approvalLeaveAcc>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">审批意见：</label>
                <div class="col-md-10">
                  <textarea class="textarea" placeholder="由审批人填写" disabled="disabled"></textarea>
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
    <div class="modal fade" id="reportBackApplyModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj"
         aria-hidden="true">
      <div class="modal-dialog modal-lg">
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
                <input type="text" class="form-control" disabled="disabled" id="leaveEmpBackName"
                       v-model="leaveEmpBackName"/>
              </div>
              <label for="leaveDepartmentBackName" class="col-md-2 control-label text-right nopad">部门：</label>
              <div class="col-md-2">
                <input type="text" class="form-control" disabled="disabled" id="leaveDepartmentBackName"
                       v-model="leaveDepartmentBackName"/>
              </div>
              <label for="leavePositionBackName" class="col-md-2 control-label text-right nopad">职位：</label>
              <div class="col-md-2">
                <input type="text" class="form-control" disabled="disabled" id="leavePositionBackName"
                       v-model="leavePositionBackName"/>
              </div>
            </div>
          </div>
          <div class="modal-body">
            <form action="">
              <legend><h5>请假</h5></legend>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">类型：</label>
                <div class="col-md-3">
                  <leaveType :leaveTypeName="leaveTypeBackName" ref="leaveType"
                             @leaveTypeChange='leaveTypeBackChange'></leaveType>
                </div>
                <label class="col-md-2 control-label text-right nopad">代理人：</label>
                <div class="col-md-3">
                  <agent :agentAccount="agentAccount" ref="agent" @agentChange="changeAgent"></agent>
                </div>
                <button type="button" data-toggle="modal" data-target="#agentChooseModel" @click="queryEmpByDept"><span
                  class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
              </div>
              <div class="form-group clearfix">
                <label for="startBackTime" class="col-md-2 control-label text-right nopad">开始日期：</label>
                <div class="col-md-3">
                  <input type="datetime-local" class="form-control" id="startBackTime" v-model="startBackTime"
                         disabled="disabled"/>
                </div>
                <label for="endBackTime" class="col-md-2 control-label text-right nopad">结束日期：</label>
                <div class="col-md-3">
                  <input type="datetime-local" class="form-control" id="endBackTime" v-model="endBackTime"
                         disabled="disabled"/>
                </div>
              </div>
            </form>
            <agentChoose ref="agentChoose" @getAgentInfo="getAgentInfo"></agentChoose>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-12">
              <button type="button" class="btn btn-warning">确认</button>
              <button type="button" data-dismiss="modal" class="btn btn-info">返回</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 请假报备审批 -->
    <div class="modal fade" id="reviewReportModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj"
         aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">请假报备</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <form action="">
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">类型：</label>
                <div class="col-md-3">
                  <leaveType :leaveTypeName="leaveTypeReviewName" ref="leaveTypeReview"></leaveType>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">部门：</label>
                <div class="col-md-3">
                  <department ref="departReview"></department>
                </div>
                <label class="col-md-2 control-label text-right nopad">请假人：</label>
                <div class="col-md-3">
                  <select class="form-control" disabled="true">
                    <option>{{deptReviewEmpName}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group clearfix">
                <label for="startReviewTime" class="col-md-2 control-label text-right nopad">开始时间：</label>
                <div class="col-md-3">
                  <input disabled="disabled" type="datetime-local" class="form-control" id="startReviewTime"
                         v-model="startReviewTime"/>
                </div>
                <label for="endReviewTime" class="col-md-2 control-label text-right nopad">结束时间：</label>
                <div class="col-md-3">
                  <input disabled="disabled" type="datetime-local" class="form-control" id="endReviewTime"
                         v-model="endReviewTime"/>
                </div>
              </div>
              <div class="form-group clearfix">
                <label for="leaveReviewRemark" class="col-md-2 control-label text-right nopad">请假原因：</label>
                <div class="col-md-10">
                  <textarea disabled="disabled" class="textarea" id="leaveReviewRemark" placeholder="请填写请假原因："
                            v-model="leaveReviewRemark"></textarea>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">审批人：</label>
                <div class="col-md-3">
                  <approvalLeaveAcc ref="approvalLeaveAccReview"></approvalLeaveAcc>
                </div>
              </div>
              <div class="form-group clearfix">
                <label for="checkRemark" class="col-md-2 control-label text-right nopad">审批意见：</label>
                <div class="col-md-10">
                  <textarea class="textarea" id="checkRemark" placeholder="由审批人填写" v-model="checkRemark"></textarea>
                </div>
              </div>
            </form>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-12">
              <button type="button" class="btn btn-info" @click="agree">同意</button>
              <button type="button" class="btn btn-warning" @click="disagree">不同意</button>
            </div>
          </div> <!-- /.modal-footer -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 请假报备修改 -->
    <div class="modal fade" id="reportEditModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabeltj"
         aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">请假报备修改</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <form action="">
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">类型：</label>
                <div class="col-md-3">
                  <leaveType :leaveTypeName="leaveTypeUpdateName" @leaveTypeChange='leaveTypeUpdateChange'></leaveType>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">部门：</label>
                <div class="col-md-3">
                  <department ref="departUpdate" @departChange='departUpdateChange'></department>
                </div>
                <label class="col-md-2 control-label text-right nopad">请假人：</label>
                <div class="col-md-3">
                  <deptEmp :deptEmpId="deptEmpUpdateId" ref="deptEmpUpdate"
                           @deptEmpChange='deptEmpUpdateChange'></deptEmp>
                </div>
              </div>
              <div class="form-group clearfix">
                <label for="startUpdateTime" class="col-md-2 control-label text-right nopad">开始日期：</label>
                <div class="col-md-3">
                  <input type="datetime-local" class="form-control" id="startUpdateTime" v-model="startUpdateTime"/>
                </div>
                <label for="endUpdateTime" class="col-md-2 control-label text-right nopad">结束日期：</label>
                <div class="col-md-3">
                  <input type="datetime-local" class="form-control" id="endUpdateTime" v-model="endUpdateTime"/>
                </div>
              </div>
              <div class="form-group clearfix">
                <label for="leaveUpdateRemark" class="col-md-2 control-label text-right nopad">请假原因：</label>
                <div class="col-md-10">
                  <textarea class="textarea" id="leaveUpdateRemark" placeholder="请填写请假原因："
                            v-model="leaveUpdateRemark"></textarea>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">审批人：</label>
                <div class="col-md-3">
                  <approvalLeaveAcc :accountID="accountUpdateID"
                                    @approvalChange='approvalUpdateChange'></approvalLeaveAcc>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">审批意见：</label>
                <div class="col-md-10">
                  <textarea class="textarea" placeholder="由审批人填写" disabled="disabled"></textarea>
                </div>
              </div>
            </form>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-12">
              <button type="button" class="btn btn-warning" @click="editReport">确认</button>
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
    data() {
      return {
        // 查询
        beginDate: this.getCurrentDay,
        endDate: this.getCurrentDay,
        departSelId: '',
        reportList: [],
        leaveName: '',
        state: '',
        stateList: [
          {value: '', label: '全部'},
          {value: '1', label: '待审批'},
          {value: '2', label: '同意'},
          {value: '3', label: '不同意'},
          {value: '4', label: '已销假'},
          {value: '5', label: '未销假'},
          {value: '6', label: '已取消'}
        ],

        // 申请
        leaveTypeName: '',
        departId: '',
        deptEmpId: '',
        startTime: '',
        endTime: '',
        leaveRemark: '',
        accountID: '',


        // 申请销假
        leaveEmpBackName: '',
        leaveDepartmentBackName: '',
        leavePositionBackName: '',
        leaveTypeBackName: '',
        startBackTime: '',
        endBackTime: '',
        leaveAccount: '',
        agentAccount: '',
        departmentId: '',

        // 审批
        leaveTypeReviewName: '',
        deptReviewEmpName: '',
        startReviewTime: '',
        endReviewTime: '',
        leaveReviewRemark: '',
        checkRemark: '',
        id: '',

        // 修改
        editId: '',
        leaveTypeUpdateName: '',
        departUpdateId: '',
        deptEmpUpdateId: '',
        startUpdateTime: '',
        endUpdateTime: '',
        leaveUpdateRemark: '',
        accountUpdateID: '',

      }
    },
    methods: {
      // ---------------------------------------查询----------------------------------
      departSelChange(departId) {
        this.departSelId = departId
      },
      queryReport() {      // 查询请假报备信息
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
          console.log('查询请求失败')
        });
      },

      // ---------------------------------------申请请假报备----------------------------------
      leaveTypeChange(val) { // 假期类型
        this.leaveTypeName = val
      },
      departAddChange(departId) {   // 部门
        this.departId = departId
        this.$refs.deptEmpAdd.getDeptId(departId)
        this.deptEmpId = ''
      },
      deptEmpChange(deptEmpId) {   // 部门员工
        this.deptEmpId = deptEmpId
      },
      approvalChange(accountID) {   // 审批人
        this.accountID = accountID
      },
      addModelClear() { // 清空添加模态框
        $('#reportAddModel').modal('hide');
        this.leaveTypeName = '',
          this.departId = this.$refs.departAdd.setDpart("0"),
          this.deptEmpId = '',
          this.startTime = '',
          this.endTime = '',
          this.leaveRemark = '',
          this.accountID = ''
      },
      addReport() {     // 添加请假报备信息
        if (this.isBlank(this.leaveTypeName)) {
          alert('请选择请假类型');
          return false;
        }
        if (this.isBlank(this.departId) || this.departId == 0) {
          alert('请选择部门');
          return false;
        }
        if (this.isBlank(this.deptEmpId)) {
          alert('请选择请假人');
          return false;
        }
        if (this.isBlank(this.startTime)) {
          alert('请假开始时间不能为空,或格式不正确');
          return false;
        }
        if (this.isBlank(this.endTime)) {
          alert('请假结束时间不能为空,或格式不正确');
          return false;
        }

        if (this.isBlank(this.leaveRemark)) {
          alert('请选择请假原因');
          return false;
        }
        if (this.isBlank(this.accountID)) {
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
            fillAccount: JSON.parse(Cookies.get("accountData")).account.account_ID,
            fillTime: this.getCurrentYYYY_MM_DD_HH_MM_SS(),
            leaveAccount: this.deptEmpId,
            startTime: this.startTime,
            endTime: this.endTime,
            leaveRemark: this.leaveRemark,
            checkAccount: this.accountID,
            updateTime: this.getCurrentYYYY_MM_DD_HH_MM_SS(),
          },
          dataType: 'json',
        }).then((response) => {
          console.log(response.data.retData)
        }).catch((error) => {
          console.log('申请报备请求失败')
          console.log(response.data.retData)
        });
        this.addModelClear();
        this.queryReport();
      },

      // ---------------------------------------销假----------------------------------
      leaveTypeBackChange(val) { // 假期类型
        this.leaveTypeBackName = val
      },
      changeAgent(val) {
        this.agentAccount = val //外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
      },
      applyReportBack(item) {
        if (JSON.parse(Cookies.get("accountData")).account.account_ID != item.leaveAccount) {
          alert("不能为他人申请销假")
        } else {
          if (item.type == '倒休') {
            alert("倒休不能申请销假,需要人工手动销假")
          } else {
            if (item.checkResult != 1) {
              alert("该报备未审批或未通过,不能申请销假")
            } else {
              this.leaveEmpBackName = item.leaveEmpName,
              this.leaveDepartmentBackName = item.leaveDepartmentName
              this.leavePositionBackName = item.leavePositionName
              this.leaveTypeBackName = item.type
              this.startBackTime = this.getYYYY_MM_DD_T_HH_MM(item.startTime)
              this.endBackTime = this.getYYYY_MM_DD_T_HH_MM(item.endTime)
              this.leaveAccount = item.leaveAccount
              this.$refs.agent.getLeaveAccount([item.leaveAccount, item.leaveDeptId])
              this.$refs.agentChoose.getLeaveAccount([item.leaveAccount, item.leaveDeptId])
              $('#reportBackApplyModel').modal('show');
            }
          }
        }
      },
      queryEmpByDept() {
        this.$refs.agentChoose.queryEmpByDept()
      },
      getAgentInfo(item) {
        this.$refs.agent.insertAgentInfo(item)
      },

      // ---------------------------------------审批----------------------------------
      reportReview(item) {
        if (item.checkAccount != JSON.parse(Cookies.get("accountData")).account.account_ID) {
          alert("无权对此条报备进行审批")
        } else {
          if (item.state == 2) {
            alert("该报备已取消,无需进行审批")
          } else {
            // 数据回显
            this.id = item.id
            this.leaveTypeReviewName = item.type
            this.$refs.departReview.setDpart(item.leaveDeptId)
            this.deptReviewEmpName = item.leaveEmpName
            this.startReviewTime = this.getYYYY_MM_DD_T_HH_MM(item.startTime)
            this.endReviewTime = this.getYYYY_MM_DD_T_HH_MM(item.endTime)
            this.leaveReviewRemark = item.leaveRemark
            this.$refs.approvalLeaveAccReview.setAccountId(item.checkAccount)
            // 组件禁用方法
            this.$refs.departReview.changeAble()
            this.$refs.leaveTypeReview.changeAble()
            this.$refs.approvalLeaveAccReview.changeAble()
            // 弹框
            $('#reviewReportModel').modal('show');
          }
        }
      },
      reviewReportClear() {
        $('#reviewReportModel').modal('hide');
        this.checkRemark = ''
      },
      agree() {
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/updateLeavePrepare',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            id: this.id,
            checkRemark: this.checkRemark,
            checkResult: '1',
            checkTime: this.getCurrentYYYY_MM_DD_HH_MM_SS(),
            updateTime: this.getCurrentYYYY_MM_DD_HH_MM_SS(),
          },
          dataType: 'json',
        }).then((response) => {
          if (response.data.retCode == '0000') {
            console.log('审批同意操作成功')
          } else {
            console.log('审批同意操作失败')
          }
        }).catch((error) => {
          console.log('审批同意请求失败')
        });
        this.reviewReportClear();
        this.queryReport();
      },
      disagree() {
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/updateLeavePrepare',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            id: this.id,
            checkRemark: this.checkRemark,
            checkResult: '0',
            checkTime: this.getCurrentYYYY_MM_DD_HH_MM_SS(),
            updateTime: this.getCurrentYYYY_MM_DD_HH_MM_SS(),
          },
          dataType: 'json',
        }).then((response) => {
          console.log("controller返回的信息" + response.data.retCode)
          if (response.data.retCode == '0000') {
            console.log('审批不同意操作成功')
          } else {
            console.log('审批不同意操作失败')
          }
        }).catch((error) => {
          console.log('审批不同意请求失败')
        });
        this.reviewReportClear();
        this.queryReport();
      },

      // ---------------------------------------修改----------------------------------
      leaveTypeUpdateChange(val) {
        this.leaveTypeUpdateName = val
      },
      departUpdateChange(val) {
        this.departUpdateId = val
        this.$refs.deptEmpUpdate.getDeptId(val)
        this.deptEmpUpdateId = ''
      },
      deptEmpUpdateChange(val) {   // 部门员工
        this.deptEmpUpdateId = val
      },
      approvalUpdateChange(val) {
        this.accountUpdateID = val
      },
      getEditInfo(item) {
        console.log(item)
        if (item.fillAccount != JSON.parse(Cookies.get("accountData")).account.account_ID) {
          alert("不能修改他人的报备!")
        } else {
          // 数据回显
          this.editId = item.id
          this.leaveTypeUpdateName = item.type
          this.departUpdateId = item.leaveDeptId
          this.$refs.departUpdate.setDpart(item.leaveDeptId)
          this.$refs.deptEmpUpdate.getDeptId(item.leaveDeptId)
          this.deptEmpUpdateId = item.leaveAccount
          this.startUpdateTime = this.getYYYY_MM_DD_T_HH_MM(item.startTime)
          this.endUpdateTime = this.getYYYY_MM_DD_T_HH_MM(item.endTime)
          this.leaveUpdateRemark = item.leaveRemark
          this.accountUpdateID = item.checkAccount
          // 弹框
          $('#reportEditModel').modal('show');
        }
      },
      editReport() {
        if (this.isBlank(this.leaveTypeUpdateName)) {
          alert('请选择请假类型');
          return false;
        }
        if (this.isBlank(this.departUpdateId) || this.departUpdateId == 0) {
          alert('请选择部门');
          return false;
        }
        if (this.isBlank(this.deptEmpUpdateId)) {
          alert('请选择请假人');
          return false;
        }
        if (this.isBlank(this.startUpdateTime)) {
          alert('请假开始时间不能为空,或格式不正确');
          return false;
        }
        if (this.isBlank(this.endUpdateTime)) {
          alert('请假结束时间不能为空,或格式不正确');
          return false;
        }

        if (this.isBlank(this.leaveUpdateRemark)) {
          alert('请选择请假原因');
          return false;
        }
        if (this.isBlank(this.accountUpdateID)) {
          alert('请选择审批人');
          return false;
        }
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/updateLeavePrepare',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            id: this.editId,
            type: this.leaveTypeUpdateName,
            leaveAccount: this.deptEmpUpdateId,
            startTime: this.startUpdateTime,
            endTime: this.endUpdateTime,
            leaveRemark: this.leaveUpdateRemark,
            checkAccount: this.accountUpdateID,
            updateTime: this.getCurrentYYYY_MM_DD_HH_MM_SS(),
            state: ''
          },
          dataType: 'json',
        }).then((response) => {
          if (response.data.retCode == '0000') {
            this.queryReport();
            console.log('修改操作成功')
          } else {
            console.log('修改操作失败')
          }
        }).catch((error) => {
          console.log('修改请求失败')
        });
        $('#reportEditModel').modal('hide');
      },

      // ---------------------------------------销假----------------------------------
      reportBack(item) {
        console.log(item.checkResult)
        if (item.checkResult != 1) {
          alert("该报备未审批或未通过,不能申请销假")
        } else {
          this.editId = item.id
          let msg = confirm("确认销假?")
          if (msg) {
            axios({
              method: 'post',
              url: this.url + '/leavePrepareController/updateLeavePrepare',
              headers: {
                'Content-Type': this.contentType,
                'Access-Token': this.accessToken
              },
              data: {
                id: this.editId,
                updateTime: this.getCurrentYYYY_MM_DD_HH_MM_SS(),
                state: '1'
              },
              dataType: 'json',
            }).then((response) => {
              if (response.data.retCode == '0000') {
                this.queryReport();
                console.log('销假操作成功')
              } else {
                console.log('销假操作失败')
              }
            }).catch((error) => {
              console.log('销假请求失败')
            });
          }
        }
      },

      // ---------------------------------------取消----------------------------------
      reportCancel(item) {
        if (item.leaveAccount != JSON.parse(Cookies.get("accountData")).account.account_ID) {
          alert("不能取消他人的报备!")
        } else {
          if (item.state == 2) {
            alert("该报备已取消")
          } else {
            this.editId = item.id
            let msg = confirm("确认取消?")
            if (msg) {
              axios({
                method: 'post',
                url: this.url + '/leavePrepareController/updateLeavePrepare',
                headers: {
                  'Content-Type': this.contentType,
                  'Access-Token': this.accessToken
                },
                data: {
                  id: this.editId,
                  updateTime: this.getCurrentYYYY_MM_DD_HH_MM_SS(),
                  state: '2'
                },
                dataType: 'json',
              }).then((response) => {
                if (response.data.retCode == '0000') {
                  this.queryReport();
                  console.log('取消操作成功')
                } else {
                  console.log('取消操作失败')
                }
              }).catch((error) => {
                console.log('取消请求失败')
              });
            }
          }
        }
      }
    },
  }
</script>
<style>
  @-moz-document url-prefix() {
    fieldset {
      display: table-cell;
    }
  }

  .nopad {
    padding-left: 0;
    padding-right: 0;
    line-height: 34px;
  }

  .user-container {
    background-color: #fff;
    width: 100%;
    padding: 0 20px;
  }

  .main-title h2 {
    line-height: 50px;
  }

  .m_r_10 {
    margin-right: 10px;
  }

  .textarea {
    resize: none;
    width: 79%;
    height: 80px;
  }

  input[type="date"] {
    line-height: 26px !important;
  }
</style>


