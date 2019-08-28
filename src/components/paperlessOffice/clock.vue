<!-- author:dingdong -->
<template>
  <div class="container user-container" id="clock-app" v-cloak>
    <div class="row">
      <div class="col-md-12 main-title">
        <h2>忘打卡证明</h2>
      </div>
    </div>
    <div class="form-group clearfix">
      <div class="col-md-4" id="date">
        <label class="control-label text-left nopad">申请日期：</label>
        <date-picker v-model="beginDate" type="date" format="YYYY-MM-DD" class="queryDate"></date-picker>
        <span class="nopad">~</span>
        <date-picker v-model="endDate" type="date" format="YYYY-MM-DD" class="queryDate"></date-picker>
      </div>
      <div class="col-md-1">
        <label class="control-label text-left nopad">部门：</label>
      </div>
      <div class="col-md-2" id="dept">
        <department ref="deptQuery" @departChange='deptChangeForQuery'></department>
      </div>
      <div class="col-md-1">
        <label class="control-label text-left nopad">姓名：</label>
      </div>
      <div class="col-md-2" id="username">
        <input type="text" class="form-control" placeholder="Username" v-model="accountName">
      </div>
      <div class="col-md-1">
        <label class="control-label text-left nopad">状态：</label>
      </div>
      <div class="col-md-2" id="status">
        <select class="form-control" v-model="state">
          <option v-for="(item,index) in stateList" :key="index" :value="item.value">
            {{item.label}}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group clearfix">
      <div class="col-md-3 col-md-offset-9" id="btn">
        <button type="button" class="btn btn-primary  m_r_10" @click="queryClock">查询</button>
        <button type="button" class="btn btn-info  m_r_10" data-toggle="modal" @click="applyClock">申请</button>
        <button type="button" class="btn btn-warning  m_r_10" @click="exportTableToExcel('clockTable','忘打卡证明表')">导出</button>
      </div>
    </div>
    <!-- 查询结果集 -->
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <div class="pre-scrollable">
          <table class="table table-bordered table-hover text-nowrap" id="clockTable">
            <thead>
            <tr>
              <th class="text-center">申请人</th>
              <th class="text-center">申请人部门</th>
              <th class="text-center">申请时间</th>
              <th class="text-center">未打卡时间</th>
              <th class="text-center">原因</th>
              <th class="text-center">说明</th>
              <th class="text-center">证明人</th>
              <th class="text-center">证明结果</th>
              <th class="text-center">审查人</th>
              <th class="text-center">审查结果</th>
              <th class="text-center">审核人</th>
              <th class="text-center">审核结果</th>
              <th class="text-center">批准人</th>
              <th class="text-center">批准结果</th>
              <th class="text-center">报备人</th>
              <th class="text-center">报备结果</th>
              <th class="text-center">查看</th>
              <th class="text-center">修改</th>
              <th class="text-center">处理</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in clockList" :key="index"
                :style="item.result4 == 1? {'color':'#00ff00'}:
                        item.resultR == 0? {'color':'#ff0000'}:
                        item.result1 == 0? {'color':'#ff0000'}:
                        item.result2 == 0? {'color':'#ff0000'}:
                        item.result3 == 0? {'color':'#ff0000'}:
                        item.result4 == 0? {'color':'#ff0000'}:
                        {'color':''}">
              <td class="text-center">{{item.leaveAccountName}}</td>
              <td class="text-center">{{item.leaveDeptName}}</td>
              <td class="text-center">{{item.addTime|dateFormat}}</td>
              <td class="text-center">{{item.startTime|dateFormat}}</td>
              <td class="text-center">{{item.reason}}</td>
              <td class="text-center">{{item.leaveRemark}}</td>
              <td class="text-center">{{item.witnessAccountName}}</td>
              <td class="text-center">{{item.resultR == 0? '不同意':item.resultR == 1? '同意':''}}</td>
              <td class="text-center">{{item.examineAccountName}}</td>
              <td class="text-center">{{item.result1 == 0? '不同意':item.result1 == 1? '同意':''}}</td>
              <td class="text-center">{{item.checkAccountName}}</td>
              <td class="text-center">{{item.result2 == 0? '不同意':item.result2 == 1? '同意':''}}</td>
              <td class="text-center">{{item.approveAccountName}}</td>
              <td class="text-center">{{item.result3 == 0? '不同意':item.result3 == 1? '同意':''}}</td>
              <td class="text-center">{{item.reportAccountName}}</td>
              <td class="text-center">{{item.result4 == 0? '不同意':item.result4 == 1? '同意':''}}</td>
              <td class="text-center">
                <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#clockShowModel"
                        @click="showClock(item)">
                  <b>查看</b>
                </button>
              </td>
              <td class="text-center">
                <button type="button" class="btn btn-sm btn-warning" @click="editClock(item)">
                  <b>修改</b>
                </button>
              </td>
              <td class="text-center">
                <button type="button" class="btn btn-sm btn-info" @click="disposeClock(item)">
                  <b>处理</b>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div><!-- /.row 查询页面-->
    <!-- 新增打卡证明-->
    <div class="modal fade" id="clockAddModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">新增打卡证明</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">申请人姓名：</label>
              <div class="col-md-2">
                <span class="nopad">{{leaveAccountName}}</span>
              </div>
              <label class="col-md-1 control-label text-right nopad">部门：</label>
              <div class="col-md-2">
                <span class="nopad">{{leaveDeptName}}</span>
              </div>
              <label class="col-md-1 control-label text-right nopad">职位：</label>
              <div class="col-md-2">
                <span class="nopad">{{leavePositionName}}</span>
              </div>
            </div>
            <legend><h5>打卡</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">原因：</label>
              <div class="col-md-2">
                <select class="form-control" v-model="reason">
                  <option v-for="(item,index) in reasons" :key="index" :value="item.label">
                    {{item.label}}
                  </option>
                </select>
              </div>
              <div class="col-md-6 col-md-offset-1">
                <label class="select-box-title">未打卡时间：</label>
                <date-picker v-model="notClockTime" type="date" format="YYYY-MM-DD 17:30" confirm></date-picker>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">说明：</label>
              <div class="col-md-10">
                <textarea class="textarea" v-model="leaveRemark"></textarea>
              </div>
            </div>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-6">
              <button type="button" class="btn btn-sm btn-warning" @click="addClock">确认</button>
            </div>
            <div class="col-md-1">
              <button type="button" class="btn btn-sm btn-info" @click="cancelAdd">取消</button>
            </div>
          </div> <!-- /.modal-footer -->
          <div class="modal-body">
            <legend><h5>证明</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">证明人：</label>
              <div class="col-md-2">
                <agent :agentAccount="accountR" ref="agent" @agentChange="changeAccountR"></agent>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning glyphicon glyphicon-plus" aria-hidden="true"
                        data-toggle="modal" data-target="#agentChooseModel" @click="queryEmpByDept">
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
            <agentChoose ref="agentChoose" @getAgentInfo="getAccountRInfo"></agentChoose>
            <legend><h5>审查</h5></legend>
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
            <legend><h5>审核</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">审核人：</label>
              <div class="col-md-2">
                <examine :examineAccount="checkAccount" ref="check" @examineChange="checkChange"></examine>
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
            <legend><h5>批准</h5></legend>
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
            <legend><h5>报备人</h5></legend>
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
          </div><!-- /.modal-body -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 查看打卡证明-->
    <div class="modal fade" id="clockShowModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">查看打卡证明</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">申请人姓名：</label>
              <div class="col-md-2">
                <span class="nopad">{{showLeaveAccountName}}</span>
              </div>
              <label class="col-md-1 control-label text-right nopad">部门：</label>
              <div class="col-md-2">
                <span class="nopad">{{showLeaveDeptName}}</span>
              </div>
              <label class="col-md-1 control-label text-right nopad">职位：</label>
              <div class="col-md-2">
                <span class="nopad">{{showLeavePositionName}}</span>
              </div>
            </div>
            <legend><h5>打卡</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">原因：</label>
              <div class="col-md-2">
                <span class="nopad">{{showReason}}</span>
              </div>
              <label class="control-label text-right nopad col-md-2">未打卡时间：</label>
              <div class="col-md-3">
                <date-picker v-model="showNotClockTime" format="YYYY-MM-DD HH:mm" disabled="disabled"></date-picker>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">说明：</label>
              <div class="col-md-10">
                <textarea class="textarea" disabled="disabled" v-model="showLeaveRemark"></textarea>
              </div>
            </div>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-6">
              <button type="button" class="btn btn-sm btn-warning" disabled="disabled">确认</button>
            </div>
            <div class="col-md-1">
              <button type="button" class="btn btn-sm btn-info" disabled="disabled">取消</button>
            </div>
          </div> <!-- /.modal-footer -->
          <div class="modal-body">
            <legend><h5>证明</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">证明人：</label>
              <div class="col-md-2">
                <span class="nopad">{{showAccountR}}</span>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled" class="btn btn-sm btn-warning glyphicon glyphicon-plus"></button>
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
            <legend><h5>审查</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">审查人：</label>
              <div class="col-md-2">
                <span class="nopad">{{showExamine}}</span>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled" class="btn btn-sm btn-warning glyphicon glyphicon-plus"></button>
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
            <legend><h5>审核</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">审核人：</label>
              <div class="col-md-2">
                <span class="nopad">{{showCheck}}</span>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled" class="btn btn-sm btn-warning glyphicon glyphicon-plus"></button>
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
            <legend><h5>批准</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">批准人：</label>
              <div class="col-md-2">
                <span class="nopad">{{showApprove}}</span>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled" class="btn btn-sm btn-warning glyphicon glyphicon-plus"></button>
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
            <legend><h5>报备</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">报备人：</label>
              <div class="col-md-2">
                <span class="nopad">{{showReport}}</span>
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
          </div><!-- /.modal-body -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 修改打卡证明-->
    <div class="modal fade" id="clockModifyModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">修改打卡证明</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">申请人姓名：</label>
              <div class="col-md-2">
                <span class="nopad">{{leaveUpdateAccountName}}</span>
              </div>
              <label class="col-md-1 control-label text-right nopad">部门：</label>
              <div class="col-md-2">
                <span class="nopad">{{leaveUpdateDeptName}}</span>
              </div>
              <label class="col-md-1 control-label text-right nopad">职位：</label>
              <div class="col-md-2">
                <span class="nopad">{{leaveUpdatePositionName}}</span>
              </div>
            </div>
            <legend><h5>打卡</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">原因：</label>
              <div class="col-md-2">
                <select class="form-control" v-model="reasonUpdate">
                  <option v-for="(item,index) in reasons" :key="index" :value="item.label">
                    {{item.label}}
                  </option>
                </select>
              </div>
              <label class="control-label text-right nopad col-md-2">未打卡时间：</label>
              <div class="col-md-3">
                <date-picker v-model="notClockUpdateTime" type="date" format="YYYY-MM-DD 17:30" confirm></date-picker>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">说明：</label>
              <div class="col-md-10">
                <textarea class="textarea" placeholder="未打卡说明：" v-model="leaveUpdateRemark"></textarea>
              </div>
            </div>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-6">
              <button type="button" class="btn btn-sm btn-warning" @click="updateReport">确认</button>
            </div>
            <div class="col-md-1">
              <button type="button" class="btn btn-sm btn-info" @click="cancelUpdate">取消</button>
            </div>
          </div> <!-- /.modal-footer -->
          <div class="modal-body">
            <legend><h5>证明</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">证明人：</label>
              <div class="col-md-2">
                <agent :agentAccount="updateAccountR" ref="agentUpdate" @agentChange="changeUpdateAccountR"></agent>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning glyphicon glyphicon-plus" aria-hidden="true"
                        data-toggle="modal" data-target="#agentChooseUpdateModel" @click="queryEmpByDeptForUpdate">
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
            <agentChooseUpdate ref="agentUpdateChoose" @getAgentInfo="getAccountRUpdateInfo"></agentChooseUpdate>
            <legend><h5>审查</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">审查人：</label>
              <div class="col-md-2">
                <examine :examineAccount="updateExamineAccount" ref="examineUpdate" @examineChange="examineUpdateChange"></examine>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning glyphicon glyphicon-plus" aria-hidden="true"
                        data-toggle="modal" @click="addExamineUpdateOption" :disabled="isAbleForUpdateExamine">
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
            <legend><h5>审核</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">审核人：</label>
              <div class="col-md-2">
                <examine :examineAccount="updateCheckAccount" ref="checkUpdate" @examineChange="checkUpdateChange"></examine>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning glyphicon glyphicon-plus" aria-hidden="true"
                        data-toggle="modal" @click="addCheckUpdateOption" :disabled="isAbleForUpdateCheck">
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
            <legend><h5>批准</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">批准人：</label>
              <div class="col-md-2">
                <approve :approveAccount="updateApproveAccount" ref="approveUpdate" @approveChange="approveUpdateChange"></approve>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning glyphicon glyphicon-plus" aria-hidden="true"
                        data-toggle="modal" @click="addApproveUpdateOption" :disabled="isAbleForUpdateApprove">
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
            <legend><h5>报备人</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">报备人：</label>
              <div class="col-md-2">
                <select class="form-control">
                  <option v-model="updateReportAccount">{{this.updateReportName}}</option>
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
          </div><!-- /.modal-body -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 处理忘记打卡证明-->
    <div class="modal fade" id="clockDisposeModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>×</span>
            </button>
            <h4 class="modal-title">处理打卡证明</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">申请人姓名：</label>
              <div class="col-md-2">
                <span class="nopad">{{showLeaveAccountName}}</span>
              </div>
              <label class="col-md-1 control-label text-right nopad">部门：</label>
              <div class="col-md-2">
                <span class="nopad">{{showLeaveDeptName}}</span>
              </div>
              <label class="col-md-1 control-label text-right nopad">职位：</label>
              <div class="col-md-2">
                <span class="nopad">{{showLeavePositionName}}</span>
              </div>
            </div>
            <legend><h5>打卡</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">原因：</label>
              <div class="col-md-2">
                <span class="nopad">{{showReason}}</span>
              </div>
              <label class="col-md-2 control-label text-right nopad">未打卡时间：</label>
              <div class="col-md-3">
                <date-picker v-model="showNotClockTime" format="YYYY-MM-DD HH:mm" disabled="disabled"></date-picker>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">说明：</label>
              <div class="col-md-10">
                <textarea class="textarea" placeholder="未打卡说明：" disabled="disabled" v-model="showLeaveRemark"></textarea>
              </div>
            </div>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-6">
              <button type="button" class="btn btn-sm btn-warning" disabled="disabled">确认</button>
            </div>
            <div class="col-md-1">
              <button type="button" class="btn btn-sm btn-info" disabled="disabled">取消</button>
            </div>
          </div> <!-- /.modal-footer -->
          <div class="modal-body">
            <legend><h5>证明</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">证明人：</label>
              <div class="col-md-2">
                <span class="nopad">{{showAccountR}}</span>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled" class="btn btn-sm btn-warning glyphicon glyphicon-plus"></button>
              </div>
              <label class="col-md-1 control-label text-right nopad">备注：</label>
              <div class="col-md-3">
                <input type="text" class="form-control" :disabled="isAbleForAccountR" v-model="remarkR"/>
              </div>
              <label class="col-md-1 control-label text-right nopad">结果：</label>
              <div class="col-md-1">
                <span class="nopad"><b>{{this.resultR == 0? '不同意':this.resultR == 1? '同意':''}}</b></span>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning" :disabled="isAbleForAccountR" @click="agreeR">同意</button>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning" :disabled="isAbleForAccountR" @click="disagreeR">不同意</button>
              </div>
            </div>
            <legend><h5>审查</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">审查人：</label>
              <div class="col-md-2">
                <span class="nopad">{{showExamine}}</span>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled" class="btn btn-sm btn-warning glyphicon glyphicon-plus"></button>
              </div>
              <label class="col-md-1 control-label text-right nopad">备注：</label>
              <div class="col-md-3">
                <input type="text" class="form-control" :disabled="isAbleForAccount1" v-model="remark1"/>
              </div>
              <label class="col-md-1 control-label text-right nopad">结果：</label>
              <div class="col-md-1">
                <span class="nopad"><b>{{this.result1 == 0? '不同意':this.result1 == 1? '同意':''}}</b></span>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning" :disabled="isAbleForAccount1" @click="agreeExamine">同意</button>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning" :disabled="isAbleForAccount1" @click="disagreeExamine">不同意</button>
              </div>
            </div>
            <legend><h5>审核</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">审核人：</label>
              <div class="col-md-2">
                <span class="nopad">{{showCheck}}</span>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled" class="btn btn-sm btn-warning glyphicon glyphicon-plus"></button>
              </div>
              <label class="col-md-1 control-label text-right nopad">备注：</label>
              <div class="col-md-3">
                <input type="text" class="form-control" :disabled="isAbleForAccount2" v-model="remark2"/>
              </div>
              <label class="col-md-1 control-label text-right nopad">结果：</label>
              <div class="col-md-1">
                <span class="nopad"><b>{{this.result2 == 0? '不同意':this.result2 == 1? '同意':''}}</b></span>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning" :disabled="isAbleForAccount2" @click="agreeCheck">同意</button>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning" :disabled="isAbleForAccount2" @click="disagreeCheck">不同意</button>
              </div>
            </div>
            <legend><h5>批准</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">批准人：</label>
              <div class="col-md-2">
                <span class="nopad">{{showApprove}}</span>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled" class="btn btn-sm btn-warning glyphicon glyphicon-plus"></button>
              </div>
              <label class="col-md-1 control-label text-right nopad">备注：</label>
              <div class="col-md-3">
                <input type="text" class="form-control" :disabled="isAbleForAccount3" v-model="remark3"/>
              </div>
              <label class="col-md-1 control-label text-right nopad">结果：</label>
              <div class="col-md-1">
                <span class="nopad"><b>{{this.result3 == 0? '不同意':this.result3 == 1? '同意':''}}</b></span>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning" :disabled="isAbleForAccount3" @click="agreeApprove">同意</button>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning" :disabled="isAbleForAccount3" @click="disagreeApprove">不同意</button>
              </div>
            </div>
            <legend><h5>报备</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-1 control-label text-right nopad">报备人：</label>
              <div class="col-md-2">
                <span class="nopad">{{showReport}}</span>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled" class="btn btn-sm btn-warning glyphicon glyphicon-plus"></button>
              </div>
              <label class="col-md-1 control-label text-right nopad">备注：</label>
              <div class="col-md-3">
                <input type="text" class="form-control" :disabled="isAbleForAccount4" v-model="remark4"/>
              </div>
              <label class="col-md-1 control-label text-right nopad">结果：</label>
              <div class="col-md-1">
                <span class="nopad"><b>{{this.result4 == 0? '不同意':this.result4 == 1? '同意':''}}</b></span>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning" :disabled="isAbleForAccount4" @click="agreeReport">同意</button>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning" :disabled="isAbleForAccount4" @click="disagreeReport">不同意</button>
              </div>
            </div>
          </div><!-- /.modal-body -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div><!-- /.container -->
