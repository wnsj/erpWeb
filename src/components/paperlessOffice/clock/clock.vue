<!-- author:dingdong -->
<template>
  <div class="container user-container" id="clock-app" v-cloak>
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>忘打卡证明</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <span class="select-box-title">申请日期：</span>
        <date-picker v-model="beginDate" type="date" format="YYYY-MM-DD" confirm></date-picker>
        <span class="select-box-title">~</span>
        <date-picker v-model="endDate" type="date" format="YYYY-MM-DD" confirm></date-picker>
      </div>
    </div><br>
    <div class="row">
      <div class="col-md-3">
        <div class="input-group">
          <span class="input-group-addon">请假人部门</span>
          <department ref="deptQuery" @departChange='deptChangeForQuery'></department>
        </div>
      </div>
      <div class="col-md-2">
        <div class="input-group">
          <span class="input-group-addon">姓名</span>
          <input type="text" class="form-control" placeholder="Username" v-model="accountName">
        </div>
      </div>
      <div class="col-md-2">
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
    <div class="row">
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-9">
        <button type="button" class="btn btn-warning pull-right m_r_10">导出</button>
        <button type="button" class="btn btn-info pull-right m_r_10" data-toggle="modal" @click="applyClock">申请
        </button>
        <button type="button" class="btn btn-primary pull-right m_r_10" @click="queryClock">查询</button>
      </div>
    </div>
    <br>
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
              <td class="text-center">{{dateFormat(item.addTime)}}</td>
              <td class="text-center">{{dateFormat(item.startTime)}}</td>
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
                <button type="button" class="btn btn-sm btn-default" data-toggle="modal" data-target="#clockShowModel"
                        @click="showClock(item)"
                        :style="item.result4 == 1? {'color':'#00ff00'}:
                        item.resultR == 0? {'color':'#ff0000'}:
                        item.result1 == 0? {'color':'#ff0000'}:
                        item.result2 == 0? {'color':'#ff0000'}:
                        item.result3 == 0? {'color':'#ff0000'}:
                        item.result4 == 0? {'color':'#ff0000'}:
                        {'color':''}">
                        <b>查看</b>
                </button>
              </td>
              <td class="text-center">
                <button type="button" class="btn btn-sm btn-default" @click="editClock(item)"
                        :style="item.result4 == 1? {'color':'#00ff00'}:
                        item.resultR == 0? {'color':'#ff0000'}:
                        item.result1 == 0? {'color':'#ff0000'}:
                        item.result2 == 0? {'color':'#ff0000'}:
                        item.result3 == 0? {'color':'#ff0000'}:
                        item.result4 == 0? {'color':'#ff0000'}:
                        {'color':''}">
                        <b>修改</b>
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
            <button type="button" class="close" data-dismiss="modal" @click="clearAddModel">
              <span>×</span>
            </button>
            <h4 class="modal-title">新增打卡证明</h4>
          </div><!-- /.modal-header -->
          <div class="modal-body">
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">申请人姓名：</label>
              <div class="col-md-2">
                <input type="text" class="form-control" disabled="disabled" v-model="leaveAccountName"/>
              </div>
              <label class="col-md-1 control-label text-right nopad">部门：</label>
              <div class="col-md-2">
                <input type="text" class="form-control" disabled="disabled" v-model="leaveDeptName"/>
              </div>
              <label class="col-md-1 control-label text-right nopad">职位：</label>
              <div class="col-md-2">
                <input type="text" class="form-control" disabled="disabled" v-model="leavePositionName"/>
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
                <span class="select-box-title">未打卡时间：</span>
                <date-picker v-model="notClockTime" type="date" format="YYYY-MM-DD 17:30" confirm></date-picker>
              </div>
            </div>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">说明：</label>
              <div class="col-md-10">
                <textarea class="textarea" placeholder="未打卡说明：" v-model="leaveRemark"></textarea>
              </div>
            </div>
          </div><!-- /.modal-body -->
          <div class="modal-footer">
            <div class="col-md-6">
              <button type="button" class="btn btn-sm btn-warning" @click="addClock">确认</button>
            </div>
            <div class="col-md-1">
              <button type="button" class="btn btn-sm btn-info">取消</button>
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
              <button type="button" data-toggle="modal" data-target="#agentChooseModel" @click="queryEmpByDept"><span
                class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
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
                <button type="button" data-toggle="modal" @click="addExamineOption" :disabled="isAbleForExamine">
                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
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
                <check :checkAccount="checkAccount" ref="check" @checkChange="checkChange"></check>
              </div>
              <div class="col-md-1">
                <button type="button" data-toggle="modal" @click="addCheckOption" :disabled="isAbleForCheck">
                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
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
                <button type="button" data-toggle="modal" @click="addApproveOption" :disabled="isAbleForApprove">
                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
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
                <input type="text" class="form-control" disabled="disabled" v-model="showLeaveAccountName"/>
              </div>
              <label class="col-md-1 control-label text-right nopad">部门：</label>
              <div class="col-md-2">
                <input type="text" class="form-control" disabled="disabled" v-model="showLeaveDeptName"/>
              </div>
              <label class="col-md-1 control-label text-right nopad">职位：</label>
              <div class="col-md-2">
                <input type="text" class="form-control" disabled="disabled" v-model="showLeavePositionName"/>
              </div>
            </div>
            <legend><h5>打卡</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">原因：</label>
              <div class="col-md-2">
                <input type="text" class="form-control" disabled="disabled" v-model="showReason"/>
              </div>
              <label class="control-label text-right nopad col-md-2 col-lg-offset-1">未打卡时间：</label>
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
                <input type="text" class="form-control" disabled="disabled" v-model="showAccountR"/>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
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
                <input type="text" class="form-control" disabled="disabled" v-model="showExamine"/>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
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
                <input type="text" class="form-control" disabled="disabled" v-model="showCheck"/>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
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
                <input type="text" class="form-control" disabled="disabled" v-model="showApprove"/>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
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
                <input type="text" class="form-control" disabled="disabled" v-model="showReport"/>
              </div>
              <div class="col-md-1">
                <button type="button" disabled="disabled"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
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
                <input type="text" class="form-control" disabled="disabled" v-model="leaveUpdateAccountName"/>
              </div>
              <label class="col-md-1 control-label text-right nopad">部门：</label>
              <div class="col-md-2">
                <input type="text" class="form-control" disabled="disabled" v-model="leaveUpdateDeptName"/>
              </div>
              <label class="col-md-1 control-label text-right nopad">职位：</label>
              <div class="col-md-2">
                <input type="text" class="form-control" disabled="disabled" v-model="leaveUpdatePositionName"/>
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
              <label class="control-label text-right nopad col-md-2 col-lg-offset-1">未打卡时间：</label>
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
            <div class="col-md-12">
              <button type="button" class="btn btn-warning">确认</button>
              <button type="button" data-dismiss="modal" class="btn btn-info">取消</button>
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
                <button type="button" data-toggle="modal" data-target="#agentChooseModel" @click="queryEmpByDeptForUpdate"><span
                  class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
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
            <agentChoose ref="agentUpdateChoose" @getAgentInfo="getAccountRUpdateInfo"></agentChoose>
