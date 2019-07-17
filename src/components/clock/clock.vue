<!-- author:dingdong -->
<template>
  <div class="container user-container" id="clock-app" v-cloak>
    <div class="row">
      <div class="col-md-12 col-lg-12 main-title">
        <h2>忘打卡证明</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
        <div class="col-md-2 col-lg-2" style="padding: 0; line-height: 34px;">
          <p>填写日期：</p>
        </div>
        <div class="col-md-10 col-lg-10">
          <span><input type="date" value="" id="beginDate" v-model="beginDate"/></span>
          <span>&nbsp;~&nbsp;</span>
          <span><input type="date" value="" id="endDate" v-model="endDate"/></span>
        </div>
      </div>
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
      <div class="col-md-2 col-lg-2">
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
        <button type="button" class="btn btn-info pull-right m_r_10" data-toggle="modal" data-target="#clockAddModel"
                v-if='has(51)' @click="applyClock">申请
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
              <td class="text-center">{{item.addTime}}</td>
              <td class="text-center">{{item.startTime}}</td>
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
                        @click="showClock(item)"><b>查看</b>
                </button>
              </td>
              <td class="text-center">
                <button type="button" class="btn btn-sm btn-default" @click="editClock(item)"><b>修改</b></button>
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
              <label class="col-md-2 control-label text-right nopadcol-lg-offset-1">未打卡时间：</label>
              <div class="col-md-3">
                <input type="datetime-local" class="form-control" v-model="notClockTime"/>
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
              <label class="col-md-2 control-label text-right nopad">证明人：</label>
              <div class="col-md-2">
                <select class="form-control" id="accountR" v-model="accountR" @change="selectAccount">
                  <option value="239">王杰林</option>
                  <option value="2272">丁冬</option>
                </select>
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
              <label class="col-md-2 control-label text-right nopad">审查人：</label>
              <div class="col-md-2">
                <select class="form-control" id="account1" v-model="account1" @change="selectAccount">
                  <option value="239">王杰林</option>
                  <option value="2272">丁冬</option>
                </select>
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
              <label class="col-md-2 control-label text-right nopad">审核人：</label>
              <div class="col-md-2">
                <select class="form-control" id="account2" v-model="account2" @change="selectAccount">
                  <option value="239">王杰林</option>
                  <option value="2272">丁冬</option>
                </select>
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
              <label class="col-md-2 control-label text-right nopad">批准人：</label>
              <div class="col-md-2">
                <select class="form-control" id="account3" v-model="account3" @change="selectAccount">
                  <option value="239">王杰林</option>
                  <option value="2272">丁冬</option>
                </select>
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
              <label class="col-md-2 control-label text-right nopad">报备人：</label>
              <div class="col-md-2">
                <select class="form-control" id="account4" v-model="account4" @change="selectAccount">
                  <option value="239">王杰林</option>
                  <option value="2272">丁冬</option>
                </select>
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
                <input type="datetime-local" class="form-control" disabled="disabled" v-model="showNotClockTime"/>
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
                <input type="datetime-local" class="form-control" v-model="notClockUpdateTime"/>
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
              <label class="col-md-2 control-label text-right nopad">证明人：</label>
              <div class="col-md-2">
                <select class="form-control">
                  <option value="239">王杰林</option>
                  <option value="2272">丁冬</option>
                </select>
              </div>
              <label class="col-md-1 control-label text-right nopad">备注：</label>
              <div class="col-md-3">
                <input type="text" class="form-control" v-model="updateRemarkR"/>
              </div>
              <div class="col-md-1 col-md-offset-1">
                <button type="button" class="btn btn-sm btn-warning">同意</button>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning">不同意</button>
              </div>
            </div>
            <legend><h5>审查</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">审查人：</label>
              <div class="col-md-2">
                <select class="form-control">
                  <option value="239">王杰林</option>
                  <option value="2272">丁冬</option>
                </select>
              </div>
              <label class="col-md-1 control-label text-right nopad">备注：</label>
              <div class="col-md-3">
                <input type="text" class="form-control" v-model="updateRemark1"/>
              </div>
              <div class="col-md-1 col-md-offset-1">
                <button type="button" class="btn btn-sm btn-warning">同意</button>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning">不同意</button>
              </div>
            </div>
            <legend><h5>审核</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">审核人：</label>
              <div class="col-md-2">
                <select class="form-control">
                  <option value="239">王杰林</option>
                  <option value="2272">丁冬</option>
                </select>
              </div>
              <label class="col-md-1 control-label text-right nopad">备注：</label>
              <div class="col-md-3">
                <input type="text" class="form-control" v-model="updateRemark2"/>
              </div>
              <div class="col-md-1 col-md-offset-1">
                <button type="button" class="btn btn-sm btn-warning">同意</button>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning">不同意</button>
              </div>
            </div>
            <legend><h5>批准</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">批准人：</label>
              <div class="col-md-2">
                <select class="form-control">
                  <option value="239">王杰林</option>
                  <option value="2272">丁冬</option>
                </select>
              </div>
              <label class="col-md-1 control-label text-right nopad">备注：</label>
              <div class="col-md-3">
                <input type="text" class="form-control" v-model="updateRemark3"/>
              </div>
              <div class="col-md-1 col-md-offset-1">
                <button type="button" class="btn btn-sm btn-warning">同意</button>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning">不同意</button>
              </div>
            </div>
            <legend><h5>报备</h5></legend>
            <div class="form-group clearfix">
              <label class="col-md-2 control-label text-right nopad">报备人：</label>
              <div class="col-md-2">
                <select class="form-control">
                  <option value="239">王杰林</option>
                  <option value="2272">丁冬</option>
                </select>
              </div>
              <label class="col-md-1 control-label text-right nopad">备注：</label>
              <div class="col-md-3">
                <input type="text" class="form-control" v-model="updateRemark4"/>
              </div>
              <div class="col-md-1 col-md-offset-1">
                <button type="button" class="btn btn-sm btn-warning">同意</button>
              </div>
              <div class="col-md-1">
                <button type="button" class="btn btn-sm btn-warning">不同意</button>
              </div>
            </div>
          </div><!-- /.modal-body -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div><!-- /.container -->
