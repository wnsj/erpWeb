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
      <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div class="input-group">
          <span class="input-group-addon">请假人部门</span>
          <department ref="deptQuery" @departChange='deptChangeForQuery'></department>
        </div>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <div class="input-group">
          <span class="input-group-addon">姓名</span>
          <input type="text" class="form-control" placeholder="Username" v-model="leaveAccountName">
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
        <button type="button" class="btn btn-info pull-right m_r_10" data-toggle="modal" data-target="#clockAddModel"
                v-if='has(51)' @click="addClock">申请
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
            <tr v-for="(item,index) in clockList" :key="index">
              <td class="text-center">{{item.leaveAccountName}}</td>
              <td class="text-center">{{item.leaveDeptName}}</td>
              <td class="text-center">{{item.addTime}}</td>
              <td class="text-center">{{item.startTime}}</td>
              <td class="text-center">{{item.reason}}</td>
              <td class="text-center">{{item.leaveRemark}}</td>
              <td class="text-center">{{item.witnessAccountName}}</td>
              <td class="text-center">{{item.resultR}}</td>
              <td class="text-center">{{item.examineAccountName}}</td>
              <td class="text-center">{{item.result1}}</td>
              <td class="text-center">{{item.checkAccountName}}</td>
              <td class="text-center">{{item.result2}}</td>
              <td class="text-center">{{item.approveAccountName}}</td>
              <td class="text-center">{{item.result3}}</td>
              <td class="text-center">{{item.reportAccountName}}</td>
              <td class="text-center">{{item.result4}}</td>
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
          </div><!-- /.modal-body -->
          <div class="modal-body">
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
              <label class="control-label text-right nopad col-md-2 col-lg-offset-1">未打卡时间：</label>
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
            <div class="col-md-12">
              <button type="button" class="btn btn-warning">确认</button>
              <button type="button" data-dismiss="modal" class="btn btn-info">取消</button>
            </div>
          </div> <!-- /.modal-footer -->
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
          </div><!-- /.modal-body -->
          <div class="modal-body">
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
          </div><!-- /.modal-body -->
          <div class="modal-body">
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
        leaveAccountName: '',
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
            leaveAccountName: this.leaveAccountName,
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
        this.leaveAccount = JSON.parse(Cookies.get("accountData")).account.account_ID;
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
      addClock() {
        this.queryEmpInfo();
      },
      // ---------------------------------------查看----------------------------------
      showClock(item){
        this.showLeaveAccountName = item.leaveAccountName
        this.showLeaveDeptName = item.leaveDeptName
        this.showLeavePositionName = item.leavePositionName
        this.showReason = item.reason
        this.showNotClockTime = this.getYYYY_MM_DD_T_HH_MM(item.startTime)
        this.showLeaveRemark = item.leaveRemark
      },

      // ---------------------------------------修改----------------------------------
      editClock(item){
        if(item.leaveAccount != JSON.parse(Cookies.get("accountData")).account.account_ID){
          alert("不能修改他人的报备")
        }else{
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