<!--            <legend><h5>审查</h5></legend>-->
<!--            <div class="form-group clearfix">-->
<!--              <label class="col-md-1 control-label text-right nopad">审查人：</label>-->
<!--              <div class="col-md-2">-->
<!--                <examine :examineAccount="examineAccount" ref="examine" @examineChange="examineChange"></examine>-->
<!--              </div>-->
<!--              <div class="col-md-1">-->
<!--                <button type="button" data-toggle="modal" @click="addExamineOption" :disabled="isAbleForExamine">-->
<!--                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>-->
<!--                </button>-->
<!--              </div>-->
<!--              <label class="col-md-1 control-label text-right nopad">备注：</label>-->
<!--              <div class="col-md-3">-->
<!--                <input type="text" class="form-control" disabled="disabled"/>-->
<!--              </div>-->
<!--              <div class="col-md-1 col-md-offset-1">-->
<!--                <button type="button" class="btn btn-sm btn-warning" disabled="disabled">同意</button>-->
<!--              </div>-->
<!--              <div class="col-md-1">-->
<!--                <button type="button" class="btn btn-sm btn-warning" disabled="disabled">不同意</button>-->
<!--              </div>-->
<!--            </div>-->
<!--            <legend><h5>审核</h5></legend>-->
<!--            <div class="form-group clearfix">-->
<!--              <label class="col-md-1 control-label text-right nopad">审核人：</label>-->
<!--              <div class="col-md-2">-->
<!--                <check :checkAccount="checkAccount" ref="check" @checkChange="checkChange"></check>-->
<!--              </div>-->
<!--              <div class="col-md-1">-->
<!--                <button type="button" data-toggle="modal" @click="addCheckOption" :disabled="isAbleForCheck">-->
<!--                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>-->
<!--                </button>-->
<!--              </div>-->
<!--              <label class="col-md-1 control-label text-right nopad">备注：</label>-->
<!--              <div class="col-md-3">-->
<!--                <input type="text" class="form-control" disabled="disabled"/>-->
<!--              </div>-->
<!--              <div class="col-md-1 col-md-offset-1">-->
<!--                <button type="button" class="btn btn-sm btn-warning" disabled="disabled">同意</button>-->
<!--              </div>-->
<!--              <div class="col-md-1">-->
<!--                <button type="button" class="btn btn-sm btn-warning" disabled="disabled">不同意</button>-->
<!--              </div>-->
<!--            </div>-->
<!--            <legend><h5>批准</h5></legend>-->
<!--            <div class="form-group clearfix">-->
<!--              <label class="col-md-1 control-label text-right nopad">批准人：</label>-->
<!--              <div class="col-md-2">-->
<!--                <approve :approveAccount="approveAccount" ref="approve" @approveChange="approveChange"></approve>-->
<!--              </div>-->
<!--              <div class="col-md-1">-->
<!--                <button type="button" data-toggle="modal" @click="addApproveOption" :disabled="isAbleForApprove">-->
<!--                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>-->
<!--                </button>-->
<!--              </div>-->
<!--              <label class="col-md-1 control-label text-right nopad">备注：</label>-->
<!--              <div class="col-md-3">-->
<!--                <input type="text" class="form-control" disabled="disabled"/>-->
<!--              </div>-->
<!--              <div class="col-md-1 col-md-offset-1">-->
<!--                <button type="button" class="btn btn-sm btn-warning" disabled="disabled">同意</button>-->
<!--              </div>-->
<!--              <div class="col-md-1">-->
<!--                <button type="button" class="btn btn-sm btn-warning" disabled="disabled">不同意</button>-->
<!--              </div>-->
<!--            </div>-->
<!--            <legend><h5>报备人</h5></legend>-->
<!--            <div class="form-group clearfix">-->
<!--              <label class="col-md-1 control-label text-right nopad">报备人：</label>-->
<!--              <div class="col-md-2">-->
<!--                <select class="form-control">-->
<!--                  <option>李珊珊</option>-->
<!--                </select>-->
<!--              </div>-->
<!--              <label class="col-md-2 control-label text-right nopad">备注：</label>-->
<!--              <div class="col-md-3">-->
<!--                <input type="text" class="form-control" disabled="disabled"/>-->
<!--              </div>-->
<!--              <div class="col-md-1 col-md-offset-1">-->
<!--                <button type="button" class="btn btn-sm btn-warning" disabled="disabled">同意</button>-->
<!--              </div>-->
<!--              <div class="col-md-1">-->
<!--                <button type="button" class="btn btn-sm btn-warning" disabled="disabled">不同意</button>-->
<!--              </div>-->
<!--            </div>-->
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
  import agent from '../../vuecommon/agent.vue'
  import agentChoose from '../report/subReport/agentChoose.vue'
  import department from '../../vuecommon/department.vue'
  import examine from '../../vuecommon/examine.vue'
  import check from '../../vuecommon/check.vue'
  import approve from '../../vuecommon/approve.vue'

  export default {
    components: {
      department,
      DatePicker,
      agent,
      agentChoose,
      examine,
      check,
      approve
    },
    data() {
      return {
        // 查询
        beginDate: moment(),
        endDate: moment(),
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
        notClockTime: moment().subtract(1,'days').format("YYYY-MM-DD 17:30"),
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
        typeExamineId:'',
        // 审核人组件
        deptCheckId: '',
        typeCheckId: '',
        // 批准人组件
        deptApproveId: '',
        typeApproveId: '',



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

        //  修改
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
        // updateExamineAccount: '',
        // updateCheckAccount: '',
        // updateApproveAccount: '',
        // updateReportAccount: '',

        updateRemarkR: '',
        updateRemark1: '',
        updateRemark2: '',
        updateRemark3: '',
        updateRemark4: '',

        // 按钮状态
        isAbleForExamine: false,
        isAbleForCheck: false,
        isAbleForApprove: false
      }
    },
    methods: {
      // ---------------------------------------公用----------------------------------
      dateFormat(time){ // 回显时间格式化
        return moment(time).format("YYYY-MM-DD HH:mm")
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
            beginDate:  moment(this.beginDate).format("YYYY-MM-DD 00:00:00"),
            endDate: moment(this.endDate).format("YYYY-MM-DD 23:59:59"),
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
        console.log("证明人账户ID" + this.accountR)
      },
      examineChange(val) {
        this.examineAccount = val
        console.log("审查人账户ID" + this.examineAccount)
      },
      checkChange(val) {
        this.checkAccount = val
        console.log("审核人账户ID" + this.checkAccount)
      },
      approveChange(val) {
        this.approveAccount = val
        console.log("批准人账户ID" + this.checkAccount)
      },
      // 申请按钮
      applyClock() {
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
      clearAddModel(){
        this.leaveAccount ='',
        this.leaveAccountName = '',
        this.leaveDeptName = '',
        this.leavePositionName = '',
        this.reason = '',
        this.notClockTime = moment().subtract(1,'days').format("YYYY-MM-DD 17:30"),
        this.leaveRemark = '',
        this.accountR = 0,          //  证明人账户
        this.examineAccount = '',   // 审查人账户
        this.checkAccount = '',     // 审核人账户
        this.approveAccount = '',   // 批准人账户
        this.reportAccount = '1127' // 报备人(暂时固定为李珊珊)
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
      toLoad(data){
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
        this.$refs.examine.getDeptId(this.deptInitId)
        this.$refs.examine.getTypeId(this.typeId)
        this.$refs.check.getDeptId(this.deptInitId)
        this.$refs.check.getTypeId(this.typeId)
        this.$refs.approve.getDeptId(this.deptInitId)
        this.$refs.approve.getTypeId(this.typeId)
        // 执行子组件方法
        this.$refs.examine.getExamineList()
        this.$refs.check.getCheckList()
        this.$refs.approve.getApproveList();
        console.log("account:" + this.$refs.agent.agentInitId);
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
            deptId: this.deptExamineId
          },
          dataType: 'json',
        }).then(response => {
          console.log(response.data.retData)
          this.parentId = response.data.retData // 获取请假人的父级部门ID
          if (this.deptExamineId == '0') { // 当下一次初始部门ID为0时(没有父级部门时)
            this.$refs.examine.getDeptId(this.deptInitId) // 传初始化参数给子组件
            this.deptExamineId = this.deptInitId; // 下一轮初始的部门ID为初始参数
            this.typeExamineId = this.$refs.examine.setTypeId();
            if (this.typeExamineId < 6) {
              this.$refs.examine.getTypeId(this.typeExamineId);
            }
            if (this.typeExamineId == 6) {  // 禁用选项
              this.$refs.examine.changeAble();
              this.isAbleForExamine = "disabled"
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
            if (this.typeCheckId < 6) {
              this.$refs.check.getTypeId(this.typeCheckId);
            }
            if (this.typeCheckId == 6) {  // 禁用选项
              this.$refs.check.changeAble();
              this.isAbleForCheck = "disabled"
            }
          } else {
            this.$refs.check.getDeptId(this.parentId) // 传父级部门ID给子组件
            this.deptCheckId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
          }
          this.$refs.check.getCheckList();  // 调用子组件方法
        }).catch(err => {
          console.log(err)
        });
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
          if (this.deptApproveId == '0') { // 当下一次初始部门ID为0时(没有父级部门时)
            this.$refs.approve.getDeptId(this.deptInitId) // 传初始化参数给子组件
            this.deptApproveId = this.deptInitId; // 下一轮初始的部门ID为初始参数
            this.typeApproveId = this.$refs.approve.setTypeId();
            if (this.typeApproveId < 6) {
              this.$refs.approve.getTypeId(this.typeApproveId);
            }
            if (this.typeApproveId == 6) {  // 禁用选项
              this.$refs.approve.changeAble();
              this.isAbleForApprove = "disabled"
            }
          } else {
            this.$refs.approve.getDeptId(this.parentId) // 传父级部门ID给子组件
            this.deptApproveId = this.parentId;  // 下一轮初始的部门ID为该部门的父级部门
          }
          this.$refs.approve.getApproveList();  // 调用子组件方法
        }).catch(err => {
          console.log(err)
        });
      },

      addClock(){ // 申请确认按钮
        if(this.isBlank(this.reason)){
          alert("请选择未打卡原因!")
          return false;
        }
        if(this.isBlank(this.leaveRemark)){
          alert("请输入说明!")
          return false;
        }
        if(this.isBlank(this.notClockTime)){
          alert("请选择未打卡时间!")
          return false;
        }
        if(this.isBlank(this.leaveRemark)){
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
            addTime: this.dateFormat(),
            startTime: this.notClockTime,
            leaveRemark: this.leaveRemark,
            accountR: this.accountR,
            account1: this.examineAccount,
            account2: this.checkAccount,
            account3: this.approveAccount,
            account4: this.reportAccount,
            updateTime: this.dateFormat(),
            step:'0'
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

      // ---------------------------------------修改----------------------------------
      editClock(item) {
        if (item.leaveAccount != JSON.parse(Cookies.get("accountData")).account.account_ID) {
          alert("不能修改他人的报备")
        } else {
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
          // this.updateExamineAccount = item.account1
          // this.updateCheckAccount = item.account2
          // this.updateApproveAccount = item.account3
          // this.updateReportAccount = item.account4
          console.log(this.updateAccountR)
          this.toUpdateLoad();
          $('#clockModifyModel').modal('show');
        }
      },

      // 加载数据
      toUpdateLoad(){
        // 传值给子组件
        console.log("this.leaveUpdateAccount" + this.leaveUpdateAccount)
        console.log("this.leaveUpdateDeptId" + this.leaveUpdateDeptId)
        this.$refs.agentUpdate.getLeaveAccount([this.leaveUpdateAccount, this.leaveUpdateDeptId])
        this.$refs.agentUpdateChoose.getLeaveAccount([this.leaveUpdateAccount, this.leaveUpdateDeptId])
        this.$refs.agentUpdate.showAgentInfo({account:this.updateAccountR, name:this.updateAccountRName})


        // this.$refs.examine.getDeptId(this.deptInitId)
        // this.$refs.examine.getTypeId(this.typeId)
        // this.$refs.check.getDeptId(this.deptInitId)
        // this.$refs.check.getTypeId(this.typeId)
        // this.$refs.approve.getDeptId(this.deptInitId)
        // this.$refs.approve.getTypeId(this.typeId)
        // 执行子组件方法
        // this.$refs.examine.getExamineList()
        // this.$refs.check.getCheckList()
        // this.$refs.approve.getApproveList();
        // console.log("account:" + this.$refs.agent.agentInitId);
      },


      // 组件方法
      changeUpdateAccountR(val) {
        this.updateAccountR = val
        console.log("证明人账户ID" + this.updateAccountR)
      },
      // examineUpdateChange(val) {
      //   this.updateExamineAccount = val
      //   console.log("审查人账户ID" + this.updateExamineAccount)
      // },
      // checkUpdateChange(val) {
      //   this.updateCheckAccount = val
      //   console.log("审核人账户ID" + this.updateCheckAccount)
      // },
      // approveUpdateChange(val) {
      //   this.updateApproveAccount = val
      //   console.log("批准人账户ID" + this.updateApproveAccount)
      // },
      queryEmpByDeptForUpdate(){
        this.$refs.agentUpdateChoose.queryEmpByDept()
      },
      getAccountRUpdateInfo(item) {
        this.$refs.agentUpdate.insertAgentInfo(item)
      },

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
</style>