</template>
<script>
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import department from '../vuecommon/department.vue'

  export default {
    components: {
      department,
    },
    data() {
      return {
        // 查询
        beginDate: this.getCurrentDay,
        endDate: this.getCurrentDay,
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
        leaveDeptName: '',
        leavePositionName: '',
        reason: '',
        reasons: [
          {label: '因公外出'},
          {label: '忘记打卡'},
          {label: '其他'}
        ],
        notClockTime: '',
        leaveRemark: '',
        accountR: '',
        account1: '',
        account2: '',
        account3: '',
        account4: '',

        //  查看
        showLeaveAccountName: '',
        showLeaveDeptName: '',
        showLeavePositionName: '',
        showReason: '',
        showNotClockTime: '',
        showLeaveRemark: '',

        //  修改
        leaveUpdateAccount: '',
        leaveUpdateAccountName: '',
        leaveUpdateDeptName: '',
        leaveUpdatePositionName: '',
        reasonUpdate: '',
        notClockUpdateTime: '',
        leaveUpdateRemark: '',
        updateRemarkR: '',
        updateRemark1: '',
        updateRemark2: '',
        updateRemark3: '',
        updateRemark4: '',
      }
    },
    methods: {
      // ---------------------------------------查询----------------------------------
      deptChangeForQuery(val) {
        this.deptQueryId = val
      },
      queryClock() {
        axios({
          method: 'post',
          url: this.url + '/leaveForgetController/queryLeaveForget',
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            accountId: this.has(51) ? '' : JSON.parse(Cookies.get("accountData")).account.account_ID,
            beginDate: this.beginDate,
            endDate: this.endDate,
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
          this.leaveAccountName = response.data.retData.name
          this.leaveDeptName = response.data.retData.deptName
          this.leavePositionName = response.data.retData.positionName
        })
      },
      applyClock() {  // 申请按钮
        this.leaveAccount = JSON.parse(Cookies.get("accountData")).account.account_ID;
        this.queryEmpInfo();
      },
      selectAccount(){ // 获取select->option值
        this.accountR = $('#accountR option:selected').val()
        this.account1 = $('#account1 option:selected').val()
        this.account2 = $('#account2 option:selected').val()
        this.account3 = $('#account3 option:selected').val()
        this.account4 = $('#account4 option:selected').val()
      },
      addClock(){ // 确认申请
        if(this.isBlank(this.reason)){
          alert("请选择未打卡原因!")
          return false;
        }
        if(this.isBlank(this.leaveRemark)){
          alert("请输入说明!")
          return false;
        }
        if(this.isBlank(this.leaveRemark)){
          alert("请输入说明!")
          return false;
        }
        if(this.isBlank(this.accountR)){
          alert("请选择证明人!")
          return false;
        }
        if(this.isBlank(this.account1)){
          alert("请选择审查人!")
          return false;
        }
        if(this.isBlank(this.account2)){
          alert("请选择审核人!")
          return false;
        }
        if(this.isBlank(this.account3)){
          alert("请选择批准人!")
          return false;
        }
        if(this.isBlank(this.account4)){
          alert("请选择报备人!")
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
            addTime: this.getCurrentYYYY_MM_DD_HH_MM_SS(),
            startTime: this.notClockTime,
            leaveRemark: this.leaveRemark,
            accountR: this.leaveAccount,
            account1: this.account1,
            account2: this.account2,
            account3: this.account3,
            account4: this.account4,
            updateTime: this.getCurrentYYYY_MM_DD_HH_MM_SS()
          },
          dataType: 'json',
        }).then((response) => {
          console.log(response.data.retData)
        }).catch((error) => {
          console.log('忘记打卡证明申请失败')
          console.log(response.data.retData)
        });
        $('#clockAddModel').modal('hide');
      },

      // ---------------------------------------查看----------------------------------
      showClock(item) {
        this.showLeaveAccountName = item.leaveAccountName
        this.showLeaveDeptName = item.leaveDeptName
        this.showLeavePositionName = item.leavePositionName
        this.showReason = item.reason
        this.showNotClockTime = this.getYYYY_MM_DD_T_HH_MM(item.startTime)
        this.showLeaveRemark = item.leaveRemark
      },

      // ---------------------------------------修改----------------------------------
      editClock(item) {
        if (item.leaveAccount != JSON.parse(Cookies.get("accountData")).account.account_ID) {
          alert("不能修改他人的报备")
        } else {
          this.leaveUpdateAccountName = item.leaveAccountName
          this.leaveUpdateDeptName = item.leaveDeptName
          this.leaveUpdatePositionName = item.leavePositionName
          this.reasonUpdate = item.reason
          this.notClockUpdateTime = this.getYYYY_MM_DD_T_HH_MM(item.startTime)
          this.leaveUpdateRemark = item.leaveRemark
          $('#clockModifyModel').modal('show');
        }
      }
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