</template>
<script>
  import DatePicker from 'vue2-datepicker'
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import moment from 'moment'
  import agent from './subReportAndClock/agent.vue'
  import agentChoose from './subReportAndClock/agentChoose.vue'
  import agentChooseUpdate from './subReportAndClock/agentChooseUpdate.vue'
  import department from '../vuecommon/department.vue'
  import examine from './subReportAndClock/examineClock.vue'
  import approve from './subReportAndClock/approveClock.vue'

  export default {
    components: {
      department,
      DatePicker,
      agent,
      agentChoose,
      agentChooseUpdate,
      examine,
      approve
    },
    data() {
      return {
        // 查询
        beginDate: this.$currentDate(),
        endDate: this.$currentDate(),
        accountName: '',
        deptQueryId: '',
        state: '',
        stateList: [
          {value: '', label: '全部'},
          {value: '1', label: '待处理'},
          {value: '2', label: '处理中'},
          {value: '3', label: '已通过'},
          {value: '4', label: '未通过'},
        ],
        clockList: [],
        //  新增
        leaveAccount: '',
        leaveAccountName: '',
        deptInitId: '',
        leaveDeptName: '',
        leavePositionName: '',
        reason: '',
        reasons: [
          {label: '因公外出'},
          {label: '忘记打卡'},
          {label: '其他'}
        ],
        notClockTime: moment().subtract(1, 'days').format("YYYY-MM-DD 17:30"),
        leaveRemark: '',
        empInfo: '',          // 基本信息
        accountR: '0',         // 证明人账户
        examineAccount: '',   // 审查人账户
        checkAccount: '',     // 审核人账户
        approveAccount: '',   // 批准人账户
        reportAccount: '1127',// 报备人(暂时固定为李珊珊)
        typeId: '',           // 申请人职务级别
        parentId: '',         // 父级部门
        // 审查人组件
        deptExamineId: '',
        typeExamineId: '',
        deptExamineUpdateId: '',
        typeExamineUpdateId: '',
        // 审核人组件
        deptCheckId: '',
        typeCheckId: '',
        deptCheckUpdateId: '',
        typeCheckUpdateId: '',
        // 批准人组件
        deptApproveId: '',
        typeApproveId: '',
        deptApproveUpdateId: '',
        typeApproveUpdateId: '',
        //  查看
        showLeaveAccountName: '',
        showLeaveDeptName: '',
        showLeavePositionName: '',
        showReason: '',
        showNotClockTime: '',
        showLeaveRemark: '',
        showAccountR: '',         // 证明人账户
        showExamine: '',   // 审查人账户
        showCheck: '',     // 审核人账户
        showApprove: '',   // 批准人账户
        showReport: '1127',// 报备人(暂时固定为李珊珊)
        // 修改
        id: "",
        leaveUpdateAccount: '',
        leaveUpdateAccountName: '',
        leaveUpdateDeptId: '',
        leaveUpdateDeptName: '',
        leaveUpdatePositionName: '',
        reasonUpdate: '',
        notClockUpdateTime: '',
        leaveUpdateRemark: '',
        updateAccountR: '',
        updateAccountRName: '',
        updateExamineAccount: '',
        updateExamineName: '',
        updateCheckAccount: '',
        updateCheckName: '',
        updateApproveAccount: '',
        updateApproveName: '',
        updateReportAccount: '',
        updateReportName: '',
        clickTimeForExamine: 0,
        clickTimeForCheck: 0,
        clickTimeForApprove: 0,
        // 按钮状态
        isAbleForExamine: false,
        isAbleForCheck: false,
        isAbleForApprove: false,
        isAbleForUpdateExamine: false,
        isAbleForUpdateCheck: false,
        isAbleForUpdateApprove: false,
        isAbleForAccountR: "disabled",
        isAbleForAccount1: "disabled",
        isAbleForAccount2: "disabled",
        isAbleForAccount3: "disabled",
        isAbleForAccount4: "disabled",
        // 备注
        remarkR: '',
        remark1: '',
        remark2: '',
        remark3: '',
        remark4: '',
        //处理结果
        resultR: '',
        result1: '',
        result2: '',
        result3: '',
        result4: '',
        // 步骤
        step: '',
      }
    },
    methods: {
      cancelAdd() {
        $('#clockAddModel').modal('hide');
      },
      cancelUpdate() {
        $('#clockModifyModel').modal('hide');
      },
      // ---------------------------------------查询----------------------------------
      deptChangeForQuery(val) {
        this.deptQueryId = val
      },
      queryClock() { // 查询忘记打卡证明
        axios({
          method: 'post',
          url: this.url + '/leaveForgetController/queryLeaveForget',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            accountId: this.has(51) ? '' : JSON.parse(Cookies.get("accountData")).account.account_ID,
            beginDate: this.beginDate == null? '':this.$queryStartTime(this.beginDate),
            endDate: this.endDate == null? '':this.$queryEndTime(this.endDate),
            leaveDeptId: this.deptQueryId,
            leaveAccountName: this.accountName,
            state: this.state
          },
          dataType: 'json',
        }).then((response) => {
          this.clockList = response.data.retData
        }).catch((error) => {
          console.log('查询请求失败')
        });
      },
      // ---------------------------------------新增----------------------------------

      // 组件方法
      changeAccountR(val) {
        this.accountR = val
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
      // 申请按钮
      applyClock() {
        this.clearAddModel();
        this.leaveAccount = JSON.parse(Cookies.get("accountData")).account.account_ID;
        this.$refs.examine.initParam();  // 初始化参数
        this.$refs.check.initParam();
        this.$refs.approve.initParam();
        this.$refs.agent.initParamZero();
        this.queryEmpInfo();  // 加载数据
        $('#clockAddModel').modal('show');  // 弹框
      },
      queryEmpByDept() {
        this.$refs.agentChoose.queryEmpByDept()
      },
      getAccountRInfo(item) {
        this.$refs.agent.insertAgentInfo(item)
      },
      // 清空添加模态框
      clearAddModel() {
        this.deptExamineId = ''
        this.deptCheckId = ''
        this.deptApproveId = ''
        this.leaveAccount = ''
        this.leaveAccountName = ''
        this.leaveDeptName = ''
        this.leavePositionName = ''
        this.reason = ''
        this.notClockTime = moment().subtract(1, 'days').format("YYYY-MM-DD 17:30")
        this.leaveRemark = ''
        this.accountR = 0          //  证明人账户
        this.examineAccount = ''   // 审查人账户
        this.checkAccount = ''     // 审核人账户
        this.approveAccount = ''   // 批准人账户
        this.reportAccount = '1127'// 报备人(暂时固定为李珊珊)
        this.isAbleForExamine = false
        this.isAbleForCheck = false
        this.isAbleForApprove = false
      },
      // 查询基本信息
      queryEmpInfo() {
        axios({
          method: 'post',
          url: this.url + '/leaveForgetController/queryEmpInfoByAccount',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            account: this.leaveAccount
          },
          dataType: 'json',
        }).then((response) => {
          console.log(response.data.retData)
          this.empInfo = response.data.retData;
          this.toLoad(this.empInfo);
        }).catch(err => {
          console.log(err)
        });
      },
      // 加载数据
      toLoad(data) {
        // 回显数据
        this.leaveAccount = data.account
        this.leaveAccountName = data.name
        this.deptInitId = data.departmentId
        this.leaveDeptName = data.deptName
        this.leavePositionName = data.positionName
        this.typeId = data.typeId
        // 传值给子组件
        this.$refs.agent.getLeaveAccount([this.leaveAccount, this.deptInitId])
        this.$refs.agentChoose.getLeaveAccount([this.leaveAccount, this.deptInitId])

        this.$refs.examine.getApplyAccount(this.leaveAccount)
        this.$refs.examine.getDeptId(this.deptInitId)
        this.$refs.examine.getTypeId(this.typeId)
        this.$refs.examine.getFlag(1)

        this.$refs.check.getApplyAccount(this.leaveAccount)
        this.$refs.check.getDeptId(this.deptInitId)
        this.$refs.check.getTypeId(this.typeId)
        this.$refs.check.getFlag(2)

        this.$refs.approve.getApplyAccount(this.leaveAccount)
        this.$refs.approve.getDeptId(this.deptInitId)
        this.$refs.approve.getTypeId(this.typeId)
        this.$refs.approve.getFlag(1)
        // 执行子组件方法
        this.$refs.examine.getExamineList()
        this.$refs.check.getExamineList()
        this.$refs.approve.getApproveList();
      },

      // 添加审查人
      addExamineOption() {
        if (this.isBlank(this.deptExamineId)) {  // 首次加载初始化参数
          this.deptExamineId = this.deptInitId // 部门
        }
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/queryParentDept',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            deptId: this.deptExamineId,
            step: 0
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
            if (this.typeId == 6) {
              this.$refs.examine.type6(this.typeExamineId);
              if (this.$refs.examine.setRound() == 1) {
                this.$refs.examine.getDeptId(this.deptExamineId)
              }
            }
          } else {
            this.$refs.examine.getDeptId(this.parentId) // 传父级部门ID给子组件
            this.deptExamineId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
          }
          this.$refs.examine.getExamineList();  // 调用子组件方法
        }).catch(err => {
          console.log(err)
        });
      },
      // 改变扩大按钮状态
      changeExamineAddAble() {
        this.isAbleForExamine = "disabled"
      },
      // 添加审核人
      addCheckOption() {
        if (this.isBlank(this.deptCheckId)) {  // 首次加载初始化参数
          this.deptCheckId = this.deptInitId // 部门
        }
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
            if (this.typeId == 6) {
              this.$refs.check.type6(this.typeCheckId);
              if (this.$refs.check.setRound() == 1) {
                this.$refs.check.getDeptId(this.deptCheckId)
              }
            }
          } else {
            this.$refs.check.getDeptId(this.parentId) // 传父级部门ID给子组件
            this.deptCheckId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
          }
          this.$refs.check.getExamineList();  // 调用子组件方法
        }).catch(err => {
          console.log(err)
        });
      },
      // 改变扩大按钮状态
      changeCheckAddAble() {
        this.isAbleForCheck = "disabled"
      },
      // 添加批准人
      addApproveOption() {
        if (this.isBlank(this.deptApproveId)) {  // 首次加载初始化参数
          this.deptApproveId = this.deptInitId // 部门
        }
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
          console.log("级别" + this.typeId)
          if (this.deptApproveId == '0') { // 当下一次初始部门ID为0时(没有父级部门时)
            this.$refs.approve.getDeptId(this.deptInitId) // 传初始化参数给子组件
            this.deptApproveId = this.deptInitId; // 下一轮初始的部门ID为初始参数
            this.typeApproveId = this.$refs.approve.setTypeId();
            if (this.typeApproveId <= 6) {
              if (this.typeId <= 3) {
                this.$refs.approve.type3(this.typeApproveId);
              }
              if (this.typeId == 4) {
                this.$refs.approve.type4(this.typeApproveId);
              }
            }
          } else {
            if (this.typeId < 5) {
              this.$refs.approve.getDeptId(this.parentId) // 传父级部门ID给子组件
              this.deptApproveId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
            } else {
              if (this.$refs.approve.setRound() == 1) { // 点击一次查当前部门
                if (this.typeId == 5) {
                  this.$refs.approve.initType5()
                  this.$refs.approve.getDeptId(this.deptApproveId)
                  this.$refs.approve.type5(this.typeApproveId);
                }
                if (this.typeId == 6) {
                  this.$refs.approve.initType5()
                  this.$refs.approve.getDeptId(this.deptApproveId)
                  this.$refs.approve.type6(this.typeApproveId);
                }
              } else {  // 下一次查父级部门
                this.$refs.approve.getDeptId(this.parentId)
                this.deptApproveId = this.parentId;
              }
            }
          }
          this.$refs.approve.getApproveList();  // 调用子组件方法
        }).catch(err => {
          console.log(err)
        });
      },
      // 改变扩大按钮状态
      changeApproveAddAble() {
        this.isAbleForApprove = "disabled"
      },
      addClock() { // 申请确认按钮
        if (this.isBlank(this.reason)) {
          alert("请选择未打卡原因!")
          return false;
        }
        if (this.isBlank(this.leaveRemark)) {
          alert("请输入说明!")
          return false;
        }
        if (this.isBlank(this.notClockTime)) {
          alert("请选择未打卡时间!")
          return false;
        }
        if (this.isBlank(this.leaveRemark)) {
          alert("请输入说明!")
          return false;
        }
        axios({
          method: 'post',
          url: this.url + '/leaveForgetController/addLeaveForget',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            reason: this.reason,
            leaveAccount: this.leaveAccount,
            addTime: this.$currentTime(),
            startTime: this.$YYYY_MM_DD_17_30(this.notClockTime),
            leaveRemark: this.leaveRemark,
            accountR: this.accountR,
            account1: this.examineAccount,
            account2: this.checkAccount,
            account3: this.approveAccount,
            account4: this.reportAccount,
            updateTime: this.$currentTime(),
            step: 0
          },
          dataType: 'json',
        }).then(response => {
          console.log(response.data.retData)
          $('#clockAddModel').modal('hide');
          this.clearAddModel();
          this.queryClock();
        }).catch(err => {
          console.log(err)
        });
      },
      // ---------------------------------------查看----------------------------------
      showClock(item) {
        console.log(item)
        this.showLeaveAccountName = item.leaveAccountName
        this.showLeaveDeptName = item.leaveDeptName
        this.showLeavePositionName = item.leavePositionName
        this.showReason = item.reason
        this.showNotClockTime = item.startTime
        this.showLeaveRemark = item.leaveRemark
        this.showAccountR = item.witnessAccountName
        this.showExamine = item.examineAccountName
        this.showCheck = item.checkAccountName
        this.showApprove = item.approveAccountName
        this.showReport = item.reportAccountName
      },
      //---------------------------------------修改----------------------------------
      // 组件方法
      approveUpdateChange(val) {
        this.updateApproveAccount = val
      },
      changeUpdateAccountR(val) {
        this.updateAccountR = val
      },
      examineUpdateChange(val) {
        this.updateExamineAccount = val
      },
      checkUpdateChange(val) {
        this.updateCheckAccount = val
      },
      getAccountRUpdateInfo(item) {
        this.$refs.agentUpdate.insertAgentInfo(item)
      },
      // 初始化
      init() {
        this.deptExamineUpdateId = ''
        this.deptCheckUpdateId = ''
        this.deptApproveUpdateId = ''
        this.leaveAccount = JSON.parse(Cookies.get("accountData")).account.account_ID
        this.$refs.examineUpdate.initParam();  // 初始化参数
        this.$refs.checkUpdate.initParam();  // 初始化参数
        this.$refs.approveUpdate.initParam();  // 初始化参数
        this.isAbleForUpdateExamine = false
        this.isAbleForUpdateCheck = false
        this.isAbleForUpdateApprove = false
      },
      // 证明人选择组件方法
      queryEmpByDeptForUpdate() {
        this.$refs.agentUpdateChoose.queryEmpByDept()
      },
      // 数据回显
      getEditInfo(item) {
        this.id = item.id
        this.leaveUpdateAccount = item.leaveAccount
        this.leaveUpdateAccountName = item.leaveAccountName
        this.leaveUpdateDeptId = item.leaveDeptId
        this.leaveUpdateDeptName = item.leaveDeptName
        this.leaveUpdatePositionName = item.leavePositionName
        this.reasonUpdate = item.reason
        this.notClockUpdateTime = item.startTime
        this.leaveUpdateRemark = item.leaveRemark
        this.updateAccountR = item.accountR
        this.updateAccountRName = item.witnessAccountName
        this.updateExamineAccount = item.account1
        this.updateExamineName = item.examineAccountName
        this.updateCheckAccount = item.account2
        this.updateCheckName = item.checkAccountName
        this.updateApproveAccount = item.account3
        this.updateApproveName = item.approveAccountName
        this.updateReportAccount = item.account4
        this.updateReportName = item.reportAccountName
        this.queryEmpUpdateInfo();
      },
      // 修改按钮
      editClock(item) {
        if (item.leaveAccount != JSON.parse(Cookies.get("accountData")).account.account_ID) {
          alert("不能修改他人的报备")
        } else {
          this.leaveAccount = JSON.parse(Cookies.get("accountData")).account.account_ID;
          this.init();  // 初始化
          this.getEditInfo(item); // 回显数据
          $('#clockModifyModel').modal('show');
        }
      },
      // 加载修改模态框组件数据
      toUpdateLoad(data) {
        // 获取职务级别和初始部门
        this.deptInitId = this.leaveUpdateDeptId
        this.typeId = data.typeId
        this.toChild(this.deptInitId, this.typeId)
      },
      // 调用子组件的属性和方法
      toChild(dept, typeId) {
        // 证明人组件
        this.$refs.agentUpdate.getLeaveAccount([this.leaveUpdateAccount, this.leaveUpdateDeptId])
        this.$refs.agentUpdate.showAgentInfo({account: this.updateAccountR, name: this.updateAccountRName})
        this.$refs.agentUpdateChoose.getLeaveAccount([this.leaveUpdateAccount, this.leaveUpdateDeptId])
        // 审查人组件
        this.$refs.examineUpdate.getApplyAccount(this.leaveAccount)
        this.$refs.examineUpdate.getDeptId(dept)
        this.$refs.examineUpdate.getTypeId(typeId)
        this.$refs.examineUpdate.getFlag(1)
        this.$refs.examineUpdate.showExamineInfo({accountId: this.updateExamineAccount, accountName: this.updateExamineName})
        this.$refs.examineUpdate.getExamineList()
        // 审核人组件
        this.$refs.checkUpdate.getApplyAccount(this.leaveAccount)
        this.$refs.checkUpdate.getDeptId(dept)
        this.$refs.checkUpdate.getTypeId(typeId)
        this.$refs.checkUpdate.getFlag(2)
        this.$refs.checkUpdate.showExamineInfo({accountId: this.updateCheckAccount, accountName: this.updateCheckName})
        this.$refs.checkUpdate.getExamineList()
        // 批准人组件
        this.$refs.approveUpdate.getApplyAccount(this.leaveAccount)
        this.$refs.approveUpdate.getDeptId(dept)
        this.$refs.approveUpdate.getTypeId(typeId)
        this.$refs.approveUpdate.getFlag(1)
        this.$refs.approveUpdate.showApproveInfo({accountId: this.updateApproveAccount, accountName: this.updateApproveName})
        this.$refs.approveUpdate.getApproveList()
      },

      /***********axios***********/

      // 查询基本信息
      queryEmpUpdateInfo() {
        axios({
          method: 'post',
          url: this.url + '/leaveForgetController/queryEmpInfoByAccount',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            account: this.leaveUpdateAccount
          },
          dataType: 'json',
        }).then((response) => {
          console.log(response.data.retData)
          this.empInfo = response.data.retData;
          this.toUpdateLoad(this.empInfo);
        }).catch(err => {
          console.log(err)
        });
      },
      changeExamineModifyAble() {
        this.isAbleForUpdateExamine = "disabled"
      },
      // 修改---添加审查人
      addExamineUpdateOption() {
        if (this.isBlank(this.deptExamineUpdateId)) {  // 首次加载初始化参数
          this.deptExamineUpdateId = this.deptInitId // 部门
        }
        this.clickTimeForExamine++
        this.$refs.examineUpdate.getClickTime(this.clickTimeForExamine)
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/queryParentDept',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            deptId: this.deptExamineUpdateId
          },
          dataType: 'json',
        }).then(response => {
          console.log(response.data.retData)
          this.parentId = response.data.retData // 获取请假人的父级部门ID
          if (this.deptExamineUpdateId == '0') { // 当下一次初始部门ID为0时(没有父级部门时)
            this.$refs.examineUpdate.getDeptId(this.deptInitId) // 传初始化参数给子组件
            this.deptExamineUpdateId = this.deptInitId; // 下一轮初始的部门ID为初始参数
            this.typeExamineUpdateId = this.$refs.examineUpdate.setTypeId();
            if (this.typeExamineUpdateId <= 6) {
              if (this.typeId <= 3) {
                this.$refs.examineUpdate.type3(this.typeExamineUpdateId);
              }
              if (this.typeId == 4) {
                this.$refs.examineUpdate.type4(this.typeExamineUpdateId);
              }
              if (this.typeId == 5) {
                if (this.$refs.examineUpdate.setRound() == 2) {
                  this.$refs.examineUpdate.initType5()
                }
                this.$refs.examineUpdate.type5(this.typeExamineUpdateId);
              }
            }
            if (this.typeId == 6) {
              this.$refs.examineUpdate.type6(this.typeExamineUpdateId);
              if (this.$refs.examineUpdate.setRound() == 1) {
                this.$refs.examineUpdate.getDeptId(this.deptExamineUpdateId)
              }
            }
          } else {
            this.$refs.examineUpdate.getDeptId(this.parentId) // 传父级部门ID给子组件
            this.deptExamineUpdateId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
          }
          this.$refs.examineUpdate.getExamineList();  // 调用子组件方法
        }).catch(err => {
          console.log(err)
        });
      },
      changeCheckModifyAble() {
        this.isAbleForUpdateCheck = "disabled"
      },
      // 修改---添加审核人
      addCheckUpdateOption() {
        if (this.isBlank(this.deptCheckUpdateId)) {  // 首次加载初始化参数
          this.deptCheckUpdateId = this.deptInitId // 部门
        }
        this.clickTimeForCheck++
        this.$refs.checkUpdate.getClickTime(this.clickTimeForCheck)
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/queryParentDept',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            deptId: this.deptCheckUpdateId
          },
          dataType: 'json',
        }).then(response => {
          console.log(response.data.retData)
          this.parentId = response.data.retData // 获取请假人的父级部门ID
          if (this.deptCheckUpdateId == '0') { // 当下一次初始部门ID为0时(没有父级部门时)
            this.$refs.checkUpdate.getDeptId(this.deptInitId) // 传初始化参数给子组件
            this.deptCheckUpdateId = this.deptInitId; // 下一轮初始的部门ID为初始参数
            this.typeCheckUpdateId = this.$refs.checkUpdate.setTypeId();// 获得到positionTypeId的值
            if (this.typeCheckUpdateId <= 6) {
              if (this.typeId <= 3) {
                this.$refs.checkUpdate.type3(this.typeCheckUpdateId);
              }
              if (this.typeId == 4) {
                this.$refs.checkUpdate.type4(this.typeCheckUpdateId);
              }
              if (this.typeId == 5) {
                if (this.$refs.checkUpdate.setRound() == 2) {
                  this.$refs.checkUpdate.initType5()
                }
                this.$refs.checkUpdate.type5(this.typeCheckUpdateId);
              }
            }
            if (this.typeId == 6) {
              this.$refs.checkUpdate.type6(this.typeCheckUpdateId);
              if (this.$refs.checkUpdate.setRound() == 1) {
                this.$refs.checkUpdate.getDeptId(this.deptCheckUpdateId)
              }
            }
          } else {
            this.$refs.checkUpdate.getDeptId(this.parentId) // 传父级部门ID给子组件
            this.deptCheckUpdateId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
          }
          this.$refs.checkUpdate.getExamineList();  // 调用子组件方法
        }).catch(err => {
          console.log(err)
        });
      },
      changeApproveModifyAble() {
        this.isAbleForUpdateApprove = "disabled"
      },
      // 修改---添加批准人
      addApproveUpdateOption() {
        if (this.isBlank(this.deptApproveUpdateId)) {  // 首次加载初始化参数
          this.deptApproveUpdateId = this.deptInitId // 部门
        }
        this.clickTimeForApprove++
        this.$refs.checkUpdate.getClickTime(this.clickTimeForApprove)
        axios({
          method: 'post',
          url: this.url + '/leavePrepareController/queryParentDept',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            deptId: this.deptApproveUpdateId
          },
          dataType: 'json',
        }).then(response => {
          console.log(response.data.retData)
          this.parentId = response.data.retData // 获取请假人的父级部门ID
          if (this.deptApproveUpdateId == '0') { // 当下一次初始部门ID为0时(没有父级部门时)
            this.$refs.approveUpdate.getDeptId(this.deptInitId) // 传初始化参数给子组件
            this.deptApproveUpdateId = this.deptInitId; // 下一轮初始的部门ID为初始参数
            this.typeApproveUpdateId = this.$refs.approveUpdate.setTypeId();
            if (this.typeApproveUpdateId <= 6) {
              if (this.typeId <= 3) {
                this.$refs.approveUpdate.type3(this.typeApproveUpdateId);
              }
              if (this.typeId == 4) {
                this.$refs.approveUpdate.type4(this.typeApproveUpdateId);
              }
            }
          } else {
            // this.$refs.approveUpdate.getDeptId(this.parentId) // 传父级部门ID给子组件
            // this.deptApproveUpdateId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
            if (this.typeId < 5) {
              this.$refs.approveUpdate.getDeptId(this.parentId) // 传父级部门ID给子组件
              this.deptApproveUpdateId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
            } else {
              if (this.$refs.approveUpdate.setRound() == 1) { // 点击一次查当前部门
                if (this.typeId == 5) {
                  this.$refs.approveUpdate.initType5()
                  this.$refs.approveUpdate.getDeptId(this.deptApproveUpdateId)
                  this.$refs.approveUpdate.type5(this.typeApproveUpdateId);
                }
                if (this.typeId == 6) {
                  this.$refs.approveUpdate.initType5()
                  this.$refs.approveUpdate.getDeptId(this.deptApproveUpdateId)
                  this.$refs.approveUpdate.type6(this.typeApproveUpdateId);
                }
              } else {  // 下一次查父级部门
                this.$refs.approveUpdate.getDeptId(this.parentId)
                this.deptApproveUpdateId = this.parentId;
              }
            }

          }
          this.$refs.approveUpdate.getApproveList();  // 调用子组件方法
        }).catch(err => {
          console.log(err)
        });
      },
      // 更新方法
      updateReport() {
        let msg = confirm("修改后需要重新审批,确认修改？")
        if (msg) {
          axios({
            method: 'post',
            url: this.url + '/leaveForgetController/updateLeaveForget',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: this.id,
              reason: this.reasonUpdate,
              startTime: this.$YYYY_MM_DD_17_30(this.notClockUpdateTime),
              accountR: this.updateAccountR,
              account1: this.updateExamineAccount,
              account2: this.updateCheckAccount,
              account3: this.updateApproveAccount,
              account4: this.updateReportAccount,
              timeR: -1,
              time1: -1,
              time2: -1,
              time3: -1,
              time4: -1,
              resultR: -1,
              result1: -1,
              result2: -1,
              result3: -1,
              result4: -1,
              remarkR: -1,
              remark1: -1,
              remark2: -1,
              remark3: -1,
              remark4: -1,
              leaveRemark: this.leaveUpdateRemark,
              step: 0,
              updateTime: this.$currentTime()
            },
            dataType: 'json',
          }).then(response => {
            console.log(response.data.retData);
            $('#clockModifyModel').modal('hide');
            this.queryClock();
          }).catch(err => {
            console.log(err)
          });
        }
      },

      //---------------------------------------处理----------------------------------
      disposeClock(item) {
        if (item.result4 != null) {
          alert("处理已完成,无法再次处理！")
        } else {
          this.id = item.id
          this.showLeaveAccountName = item.leaveAccountName
          this.showLeaveDeptName = item.leaveDeptName
          this.showLeavePositionName = item.leavePositionName
          this.showReason = item.reason
          this.showNotClockTime = item.startTime
          this.showLeaveRemark = item.leaveRemark
          this.showAccountR = item.witnessAccountName
          this.showExamine = item.examineAccountName
          this.showCheck = item.checkAccountName
          this.showApprove = item.approveAccountName
          this.showReport = item.reportAccountName
          this.remarkR = item.remarkR
          this.remark1 = item.remark1
          this.remark2 = item.remark2
          this.remark3 = item.remark3
          this.remark4 = item.remark4
          this.resultR = item.resultR
          this.result1 = item.result1
          this.result2 = item.result2
          this.result3 = item.result3
          this.result4 = item.result4
          this.step = item.step
          let loginAccount = JSON.parse(Cookies.get("accountData")).account.account_ID;
          let flag = 0;
          if (item.accountR == loginAccount) {
            this.isAbleForAccountR = false;
            flag = 1;
          }
          if (item.account1 == loginAccount) {
            this.isAbleForAccount1 = false;
            flag = 1;
          }
          if (item.account2 == loginAccount) {
            this.isAbleForAccount2 = false;
            flag = 1;
          }
          if (item.account3 == loginAccount) {
            this.isAbleForAccount3 = false;
            flag = 1;
          }
          if (item.account4 == loginAccount) {
            this.isAbleForAccount4 = false;
            flag = 1;
          }
          if (flag == 1) {
            $("#clockDisposeModel").modal("show");
          } else {
            alert("无权对此条数据进行处理")
          }
        }
      },
      // 证明人同意按钮
      agreeR() {
        if (this.step > 1) {
          alert("下一步已处理,不能再次提交！")
        } else {
          axios({
            method: 'post',
            url: this.url + '/leaveForgetController/updateLeaveForget',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: this.id,
              timeR: this.$currentTime(),
              resultR: 1,
              remarkR: this.remarkR,
              step: 1,
              updateTime: this.$currentTime()
            },
            dataType: 'json',
          }).then(response => {
            console.log(response.data.retData);
            $('#clockDisposeModel').modal('hide');
            this.queryClock();
          }).catch(err => {
            console.log(err)
          });
        }
      },
      // 证明人不同意按钮
      disagreeR() {
        if (this.step > 1) {
          alert("下一步已处理,不能再次提交！")
        } else {
          axios({
            method: 'post',
            url: this.url + '/leaveForgetController/updateLeaveForget',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: this.id,
              timeR: this.$currentTime(),
              resultR: 0,
              remarkR: this.remarkR,
              step: 1,
              updateTime: this.$currentTime()
            },
            dataType: 'json',
          }).then(response => {
            console.log(response.data.retData);
            $('#clockDisposeModel').modal('hide');
            this.queryClock();
          }).catch(err => {
            console.log(err)
          });
        }
      },
      // 审查人同意按钮
      agreeExamine() {
        if (this.resultR == 1) {
          if (this.step > 2) {
            alert("下一步已处理,不能再次提交！")
          } else {
            axios({
              method: 'post',
              url: this.url + '/leaveForgetController/updateLeaveForget',
              headers: {
                'Content-Type': this.contentType,
                'Access-Token': this.accessToken
              },
              data: {
                id: this.id,
                time1: this.$currentTime(),
                result1: 1,
                remark1: this.remark1,
                step: 2,
                updateTime: this.$currentTime()
              },
              dataType: 'json',
            }).then(response => {
              console.log(response.data.retData);
              $('#clockDisposeModel').modal('hide');
              this.queryClock();
            }).catch(err => {
              console.log(err)
            });
          }
        } else {
          alert("上一步未批准")
        }
      },
      // 审查人不同意按钮
      disagreeExamine() {
        if (this.resultR == 1) {
          if (this.step > 2) {
            alert("下一步已处理,不能再次提交！")
          } else {
            axios({
              method: 'post',
              url: this.url + '/leaveForgetController/updateLeaveForget',
              headers: {
                'Content-Type': this.contentType,
                'Access-Token': this.accessToken
              },
              data: {
                id: this.id,
                time1: this.$currentTime(),
                result1: 0,
                remark1: this.remark1,
                step: 2,
                updateTime: this.$currentTime()
              },
              dataType: 'json',
            }).then(response => {
              console.log(response.data.retData);
              $('#clockDisposeModel').modal('hide');
              this.queryClock();
            }).catch(err => {
              console.log(err)
            });
          }
        } else {
          alert("上一步未批准")
        }
      },
      // 审核人同意按钮
      agreeCheck() {
        if (this.result1 == 1) {
          if (this.step > 3) {
            alert("下一步已处理,不能再次提交！")
          } else {
            axios({
              method: 'post',
              url: this.url + '/leaveForgetController/updateLeaveForget',
              headers: {
                'Content-Type': this.contentType,
                'Access-Token': this.accessToken
              },
              data: {
                id: this.id,
                time2: this.$currentTime(),
                result2: 1,
                remark2: this.remark2,
                step: 3,
                updateTime: this.$currentTime()
              },
              dataType: 'json',
            }).then(response => {
              console.log(response.data.retData);
              $('#clockDisposeModel').modal('hide');
              this.queryClock();
            }).catch(err => {
              console.log(err)
            });
          }
        } else {
          alert("上一步未批准")
        }
      },
      // 审核人不同意按钮
      disagreeCheck() {
        if (this.result1 == 1) {
          if (this.step > 3) {
            alert("下一步已处理,不能再次提交！")
          } else {
            axios({
              method: 'post',
              url: this.url + '/leaveForgetController/updateLeaveForget',
              headers: {
                'Content-Type': this.contentType,
                'Access-Token': this.accessToken
              },
              data: {
                id: this.id,
                time2: this.$currentTime(),
                result2: 0,
                remark2: this.remark2,
                step: 3,
                updateTime: this.$currentTime()
              },
              dataType: 'json',
            }).then(response => {
              console.log(response.data.retData);
              $('#clockDisposeModel').modal('hide');
              this.queryClock();
            }).catch(err => {
              console.log(err)
            });
          }
        } else {
          alert("上一步未批准")
        }
      },
      // 批准人同意按钮
      agreeApprove() {
        if (this.result2 == 1) {
          if (this.step > 4) {
            alert("下一步已处理,不能再次提交！")
          } else {
            axios({
              method: 'post',
              url: this.url + '/leaveForgetController/updateLeaveForget',
              headers: {
                'Content-Type': this.contentType,
                'Access-Token': this.accessToken
              },
              data: {
                id: this.id,
                time3: this.$currentTime(),
                result3: 1,
                remark3: this.remark3,
                step: 4,
                updateTime: this.$currentTime()
              },
              dataType: 'json',
            }).then(response => {
              console.log(response.data.retData);
              $('#clockDisposeModel').modal('hide');
              this.queryClock();
            }).catch(err => {
              console.log(err)
            });
          }
        } else {
          alert("上一步未批准")
        }
      },
      // 批准人不同意按钮
      disagreeApprove() {
        if (this.result2 == 1) {
          if (this.step > 4) {
            alert("下一步已处理,不能再次提交！")
          } else {
            axios({
              method: 'post',
              url: this.url + '/leaveForgetController/updateLeaveForget',
              headers: {
                'Content-Type': this.contentType,
                'Access-Token': this.accessToken
              },
              data: {
                id: this.id,
                time3: this.$currentTime(),
                result3: 0,
                remark3: this.remark3,
                step: 4,
                updateTime: this.$currentTime()
              },
              dataType: 'json',
            }).then(response => {
              console.log(response.data.retData);
              $('#clockDisposeModel').modal('hide');
              this.queryClock();
            }).catch(err => {
              console.log(err)
            });
          }
        } else {
          alert("上一步未批准")
        }
      },
      // 报备人同意按钮
      agreeReport() {
        if (this.result3 == 1) {
          axios({
            method: 'post',
            url: this.url + '/leaveForgetController/updateLeaveForget',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: this.id,
              time4: this.$currentTime(),
              result4: 1,
              remark4: this.remark4,
              step: 5,
              updateTime: this.$currentTime()
            },
            dataType: 'json',
          }).then(response => {
            console.log(response.data.retData);
            $('#clockDisposeModel').modal('hide');
            this.queryClock();
          }).catch(err => {
            console.log(err)
          });
        } else {
          alert("上一步未批准")
        }
      },
      // 报备人不同意按钮
      disagreeReport() {
        if (this.result3 == 1) {
          axios({
            method: 'post',
            url: this.url + '/leaveForgetController/updateLeaveForget',
            headers: {
              'Content-Type': this.contentType,
              'Access-Token': this.accessToken
            },
            data: {
              id: this.id,
              time4: this.$currentTime(),
              result4: 0,
              remark4: this.remark4,
              step: 5,
              updateTime: this.$currentTime()
            },
            dataType: 'json',
          }).then(response => {
            console.log(response.data.retData);
            $('#clockDisposeModel').modal('hide');
            this.queryClock();
          }).catch(err => {
            console.log(err)
          });
        } else {
          alert("上一步未批准")
        }
      },
    },
    created() {
      this.queryClock();
    }
  }
</script>
<style scoped>
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

  .queryDate {
    position: relative;
    display: inline-block;
    width: 120px;
  }

  #date {
    width: 33%;
    margin-left: -10px;
  }

  #dept {
    width: 18.5%;
    margin-left: -50px;
  }

  #username {
    width: 15%;
    margin-left: -50px;
  }

  #status {
    width: 15%;
    margin-left: -50px;
  }

  #btn {
    margin-left: 82.6%;
  }
</style>


