<!-- author:dingdong -->
<!-- author:2019-8-19 -->
<!-- date:2019-8-30 -->
<template>
  <div class="container user-container" id="report-app" v-cloak>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 main-title">
        <h2>请假报备管理</h2>
      </div>
    </div>
    <div class="form-group clearfix col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" id="date">

         <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding-left: 0;">
            <label class="control-label text-left nopad">填写日期：</label>
         </div>
         <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0;">
            <date-picker v-model="beginDate" type="date" class="queryDate"></date-picker>
         </div>
          <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
            <span class="nopad">~</span>
          </div>
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0;">
            <date-picker v-model="endDate" type="date" class="queryDate"></date-picker>
          </div>
      </div>
      <!-- <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
       <div class="input-group">
         <span class="input-group-addon"  style="border: 1px solid #ccc;border-radius: 4px;background-color: transparent;">填写日期</span>
         <input type="date" value="" id="firstTime" v-model="beginDate" style="border: 1px solid #ccc;border-radius: 4px; margin-right: 6px; "/></span>
         <span style="padding: 0; line-height: 34px;">&nbsp;~&nbsp;</span>
         <input type="date" value="" id="secondTime" v-model="endDate" style="border: 1px solid #ccc;border-radius: 4px; margin-left: 6px; "/></span>
       </div>
      -->
      <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <label class="control-label text-left nopad">请假人部门：</label>
          </div>
          <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8" id="dept" style=" padding: 0;">
            <department ref="departSel" @departChange='departSelChange'></department>
        </div>
      </div>

      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0;">
            <label class="control-label text-left nopad">姓名：</label>
          </div>
          <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8" id="username" style="padding-right: 0;">
            <input type="text" class="form-control" placeholder="Username" v-model="leaveName">
          </div>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" style="padding: 0;">
              <label class="control-label text-left nopad">状态：</label>
            </div>
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8" id="status" style="padding-right: 0;">
              <select class="form-control" v-model="state">
                <option v-for="(item,index) in stateList" :key="index" :value="item.value">
                  {{item.label}}
                </option>
              </select>
            </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-md-offset-9">
        <button type="button" class="btn btn-warning pull-right m_r_10"
                v-if='has(51)||hasPosId(33)||hasPosId(34)||hasPosId(64)||hasPosId(74)||hasPosId(94)||hasPosType(5)||hasPosType(6)'
                @click="exportTableToExcel('reportTable','请假报备表')">导出
        </button>
        <button type="button" class="btn btn-info pull-right m_r_10"
                v-if='has(51)||hasPosId(33)||hasPosId(34)||hasPosId(64)||hasPosId(74)||hasPosId(94)||hasPosType(5)||hasPosType(6)'
                @click="addBtn">申请
        </button>
        <button type="button" class="btn btn-primary pull-right m_r_10" @click="queryReport">查询</button>
      </div>
    </div>
    <br>
    <!-- 查询结果集 -->
    <div class="row">
      <div class="col-md-12">
        <div class="pre-scrollable">
          <table class="table table-bordered table-hover text-nowrap" id="reportTable">
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
              <th class="text-center"
                  v-if='has(51)||hasPosId(33)||hasPosId(34)||hasPosId(64)||hasPosId(74)||hasPosId(94)||hasPosType(5)||hasPosType(6)'>审批
              </th>
              <th class="text-center"
                  v-if='has(51)||hasPosId(33)||hasPosId(34)||hasPosId(64)||hasPosId(74)||hasPosId(94)||hasPosType(5)||hasPosType(6)'>修改
              </th>
              <th class="text-center"
                  v-if='has(51)||hasPosId(33)||hasPosId(34)||hasPosId(64)||hasPosId(74)||hasPosId(94)||hasPosType(5)||hasPosType(6)'>销假
              </th>
              <th class="text-center"
                  v-if='has(51)||hasPosId(33)||hasPosId(34)||hasPosId(64)||hasPosId(74)||hasPosId(94)||hasPosType(5)||hasPosType(6)'>取消报备
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in reportList" :key="index"
                :style="item.state == 1? {'color':'#337ab7'}:(item.state == 2? {'color':'#1cc09f'}:{'color':''})">
              <td class="text-center">{{item.type}}</td>
              <td class="text-center">{{item.leaveEmpName}}</td>
              <td class="text-center">{{item.leaveDepartmentName}}</td>
              <td class="text-center">{{item.startTime|dateFormat}}</td>
              <td class="text-center">{{item.endTime|dateFormat}}</td>
              <td class="text-center">{{item.leaveRemark}}</td>
              <td class="text-center">{{item.fillEmpName}}</td>
              <td class="text-center">{{item.fillDepartmentName}}</td>
              <td class="text-center">{{item.fillTime|dateFormat}}</td>
              <td class="text-center">{{item.checkEmpName}}</td>
              <td class="text-center">{{item.checkTime|dateFormat}}</td>
              <td class="text-center">
                {{item.checkResult == 0? '不同意':(item.checkResult == 1? '同意':'')}}
              </td>
              <td class="text-center">{{item.checkRemark}}</td>
              <td class="text-center">
                {{item.state == 1? '已销假':(item.state == 2? '已取消':'')}}
              </td>
              <td class="text-center">
                <button type="button" class="btn btn-sm btn-primary"
                        :disabled="item.state==1? true:false"
                        @click="applyReportBackBtn(item)"><b>申请销假</b>
                </button>
              </td>
              <td class="text-center"
                  v-if='has(51)||hasPosId(33)||hasPosId(34)||hasPosId(64)||hasPosId(74)||hasPosId(94)||hasPosType(5)||hasPosType(6)'>
                <button type="button" class="btn btn-sm btn-info"
                        :disabled="item.checkResult==0? true:(item.checkResult == 1? true:false)"
                        @click="reportReview(item)"><b>审批</b>
                </button>
              </td>
              <td class="text-center"
                  v-if='has(51)||hasPosId(33)||hasPosId(34)||hasPosId(64)||hasPosId(74)||hasPosId(94)||hasPosType(5)||hasPosType(6)'>
                <button type="button" class="btn btn-sm btn-warning"
                        :disabled="item.state==1? true:false"
                        @click="getEditInfo(item)"><b>修改</b>
                </button>
              </td>
              <td class="text-center"
                  v-if='has(51)||hasPosId(33)||hasPosId(34)||hasPosId(64)||hasPosId(74)||hasPosId(94)||hasPosType(5)||hasPosType(6)'>
                <button type="button" class="btn btn-sm btn-info"
                        :disabled="item.state==1? true:false"
                        @click="reportBack(item)"><b>销假</b>
                </button>
              </td>
              <td class="text-center"
                  v-if='has(51)||hasPosId(33)||hasPosId(34)||hasPosId(64)||hasPosId(74)||hasPosId(94)||hasPosType(5)||hasPosType(6)'>
                <button type="button" class="btn btn-sm btn-danger"
                        :disabled="item.state==1? true:false"
                        @click="reportCancel(item)"><b>取消报备</b>
                </button>
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
            <button type="button" class="close" data-dismiss="modal" @click="addModelClear">
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
                <label class="col-md-2 control-label text-right nopad">请假时间：</label>
                <div class="col-md-8">
                  <date-picker v-model="startTime" type="datetime" format="YYYY-MM-DD HH:mm"></date-picker>
                  <span class="select-box-title">~</span>
                  <date-picker v-model="endTime" type="datetime" format="YYYY-MM-DD HH:mm"></date-picker>
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
                  <approvalLeaveAcc :accountID="accountID" ref="approval" @approvalChange='approvalChange'></approvalLeaveAcc>
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
              <label class="col-md-2 control-label text-right nopad">申请人姓名：</label>
              <div class="col-md-2">
                <span class="nopad">{{leaveEmpBackName}}</span>
              </div>
              <label class="col-md-1 control-label text-right nopad">部门：</label>
              <div class="col-md-2">
                <span class="nopad">{{leaveDepartmentBackName}}</span>
              </div>
              <label class="col-md-1 control-label text-right nopad">职位：</label>
              <div class="col-md-2">
                <span class="nopad">{{leavePositionBackName}}</span>
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
                <label class="col-md-1 control-label text-right nopad">代理人：</label>
                <div class="col-md-3">
                  <agent :agentAccount="agentAccount" ref="agent" @agentChange="changeAgent"></agent>
                </div>
                <button type="button" class="btn btn-sm btn-warning glyphicon glyphicon-plus" aria-hidden="true"
                        data-toggle="modal" data-target="#agentChooseModel" @click="queryEmpByDept">
                </button>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">请假时间：</label>
                <div class="col-md-8">
                  <date-picker v-model="startBackTime" type="datetime" format="YYYY-MM-DD HH:mm" disabled="disabled"></date-picker>
                  <span class="select-box-title">~</span>
                  <date-picker v-model="endBackTime" type="datetime" format="YYYY-MM-DD HH:mm" disabled="disabled"></date-picker>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-2 control-label text-right nopad">说明：</label>
                <div class="col-md-10">
                  <textarea class="textarea" placeholder="请填写请假原因：" v-model="leaveBackRemark"></textarea>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-1 control-label text-right nopad">审查人：</label>
                <div class="col-md-2">
                  <examine :examineAccount="examineAccount" ref="examine" @examineChange="examineChange"></examine>
                </div>
                <div class="col-md-1">
                  <button type="button" class="btn btn-sm btn-warning glyphicon glyphicon-plus" aria-hidden="true"
                          data-toggle="modal" @click="addExamineOption" :disabled="isAbleForExamine">
                  </button>
                </div>
                <label class="col-md-1 control-label text-right nopad">备注：</label>
                <div class="col-md-3">
                  <input type="text" class="form-control" disabled="disabled"/>
                </div>
                <div class="col-md-1 col-md-offset-1">
                  <button type="button" class="btn btn-sm btn-warning" disabled="disabled">同意</button>
                </div>
                <div class="col-md-1">
                  <button type="button" class="btn btn-sm btn-warning" disabled="disabled">不同意</button>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-1 control-label text-right nopad">审核人：</label>
                <div class="col-md-2">
                  <check :checkAccount="checkAccount" ref="check" @checkChange="checkChange"></check>
                </div>
                <div class="col-md-1">
                  <button type="button" class="btn btn-sm btn-warning glyphicon glyphicon-plus" aria-hidden="true"
                          data-toggle="modal" @click="addCheckOption" :disabled="isAbleForCheck">
                  </button>
                </div>
                <label class="col-md-1 control-label text-right nopad">备注：</label>
                <div class="col-md-3">
                  <input type="text" class="form-control" disabled="disabled"/>
                </div>
                <div class="col-md-1 col-md-offset-1">
                  <button type="button" class="btn btn-sm btn-warning" disabled="disabled">同意</button>
                </div>
                <div class="col-md-1">
                  <button type="button" class="btn btn-sm btn-warning" disabled="disabled">不同意</button>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-1 control-label text-right nopad">批准人：</label>
                <div class="col-md-2">
                  <approve :approveAccount="approveAccount" ref="approve" @approveChange="approveChange"></approve>
                </div>
                <div class="col-md-1">
                  <button type="button" class="btn btn-sm btn-warning glyphicon glyphicon-plus" aria-hidden="true"
                          data-toggle="modal" @click="addApproveOption" :disabled="isAbleForApprove">
                  </button>
                </div>
                <label class="col-md-1 control-label text-right nopad">备注：</label>
                <div class="col-md-3">
                  <input type="text" class="form-control" disabled="disabled"/>
                </div>
                <div class="col-md-1 col-md-offset-1">
                  <button type="button" class="btn btn-sm btn-warning" disabled="disabled">同意</button>
                </div>
                <div class="col-md-1">
                  <button type="button" class="btn btn-sm btn-warning" disabled="disabled">不同意</button>
                </div>
              </div>
              <div class="form-group clearfix">
                <label class="col-md-1 control-label text-right nopad">报备人：</label>
                <div class="col-md-2">
                  <select class="form-control">
                    <option>李珊珊</option>
                  </select>
                </div>
                <label class="col-md-2 control-label text-right nopad">备注：</label>
                <div class="col-md-3">
                  <input type="text" class="form-control" disabled="disabled"/>
                </div>
                <div class="col-md-1 col-md-offset-1">
                  <button type="button" class="btn btn-sm btn-warning" disabled="disabled">同意</button>
                </div>
                <div class="col-md-1">
                  <button type="button" class="btn btn-sm btn-warning" disabled="disabled">不同意</button>
                </div>
              </div>
            </form>
            <agentChoose ref="agentChoose" @getAgentInfo="getAgentInfo"></agentChoose>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-12">
              <button type="button" class="btn btn-warning" @click="addReportToLeave">确认</button>
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
                <label class="col-md-2 control-label text-right nopad">请假时间：</label>
                <div class="col-md-8">
                  <date-picker v-model="startReviewTime" type="datetime" format="YYYY-MM-DD HH:mm" disabled="disabled"></date-picker>
                  <span class="select-box-title">~</span>
                  <date-picker v-model="endReviewTime" type="datetime" format="YYYY-MM-DD HH:mm" disabled="disabled"></date-picker>
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
                <label class="col-md-2 control-label text-right nopad">请假时间：</label>
                <div class="col-md-8">
                  <date-picker v-model="startUpdateTime" type="datetime" format="YYYY-MM-DD HH:mm" :minute-step="10"></date-picker>
                  <span class="select-box-title">~</span>
                  <date-picker v-model="endUpdateTime" type="datetime" format="YYYY-MM-DD HH:mm" :minute-step="10"></date-picker>
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

  import DatePicker from 'vue2-datepicker'
  import axios from 'axios'
  import moment from 'moment'
  import Cookies from 'js-cookie'
  import department from '../vuecommon/department.vue'
  import leaveType from '../vuecommon/LeaveType.vue'
  import deptEmp from '../vuecommon/deptEmp.vue'
  import agent from './subReportAndClock/agent.vue'
  import approvalLeaveAcc from '../vuecommon/approvalLeaveAcc.vue'
  import agentChoose from './subReportAndClock/agentChoose.vue'
  import examine from './subReportAndClock/examineReport.vue'
  import check from './subReportAndClock/checkReport.vue'
  import approve from './subReportAndClock/approveReport.vue'

  export default {
    components: {
      DatePicker,
      department,
      leaveType,
      deptEmp,
      approvalLeaveAcc,
      agent,
      agentChoose,
      examine,
      check,
      approve
    },
    data() {
      return {
        // 查询
        beginDate: this.$currentDate(),
        endDate: this.$currentDate(),
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
        startTime: this.$addStartTime(),
        endTime: this.$addEndTime(),
        leaveRemark: '',
        accountID: '',

        // 申请销假
        reportId: '',
        leaveEmpBackName: '',
        leaveDepartmentBackName: '',
        leavePositionBackName: '',
        leaveTypeBackName: '',
        startBackTime: '',
        endBackTime: '',
        leaveBackRemark: '',

        // 账户
        leaveAccount: '',     // 请假人
        agentAccount: '',     // 代理人
        examineAccount: '',   // 审查人
        checkAccount: '',     // 审核人
        approveAccount: '',   // 批准人
        reportAccount: '1127',// 报备人(暂时固定为李珊珊)
        // 初始化数据
        deptInitId: '',
        typeId: 0,
        // 审查人组件
        deptExamineId: '',
        typeExamineId: '',
        // 审核人组件
        deptCheckId: '',
        typeCheckId: '',
        // 批准人组件
        deptApproveId: '',
        typeApproveId: '',

        parentId: '',
        fillTypeId: '',
        fillAccount: '',

        // 审批
        leaveTypeReviewName: '',
        deptReviewEmpName: '',
        startReviewTime: '',
        endReviewTime: '',
        leaveReviewRemark: '',
        checkRemark: '',
        id: '',
        ids:[],

        // 修改
        editId: '',
        leaveTypeUpdateName: '',
        departUpdateId: '',
        deptEmpUpdateId: '',
        startUpdateTime: '',
        endUpdateTime: '',
        leaveUpdateRemark: '',
        accountUpdateID: '',
        // 按钮状态
        isAbleForExamine: false,
        isAbleForCheck: false,
        isAbleForApprove: false,
        days: 0,
        clickTimeForExamine: 0,
        clickTimeForCheck: 0
      }
    },
    methods: {
      //---------------------------------------清空操作----------------------------------
      addModelClear() { // 清空添加模态框
        this.leaveTypeName = ''
        this.departId = this.$refs.departAdd.setDpart("0")
        this.deptEmpId = ''
        this.startTime = this.$addStartTime()
        this.endTime = this.$addEndTime()
        this.leaveRemark = ''
      },
      reviewReportClear() { // 清空审批模态框
        $('#reviewReportModel').modal('hide');
        this.checkRemark = ''
      },
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
            startTime: this.$queryStartTime(this.beginDate),
            endTime: this.$queryEndTime(this.endDate),
            leaveDeptId: this.departSelId,
            leaveEmpName: this.leaveName,
            accountId: this.has(51) ? '' : JSON.parse(Cookies.get("accountData")).account.account_ID,
            state: this.state
          },
          dataType: 'json',
        }).then((response) => {
          console.log(response.data.retData)
          this.reportList = response.data.retData
        }).catch((error) => {
          console.log('查询请求失败')
        });
      },

      // ---------------------------------------添加----------------------------------
      addBtn() { // 申请按钮
        this.addModelClear()
        $('#reportAddModel').modal('show')
      },
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
      approvalChange(val) {   // 审批人
        this.accountID = val
      },
      addReport() {     // 添加请假报备信息
        if (this.isBlank(this.leaveTypeName)) {
          alert('请选择请假类型!');
          return false;
        }
        if (this.isBlank(this.departId) || this.departId == 0) {
          alert('请选择部门!');
          return false;
        }
        if (this.isBlank(this.deptEmpId)) {
          alert('请选择请假人!');
          return false;
        }
        if (this.isBlank(this.startTime)) {
          alert('请选择开始时间!');
          return false;
        }
        if (this.isBlank(this.endTime)) {
          alert('请选择结束时间!');
          return false;
        }

        if (this.isBlank(this.leaveRemark)) {
          alert('请选择请假原因');
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
            fillTime: this.$currentTime(),
            leaveAccount: this.deptEmpId,
            startTime: this.$YYYY_MM_DD_HH_mm(this.startTime),
            endTime: this.$YYYY_MM_DD_HH_mm(this.endTime),
            leaveRemark: this.leaveRemark,
            checkAccount: this.accountID,
            updateTime: this.$currentTime()
          },
          dataType: 'json',
        }).then(response => {
          $('#reportAddModel').modal('hide');
          this.queryReport();
          console.log(response.data.retData)
        }).catch(err => {
          console.log(err)
        });
      },

      // ---------------------------------------申请销假----------------------------------
      leaveTypeBackChange(val) { // 假期类型
        this.leaveTypeBackName = val
      },
      changeAgent(val) {
        this.agentAccount = val //外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
      },
      examineChange(val) {
        this.examineAccount = val
      },
      checkChange(val) {
        this.checkAccount = val
      },
      approveChange(val) {
        this.approveAccount = val
      },
      // 申请销假按钮
      applyReportBackBtn(item) {
        if (JSON.parse(Cookies.get("accountData")).account.account_ID != item.leaveAccount) {
          alert("不能为他人申请销假")
          return false;
        }
        if (item.type == '倒休') {
          alert("倒休不能申请销假,需要人工手动销假")
          return false;
        }
        if (item.checkResult != 1) {
          alert("该报备未审批或未通过,不能申请销假")
          return false;
        }
        this.id = item.id
        this.getIds(item);
      },
      getIds:function (item) {
        const url = this.url + '/leavePrepareController/queryIdsForLeave'
        axios.get(url).then((response) =>{
          console.log(response.data.retData);
          this.ids = response.data.retData;
          if(this.ids.indexOf(this.id) > -1){
            alert("该报备已提交过申请，请查看【请假】状态！")
            return false;
          }
          this.$refs.examine.initParam();  //  初始化参数
          this.$refs.check.initParam();
          this.$refs.approve.initParam();
          this.$refs.agent.initParamNull();
          this.toLoad(item);  //  加载数据
          $('#reportBackApplyModel').modal('show');  //  弹框
        }).catch(function (error) {
          console.log(error);
          alert("get请求失败");
        })
      },
      // 加载数据
      toLoad(item) {
        //  回显数据
        this.deptExamineId = ''
        this.deptCheckId = ''
        this.deptApproveId = ''
        this.clickTimeForExamine = 0
        this.clickTimeForCheck = 0
        this.clickTimeForApprove = 0
        this.reportId = item.id
        this.leaveAccount = item.leaveAccount
        this.leaveEmpBackName = item.leaveEmpName // 申请人姓名
        this.leaveDepartmentBackName = item.leaveDepartmentName // 部门
        this.leavePositionBackName = item.leavePositionName // 职位
        this.leaveTypeBackName = item.type  // 类型
        this.startBackTime = item.startTime // 请假开始时间
        this.endBackTime = item.endTime // 请假结束时间
        this.leaveBackRemark = item.leaveRemark // 请假说明
        // 计算时间差
        let d1 = moment(this.startBackTime)
        let d2 = moment(this.endBackTime)
        this.days = d2.diff(d1, 'day')
        const duration = moment.duration(d2.diff(d1))
        const hours = duration.hours()
        if (hours >= 8) {
          this.days++
        }
        //  组件数据
        this.$refs.agent.getLeaveAccount([item.leaveAccount, item.leaveDeptId])
        this.$refs.agentChoose.getLeaveAccount([item.leaveAccount, item.leaveDeptId])
        this.deptInitId = item.leaveDeptId  // 获取初始化的部门ID(请假人部门)
        this.typeId = item.typeId // 获取请假人职务级别
        this.fillTypeId = item.fillTypeId // 获取填表人职务级别
        this.fillAccount = item.fillAccount// 填表人账户
        //  传值给子组件
        this.$refs.examine.getApplyAccount(this.leaveAccount)
        this.$refs.examine.getDeptId(this.deptInitId)
        this.$refs.examine.getTypeId(this.typeId)
        this.$refs.check.getApplyAccount(this.leaveAccount)
        this.$refs.check.getDeptId(this.deptInitId)
        this.$refs.check.getTypeId(this.typeId)
        this.$refs.approve.getApplyAccount(this.leaveAccount)
        this.$refs.approve.getDeptId(this.deptInitId)
        this.$refs.approve.getTypeId([this.typeId, this.days])
        if (this.typeId <= 3) {
          if (this.fillTypeId == 4) {
            this.$refs.examine.insertCheckInfo([item.fillAccount, item.fillEmpName])
            this.$refs.examine.changeAble();
            this.isAbleForExamine = "disabled";
          } else {
            this.isAbleForExamine = false;
            this.$refs.examine.getExamineList();
          }
          if (this.fillTypeId == 5) {
            this.$refs.check.insertCheckInfo([item.fillAccount, item.fillEmpName])
            this.$refs.check.changeAble();
            this.isAbleForCheck = "disabled";
            this.$refs.approve.insertCheckInfo([item.fillAccount, item.fillEmpName])
            this.$refs.approve.changeAble();
            this.isAbleForApprove = "disabled";
          } else {
            this.isAbleForCheck = false;
            this.$refs.check.getCheckList();
            this.isAbleForApprove = false;
            this.$refs.approve.getApproveList();
          }
        }
        if (this.typeId == 4) {
          if (this.fillTypeId == 5) {
            this.$refs.examine.insertCheckInfo([item.fillAccount, item.fillEmpName])
            this.$refs.examine.changeAble();
            this.isAbleForExamine = "disabled";
            this.$refs.check.insertCheckInfo([item.fillAccount, item.fillEmpName])
            this.$refs.check.changeAble();
            this.isAbleForCheck = "disabled";
          } else {
            this.isAbleForExamine = false;
            this.$refs.examine.getExamineList();
            this.isAbleForCheck = false;
            this.$refs.check.getCheckList();
          }
          if (this.fillTypeId == 6) {
            this.$refs.approve.insertCheckInfo([item.fillAccount, item.fillEmpName])
            this.$refs.approve.changeAble();
            this.isAbleForApprove = "disabled";
          } else {
            this.isAbleForApprove = false;
            this.$refs.approve.getApproveList();
          }
        }
        if (this.typeId == 5) {
          if (this.fillTypeId == 6) {
            this.$refs.examine.insertCheckInfo([item.fillAccount, item.fillEmpName])
            this.$refs.examine.changeAble();
            this.isAbleForExamine = "disabled";
            this.$refs.check.insertCheckInfo([item.fillAccount, item.fillEmpName])
            this.$refs.check.changeAble();
            this.isAbleForCheck = "disabled";
          } else {
            this.isAbleForExamine = false;
            this.$refs.examine.getExamineList();
            this.isAbleForCheck = false;
            this.$refs.check.getCheckList();
          }
          if (this.fillAccount == 67) { // 如果填表人是副总经理
            this.$refs.approve.insertCheckInfo([item.fillAccount, item.fillEmpName])
            this.$refs.approve.changeAble();
            this.isAbleForApprove = "disabled";
          } else {
            this.isAbleForApprove = false;
            this.$refs.approve.getApproveList();
          }
        }
        if (this.typeId == 6) {
          if (this.fillAccount == 1127) {
            this.$refs.examine.insertCheckInfo([item.fillAccount, item.fillEmpName])
            this.$refs.examine.changeAble();
            this.isAbleForExamine = "disabled";
          } else {
            this.isAbleForExamine = false;
            this.$refs.examine.getExamineList();
          }
          if (this.fillAccount == 67) {
            this.$refs.check.insertCheckInfo([item.fillAccount, item.fillEmpName])
            this.$refs.check.changeAble();
            this.isAbleForCheck = "disabled";
            this.$refs.approve.insertCheckInfo([item.fillAccount, item.fillEmpName])
            this.$refs.approve.changeAble();
            this.isAbleForApprove = "disabled";
          } else {
            this.isAbleForCheck = false;
            this.$refs.check.getCheckList();
            this.isAbleForApprove = false;
            this.$refs.approve.getApproveList();
          }
        }
      },
      queryEmpByDept() {
        this.$refs.agentChoose.queryEmpByDept()
      },
      getAgentInfo(item) {
        this.$refs.agent.insertAgentInfo(item)
      },
      changeExamineAddAble() {
        this.isAbleForExamine = "disabled"
      },
      // 添加审查人
      addExamineOption() {
        if (this.isBlank(this.deptExamineId)) {  // 首次加载初始化参数
          this.deptExamineId = this.deptInitId // 部门
        }
        this.clickTimeForExamine++
        this.$refs.examine.getClickTime(this.clickTimeForExamine)
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/queryParentDept',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            deptId: this.deptExamineId
          },
          dataType: 'json',
        }).then(response => {
          console.log(response.data.retData)
          this.parentId = response.data.retData // 获取请假人的父级部门ID
          if (this.deptExamineId == '0') { // 当下一次初始部门ID为0时(没有父级部门时)
            this.$refs.examine.getDeptId(this.deptInitId) // 传初始化参数给子组件
            this.deptExamineId = this.deptInitId; // 下一轮初始的部门ID为初始参数
            this.typeExamineId = this.$refs.examine.setTypeId();// 获得到positionTypeId的值
            if (this.typeExamineId <= 6) {
              if (this.typeId <= 3) {
                this.$refs.examine.type3(this.typeExamineId);
              }
              if (this.typeId == 4) {
                this.$refs.examine.type4(this.typeExamineId);
              }
              if (this.typeId == 5) {
                if (this.$refs.examine.setRound() == 2) {
                  this.$refs.examine.initType5()
                }
                this.$refs.examine.type5(this.typeExamineId);
              }
            }
          } else {
            if (this.typeId <= 5) {
              this.$refs.examine.getDeptId(this.parentId) // 传父级部门ID给子组件
              this.deptExamineId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
            }
            if (this.typeId == 6) {
              this.$refs.examine.type6(6);
              if (this.$refs.examine.setClickTime() == 3) {
                this.$refs.examine.getDeptId(this.deptExamineId)
              }
              if (this.$refs.examine.setClickTime() > 3) {
                this.$refs.examine.getDeptId(this.parentId)
                this.deptExamineId = this.parentId;
              }
            }
          }
          this.$refs.examine.getExamineList();  // 调用子组件方法
        }).catch(err => {
          console.log(err)
        });
      },
      changeCheckAddAble() {
        this.isAbleForCheck = "disabled"
      },
      // 添加审核人
      addCheckOption() {
        if (this.isBlank(this.deptCheckId)) {  // 首次加载初始化参数
          this.deptCheckId = this.deptInitId // 部门
        }
        this.clickTimeForCheck++
        this.$refs.check.getClickTime(this.clickTimeForCheck)
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/queryParentDept',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            deptId: this.deptCheckId
          },
          dataType: 'json',
        }).then(response => {
          console.log(response.data.retData)
          this.parentId = response.data.retData // 获取请假人的父级部门ID
          if (this.deptCheckId == '0') { // 当下一次初始部门ID为0时(没有父级部门时)
            this.$refs.check.getDeptId(this.deptInitId) // 传初始化参数给子组件
            this.deptCheckId = this.deptInitId; // 下一轮初始的部门ID为初始参数
            this.typeCheckId = this.$refs.check.setTypeId();
            if (this.typeCheckId <= 6) {
              if (this.typeId <= 3) {
                this.$refs.check.type3(this.typeCheckId);
              }
              if (this.typeId == 4) {
                this.$refs.check.type4(this.typeCheckId);
              }
              if (this.typeId == 5) {
                if (this.$refs.check.setRound() == 2) {
                  this.$refs.check.initType5()
                }
                this.$refs.check.type5(this.typeCheckId);
              }
            }
          } else {
            if (this.typeId <= 5) {
              this.$refs.check.getDeptId(this.parentId) // 传父级部门ID给子组件
              this.deptCheckId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
            }
            if (this.typeId == 6) {
              this.$refs.check.type6(6);
              if (this.$refs.check.setClickTime() == 2) {
                this.$refs.check.getDeptId(this.deptCheckId)
              }
              if (this.$refs.check.setClickTime() > 2) {
                this.$refs.check.getDeptId(this.parentId)
                this.deptCheckId = this.parentId;
              }
            }
          }
          this.$refs.check.getCheckList();  // 调用子组件方法
        }).catch(err => {
          console.log(err)
        });
      },
      changeApproveAddAble() {
        this.isAbleForApprove = "disabled"
      },
      // 添加批准人
      addApproveOption() {
        if (this.isBlank(this.deptApproveId)) {  // 首次加载初始化参数
          this.deptApproveId = this.deptInitId // 部门
        }
        this.clickTimeForApprove++
        this.$refs.approve.getClickTime(this.clickTimeForApprove)
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/queryParentDept',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            deptId: this.deptApproveId
          },
          dataType: 'json',
        }).then(response => {
          console.log(response.data.retData)
          this.parentId = response.data.retData // 获取请假人的父级部门ID
          if (this.deptApproveId == '0') { // 当下一次初始部门ID为0时(没有父级部门时)
            this.$refs.approve.getDeptId(this.deptInitId) // 传初始化参数给子组件
            this.deptApproveId = this.deptInitId; // 下一轮初始的部门ID为初始参数
            this.typeApproveId = this.$refs.approve.setTypeId();
            if (this.typeApproveId <= 6) {
              if (this.typeId <= 3) {
                if (this.days < 3) {
                  this.$refs.approve.type3(this.typeApproveId);
                }
                if (this.days >= 3) {
                  this.$refs.approve.type4(this.typeApproveId);
                }
              }
              if (this.typeId == 4) {
                this.$refs.approve.type4(this.typeApproveId);
              }
            }
          } else {
            if (this.typeId <= 4) {
              this.$refs.approve.getDeptId(this.parentId) // 传父级部门ID给子组件
              this.deptApproveId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
            }
            if (this.typeId == 5 || (this.typeId == 6 && this.days < 3)) {
              this.$refs.approve.type5(this.typeId);
              if (this.$refs.approve.setClickTime() == 1) {
                this.$refs.approve.getDeptId(this.deptApproveId)
              }
              if (this.$refs.approve.setClickTime() > 1) {
                this.$refs.approve.getDeptId(this.parentId) // 传父级部门ID给子组件
                this.deptApproveId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
              }
            }
            if (this.typeId == 6 && this.days >= 3) {
              this.$refs.approve.type6(this.typeId);
              if (this.$refs.approve.setClickTime() == 2) {
                this.$refs.approve.getDeptId(this.deptApproveId)
              }
              if (this.$refs.approve.setClickTime() > 2) {
                this.$refs.approve.getDeptId(this.parentId) // 传父级部门ID给子组件
                this.deptApproveId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
              }
            }
          }
          this.$refs.approve.getApproveList();  // 调用子组件方法
        }).catch(err => {
          console.log(err)
        });
      },

      addReportToLeave() {
        axios({
          method: 'post',
          url: this.url + '/wzbg/insertLeaveApplication',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            lInfo: {
              account1: this.examineAccount,
              account2: this.checkAccount,
              account3: this.approveAccount,
              account4: this.reportAccount,
              account_ID: this.leaveAccount,
              account_Name: this.leaveEmpBackName,
              addTime: this.$currentTime(),
              agentAccount: this.agentAccount,
              departId: this.deptInitId,
              endTime: this.endBackTime,
              leaveAccount: this.leaveAccount,
              leaveRemark: this.leaveBackRemark,
              leaveType: this.leaveTypeBackName,
              positionName: this.leavePositionBackName,
              startTime: this.startBackTime,
              step: "0",
              baobeiId: this.reportId,
            }
          },
          dataType: 'json',
        }).then(response => {
          console.log(response.data.retData)
          $('#reportBackApplyModel').modal('hide');
        }).catch(err => {
          console.log(err)
        });
      },

      // ---------------------------------------审批----------------------------------
      reportReview(item) {
        if (item.checkAccount != JSON.parse(Cookies.get("accountData")).account.account_ID) {
          alert("无权对此条报备进行审批")
          return false;
        }
        if (item.state == 1) {
          alert("该报备已销假,无需进行审批")
          return false;
        }
        if (item.state == 2) {
          alert("该报备已取消,无需进行审批")
          return false;
        }
        // 数据回显
        this.id = item.id
        this.leaveTypeReviewName = item.type
        this.$refs.departReview.setDpart(item.leaveDeptId)
        this.deptReviewEmpName = item.leaveEmpName
        this.startReviewTime = item.startTime
        this.endReviewTime = item.endTime
        this.leaveReviewRemark = item.leaveRemark
        this.$refs.approvalLeaveAccReview.setAccountId(item.checkAccount)
        // 组件禁用方法
        this.$refs.departReview.changeAble()
        this.$refs.leaveTypeReview.changeAble()
        this.$refs.approvalLeaveAccReview.changeAble()
        // 弹框
        $('#reviewReportModel').modal('show');
      },
      agree() { // 同意审批
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
            checkTime: this.$currentTime(),
            updateTime: this.$currentTime()
          },
          dataType: 'json',
        }).then(response => {
          this.queryReport();
          this.reviewReportClear();
          console.log(response.data.retData)
        }).catch(err => {
          console.log(err)
        });
      },
      disagree() {  // 拒绝审批
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
            checkTime: this.$currentTime(),
            updateTime: this.$currentTime(),
          },
          dataType: 'json',
        }).then(response => {
          this.queryReport();
          this.reviewReportClear();
          console.log(response.data.retData)
        }).catch(err => {
          console.log(err)
        });
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
          this.startUpdateTime = item.startTime
          this.endUpdateTime = item.endTime
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
            startTime: this.$YYYY_MM_DD_HH_mm(this.startUpdateTime),
            endTime: this.$YYYY_MM_DD_HH_mm(this.endUpdateTime),
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
        if (!this.has(51)) {
          alert("没有请假报备管理权限，不能销假！")
          return false;
        }
        if (item.checkResult != 1) {
          alert("该报备未审批或未通过,不能申请销假")
          return false;
        }
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
              alert('销假操作成功')
              this.queryReport();
            } else {
              alert('销假操作失败')
            }
          }).catch((error) => {
            console.log('销假请求失败')
          });
        }
      },

      // ---------------------------------------取消----------------------------------
      reportCancel(item) {
        const loginAccount = JSON.parse(Cookies.get("accountData")).account.account_ID
        if (item.fillAccount != loginAccount) {
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
                  alert('取消成功')
                  this.queryReport();
                } else {
                  alert('取消失败')
                }
              }).catch((error) => {
                console.log('取消请求失败')
              });
            }
          }
        }
      }
    }
    ,
    mounted() {
      this.queryReport();
    }
  }
</script>
<style>
  @-moz-document url-prefix() {
    fieldset {
      display: table-cell;
    }
  }
 .form-control{ width: 100% !important;}
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
    line-height: 30px !important;
  }

  .queryDate {
    position: relative;
    display: inline-block;
    width: 100% !important;
  }

 /* #date {
    width: 31%;
    margin-left: -10px;
  } */

 /* #dept {
    width: 18.5%;
    margin-left: -100px;
  } */

  /* #username {
    width: 15%;
    margin-left: -50px;
  }

  #status {
    width: 15%;
    margin-left: -50px;
  }
 */
  .table > tbody > tr > td {
    vertical-align: middle;
  }

  /*#btn {*/
  /*  margin-left: 82.6%;*/
  /*}*/
  /* .mx-datepicker{ width: 120px;} */
  .table > tbody > tr > td {
    vertical-align: middle;
  }
</style>
